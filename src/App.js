import { useState } from "react";
import "./App.css";
import Input from "./components/input";
import ShowImages from "./components/showImages";
import DataProvider from "./DataContext";
function App() {
  const [description, setDescription] = useState(true);
  return (
    <>
      {description ? (
        <div className="description">
          <h1>Movie Game</h1>
          <p>
            Here you can check your knowledge of the most popular movies in
            imdb. Rule: After start you will see a picture from a random popular
            movie. Make an assumption of the title via input field and push the
            confirm button. If your answer was incorrect, another picture will
            be shown. For each wrong answer you will get additional image. Point
            system: wrong answer = -1, give up = -5, correct answer = 5.
          </p>
          <button onClick={() => setDescription(false)}>Start</button>
        </div>
      ) : (
        <DataProvider>
          <ShowImages />
          <Input />
        </DataProvider>
      )}
    </>
  );
}

export default App;
