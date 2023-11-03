using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IDepartmentRepository
{
    Task<List<Department>> GetDepartmentsAsync();

    Task<Department?> GetDepartmentAsync(Guid id);

    Task<Department> CreateDepartmentAsync(Department department);

    Task<Department?> UpdateDepartmentAsync(Guid id, Department department);

    Task<Department?> DeleteDepartmentAsync(Guid id);

    Task<Department?> GetDepartmentByNameAsync(string departmentName);

    Task<Department?> GetDepartmentByIdAsync(Guid id);
}