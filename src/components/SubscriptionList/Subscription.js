import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const Subscription = ({ param }) => {

    const [androidData, setAndroidData] = useState('');
    const [isAndroid, setIsAndroid] = useState(false);
    const [antkn, setAntkn] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const urlParams = new URLSearchParams(window.location.search);
        setAntkn(urlParams.get('antkn'));
        if (antkn) {
            service.androidTokeDecode(antkn).then(response => {
                localStorage.setItem('access-token', antkn);
                service.setCookie('userId', response.data[0].user_id, 15);
                service.setCookie('isLoggedIn', 'true', 15);
                setAndroidData(response.data);
                setIsAndroid(true);
            })
        }
    }, []);
    
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
                                <div className="moviePoster" style={{ padding: '20% 0' }}  >
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
                                        <div className="linkButton movieTextHeading" title="Cold Squad">{param.subscription_name}</div></h3>
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
