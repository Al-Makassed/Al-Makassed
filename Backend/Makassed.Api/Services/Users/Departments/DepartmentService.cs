using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Users.Departments;

public class DepartmentService : IDepartmentService
{
	private readonly IDepartmentRepository _departmentRepository;
    private readonly UserManager<MakassedUser> _userManager;

    public DepartmentService(IDepartmentRepository departmentRepository, UserManager<MakassedUser> userManager)
	{
		_departmentRepository = departmentRepository;
        _userManager = userManager;
    }

	public async Task<List<Department>> GetDepartmentsAsync()
	{
		return await _departmentRepository.GetDepartmentsAsync();
	}

	public async Task<ErrorOr<Department>> GetDepartmentAsync(Guid id)
	{
		var departmentResult = await _departmentRepository.GetDepartmentAsync(id);

		return departmentResult is null ? Errors.Department.NotFound : departmentResult;
	}

	public async Task<ErrorOr<Department>> CreateDepartmentAsync(Department department)
	{
		var existingDepartment = await _departmentRepository.GetDepartmentByNameAsync(department.Name);

		if (existingDepartment is not null) 
			return Errors.Department.AlreadyExists;

		var createdDepartment = await _departmentRepository.CreateDepartmentAsync(department);

		return createdDepartment;
	}

	public async Task<ErrorOr<Department>> UpdateDepartmentAsync(Guid id, Department department)
	{
		var existingDepartment = await _departmentRepository.GetDepartmentByIdAsync(id);

		if (existingDepartment is null)
			return Errors.Department.NotFound;

        if (department.HeadId is not null) 
		{             
			var head = await _userManager.FindByIdAsync(department.HeadId);

            if (head is null)
                return Errors.User.NotFound;

			if (!head.DepartmentId.Equals(existingDepartment.Id))
				return Errors.Department.DoesNotBelong;

            var headRoles = await _userManager.GetRolesAsync(head);

			if (!(headRoles[0].Equals("Focal Point") || headRoles[0].Equals("Admin")))
				return Errors.Department.InvalidHeadRole;
		}

		var updatedDepartment = await _departmentRepository.UpdateDepartmentAsync(id, department);

		return updatedDepartment!;
	}

	public async Task<ErrorOr<Department>> DeleteDepartmentAsync(Guid id)
	{
		var deletedDepartment = await _departmentRepository.DeleteDepartmentAsync(id);

        return deletedDepartment is null ? Errors.Department.NotFound : deletedDepartment;
	}

	public async Task<ErrorOr<List<FocalPointTask>>> GetFocalPointTasksAsync(Guid id)
	{
		var departmentResult = await _departmentRepository.GetDepartmentAsync(id);

		if (departmentResult is null)
            return Errors.Department.NotFound;

		return departmentResult.FocalPointTasks.ToList();
	}
}