using AutoMapper;
using ErrorOr;
using Makassed.Api.Models;
using Makassed.Api.Services.Chapters;
using Makassed.Contracts.Chapter;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers
{
    public class ChaptersController : ApiController
    {
        private readonly IChapterService _chapterService;
        private readonly IMapper _mapper;

        public ChaptersController(IChapterService chapterService, IMapper mapper)
        {
            _chapterService = chapterService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetChapters()
        {
            return Ok(await _chapterService.GetChaptersAsync());
        }


        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetChapter(Guid id)
        {
            ErrorOr<Chapter> chapterResult = await _chapterService.GetChapterByIdAsync(id);

            return chapterResult.Match(
                chapter => Ok(_mapper.Map<ChapterDto>(chapter)),
                errors => Problem(errors)
            );
        }

        [HttpPost]
        public async Task<IActionResult> CreateChapter(CreateChapterDto createChapterDto)
        {
            var chapter = _mapper.Map<Chapter>(createChapterDto);

            var chapterCreationResult = await _chapterService.CreateChapterAsync(chapter);

            return chapterCreationResult.Match(
                created => CreatedAtAction(
                            nameof(GetChapter), 
                            new { id = chapter.Id }, 
                            _mapper.Map<ChapterDto>(chapter)
                           ),
                errors => Problem(errors)
            );
        }
    }
}
