import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../../components";

export const EditProfile = () => {
  const user = useSelector((state) => state?.user);
  const [details, setDetails] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    profilePicture: user?.profilePicture,
  });
  const [image, setImage] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hofxumay");
    data.append("cloud_name", "dtqacyknm");
    fetch("https://api.cloudinary.com/v1_1/dtqacyknm/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setDetails((prev) => ({ ...prev, profilePicture: data?.url }));
      })
      .catch((err) => console.log(err));
  };

  const editFormHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={editFormHandler}
        className="flex flex-col max-w-lg rounded-md shadow-md mx-4 my-16 sm:my-24 sm:mx-auto p-4 align-middle border-t-4 border-l-4 border-purple-500"
      >
        <div className="flex flex-col">
          <img
            src={user?.profilePicture}
            alt="user profile"
            className="rounded-full w-48"
          />
          <div>
            <input
              type="file"
              className="my-1.5 sm:my-2.5.5 p-1 sm:1.5-1.5 rounded border-2 border-solid border-purple-500"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button onClick={uploadImage}>Uplaod Image</button>
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
        <div>
          <button>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};
