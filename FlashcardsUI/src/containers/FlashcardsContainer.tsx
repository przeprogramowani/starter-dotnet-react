import {useState, useEffect} from "react";
import {Flashcard} from "../types/Flashcard";
import {flashcardService} from "../api/flashcardService";
import {FlashcardItem} from "../components/FlashcardItem";

export const FlashcardsContainer = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const data = await flashcardService.getFlashcards();
        setFlashcards(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch flashcards. Please try again later.");
        console.error("Error fetching flashcards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  if (loading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div style={{color: "red"}}>{error}</div>;
  }

  return (
    <div className='flashcards-container'>
      <h2>Flashcards</h2>
      {flashcards.length === 0 ? (
        <p>No flashcards available.</p>
      ) : (
        flashcards.map((flashcard, index) => (
          <FlashcardItem key={index} flashcard={flashcard} />
        ))
      )}
    </div>
  );
};
