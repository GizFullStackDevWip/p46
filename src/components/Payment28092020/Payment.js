import React, { useState, useEffect } from 'react';
import Footer from '../Basic/Footer';
import Header from '../Basic/Header';
import { Link } from 'react-router-dom';
import SubscriptionContainer from './SubscriptionContainer';
import MyCheckoutForm from './MyCheckoutForm';
import { service } from '../../network/service';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51wp2oVC2wmQE6yzIjb2hp9y0095vrZfJY');
const stripe = require('stripe')('sk_test_xZYLlAJh0K41AxdDs7OYLLd4007lfxLGM9');
const Payment = () => {
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        var singleObj = [];
            service.userSubscription(97918).then(response => {
                var data = response.data;
                data.map((item, index) => {
                    singleObj.push(item);
                })
                setSubscription(singleObj);
            })
    }, []);
   
  const handleClick = async (event) => {
    // Get Stripe.js instance
    

    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    //const response = await fetch('http://localhost:4242/create-checkout-session', { method: 'POST' });

    //const session = await response.json();
    

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: "cs_test_VL0jjqmYIXKIrI1Ky3WW9keesWJLE3ciSIE5tLcBFh5xh8uvkEPnb4Tg",
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                   <div className="container">
                   <p className="text-head">Payment Gateway</p>
                   <fieldset className="myFieldSet">
                   <legend className="payment-box" >Select a payment gateway :</legend>
                       <img className="cards" style={{marginLeft:'15px'}}src={require('../../images/mastercard.png')}  onClick={handleClick}></img>
                        <img className="cards" src={require('../../images/dis.png')} onClick={handleClick}></img>
                        <img className="cards" src={require('../../images/visa.png')} onClick={handleClick} ></img>
                        <img className="cards" src={require('../../images/american.png')}  onClick={handleClick}></img>
                        <img className="cards" src={require('../../images/payp.png')} ></img>
                        
                        </fieldset>
                        <SubscriptionContainer param={subscription}/>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
export default Payment;