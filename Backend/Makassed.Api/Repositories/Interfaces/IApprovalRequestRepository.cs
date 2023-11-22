using Makassed.Api.Models.DTO;

namespace Makassed.Api.Repositories.Interfaces;

public interface IApprovalRequestRepository
{
    Task<List<RequestDto>> GetApprovalRequestsAsync();
}
