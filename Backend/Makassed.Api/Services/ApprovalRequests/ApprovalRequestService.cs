using ErrorOr;
using Makassed.Api.Models.DTO;
using Makassed.Api.Repositories;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;
using Makassed.Contracts.General;

namespace Makassed.Api.Services.ApprovalRequests;

public class ApprovalRequestService : IApprovalRequestService
{
    private readonly IApprovalRequestRepository _requestRepository;
    private readonly IPolicyRepository _policyRepository;
    private readonly IPolicyDependencyRepository _policyDependencyRepository;
    private readonly IMonitoringToolRepository _monitoringToolRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ApprovalRequestService(IApprovalRequestRepository approvalRequestRepository, 
        IPolicyRepository policyRepository, 
        IPolicyDependencyRepository policyDependencyRepository,
        IMonitoringToolRepository monitoringToolRepository,
        IUnitOfWork unitOfWork)
    {
        _requestRepository = approvalRequestRepository;
        _policyRepository = policyRepository;
        _policyDependencyRepository = policyDependencyRepository;
        _monitoringToolRepository = monitoringToolRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ErrorOr<List<RequestDto>>> GetApprovalRequestsAsync()
    {
        return await _requestRepository.GetApprovalRequestsAsync();
    }

    private async Task<ErrorOr<SuccessResponse>> ApproveAsync<TEntity>(
        Task<TEntity> getEntityTask, 
        Action<TEntity> approveAction)
    {
        var entityToApprove = await getEntityTask;

        if (entityToApprove is null)
            return Errors.Entity.NotFound;

        approveAction(entityToApprove);

        await _unitOfWork.SaveChangesAsync();

        return new SuccessResponse($"{typeof(TEntity).Name} is approved successfully.");
    }

    public async Task<ErrorOr<SuccessResponse>> ApprovePolicyAsync(Guid id)
    {
        return await ApproveAsync(
            _policyRepository.GetPolicyByIdAsync(id),
            policy => policy!.IsApproved = true
        );
    }

    public async Task<ErrorOr<SuccessResponse>> ApprovePolicyDependencyAsync(Guid id)
    {
        return await ApproveAsync(
            _policyDependencyRepository.GetPolicyDependencyByIdAsync(id),
            dependency => dependency!.IsApproved = true
        );
    }

    public async Task<ErrorOr<SuccessResponse>> ApproveMonitoringToolAsync(Guid id)
    {
        return await ApproveAsync(
            _monitoringToolRepository.GetMonitoringToolByIdAsync(id),
            monitoringTool => monitoringTool!.IsApproved = true
        );
    }
}