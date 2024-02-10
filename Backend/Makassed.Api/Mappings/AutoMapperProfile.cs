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
using Makassed.Contracts.MonitoringTool.FocalPointTasks.Submissions;
using Makassed.Contracts.User;
using Makassed.Contracts.Submission;
using Makassed.Contracts.Search;
using Makassed.Contracts.Readings;
using Makassed.Contracts.Announcement;
using Makassed.Contracts.Category;

namespace Makassed.Api.Mappings;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Chapter, GetChapterResponse>().ReverseMap();
        CreateMap<Chapter, CreateChapterResponse>().ReverseMap();
        CreateMap<Chapter, CreateChapterRequest>().ReverseMap();
        CreateMap<Chapter, UpdateChapterRequest>().ReverseMap();
        CreateMap<Chapter, ChapterSearchResponse>().ReverseMap();
        CreateMap<Chapter, ChapterForReadingResponseDto>().ReverseMap();


        CreateMap<Policy, GetPolicyResponse>().ReverseMap();
        CreateMap<Policy, CreatePolicyRequest>().ReverseMap();
        CreateMap<Policy, UpdatePolicyRequest>().ReverseMap();
        CreateMap<Policy, PolicySearchResponse>().ReverseMap();
        CreateMap<Policy, PolicyForReadingResponseDto>().ReverseMap();
        
        CreateMap<Dependency, GetPolicyDependencyResponse>().ReverseMap();
        CreateMap<Dependency, CreatePolicyDependencyRequest>().ReverseMap();
        CreateMap<Dependency, UpdatePolicyDependencyRequest>().ReverseMap();
        CreateMap<Dependency, DependencySearchResponse>().ReverseMap();
        CreateMap<Dependency, DependencyForReadingResponseDto>().ReverseMap();

        CreateMap<MonitoringTool, GetMonitoringToolResponse>().ReverseMap();
        CreateMap<MonitoringTool, GetAllMonitoringToolBaseResponse>().ReverseMap();
        CreateMap<MonitoringTool, CreateMonitoringToolRequest>().ReverseMap();
        CreateMap<MonitoringTool, UpdateMonitoringToolRequest>().ReverseMap();
        CreateMap<MonitoringTool, GetMonitoringToolForFocalPointResponse>().ReverseMap();
        CreateMap<MonitoringTool, MonitoringToolDto>().ReverseMap();
        CreateMap<MonitoringToolDto, GetMonitoringToolResponse>().ReverseMap();
        CreateMap<MonitoringTool, MonitoringToolSearchResponse>().ReverseMap();

        CreateMap<Submission, SubmitMonitoringToolRequest>().ReverseMap();
        CreateMap<Submission, SubmitFocalPointTaskRequest>().ReverseMap();
        CreateMap<Submission, SubmitTaskResponse>().ReverseMap();

        CreateMap<Field, GetFieldResponse>().ReverseMap();
        CreateMap<Field, CreateFieldRequest>().ReverseMap();
        CreateMap<Field, UpdateFieldRequest>().ReverseMap();

        CreateMap<FieldAnswer, FieldAnswerRequest>().ReverseMap();
        CreateMap<FieldAnswersDto, SubmitFocalPointTaskRequest>().ReverseMap();
        CreateMap<FieldAnswer, GetFieldAnswersResponse>().ReverseMap();

        CreateMap<Department, GetDepartmentResponse>().ReverseMap();
        CreateMap<Department, CreateDepartmentRequest>().ReverseMap();
        CreateMap<Department, UpdateDepartmentRequest>().ReverseMap();

        CreateMap<FocalPointTask, GetAllFocalPointTasksBaseResponse>().ReverseMap();
        CreateMap<FocalPointTask, GetFocalPointTaskResponse>().ReverseMap();
        CreateMap<FocalPointTask, FpTaskSearchResponse>().ReverseMap();
        
        CreateMap<MakassedUser, UpdateUserRequest>().ReverseMap();
        CreateMap<MakassedUser, GetUserResponse>().ReverseMap();

        CreateMap<Submission, GetAllSubmissionBaseResponse>().ReverseMap();
        CreateMap<Submission, GetSubmissionResponse>().ReverseMap();
        CreateMap<Submission, GetFpTaskSubmissionResponse>().ReverseMap();

        CreateMap<MakassedUser, Submitter>().ReverseMap();
        CreateMap<MakassedUser, HeadDto>().ReverseMap();

        CreateMap<PolicyUser, GetPolicyReadingsResponse>().ReverseMap();
        CreateMap<DependencyUser, GetDependencyReadingsResponse>().ReverseMap();

        CreateMap<Announcement, CreateAnnouncementRequest>().ReverseMap();
        CreateMap<Announcement, GetAnnouncementResponse>().ReverseMap();

        CreateMap<Category, GetCategoryResponse>().ReverseMap();
        CreateMap<Category, CreateCategoryRequest>().ReverseMap();
        CreateMap<Category, UpdateCategoryRequest>().ReverseMap();
    }
}