import {Box, Typography} from "@mui/material";

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: "primary.main", // MUI's primary blue color
        color: "primary.contrastText", // Contrasting text color (usually white)
        py: 3,
        mt: "auto",
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "primary.light", // Lighter blue for the border
      }}
    >
      <Typography variant='body2'>Flashcards Workshop | Opanuj.AI</Typography>
    </Box>
  );
};

export default Footer;
