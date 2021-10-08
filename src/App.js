import React from "react";
import { Routes, Route } from "react-router-dom";
import { EditProfile, Feeds, Login, SignUp, User } from "./features";
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
      </Routes>
    </div>
  );
}

export default App;
