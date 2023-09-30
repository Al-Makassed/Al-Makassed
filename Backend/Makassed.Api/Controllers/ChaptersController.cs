using AutoMapper;
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
            var chapters = await _chapterService.GetChaptersAsync();
            return Ok(_mapper.Map<List<GetChapterResponse>>(chapters                ));
        }


        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetChapter(Guid id)
        {
            var chapterResult = await _chapterService.GetChapterByIdAsync(id);

            return chapterResult.Match(
                chapter => Ok(_mapper.Map<GetChapterResponse>(chapter)),
                errors => Problem(errors)
            );
        }

        [HttpPost]
        public async Task<IActionResult> CreateChapter(CreateChapterRequest createChapterRequest)
        {
            var chapter = _mapper.Map<Chapter>(createChapterRequest);

            var chapterCreationResult = await _chapterService.CreateChapterAsync(chapter);

            return chapterCreationResult.Match(
                _ => CreatedAtAction(
                            nameof(GetChapter), 
                            new { id = chapter.Id }, 
                            _mapper.Map<CreateChapterResponse>(chapter)
                           ),
                errors => Problem(errors)
            );
        }
        
        
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateChapter(Guid id,UpdateChapterRequest updateChapterRequest)
        {
            var chapter = _mapper.Map<Chapter>(updateChapterRequest);

            var updateChapterResult = await _chapterService.UpdateChapterAsync(id, chapter, updateChapterRequest.PoliciesIdes);

            return updateChapterResult.Match(
                _ => NoContent(),
                errors => Problem(errors)
            );
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteChapter(Guid id)
        {
            var deleteChapterResult = await _chapterService.DeleteChapterAsync(id);
            
            return deleteChapterResult.Match(
                _ => NoContent(),
                errors => Problem(errors)
            );
        }
    }
}
