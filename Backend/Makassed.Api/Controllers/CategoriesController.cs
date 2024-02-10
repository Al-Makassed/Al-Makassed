using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.Categories;
using Makassed.Contracts.Category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;
public class CategoriesController : ApiController
{
    private readonly ICategoryService _categoryService;
    private readonly IMapper _mapper;

    public CategoriesController(ICategoryService categoryService, IMapper mapper)
    {
        _categoryService = categoryService;
        _mapper = mapper;
    }

    [HttpGet]
    //[Authorize]
    [ProducesResponseType(typeof(List<GetCategoryResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetCategories()
    {
        return Ok(_mapper.Map<List<GetCategoryResponse>>(await _categoryService.GetCategoriesAsync()));
    }

    [HttpGet("{id:guid}")]
    //[Authorize]
    [ProducesResponseType(typeof(GetCategoryResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetCategory(Guid id)
    {
        var fieldResult = await _categoryService.GetCategoryAsync(id);

        return fieldResult.Match(
            _ => Ok(_mapper.Map<GetCategoryResponse>(fieldResult.Value)),
            errors => Problem(errors)
        );

    }

    [HttpPost]
    //[Authorize(Roles = "Admin, Sub-Admin")]
    [ProducesResponseType(typeof(GetCategoryResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest request)
    {
        var fieldResult = await _categoryService.CreateCategoryAsync(_mapper.Map<Category>(request));

        return fieldResult.Match(
            _ => CreatedAtAction(nameof(GetCategory), new { id = fieldResult.Value.Id }, _mapper.Map<GetCategoryResponse>(fieldResult.Value)),
            errors => Problem(errors)
        );
    }

    [HttpPut("{id:guid}")]
    //[Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(GetCategoryResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] UpdateCategoryRequest request)
    {
        var fieldResult = await _categoryService.UpdateCategoryAsync(id, _mapper.Map<Category>(request));

        return fieldResult.Match(
            _ => Ok(_mapper.Map<GetCategoryResponse>(fieldResult.Value)),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{id:guid}")]
    //[Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(GetCategoryResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        var fieldResult = await _categoryService.DeleteCategoryAsync(id);

        return fieldResult.Match(
            _ => Ok(_mapper.Map<GetCategoryResponse>(fieldResult.Value)),
            errors => Problem(errors)
        );
    }
}
