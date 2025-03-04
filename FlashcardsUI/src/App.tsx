import "./App.css";
import {FlashcardsContainer} from "./containers/FlashcardsContainer";

function App() {
  return (
    <div className='app'>
      <header>
        <h1>Flashcards Application</h1>
      </header>
      <main>
        <FlashcardsContainer />
      </main>
    </div>
  );
}

export default App;
