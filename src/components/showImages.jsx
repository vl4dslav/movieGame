import React, { useContext } from "react";
import { DataContext } from "../DataContext";
import ImgSlider from "./imgSlider";

function ShowImages() {
  const { data, attempt } = useContext(DataContext);
  const images = data
    .map((img, index) => {
      if (index < attempt) {
        return img.url;
      }
      return null;
    })
    .filter((elem) => elem !== null);
  return (
    <div className="images">
      <ImgSlider imgs={images} />
    </div>
  );
}

export default ShowImages;
