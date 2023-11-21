using ErrorOr;
using Makassed.Api.Models.DTO;
using Makassed.Contracts.General;

namespace Makassed.Api.Services.ApprovalRequests;

public interface IApprovalRequestService
{
    Task<ErrorOr<List<RequestDto>>> GetApprovalRequestsAsync();

    Task<ErrorOr<SuccessResponse>> ApprovePolicyAsync(Guid id);

    Task<ErrorOr<SuccessResponse>> ApprovePolicyDependencyAsync(Guid id);

    Task<ErrorOr<SuccessResponse>> ApproveMonitoringToolAsync(Guid id);
}