import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "../../../components";
import { getLoggedInUserDetails } from "../userSlice";

export const Followers = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [followers, setfollowers] = useState(user?.followers || null);
  useEffect(() => {
    if (user?.status === "idle") {
      (async () => {
        try {
          const resp = await dispatch(getLoggedInUserDetails()).unwrap();
          console.log(resp);
          setfollowers(resp?.followers);
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
        {followers &&
          followers?.map((each, index) => (
            <div
              key={each._id}
              className={`flex items-center justify-evenly ${
                index % 2 !== 0 ? "bg-gray-100" : "bg-transparent"
              }`}
            >
              <Link to={`/user/${each._id}`}>
                <div className="flex items-center">
                  <img
                    src={each?.profilePicture}
                    className="rounded-full w-12 sm:w-16"
                    alt=""
                  />
                  <h3 className="pl-4 font-medium">{`@${each.userName}`}</h3>
                </div>
              </Link>
              <button className="pl-2 pr-2 sm:pl-3 sm:pr-3 border-double border-2 border-red-400">
                remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
};
