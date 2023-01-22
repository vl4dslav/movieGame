import { useContext } from "react";
import Input from "../input/input";
import ShowImages from "../showImages/showImages";
import { DataContext } from "../../DataContext";
import "./loadingWrapper.css";

function Loading() {
  const { loading } = useContext(DataContext);
  return (
    <>
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <>
          <ShowImages />
          <Input />
        </>
      )}
    </>
  );
}

export default Loading;
