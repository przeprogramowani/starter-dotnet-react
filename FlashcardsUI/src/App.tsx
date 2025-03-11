import {CssBaseline, Container, Box} from "@mui/material";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Navbar />
      <Container sx={{flex: 1}}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
