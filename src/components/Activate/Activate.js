import React, { useState, useEffect, useRef } from "react";
import { service } from "./service";
import { Link, useHistory, Redirect } from "react-router-dom";
import Countdown from "react-countdown";
import "./activate.css";

const Activate = () => {
  const history = useHistory();
  let isLoggedIn = service.getCookie("isLoggedIn");
  const [value, setValue] = useState("");
  const [timeOut, setTimeOut] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const countDown = useRef();

  useEffect(() => {
    document.getElementById("scroll-top").scroll(0, 0);
    if (isLoggedIn === "true") {
      console.log("hihsidhasih");
      sessionStorage.removeItem("tvActivateFlag");
      countDown.current.getApi().start();
      service.generateTvLink().then((response) => {
        if (response === false) {
          setTimeout(() => {
            history.push("/signIn");
          }, 3000);

          setTimeOut({}, 3000);
          setInvalid(true);
        } else {
          setValue(response.code);
        }
      });
    }
  }, []);

  const InvalidMessage = () => {
    return (
      <div className="styles-inputBoxContainer">
        <div className="styles-enterCodeWrap">
          <span className="styles-enterCodetext">
            No TV Subscription Found!
          </span>
        </div>
      </div>
    );
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
  if (isLoggedIn == "false" || isLoggedIn === null || isLoggedIn === "") {
    sessionStorage.setItem("tvActivateFlag", true);
    return <Redirect to="/signin" />;
  } else {
    return (
      <>
        <div className="pageWrapper" id="scroll-top" style={{background: 'rgb(26 28 33)'}}>
          <div className="topContainer">
            <div className="menuCloseJS closeMenuWrapper">
              <div className="activateContainer">
                <div className="activate-style">
                  <div className="styles-box">
                    {invalid === true ? (
                      <InvalidMessage />
                    ) : (
                      <Countdown
                        date={Date.now() + 5 * 6 * 10000}
                        renderer={renderer}
                        ref={(count) => (countDown.current = count)}
                        autoStart={false}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Activate;
