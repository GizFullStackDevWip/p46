import React, { useState, useEffect } from 'react';
import { service } from '../../network/service';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
const Subscription = ({ param }, androidData, isAndroid) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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


    const subscriptionForMob = () => {
        let subscription = {}
        let isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
      
        if (isMobile !== null) {
            subscription = {
                display: "inline"
            };
        } else {
            subscription = {
                display: "inline-flex"
            };
        }
        return subscription;
    }
    const subPriceForMob = () => {
        let subscription = {}
        let isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        if (isMobile !== null) {
            subscription = {
                display: "block",
                width: "60%"
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
                                <div className="moviePoster" style={{ padding: '0% 0' }}  >
                                    <div className="FeNml"></div>
                                    <Link
                                        to={{
                                            pathname: "/payment",
                                            state: {
                                                paymentData: param,
                                                androidData: androidData,
                                                isAndroid: isAndroid
                                            }
                                        }}
                                    ><button type="button" className="subscribe-btn" style={{ cursor: 'pointer' }}>Subscribe</button>
                                    </Link>

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
                                        <div className="linkButton movieTextHeading" >{param.subscription_name}</div></h3>
                                    <div className="movieCatYear" style={subPriceForMob()}>

                                        <div>
                                            <div className="movieCensorBox moviecensorText">{"USD $ " + param.price + " " + param.subscription_type_name}</div>
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
