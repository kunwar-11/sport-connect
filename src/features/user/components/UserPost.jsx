import { Link } from "react-router-dom";
import React from "react";

export const UserPost = ({ user }) => {
  return (
    <div className="mt-3.5 mb-3.5">
      {user?.posts?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 mr-1 ml-1 sm:m-0">
          {user?.posts?.map((each) => (
            <div key={each._id}>
              <Link to={`/post/${each._id}`}>
                <img
                  src={each?.media}
                  alt="user posts"
                  className="w-full h-40 sm:h-60 object-cover object-bottom"
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center">No Posts Yet</h1>
      )}
    </div>
  );
};
