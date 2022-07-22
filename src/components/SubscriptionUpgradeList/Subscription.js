import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import './subscription.css'
import { Link } from "react-router-dom";
import yesMark from '../../img/web-2x.png'
import noMark from '../../img/web-1x.png'
import defaultplan from '../../img/plan-default.png'
import basicplan from '../../img/plan-basic.png'
import standardplan from '../../img/plan-standard.png'
import premiumplan from '../../img/plan-premium.png'

const Subscription = ({ param }, androidData, isAndroid) => {

  const [selectedSubscription, setSelectedSubscription] = useState(null)
  useEffect(() => {
    // console.log("Subscriptionparam", param);
    // console.log("SubscriptionandroidData", androidData);
    // console.log("SubscriptionisAndroid", isAndroid);
    {setSelectedSubscription(param[0])}
  }, [param]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activePackageClass = "subscription-packages active";
  const packageClass = "subscription-packages";

  return (
    <div className="subscription-list-wrapper">
      <div className="inner-wrapper">
        <div className="content">
          <div className="packagedetails">
            <div className="inner-wrapper">
              <div>
                <h6>All Content</h6>
                <span>Movies, live sports, TV, Specials
                </span>
              </div>
              <div><h6>Watch on TV or Laptop</h6></div>
              <div><h6>Ads free movies and shows (except sports)</h6></div>
              <div><h6>Number of devices that can be logged in</h6></div>
              <div><h6>Max video quality</h6></div>
              <div><h6>Max audio quality</h6></div>
            </div>
          </div>
          <div className={(selectedSubscription && (selectedSubscription.subscription_name == 'Basic' || selectedSubscription.subscription_name == 'Basic - Yearly')) ? activePackageClass : packageClass}>
            <div>
              <h6>Basic</h6>
            </div>
            <div><img src={yesMark} /></div>
            <div><img src={yesMark} /></div>
            <div><img src={noMark} /></div>
            <div><span>2</span></div>
            <div><span>Full HD (1080p)</span></div>
            <div><span>Dolby 5.1</span></div>
          </div>
          <div className={(selectedSubscription && (selectedSubscription.subscription_name == 'Standard' || selectedSubscription.subscription_name == 'Standard - Yearly')) ? activePackageClass : packageClass}>
            <div>
              <h6>Standard</h6>
            </div>
            <div><img src={yesMark} /></div>
            <div><img src={yesMark} /></div>
            <div><img src={yesMark} /></div>
            <div><span>4</span></div>
            <div><span>4K (2160p)</span></div>
            <div><span>Dolby 5.1</span></div>
          </div>
          <div className={(selectedSubscription && (selectedSubscription.subscription_name == 'Premium' || selectedSubscription.subscription_name == 'Premium - Yearly')) ? activePackageClass : packageClass}>
            <div>
              <h6>Premium</h6>
            </div>
            <div><img src={yesMark} /></div>
            <div><img src={yesMark} /></div>
            <div><img src={yesMark} /></div>
            <div><span>Unlimited</span></div>
            <div><span>4K (2160p)</span></div>
            <div><span>Dolby 5.1</span></div>
          </div>
        </div>

        <div className="content-image">
          <div>
            {!selectedSubscription && <img src={defaultplan} />}
            {selectedSubscription && (selectedSubscription.subscription_name == 'Basic' || selectedSubscription.subscription_name == 'Basic - Yearly') && <img src={basicplan} />}
            {selectedSubscription && (selectedSubscription.subscription_name == 'Standard' || selectedSubscription.subscription_name == 'Standard - Yearly') && <img src={standardplan} />}
            {selectedSubscription && (selectedSubscription.subscription_name == 'Premium' || selectedSubscription.subscription_name == 'Premium - Yearly') && <img src={premiumplan} />}
          </div>
        </div>

        <div className="bottom-content">
          <div className="wrapper">

            {param.map((param, index) => {

              let wrapperClass = "item"
              let isActiveItem = false
              console.log(selectedSubscription)
              if (selectedSubscription != null && selectedSubscription.publisher_subscription_id == param.publisher_subscription_id) {
                wrapperClass = "item active"
                isActiveItem = true
              }
              return (<div className={wrapperClass} onClick={() => {
                setSelectedSubscription(param)
              }}>
                <div>
                  <h6>
                    {param.subscription_name}
                  </h6>
                  <span>
                    {"$" +
                      param.price +
                      "/" +
                      param.subscription_type_name}
                  </span>
                  {isActiveItem && <img src={yesMark} />}
                </div>
              </div>)
            })}

            <div className="item submit">
              <div>
                {selectedSubscription && <Link
                  to={{
                    pathname: "/payment",
                    state: {
                      paymentData: selectedSubscription,
                      androidData: androidData,
                      isAndroid: isAndroid,
                    },
                  }}
                ><button>CONTINUE</button>
                </Link>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
export default Subscription;
