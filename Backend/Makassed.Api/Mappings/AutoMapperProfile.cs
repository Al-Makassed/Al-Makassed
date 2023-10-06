using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Chapter;
using Makassed.Contracts.PolicyDependency;
using Makassed.Contracts.Policy;

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
        
        CreateMap<Dependency, GetPolicyDependencyResponse>().ReverseMap();
        CreateMap<Dependency, CreatePolicyDependencyRequest>().ReverseMap();
    }
}
