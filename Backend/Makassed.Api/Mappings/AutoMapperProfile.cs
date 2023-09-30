using AutoMapper;
using Makassed.Api.Models;
using Makassed.Contracts.Chapter;
using Makassed.Contracts.Dependency;
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
        CreateMap<Policy, PolicyDto>().ReverseMap();
        CreateMap<Dependency, DependencyDto>().ReverseMap();
    }
}
