//Authentication Action Scripts...mapDispatchToProps dispatched methods are made here.
//Functions names used cover the concept.

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { message } from 'antd'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const fail = (text) => {
  message.error(text)
}

const success = (text) => {
  message.success(text)
}

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://localhost:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          is_headmaster: res.data.user_type.is_headmaster,
          expirationDate: new Date(new Date().getTime() + 4 * 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
        success("Login Success")

      })
      .catch(err => {
        dispatch(authFail(err));
        fail("User Login FAILED!!!")
      });
  };
};

export const authSignUp = (username, email, password1, password2, is_student) => {
  return dispatch => {
    dispatch(authStart());
    axios.post("http://localhost:8000/rest-auth/registration/", {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
      is_student: is_student
    }).then(res => {
      success("User Created")
    }).catch(err => {
      fail("User Creation FAILED!!!")
    })
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
