import React, { useState } from "react";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { signUpValidation } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "./signupSlice";
const SignUp = () => {
  const dispatch = useDispatch();
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
      console.log("done");
    }
  };

  return (
    <form
      className="flex flex-col max-w-lg rounded-md shadow-md mx-1 sm:mx-auto p-4 align-middle"
      onSubmit={signUpHandler}
    >
      <div className="text-center">
        <h1 className="text-3xl">Sign Up</h1>
      </div>
      <div className="flex flex-col">
        <input
          className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid"
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
          className="my-1.5 sm:my-2.5.5 p-1 sm:1.5-1.5 rounded border-2 border-solid"
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
          className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid"
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
          className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid"
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
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-full">
          <input
            className="my-1.5 sm:my-2.5 p-1 sm:p-1.5 rounded border-2 border-solid"
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
      <p className="text-center p-2">already have an account ? Login</p>
      <button
        type="submit"
        disabled={isSignedUp.status === "loading"}
        className="m-2 p-1 border-double border-2 shadow border-gray"
      >
        {isSignedUp.status === "loading" ? "siginig In..." : "sign IN"}
      </button>
    </form>
  );
};

export default SignUp;
