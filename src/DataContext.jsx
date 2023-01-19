import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [attempt, setAttempt] = useState(1);
  const [points, setPoints] = useState(0);
  const [updateMovie, setUpdateMovie] = useState(1);
  const reloadImgs = () => {
    setUpdateMovie((prev) => prev + 1);
    setAttempt(1);
  };
  const newAttempt = () => setAttempt((prev) => prev + 1);
  useEffect(() => {
    fetch("/.netlify/functions/imgs")
      .then((response) => response.json())
      .then((data) => {
        setData(data.images);
        setTitle(data.title);
      });
  }, [updateMovie]);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
