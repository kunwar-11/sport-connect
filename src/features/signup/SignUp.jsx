import React, { useState } from "react";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { signUpValidation } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "./signupSlice";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignedUp = useSelector((state) => state.signup);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    userNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (signUpValidation(userDetails, setError)) {
      await dispatch(signUpUser(userDetails));
      navigate("/login");
    }
  };

  return (
    <form
      className="flex flex-col max-w-lg rounded-md shadow-md mx-4 my-16 sm:my-24 sm:mx-auto p-4 align-middle border-t-4 border-l-4 border-purple-500"
      onSubmit={signUpHandler}
    >
      <div className="text-center">
        <h1 className="text-3xl">
          Sign <span className="text-purple-600">UP</span>
        </h1>
      </div>
      <div className="flex flex-col">
        <input
          className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid border-purple-500"
          type="text"
          placeholder="Enter your first name"
          value={userDetails?.firstName}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <small className="text-red-500">{error.firstNameError}</small>
      </div>
      <div className="flex flex-col">
        <input
          className="my-1.5 sm:my-2.5.5 p-1 sm:1.5-1.5 rounded border-2 border-solid border-purple-500"
          type="text"
          placeholder="Enter your last name"
          value={userDetails?.lastName}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <small className="text-red-500">{error.lastNameError}</small>
      </div>
      <div className="flex flex-col">
        <input
          className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid border-purple-500"
          type="text"
          placeholder="enter your user name"
          value={userDetails?.userName}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, userName: e.target.value }))
          }
        />
        <small className="text-red-500">{error.userNameError}</small>
      </div>
      <div className="flex flex-col">
        <input
          className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid border-purple-500"
          type="text"
          placeholder="enter your email"
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
            className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid border-purple-500"
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
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-full">
          <input
            className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid border-purple-500"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="re enter your password"
            value={userDetails?.confirmPassword}
            onChange={(e) =>
              setUserDetails((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          <small className="text-red-500">{error.confirmPasswordError}</small>
        </div>
        <div
          className="p-2 sm:p-4"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSignedUp.status === "loading"}
        className={`m-2 p-1 border-double border-2 shadow ${
          isSignedUp.status === "loading"
            ? "border-gray-200"
            : "border-purple-500"
        }`}
      >
        {isSignedUp.status === "loading" ? (
          <span className="text-gray-400">Signing Up...</span>
        ) : (
          "Sign Up"
        )}
      </button>
      <p className="text-center p-2">
        already have an account ? <span className="text-purple-600">Login</span>
      </p>
    </form>
  );
};
