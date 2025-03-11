import apiClient from "./apiClient";
import {Flashcard} from "../types/Flashcard";
import {FlashcardCandidate} from "../types/FlashcardCandidate";
import {CreateFlashcardDto} from "../types/CreateFlashcardDto";
import {GenerateFlashcardDto} from "../types/GenerateFlashcardDto";

export const flashcardService = {
  getFlashcards: async (): Promise<Flashcard[]> => {
    const response = await apiClient.get<Flashcard[]>("/flashcards");
    return response.data;
  },

  createFlashcard: async (
    flashcard: CreateFlashcardDto
  ): Promise<Flashcard> => {
    const response = await apiClient.post<Flashcard>("/flashcards", flashcard);
    return response.data;
  },

  generateFlashcards: async (
    text: string,
    count: number = 5
  ): Promise<FlashcardCandidate[]> => {
    const response = await apiClient.post<FlashcardCandidate[]>(
      "/flashcards/generate",
      {
        text,
        count,
      } as GenerateFlashcardDto
    );
    return response.data;
  },

  deleteFlashcard: async (id: number): Promise<void> => {
    await apiClient.delete(`/flashcards/${id}`);
  },
};
