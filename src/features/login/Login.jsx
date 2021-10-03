import React, { useState } from "react";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "./loginSlice";
import { loginValidation } from "../../util";
import { useNavigate } from "react-router";
export const Login = () => {
  const isLoggedIn = useSelector((state) => state.login);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      if (loginValidation(userDetails, setError)) {
        const resp = await dispatch(
          logInUser({
            userName: userDetails?.email,
            password: userDetails?.password,
          })
        ).unwrap();
        console.log("here", resp);
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError?.response);
    }
  };

  return (
    <form
      className="flex flex-col max-w-lg rounded-md shadow-md mx-1 sm:mx-auto p-4 align-middle"
      onSubmit={loginHandler}
    >
      <div className="text-center">
        <h1 className="text-3xl">Log IN</h1>
      </div>
      <div className="flex flex-col">
        <input
          className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid"
          type="text"
          placeholder="enter your Email"
          value={userDetails?.email}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <small className="text-red-500">{error.emailError}</small>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col  w-full">
          <input
            className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid"
            type={showPassword ? "text" : "password"}
            placeholder="enter your password"
            value={userDetails?.password}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <small className="text-red-500">{error.passwordError}</small>
        </div>
        <div
          className="p-2 sm:p-4"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoggedIn.status === "loading"}
        className="m-2 p-1 border-double border-2 shadow border-gray"
      >
        {isLoggedIn.status === "loading" ? "logging In..." : "log IN"}
      </button>
    </form>
  );
};
