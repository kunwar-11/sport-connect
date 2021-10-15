import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPostButtonCLicked } from "../features/user/userSlice";
import { Navbar } from "./Navbar";

export const CreatePost = () => {
  const [chooseImage, setChooseImage] = useState("");
  const [uplaodStatus, setUploadStatus] = useState("idle");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [postingStatus, setPostingStatus] = useState("idle");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uploadImage = (e) => {
    e.preventDefault();
    if (chooseImage !== "") {
      const data = new FormData();
      data.append("file", chooseImage);
      data.append("upload_preset", "hofxumay");
      data.append("cloud_name", "dtqacyknm");
      setUploadStatus("loading");
      fetch("https://api.cloudinary.com/v1_1/dtqacyknm/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setImage(data?.url);
          setUploadStatus("fulfilled");
          setError("");
        })
        .catch((err) => console.log(err));
    } else {
      setError("choose an image you want to post");
    }
  };
  const postButtonHandler = async (e) => {
    e.preventDefault();
    try {
      setPostingStatus("loading");
      const resp = await dispatch(
        addPostButtonCLicked({ description, media: image })
      ).unwrap();
      if (resp) {
        console.log(resp);
        setPostingStatus("fullfilled");
        navigate("/user");
      }
    } catch (error) {
      setPostingStatus("error");
      console.log(error);
    }
  };
  const cancelButtonClicked = (e) => {
    e.preventDefault();
    navigate("/user");
  };
  return (
    <div>
      <Navbar />
      <form className="flex flex-col max-w-lg rounded-md shadow-md mx-1 my-5 sm:my-12 sm:mx-auto p-4 align-middle border-t-4 border-l-4 border-purple-500">
        <div className="flex flex-col items-center">
          {image ? (
            <div>
              <img
                src={image}
                alt="user profile"
                className="rounded-full w-48 mx-auto"
              />
              <textarea
                className="my-2 sm:my-3.5 p-1 sm:1.5-1.5 rounded border-2 border-solid border-purple-500 w-full"
                type="text"
                placeholder="describe about post..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          ) : (
            <div className="text-center">choose an image</div>
          )}
          <div className="h-px w-full bg-purple-400 my-4"></div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setChooseImage(e.target.files[0])}
              />
              <p className="text-red-500">{error}</p>
            </div>
            <button
              onClick={uploadImage}
              className={`mt-3 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-1 pr-1 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow ${
                uplaodStatus === "loading"
                  ? "border-gray-200"
                  : "border-purple-500"
              }`}
            >
              {uplaodStatus === "loading" ? (
                <span className="text-gray-400">Uploading Image...</span>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
          <div className="h-px w-full bg-purple-400 my-4"></div>
          <div className="flex justify-evenly w-full my-3">
            <button
              className="mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-2 pr-2 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow border-red-400"
              onClick={cancelButtonClicked}
            >
              cancel
            </button>
            <button
              className={`mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-2 pr-2 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow ${
                postingStatus === "loading"
                  ? "border-gray-200"
                  : "border-green-500"
              }`}
              onClick={postButtonHandler}
            >
              {postingStatus === "loading" ? (
                <span className="text-gray-400">Posting...</span>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
