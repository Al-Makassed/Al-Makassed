namespace Makassed.Api.Services.ApprovalRequests;

public class ApprovalRequestService : IApprovalRequestService
{
    private readonly IApprovalRequestService _requestService;

    public ApprovalRequestService(IApprovalRequestService requestService)
    {
        _requestService = requestService;
    }
}