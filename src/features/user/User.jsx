import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navbar } from "../../components";
import { ProfileCard, ProfileDetails, UserPost } from "./components";
import { getLoggedInUserDetails } from "./userSlice";

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
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
  //user?.firstName && console.log(user);
  return (
    <>
      <Navbar />
      <div className="sm:max-w-screen-sm sm:m-auto">
        {user?.firstName && (
          <div className="flex flex-col sm:m-auto ">
            <div className="flex flex-row items-center justify-evenly shadow">
              <ProfileCard user={user} />
              <ProfileDetails user={user} />
            </div>
            <UserPost user={user} />
          </div>
        )}
      </div>
    </>
  );
};
