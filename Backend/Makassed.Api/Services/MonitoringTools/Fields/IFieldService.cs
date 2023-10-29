using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Api.Services.MonitoringTools.Fields;

public interface IFieldService
{
    Task<ErrorOr<List<Field>>> GetFieldsAsync();
    
    Task<ErrorOr<Field>> GetFieldAsync(Guid id);
    
    Task<ErrorOr<Field>> CreateFieldAsync(Field createFieldDto);
    
    Task<ErrorOr<Field>> UpdateFieldAsync(Guid id, Field updateFieldDto);
    Task<ErrorOr<Field>> DeleteFieldAsync(Guid id);
}