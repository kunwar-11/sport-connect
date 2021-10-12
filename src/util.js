import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

export const API_URL = "https://api-sport-connect.herokuapp.com/";

export const signUpValidation = (credentials, setError) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let valid = true;
  if (credentials.firstName.trim()) {
    setError((prev) => ({ ...prev, firstNameError: "" }));
  } else {
    setError((prev) => ({ ...prev, firstNameError: "Enter your first name" }));
    valid = false;
  }
  if (credentials.lastName.trim()) {
    setError((prev) => ({ ...prev, lastNameError: "" }));
  } else {
    setError((prev) => ({ ...prev, lastNameError: "Enter your last name" }));
    valid = false;
  }
  if (credentials.userName.trim()) {
    setError((prev) => ({ ...prev, userNameError: "" }));
  } else {
    setError((prev) => ({ ...prev, userNameError: "enter user Name" }));
    valid = false;
  }
  if (credentials.email.trim()) {
    if (re.test(credentials.email)) {
      setError((prev) => ({ ...prev, emailError: "" }));
    } else {
      setError((prev) => ({ ...prev, emailError: "Enter in Correct format" }));
      valid = false;
    }
  } else {
    setError((prev) => ({ ...prev, emailError: "Enter your email" }));
    valid = false;
  }
  if (credentials.password.trim()) {
    setError((prev) => ({ ...prev, passwordError: "" }));
  } else {
    setError((prev) => ({
      ...prev,
      passwordError: "Enter your password name",
    }));
    valid = false;
  }
  if (credentials.confirmPassword.trim()) {
    if (credentials.confirmPassword === credentials.password) {
      setError((prev) => ({ ...prev, confirmPasswordError: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        confirmPasswordError: "password does not match",
      }));
      valid = false;
    }
  } else {
    setError((prev) => ({
      ...prev,
      confirmPasswordError: "Re enter password",
    }));
    valid = false;
  }

  return valid;
};

export const loginValidation = (userDetails, setError) => {
  let valid = true;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (userDetails?.email.trim()) {
    if (re.test(userDetails?.email)) {
      setError((prev) => ({ ...prev, emailError: "" }));
    } else {
      setError((prev) => ({ ...prev, emailError: "Enter in Correct format" }));
      valid = false;
    }
  } else {
    setError((prev) => ({ ...prev, emailError: "Enter your Email" }));
    valid = false;
  }
  if (userDetails?.password.trim()) {
    setError((prev) => ({ ...prev, passwordError: "" }));
  } else {
    setError((prev) => ({ ...prev, passwordError: "Enter your password" }));
    valid = false;
  }

  return valid;
};

export const PrivateRoute = ({ path, ...rest }) => {
  const login = useSelector((state) => state.login);
  return login.login ? (
    <Route path={path} {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

export const isFollowing = (arr, id) => {
  return arr.some((each) => each._id === id);
};

export const isLiked = (likeArr, userId) => {
  if (likeArr.some((each) => each._id === userId)) {
    return true;
  }
  return false;
};
