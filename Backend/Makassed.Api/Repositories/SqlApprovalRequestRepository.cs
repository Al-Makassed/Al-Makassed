using Makassed.Api.Services.ApprovalRequests;

namespace Makassed.Api.Repositories;

public class SqlApprovalRequestRepository : IApprovalRequestRepository
{
    private readonly IApprovalRequestService _requestService;

    public SqlApprovalRequestRepository(IApprovalRequestService requestService)
    {
        _requestService = requestService;
    }
}