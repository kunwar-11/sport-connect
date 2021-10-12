import React from "react";
import { useSelector } from "react-redux";

export const SuggestedUsers = () => {
  const state = useSelector((state) => state?.feed);
  return (
    <div className="sm:max-w-screen-sm sm:m-auto flex overflow-x-auto sm:pb-8 pb-4 scrollbar-hide">
      {state?.suggestedUsers.map((each) => (
        <div
          key={each._id}
          className="flex flex-col justify-center items-center ml-2 mr-2 min-w-1/2 sm:min-w-1/4 p-3"
        >
          <img
            src={each?.profilePicture}
            alt=""
            className="rounded-full w-4/5"
          />
          <h3 className="p-2">@{each?.userName}</h3>
          <button className="bg-purple-500 text-white pt-0.5 pb-0.5 w-full">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};
