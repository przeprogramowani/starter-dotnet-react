import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {flashcardService} from "../api/flashcardService";
import {CreateFlashcardDto} from "../types/CreateFlashcardDto";

interface UseFlashcardCreateReturn {
  handleCreateFlashcard: (flashcard: CreateFlashcardDto) => Promise<void>;
  message: string;
  isSubmitting: boolean;
}

export function useFlashcardCreate(): UseFlashcardCreateReturn {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreateFlashcard = async (flashcard: CreateFlashcardDto) => {
    setIsSubmitting(true);
    try {
      await flashcardService.createFlashcard(flashcard);
      setMessage("Flashcard created successfully!");
      // Redirect to home page after 1 second
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMessage("Error creating flashcard");
      console.error("Error creating flashcard:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {handleCreateFlashcard, message, isSubmitting};
}
