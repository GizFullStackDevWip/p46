import React, { useState, useEffect } from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom'

const SubscriptionContainer = (param) => {

  useEffect(() => {
  }, []);

  return (
    <section className="categoryWrapper">
      <div className="_2vKa8"></div>
      <div className="container categoryHeadWrapper">
        <div className="categoryLinkWrapper">
          <div>
            <div className='row'>
              <div className='col-md-12'>
                <p className="text-head">Subscription Packages Options</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 "></div>
              <div className="col-md-11 ">
                <div className="subscribe-box">
                  <p style={{ fontSize: '15px', color: '#fff' }}><span style={{ fontSize: '15px', color: '#fff' }}><span style={{ fontSize: '15px', color: '#fff' }} ><span
                  ><p style={{ fontSize: '22px', color: '#f2110f' }}>Subscribe now to get unlimited access to stream from thousands of
                  hours of premium films, dramas and series. No Lock-IN Contract and Cancel
                    anytime.<br /></p></span><br />- Payment will be charged through your stripe or PayPal account on
                purchase confirmation<br /></span></span><span >- Subscription will
                    auto-renew every month/year based on the package you have purchased unless you cancel at least 24 hours be
              for the end of the current subscription period.<br /></span><span >- You can
                    manage your subscription package and payments by going to your stripe/PayPal account settings after
              purchase.<br /></span><span>- Any unused portion of a cancelled subscription
              is not subject to refund.<br /></span><span >- Upgrades on Subscription
              Packages may be offered in the future.</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Subscription param={param.param} />
      </div>
    </section>
  );
};
export default SubscriptionContainer;