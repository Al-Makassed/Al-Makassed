using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.FocalPointTasks;

public interface IFocalPointTaskService
{
    Task<ErrorOr<List<FocalPointTask>>> GetFocalPointTasksAsync(Guid id);

    Task<ErrorOr<FocalPointTask>> GetFocalPointTaskByIdAsync(Guid departmentId, Guid id);

    Task<ErrorOr<Submission>> SubmitFocalPointTaskAsync(Guid departmentId, Guid taskId, List<FieldAnswer> answers);
}