import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Feeds, Login, SignUp, User } from "./features";
import { PrivateRoute } from "./util";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feeds />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
