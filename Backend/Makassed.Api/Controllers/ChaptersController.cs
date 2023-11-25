using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.Chapters;
using Makassed.Contracts.Chapter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Makassed.Api.Controllers;

public class ChaptersController : ApiController
{
    private readonly IChapterService _chapterService;
    private readonly IMapper _mapper;

    public ChaptersController(IChapterService chapterService, IMapper mapper)
    {
        _chapterService = chapterService;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(GetChapterResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetChapters([FromQuery] SieveModel sieveModel)
    {
        var chapters = await _chapterService.GetChaptersAsync(sieveModel);
        return Ok(_mapper.Map<List<GetChapterResponse>>(chapters));
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetChapter(Guid id)
    {
        var chapterResult = await _chapterService.GetChapterByIdAsync(id);

        return chapterResult.Match(
            chapter => Ok(_mapper.Map<GetChapterResponse>(chapter)),
            errors => Problem(errors)
        );
    }

    [Authorize(Roles = "Admin, Sub-Admin")]
    [ProducesResponseType(typeof(CreateChapterResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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

    [Authorize(Roles = "Admin, Sub-Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateChapter(Guid id,UpdateChapterRequest updateChapterRequest)
    {
        var chapter = _mapper.Map<Chapter>(updateChapterRequest);

        var updateChapterResult = await _chapterService.UpdateChapterAsync(id, chapter);

        return updateChapterResult.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }

    [Authorize(Roles = "Admin, Sub-Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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