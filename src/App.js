import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, SignUp } from "./features";

function App() {
  return (
    <div className="App">
      Hello World
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
