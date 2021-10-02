import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./features/signup/SignUp";
function App() {
  return (
    <div className="App">
      Hello World
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
