using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Chapter;
using Makassed.Contracts.PolicyDependency;
using Makassed.Contracts.Policy;
using Makassed.Contracts.MonitoringTool;
using Makassed.Contracts.MonitoringTool.Field;
using Makassed.Contracts.User.Department;
using Makassed.Api.Models.DTO;
using Makassed.Contracts.MonitoringTool.FocalPointTasks;

namespace Makassed.Api.Mappings;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Chapter, GetChapterResponse>().ReverseMap();
        CreateMap<Chapter, CreateChapterResponse>().ReverseMap();
        CreateMap<Chapter, CreateChapterRequest>().ReverseMap();
        CreateMap<Chapter, UpdateChapterRequest>().ReverseMap();
        
        CreateMap<Policy, GetPolicyResponse>().ReverseMap();
        CreateMap<Policy, CreatePolicyRequest>().ReverseMap();
        CreateMap<Policy, UpdatePolicyRequest>().ReverseMap();
        
        CreateMap<Dependency, GetPolicyDependencyResponse>().ReverseMap();
        CreateMap<Dependency, CreatePolicyDependencyRequest>().ReverseMap();
        CreateMap<Dependency, UpdatePolicyDependencyRequest>().ReverseMap();

        CreateMap<MonitoringTool, GetMonitoringToolResponse>().ReverseMap();
        CreateMap<MonitoringTool, GetAllMonitoringToolBaseResponse>().ReverseMap();
        CreateMap<MonitoringTool, CreateMonitoringToolRequest>().ReverseMap();
        CreateMap<MonitoringTool, UpdateMonitoringToolRequest>().ReverseMap();
        CreateMap<MonitoringTool, MonitoringToolDto>().ReverseMap();
        CreateMap<MonitoringToolDto, GetMonitoringToolResponse>().ReverseMap();
        CreateMap<Submission, SubmitMonitoringToolRequest>().ReverseMap();

        CreateMap<Field, GetFieldResponse>().ReverseMap();
        CreateMap<Field, CreateFieldRequest>().ReverseMap();
        CreateMap<Field, UpdateFieldRequest>().ReverseMap();

        CreateMap<Department, GetDepartmentResponse>().ReverseMap();
        CreateMap<Department, CreateDepartmentRequest>().ReverseMap();
        CreateMap<Department, UpdateDepartmentRequest>().ReverseMap();

        CreateMap<FocalPointTask, GetFocalPointTaskResponse>().ReverseMap();
    }
}
