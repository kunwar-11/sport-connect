import React, { useState } from "react";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { signUpValidation } from "../../util";
import { useDispatch } from "react-redux";
import { signUpUser } from "./signupSlice";
const SignUp = () => {
  const dispatch = useDispatch();
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
      className="flex flex-col max-w-sm rounded-md shadow mx-1 sm:mx-auto"
      onSubmit={signUpHandler}
    >
      <div className="text-center">
        <h3>Sign Up</h3>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your first name"
          value={userDetails?.firstName}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <small className="text-red-500">{error.firstNameError}</small>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your last name"
          value={userDetails?.lastName}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <small className="text-red-500">{error.lastNameError}</small>
      </div>
      <div>
        <input
          type="text"
          placeholder="enter your user name"
          value={userDetails?.userName}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, userName: e.target.value }))
          }
        />
        <small className="text-red-500">{error.userNameError}</small>
      </div>
      <div>
        <input
          type="text"
          placeholder="enter your email"
          value={userDetails?.email}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <small className="text-red-500">{error.emailError}</small>
      </div>
      <div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="enter your password"
            value={userDetails?.password}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <small className="text-red-500">{error.passwordError}</small>
        </div>
        <div onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <div>
        <div>
          <input
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
        <div onClick={() => setShowConfirmPassword((prev) => !prev)}>
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <button type="submit">Sign IN</button>
    </form>
  );
};

export default SignUp;
