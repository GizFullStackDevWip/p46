import React, { useState, useEffect, useRef } from "react";
import { service } from "../../network/service";
import { Link, useHistory, Redirect } from "react-router-dom";
import Countdown from "react-countdown";

const Activate = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let userId = service.getCookie("userId");
  const [value, setValue] = useState("");
  const [timeOut, setTimeOut] = useState(false);
  const countDown = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    useEffectFunction();
    const ua = navigator.userAgent;
    console.log('ua',ua);
  }, [useEffectFunction]);

  const useEffectFunction = () => {
    if (isLoggedIn === "true" && userId) {
      countDown.current.getApi().start();
      service.generateTvLink().then((response) => {
        console.log("response", response);
        if (response) {
          setValue(response.code);
        }
      });
    }
  };
  const Completionist = () => (
    <div className="styles-inputBoxContainer">
      <div className="styles-enterCodeWrap">
        <div className="styles-linkTvTitle">Link TV App</div>
        <span className="styles-enterCodetext">
          Enter this code on your Roku TV, Fire TV or Android TV
        </span>
      </div>
      <input
        type="tel"
        id=""
        placeholder=""
        className="styles-input styles-input-p5CThI-I error-notification"
        maxLength="6"
        autoComplete="off"
        disabled
        defaultValue={value}
      />
      <span className="timer">
        Code Expired!
        <div className="styles-buttonWrapper">
          <button
            className="styles-button styles-primaryButton"
            onClick={regenerateCode}
          >
            REGENRATE CODE
          </button>
        </div>
      </span>
    </div>
  );
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div className="styles-inputBoxContainer">
          <div className="styles-enterCodeWrap">
            <div className="styles-linkTvTitle">Link TV App</div>
            <span className="styles-enterCodetext">
              Enter this code on your Roku TV, Fire TV or Android TV
            </span>
          </div>
          <input
            type="tel"
            id=""
            placeholder=""
            className="styles-input styles-input-p5CThI-I"
            maxLength="6"
            autoComplete="off"
            disabled
            defaultValue={value}
          />
          <span className="timer">
            Your code expires on {minutes}:{seconds}
          </span>
        </div>
      );
    }
  };
  const regenerateCode = () => {
    service.generateTvLink().then((response) => {
      if (response) {
        setValue(response.code);
        setTimeOut(false);
        countDown.current.getApi().start();
      }
    });
  };
  if (isLoggedIn === "false" || isLoggedIn === null) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="pageWrapper searchPageMain">
        <div className="topContainer">
          <div className="menuCloseJS closeMenuWrapper">
            <div className="activateContainer">
              <div className="activate-style">
                <div className="styles-box">
                  <Countdown
                    date={Date.now() + 5*6*10000}
                    renderer={renderer}
                    ref={(count) => (countDown.current = count)}
                    autoStart={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Activate;
