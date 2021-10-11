import { MoreVert } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components";
import { isLiked } from "../../util";
import { CommentForm } from "./components";
import {
  getSuggestedPosts,
  getUserFeeds,
  likeButtonPressed,
  likedOrUnlikedPost,
} from "./feedsSlice";

export const Feeds = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.feed);
  const [showTextField, setShowTextField] = useState("hide");
  useEffect(() => {
    if (state?.feedStatus === "idle" && state?.suggestedPostStatus === "idle") {
      (async () => {
        try {
          const resp = await dispatch(getUserFeeds()).unwrap();
          if (resp) {
            await dispatch(getSuggestedPosts()).unwrap();
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [dispatch, state?.feedStatus, state?.suggestedPostStatus]);

  const likeUnlikeThisPost = async (postId, type) => {
    try {
      dispatch(likedOrUnlikedPost(type));
      const resp = await dispatch(likeButtonPressed(postId)).unwrap();
      if (resp) {
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="sm:max-w-screen-sm sm:m-auto">
        {state?.feeds &&
          state?.feeds.length > 0 &&
          state?.feeds.map((each) => (
            <div key={each._id} className="sm:mr-2 sm:ml-2">
              <div className="flex items-center justify-between pt-2 pl-3 pr-3 pb-2 bg-gray-100">
                <div className="flex items-center">
                  <img
                    src={each?.user?.profilePicture}
                    alt=""
                    className="rounded-full w-8 mr-3"
                  />
                  <h3>@{each?.user?.userName}</h3>
                </div>
                <MoreVert />
              </div>
              <div className="bg-gray-100">
                <div className="border-2 border-gray-100">
                  <img src={each?.media} alt="" className="w-full h-auto" />
                  <p className="text-lg font-medium mt-2 mb-2 ml-3">
                    {each?.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mr-16 ml-16 sm:mr-32 sm:ml-32">
                  {isLiked(
                    each.likes,
                    JSON.parse(localStorage?.getItem("loggedInUser"))?.userId
                  ) ? (
                    <button
                      onClick={() => likeUnlikeThisPost(each._id, "unlike")}
                      className="text-purple-500 font-medium"
                    >
                      liked
                    </button>
                  ) : (
                    <button
                      onClick={() => likeUnlikeThisPost(each._id, "like")}
                    >
                      like
                    </button>
                  )}
                  <button onClick={() => setShowTextField("show")}>
                    comment
                  </button>
                </div>
                {showTextField === "show" && (
                  <CommentForm
                    postId={each._id}
                    setShowTextField={setShowTextField}
                  />
                )}
                <h3 className="ml-3 pb-2 text-center pt-3">
                  {each?.comments?.length > 0
                    ? `${each?.comments?.length} ${
                        each?.comments?.length > 0 ? "comments" : "comment"
                      }`
                    : ""}
                  <span className="pl-10">
                    {each?.comments?.length > 0 ? "view all commments" : ""}
                  </span>
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
