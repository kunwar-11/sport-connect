import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, PreLoader } from "../../../components";
import { unfollowAnyUser, getLoggedInUserDetails } from "../userSlice";
export const Following = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("idle");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (user?.status === "idle") {
      (async () => {
        try {
          const resp = await dispatch(getLoggedInUserDetails()).unwrap();
          console.log(resp);
        } catch (error) {
          console.log(error?.reponse);
        }
      })();
    }
  }, [dispatch, user?.status]);
  const unfollowUser = async (userId) => {
    console.log(userId);
    try {
      setStatus("loading");
      setUserId(userId);
      const resp = await dispatch(unfollowAnyUser({ userId })).unwrap();
      if (resp) {
        setStatus("fullfilled");
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };
  return (
    <>
      <Navbar />
      {user?.status === "idle" || user?.status === "loading" ? (
        <PreLoader />
      ) : null}
      <div className="sm:max-w-screen-sm sm:m-auto">
        <h1 className="text-3xl text-center mb-3">Following</h1>
        {user?.following &&
          user?.following.length > 0 &&
          user?.following?.map((each, index) => (
            <div
              key={each._id}
              className={`flex items-center justify-between pl-4 pr-4 sm:pr-8 sm:pl-8 pt-3 pb-3 ${
                index % 2 !== 0 ? "bg-gray-100" : "bg-transparent"
              }`}
            >
              <Link to={`/user/${each._id}`}>
                <div className="flex items-center justify-evenly">
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
                  status === "loading" && userId === each._id
                    ? "border-gray-200"
                    : "border-red-400"
                }`}
                onClick={() => unfollowUser(each._id)}
              >
                {status === "loading" && userId === each._id ? (
                  <span className="text-gray-400">please wait...</span>
                ) : (
                  "unfollow"
                )}
              </button>
            </div>
          ))}
        {user?.following && user?.following.length === 0 && (
          <div className="text-center">
            <h2>You don't follow any one</h2>
          </div>
        )}
      </div>
    </>
  );
};
