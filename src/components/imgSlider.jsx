import React, { useState } from "react";

function ImgSlider(props) {
  const [index, setIndex] = useState(0);
  const changeIndex = (direction) => {
    console.log(props.imgs);
    console.log(index);
    if (direction === "next") {
      setIndex((prev) => (prev + 1) % props.imgs.length);
    } else if (direction === "prev") {
      setIndex((prev) =>
        prev - 1 < 0 ? props.imgs.length - 1 : (prev - 1) % props.imgs.length
      );
    }
  };
  return (
    <div className="img-slider">
      <div className="img-box">
        <img src={props.imgs[index]} alt="img" />
      </div>
      {props.imgs.length > 1 ? (
        <>
          <div className="btn btn-prev" onClick={() => changeIndex("prev")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M328 112L184 256l144 144"
              />
            </svg>
          </div>
          <div className="btn btn-next" onClick={() => changeIndex("next")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M184 112l144 144-144 144"
              />
            </svg>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ImgSlider;
