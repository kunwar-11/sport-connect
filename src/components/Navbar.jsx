import {
  Notifications,
  SearchOutlined,
  AddAPhotoOutlined,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between bg-purple-500 px-5 sm:px-8 py-4 shadow-xl sticky top-0 left-0 mb-3 rounded-b-md items-center z-20">
      <div className="cursor-pointer">
        <Link to="/">
          <h2 className="font-bold text-xl sm:text-2xl text-white">
            SportConnect
          </h2>
        </Link>
      </div>
      <div className="hidden sm:flex flex-row items-center w-3/5 mx-4">
        <div>
          <SearchOutlined style={{ color: "white", marginRight: "0.5rem" }} />
        </div>
        <input
          type="text"
          placeholder="bored ? find some one"
          className="border-b-2 border-white bg-transparent text-white placeholder-gray-300 flex-grow py-1"
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="sm:hidden cursor-pointer">
          <SearchOutlined style={{ color: "white", marginRight: "0.5rem" }} />
        </div>
        <Link to="/createpost">
          <div>
            <AddAPhotoOutlined
              style={{ color: "white", marginRight: "0.5rem" }}
            />
          </div>
        </Link>
        <Link to="/notification">
          <div>
            <Notifications style={{ color: "white", marginRight: "0.5rem" }} />
          </div>
        </Link>
        <Link to="/user">
          <div>
            <img
              src={
                JSON.parse(localStorage?.getItem("loggedInUser"))
                  ?.profilePicture
              }
              alt="user profile"
              className="rounded-full object-contain w-6 sm:w-7"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};
