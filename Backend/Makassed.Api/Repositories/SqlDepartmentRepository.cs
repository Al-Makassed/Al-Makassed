using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories;

public class SqlDepartmentRepository : IDepartmentRepository
{
    private readonly MakassedDbContext _dbContext;
    public SqlDepartmentRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Department>> GetDepartmentsAsync()
    {
        return await _dbContext.Departments.ToListAsync();
    }

    public async Task<Department?> GetDepartmentAsync(Guid id)
    {
        return await _dbContext.Departments.Include(d => d.Head).FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<Department> CreateDepartmentAsync(Department department)
    {
        await _dbContext.Departments.AddAsync(department);
        await _dbContext.SaveChangesAsync();

        return department;
    }

    public async Task<Department?> UpdateDepartmentAsync(Guid id, Department field)
    {
        var departmentToUpdate = await _dbContext.Departments.FirstOrDefaultAsync(d => d.Id == id);

        if (departmentToUpdate == null)
            return null;
        
        departmentToUpdate.Name = field.Name;
        departmentToUpdate.HeadId = field.HeadId;

        await _dbContext.SaveChangesAsync();

        return departmentToUpdate;
    }

    public async Task<Department?> DeleteDepartmentAsync(Guid id)
    {
        var departmentToDelete = await _dbContext.Departments.FirstOrDefaultAsync(d => d.Id == id);

        if (departmentToDelete == null)
            return null;

        _dbContext.Departments.Remove(departmentToDelete);
        await _dbContext.SaveChangesAsync();

        return departmentToDelete;
    }

    public Task<Department?> GetDepartmentByNameAsync(string departmentName)
    {
        return _dbContext.Departments.FirstOrDefaultAsync(d => d.Name == departmentName);
    }

    public Task<Department?> GetDepartmentByIdAsync(Guid id)
    {
        return _dbContext.Departments.FirstOrDefaultAsync(d => d.Id == id);
    }
}