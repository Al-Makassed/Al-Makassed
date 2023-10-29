using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Api.Repositories;

public interface IFieldRepository
{
    Task<List<Field>> GetFieldsAsync();
    
    Task<Field?> GetFieldAsync(Guid id);
    
    Task<Field> CreateFieldAsync(Field field);
    
    Task<Field> UpdateFieldAsync(Guid id, Field field);
    
    Task<Field> DeleteFieldAsync(Guid id);
}