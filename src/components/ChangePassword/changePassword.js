import React, { useState, useEffect } from "react";
 import "./changepassword.css";

import { service } from "./service";

import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const history = useHistory();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [requireAllDevicesSignIn, setRequireAllDevicesSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    errorMessage: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // document.getElementById("scroll-top").scroll(0, 0);
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name == "currentPassword") {
      setCurrentPassword(value);
    }
    if (name == "newPassword") {
      setNewPassword(value);
    }
    if (name == "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
    if (name == "requireAllDevicesSignIn") {
      setRequireAllDevicesSignIn(!requireAllDevicesSignIn);
    }
  };

  const validation = () => {
    let errors = {};
    let formIsValid = true;
    if (currentPassword == "") {
      formIsValid = false;
      errors.currentPassword = "Current password required";
    }

    if (newPassword.trim().length < 6 || newPassword.trim().length > 30) {
      formIsValid = false;
      errors.newPassword = "Length must be between 6 and 30";
    }
    if (newPassword == "") {
      formIsValid = false;
      errors.newPassword = "New password required";
    }
    if (
      confirmNewPassword.trim().length < 6 ||
      confirmNewPassword.trim().length > 30
    ) {
      formIsValid = false;
      errors.confirmPassword = "Length must be between 6 and 30";
    }
    if (confirmNewPassword == "") {
      formIsValid = false;
      errors.confirmPassword = "password confirmation required";
    }
    if (newPassword.trim() != confirmNewPassword.trim()) {
      formIsValid = false;
      errors.errorMessage = "Password mismatch";
      errors.confirmPassword = "";
      errors.newPassword = "";
    }

    setErrors(errors);
    setTimeout(() => {
      setErrors("");
    }, 3000);

    return formIsValid;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(errorMsg);
    console.log(successMsg);
    const validationMessage = validation();
    console.log(validationMessage);
    if (validationMessage) {
      console.log("1");
      setErrorMsg(validationMessage);

      const checked = requireAllDevicesSignIn == true ? 1 : 0;
      service
        .changePassword(currentPassword, newPassword, checked)
        .then((response) => {
          
          if (response.success == false) {
            setErrors({ errorMessage: response.message });
            setErrorMsg(response.message);

            setTimeout(() => {
              setErrorMsg("success");
            }, 3000);
          } else if (response.success == true) {
            setErrorMsg("success");

            setSuccessMsg("Password changed successfully");
            setTimeout(() => {
              let user = localStorage.getItem("userId");
              service.logoutFunction(user).then((response) => {
                console.log("resposne", response);
                if (response.success == true) {
                  redirectToLogin();
                } else {
                }
              });
            }, 1000);
          }
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    } else {
      setErrorMsg(validationMessage);
      console.log("validation", errorMsg);
      setTimeout(() => {
        setErrorMsg("success");
      }, 3000);
      console.log("timout", errorMsg);
    }
  };

  const redirectToLogin = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("deviceAnalytics");
    service.setCookie("isLoggedIn", false, 30);
    localStorage.removeItem("isLoggedIn");
    service.eraseCookie("showId");
    service.eraseCookie("isScreeningUser");
    // dispatch({ type: "LOGOUT" });
    // setMouseHover(false);
    service.eraseCookie("userName");
    service.eraseCookie("userId");
    service.eraseCookie("userEmail");
    service.eraseCookie("subscriptionId");
    sessionStorage.removeItem("applaunch");
    setTimeout(() => {
      // window.location.href = "/signin";
      history.replace({
        pathname: "/signin",
      });
    }, 1500);
  };
  //
  return (
    <div className="changePwd_wrapper" style={{ color: "white" }}>
      <div className="changePwd_maindiv">
        <div className="changePwd_conditions_wrapper">
          <h1>Change Password</h1>
          <h4>Password must contain:</h4>
          <div className="condition_inline">
            <span>&#10003;</span>
            <h6>Length atleast 6 </h6>
          </div>
          <div className="condition_inline">
            <span>&#10003;</span>
            <h6>Length atmost 30</h6>
          </div>
        </div>
        <div className="changePwd_form">
          <form
            className="change-password-form"
            data-uia="change-password-form"
            noValidate
          >
            <ul className="changePwd_ul">
              <li
                data-uia="field-currentPassword+wrapper"
                className="nfFormSpace"
              >
                <div
                  data-uia="field-currentPassword+container"
                  className="nfInput"
                >
                  <div className="nfInputPlacement">
                    <label className="input_id" placeholder="currentPassword">
                      <input
                        onChange={onChangeHandler}
                        type="password"
                        data-uia="field-currentPassword"
                        name="currentPassword"
                        className="nfTextField"
                        id="id_currentPassword"
                        value={currentPassword}
                        tabIndex="0"
                        autoComplete="off"
                        maxLength="60"
                        minLength="4"
                        dir=""
                      />
                      {errors.currentPassword ? (
                        <label
                          style={{ color: "red" }}
                          htmlFor="id_currentPassword"
                          className="placeLabel"
                        >
                          {errors.currentPassword}
                        </label>
                      ) : (
                        <label
                          style={{ color: "#757575" }}
                          htmlFor="id_currentPassword"
                          className="placeLabel"
                        >
                          Current Password
                        </label>
                      )}
                    </label>
                  </div>
                  <div id="" className="inputCaption" data-uia=""></div>
                </div>
              </li>
              <li data-uia="field-newPassword+wrapper" className="nfFormSpace">
                <div data-uia="field-newPassword+container" className="nfInput">
                  <div className="nfInputPlacement">
                    <label className="input_id" placeholder="newPassword">
                      <input
                        onChange={onChangeHandler}
                        type="password"
                        data-uia="field-newPassword"
                        name="newPassword"
                        className="nfTextField"
                        id="id_newPassword"
                        value={newPassword}
                        tabIndex="0"
                        autoComplete="off"
                        maxLength="60"
                        minLength="4"
                        dir=""
                      />

                      {errors.newPassword ? (
                        <label
                          style={{ color: "red" }}
                          htmlFor="id_currentPassword"
                          className="placeLabel"
                        >
                          {errors.newPassword}
                        </label>
                      ) : (
                        <label
                          style={{ color: "#757575" }}
                          htmlFor="id_currentPassword"
                          className="placeLabel"
                        >
                          New Password
                        </label>
                      )}
                    </label>
                  </div>
                </div>
              </li>
              <li
                data-uia="field-confirmNewPassword+wrapper"
                className="nfFormSpace"
              >
                <div
                  data-uia="field-confirmNewPassword+container"
                  className="nfInput"
                >
                  <div className="nfInputPlacement">
                    <label
                      className="input_id"
                      placeholder="confirmNewPassword"
                    >
                      <input
                        onChange={onChangeHandler}
                        type="password"
                        data-uia="field-confirmNewPassword"
                        name="confirmNewPassword"
                        className="nfTextField"
                        id="id_confirmNewPassword"
                        value={confirmNewPassword}
                        tabIndex="0"
                        autoComplete="off"
                        maxLength="60"
                        minLength="4"
                        dir=""
                      />

                      {errors.confirmPassword ? (
                        <label
                          style={{ color: "red" }}
                          htmlFor="id_currentPassword"
                          className="placeLabel"
                        >
                          {errors.confirmPassword}
                        </label>
                      ) : (
                        <label
                          style={{ color: "#757575" }}
                          htmlFor="id_currentPassword"
                          className="placeLabel"
                        >
                          Confirm Password
                        </label>
                      )}
                    </label>
                  </div>
                </div>
              </li>
              <li
                data-uia="field-requireAllDevicesSignIn+wrapper"
                className="nfFormSpace"
              >
                <div className="checkItem">
                  <input
                    onChange={onChangeHandler}
                    defaultChecked="true"
                    type="checkbox"
                    id="cb_requireAllDevicesSignIn"
                    name="requireAllDevicesSignIn"
                    value={requireAllDevicesSignIn}
                    className="tick-checkbox"
                  ></input>

                  <label
                    style={{}}
                    className="requireAllDevicesSignIn"
                    htmlFor="cb_requireAllDevicesSignIn"
                    data-uia="field-requireAllDevicesSignIn+label"
                  >
                    Require all devices to sign in again.
                    {/*  with new password */}
                  </label>
                  <div className="helper"></div>
                </div>
              </li>
            </ul>
            <div className="nf-btn-bar change-password-buttons">
              <button className="saveButton" onClick={onSubmitHandler}>
                Save
              </button>
              <a href="/account">
                <button
                  id="btn-cancel"
                  type="button"
                  autoComplete="off"
                  className="cancelButtons"
                  data-uia="action_cancel-change-password"
                >
                  Cancel
                </button>
              </a>
            </div>

            <div
              className={
                errors.errorMessage
                  ? "toastContainer-error"
                  : "toastContainer-success"
              }
            >
              {errors.errorMessage && errors.errorMessage}
              {successMsg && successMsg}
              {}
            </div>
          </form>
        </div>
      </div>
      {/* <div className="toastContainer">
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          // rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          >
        </ToastContainer>
        {errors.errorMessage && toast.error(errors.errorMessage)}
      </div> */}
    </div>
  );
};

export default ChangePassword;
