import React from "react";

export const UserPost = ({ user }) => {
  return (
    <div className="mt-3.5 mb-3.5">
      {user?.posts?.length > 0 ? (
        <div className="shadow">
          {user?.posts?.map((each) => (
            <div key={each._id}>
              <img src={each?.media} alt="" />
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center">No Posts Yet</h1>
      )}
    </div>
  );
};
