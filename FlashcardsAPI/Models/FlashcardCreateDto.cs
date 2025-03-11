namespace FlashcardsAPI.Models;

public class FlashcardCreateDto
{
  public required string Question { get; set; }
  public required string Answer { get; set; }
  public required string Difficulty { get; set; }
}
