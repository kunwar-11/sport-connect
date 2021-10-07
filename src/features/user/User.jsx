import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navbar } from "../../components";
import { getLoggedInUserDetails } from "./userSlice";

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  useEffect(() => {
    if (user?.status === "idle") {
      (async () => {
        try {
          await dispatch(getLoggedInUserDetails());
        } catch (error) {
          console.log(error?.reponse);
        }
      })();
    }
  }, [dispatch, user?.status]);
  //user?.firstName && console.log(user);
  return (
    <div>
      <Navbar />
      user
    </div>
  );
};
