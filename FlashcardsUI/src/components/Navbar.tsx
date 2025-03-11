import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position='static' color='primary' sx={{marginBottom: 4}}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            align='left'
            variant='h6'
            component={RouterLink}
            to='/'
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            Flashcards App
          </Typography>
          <Box sx={{display: "flex", gap: 2}}>
            <Button color='inherit' component={RouterLink} to='/'>
              Home
            </Button>
            <Button color='inherit' component={RouterLink} to='/create'>
              Create
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
