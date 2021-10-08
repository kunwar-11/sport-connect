import React from "react";
import { Link } from "react-router-dom";

export const ProfileCard = ({ user }) => {
  return (
    <div className="flex flex-col p-3 sm:p-4">
      <img
        src={user?.profilePicture}
        alt=""
        className="rounded-full w-4/5 sm:w-40"
      />
      <Link to="/user/editProfile">
        <button className="w-4/5 mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-1 pr-1 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow border-purple-500">
          Edit Profile
        </button>
      </Link>
    </div>
  );
};
