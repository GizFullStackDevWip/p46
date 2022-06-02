import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { service } from "../../Network/service";
const Error = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    let fromAndroid = localStorage.getItem("isAndroid");
    if (fromAndroid == "true" || fromAndroid == true) {
      dispatch({ type: "SET_ANDROID" });
    }
  }, []);
  const handleClick = () => {
    let isAndroid = localStorage.getItem("isAndroid");
    if (isAndroid == "true") {
      window.location.href = process.env.REACT_APP_WEB_VIEW_FAILED; // android error redirect
    } else {
      history.push({
        pathname: "/home",
      });
    }

    // error redirect
  };
  return (
    <div className="pageWrapper searchPageMain marginAdjust">
      <div className="topContainer" style={{ minHeight: "71vh" }}>
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          <div className="container" style={{ marginTop: "90px" }}>
            <div
              className="card"
              style={{
                // width: "fit-content",
                border: "none",
                boxShadow: "none",
              }}
            >
              <div className="mycontainer">
                <div className="modal-dialog modal-confirm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div
                        className="icon-box"
                        style={{ backgroundColor: "#f2110f" }}
                      >
                        <i className="material-icons" style={{ top: "-5px" }}>
                          &#10005;
                        </i>
                      </div>
                      <h4 className="modal-title w-100">Error!</h4>
                    </div>
                    <div className="modal-body">
                      <p className="text-center">
                        Your payment has been failed. Please try again..
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="myBtn btn-success btn-block"
                        onClick={handleClick}
                        data-dismiss="modal"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Error;
