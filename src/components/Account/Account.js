// import React, { useState, useEffect } from "react";
// import { service } from "./service";
// import "./normalize.css";
// import "./main.css";
// import { getDeviceType } from "../../Utils/utils";
// import { clippingParents } from "@popperjs/core";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css


// const Account = () => {
//   const [email, setEmail] = useState("");
//   const [subscriptionName, setSubscriptionName] = useState("");
//   const [subId, setsubId] = useState();
//   const [isSocialLogin, setIsSocialLogin] = useState(false);
//   const [haveSubscription, setHaveSubscription] = useState(false);
//   const [havePayment, setHavePayment] = useState(false);
//   const [cancelButton, setCancelButton] = useState({
//     name: "cancelMembership",
//     value: "Cancel Membership",
//   });
//   const [showMsg, setShowMsg] = useState(false);
//   const [showErrorMsg, setShowErrorMsg] = useState(false);
//   const [responseMsg, setResponseMsg] = useState("");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     document.getElementById("root").scrollTo(0, 0);
//     service.getAccountDetails().then((response) => {
//       if (response.data.subscription_type != null) {
//         setHavePayment(true);
//       }
//       setIsSocialLogin(response.data.is_social_login);
//       if (
//         response.data.subscription_type == 3 ||
//         response.data.subscription_type == 4
//       ) {
//         setHaveSubscription(true);
//         if (response.data.cancel_status == true) {
//           setCancelButton({
//             name: "cancelledMembership",
//             value: "Cancel Membership",
//           });
//         } else {
//           setsubId(response.data.sub_id);
//         }
//       }
//       setEmail(response.data.user_email);
//       response.data.subscription_name != null
//         ? setSubscriptionName(response.data.subscription_name)
//         : setSubscriptionName("");
//     });
//   }, []);

//   const onClickHandler = (e) => {
//     const { name } = e.target;
//     const value = cancelButton.value;
//     if (name == "cancelMembership") {
//       service.unsubscribe(subId).then((response) => {
//         if (response.success == true) {
//           setCancelButton({
//             name: "cancelledMembership",
//             value: "Cancel Membership",
//           });
//           setShowMsg(true);
//           setResponseMsg(response.message);
//           setTimeout(() => {
//             setShowMsg(false);
//           }, 3000);
//         } else {
//           setShowErrorMsg(true);
//           setResponseMsg(response.message);
//           setTimeout(() => {
//             setShowErrorMsg(false);
//           }, 3000);
//         }
//       });
//     }
//   };

//   return (
//     <>
//       <div
//         id="appMountPoint"
//         className="searchPageMain"
//         style={{ paddingTop: "60px", paddingBottom: "1px",backgroundColor: "#e6e6e3fa" }}
//       >
//         <div className="netflix-sans-font-loaded">
//           <div lang="en-IN" className="accountLayout" dir="ltr">
//             <div className="bd">
//               <div className="responsive-account-container">
//                 <div>
//                   {showMsg == true ? (
//                     <div
//                       className="row d-flex justify-content-center"
//                       style={{ margin: "30px" }}
//                     >
//                       <div
//                         className="alert alert-success col-md-8"
//                         role="alert"
//                       >
//                         <h4 className="alert-heading">Success</h4>
//                         <p>{responseMsg}</p>
//                       </div>
//                     </div>
//                   ) : null}
//                   {showErrorMsg == true ? (
//                     <div
//                       className="row d-flex justify-content-center"
//                       style={{ margin: "30px" }}
//                     >
//                       <div className="alert alert-danger col-md-8" role="alert">
//                         <h4 className="alert-heading">Error</h4>
//                         <p>{responseMsg}</p>
//                       </div>
//                     </div>
//                   ) : null}
//                   <h1 style={{ color: "black" }} className="account-header">
//                     Account
//                   </h1>
//                   <div className="account-messages-container"></div>
//                   <div
//                     className="responsive-account-content"
//                     data-uia="account-content"
//                   >
//                     <div
//                       className={
//                         getDeviceType() != "mobile"
//                           ? "account-section collapsable-panel clearfix membership-section-wrapper membership-section-with-button"
//                           : "account-section collapsable-panel clearfix membership-section-wrapper"
//                       }
//                       data-uia="membership-section"
//                     >
//                       <header className="account-section-header collapsable-section-toggle">
//                         <h2 className="account-section-heading">
//                           MEMBERSHIP &amp; BILLING {/* Button */}
//                         </h2>
//                       </header>
//                       <section className="collapsable-section-content account-section-content">
//                         <div className="account-subsection clearfix">
//                           <div className="clearfix">
//                             <div className="account-section-group">
//                               <div
//                                 data-uia="account-email"
//                                 id="emailId"
//                                 className="account-section-item account-section-email"
//                               >
//                                 {email}
//                               </div>
//                               <div
//                                 data-uia="account-password"
//                                 className="account-section-item account-section-item-disabled"
//                               >
//                                 Password: ********
//                               </div>
//                             </div>
//                             {!isSocialLogin && (
//                               <div className="account-section-group">
//                                 <div className="account-section-item">
//                                   <a
//                                     data-uia="account-password-link"
//                                     className="account-section-link"
//                                     href="/changePassword"
//                                   >
//                                     <strong>Change password</strong>
//                                   </a>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </section>
//                     </div>
//                     {havePayment ? (
//                       <div
//                         className="account-section collapsable-panel clearfix account-section-with-uou-trial"
//                         data-uia="plan-section"
//                       >
//                         <header className="account-section-header collapsable-section-toggle">
//                           <h2 className="account-section-heading plan-details-section">
//                             PLAN DETAILS
//                             {haveSubscription && (
//                               <button
//                                 type="button"
//                                 className="subscribe-btn"
//                                 style={{ cursor: "pointer", margin: "0" }}
//                                 name={cancelButton.name}
//                                 onClick={onClickHandler}
//                               >
//                                 {cancelButton.value}
//                               </button>
//                             )}
//                           </h2>
//                         </header>
//                         <section className="collapsable-section-content account-section-content">
                         
//                           <div className="account-subsection clearfix">
//                             <div className="clearfix">
//                               <div className="account-section-group">
//                                 <div
//                                   className="account-section-item"
//                                   data-uia="plan-label"
//                                 >
//                                   <b style={{ color: "black" }}>
//                                     {subscriptionName}
//                                   </b>
//                                 </div>
//                               </div>
//                               <div className="account-section-group"></div>
//                             </div>
//                           </div>
//                           <div
//                             className={
//                               getDeviceType() != "mobile"
//                                 ? "account-subsection clearfix"
//                                 : "account-subsection clearfix accountLineHide"
//                             }
//                           >
//                             <div>
//                               <div className="clearfix">
//                                 <div className="account-section-group -wide">
//                                   <div
//                                     className="account-section-item"
//                                     data-uia="payment-subsection-top-content"
//                                   >
//                                     <div
//                                       className="payment-type"
//                                       data-uia="payment-type"
//                                     >
//                                       <span
//                                         id=""
//                                         className="mopType"
//                                         data-uia="mopType"
//                                       ></span>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="account-section-group -thin">
//                                   <div className="account-section-item">
//                                     <a
//                                       className="account-section-link"
//                                       data-uia="action-billing-details"
//                                       href="/bilingActivity"
//                                     >
//                                       <strong>Billing details</strong>
//                                     </a>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </section>
//                       </div>
//                     ) : null}
//                     <div
//                       className="account-section collapsable-panel clearfix"
//                       style={{ marginTop: "25px" }}
//                       data-uia="settings-section"
//                     >
//                       <header className="account-section-header collapsable-section-toggle">
//                         <h2 className="account-section-heading">SETTINGS</h2>
//                       </header>
//                       <section className="collapsable-section-content account-section-content">
//                         <div className="account-subsection clearfix">
//                           <div className="clearfix">
//                             <div className="account-section-group">
//                               <div>
//                                 <div className="account-section-item">
//                                   <a
//                                     className="account-section-link"
//                                     data-uia="action-account-access"
//                                     href="/manageDevice"
//                                   >
//                                     <strong>
//                                       Recent device streaming activity
//                                     </strong>
//                                   </a>
//                                 </div>
//                                 <div className="account-section-item">
//                                   <a
//                                     className="account-section-link"
//                                     href="/signout"
//                                     data-uia="action-sign-out-all-devices"
//                                   >
//                                     <strong>Sign out of all devices</strong>
//                                   </a>
//                                 </div>
                                
//                               </div>
//                             </div>
//                             <div className="account-section-group left-align"></div>
//                           </div>
//                         </div>
//                       </section>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Account;


import React, { useState, useEffect } from "react";
import { service } from "./service";
import "./normalize.css";
import "./main.css";
import { getDeviceType } from "../../Utils/utils";
import { clippingParents } from "@popperjs/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Account = () => {
  const [email, setEmail] = useState("");
  const [subscriptionName, setSubscriptionName] = useState("");
  const [subId, setsubId] = useState();
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [haveSubscription, setHaveSubscription] = useState(false);
  const [havePayment, setHavePayment] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    phoneNumber: "",
    code: "",
  });
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState({
    phoneNumber: "",
    code: "",
  });

  const [cancelButton, setCancelButton] = useState({
    name: "cancelMembership",
    value: "Cancel Membership",
  });
  const [showMsg, setShowMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [prevNumber, setPrevNumber] = useState({
    phoneNumber: "",
    code: "",
  });

  useEffect(() => {
    // document.getElementById("scroll-top").scroll(0, 0);
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
        if (
          (response.data.phone != null || response.data.phone != "") &&
          response.data.c_code != null
        ) {
          setPhoneNumber({
            ...phoneNumber,
            phoneNumber: response.data.c_code + response.data.phone,
            code: response.data.c_code,
          });
          setIsPhoneNumber(true);
        }
        setNewsletterSubscribed(response.data.newsletter_subscribed);
        setEmail(response.data.user_email);
        response.data.subscription_name != null
          ? setSubscriptionName(response.data.subscription_name)
          : setSubscriptionName("");
      }
    });
  }, []);

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

  const onClickHandler = () => {
    service.unsubscribe(subId).then((response) => {
      if (response.data.success == true) {
        setCancelButton({
          name: "cancelledMembership",
          value: "Cancelled Membership",
        });
        setShowMsg(true);
        setResponseMsg(response.data.message);
        setTimeout(() => {
          setShowMsg(false);
        }, 3000);
      } else {
        setShowErrorMsg(true);
        setResponseMsg(response.data.message);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 3000);
      }
    });
  };

  const onSubmitNewsletter = (e) => {
    if (newsletterSubscribed == 1) {
      service.NewsLetterAdd(email).then((response) => {
        if (response.success === true) {
          setNewsletterSubscribed(1);
          toast.success("Successfully subscribed", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          setNewsletterSubscribed(newsletterSubscribed);
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
    } else if (newsletterSubscribed == 0) {
      service.NewsLetterRemove(email).then((response) => {
        if (response.success === true) {
          setNewsletterSubscribed(0);
          toast.success("Successfully unsubscribed", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          setNewsletterSubscribed(newsletterSubscribed);
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
    }
  };

  const onChangeHandler = (e) => {
    const checked = e.target.checked == true ? 1 : 0;
    if (checked == 1) {
      setNewsletterSubscribed(1);
    } else if (checked == 0) {
      setNewsletterSubscribed(0);
    }
  };

  const validatePhoneNumber = () => {
    if (
      phoneNumber.phoneNumber == "" ||
      phoneNumber.phoneNumber == phoneNumber.code
    ) {
      toast.error("Please enter the phone number", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    } else if (
      confirmNumber.phoneNumber == "" ||
      confirmNumber.phoneNumber == confirmNumber.code
    ) {
      toast.error("Please enter the confirm phone number", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    } else if (phoneNumber.phoneNumber != confirmNumber.phoneNumber) {
      toast.error("Phone number mismatch", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    } else {
      return true;
    }
  };

  const onSubmitPhoneNumber = () => {
    if (validatePhoneNumber()) {
      let mobileNumber = phoneNumber.phoneNumber.substring(
        phoneNumber.code.length,
        phoneNumber.phoneNumber.length
      );
      service
        .addPhoneNumber(phoneNumber.code, mobileNumber)
        .then((response) => {
          if (response.success == true) {
            setIsPhoneNumber(true);
            setIsEdit(false);
            toast.success("Mobile number added successfully", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            toast.error("Something went wrong. Please try again", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
    }
  };

  const onDeletePhoneNumber = () => {
    service.deletePhoneNumber().then((response) => {
      if (response.success == true) {
        setPhoneNumber({
          ...phoneNumber,
          phoneNumber: "",
          code: "",
        });
        setConfirmNumber({
          ...confirmNumber,
          phoneNumber: "",
          code: "",
        });
        setPrevNumber({
          ...phoneNumber,
          phoneNumber: "",
          code: "",
        });
        setIsPhoneNumber(false);
        toast.success("Mobile number deleted successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Something went wrong. Please try again", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  };
  return (
    <>
      <div
        id="appMountPoint"
        className="searchPageMain accountsettings"
        style={{
          paddingTop: "60px",
          paddingBottom: "1px",
          backgroundColor: "white",
        }}
      >
        <div className="netflix-sans-font-loaded">
          <div lang="en-IN" className="accountLayout" dir="ltr">
            <div className="bdetails">
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
                  <h1 className="account-header">Account</h1>
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
                        <header
                          className="account-section-header collapsable-section-toggle"
                          style={{ zIndex: "1" }}
                        >
                          <h2
                            className="account-section-heading"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            PLAN DETAILS
                            {haveSubscription && (
                              <button
                                type="button"
                                className="subscribe-btn"
                                style={{
                                  cursor: "pointer",
                                  margin: "20px",
                                  marginTop: "1rem",
                                  marginLeft: "0px",
                                }}
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
                                    <b style={{ color: "black" }}>
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
                                {/* <div className="account-section-item">
                                  <a
                                    className="account-section-link"
                                    data-uia="action-account-access"
                                    href="/tv"
                                  >
                                    <strong>TV Activation</strong>
                                  </a>
                                </div> */}
                                <div className="account-section-item">
                                  <a
                                    className="account-section-link"
                                    href="/signout"
                                    data-uia="action-sign-out-all-devices"
                                  >
                                    <strong>Sign out of all devices</strong>
                                  </a>
                                </div>
                                {/* <div className="checkItem">
                                  <div
                                    className="account-section-item"
                                    style={{ display: "flex" }}
                                  >
                                    <input
                                      onChange={onChangeHandler}
                                      type="checkbox"
                                      name="newsletterSubscription"
                                      // checked={requireSubscribtion}
                                      checked={newsletterSubscribed}
                                      className="tick-checkbox"
                                    ></input>

                                    <label
                                      style={{
                                        fontSize: "14px",
                                        color: "#65625f",
                                        width: "max-content",
                                      }}
                                    >
                                      Subscribe to our newsletter.
                                    </label>
                                  </div>
                                </div>
                                <div className="" style={{ fontSize: "15px" }}>
                                  <button
                                    className="pn__submit"
                                    onClick={onSubmitNewsletter}
                                  >
                                    Submit
                                  </button>
                                </div> */}
                              </div>
                            </div>
                            <div className="account-section-group left-align"></div>
                          </div>
                        </div>
                      </section>
                    </div>

                    {/*  */}
                    <div
                      className="account-section collapsable-panel clearfix"
                      style={{ marginTop: "10px" }}
                      data-uia="phonenumber-section"
                    >
                      {/* <header className="account-section-header collapsable-section-toggle">
                        <h2 className="account-section-heading">
                          PHONE NUMBER
                        </h2>
                      </header>
                      <section className="collapsable-section-content account-section-content phoneNumberSection">
                        <div className="account-subsection clearfix">
                          <div className="clearfix">
                            <div className="account-section-group">
                              <div>
                                <div className="account-section-item">
                                  {!isPhoneNumber ? (
                                    <div>
                                      <div className="mobile-phoneNumber">
                                        <PhoneInput
                                          country={"ca"}
                                          placeholder="Phone number"
                                          specialLabel="Phone number"
                                          enableAreaCodes={true}
                                          value={phoneNumber.phoneNumber}
                                          inputStyle={{
                                            width: "260px",
                                            height: "35px",
                                            fontSize: "13px",
                                            paddingLeft: "48px",
                                            borderRadius: "5px",
                                            border:
                                              "1px solid #cacaca !important",
                                          }}
                                          buttonStyle={{
                                            backgroundColor: "#f5f5f5",
                                            border: "1px solid #cacaca",
                                          }}
                                          dropdownStyle={{
                                            width: "300px",
                                            top: "-200px",
                                          }}
                                          onChange={(value, country) => {
                                            console.log(country);
                                            setPhoneNumber({
                                              ...phoneNumber,
                                              phoneNumber: value,
                                              code: country.dialCode,
                                            });
                                            setConfirmNumber({
                                              ...confirmNumber,
                                              phoneNumber: country.dialCode,
                                              code: country.dialCode,
                                            });
                                          }}
                                        />
                                      </div>
                                      <div className="confirm-phoneNumber">
                                        <PhoneInput
                                          country={"ca"}
                                          placeholder="Confirm your phone number"
                                          specialLabel="Confirm phone number"
                                          value={confirmNumber.phoneNumber}
                                          enableAreaCodes={true}
                                          inputStyle={{
                                            width: "260px",
                                            height: "35px",
                                            fontSize: "13px",
                                            paddingLeft: "48px",
                                            borderRadius: "5px",
                                            border:
                                              "1px solid #cacaca !important",
                                          }}
                                          buttonStyle={{
                                            backgroundColor: "#f5f5f5",
                                            border: "1px solid #cacaca",
                                          }}
                                          dropdownStyle={{
                                            width: "300px",
                                            top: "-200px",
                                          }}
                                          onChange={(value, country) => {
                                            setConfirmNumber({
                                              ...confirmNumber,
                                              phoneNumber: value,
                                              code: country.dialCode,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ) : null}
                                  {isPhoneNumber ? (
                                    <div className="mobile-phoneNumber">
                                      <PhoneInput
                                        placeholder="Mobile number"
                                        specialLabel=""
                                        disabled={true}
                                        value={phoneNumber.phoneNumber}
                                        inputStyle={{
                                          width: "260px",
                                          height: "35px",
                                          fontSize: "13px",
                                          paddingLeft: "48px",
                                          borderRadius: "5px",
                                          border:
                                            "1px solid #cacaca !important",
                                        }}
                                        buttonStyle={{
                                          backgroundColor: "#f5f5f5",
                                          border: "1px solid #cacaca",
                                        }}
                                        dropdownStyle={{ width: "300px" }}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                                <div className="account-section-item">
                                  {isPhoneNumber == false ? (
                                    <div style={{ display: "flex" }}>
                                      {isEdit == true ? (
                                        <button
                                          className="pn__submit"
                                          id="clear"
                                          onClick={() => {
                                            setPhoneNumber({
                                              ...prevNumber,
                                            });
                                            setIsPhoneNumber(true);
                                            setIsEdit(false);
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      ) : null}
                                      <button
                                        className="pn__submit"
                                        id="clear"
                                        onClick={() => {
                                          onSubmitPhoneNumber();
                                        }}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  ) : isEdit == false ? (
                                    <div style={{ display: "flex" }}>
                                      <button
                                        className="pn__submit"
                                        id="clear"
                                        onClick={() => {
                                          setPrevNumber({
                                            ...phoneNumber,
                                          });
                                          setIsPhoneNumber(false);
                                          setIsEdit(true);
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="pn__submit"
                                        id="clear"
                                        onClick={() => {
                                          onDeletePhoneNumber();
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="account-section-group left-align"></div>
                          </div>
                        </div>
                      </section> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Account;
