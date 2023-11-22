using Makassed.Api.Models.DTO;
using Makassed.Api.Services.ApprovalRequests;
using Makassed.Contracts.General;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

[Route("api/requests")]
[Authorize(Roles ="Admin")]
public class ApprovalRequestsController : ApiController
{
    private readonly IApprovalRequestService _approvalRequestService;

    public ApprovalRequestsController(IApprovalRequestService approvalRequestService)
    {
        _approvalRequestService = approvalRequestService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<RequestDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetApprovalRequests()
    {
        var approvalRequests = await _approvalRequestService.GetApprovalRequestsAsync();

        return approvalRequests.Match(
            _ => Ok(),
            errors => Problem(errors)
        );
    }

    [HttpPut("policies/{id}")]
    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ApproveRequest(Guid id)
    {
        var approvalResult = await _approvalRequestService.ApprovePolicyAsync(id);

        return approvalResult.Match(
            result => Ok(result),
            errors => Problem(errors)
        );
    }

    [HttpPut("policy-dependencies/{id}")]
    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ApprovePolicyDependency(Guid id)
    {
        var approvalResult = await _approvalRequestService.ApprovePolicyDependencyAsync(id);

        return approvalResult.Match(
            result => Ok(result),
            errors => Problem(errors)
        );
    }

    [HttpPut("monitoring-tools/{id}")]
    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ApproveMonitoringTool(Guid id)
    {
        var approvalResult = await _approvalRequestService.ApproveMonitoringToolAsync(id);

        return approvalResult.Match(
            result => Ok(result),
            errors => Problem(errors)
        );
    }
}