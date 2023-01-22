import { useState } from "react";
import "./App.css";
import Loading from "./components/loadingWrapper/loadingWrapper";
import DataProvider from "./DataContext";

function App() {
  const [description, setDescription] = useState(true);
  return (
    <>
      {description ? (
        <div className="description">
          <h1>Movie Game</h1>
          <p>
            Here you can check your knowledge of the top rated movies in imdb.
            Rules: After start you will see a picture from a random popular
            movie. Make a guess about the name through the input field and click
            the confirm button. If your answer was wrong, another picture will
            appear. For each wrong answer you will receive an additional image.
            Point system: wrong answer = -1, give up = -5, correct answer = 5.
          </p>
          <button onClick={() => setDescription(false)}>Start</button>
        </div>
      ) : (
        <DataProvider>
          <Loading />
        </DataProvider>
      )}
    </>
  );
}

export default App;
