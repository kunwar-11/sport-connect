import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CurrentUser } from "./components";
import {
  EditProfile,
  Feeds,
  Followers,
  Following,
  Login,
  SignUp,
  User,
  CurrentPost,
} from "./features";
import { getLoggedInUserDetails } from "./features/user/userSlice";
import { PrivateRoute } from "./util";

function App() {
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
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/" element={<Feeds />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/user" element={<User />} />
        <PrivateRoute path="/user/:userId" element={<CurrentUser />} />
        <PrivateRoute path="/user/editProfile" element={<EditProfile />} />
        <PrivateRoute path="/user/following" element={<Following />} />
        <PrivateRoute path="/user/followers" element={<Followers />} />
        <PrivateRoute path="/post/:postId" element={<CurrentPost />} />
      </Routes>
    </div>
  );
}

export default App;
