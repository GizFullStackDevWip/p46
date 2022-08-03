import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { service } from "../../network/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector, useDispatch } from "react-redux";
import { deviceDetect } from "../../Utils/utils";
import $ from "jquery";
const SignIn = (props) => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let userId = service.getCookie("userId");
  if (isLoggedIn === "true" && userId) {
    return <Redirect to="/home" />;
  }
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const functionOnclick = (path) => {
    history.push({ pathname: path });
  };
  let prevDomain = document.referrer
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/)[0];
  let currentDomain = window.location.href
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/)[0];

  const showId = useSelector((state) => state.showId);
  const [isDesktop, setIsDesktop] = useState(deviceDetect());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verification_code, setVerification] = useState("");
  const [forgot_email, setForgotEmail] = useState("");
  const [userLoggedId, setUserLoggedId] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isVerify, setIsVeriy] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [isSuccessLoginMsg, setIsSuccessLoginMsg] = useState(false);
  const [msgSuccessLogin, setMsgSucessLogin] = useState("");
  const [isErrorLoginMsg, setIsErrorLoginMsg] = useState(false);
  const [msgErrorLogin, setMsgErrorLogin] = useState("");
  const [isSuccessVerifyMsg, setIsSuccessVerifyMsg] = useState(false);
  const [msgSucessVerify, setMsgSucessVerify] = useState("");
  const [isErrorVerifyMsg, setIsErrorVerifyMsg] = useState(false);
  const [msgErrorVerify, setMsgErrorVerify] = useState("");
  const [isSuccessForgotMsg, setIsSuccessForgotMsg] = useState(false);
  const [msgSuccessForgot, setMsgSucessForgot] = useState("");
  const [isErrorForgotMsg, setIsErrorForgotMsg] = useState(false);
  const [msgErrorForgot, setMsgErrorForgot] = useState("");
  const [isSuccessLogoutMsg, setIsSuccessLogoutMsg] = useState(false);
  const [isErrorLogoutMsg, setIsErrorLogoutMsg] = useState(false);
  const [isErrorLogout, setIsErrorLogout] = useState(false);
  const [isGetIP, setIsGetIP] = useState(true);
  const [facebookData, setFacebookData] = useState("");
  const [accessTokenFB, setAccessTokenFB] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [facebookEmail, setFacebookEmail] = useState("");
  const [isEmailExistMsg, setIsEmailExistMsg] = useState(false);
  const [isEmailVerify, setIsEmailVeriy] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "Email",
    password: "Password",
  });
  const [valuesVerify, setValuesVerify] = useState({
    verification_code: "",
  });
  const [errorsVerify, setErrorsVerify] = useState({
    verification_code: "Verification Code",
  });
  const [valuesForgot, setValuesForgot] = useState({
    forgot_email: "",
  });
  const [errorsForgot, setErrorsForgot] = useState({
    forgot_email: "Email",
  });
  let FBData = null;
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [eye1, setEye1] = useState(<FontAwesomeIcon icon={faEye} />);
  const [isEye1, setIsEye1] = useState(false);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    $(".inputText").focus(function () {
      $(this).parent(".input").addClass("inputActive");
    });
    $(".inputText").focusout(function () {
      $(this).parent(".input").removeClass("inputActive");
    });
    // document.getElementById("signInLink").style.display = "none";
    if (isGetIP) {
      fetch("https://geolocation-db.com/json/")
        .then((res) => res.json())
        .then((json) => localStorage.setItem("ipaddress", json.IPv4)).catch((error) => {
          console.log('geolocation', error)
        });
      setIsGetIP(false);
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
  const validateVerify = (verification_code) => {
    if (/^\d*$/.test(verification_code.trim())) {
      return true;
    }
    return false;
  };
  const onChangeHandlerVerify = (e) => {
    const { name, value } = e.target;

    setValuesVerify({
      ...valuesVerify,
      [name]: value,
    });
  };
  const onChangeHandlerForgot = (e) => {
    const { name, value } = e.target;

    setValuesForgot({
      ...valuesForgot,
      [name]: value,
    });
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
    }
  };
  const validationForgot = () => {
    let errorsForgot = {};
    let formIsValid = true;
    if (valuesForgot.forgot_email.trim()) {
      var errorMsg = validateEmail(valuesForgot.forgot_email);
      if (errorMsg === true) {
        errorsForgot.forgot_email = "Email";
        setForgotEmail("");
      } else {
        formIsValid = false;
        setForgotEmail(" Input--errored");
        errorsForgot.forgot_email = "Invalid email Address";
      }
    } else {
      formIsValid = false;
      errorsForgot.forgot_email = "Required Email Field";
      setForgotEmail(" Input--errored");
    }
    setErrorsForgot(errorsForgot);
    return formIsValid;
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
      errors.password = "Password";
      setPassword("");
    } else {
      formIsValid = false;
      setPassword(" Input--errored");
      errors.password = "Required Password Field";
    }
    setErrors(errors);
    return formIsValid;
  };

  async function analyticsDevice() {
    await service
      .getLocation()
      .then((response) => {
        let currentLocation = {};
        currentLocation["country_code"] = response.data.countryCode;
        currentLocation["country_name"] = response.data.country;
        currentLocation["city"] = response.data.city;
        currentLocation["latitude"] = response.data.lat;
        currentLocation["longitude"] = response.data.lon;
        currentLocation["IPv4"] = response.data.query;
        currentLocation["state"] = response.data.region;
        localStorage.setItem(
          "currentLocation",
          JSON.stringify(currentLocation)
        );
        service.analytics().then((response) => {
          if (response.message) {
            service.setCookie("device_analytics", true);
          }
        });
      })
      .catch((error) => {
        service.analytics().then((response) => {
          if (response.message) {
            service.setCookie("device_analytics", true);
          }
        });
      });
  }
  const responseFacebook = (response) => {
    debugger;
    console.log("fb login response", response);
    setFacebookData(response);
    FBData = response;
    setFacebookId(FBData.id);
    setFacebookEmail(FBData.email);
    setAccessTokenFB(response.accessToken);
    var name = response.first_name;
    // if (response) {
    debugger;
    console.log("inside this respose", response);
    service
      .facebookLogin(response.id, response.email, name)
      .then((response) => {
        console.log("response of the socila medial login api", response);
        if (response.status === 200) {
          console.log("200 status");

          var data = response.data[0];
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userName", data.first_name);
          service.setCookie("userId", data.user_id, 30);
          service.setCookie("isLoggedIn", "true", 30);
          dispatch({ type: "LOGIN", payload: true });

          let prevLocation = localStorage.getItem("location");
          let analyticsVal = service.getCookie("device_analytics");
          if (analyticsVal) {
            if (analyticsVal === "true") {
              let storedData = service.getCookie("deviceAnalyticsCheck");
              let deviceId = localStorage.getItem("deviceId");
              let presentData = deviceId + data.user_id;
              if (storedData !== presentData) {
                service.setCookie("deviceAnalyticsCheck", presentData, 30);
                analyticsDevice();
              }
            } else {
              let deviceId = localStorage.getItem("deviceId");
              let deviceAnalyticsCheck = deviceId + data.user_id;
              service.setCookie(
                "deviceAnalyticsCheck",
                deviceAnalyticsCheck,
                30
              );
              analyticsDevice();
            }
          } else {
            let deviceId = localStorage.getItem("deviceId");
            let deviceAnalyticsCheck = deviceId + data.user_id;
            service.setCookie("deviceAnalyticsCheck", deviceAnalyticsCheck, 30);
            analyticsDevice();
          }

          if (prevLocation === "/tv") {
            history.push("/tv");
          } else if (location.state && location.state.from) {
            history.push({
              pathname: location.state.from.pathname,
              search: encodeURI(location.state.from.search),
              state: { item: response.data },
            });
          } else {
            history.goBack();
          }
        } else if (response.status == 204) {
          console.log("204 status");
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

        // else if (response.success == true) {
        //   let loginFBData = response.data[0];
        //   service
        //     .userSubscription(response.data[0].user_id)
        //     .then((response) => {
        //       console.log("response of subscription", response);
        //       setUserLoggedId(loginFBData.user_id);
        //       // if (response.forcibleLogout == false) {
        //       localStorage.setItem("isLoggedIn", true);
        //       localStorage.setItem("userName", loginFBData.first_name);
        //       service.setCookie("userId", loginFBData.user_id, 30);
        //       service.setCookie("userEmail", response.email, 30);
        //       service.setCookie("isLoggedIn", "true", 30);

        //       let analyticsVal = service.getCookie("device_analytics");
        //       if (analyticsVal) {
        //         if (analyticsVal === "true") {
        //           let storedData = service.getCookie("deviceAnalyticsCheck");
        //           let deviceId = localStorage.getItem("deviceId");
        //           let presentData = deviceId + loginFBData.user_id;
        //           if (storedData !== presentData) {
        //             service.setCookie("deviceAnalyticsCheck", presentData, 30);
        //             analyticsDevice();
        //           }
        //         } else {
        //           let deviceId = localStorage.getItem("deviceId");
        //           let deviceAnalyticsCheck = deviceId + loginFBData.user_id;
        //           service.setCookie(
        //             "deviceAnalyticsCheck",
        //             deviceAnalyticsCheck,
        //             30
        //           );
        //           analyticsDevice();
        //         }
        //       } else {
        //         let deviceId = localStorage.getItem("deviceId");
        //         let deviceAnalyticsCheck = deviceId + loginFBData.user_id;
        //         service.setCookie(
        //           "deviceAnalyticsCheck",
        //           deviceAnalyticsCheck,
        //           30
        //         );
        //         analyticsDevice();
        //       }

        //       var user_sub = response.data;
        //       if (user_sub.length > 0) {
        //         setMsgSucessLogin("You are successfully logged in.");
        //         setIsSuccessLoginMsg(true);
        //         setTimeout(function () {
        //           setIsSuccessLoginMsg(false);
        //         }, 1000);
        //         dispatch({ type: "LOGIN", payload: true });
        //         let prevLocation = localStorage.getItem("location");
        //         if (prevLocation === "/tv") {
        //           history.push("/tv");
        //         } else if (location.state && location.state.from) {
        //           history.push({
        //             pathname: location.state.from.pathname,
        //             search: encodeURI(location.state.from.search),
        //             state: { item: response.data },
        //           });
        //         } else {
        //           history.goBack();
        //         }
        //       } else {
        //         setMsgSucessLogin("You are successfully logged in.");
        //         setIsSuccessLoginMsg(true);
        //         setTimeout(function () {
        //           setIsSuccessLoginMsg(false);
        //         }, 5000);
        //         dispatch({ type: "LOGIN", payload: true });
        //         let prevLocation = localStorage.getItem("location");
        //         if (prevLocation === "/tv") {
        //           history.push("/tv");
        //         } else if (location.state && location.state.from) {
        //           history.push({
        //             pathname: location.state.from.pathname,
        //             search: encodeURI(location.state.from.search),
        //             state: { item: response.data },
        //           });
        //         } else {
        //           history.goBack();
        //         }
        //       }

        //       // } else {
        //       //     setIsErrorLogoutMsg(true);
        //       //     setTimeout(function () {
        //       //         setIsErrorLogoutMsg(false);
        //       //     }, 5000);
        //       // }
        //     });
        // }
        else if (response.status == 102) {
          setMsgErrorLogin("Please enter a valid user email and password");
          setIsErrorLoginMsg(true);
          setTimeout(function () {
            setIsErrorLoginMsg(false);
          }, 5000);
        } else if (response.status == 103) {
          history.push({
            pathname: "/register",
            state: { facebookData: FBData },
          });
        } else if (response.status == 101) {
          setUserLoggedId(response.data[0].user_id);
          setIsLogin(false);
          setIsVeriy(true);
          setMsgSucessVerify(
            "OTP sent to your Email (Note:  If you do not find the email in your inbox, please check your spam filter or bulk email folder)"
          );
          setIsSuccessVerifyMsg(true);
          setTimeout(function () {
            setIsSuccessVerifyMsg(false);
          }, 5000);
        } else {
          console.log("errro status");
          setMsgErrorLogin("There was an error during registration");
          setIsErrorLoginMsg(true);
          setTimeout(function () {
            setIsErrorLoginMsg(false);
          }, 5000);
        }
      });
    // }
  };
  const onFBLink = () => {
    console.log("onFBLink link");
    debugger;
    service.facebokLink(FBData.id, FBData.email).then((response) => {
      console.log("onFBLinklogin", response);
      let loginFBData = response.data[0];
      service.userSubscription(response.data[0].user_id).then((response) => {
        setUserLoggedId(loginFBData.user_id);
        // if (response.forcibleLogout == false) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userName", loginFBData.first_name);
        service.setCookie("userId", loginFBData.user_id, 30);
        service.setCookie("userEmail", FBData.email, 30);
        service.setCookie("isLoggedIn", "true", 30);

        let analyticsVal = service.getCookie("device_analytics");
        if (analyticsVal) {
          if (analyticsVal === "true") {
            let storedData = service.getCookie("deviceAnalyticsCheck");
            let deviceId = localStorage.getItem("deviceId");
            let presentData = deviceId + loginFBData.user_id;
            if (storedData !== presentData) {
              service.setCookie("deviceAnalyticsCheck", presentData, 30);
              analyticsDevice();
            }
          } else {
            let deviceId = localStorage.getItem("deviceId");
            let deviceAnalyticsCheck = deviceId + loginFBData.user_id;
            service.setCookie("deviceAnalyticsCheck", deviceAnalyticsCheck, 30);
            analyticsDevice();
          }
        } else {
          let deviceId = localStorage.getItem("deviceId");
          let deviceAnalyticsCheck = deviceId + loginFBData.user_id;
          service.setCookie("deviceAnalyticsCheck", deviceAnalyticsCheck, 30);
          analyticsDevice();
        }

        var user_sub = response.data;
        if (user_sub.length > 0) {
          setMsgSucessLogin("You are successfully logged in.");
          setIsSuccessLoginMsg(true);
          setTimeout(function () {
            setIsSuccessLoginMsg(false);
          }, 1000);
          dispatch({ type: "LOGIN", payload: true });
          let prevLocation = localStorage.getItem("location");
          if (prevLocation === "/tv") {
            history.push("/tv");
          } else if (location.state && location.state.from) {
            history.push({
              pathname: location.state.from.pathname,
              search: encodeURI(location.state.from.search),
              state: { item: response.data },
            });
          } else {
            history.goBack();
          }
        } else {
          setMsgSucessLogin("You are successfully logged in.");
          setIsSuccessLoginMsg(true);
          setTimeout(function () {
            setIsSuccessLoginMsg(false);
          }, 5000);
          dispatch({ type: "LOGIN", payload: true });
          let prevLocation = localStorage.getItem("location");
          if (prevLocation === "/tv") {
            history.push("/tv");
          } else if (location.state && location.state.from) {
            history.push({
              pathname: location.state.from.pathname,
              search: encodeURI(location.state.from.search),
              state: { item: response.data },
            });
          } else {
            history.goBack();
          }
        }

        // } else {
        //     setIsErrorLogoutMsg(true);
        //     setTimeout(function () {
        //         setIsErrorLogoutMsg(false);
        //     }, 5000);
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
  const onLoginHandler = (e) => {
    //normal sign in
    e.preventDefault();
    if (validation()) {
      service.login(values).then((response) => {
        if (response.status == 200) {
          let loginData = response.data.data[0];
          service
            .userSubscription(response.data.data[0].user_id)
            .then((response) => {
              setUserLoggedId(loginData.user_id);
              // if (response.forcibleLogout == false) {
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("userName", loginData.first_name);
              localStorage.setItem("userId", loginData.user_id);
              service.setCookie("userEmail", loginData.user_email, 30);
              service.setCookie("userId", loginData.user_id, 30);
              service.setCookie("isLoggedIn", "true", 30);

              let analyticsVal = service.getCookie("device_analytics");
              if (analyticsVal) {
                if (analyticsVal === "true") {
                  let storedData = service.getCookie("deviceAnalyticsCheck");
                  let deviceId = localStorage.getItem("deviceId");
                  let presentData = deviceId + loginData.user_id;
                  if (storedData !== presentData) {
                    service.setCookie("deviceAnalyticsCheck", presentData, 30);
                    analyticsDevice();
                  }
                } else {
                  let deviceId = localStorage.getItem("deviceId");
                  let deviceAnalyticsCheck = deviceId + loginData.user_id;
                  service.setCookie(
                    "deviceAnalyticsCheck",
                    deviceAnalyticsCheck,
                    30
                  );
                  analyticsDevice();
                }
              } else {
                let deviceId = localStorage.getItem("deviceId");
                let deviceAnalyticsCheck = deviceId + loginData.user_id;
                service.setCookie(
                  "deviceAnalyticsCheck",
                  deviceAnalyticsCheck,
                  30
                );
                analyticsDevice();
              }

              var user_sub = response.data;
              if (user_sub.length > 0) {
                setMsgSucessLogin("You are successfully logged in.");
                setIsSuccessLoginMsg(true);
                setTimeout(function () {
                  setIsSuccessLoginMsg(false);
                }, 1000);
                dispatch({ type: "LOGIN", payload: true });
                let prevLocation = localStorage.getItem("location");
                if (prevLocation === "/tv") {
                  history.push("/tv");
                } else if (location.state && location.state.from) {
                  history.push({
                    pathname: location.state.from.pathname,
                    search: encodeURI(location.state.from.search),
                    state: { item: response.data },
                  });
                } else {
                  // history.goBack();
                  debugger;
                  if (prevDomain == currentDomain) {
                    history.goBack();
                  } else {
                    window.location.href = "/home";
                  }
                }
                // window.location.reload(false);
              } else {
                setMsgSucessLogin("You are successfully logged in.");
                setIsSuccessLoginMsg(true);
                setTimeout(function () {
                  setIsSuccessLoginMsg(false);
                }, 5000);
                dispatch({ type: "LOGIN", payload: true });
                let prevLocation = localStorage.getItem("location");
                if (prevLocation === "/tv") {
                  history.push("/tv");
                } else if (location.state && location.state.from) {
                  history.push({
                    pathname: location.state.from.pathname,
                    search: encodeURI(location.state.from.search),
                    state: { item: response.data },
                  });
                } else {
                  // history.goBack();
                  debugger;
                  if (prevDomain == currentDomain) {
                    history.goBack();
                  } else {
                    window.location.href = "/home";
                  }
                }
                // window.location.reload(false);
              }

              // } else {
              //     setIsErrorLogoutMsg(true);
              //     setTimeout(function () {
              //         setIsErrorLogoutMsg(false);
              //     }, 5000);
              // }
            });
        } else if (response.status == 202) {
          setMsgErrorLogin("Please enter a valid user email and password");
          setIsErrorLoginMsg(true);
          setTimeout(function () {
            setIsErrorLoginMsg(false);
          }, 5000);
        }
        // else if (response.status == 103) {
        //     setMsgErrorLogin('Login limit exceed');
        //     setIsErrorLoginMsg(true);
        //     setTimeout(function () {
        //         setIsErrorLoginMsg(false);
        //     }, 5000);

        // }
        else if (response.status == 201) {
          setUserLoggedId(response.data.data[0].user_id);
          setIsLogin(false);
          setIsVeriy(true);
          setMsgSucessVerify(
            "OTP sent to your Email (Note:  If you do not find the email in your inbox, please check your spam filter or bulk email folder)"
          );
          setIsSuccessVerifyMsg(true);
          setTimeout(function () {
            setIsSuccessVerifyMsg(false);
          }, 5000);
        }
      });
    }
  };
  const onVerifyHandler = (e) => {
    e.preventDefault();
    if (validationVerify()) {
      service.verifyEmail(valuesVerify, userLoggedId).then((response) => {
        if (response.success == true) {
          localStorage.setItem("isLoggedIn", true);
          service.setCookie("userId", userLoggedId, 30);
          service.setCookie("isLoggedIn", "true", 30);
          setMsgSucessVerify("Your registration is completed");
          localStorage.setItem("userName", response.data[0].first_name);
          setIsSuccessVerifyMsg(true);
          let analyticsVal = service.getCookie("device_analytics");
          if (analyticsVal) {
            if (analyticsVal === "true") {
              let storedData = service.getCookie("deviceAnalyticsCheck");
              let deviceId = localStorage.getItem("deviceId");
              let presentData = deviceId + userLoggedId;
              if (storedData !== presentData) {
                service.setCookie("deviceAnalyticsCheck", presentData, 30);
                analyticsDevice();
              }
            } else {
              let deviceId = localStorage.getItem("deviceId");
              let deviceAnalyticsCheck = deviceId + userLoggedId;
              service.setCookie(
                "deviceAnalyticsCheck",
                deviceAnalyticsCheck,
                30
              );
              analyticsDevice();
            }
          } else {
            let deviceId = localStorage.getItem("deviceId");
            let deviceAnalyticsCheck = deviceId + userLoggedId;
            service.setCookie("deviceAnalyticsCheck", deviceAnalyticsCheck, 30);
            analyticsDevice();
          }

          setTimeout(function () {
            setIsSuccessVerifyMsg(false);
          }, 5000);

          window.location.href = "/";
        } else if (response.success == false) {
          setMsgErrorVerify("Invalid OTP");
          setIsErrorVerifyMsg(true);
          setTimeout(function () {
            setIsErrorVerifyMsg(false);
          }, 5000);
        }
      });
    }
  };
  const onForgotHandler = (e) => {
    e.preventDefault();
    if (validationForgot()) {
      service.forgotEmail(valuesForgot).then((response) => {
        if (response.success == true) {
          setMsgSucessForgot(
            "Reset Password Link sent to your Email Id (Note:  If you do not find the email in your inbox, please check your spam filter or bulk email folder)"
          );
          setIsSuccessForgotMsg(true);
          setTimeout(function () {
            setIsSuccessForgotMsg(false);
            setIsLogin(true);
            setIsForgot(false);
          }, 5000);
        } else if (response.success == false) {
          setMsgErrorForgot("Email id does't exist.");
          setIsErrorForgotMsg(true);
          setTimeout(function () {
            setIsErrorForgotMsg(false);
          }, 5000);
        }
        // else {
        //     setMsgErrorForgot('Failed please try again.');
        //     setIsErrorForgotMsg(true);
        //     setTimeout(function () {
        //         setIsErrorForgotMsg(false);
        //     }, 5000);
        // }
      });
    }
  };
  const onClickForgot = () => {
    // document.getElementById("signInLink").style = {
    //   display: "block",
    //   "padding-top": "6px",
    // };
    setIsLogin(false);
    setIsForgot(true);
  };
  const onLogout = () => {
    service.logoutAll(userLoggedId).then((response) => {
      if (response.success == true) {
        setIsSuccessLogoutMsg(true);
        setTimeout(function () {
          setIsSuccessLogoutMsg(false);
        }, 5000);
      } else {
        setIsErrorLogout(true);
        setTimeout(function () {
          setIsErrorLogout(false);
        }, 5000);
      }
    });
  };
  window.signInTrigger = () => {
    setIsLogin(true);
    setIsForgot(false);
    // document.getElementById("signInLink").style.display = "none";
  };
  return (
    <div className="pageWrapper">
      <div className="topContainer">
        <div className="signPage menuCloseJS closeMenuWrapper">
          <div className="container">
            <div className="row signWrapper">
              <div className="col col-9 col-lg-6 col-xl-6 col-xxl-4">
                <h3 className="H3">Welcome Back!</h3>
                <div>
                  {/* <div rel="noopener" target="_self">
                    <button className="button buttonLarge buttonBlock registerFacebook">
                      <div className="buttonBg rounderbutton"></div>
                      <FacebookLogin
                        appId="4691963010825217"
                        isMobile={false}
                        fields="name,email,picture,first_name,last_name"
                        callback={responseFacebook}
                        cssClass="button buttonLarge buttonBlock registerFacebook"
                        textButton="Login via Facebook"
                      />
                    </button>
                  </div>
                  <div className="orContainer signOrMargin">
                    <div className="orDivider"></div>
                    <div className="orCircle">
                      <div className="orText">OR</div>
                    </div>
                    <div className="orDivider"></div>
                  </div> */}
                  {isForgot && (
                    <div id="forgotId">
                      <h5 className="H5 signFormHeading">Forgot Password</h5>
                      <form
                        className="signFormWrapper"
                        noValidate
                        onSubmit={onForgotHandler}
                      >
                        {isSuccessForgotMsg && (
                          <p className="_3nmo_success">{msgSuccessForgot}</p>
                        )}
                        {isErrorForgotMsg && (
                          <p className="_3nmo_">{msgErrorForgot}</p>
                        )}
                        <div className={"input" + forgot_email}>
                          <input
                            className="inputText"
                            style={{
                              border: "none",
                              padding: "0px",
                              marginTop: "10px",
                            }}
                            name="forgot_email"
                            type="email"
                            value={valuesForgot.forgot_email}
                            onChange={onChangeHandlerForgot}
                          />
                          <span className="inputLabel">
                            {errorsForgot.forgot_email}
                          </span>
                        </div>
                        <div className="row signSubmitWrapper">
                          <div className="col col-sm-6 col-sm-offset-6">
                            <button
                              className="button buttonLarge buttonBlock"
                              type="submit"
                            >
                              <div className="buttonBg rounderbutton"></div>
                              <div className="buttonContent">Submit</div>
                            </button>
                          </div>
                        </div>
                        <div className="signAgree">
                          <p>
                            {" "}
                            <span>
                              Already have an account?{" "}
                              <span
                                className="linkButton"

                                onClick={() => {
                                  setIsLogin(true);
                                  setIsForgot(false);
                                  document.getElementById(
                                    "signInLink"
                                  ).style.display = "none";
                                }}
                              >
                                Sign In
                              </span>
                            </span>
                            <span>&nbsp;Don't have an account?&nbsp;</span>
                            <Link className="linkButton" to="/register">
                              Sign Up for Free
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  )}

                  {isVerify && (
                    <div id="verifyId">
                      <h5 className="H5 signFormHeading">Email Verification</h5>
                      <form
                        className="signFormWrapper"
                        noValidate
                        onSubmit={onVerifyHandler}
                        autocomplete="off"
                      >
                        {isSuccessVerifyMsg && (
                          <p className="_3nmo_success">{msgSucessVerify}</p>
                        )}
                        {isErrorVerifyMsg && (
                          <p className="_3nmo_">{msgErrorVerify}</p>
                        )}
                        <div className={"input" + verification_code}>
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
                            value={values.verification_code}
                            onChange={onChangeHandlerVerify}
                          />
                          <span className="inputLabel">
                            {errorsVerify.verification_code}
                          </span>
                        </div>

                        <div className="row signSubmitWrapper">
                          <div className="col col-sm-6 col-sm-offset-6">
                            <button
                              className="button buttonLarge buttonBlock"
                              type="submit"
                            >
                              <div className="buttonBg rounderbutton"></div>
                              <div className="buttonContent">Verify</div>
                            </button>
                          </div>
                        </div>
                        <div className="signAgree">
                          <p>
                            <span>
                              Already have an account?{" "}
                              <a className="linkButton" href="/signin" style={{ color: "#fff" }}>
                                Sign In
                              </a>
                            </span>{" "}
                            <Link className="linkButton" to="/register">
                              Sign Up for Free
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  )}

                  {isLogin && (
                    <div id="loginId">
                      <h5 className="H5 signFormHeading">Sign In via Email</h5>

                      <form
                        className="signFormWrapper"
                        noValidate
                        onSubmit={onLoginHandler}
                      >
                        {isSuccessLoginMsg && (
                          <p className="_3nmo_success">{msgSuccessLogin}</p>
                        )}
                        {isErrorLoginMsg && (
                          <p className="_3nmo_">{msgErrorLogin}</p>
                        )}
                        {isSuccessLogoutMsg && (
                          <p className="_3nmo_success">
                            You are successfully logout from all devices
                          </p>
                        )}
                        {isErrorLogoutMsg && (
                          <p className="_3nmo_">
                            Login limit exceed&nbsp;&nbsp;
                            <button
                              id="logoutBtn"
                              onClick={onLogout}
                              className="linkButton button buttonSmall"
                            >
                              <div className="buttonBg rounderbutton"></div>
                              <div className="buttonContent">Logout All</div>
                            </button>
                          </p>
                        )}
                        {isErrorLogout && (
                          <p className="_3nmo_">
                            Something went wrong. Please Try Again
                          </p>
                        )}
                        {isEmailExistMsg && (
                          <p className="_3nmo_">
                            {facebookEmail} already exist, Please sign
                            in&nbsp;&nbsp;
                          </p>
                        )}

                        <div className={"input" + email}>
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
                        </div>
                        <div className={"input" + password}>
                          <input
                            className="inputText"
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
                          <span className="inputLabel">{errors.password}</span>
                        </div>
                        {isDesktop ? (
                          <div className="regnSubmitWrapper">
                            <p
                              style={{
                                paddingTop: "10px",
                                fontSize: "14px",
                                color: "#707c86",
                              }}
                            >
                              <Link className="linkButton" to="/register">
                                Sign Up for Free
                              </Link>
                            </p>
                            <button
                              className="button buttonLarge regnSubmit"
                              type="submit"
                            >
                              <div className="buttonBg rounderbutton"></div>
                              <div className="buttonContent" style={{ color: "#fff" }}>Sign In</div>
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="regnSubmitWrapper">
                              <button
                                className="button buttonLarge regnSubmit"
                                style={{ width: "100vw" }}
                                type="submit"
                              >
                                <div className="buttonBg rounderbutton"></div>
                                <div className="buttonContent" style={{ color: "#fff" }}>Sign In</div>
                              </button>
                            </div>
                            <div className="regnSubmitWrapper">
                              <p
                                style={{
                                  paddingLeft: "20px",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                              >
                                <Link className="linkButton" to="/register">
                                  Sign Up for Free
                                </Link>
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="signAgree">
                          <p>
                            By registering, you agree to Project Forty-Six
                            {/* <Link to="/termsandconditions"> */}
                            <div
                              className="linkButton"
                              onClick={() => {
                                functionOnclick("/termsandconditions");
                              }}
                            // onClick={() => {
                            //   window.open(
                            //     "https://watch.projectfortysix.com/terms/99078"
                            //   );
                            // }}
                            >
                              &nbsp;Terms of Use
                            </div>
                            {/* </Link> */}
                            &nbsp; and
                            {/* <Link to="/privacypolicy"> */}
                            <div
                              className="linkButton"
                              href="#"
                              onClick={() => {
                                functionOnclick("/privacypolicy");
                              }}
                            // onClick={() => {
                            //   window.open(
                            //     "https://watch.projectfortysix.com/privacy/247031"
                            //   );
                            // }}
                            >
                              &nbsp;Privacy Policy
                            </div>
                            {/* </Link> */}
                          </p>
                          <p>
                            <span
                              className="linkButton"
                              onClick={onClickForgot}
                            >
                              Forgot password?
                            </span>
                          </p>
                        </div>
                      </form>
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
};
export default SignIn;
