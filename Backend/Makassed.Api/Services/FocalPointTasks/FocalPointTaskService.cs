using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Users;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Services.FocalPointTasks;

public class FocalPointTaskService : IFocalPointTaskService
{
    private readonly ISubmissionRepository _submissionRepository;
    private readonly IUserService _userService;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public FocalPointTaskService(
        ISubmissionRepository submissionRepository, 
        IUserService userService, 
        IDepartmentRepository departmentRepository, 
        IUnitOfWork unitOfWork)
    {
        _submissionRepository = submissionRepository;
        _userService = userService;
        _departmentRepository = departmentRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<List<FocalPointTask>>> GetFocalPointTasksAsync(Guid id)
    {
        var departmentResult = await _departmentRepository.GetDepartmentAsync(id);

        if (departmentResult is null)
            return Errors.Department.NotFound;

        return departmentResult.FocalPointTasks.ToList();
    }

    public async Task<ErrorOr<FocalPointTask>> GetFocalPointTaskByIdAsync(Guid departmentId, Guid id)
    {
        var departmentResult = await _departmentRepository.GetDepartmentAsync(departmentId);

        if (departmentResult is null)
            return Errors.Department.NotFound;

        var focalPointTask = departmentResult.FocalPointTasks.FirstOrDefault(fpt => fpt.Id == id);

        return focalPointTask is null ? Errors.FocalPointTask.NotFound : focalPointTask;
    }

    // Reset the TotalSubmissions and IsFinished properties of the focal point task at the start of a new month
    private static void CheckUpSubmissionsCount(FocalPointTask focalPointTask)
    {
        var lastSubmission = focalPointTask.Submissions.MaxBy(s => s.SubmittedAt);

        var lastSubmissionMonth = lastSubmission is null ? DateTime.UtcNow.Month : lastSubmission.SubmittedAt.Month;
        
        if (lastSubmissionMonth != DateTime.UtcNow.Month)
        {
            focalPointTask.TotalSubmissions = 0;
            focalPointTask.IsFinished = false;
        }
    }

    private static List<FieldAnswer> FilterValidAnswers(List<Field> fields, List<FieldAnswer> answers)
    {
        var existedFields = fields.Select(f => f.Id).ToList();
        var validAnswers = new List<FieldAnswer>();

        foreach(var answer in answers)
        {
            if(existedFields.Contains(answer.FieldId))
                validAnswers.Add(answer);
        }

        return validAnswers;
    }

    public async Task<ErrorOr<Submission>> SubmitFocalPointTaskAsync(Guid departmentId, Guid taskId, List<FieldAnswer> answers)
    {
        // Get the submitter user id from the token
        var submitterUserId = _userService.GetUserId();

        if (submitterUserId is null)
            return Errors.User.Unauthorized;
        
        var department = await _departmentRepository.GetDepartmentAsync(departmentId);

        if (department is null)
            return Errors.Department.NotFound;

        // Check if the submitter user is the focal point of the department
        if (department.HeadId is null || !department.HeadId.Equals(submitterUserId))
            return Errors.User.Unauthorized;

        // Check if the focal point task is assigned to the department
        var focalPointTask = department.FocalPointTasks.FirstOrDefault(fpt => fpt.Id == taskId);

        if (focalPointTask is null)
            return Errors.FocalPointTask.NotAssignedToDepartment;

        // Check if the submissions are completed for this month
        if (focalPointTask.IsFinished)
            return Errors.FocalPointTask.FinishedSubmissions;

        // Reset submissions count at the start of a new month
        CheckUpSubmissionsCount(focalPointTask);

        // Filter valid answers and check if all fields are answered
        var taskFields = focalPointTask.MonitoringTool.Fields;

        if (answers.Count != taskFields.Count)
            return Errors.Submission.NotAllFieldsAnswered;

        var validAnswers = FilterValidAnswers(taskFields, answers);

        if (validAnswers.IsNullOrEmpty() || validAnswers.Count != taskFields.Count)
            return Errors.Submission.NotAllFieldsAnswered;

        // Add submission
        var submission = new Submission
        {
            FocalPointTaskId = taskId,
            SubmitterId = submitterUserId,
            Number = focalPointTask.TotalSubmissions + 1,
            SubmittedAt = DateTime.UtcNow
        };

        focalPointTask.TotalSubmissions++;
        focalPointTask.IsFinished = focalPointTask.TotalSubmissions >= 14;

        var addedSubmission = await _submissionRepository.AddSubmission(submission);

        addedSubmission.Answers.AddRange(validAnswers);

        await _unitOfWork.SaveChangesAsync();

        return addedSubmission;
    }
}