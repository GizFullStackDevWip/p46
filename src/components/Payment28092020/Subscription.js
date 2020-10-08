import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
var moment = require('moment');
const Subscription = ({ param }) => {
    const [isSuccessMsg, setIsSuccessMsg] = useState(false);
    const [msgSuccess, setMsgSucess] = useState("");
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const onUnsubscribeHandler = (param) => {
        if((param.mode_of_payment == "stripe" || param.mode_of_payment == "paypal") && param.cancel_status !== true) {
            service.unsubscribe(param.receiptid, param.sub_id).then(response => {
                if(response.status == 100) {
                    setMsgSucess('You are successfully unsubscribed.');
                    setIsSuccessMsg(true);
                    setTimeout(function () {
                        setIsSuccessMsg(false);
                    }, 5000)
                }
            })
        }
    }
    const subscriptionForMob = () => {
        let subscription = {}
        let isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        if (isMobile !== null) {
            subscription = {
                display: "inline"
           };
        } else {
            subscription = {
                display: "inline-flex",
                marginLeft: "-58px"
           };
        }
        return subscription;
     }
     const subDateForMob = () => {
        let subscription = {}
        let isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        if (isMobile !== null) {
            subscription = {
                display: "block",
                width: "56%"
           };
        }
        return subscription;
     }
    return (
        <div className="carouselContent" style={subscriptionForMob()}>
               {
                    param.map((param, index) => {
                        return (
                            <div className="movieTile mytitle" key={index} >
                                <div>
                                    <div className="moviePoster"style={{ padding: '20% 0'}}  >
                                        <div className="FeNml"></div>
                                        <button type="button" onClick ={() => onUnsubscribeHandler(param)} className="subscribe-btn"  style={{cursor:'pointer'}}>Unsubscribe</button>
                                    </div>


                                    <div className="wishlistPosition wishlistTranslate wishlistParentClose">
                                        <div className="wishlistButton">
                                            <div className="wlgradientPosition wlgradientTranslate wlgradientClose"
                                                style={{ backgroundImage: "linearGradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5)), url(&quot;2NsjBkYjIeJVUQCrm99FZLZYu4=/57x69:849x1202/400x574/smart/img.adrise.tv/b53d8c08-cd23-43cc-b74f-e814a34af8e1.jpg&quot;)", backgroundPosition: "center bottom", backgroundSize: "cover" }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <section className="movieTextWrapper movieTextWrapperPadding">
                                    <div className="movieTextFlex">
                                        <h3>
                                        <div className="linkButton movieTextHeading" title="Cold Squad">{param.subscription_name}</div></h3>
                                        <div className="movieCatYear" style={subDateForMob()}>
                                            
                                            <div>
                                                <div className="movieCensorBox moviecensorText">{"Valid Till : " +  moment(param.valid_to).format("YYYY-MM-DD")}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        );
                    })
                } 
        </div>
    );
}
export default Subscription;