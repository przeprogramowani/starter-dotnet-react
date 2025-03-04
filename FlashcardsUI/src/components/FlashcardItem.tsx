import {useState} from "react";
import {Flashcard} from "../types/Flashcard";

interface FlashcardItemProps {
  flashcard: Flashcard;
}

export const FlashcardItem = ({flashcard}: FlashcardItemProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div
      className='flashcard-item'
      onClick={() => setShowAnswer(!showAnswer)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px 0",
        cursor: "pointer",
        backgroundColor: "#0e0e0e",
      }}
    >
      <h3>{flashcard.question}</h3>
      {showAnswer && (
        <div className='answer'>
          <p>{flashcard.answer}</p>
        </div>
      )}
      <p className='hint' style={{fontSize: "12px", color: "#666"}}>
        Click to {showAnswer ? "hide" : "show"} answer
      </p>
    </div>
  );
};
