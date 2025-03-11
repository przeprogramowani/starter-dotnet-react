import {useState} from "react";
import {Flashcard} from "../types/Flashcard";
import {
  Card,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const getDifficultyLabel = (
  difficulty: string
): {label: string; color: "success" | "warning" | "error"} => {
  switch (difficulty) {
    case "easy":
      return {label: "Easy", color: "success"};
    case "normal":
      return {label: "Normal", color: "warning"};
    case "hard":
      return {label: "Hard", color: "error"};
    default:
      return {label: "Normal", color: "warning"};
  }
};

interface FlashcardItemProps {
  flashcard: Flashcard;
  onDelete: (id: number) => void;
}

export const FlashcardItem = ({flashcard, onDelete}: FlashcardItemProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const difficultyInfo = getDifficultyLabel(flashcard.difficulty);

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(flashcard.id);
  };

  return (
    <Card
      onClick={() => setShowAnswer(!showAnswer)}
      sx={{
        borderRadius: 2,
        margin: 2,
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant='h6' component='div'>
            {flashcard.question}
          </Typography>
        </Box>

        <Collapse in={showAnswer}>
          <Box sx={{mt: 1, mb: 1}}>
            <Divider />
            <Typography variant='body1' sx={{mt: 2, color: "text.primary"}}>
              {flashcard.answer}
            </Typography>
          </Box>
        </Collapse>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{display: "block", mt: 1}}
        >
          Click to {showAnswer ? "hide" : "show"} answer
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Chip
            label={difficultyInfo.label}
            color={difficultyInfo.color}
            size='small'
          />
          <IconButton
            size='small'
            color='error'
            onClick={handleDeleteClick}
            aria-label='delete'
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
