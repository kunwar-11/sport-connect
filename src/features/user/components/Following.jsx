import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "../../../components";
import { getLoggedInUserDetails, unfollowAnyUser } from "../userSlice";
export const Following = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("idle");
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
      const resp = await dispatch(unfollowAnyUser(userId)).unwrap();
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
      <div className="sm:max-w-screen-sm sm:m-auto">
        {user?.following &&
          user?.following.length > 0 &&
          user?.following?.map((each, index) => (
            <div
              key={each._id}
              className={`flex items-center justify-evenly ${
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
                onClick={() => unfollowUser(each._id)}
              >
                {status === "loading" ? (
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
