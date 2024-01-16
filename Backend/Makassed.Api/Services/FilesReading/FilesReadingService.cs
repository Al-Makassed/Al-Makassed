using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Users;
using Makassed.Contracts.Enums;
using Makassed.Contracts.General;
using Sieve.Models;

namespace Makassed.Api.Services.FilesReading;

public class FilesReadingService : IFilesReadingService
{
    private readonly IFileReadingRepository _fileReadingRepository;
    private readonly IUserService _userService;
    private readonly IUnitOfWork _unitOfWork;

    public FilesReadingService(IFileReadingRepository fileReadingRepository, IUserService userService, IUnitOfWork unitOfWork)
    {
        _fileReadingRepository = fileReadingRepository;
        _userService = userService;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<Updated>> FinishReadingPolicyFile(Guid policyId)
    {
        var userId = _userService.GetUserId();

        if (userId is null)
            return Errors.User.Unauthorized;

        var readingResult = await _fileReadingRepository.GetPolicyReading(userId, policyId);

        //if readingResult is null, create new record of PolicyUser and let the ReadingState be Finished. Else, check its reading state and if its finished return updated.

        if (readingResult is null)
        {
            var policyUser = new PolicyUser
            {
                PolicyId = policyId,
                UserId = userId,
                ReadingState = FileReadingState.Finished,
                LastAccessed = DateTime.UtcNow
            };

            await _fileReadingRepository.AddPolicyReadingAsync(policyUser);
        }

        else if (readingResult.ReadingState != FileReadingState.Finished)
            readingResult.ReadingState = FileReadingState.Finished;

        await _unitOfWork.SaveChangesAsync();

        return Result.Updated;
    }

    public async Task<ErrorOr<PercentageSuccessResponse>> GetReadPoliciesPercentage(SieveModel sieveModel)
    {
        var userId = _userService.GetUserId();

        if (userId is null)
            return Errors.User.Unauthorized;

        var policies = await _fileReadingRepository.GetPoliciesReadingAsync(userId, sieveModel);

        if (policies is null)
            return Errors.Policy.NotFound;

        var finishedPoliciesCount = policies.Count(p => p.ReadingState == FileReadingState.Finished);

        var policiesCount = await _fileReadingRepository.GetAllPoliciesCountAsync();

        var percentage = finishedPoliciesCount / policiesCount * 100;

        return new PercentageSuccessResponse(percentage);
    }

    public async Task<ErrorOr<Updated>> FinishReadingDependencyFile(Guid id)
    {
        var userId = _userService.GetUserId();

        if (userId is null)
            return Errors.User.Unauthorized;

        var readingResult = await _fileReadingRepository.GetDependencyReading(userId, id);

        if (readingResult is null)
        {
            var dependencyUser = new DependencyUser
            {
                DependencyId = id,
                UserId = userId,
                ReadingState = FileReadingState.Finished,
                LastAccessed = DateTime.UtcNow
            };

            await _fileReadingRepository.AddDependencyReadingAsync(dependencyUser);
        }

        else if (readingResult.ReadingState != FileReadingState.Finished)
            readingResult.ReadingState = FileReadingState.Finished;

        await _unitOfWork.SaveChangesAsync();

        return Result.Updated;
    }

    public async Task<ErrorOr<PercentageSuccessResponse>> GetReadDependenciesPercentage(SieveModel sieveModel)
    {
        var userId = _userService.GetUserId();

        if (userId is null)
            return Errors.User.Unauthorized;

        var dependencies = await _fileReadingRepository.GetDependenciesReadingAsync(userId, sieveModel);

        if (dependencies is null)
            return Errors.PolicyDependency.NotFound;

        var finishedDependenciesCount = dependencies.Count(p => p.ReadingState == FileReadingState.Finished);

        var dependenciesCount = await _fileReadingRepository.GetAllDependenciesCountAsync();

        var percentage = finishedDependenciesCount / dependenciesCount * 100;

        return new PercentageSuccessResponse(percentage);
    }

    public async Task<ErrorOr<List<PolicyUser>>> GetFinishedPolicies(SieveModel sieveModel)
    {
        var userId = _userService.GetUserId();

        if (userId is null)
            return Errors.User.Unauthorized;

        var policies = await _fileReadingRepository.GetPoliciesReadingAsync(userId, sieveModel);

        if (policies is null)
            return Errors.Policy.NotFound;

        var finishedPolicies = policies.Where(p => p.ReadingState == FileReadingState.Finished).ToList();

        return finishedPolicies;
    }

    public async Task<ErrorOr<List<DependencyUser>>> GetFinishedDependencies(SieveModel sieveModel)
    {
        var userId = _userService.GetUserId();

        if (userId is null)
            return Errors.User.Unauthorized;

        var dependencies = await _fileReadingRepository.GetDependenciesReadingAsync(userId, sieveModel);

        if (dependencies is null)
            return Errors.PolicyDependency.NotFound;

        var finishedDependencies = dependencies.Where(p => p.ReadingState == FileReadingState.Finished).ToList();

        return finishedDependencies;
    }
}
