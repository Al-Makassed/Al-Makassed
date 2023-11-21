using Makassed.Api.Models.DTO;

namespace Makassed.Api.Repositories;

public interface IApprovalRequestRepository
{
    Task<List<RequestDto>> GetApprovalRequestsAsync();
}
