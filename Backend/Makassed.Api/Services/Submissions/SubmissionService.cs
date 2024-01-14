using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.FocalPointTasks;
using Makassed.Api.Services.Users;
using Sieve.Models;

namespace Makassed.Api.Services.Submissions;

public class SubmissionService : ISubmissionService
{
    private readonly ISubmissionRepository _submissionRepository;
    private readonly IFocalPointTaskService _focalPointTaskService;
    private readonly IUserService _userService;

    public SubmissionService(
        ISubmissionRepository submissionRepository,
        IFocalPointTaskService focalPointTaskService,
        IUserService userService
    )
    {
        _submissionRepository = submissionRepository;
        _focalPointTaskService = focalPointTaskService;
        _userService = userService;
    }
    
    public async Task<List<Submission>> GetAllSubmissionsAsync(SieveModel sieveModel)
    {
        return await _submissionRepository.GetAllSubmissionsAsync(sieveModel);                
    }

    public async Task<ErrorOr<Submission>> GetSubmissionByIdAsync(Guid id)
    {
        var submission = await _submissionRepository.GetSubmissionByIdAsync(id);

        if (submission is null)
            return Errors.Submission.NotFound;

        return submission;
    }
}
