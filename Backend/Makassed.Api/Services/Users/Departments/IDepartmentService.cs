using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.Users.Departments;

public interface IDepartmentService
{
    Task<List<Department>> GetDepartmentsAsync();

    Task<ErrorOr<Department>> GetDepartmentAsync(Guid id);

    Task<ErrorOr<Department>> CreateDepartmentAsync(Department department);

    Task<ErrorOr<Department>> UpdateDepartmentAsync(Guid id, Department department);

    Task<ErrorOr<Department>> DeleteDepartmentAsync(Guid id);
}