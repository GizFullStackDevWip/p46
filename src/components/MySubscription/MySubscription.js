import React, { useState, useEffect } from 'react';
import Footer from '../Basic/Footer';
import { Redirect } from "react-router-dom";
import Header from '../Basic/Header';
import SubscriptionContainer from './SubscriptionContainer';
import { service } from '../../network/service';

const MySubscription = (state) => {
  const isLoggedIn = service.getCookie('isLoggedIn');
  
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    var singleObj = [];
    let userId = service.getCookie('userId');
    service.userSubscription(userId).then(response => {
      // if (useResponse.login_needed) {
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

 
  if (!isLoggedIn || isLoggedIn == 'false') {
    return <Redirect push to="/signin" />;
  } else
    return (
      <div className="pageWrapper searchPageMain">
        <div className="topContainer">
          {/* <Header /> */}
          <div className="homepageWrapper menuCloseJS closeMenuWrapper">
            <div className="container">
              <p className="text-head">My Subscription</p>
              
              <SubscriptionContainer param={subscription} />
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    );
}
export default MySubscription;
