import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link, useHistory, useLocation } from "react-router-dom";
import SubscriptionContainer from "./SubscriptionContainer";
import { service } from "../../network/service";
import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import stripeImage from "../../img/stripe.jpeg";
import mastercard from "../../img/mastercard.png";
import visa from "../../img/visa.png";
import american from "../../img/american.png";
import paypal from "../../img/payp.png";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { clearUserData } from "../../Utils/utils";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);
const Payment = (state) => {
  const history = useHistory();
  const isLoggedIn = service.getCookie("isLoggedIn");
  const [androidData, setAndroidData] = useState(null);
  const [isAndroid, setIsAndroid] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [paypalLink, setPaypalLink] = useState("");
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state.location.state) {
      setAndroidData(state.location.state.androidData);
      setPaymentData(state.location.state.paymentData);
      setIsAndroid(state.location.state.isAndroid);
      localStorage.setItem("deviceType", "web");
      if (state.location.state.isAndroid) {
        localStorage.setItem("isAndroid", state.location.state.isAndroid);
        localStorage.setItem("deviceType", "android-web");
      }
      let tempData = state.location.state.paymentData;
      let deviceType = localStorage.getItem("deviceType");
      let userId = service.getCookie("userId");
      let countryCode = service.getCookie("country_code");
      service.setCookie("subId", tempData.publisher_subscription_id, 10);
      localStorage.setItem("selectedSubId", tempData.publisher_subscription_id);
      var user_data = {
        transaction_type: 1,
        subscription_id: tempData.publisher_subscription_id,
        uid: userId,
        amount: tempData.price,
        pubid: process.env.REACT_APP_PUBID,
        country_code: countryCode,
        device_type: deviceType,
      };
      var user_details = encodeURIComponent(JSON.stringify(user_data));
      let link = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${tempData.paypal_keyword}&custom=${user_details}&discount=10&currency_code=USD&upload=1`;
      // let link = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${tempData.paypal_keyword}&custom=${user_details}&discount=10&currency_code=USD&upload=1`;
      setPaypalLink(link);
    } else if (isLoggedIn == "true") {
      // history.push("/home");
    }
    var singleObj = [];
    let userId = service.getCookie("userId");
    service.userSubscription(userId).then((response) => {
      if (response.success == true) {
        if (response.forcibleLogout === true) {
          alert(
            "Sorry, You’ve reached the maximum Device limit. Please log in again!"
          );
          service.logoutAll(userId).then((res) => {
            setTimeout(() => {
              redirectToLogin();
            }, 1000);
          });
        } else if (response.session_expired === true) {
          ToastsStore.warning("Sorry! Session Has Expired");
          redirectToLogin();
        } else {
          var data = response.data;
          data.map((item, index) => {
            singleObj.push(item);
          });
          setSubscription(singleObj);
        }
      }
    });
  }, []);

  useEffect(() => {
    localStorage.removeItem("fromVideoplayer");
  }, []);

  const redirectToLogin = () => {
    // dispatch({ type: "LOGOUT" });
    // setMouseHover(false);
    clearUserData();
    setTimeout(() => {
      let isAndroid = localStorage.getItem("isAndroid");
      if (isAndroid == true || isAndroid == "true") {
        window.location.href = process.env.REACT_APP_WEB_VIEW_FAILED;
      } else {
        window.location.href = "/signin";
      }
    }, 500);
  };

  const handleClick = async (event) => {
    localStorage.setItem(
      "selectedSubId",
      paymentData.publisher_subscription_id
    );
    localStorage.setItem("selectedAmount", paymentData.price);
    const session = await service.stripeSession(
      paymentData.publisher_subscription_id
    );
    ;
    console.log("session", session);
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  if (!isLoggedIn || isLoggedIn == "false") {
    return <Redirect push to="/signin" />;
  } else
    return (
      <div className="pageWrapper searchPageMain payment__container marginAdjust">
        <div className="topContainer">
          <div className="homepageWrapper menuCloseJS closeMenuWrapper">
            <div className="container">
              <p className="text-head">Payment Gateway</p>
              <fieldset className="myFieldSet">
                <legend className="payment-box">
                  Select a payment gateway
                </legend>
                {/* <img
                  className="cards1"
                  style={{ marginLeft: "15px" }}
                  src={mastercard}
                  onClick={handleClick}
                ></img>
                <img
                  className="cards1"
                  style={{ marginLeft: "15px" }}
                  src={visa}
                  onClick={handleClick}
                ></img>
                <img
                  className="cards1"
                  style={{ marginLeft: "15px" }}
                  src={american}
                  onClick={handleClick}
                ></img> */}
                <a href={paypalLink}>
                  <img className="cards1" src={paypal}></img>
                </a>
              </fieldset>
              <SubscriptionContainer param={subscription} />
            </div>
            <ToastsContainer store={ToastsStore} />
          </div>
        </div>
      </div>
    );
};
export default Payment;
