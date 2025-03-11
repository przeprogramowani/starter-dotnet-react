using FlashcardsAPI.Models;

namespace FlashcardsAPI.Data;

public interface IFlashcardRepository
{
  IEnumerable<Flashcard> GetAll();
  Flashcard GetById(int id);
  Flashcard Create(FlashcardCreateDto flashcardDto);
  void Update(Flashcard flashcard);
  bool Delete(int id);
}
