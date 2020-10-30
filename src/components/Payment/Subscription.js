import React, { useState, useEffect } from "react";
import { service } from "../../network/Home/service";
import "react-multi-carousel/lib/styles.css";
var moment = require("moment");

const Subscription = ({ param, msgHandler }) => {
  
  const onUnsubscribeHandler = (param) => {
    if (
      (param.mode_of_payment == "stripe" ||
        param.mode_of_payment == "paypal") &&
      param.cancel_status !== true
    ) {
      service.unsubscribe(param.receiptid, param.sub_id).then((response) => {
        if (response.status == 100) {
          msgHandler("true");
        } else {
          msgHandler("false");
        }
      });
    }
  };
  
  const subscriptionForMob = () => {
    let subscription = {};
    let isMobile = navigator.userAgent.match(
      /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
    );
    if (isMobile !== null) {
      subscription = {
        display: "inline",
      };
    } else {
      subscription = {
        display: "inline-flex",
        marginLeft: "-58px",
      };
    }
    return subscription;
  };
  const subDateForMob = () => {
    let subscription = {};
    let isMobile = navigator.userAgent.match(
      /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
    );
    if (isMobile !== null) {
      subscription = {
        display: "block",
        width: "56%",
      };
    }
    return subscription;
  };
  let subItems = [];
  let mainItems = [];
  let i = 0;
  let j = 0;
  param.map((item, index) => {
    let subItem = (
      <div key={i}>
        <div className="movieTile mytitle" >
          <div>
            <div className="moviePoster" style={{ padding: "20% 0" }}>
              <div className="FeNml"></div>
              <button
                type="button"
                onClick={() => onUnsubscribeHandler(item)}
                className="subscribe-btn"
                style={{ cursor: "pointer" }}
              >
                Unsubscribe
              </button>
            </div>

            <div className="wishlistPosition wishlistTranslate wishlistParentClose">
              <div className="wishlistButton">
                <div
                  className="wlgradientPosition wlgradientTranslate wlgradientClose"
                  style={{
                    backgroundImage:
                      "linearGradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5)), url(&quot;2NsjBkYjIeJVUQCrm99FZLZYu4=/57x69:849x1202/400x574/smart/img.adrise.tv/b53d8c08-cd23-43cc-b74f-e814a34af8e1.jpg&quot;)",
                    backgroundPosition: "center bottom",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <section className="movieTextWrapper movieTextWrapperPadding">
            <div className="movieTextFlex">
              <h3>
                <div className="linkButton movieTextHeading" title="Cold Squad">
                  {item.subscription_name}
                </div>
              </h3>
              <div className="movieCatYear" style={subDateForMob()}>
                <div>
                  <div className="movieCensorBox moviecensorText">
                    {"Valid Till : " +
                      moment(item.valid_to).format("YYYY-MM-DD")}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
    subItems.push(subItem);
    if ((index + 1) % 4 == 0 || (index + 1) == param.length) {
      let mainItem = (
        <div key={j}>
          <div className="carouselContent" style={subscriptionForMob()}>
            {subItems}
          </div>
        </div>
      );
      mainItems.push(mainItem);
      subItems = [];
      j++;
    }
    i++;
  });
  return (
      mainItems
  );
};
export default Subscription;
