using FlashcardsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FlashcardsAPI.Data;

public class FlashcardRepository : IFlashcardRepository
{
  private readonly FlashcardsDbContext _context;

  public FlashcardRepository(FlashcardsDbContext context)
  {
    _context = context;
  }

  public IEnumerable<Flashcard> GetAll()
  {
    return _context.Flashcards.ToList();
  }

  public Flashcard GetById(int id)
  {
    return _context.Flashcards.Find(id);
  }

  public Flashcard Create(FlashcardCreateDto flashcardDto)
  {
    var flashcard = new Flashcard
    {
      Question = flashcardDto.Question,
      Answer = flashcardDto.Answer,
      Difficulty = flashcardDto.Difficulty
    };

    _context.Flashcards.Add(flashcard);
    _context.SaveChanges();

    return flashcard;
  }

  public void Update(Flashcard flashcard)
  {
    _context.Entry(flashcard).State = EntityState.Modified;
    _context.SaveChanges();
  }

  public bool Delete(int id)
  {
    var flashcard = _context.Flashcards.Find(id);

    if (flashcard == null)
    {
      return false;
    }

    _context.Flashcards.Remove(flashcard);
    _context.SaveChanges();

    return true;
  }
}
