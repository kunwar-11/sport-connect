import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  EditProfile,
  Feeds,
  Followers,
  Following,
  Login,
  SignUp,
  User,
} from "./features";
import { PrivateRoute } from "./util";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Feeds />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/user" element={<User />} />
        <PrivateRoute path="/user/editProfile" element={<EditProfile />} />
        <PrivateRoute path="/user/following" element={<Following />} />
        <PrivateRoute path="/user/followers" element={<Followers />} />
      </Routes>
    </div>
  );
}

export default App;
