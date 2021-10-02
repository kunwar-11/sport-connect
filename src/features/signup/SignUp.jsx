import React, { useState } from "react";
import { VisibilityOff, Visibility } from "@material-ui/icons";
const SignUp = () => {
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
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <form className="flex flex-col max-w-sm rounded-md shadow mx-1 sm:mx-auto">
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
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your last name"
          value={userDetails?.lastName}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="enter your user name"
          value={userDetails?.userName}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="enter your email"
          value={userDetails?.email}
        />
      </div>
      <div>
        <div>
          <input
            type="password"
            placeholder="enter your password"
            value={userDetails?.password}
          />
        </div>
        <div>{showPassword ? <VisibilityOff /> : <Visibility />}</div>
      </div>
      <div>
        <div>
          <input
            type="password"
            placeholder="re enter your password"
            value={userDetails?.confirmPassword}
          />
        </div>
        <div>{showConfirmPassword ? <VisibilityOff /> : <Visibility />}</div>
      </div>
      <button type="submit">Sign IN</button>
    </form>
  );
};

export default SignUp;
