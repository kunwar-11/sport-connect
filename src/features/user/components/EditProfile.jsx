import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components";
import { updateLoggedInUserProfile } from "../userSlice";
export const EditProfile = () => {
  const [uplaodStatus, setUploadStatus] = useState("idle");
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    profilePicture: user?.profilePicture,
  });
  const [image, setImage] = useState("");
  const uploadImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hofxumay");
    data.append("cloud_name", "dtqacyknm");
    setUploadStatus("loading");
    fetch("https://api.cloudinary.com/v1_1/dtqacyknm/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDetails((prev) => ({ ...prev, profilePicture: data?.url }));
        setUploadStatus("fulfilled");
      })
      .catch((err) => console.log(err));
  };

  const editFormHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await dispatch(updateLoggedInUserProfile(details)).unwrap();
      if (resp) {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {user?.firstName && (
        <form className="flex flex-col max-w-lg rounded-md shadow-md mx-1 my-5 sm:my-12 sm:mx-auto p-4 align-middle border-t-4 border-l-4 border-purple-500">
          <h1 className="text-3xl text-center mb-3">
            Edit <span className="text-purple-600">Profile</span>
          </h1>
          <div className="flex flex-col">
            <img
              src={details?.profilePicture}
              alt="user profile"
              className="rounded-full w-48 mx-auto"
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button
                onClick={uploadImage}
                className={`mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-1 pr-1 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow ${
                  uplaodStatus === "loading"
                    ? "border-gray-200"
                    : "border-purple-500"
                }`}
              >
                {uplaodStatus === "loading" ? (
                  <span className="text-gray-400">Uploading Image...</span>
                ) : (
                  "Upload Image"
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <input
              className="my-1.5 sm:my-2.5.5 p-1 sm:1.5-1.5 rounded border-2 border-solid border-purple-500"
              type="text"
              value={details?.firstName}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
            <input
              className="my-1.5 sm:my-2.5.5 p-1 sm:1.5-1.5 rounded border-2 border-solid border-purple-500"
              type="text"
              value={details?.lastName}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
            <input
              className="my-1.5 sm:my-2.5.5 p-1 sm:1.5-1.5 rounded border-2 border-solid border-purple-500"
              type="text"
              value={details?.userName}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-evenly">
            <button className="mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-2 pr-2 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow border-red-500">
              Cancel
            </button>
            <button
              onClick={editFormHandler}
              className={`mt-2.5 sm:mt-3.5 sm:mx-auto  sm:m-2 pl-2 pr-2 sm:p-1 sm:pl-5 sm:pr-5 border-double border-2 shadow ${
                user?.updateProfileStatus === "loading"
                  ? "border-gray-200"
                  : "border-purple-500"
              }`}
            >
              {user?.updateProfileStatus === "loading" ? (
                <span className="text-gray-400">Updating...</span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
};
