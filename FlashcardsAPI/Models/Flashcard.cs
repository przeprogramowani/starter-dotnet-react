namespace FlashcardsAPI.Models;

public class Flashcard
{
  public int Id { get; set; }
  public required string Question { get; set; }
  public required string Answer { get; set; }
  public required string Difficulty { get; set; }
}
