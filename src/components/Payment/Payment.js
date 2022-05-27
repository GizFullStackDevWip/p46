import React, { useState, useEffect } from 'react';
import Footer from '../Basic/Footer';
import { Redirect } from "react-router-dom";
import Header from '../Basic/Header';
import { Link, useHistory, useLocation } from 'react-router-dom';
import SubscriptionContainer from './SubscriptionContainer';
import { service } from '../../network/service';
import { loadStripe } from '@stripe/stripe-js';
import mastercard from "../../images/mastercard.png";
import visa from "../../images/visa.png";
import american from "../../images/american.png";
import paypal from "../../images/payp.png";
// const stripePromise = loadStripe('pk_test_51Jv4O9BDhFAtgHZKJskhkPqYhTmNMNKmZjfjam7qQ28kiqle384UUumewAN3fNmj2ijIkbU86R0B3luPUXG2Hgjs00mFzbp4F6');
// const stripePromise = loadStripe('pk_test_51Hn9UMFkgI4DLRDUgGco6HkS2onWNKtIpUYMG4beza7ze82gslIsPAKycBdHxUyyFgcPbNYjLhcLiaVf7orahIT500bYmsa6hV');
const stripe = require('stripe')('sk_test_51Jv4O9BDhFAtgHZK6XytXCxXjMpPpLofaMTHuh7k0kWmlQ8k94DHlCjkHBchOsUpeoDnktNrd12io8uCEUmfCFQu00ekxBzORQ');
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);


const Payment = (state) => {
  const history = useHistory();
  const isLoggedIn = service.getCookie('isLoggedIn');
  const [androidData, setAndroidData] = useState(null);
  const [isAndroid, setIsAndroid] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [paypalLink, setPaypalLink] = useState('');
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (state.location.state) {
      setAndroidData(state.location.state.androidData);
      setPaymentData(state.location.state.paymentData);
      setIsAndroid(state.location.state.isAndroid);
      localStorage.setItem('deviceType', 'web');
      if (state.location.state.isAndroid) {
        localStorage.setItem('isAndroid', state.location.state.isAndroid);
        localStorage.setItem('deviceType', 'android-web');
      }
      let tempData = state.location.state.paymentData;
      let deviceType = localStorage.getItem('deviceType')
      let userId = service.getCookie('userId');
      let countryCode = service.getCookie('country_code');
      service.setCookie("subId", tempData.publisher_subscription_id, 10);
      localStorage.setItem('selectedSubId', tempData.publisher_subscription_id);
      var user_data = { "transaction_type": 1, "subscription_id": tempData.publisher_subscription_id, "uid": userId, "amount": tempData.price, "pubid": 50023, "country_code": countryCode, "device_type": deviceType };
      var user_details = encodeURIComponent(JSON.stringify(user_data));
      // let link = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${tempData.paypal_keyword}&custom=${user_details}&discount=10&currency_code=USD&upload=1`;
      let link = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${tempData.paypal_keyword}&custom=${user_details}&discount=10&currency_code=USD&upload=1`;
      setPaypalLink(link);
    } else if (isLoggedIn == 'true') {
      history.push('/home');
    }
    var singleObj = [];
    let userId = service.getCookie('userId');
    service.userSubscription(userId).then(response => {
      // if (response.login_needed) {
      //   history.push({
      //     pathname: "/signin",
      //   });
      // }
      var data = response.data;
      data.map((item, index) => {
        singleObj.push(item);
      })
      setSubscription(singleObj);
    })
  }, []);

  const handleClick = async (event) => {
    localStorage.setItem('selectedSubId', paymentData.publisher_subscription_id);
    localStorage.setItem('selectedAmount', paymentData.price);
    const session = await service.stripeSession(paymentData.publisher_subscription_id);
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }

  };
  if (!isLoggedIn || isLoggedIn == 'false') {
    return <Redirect push to="/signin" />;
  } else
    return (
      <div className="pageWrapper searchPageMain">
        <div className="topContainer">
          <Header />
          <div className="homepageWrapper menuCloseJS closeMenuWrapper">
            <div className="container">
              <p className="text-head">Payment Gateway</p>
              <fieldset className="myFieldSet">
                <legend className="payment-box" >Select a payment gateway</legend>
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
                >

                </img> */}
                <a href={paypalLink}>
                  <img className="cards" src={require('../../images/paypal2.png')} ></img></a>

              </fieldset>
              <SubscriptionContainer param={subscription} />
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    );
}
export default Payment;
