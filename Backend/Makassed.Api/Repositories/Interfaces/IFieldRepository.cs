using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories.Interfaces;

public interface IFieldRepository
{
    Task<List<Field>> GetFieldsAsync();
    
    Task<Field?> GetFieldAsync(Guid id);
    
    Task<Field?> GetFieldByContentAsync(string fieldContent);
    
    Task<Field> CreateFieldAsync(Field field);
    
    Task<Field?> UpdateFieldAsync(Guid id, Field field);
    
    Task<Field?> DeleteFieldAsync(Guid id);
}