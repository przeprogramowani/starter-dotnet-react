using FlashcardsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FlashcardsAPI.Data;

public class FlashcardsDbContext : DbContext
{
  public FlashcardsDbContext(DbContextOptions<FlashcardsDbContext> options) : base(options)
  {
  }

  public DbSet<Flashcard> Flashcards { get; set; } = null!;

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Flashcard>()
        .HasKey(f => f.Id);

    // Seed initial data if needed
    modelBuilder.Entity<Flashcard>().HasData(
        new Flashcard
        {
          Id = 1,
          Question = "What is C#?",
          Answer = "A programming language",
          Difficulty = "easy"
        },
        new Flashcard
        {
          Id = 2,
          Question = "What is ASP.NET?",
          Answer = "A web framework",
          Difficulty = "normal"
        }
    );
  }
}
