import apiClient from "./apiClient";
import {Flashcard} from "../types/Flashcard";

export const flashcardService = {
  getFlashcards: async (): Promise<Flashcard[]> => {
    const response = await apiClient.get<Flashcard[]>("/flashcards");
    return response.data;
  },
};
