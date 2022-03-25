import React, { useState, useEffect } from "react";
import { service } from "./service";
import { useHistory } from "react-router-dom";
import "./normalize.css";
import "./billing-activity.css";
import Expired from "../../images/expired.jpg";
import { useDispatch } from "react-redux";

const BilingActivity = () => {
  let urlParams = new URLSearchParams(window.location.search);
  const history = useHistory();
  const [lastResponse, setLastResponse] = useState([]);
  const [historyResponse, setHistoryResponse] = useState([]);
  const [validTo, setValidTo] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  let path = window.location.pathname;
  path = path.length == 1 ? "/home" : path;
  const dispatch = useDispatch();

  useEffect(() => {
    // document.getElementById("scroll-top").scroll(0, 0);
    let androidToken = urlParams.get("antkn");

    if (androidToken) {
      dispatch({ type: "SET_ANDROID" });
      service.androidTokeDecode(androidToken).then((response) => {
        if (response.success == true) {
          localStorage.setItem("access-token", androidToken);
          service.setCookie("userId", response.data[0].user_id, 15);
          localStorage.setItem("userName", response.data[0].first_name);
          localStorage.setItem("isAndroid", "true");
          service.setCookie("isLoggedIn", "true", 15);
          localStorage.setItem("isLoggedIn", true);
          service.bilingDetails().then((response) => {
            if (response.success === true) {
              setLastResponse(response.last_purchase);
              setIsExpired(response.last_purchase.plan_expired);
              var date = new Date(response.last_purchase.valid_to);
              var nextday = new Date(response.last_purchase.valid_to);
              nextday.setDate(date.getDate() + 1);
              setValidTo(nextday.toDateString());
              setHistoryResponse(response.purchase_history);
            }
          });
        }
      });
    } else {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn == true || isLoggedIn == "true") {
        service.bilingDetails().then((response) => {
          if (response.success === true) {
            setLastResponse(response.last_purchase);
            setIsExpired(response.last_purchase.plan_expired);
            var date = new Date(response.last_purchase.valid_to);
            var nextday = new Date(response.last_purchase.valid_to);
            nextday.setDate(date.getDate() + 1);
            setValidTo(nextday.toDateString());
            setHistoryResponse(response.purchase_history);
          }
        });
      } else {
        history.push("/home");
      }
    }
  }, []);
  const onBack = (e) => {
    const isAndroid = localStorage.getItem("isAndroid");
    if (isAndroid == "true" || isAndroid == true) {
      window.location.href =
        "https://gethappi.tv/billingDetailsBack";
    } else {
      history.push("/account");
    }
  };
  return (
    <>
      <div className="netflix-sans-font-loaded">
        <div lang="en-IN" className="accountLayout" dir="ltr">
          <div className="billing_main_div">
            <div className="bdetails">
              <div
                style={{ minHeight: "300px", paddingTop: "5rem" }}
                className="responsive-account-container"
              >
                <div data-uia="billing-details-body">
                  <h1 style={{ color: "black", margin: '0px' }}>Billing Details</h1>
                  <section
                    data-uia="streaming-section "
                    className="billingSummarySection"
                  >
                    <h2
                      data-uia="streaming-section-header"
                      className="billingTitle" style={{padding: '0px', marginTop: '0px'}}
                    >
                      YOUR MEMBERSHIP
                    </h2>
                    <div className="billingSummaryContents">
                      <div id="detailsId">
                        <label className="billingSummaryLabel">Your plan</label>
                        <b style={{ color: "black" }} id="planId">
                          {lastResponse.plan}
                        </b>
                        {isExpired == true || isExpired == "true" ? (
                          <img
                            className="expireImage"
                            style={{ display: "block" }}
                            src={Expired}
                          />
                        ) : null}
                        {(lastResponse.subscription_type == 3 ||
                          lastResponse.subscription_type == 4) &&
                          lastResponse.transaction_type == "NEW" && (
                            <div>
                              <label className="billingSummaryLabel billingSummarySpace">
                                Your next bill
                              </label>
                              <div
                                style={{ color: "white" }}
                                className=""
                                data-uia="streaming-next-cycle"
                                id="startDate"
                              >
                                {validTo}
                              </div>
                            </div>
                          )}
                        <div data-uia="plan-credit-message"></div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="billingSectionSpace responsive-account-container">
                <h3 style={{ color: "black", fontSize: '25px', paddingBottom: '0px' }}>Subscription Details</h3>
                <ul
                  className="retable-flex"
                  id="subscriptionTable"
                >
                  <li className="retableHeading">
                    <div style={{ fontSize: "16px" }} className="col billDate">
                      Date
                    </div>
                    <div
                      style={{ fontSize: "16px" }}
                      className="col billEvent nowrap"
                    >
                      Transaction type
                    </div>
                    <div
                      style={{ fontSize: "16px" }}
                      className="col billPeriod nowrap"
                    >
                      Service period
                    </div>
                    <div
                      style={{ fontSize: "16px" }}
                      className="col billMethod nowrap"
                    >
                      Payment method
                    </div>
                    <div
                      style={{ fontSize: "16px" }}
                      className="col billMethod nowrap"
                    >
                      Subscription name
                    </div>
                    <div style={{ fontSize: "16px" }} className="col billTotal">
                      Total
                    </div>
                  </li>
                  {historyResponse.map((e) => (
                    <li className="retableRow">
                      <div style={{ color: "black" }} className="col billDate">
                        {e.date}
                      </div>
                      <div
                        style={{ color: "black" }}
                        className="col billEvent nowrap"
                      >
                        {e.transaction_type}
                      </div>
                      <div
                        style={{ color: "black" }}
                        className="col billPeriod nowrap"
                      >
                        {e.service_period}
                      </div>
                      <div
                        style={{ color: "black" }}
                        className="col billMethod nowrap"
                      >
                        {e.mode_of_payment}
                      </div>
                      <div
                        title={e.subscription_name}
                        style={{ color: "black", overflow: "hidden" }}
                        className="col billMethod nowrap"
                      >
                        {e.subscription_name != null &&
                        e.subscription_name.length > 23
                          ? e.subscription_name.substring(0, 23) + "..."
                          : e.subscription_name}
                      </div>
                      <div style={{ color: "black" }} className="col billTotal">
                        {e.total}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="billingNotes">
                  NOTE: We only show up to last 7 billing history
                </p>
                {isExpired == true || isExpired == "true" ? (
                  <div className="button-for-expired-user">
                    <button
                      id="btn-cancel"
                      type="button"
                      autoComplete="off"
                      className="cancelButton"
                      data-uia="action_cancel-change-password"
                      style={{ marginBottom: "40px" }}
                      onClick={(e) => {
                        const isAndroid = localStorage.getItem("isAndroid");
                        if (isAndroid == "true" || isAndroid == true) {
                          window.location.href =
                            "https://gethappi.tv/supportemail";
                        } else {
                          window.open("mailto:support@gethappi.tv");
                        }
                      }}
                    >
                      Support
                    </button>
                    <button
                      id="btn-cancel"
                      type="button"
                      autoComplete="off"
                      className="cancelButton"
                      onClick={(e) => {
                        const isAndroid = localStorage.getItem("isAndroid");
                        if (isAndroid == "true" || isAndroid == true) {
                          window.location.href =
                            "https://gethappi.tv/tohome";
                        } else {
                          history.push("/home");
                        }
                      }}
                      data-uia="action_cancel-change-password"
                      style={{
                        marginBottom: "40px",
                        backgroundImage:
                          "linear-gradient(to bottom, #ea0a0a, #630100)",
                      }}
                    >
                      Home
                    </button>
                  </div>
                ) : (
                  <div className="button-for-expired-user">
                    <button
                      id="btn-cancel"
                      type="button"
                      autoComplete="off"
                      className="cancelButton"
                      onClick={onBack}
                      data-uia="action_cancel-change-password"
                      style={{ marginBottom: "40px" }}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BilingActivity;
