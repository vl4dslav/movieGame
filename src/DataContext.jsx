import React, { createContext, useEffect, useState, useRef } from "react";
export const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [attempt, setAttempt] = useState(1);
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [movieCounter, setMovieCounter] = useState(1);
  const [loading, setLoading] = useState(true);
  const wasRendered = useRef(false);

  const preload = (imgArr, i) => {
    i = i || 0;
    if (imgArr && i < imgArr.length && (i % 6 !== 0 || i === 0)) {
      const img = new Image();
      img.onload = () => {
        preload(imgArr, i + 1);
        if (i === 3) setLoading(false);
      };
      img.src = imgArr[i].url;
    }
  };

  const reloadImgs = () => {
    wasRendered.current = false;
    setMovieCounter((prev) => prev + 1);
    setAttempt(1);
  };

  const newAttempt = () => {
    if (attempt === 4) {
      const img = new Image();
      img.src = data[6].url;
      preload(data, 7);
    } else if (attempt === 9) {
      const img = new Image();
      img.src = data[12].url;
      preload(data, 13);
    } else if (attempt === 15) {
      const img = new Image();
      img.src = data[18].url;
      preload(data, 19);
    }
    setAttempt((prev) => prev + 1);
  };

  useEffect(() => {
    if (wasRendered.current) return;
    wasRendered.current = true;
    setLoading(true);
    fetch("/.netlify/functions/imgs")
      .then((response) => response.json())
      .then((data) => {
        preload(data.images);
        setData(data.images);
        setTitle(data.title);
      })
      .catch((err) => console.log(err));
    setIndex(0);
  }, [movieCounter]);

  return (
    <DataContext.Provider
      value={{
        data,
        reloadImgs,
        attempt,
        newAttempt,
        title,
        points,
        setPoints,
        index,
        setIndex,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
