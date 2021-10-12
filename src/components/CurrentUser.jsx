import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UserPost } from "../features/user/components";
import { followAnyUser, unfollowAnyUser } from "../features/user/userSlice";
import { API_URL, isFollowing } from "../util";
import { Navbar } from "./Navbar";

export const CurrentUser = () => {
  const [user, setUser] = useState(null);
  const [followState, setFollowState] = useState("idle");
  const [unFollowState, setUnFollowState] = useState("idle");
  const loggedInUser = useSelector((state) => state?.user);
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { data, status } = await axios.get(`${API_URL}user/${userId}`, {
        headers: {
          authorization: JSON.parse(localStorage?.getItem("loggedInUser"))
            ?.token,
        },
      });
      if (status === 200) {
        console.log(data);
        setUser(data?.user);
      }
    })();
  }, [userId]);
  const unfollowUser = async () => {
    try {
      setUnFollowState("loading");
      const resp = await dispatch(
        unfollowAnyUser({ userId, from: "current" })
      ).unwrap();
      if (resp) {
        setUnFollowState("fullfilled");
        setUser((prev) => ({
          ...prev,
          followers: user.followers.filter(
            (each) =>
              each._id !==
              JSON.parse(localStorage?.getItem("loggedInUser"))?.userId
          ),
        }));
      }
    } catch (error) {
      console.log(error);
      setUnFollowState("error");
    }
  };
  const followUser = async () => {
    try {
      setFollowState("loading");

      const resp = await dispatch(
        followAnyUser({ userId, from: "current" })
      ).unwrap();
      if (resp) {
        console.log(resp);
        setFollowState("fullFilled");
        setUser((prev) => ({
          ...prev,
          followers: user.followers.concat({
            profilePicture: user?.profilePicture,
            userName: user?.userName,
            _id: JSON.parse(localStorage?.getItem("loggedInUser"))?.userId,
          }),
        }));
      }
    } catch (error) {
      console.log(error);
      setFollowState("rejected");
    }
  };
  return (
    <>
      <Navbar />
      <div className="sm:max-w-screen-sm sm:m-auto">
        {user && loggedInUser?.following && (
          <div className="flex flex-col sm:m-auto ">
            <div className="flex flex-row items-center justify-evenly shadow">
              <div className="flex flex-col p-3 sm:p-4">
                <img
                  src={user?.profilePicture}
                  alt=""
                  className="rounded-full w-4/5 sm:w-40"
                />
                {isFollowing(loggedInUser?.following, userId) ? (
                  <button
                    className="w-4/5 mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-1 pr-1 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow border-purple-500"
                    onClick={unfollowUser}
                  >
                    {unFollowState === "loading"
                      ? "please wait..."
                      : "UnFollow"}
                  </button>
                ) : (
                  <button
                    className="w-4/5 mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-1 pr-1 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow border-purple-500"
                    onClick={followUser}
                  >
                    {followState === "loading" ? "please wait..." : "Follow"}
                  </button>
                )}
              </div>
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
                  <h3 className="ml-1.5 sm:ml-2.5 text-center font-medium">
                    {user?.followers?.length}{" "}
                    <span
                      className="font-normal"
                      style={{ display: "block", textAlign: "center" }}
                    >
                      followers
                    </span>
                  </h3>

                  <h3 className="ml-1.5 sm:ml-2.5 text-center font-medium">
                    {user?.following?.length}{" "}
                    <span
                      className="font-normal"
                      style={{ display: "block", textAlign: "center" }}
                    >
                      following
                    </span>
                  </h3>
                </div>
                <h3 className="text-lg sm:text-2xl font-medium ml-1.5 sm:ml-2.5 mb-2 sm:mb-4">
                  {user?.firstName} {user?.lastName}
                </h3>
              </div>
            </div>
            <UserPost user={user} />
          </div>
        )}
      </div>
    </>
  );
};
