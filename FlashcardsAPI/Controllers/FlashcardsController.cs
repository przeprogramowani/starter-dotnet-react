using Microsoft.AspNetCore.Mvc;

namespace FlashcardsAPI.Controllers;

[ApiController]
[Route("flashcards")]
public class FlashcardsController : ControllerBase
{
  [HttpGet]
  public IEnumerable<Flashcard> Get()
  {
    return new List<Flashcard>
    {
      new Flashcard { Question = "What is C#?", Answer = "A programming language" },
      new Flashcard { Question = "What is ASP.NET?", Answer = "A web framework" }
    };
  }
}

public class Flashcard
{
  public required string Question { get; set; }
  public required string Answer { get; set; }
}