import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { service } from "../../network/service";
import { useDispatch } from "react-redux";
const Success = () => {
  const history = useHistory();
  const [isSucess, setIsSucces] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState([]);
  const [fromVP, setFromVP] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let prevurl = localStorage.getItem("fromVideoplayer");
    if (prevurl == "true") {
      console.log("testing success (prevurl == true)");
      const vshowId = service.getCookie("showId");
      if (vshowId) {
        history.push({
          pathname: "/home/movies",
          search: encodeURI(`show_id=${vshowId}`),
        });
      } else {
        history.push({
          pathname: "/home",
        });
      }
    } else {
      setFromVP(true);
    }

    let isAndroid = localStorage.getItem("isAndroid");
    if (isAndroid == "true" || isAndroid == true) {
      dispatch({ type: "SET_ANDROID" });
    }
    var urlParams = new URLSearchParams(window.location.search);
    var sessionId = urlParams.get("session_id");
    // let paypalData = urlParams.get("amt");  // live
    let paypalData = urlParams.get("token")
      ? urlParams.get("token") // sandbox
      : urlParams.get("amt"); // live
    if (sessionId) {
      service.stripeDecode(sessionId).then((response) => {
        if (response.success != false) {
          let subscription = response.data.subscription;
          service
            .paymentUpdate(subscription, "stripe", "success")
            .then((response) => {
              if (response.status == 200) {
                let isAndroid = localStorage.getItem("isAndroid");
                if (isAndroid == "true") {
                  window.location.href = process.env.REACT_APP_WEB_VIEW_SUCCESS;  // android success redirect
                } else {
                  setIsLoading(false);
                  setIsSucces(true);
                }
              } else {
                service
                  .paymentUpdate(subscription, "stripe", "failed")
                  .then((response) => {
                    if (response.status == 201) {
                      let isAndroid = localStorage.getItem("isAndroid");
                      if (isAndroid == "true") {
                        window.location.href = process.env.REACT_APP_WEB_VIEW_SUCCESS;
                      } else {
                        setIsLoading(false);
                        setIsSucces(true);
                      }
                    } else if (response.status == 200) {
                      let isAndroid = localStorage.getItem("isAndroid");
                      if (isAndroid == "true") {
                        window.location.href = process.env.REACT_APP_WEB_VIEW_FAILED; // android error redirect
                      } else {
                        history.push("/error");
                      }
                    }
                  });
              }
            });
        } else {
          let isAndroid = localStorage.getItem("isAndroid");
          if (isAndroid == "true") {
            window.location.href = process.env.REACT_APP_WEB_VIEW_FAILED; // android error redirect
          } else {
            history.push("/error");
          }
        }
      });
    } else if (paypalData) {
      let subID = localStorage.getItem("selectedSubId");
      var myInterval = setInterval(async () => {
        const result = await service
          .paypalSubscription(subID)
          .then((response) => {
            if (response.status == 201) {
              clearInterval(myInterval);
              let isAndroid = localStorage.getItem("isAndroid");
              if (isAndroid == "true") {
                window.location.href = process.env.REACT_APP_WEB_VIEW_SUCCESS;// android succes redirect
              } else {
                setIsLoading(false);
                setIsSucces(true);
              }
            }
          });
      }, 10 * 1000);
    }
  }, []);
  const handleClick = () => {
    debugger;
    let showId = service.getCookie("showId");
    let videoId = service.getCookie("videoId");
    let videoDetails;
    console.clear();
    console.log("showId  videoId", showId, videoId);
    if (showId && videoId) {
      console.log("in if condition");
      service.getVideoDetails(videoId).then((response) => {
        console.log("getVideoDetails resp", response);
        if (response.success == true && response.data) {
          videoDetails = response.data;
          console.log("in if condition video", videoDetails);
          history.push({
            pathname: "/videoplayer",
            state: {
              show_details: videoDetails,
              singleVideo: 0,
              showId: showId,
            },
          });
        } else {
          console.log("getVideoDetails response.success ==> false");
          history.replace({
            pathname: "/home",
          });
        }
      });
    } else if (showId) {
      console.log("in else if condition");
      history.replace({
        pathname: "/home/movies",
        search: encodeURI(`show_id=${showId}`),
      });
    } else {
      console.log("in else condition");
      history.replace({
        pathname: "/home",
      });
    }
  };
  return (
    <div className="pageWrapper searchPageMain marginAdjust">
      {fromVP == true ? (
        <div className="topContainer" style={{ minHeight: "71vh" }}>
          <div className="homepageWrapper menuCloseJS closeMenuWrapper">
            <div className="container" style={{ marginTop: "170px" }}>
              <div
                className="card"
                style={{
                  width: "fit-content",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {isLoading && (
                  <div className="mycontainer">
                    <div
                      className="modal-dialog modal-confirm"
                      style={{ marginTop: "0" }}
                    >
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="d-flex align-items-center">
                            <strong>
                              Your payment will be updated soon....{" "}
                            </strong>
                            <div
                              className="spinner-border ml-auto"
                              role="status"
                              aria-hidden="true"
                              style={{ color: "#219cb2" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {isSucess && (
                  <div className="mycontainer">
                    <div className="modal-dialog modal-confirm">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="icon-box">
                            <i className="material-icons">&#xE876;</i>
                          </div>
                          <h4 className="modal-title w-100">Success!</h4>
                        </div>
                        <div className="modal-body">
                          <p className="text-center">
                            Your payment has been confirmed. Enjoy the videos.
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="myBtn1 btn-success btn-block"
                            onClick={handleClick}
                            data-dismiss="modal"
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Success;
