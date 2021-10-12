import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "../../../components";
import { removeUserWhoFollows } from "../userSlice";

export const Followers = () => {
  const user = useSelector((state) => state?.user);
  const [status, setStatus] = useState("idle");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const removeFollower = async (userId) => {
    try {
      setStatus("loading");
      setUserId(userId);
      const resp = await dispatch(removeUserWhoFollows(userId)).unwrap();
      console.log(resp);
      if (resp) {
        setStatus("fullfilled");
      }
    } catch (error) {
      console.log(error);
      setStatus("rejected");
    }
  };

  return (
    <>
      <Navbar />
      <div className="sm:max-w-screen-sm sm:m-auto">
        <h1 className="text-3xl text-center mb-3">Followers</h1>
        {user?.followers &&
          user?.followers.length > 0 &&
          user?.followers?.map((each, index) => (
            <div
              key={each._id}
              className={`flex items-center justify-between pl-4 pr-4 sm:pr-8 sm:pl-8 pt-3 pb-3 ${
                index % 2 !== 0 ? "bg-gray-100" : "bg-transparent"
              }`}
            >
              <Link to={`/user/${each._id}`}>
                <div className="flex items-center">
                  <img
                    src={each?.profilePicture}
                    className="rounded-full w-12 sm:w-16"
                    alt=""
                  />
                  <h3 className="pl-4 font-medium">{`@${each.userName}`}</h3>
                </div>
              </Link>
              <button
                className={`pl-2 pr-2 sm:pl-3 sm:pr-3 border-double border-2 ${
                  status === "loading" ? "border-gray-200" : "border-red-400"
                }`}
                onClick={() => removeFollower(each._id)}
              >
                {status === "loading" && userId === each._id ? (
                  <span className="text-gray-400">please wait...</span>
                ) : (
                  "remove"
                )}
              </button>
            </div>
          ))}
        {user?.followers && user?.followers.length === 0 && (
          <div className="text-center">
            <h2>You didn't have any follower</h2>
          </div>
        )}
      </div>
    </>
  );
};
