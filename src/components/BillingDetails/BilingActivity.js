import React, { useState, useEffect } from "react";
import { service } from "./service";
import { useHistory } from "react-router-dom";
import "./normalize.css";
import "./billing-activity.css";

const BilingActivity = () => {
  const history = useHistory();
  const [lastResponse, setLastResponse] = useState([]);
  const [historyResponse, setHistoryResponse] = useState([]);
  const [validTo, setValidTo] = useState("");
  let path = window.location.pathname;
  path = path.length == 1 ? "/home" : path;
  useEffect(() => {
    service.bilingDetails().then((response) => {
      if (response.success === true) {
        setLastResponse(response.last_purchase);
        var date = new Date(response.last_purchase.valid_to);
        var nextday = new Date(response.last_purchase.valid_to);
        nextday.setDate(date.getDate() + 1);
        setValidTo(nextday.toDateString());
        setHistoryResponse(response.purchase_history);
      }
    });
  }, []);
  const onBack = (e) => {
    history.push("/account");
  };
  return (
    <>
      <div
        className="netflix-sans-font-loaded searchPageMain"
        style={{ paddingTop: "115px", paddingBottom: "1px" }}
      >
        <div lang="en-IN" className="accountLayout" dir="ltr">
          <div>
            <div className="bd">
              <div
                style={{ minHeight: "300px" }}
                className="responsive-account-container"
              >
                <div data-uia="billing-details-body">
                  <h1 style={{ color: "#fff" }}>Billing Details</h1>
                  <section
                    data-uia="streaming-section "
                    className="billingSummarySection"
                  >
                    <p className="billingTitle">YOUR MEMBERSHIP</p>
                    <div className="billingSummaryContents">
                      <div id="detailsId">
                        <label className="billingSummaryLabel">Your plan</label>
                        <b style={{ color: "white" }} id="planId">
                          {lastResponse.plan}
                        </b>

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
              <div
                className="billingSectionSpace responsive-account-container"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <h6 style={{ color: "white" }}>Subscription Details</h6>
                <ul
                  style={{ margin: "20px" }}
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
                    <li className="retableHeading">
                      <div style={{ color: "white" }} className="col billDate">
                        {e.date}
                      </div>
                      <div
                        style={{ color: "white" }}
                        className="col billEvent nowrap"
                      >
                        {e.transaction_type}
                      </div>
                      <div
                        style={{ color: "white" }}
                        className="col billPeriod nowrap"
                      >
                        {e.service_period}
                      </div>
                      <div
                        style={{ color: "white" }}
                        className="col billMethod nowrap"
                      >
                        {e.mode_of_payment}
                      </div>
                      <div
                        title={e.subscription_name}
                        style={{ color: "white", overflow: "hidden" }}
                        className="col billMethod nowrap"
                      >
                        {e.subscription_name != null &&
                        e.subscription_name.length > 23
                          ? e.subscription_name.substring(0, 23) + "..."
                          : e.subscription_name}
                      </div>
                      <div style={{ color: "white" }} className="col billTotal">
                        {e.total}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="billingNotes">
                  NOTE: We only show up to last 7 billing history
                </p>

                <button
                  id="btn-cancel"
                  type="button"
                  autoComplete="off"
                  className="cancelButton"
                  onClick={onBack}
                  // className="nf-btn nf-btn-secondary nf-btn-retro nf-btn-small"
                  data-uia="action_cancel-change-password"
                >
                  Back
                </button>
              </div>
              {/* <div className="billingSectionSpace"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BilingActivity;
