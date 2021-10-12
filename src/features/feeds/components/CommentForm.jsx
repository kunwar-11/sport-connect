import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPostButtonClicked } from "../feedsSlice";

export const CommentForm = ({ setShowTextField, postId, from }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const postComment = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const resp = await dispatch(
          commentPostButtonClicked({ text: comment, postId, from })
        ).unwrap();
        console.log(resp);
        setShowTextField("");
        setError("");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("cannot post empty comment");
    }
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    return () => setShowTextField("hide");
  }, [setShowTextField]);
  return (
    <form
      onSubmit={postComment}
      className="w-full flex items-center justify-between bg-transparent pl-4 pr-4"
    >
      <div className="pt-4 pb-1 mb-2 flex-grow mr-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="text-black bg-transparent border-b-2 border-purple-500 w-full"
          placeholder="enter your comment"
          ref={inputRef}
        />
        <small className=" text-red-400 block pr-2">{error}</small>
      </div>
      <button
        type="submit"
        className="bg-purple-500 text-white pr-2 pl-2 pt-1 pb-1"
      >
        Post
      </button>
    </form>
  );
};
