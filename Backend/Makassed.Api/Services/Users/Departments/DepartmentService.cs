using Makassed.Api.Repositories;

namespace Makassed.Api.Services.Users.Departments;

public class DepartmentService : IDepartmentService
{
	private readonly IDepartmentRepository _departmentRepository;

	public DepartmentService(IDepartmentRepository departmentRepository)
	{
		_departmentRepository = departmentRepository;
	}
}