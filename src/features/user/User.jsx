import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, PreLoader } from "../../components";
import { ProfileCard, ProfileDetails, UserPost } from "./components";
import { getLoggedInUserDetails } from "./userSlice";

export const User = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
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
  return (
    <>
      <Navbar />
      <div className="sm:max-w-screen-sm sm:m-auto">
        {user?.status === "idle" || user?.status === "loading" ? (
          <PreLoader />
        ) : null}
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
