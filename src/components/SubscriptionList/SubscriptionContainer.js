import React, { useState, useEffect } from "react";
import Subscription from "./Subscription";
import { service } from "./service";
import { ToastsContainer, ToastsStore } from "react-toasts";

const SubscriptionContainer = (param, androidData, isAndroid) => {
  const [premiumFlag, setPremiumFlag] = useState();
  useEffect(() => {}, []);

  return (
    <section className="categoryWrapper">
      <div className="_2vKa8"></div>
      <div className="container categoryHeadWrapper">
        <div className="categoryLinkWrapper">
          <div>
            <p className="text-head">Subscription Packages Options</p>

            <div className="subscribe-box">
              <p style={{ fontSize: "15px", color: "#fff" }}>
                <span style={{ fontSize: "15px", color: "#fff" }}>
                  <span style={{ fontSize: "15px", color: "#fff" }}>
                    <span>
                      <p
                        style={{
                          fontSize: "21px",
                          color: "rgb(203, 10, 61)",
                          textAlign: "center",
                        }}
                      >
                        <b>
                          Subscribe now to get unlimited access to stream from
                          thousands of hours of premium films and series.
                        </b>
                      </p>
                    </span>
                    <br />
                  </span>
                </span>
                <span>
                  - Payment will be charged through your stripe or PayPal
                  account on purchase confirmation
                  <br />
                </span>
                <span>
                  - Subscription will auto-renew every month/year based on the
                  package you have purchased unless you cancel at least 24 hours
                  be for the end of the current subscription period.
                  <br />
                </span>
                <span>
                  - You can manage your subscription package and payments by
                  going to your stripe/PayPal account settings after purchase.
                  <br />
                </span>
                <span>
                  - Any unused portion of a cancelled subscription is not
                  subject to refund.
                  <br />
                </span>
              </p>
            </div>
          </div>
        </div>
        <Subscription
          param={param.param}
          androidData={androidData}
          isAndroid={isAndroid}
        />
        <ToastsContainer store={ToastsStore} />
      </div>
    </section>
  );
};
export default SubscriptionContainer;
