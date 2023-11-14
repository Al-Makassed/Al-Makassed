using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Authentication;
using Makassed.Api.Services.MonitoringTools.FocalPointTasks;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Services.FocalPointTasks;

public class FocalPointTaskService : IFocalPointTaskService
{
    private readonly ISubmissionRepository _submissionRepository;
    private readonly IAuthenticationService _authenticationService;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public FocalPointTaskService(ISubmissionRepository submissionRepository, IAuthenticationService authenticationService, IDepartmentRepository departmentRepository, IUnitOfWork unitOfWork)
    {
        _submissionRepository = submissionRepository;
        _authenticationService = authenticationService;
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

    private bool CheckAllFieldsAnswered(List<Field> fields, List<FieldAnswer> answers)
    {
        var answeredFields = answers.Select(a => a.FieldId).ToList();

        if (fields.Count != answeredFields.Count)
            return false;

        return ((IEnumerable<Guid>)fields.OrderBy(x => x).ToList()).SequenceEqual(answeredFields.OrderBy(x => x).ToList());
    }

    private List<FieldAnswer>? FilterValidAnswers(List<Field> fields, List<FieldAnswer> answers)
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

    public async Task<ErrorOr<Submission>> SubmitFocalPointTaskAsync(Guid departmentId, Guid id, List<FieldAnswer> answers)
    {
        // Get the submitter user id from the token
        var submitterUserId = _authenticationService.GetAuthenticatedUserIdAsync();

        if (submitterUserId is null)
            return Errors.User.Unauthorized;
        
        var department = await _departmentRepository.GetDepartmentAsync(departmentId);

        if (department is null)
            return Errors.Department.NotFound;

        // Check if the submitter user is the focal point of the department
        if (department.HeadId.IsNullOrEmpty() || !department.HeadId!.Equals(submitterUserId))
            return Errors.User.Unauthorized;

        // Check if the focal point task is assigned to the department
        var focalPointTask = department.FocalPointTasks.FirstOrDefault(fpt => fpt.DepartmentId == departmentId);

        if (focalPointTask is null)
            return Errors.FocalPointTask.NotAssignedToDepartment;

        // Filter valid answers and check if all fields are answered
        var taskFields = focalPointTask.MonitoringTool.Fields;

        if (answers.Count != taskFields.Count)
            return Errors.Submission.NotAllFieldsAnswered;

        var validAnswers = FilterValidAnswers(taskFields, answers);

        if (validAnswers is null || validAnswers.Count != taskFields.Count)
            return Errors.Submission.NotAllFieldsAnswered;

        // Add submission
        var submission = new Submission
        {
            FocalPointTaskId = id,
            SubmitterId = submitterUserId
        };

        var addedSubmission = await _submissionRepository.AddSubmission(submission);

        addedSubmission.Answers.AddRange(validAnswers);

        await _unitOfWork.SaveChangesAsync();

        return addedSubmission;
    }
}