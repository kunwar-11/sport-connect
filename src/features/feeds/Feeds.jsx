import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components";
import { FeedsPost, SuggestedPost, SuggestedUsers } from "./components";
import {
  getSuggestedPosts,
  getSuggestedUser,
  getUserFeeds,
} from "./feedsSlice";
export const Feeds = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.feed);
  useEffect(() => {
    if (
      state?.feedStatus === "idle" &&
      state?.suggestedPostStatus === "idle" &&
      state?.suggestedUserStatus === "idle"
    ) {
      (async () => {
        try {
          const resp = await dispatch(getUserFeeds()).unwrap();
          if (resp) {
            const resp1 = await dispatch(getSuggestedUser()).unwrap();
            if (resp1) {
              console.log(resp1);
              await dispatch(getSuggestedPosts()).unwrap();
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [
    dispatch,
    state?.feedStatus,
    state?.suggestedPostStatus,
    state?.suggestedUserStatus,
  ]);
  return (
    <div>
      <Navbar />
      {state?.feeds && state?.suggestedUsers && state?.suggestedPosts && (
        <>
          <FeedsPost />
          {state?.suggestedUsers.length > 0 && (
            <h3 className="pb-4 pt-4 pl-4 text-xl text-gray-500 sm:max-w-screen-sm sm:m-auto">
              Suggested User
            </h3>
          )}
          <SuggestedUsers />
          {state?.suggestedPosts.length > 0 && (
            <h3 className="pb-4 pt-4 pl-4 text-xl text-gray-500 sm:max-w-screen-sm sm:m-auto">
              Suggested Posts
            </h3>
          )}
          <SuggestedPost />
        </>
      )}
    </div>
  );
};
