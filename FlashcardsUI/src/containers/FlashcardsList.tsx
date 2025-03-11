import {useState, useEffect} from "react";
import {Flashcard} from "../types/Flashcard";
import {flashcardService} from "../api/flashcardService";
import {FlashcardItem} from "../components/FlashcardItem";
import {Typography, Box} from "@mui/material";

export const FlashcardsList = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const data = await flashcardService.getFlashcards();
      setFlashcards(data);
      setError(null);
    } catch (err) {
      setError(
        "Failed to fetch flashcards. Make sure your API is available..."
      );
      console.error("Error fetching flashcards:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await flashcardService.deleteFlashcard(id);
      setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
    } catch (err) {
      setError("Failed to delete flashcard. Please try again.");
      console.error("Error deleting flashcard:", err);
    }
  };

  const groupFlashcardsByDifficulty = () => {
    const grouped = {
      easy: flashcards.filter((card) => card.difficulty === "easy"),
      normal: flashcards.filter((card) => card.difficulty === "normal"),
      hard: flashcards.filter((card) => card.difficulty === "hard"),
    };
    return grouped;
  };

  if (loading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div style={{color: "red"}}>{error}</div>;
  }

  const groupedFlashcards = groupFlashcardsByDifficulty();

  const renderCategorySection = (
    title: string,
    cards: Flashcard[],
    color: string
  ) => {
    if (cards.length === 0) return null;

    return (
      <Box sx={{mb: 4}}>
        <Typography
          variant='h5'
          sx={{
            mb: 2,
            color: color,
            fontWeight: "bold",
            borderBottom: `2px solid ${color}`,
            paddingBottom: 1,
          }}
        >
          {title} ({cards.length})
        </Typography>
        <Box>
          {cards.map((flashcard) => (
            <FlashcardItem
              key={flashcard.id}
              flashcard={flashcard}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <div className='flashcards-container'>
      {flashcards.length === 0 ? (
        <p>No flashcards available.</p>
      ) : (
        <>
          {renderCategorySection("Easy", groupedFlashcards.easy, "#2e7d32")}
          {renderCategorySection("Normal", groupedFlashcards.normal, "#ed6c02")}
          {renderCategorySection("Hard", groupedFlashcards.hard, "#d32f2f")}
        </>
      )}
    </div>
  );
};
