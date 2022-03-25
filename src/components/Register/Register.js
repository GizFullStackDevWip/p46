
import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { service } from "../../network/service";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";

const Register = (state) => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  const dispatch = useDispatch();
  const history = useHistory();
  const showId = useSelector((state) => state.showId);
  const [firstname, setFirstName] = useState("");
  const [facebookData, setFacebookData] = useState(null);
  const [facebookId, setFacebookId] = useState("");
  const [facebookEmail, setFacebookEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userRegisterId, setUserRegisterId] = useState("");
  const [verification_code, setVerification] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const [isFbAcive, setIsFbAcive] = useState(true);
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);
  const [msgSuccess, setMsgSucess] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [isErrorVerifyMsg, setIsErrorVerifyMsg] = useState(false);
  const [msgErrorVerify, setMsgErrorVerify] = useState("");
  const [isEmailExistMsg, setIsEmailExistMsg] = useState(false);
  const [isFirstNameSelected, setIsFirstNameSelected] = useState(false);
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isPasswordSelected, setIsPasswordSelected] = useState(false);
  const [isVerifyEmailSelected, setIsVerifyEmailSelected] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    firstname: "Name",
    email: "Email",
    password: "Password",
    password2: "Confirm Password",
  });
  const [valuesVerify, setValuesVerify] = useState({
    verification_code: "",
  });
  const [errorsVerify, setErrorsVerify] = useState({
    verification_code: "Verification Code",
  });
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [eye1, setEye1] = useState(<FontAwesomeIcon icon={faEye} />);
  const [isEye1, setIsEye1] = useState(false);
  const [isEye2, setIsEye2] = useState(false);
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
    setEye1(
      passwordShown1 ? (
        <FontAwesomeIcon icon={faEye} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} />
      )
    );
  };
  let FBData = null;
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("root").scrollTo(0, 0);
    if (state.location.state) {
      let FBData = state.location.state.facebookData;
      setIsFbAcive(false);
      setFacebookId(FBData.id);
      setFacebookData(state.location.state.facebookData);
      if (FBData.email) {
        setValues({
          ...values,
          ["firstname"]: FBData.first_name,
          ["email"]: FBData.email,
        });
      } else {
        setValues({
          ...values,
          ["firstname"]: FBData.first_name,
        });
      }
    }
  }, []);
  const validateEmail = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }
    return false;
  };
  const validatePassword = (password) => {
    if (/^[a-zA-Z0-9@#$%&*^!.,+\-:;_\'\"?]{6,30}$/.test(password)) {
      return true;
    }
    return false;
  };
  const validateVerify = (verification_code) => {
    if (/^\d*$/.test(verification_code.trim())) {
      return true;
    }
    return false;
  };
  const validateName = (firstname) => {
    if (/^[a-zA-Z ]*$/.test(firstname.trim())) {
      return true;
    }
    return false;
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    if (name == "password") {
      if (value.length > 0) {
        setIsEye1(true);
      } else {
        setIsEye1(false);
      }
    } else if (name == "password2") {
      if (value.length > 0) {
        setIsEye2(true);
      } else {
        setIsEye2(false);
      }
    }
  };
  const onChangeHandlerVerify = (e) => {
    const { name, value } = e.target;

    setValuesVerify({
      ...valuesVerify,
      [name]: value,
    });
  };

  const validationVerify = () => {
    let errorsVerify = {};
    let formIsValid = true;
    if (valuesVerify.verification_code.trim()) {
      var errorMsg = validateVerify(valuesVerify.verification_code);
      if (errorMsg === true) {
        errorsVerify.verification_code = "Verification Code";
        setVerification("");
      } else {
        formIsValid = false;
        setVerification(" Input--errored");
        errorsVerify.verification_code = "OTP contain numeric only";
      }
    } else {
      formIsValid = false;
      errorsVerify.verification_code = "Required Verification Field";
      setVerification(" Input--errored");
    }
    setErrorsVerify(errorsVerify);
    return formIsValid;
  };
  const validation = () => {
    let errors = {};
    let formIsValid = true;

    if (values.firstname.trim()) {
      var errorMsg = validateName(values.firstname);
      if (errorMsg === true) {
        errors.firstname = "Name";
        setFirstName("");
      } else {
        formIsValid = false;
        setFirstName(" Input--errored");
        errors.firstname = "Alphabets only";
      }
    } else {
      formIsValid = false;
      errors.firstname = "Required Name Field";
      setFirstName(" Input--errored");
    }
    if (values.email.trim()) {
      var errorMsg = validateEmail(values.email);
      if (errorMsg === true) {
        errors.email = "Email";
        setEmail("");
      } else {
        formIsValid = false;
        setEmail(" Input--errored");
        errors.email = "Invalid email Address";
      }
    } else {
      formIsValid = false;
      errors.email = "Required Email Field";
      setEmail(" Input--errored");
    }
    if (values.password.trim()) {
      var errorMsg = validatePassword(values.password);
      if (errorMsg === true) {
        errors.password = "Password";
        setPassword("");
      } else {
        formIsValid = false;
        setPassword(" Input--errored");
        errors.password = "Invalid password";
        setMsgError("Length must be between 6 and 30");
        setIsErrorMsg(true);
        setTimeout(function () {
          setIsErrorMsg(false);
        }, 5000);
      }
      // if (values.password.length >= 6 && values.password.length <= 30) {
      //     if (values.password.trim()) {
      //         errors.password = "Password"
      //         setPassword('');
      //         errors.password2 = "Confirm Password"
      //         setPassword2('');
      //     } else {
      //         errors.password = "Password"
      //         setPassword('');
      //     }
      // } else {
      //     formIsValid = false
      //     setPassword(' Input--errored');
      //     errors.password = "Length must be between 6 and 30"
      // }
    } else {
      formIsValid = false;
      setPassword(" Input--errored");
      errors.password = "Required Password Field";
    }
    setErrors(errors);
    return formIsValid;
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (validation()) {
      service.register(values, facebookId).then((response) => {
        if (response.success == true) {
          setUserRegisterId(response.user_id);
          setIsRegister(false);
          setMsgSucess(
            "OTP sent to your Email Id (Note:  If you do not find the email in your inbox, please check your spam filter or bulk email folder)"
          );
          setIsSuccessMsg(true);
          setTimeout(function () {
            setIsSuccessMsg(false);
          }, 5000);
        }
        // else if (response.status == 0) {
        //     setMsgError('There was an error during registration');
        //     setIsErrorMsg(true);
        //     setTimeout(function () {
        //         setIsErrorMsg(false);
        //     }, 5000);

        // }
        else {
          setMsgError("Already registered user");
          setIsErrorMsg(true);
          setTimeout(function () {
            setIsErrorMsg(false);
          }, 5000);
        }
      });
    }
  };
  const onVerifyHandler = (e) => {
    e.preventDefault();
    if (validationVerify()) {
      service.verifyEmail(valuesVerify, userRegisterId).then((response) => {
        if (response.success == true) {
          localStorage.setItem("isLoggedIn", true);
          service.setCookie("userId", response.data[0].user_id, 30);
          localStorage.setItem("userId", response.data[0].user_id);
          localStorage.setItem("userName", response.data[0].first_name);
          service.setCookie("isLoggedIn", "true", 30);
          setMsgSucess("You are successfully registered");
          setIsSuccessMsg(true);
          setTimeout(function () {
            setIsSuccessMsg(false);
          }, 5000);
          dispatch({ type: "LOGIN", payload: true });
          if (sessionStorage.getItem("tvActivateFlag") == "true") {
            history.push("/tv");
          } else {
            if (showId != "") {
              history.push({
                pathname: "/home/movies",
                search: encodeURI(`show_id=${showId}`),
              });
            } else {
              window.location.href = "/home";
            }
          }
        } else {
          setMsgErrorVerify("Invalid OTP");
          setIsErrorVerifyMsg(true);
          setTimeout(function () {
            setIsErrorVerifyMsg(false);
          }, 5000);
        }
      });
    }
  };
  const responseFacebook = (response) => {
    FBData = response;
    setFacebookId(FBData.id);
    setFacebookEmail(FBData.email);
    setFacebookData(response);
    if (response.id != undefined && response.id != null && response.id != "")
      service
        .facebookLogin(
          response.id,
          response.email,
          response.first_name,
          response.last_name
        )
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userName", response.data[0].first_name);
            service.setCookie("userId", response.data[0].user_id, 30);
            service
              .userSubscription(response.data[0].user_id)
              .then((response) => {
                // if (response.forcibleLogout == false) {
                service.setCookie("isLoggedIn", "true", 30);
                var user_sub = response.data;
                if (user_sub.length > 0) {
                  service.setCookie("isLoggedIn", "true", 30);
                  setMsgSucess("You are successfully registered");
                  setIsSuccessMsg(true);
                  setTimeout(function () {
                    setIsSuccessMsg(false);
                  }, 5000);
                  // history.push('/home');
                  if (sessionStorage.getItem("tvActivateFlag") == "true") {
                    history.push("/tv");
                  } else {
                    window.location.href = "/home";
                  }
                } else {
                  service.setCookie("isLoggedIn", "true", 30);
                  setMsgSucess("You are successfully registered");
                  setIsSuccessMsg(true);
                  setTimeout(function () {
                    setIsSuccessMsg(false);
                  }, 5000);
                  // history.push('/home');
                  if (sessionStorage.getItem("tvActivateFlag") == "true") {
                    history.push("/tv");
                  } else {
                    window.location.href = "/home";
                  }
                }

                //     return false;
                // }
              });
          } else if (response.status == 202) {
            setMsgError("There was an error during registration");
            setIsErrorMsg(true);
            setTimeout(function () {
              setIsErrorMsg(false);
            }, 5000);
          } else if (response.status == 203) {
            setIsFbAcive(false);
            if (FBData.email) {
              setValues({
                ...values,
                ["firstname"]: FBData.first_name,
                ["email"]: FBData.email,
              });
            } else {
              setValues({
                ...values,
                ["firstname"]: FBData.first_name,
              });
            }
          } else if (response.status == 201) {
            setUserRegisterId(response.data[0].user_id);
            setIsRegister(false);
            setMsgSucess(
              "OTP sent to your Email Id (Note:  If you do not find the email in your inbox, please check your spam filter or bulk email folder)"
            );
            setIsSuccessMsg(true);
            setTimeout(function () {
              setIsSuccessMsg(false);
            }, 5000);
          } else if (response.status == 204) {
            confirmAlert({
              closeOnEscape: false,
              closeOnClickOutside: false,
              message: "Do you want to link your Facebook account?",
              buttons: [
                {
                  label: "Yes",
                  onClick: () => onFBLink(),
                },
                {
                  label: "No",
                  onClick: () => onFBNoLink(),
                },
              ],
            });
          }
        });
  };
  const onFBLink = () => {
    service
      .facebookLink(
        FBData.id,
        FBData.email,
        FBData.first_name,
        FBData.last_name
      )
      .then((response) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userName", response.data[0].first_name);
        service.setCookie("userId", response.data[0].user_id, 30);
        service.userSubscription(response.data[0].user_id).then((response) => {
          // if (response.forcibleLogout == false) {
          service.setCookie("isLoggedIn", "true", 30);
          var user_sub = response.data;
          if (user_sub.length > 0) {
            service.setCookie("isLoggedIn", "true", 30);
            setMsgSucess("You are successfully registered");
            setIsSuccessMsg(true);
            setTimeout(function () {
              setIsSuccessMsg(false);
            }, 5000);
            // history.push('/home');
            if (sessionStorage.getItem("tvActivateFlag") == "true") {
              history.push("/tv");
            } else {
              window.location.href = "/home";
            }
          } else {
            service.setCookie("isLoggedIn", "true", 30);
            setMsgSucess("You are successfully registered");
            setIsSuccessMsg(true);
            setTimeout(function () {
              setIsSuccessMsg(false);
            }, 5000);
            // history.push('/home');
            if (sessionStorage.getItem("tvActivateFlag") == "true") {
              history.push("/tv");
            } else {
              window.location.href = "/home";
            }
          }

          //     return false;
          // }
        });
      });
  };
  const onFBNoLink = () => {
    setIsEmailExistMsg(true);
    setTimeout(function () {
      setIsEmailExistMsg(false);
    }, 5000);
  };
  const onSignIn = () => {
    history.push("/signin");
  };

  if (isLoggedIn === "true") {
    return <Redirect to="/home" />;
  } else {
    return (
      <div className="pageWrapper searchPageMain">
        <div className="topContainer">
          <div
            className={`menuCloseJS closeMenuWrapper ${
              isRegister ? "regnPage" : "regnPage1"
            }`}
          >
            <div className="container">
              <div className="row regnWrapper">
                <div className="col col-9 col-lg-6 col-xl-6 col-xxl-5">
                  <h3 className="H3">Let's get you set up!</h3>
                  <div>
                    {isFbAcive && (
                      <div>
                        <div rel="noopener" target="_self">
                          <button className="button buttonLarge buttonBlock registerFacebook">
                            <div className="buttonBg"></div>
                            <FacebookLogin
                              appId="260842788745437"
                              fields="name,email,picture,first_name"
                              callback={responseFacebook}
                              cssClass="button buttonLarge buttonBlock registerFacebook"
                              isMobile={false}
                              textButton="Register via Facebook"
                            />
                          </button>
                        </div>
                        <div className="orContainer orMargin">
                          <div className="orDivider"></div>
                          <div className="orCircle">
                            <div className="orText">OR</div>
                          </div>
                          <div className="orDivider"></div>
                        </div>
                      </div>
                    )}

                    {isRegister ? (
                      <div id="registerId">
                        <h5 className="H5 regnFormHeading">
                          Register via email
                        </h5>
                        <form
                          className="regnformContainer"
                          noValidate
                          onSubmit={onSubmitHandler}
                        >
                          {isErrorMsg && <p className="_3nmo_">{msgError}</p>}
                          {isEmailExistMsg && (
                            <p className="_3nmo_">
                              {facebookEmail} already exist, Please&nbsp;&nbsp;
                              <button
                                onClick={onSignIn}
                                className="linkButton button buttonSmall"
                              >
                                <div
                                  className="buttonBg"
                                  // style={{ backgroundColor: "#148AB7" }}
                                ></div>
                                <div className="buttonContent">Sign In</div>
                              </button>
                            </p>
                          )}
                          <div
                            style={{ marginTop: "18px" }}
                            onClick={() => setIsFirstNameSelected(true)}
                            onBlur={() => setIsFirstNameSelected(false)}
                            className={`input ${firstname} ${
                              isFirstNameSelected ? "inputActive" : ""
                            }`}
                          >
                            <input
                              className="inputText"
                              style={{
                                border: "none",
                                padding: "0px",
                                marginTop: "10px",
                              }}
                              name="firstname"
                              type="text"
                              maxLength="60"
                              value={values.firstname}
                              onChange={onChangeHandler}
                            />
                            <span className="inputLabel">
                              {errors.firstname}
                            </span>
                          </div>
                          <div
                            style={{ marginTop: "22px" }}
                            onClick={() => setIsEmailSelected(true)}
                            onBlur={() => setIsEmailSelected(false)}
                            className={`input ${email} ${
                              isEmailSelected ? "inputActive" : ""
                            }`}
                          >
                            <input
                              className="inputText"
                              style={{
                                border: "none",
                                padding: "0px",
                                marginTop: "10px",
                              }}
                              name="email"
                              type="email"
                              value={values.email}
                              onChange={onChangeHandler}
                            />
                            <span className="inputLabel">{errors.email}</span>
                            {!values.email && (
                              <span className="inputHint">
                                We never share this
                              </span>
                            )}
                          </div>
                          <div
                            style={{ marginTop: "20px" }}
                            onClick={() => setIsPasswordSelected(true)}
                            onBlur={() => setIsPasswordSelected(false)}
                            className={`input ${password} ${
                              isPasswordSelected ? "inputActive" : ""
                            }`}
                          >
                            <input
                              className="inputText"
                              title="Length must be between 6 and 30"
                              style={{
                                border: "none",
                                padding: "0px",
                                marginTop: "10px",
                              }}
                              name="password"
                              type={passwordShown1 ? "text" : "password"}
                              value={values.password}
                              onChange={onChangeHandler}
                            />
                            {isEye1 && (
                              <i
                                className="eyeIcon"
                                onClick={togglePasswordVisiblity1}
                              >
                                {eye1}
                              </i>
                            )}

                            <span className="inputLabel">
                              {errors.password}
                            </span>
                            {!values.password && (
                              <span className="inputHint">
                                Pick something you can remember
                              </span>
                            )}
                          </div>

                          <div className="regnSubmitWrapper">
                            <p
                              style={{
                                paddingTop: "10px",
                                fontSize: "14px",
                                color: "rgb(112, 124, 134)",
                              }}
                            >
                              Already have an account?
                              <Link to={{ pathname: "/signin" }}>
                                <span className="linkButton">
                                  &nbsp; Sign In
                                </span>
                              </Link>
                            </p>
                            <button
                              className="button buttonLarge regnSubmit"
                              type="submit"
                              id="registerSubmit"
                            >
                              <div
                                className="buttonBg"
                                // style={{ backgroundColor: "#81d742" }}
                              ></div>
                              <div className="buttonContent">Register</div>
                            </button>
                          </div>
                          <div className="regnAgreeContent">
                            <p>
                              By registering, you agree to HappiTV
                              <Link to="/termsofuse">
                                <div className="linkButton">
                                  &nbsp;Terms of Use
                                </div>
                              </Link>
                              &nbsp; and
                              <Link to="/policydarkmode">
                                <div className="linkButton" href="#">
                                  &nbsp;Privacy Policy
                                </div>
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div id="verifyId">
                        <h5
                          className="H5 regnFormHeading"
                          style={{ marginTop: "0px", marginBottom: "25px" }}
                        >
                          Email Verification
                        </h5>
                        <form
                          className="regnformContainer"
                          noValidate
                          onSubmit={onVerifyHandler}
                        >
                          {isSuccessMsg && (
                            <p className="_3nmo_success">{msgSuccess}</p>
                          )}
                          {isErrorVerifyMsg && (
                            <p className="_3nmo_">{msgErrorVerify}</p>
                          )}
                          <div
                            onClick={() => setIsVerifyEmailSelected(true)}
                            onBlur={() => setIsVerifyEmailSelected(false)}
                            className={`input ${verification_code} ${
                              isVerifyEmailSelected ? "inputActive" : ""
                            }`}
                          >
                            <input
                              className="inputText"
                              style={{
                                border: "none",
                                padding: "0px",
                                marginTop: "10px",
                              }}
                              name="verification_code"
                              type="text"
                              maxLength="60"
                              value={valuesVerify.verification_code}
                              onChange={onChangeHandlerVerify}
                            />
                            <span className="inputLabel">
                              {errorsVerify.verification_code}
                            </span>
                          </div>
                          <div className="regnSubmitWrapper">
                            <button
                              className="button buttonLarge regnSubmit"
                              type="submit"
                            >
                              <div
                                className="buttonBg"
                                // style={{ backgroundColor: "#81d742" }}
                              ></div>
                              <div className="buttonContent">Verify</div>
                            </button>
                          </div>
                        </form>
                        <div className="regnAgreeContent">
                          <p>
                            By registering, you agree to HappiTv
                            <Link to="/termsofuse">
                              <div className="linkButton">
                                {" "}
                                &nbsp;Terms of Use
                              </div>
                            </Link>
                            &nbsp; and
                            <Link to="/policydarkmode">
                              <div className="linkButton" href="#">
                                {" "}
                                &nbsp;Privacy Policy
                              </div>
                            </Link>
                          </p>
                          <p>
                            Already have an account?
                            <Link to={{ pathname: "/signin" }}>
                              <span className="linkButton">&nbsp; Sign In</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Register;
