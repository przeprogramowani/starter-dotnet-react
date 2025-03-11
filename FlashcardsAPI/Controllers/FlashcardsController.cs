using Microsoft.AspNetCore.Mvc;
using FlashcardsAPI.Models;
using FlashcardsAPI.Data;
using FlashcardsAPI.Services;

namespace FlashcardsAPI.Controllers;

[ApiController]
[Route("flashcards")]
public class FlashcardsController : ControllerBase
{
  private readonly IFlashcardRepository _repository;

  private readonly IOpenRouterService _openRouterService;

  public FlashcardsController(IFlashcardRepository repository, IOpenRouterService openRouterService)
  {
    _repository = repository;
    _openRouterService = openRouterService;
  }

  [HttpGet]
  public IEnumerable<Flashcard> Get()
  {
    return _repository.GetAll();
  }

  [HttpPost]
  public ActionResult<Flashcard> Create(FlashcardCreateDto flashcardDto)
  {
    try
    {
      var flashcard = _repository.Create(flashcardDto);
      return CreatedAtAction(nameof(Get), new { id = flashcard.Id }, flashcard);
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Error creating flashcard: {ex.Message}");
    }
  }

  [HttpDelete("{id}")]
  public ActionResult Delete(int id)
  {
    try
    {
      var deleted = _repository.Delete(id);

      if (!deleted)
      {
        return NotFound($"Flashcard with id {id} not found");
      }

      return NoContent();
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Error deleting flashcard: {ex.Message}");
    }
  }
}