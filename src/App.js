import React from "react";
import { Routes, Route } from "react-router-dom";
import { CreatePost, CurrentUser } from "./components";
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
import { PrivateRoute } from "./util";

function App() {
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
        <PrivateRoute path="/createpost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
