import React from "react";
import { Link } from "react-router-dom";

export const ProfileDetails = ({ user }) => {
  return (
    <div className="flex flex-col sm:ml-6">
      <h3 className="ml-1.5 sm:ml-2.5 mb-2 sm:mb-4 text-xl sm:text-3xl font-light">
        @{user?.userName}
      </h3>
      <div className="flex flex-row items-center mb-2 sm:mb-4">
        <h3 className="ml-1.5 sm:ml-2.5 text-center font-medium">
          {user?.posts?.length}{" "}
          <span
            className="font-normal"
            style={{ display: "block", textAlign: "center" }}
          >
            posts
          </span>
        </h3>
        <Link to="/user/followers">
          <h3 className="ml-1.5 sm:ml-2.5 text-center font-medium">
            {user?.followers?.length}{" "}
            <span
              className="font-normal"
              style={{ display: "block", textAlign: "center" }}
            >
              followers
            </span>
          </h3>
        </Link>
        <Link to="/user/following">
          <h3 className="ml-1.5 sm:ml-2.5 text-center font-medium">
            {user?.following?.length}{" "}
            <span
              className="font-normal"
              style={{ display: "block", textAlign: "center" }}
            >
              following
            </span>
          </h3>
        </Link>
      </div>
      <h3 className="text-lg sm:text-2xl font-medium ml-1.5 sm:ml-2.5 mb-2 sm:mb-4">
        {user?.firstName} {user?.lastName}
      </h3>
    </div>
  );
};
