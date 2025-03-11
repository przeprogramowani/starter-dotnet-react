import {Typography} from "@mui/material";
import FlashcardForm from "../components/FlashcardForm";
import {useFlashcardCreate} from "../hooks/useFlashcardCreate";

const CreatePage = () => {
  const {handleCreateFlashcard, message, isSubmitting} = useFlashcardCreate();

  return (
    <div className='create-page'>
      <FlashcardForm
        onSubmit={handleCreateFlashcard}
        isSubmitting={isSubmitting}
      />
      {message && <Typography className='message'>{message}</Typography>}
    </div>
  );
};

export default CreatePage;
