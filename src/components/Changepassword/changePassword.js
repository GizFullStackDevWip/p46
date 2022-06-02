import React, { useState } from "react";
import "./changepassword.css";
import { service } from "./service";
import { clearUserData } from "../../Utils/utils";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [requireAllDevicesSignIn, setRequireAllDevicesSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("success");
  const [successMsg, setSuccessMsg] = useState("");
  // const [eye1, setEye1] = useState(<FontAwesomeIcon icon={faEye} />);

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

  const validate = () => {
    if (currentPassword == "") {
      return "Current password required";
    }
    if (newPassword.trim() == "") {
      return "New password required";
    }
    if (newPassword.trim() != confirmNewPassword.trim()) {
      return "Password mismatch";
    }
    if (newPassword.trim().length < 6 || newPassword.trim().length > 30) {
      return "Length must be between 6 and 30";
    }
    return "success";
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const validationMessage = validate();
    if (validationMessage == "success") {
      setErrorMsg(validationMessage);
      const checked = requireAllDevicesSignIn == true ? 1 : 0;
      service
        .changePassword(currentPassword, newPassword, checked)
        .then((response) => {
          if (response.success == false) {
            setErrorMsg(response.message);
            window.scrollTo(0, 0);
            setTimeout(() => {
              setErrorMsg("success");
            }, 3000);
          } else if (response.success == true) {
            setErrorMsg("success");
            setSuccessMsg("success");
            window.scrollTo(0, 0);
            setTimeout(() => {
              let userId = localStorage.getItem("userId");
              service.logoutFunction(userId).then((response) => {
                console.log("resposne", response);
                if (response.success == true) {
                  redirectToLogin();
                }
              });
            }, 1000);
            // setTimeout(() => {
            //   setSuccessMsg("");
            //   window.location.replace("/account");
            // }, 3000);
          }
        });
    } else {
      setErrorMsg(validationMessage);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setErrorMsg("success");
      }, 3000);
    }
  };

  const redirectToLogin = () => {
    clearUserData();
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1500);
  };

  return (
    <>
      <div
        className="netflix-sans-font-loaded searchPageMain"
        style={{ paddingTop: "115px", paddingBottom: "1px" }}
      >
        <div lang="en-IN" className="accountLayout" dir="ltr">
          <div className="bd">
            <div
              className="responsive-account-container"
              style={{ marginBottom: "20px" }}
            >
              <form
                className="change-password-form"
                data-uia="change-password-form"
                // method="post"
                noValidate
                // onSubmit={onSubmitHandler}
              >
                {" "}
                {errorMsg != "success" ? (
                  <div
                    className="row d-flex justify-content-center"
                    style={{ margin: "30px" }}
                  >
                    <div className="alert alert-warning col-md-8" role="alert">
                      <h4 className="alert-heading">Error!</h4>
                      <p>{errorMsg}</p>
                    </div>
                  </div>
                ) : null}
                {/* successMsg */}
                {successMsg == "success" ? (
                  <div
                    className="row d-flex justify-content-center"
                    style={{ margin: "30px" }}
                  >
                    <div className="alert alert-success col-md-8" role="alert">
                      <h4 className="alert-heading"></h4>
                      <p>Password changed successfully</p>
                    </div>
                  </div>
                ) : null}
                <h1 style={{ color: "white" }}>Change Password</h1>
                <ul className="simpleForm structural ui-grid">
                  <li
                    data-uia="field-currentPassword+wrapper"
                    className="nfFormSpace"
                  >
                    <div
                      data-uia="field-currentPassword+container"
                      className="nfInput"
                    >
                      <div className="nfInputPlacement">
                        <label
                          className="input_id"
                          placeholder="currentPassword"
                        >
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
                          <label
                            style={{ color: "#757575" }}
                            htmlFor="id_currentPassword"
                            className="placeLabel"
                          >
                            Current Password
                          </label>
                        </label>
                      </div>
                      <div id="" className="inputCaption" data-uia="">
                        {/* <a data-ui="action_forgot_password" href="/loginhelp">
                        Forgot password?
                      </a> */}
                      </div>
                    </div>
                  </li>
                  <li
                    data-uia="field-newPassword+wrapper"
                    className="nfFormSpace"
                  >
                    <div
                      data-uia="field-newPassword+container"
                      className="nfInput"
                    >
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
                          <label
                            style={{ color: "#757575" }}
                            htmlFor="id_newPassword"
                            className="placeLabel"
                          >
                            New password (6–30 characters)
                          </label>
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
                          <label
                            style={{ color: "#757575" }}
                            htmlFor="id_confirmNewPassword"
                            className="placeLabel"
                          >
                            Confirm new password
                          </label>
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
                      {/* <input
                      onChange={onChangeHandler}
                      type="checkbox"
                      className=""
                      name="requireAllDevicesSignIn"
                      id="cb_requireAllDevicesSignIn"
                      value={requireAllDevicesSignIn}
                      defaultChecked="true"
                      tabIndex="0"
                      checked=""
                      data-uia="field-requireAllDevicesSignIn"
                    /> */}
                      <label
                        style={{ color: "white" }}
                        className="requireAllDevicesSignIn"
                        htmlFor="cb_requireAllDevicesSignIn"
                        data-uia="field-requireAllDevicesSignIn+label"
                      >
                        Require all devices to sign in again with new password.
                      </label>
                      <div className="helper"></div>
                    </div>
                  </li>
                </ul>
                <div className="nf-btn-bar change-password-buttons">
                  <button
                    id="btn-save"
                    type="button"
                    autoComplete="off"
                    // className="nf-btn nf-btn-primary nf-btn-retro nf-btn-small"
                    className="saveButton"
                    data-uia="action_save-password"
                    onClick={onSubmitHandler}
                  >
                    Save
                  </button>
                  <a href="/account">
                    <button
                      id="btn-cancel"
                      type="button"
                      autoComplete="off"
                      className="cancelButton"
                      // className="nf-btn nf-btn-secondary nf-btn-retro nf-btn-small"
                      data-uia="action_cancel-change-password"
                    >
                      Cancel
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
