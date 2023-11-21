using Makassed.Api.Services.ApprovalRequests;

namespace Makassed.Api.Controllers;

public class ApprovalRequestsController : ApiController
{
    private readonly IApprovalRequestService _approvalRequestService;

    public ApprovalRequestsController(IApprovalRequestService approvalRequestService)
    {
        _approvalRequestService = approvalRequestService;
    }
}