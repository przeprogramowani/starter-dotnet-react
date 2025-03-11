import {useState} from "react";
import {flashcardService} from "../api/flashcardService";
import {FlashcardCandidate} from "../types/FlashcardCandidate";

const useFlashcardGenerator = () => {
  const [bulkText, setBulkText] = useState("");
  const [candidates, setCandidates] = useState<FlashcardCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const generatedCandidates = await flashcardService.generateFlashcards(
        bulkText
      );
      setCandidates(generatedCandidates);
    } catch (err) {
      console.error("Error generating flashcards:", err);
      setError("Failed to generate flashcards. Please try again.");
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    bulkText,
    setBulkText,
    candidates,
    setCandidates,
    loading,
    error,
    generateFlashcards,
  };
};

export default useFlashcardGenerator;
