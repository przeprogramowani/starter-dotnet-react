import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";
import {CreateFlashcardDto} from "../types/CreateFlashcardDto";

interface FlashcardFormProps {
  onSubmit: (flashcard: CreateFlashcardDto) => Promise<void>;
  isSubmitting?: boolean;
}

const FlashcardForm = ({
  onSubmit,
  isSubmitting = false,
}: FlashcardFormProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("normal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({question, answer, difficulty});
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value);
  };

  return (
    <Paper elevation={2} sx={{p: 3, mb: 3}}>
      <Typography variant='h6' component='h2' sx={{mb: 2}}>
        Create New Flashcard
      </Typography>

      <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
        <TextField
          id='question'
          label='Question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          multiline
          rows={3}
          disabled={isSubmitting}
          fullWidth
          margin='normal'
          variant='outlined'
        />

        <TextField
          id='answer'
          label='Answer'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          rows={3}
          disabled={isSubmitting}
          fullWidth
          margin='normal'
          variant='outlined'
        />

        <FormControl fullWidth margin='normal'>
          <InputLabel id='difficulty-label'>Difficulty Level</InputLabel>
          <Select
            labelId='difficulty-label'
            id='difficulty'
            value={difficulty}
            label='Difficulty Level'
            onChange={handleDifficultyChange}
            disabled={isSubmitting}
          >
            <MenuItem value='easy'>Easy</MenuItem>
            <MenuItem value='normal '>Normal</MenuItem>
            <MenuItem value='hard'>Hard</MenuItem>
          </Select>
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={isSubmitting}
          sx={{mt: 2, py: 1}}
          startIcon={
            isSubmitting ? <CircularProgress size={20} color='inherit' /> : null
          }
        >
          {isSubmitting ? "Creating..." : "Create Flashcard"}
        </Button>
      </Box>
    </Paper>
  );
};

export default FlashcardForm;
