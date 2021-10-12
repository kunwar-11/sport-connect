import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followAnyUser } from "../../user/userSlice";

export const SuggestedUsers = () => {
  const state = useSelector((state) => state?.feed);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("idle");
  const [userId, setUserId] = useState("");
  const followFromSuggestedUser = async (userId) => {
    try {
      setStatus("loading");
      setUserId(userId);
      const resp = await dispatch(followAnyUser({ userId })).unwrap();
      if (resp) {
        console.log(resp);
        setStatus("fullFilled");
      }
    } catch (error) {
      console.log(error);
      setStatus("rejected");
    }
  };

  return (
    <div className="sm:max-w-screen-sm sm:m-auto flex overflow-x-auto sm:pb-8 pb-4 scrollbar-hide">
      {state?.suggestedUsers.map((each) => (
        <div
          key={each._id}
          className="flex flex-col justify-center items-center ml-2 mr-2 min-w-1/2 sm:min-w-1/4 p-3"
        >
          <Link
            to={`/user/${each._id}`}
            className="flex flex-col justify-center items-center"
          >
            <img
              src={each?.profilePicture}
              alt=""
              className="rounded-full w-4/5"
            />
            <h3 className="p-2">@{each?.userName}</h3>
          </Link>
          <button
            className="bg-purple-500 text-white pt-0.5 pb-0.5 w-full"
            onClick={() => followFromSuggestedUser(each._id)}
          >
            {status === "loading" && userId === each._id
              ? "please wait..."
              : "follow"}
          </button>
        </div>
      ))}
    </div>
  );
};
