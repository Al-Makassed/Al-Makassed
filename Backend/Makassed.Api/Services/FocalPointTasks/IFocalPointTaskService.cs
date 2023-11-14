using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.MonitoringTool.FocalPointTasks;

namespace Makassed.Api.Services.MonitoringTools.FocalPointTasks;

public interface IFocalPointTaskService
{
    Task<ErrorOr<List<FocalPointTask>>> GetFocalPointTasksAsync(Guid id);

    Task<ErrorOr<FocalPointTask>> GetFocalPointTaskByIdAsync(Guid departmentId, Guid id);

    Task<ErrorOr<Submission>> SubmitFocalPointTaskAsync(Guid departmentId, Guid id, List<FieldAnswer> answers);
}