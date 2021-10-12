import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../components";
import { ProfileCard, ProfileDetails, UserPost } from "./components";

export const User = () => {
  const user = useSelector((state) => state?.user);
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
