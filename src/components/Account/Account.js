import React, { useState, useEffect } from "react";
import { service } from "./service";
import "./normalize.css";
import "./main.css";
import { getDeviceType } from "../../Utils/utils";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Account = () => {
  const [email, setEmail] = useState("");
  const [subscriptionName, setSubscriptionName] = useState("");
  const [subId, setsubId] = useState();
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [haveSubscription, setHaveSubscription] = useState(false);
  const [havePayment, setHavePayment] = useState(false);
  const [cancelButton, setCancelButton] = useState({
    name: "cancelMembership",
    value: "Cancel Membership",
  });
  const [showMsg, setShowMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    service.getAccountDetails().then((response) => {
      if (response.success == true) {
        if (response.data.subscription_type != null) {
          setHavePayment(true);
        }
        setIsSocialLogin(response.data.is_social_login);
        if (
          response.data.subscription_type == 3 ||
          response.data.subscription_type == 4
        ) {
          setHaveSubscription(true);
          if (response.data.cancel_status == true) {
            setCancelButton({
              name: "cancelledMembership",
              value: "Cancelled Membership",
            });
          } else {
            setsubId(response.data.sub_id);
          }
        }
        setEmail(response.data.user_email);
        response.data.subscription_name != null
          ? setSubscriptionName(response.data.subscription_name)
          : setSubscriptionName("");
      }
    });
  }, []);

  const onClickHandler = () => {
    ;
    service.unsubscribe(subId).then((response) => {
      if (response.success == true) {
        setCancelButton({
          name: "cancelledMembership",
          value: "Cancelled Membership",
        });
        setShowMsg(true);
        setResponseMsg(response.message);
        setTimeout(() => {
          setShowMsg(false);
        }, 3000);
      } else {
        setShowErrorMsg(true);
        setResponseMsg(response.message);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 3000);
      }
    });
  };

  const submit = () => {
    confirmAlert({
      title: "Confirm Cancellation",
      message: "Are you sure you want to cancel subscription?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onClickHandler();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <div
        id="appMountPoint"
        className="searchPageMain"
        style={{ paddingTop: "115px", paddingBottom: "10px" }}
      >
        <div className="netflix-sans-font-loaded">
          <div lang="en-IN" className="accountLayout" dir="ltr">
            <div className="bd">
              <div className="responsive-account-container">
                <div>
                  {showMsg == true ? (
                    <div
                      className="row d-flex justify-content-center"
                      style={{ margin: "30px" }}
                    >
                      <div
                        className="alert alert-success col-md-8"
                        role="alert"
                      >
                        <h4 className="alert-heading">Success</h4>
                        <p>{responseMsg}</p>
                      </div>
                    </div>
                  ) : null}
                  {showErrorMsg == true ? (
                    <div
                      className="row d-flex justify-content-center"
                      style={{ margin: "30px" }}
                    >
                      <div className="alert alert-danger col-md-8" role="alert">
                        <h4 className="alert-heading">Error</h4>
                        <p>{responseMsg}</p>
                      </div>
                    </div>
                  ) : null}
                  <h1 style={{ color: "#fff" }} className="account-header">
                    Account
                  </h1>
                  <div className="account-messages-container"></div>

                  <div
                    className="responsive-account-content"
                    data-uia="account-content"
                  >
                    <div
                      className={
                        getDeviceType() != "mobile"
                          ? "account-section collapsable-panel clearfix membership-section-wrapper membership-section-with-button"
                          : "account-section collapsable-panel clearfix membership-section-wrapper"
                      }
                      data-uia="membership-section"
                    >
                      <header className="account-section-header collapsable-section-toggle">
                        <h2 className="account-section-heading">
                          MEMBERSHIP &amp; BILLING {/* Button */}
                        </h2>
                      </header>
                      <section className="collapsable-section-content account-section-content">
                        <div className="account-subsection clearfix">
                          <div className="clearfix">
                            <div className="account-section-group">
                              <div
                                data-uia="account-email"
                                id="emailId"
                                className="account-section-item account-section-email"
                              >
                                {email}
                              </div>
                              <div
                                data-uia="account-password"
                                className="account-section-item account-section-item-disabled"
                              >
                                Password: ********
                              </div>
                              {/* <div
                                data-uia="account-phone"
                                className="account-section-item account-section-item-disabled"
                              >
                                Phone: {phone} <span id="phoneId"></span>
                              </div> */}
                            </div>
                            {!isSocialLogin && (
                              <div className="account-section-group">
                                <div className="account-section-item">
                                  <a
                                    data-uia="account-password-link"
                                    className="account-section-link"
                                    href="/changePassword"
                                  >
                                    <strong>Change password</strong>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* billing details */}
                      </section>
                    </div>
                    {havePayment ? (
                      <div
                        className="account-section collapsable-panel clearfix account-section-with-uou-trial"
                        data-uia="plan-section"
                      >
                        <header className="account-section-header collapsable-section-toggle">
                          <h2 className="account-section-heading">
                            PLAN DETAILS
                            {haveSubscription && (
                              <button
                                type="button"
                                className="subscribe-btn"
                                style={{ cursor: "pointer", margin: "20px" }}
                                name={cancelButton.name}
                                onClick={() => {
                                  if (cancelButton.name == "cancelMembership") {
                                    submit();
                                  }
                                }}
                              >
                                {cancelButton.value}
                              </button>
                            )}
                          </h2>
                        </header>
                        <section className="collapsable-section-content account-section-content">
                          {haveSubscription && (
                            <div className="account-subsection clearfix">
                              <div className="clearfix">
                                <div className="account-section-group">
                                  <div
                                    className="account-section-item"
                                    data-uia="plan-label"
                                  >
                                    <b style={{ color: "#fff" }}>
                                      {subscriptionName}
                                    </b>
                                  </div>
                                </div>
                                <div className="account-section-group"></div>
                              </div>
                            </div>
                          )}
                          <div
                            className={
                              getDeviceType() != "mobile"
                                ? "account-subsection clearfix"
                                : "account-subsection clearfix accountLineHide"
                            }
                          >
                            <div>
                              <div className="clearfix">
                                <div className="account-section-group -wide">
                                  <div
                                    className="account-section-item"
                                    data-uia="payment-subsection-top-content"
                                  >
                                    <div
                                      className="payment-type"
                                      data-uia="payment-type"
                                    >
                                      <span
                                        id=""
                                        className="mopType"
                                        data-uia="mopType"
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="account-section-group -thin">
                                  <div className="account-section-item">
                                    <a
                                      className="account-section-link"
                                      data-uia="action-billing-details"
                                      href="/bilingActivity"
                                    >
                                      <strong>Billing details</strong>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    ) : null}
                    <div
                      className="account-section collapsable-panel clearfix"
                      style={{ marginTop: "10px" }}
                      data-uia="settings-section"
                    >
                      <header className="account-section-header collapsable-section-toggle">
                        <h2 className="account-section-heading">SETTINGS</h2>
                      </header>
                      <section className="collapsable-section-content account-section-content">
                        <div className="account-subsection clearfix">
                          <div className="clearfix">
                            <div className="account-section-group">
                              <div>
                                <div className="account-section-item">
                                  <a
                                    className="account-section-link"
                                    data-uia="action-account-access"
                                    href="/manageDevice"
                                  >
                                    <strong>
                                      Recent device streaming activity
                                    </strong>
                                  </a>
                                </div>
                                <div className="account-section-item">
                                  <a
                                    className="account-section-link"
                                    href="/signout"
                                    data-uia="action-sign-out-all-devices"
                                  >
                                    <strong>Sign out of all devices</strong>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="account-section-group left-align"></div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Account;
