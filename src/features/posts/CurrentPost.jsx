import { MoreVert } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { isLiked } from "../../util";
import { getCurrentPost, resetState } from "./postSlice";
import { likeButtonPressed, likedOrUnlikedPost } from "../feeds/feedsSlice";
export const CurrentPost = () => {
  const post = useSelector((state) => state?.post);
  const [comment, setComment] = useState("");
  console.log(post);
  const dispatch = useDispatch();
  const { postId } = useParams();
  useEffect(() => {
    if (post?.status === "idle") {
      (async () => {
        try {
          const resp = await dispatch(getCurrentPost(postId)).unwrap();
          console.log(resp);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [dispatch, post?.status, postId]);

  useEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);

  const likeUnlikeThisPost = async (postId, type) => {
    try {
      dispatch(likedOrUnlikedPost(type));
      const resp = await dispatch(
        likeButtonPressed({ postId, from: "feeds" })
      ).unwrap();
      if (resp) {
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="sm:max-w-screen-sm sm:m-auto">
        {post.currentPost && (
          <div key={post.currentPost._id} className="sm:mr-2 sm:ml-2 mb-2">
            <div className="flex items-center justify-between pt-2 pl-3 pr-3 pb-2 bg-gray-100">
              <Link to={`/user/${post.currentPost.uid?._id}`}>
                <div className="flex items-center">
                  <img
                    src={post.currentPost?.uid?.profilePicture}
                    alt=""
                    className="rounded-full w-8 mr-3"
                  />
                  <h3>@{post.currentPost?.uid?.userName}</h3>
                </div>
              </Link>
              <MoreVert />
            </div>
            <div className="bg-gray-100">
              <div className="border-2 border-gray-100">
                <img
                  src={post.currentPost?.media}
                  alt=""
                  className="w-full h-auto"
                />
                <p className=" font-medium mt-2 mb-2 ml-3">
                  {post.currentPost?.description}
                </p>
              </div>
              <div className="flex items-center">
                {isLiked(
                  post.currentPost.likes,
                  JSON.parse(localStorage?.getItem("loggedInUser"))?.userId
                ) ? (
                  <button
                    onClick={() =>
                      likeUnlikeThisPost(post.currentPost._id, "unlike")
                    }
                    className="text-purple-500 font-medium mr-6 ml-3"
                  >
                    liked
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      likeUnlikeThisPost(post.currentPost._id, "like")
                    }
                    className="mr-6 ml-3"
                  >
                    like
                  </button>
                )}
              </div>
              <form
                //onSubmit={postComment}
                className="w-full flex items-center justify-between bg-transparent pl-4 pr-4"
              >
                <div className="pt-4 pb-1 mb-2 flex-grow mr-3">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="text-black bg-transparent border-b-2 border-purple-500 w-full"
                    placeholder="enter your comment"
                    //ref={inputRef}
                  />
                  {/* <small className=" text-red-400 block pr-2">{error}</small> */}
                </div>
                <button
                  type="submit"
                  className="bg-purple-500 text-white pr-2 pl-2 pt-1 pb-1"
                >
                  Post
                </button>
              </form>
              <div>
                {post?.currentPost?.comments.map((each) => (
                  <div
                    key={each._id}
                    className="flex items-center  justify-between ml-3 mr-3 sm:ml-12 sm:mr-12 pt-4 pb-3 "
                  >
                    <div className="flex items-center">
                      <img
                        src={each?.user?.profilePicture}
                        alt=""
                        className="rounded-full w-8 mr-3"
                      />
                      <p>{each?.user?.userName}</p>
                    </div>
                    <div className="flex items-center">
                      <h4 className="text-left mr-6">{each.text}</h4>
                      {each.user._id ===
                        JSON.parse(localStorage?.getItem("loggedInUser"))
                          ?.userId && <>E D</>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
