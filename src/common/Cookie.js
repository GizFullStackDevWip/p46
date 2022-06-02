import React, { useState, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { service } from '../network/service';

const Cookie = () => {
    const history = useHistory();
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    const login = useSelector((state) => state.login);
    const buttonStyle = {
        background: 'white',
        border: '0px',
        borderRadius: '2px',
        boxShadow: 'none',
        color: 'black',
        cursor: 'pointer',
        flex: '0 0 auto',
        padding: '5px 10px',
        margin: '15px',
        width: '110px',
        height: '28px',
        fontWeight: '800'
    }
    const onAcceptFunction = () => {
        service.cookiePlicy().then(response => { })
    }
    if (login === true) {
        return (
            <CookieConsent
                location="bottom"
                buttonText="Accept"
                enableDeclineButton
                declineButtonStyle={buttonStyle}
                onAccept={onAcceptFunction}
                declineButtonText="Decline"
                cookieName="BoondockCookie"
                style={{ background: "#2B373B", borderRadius: '5px', fontWeight: '600' }}
                buttonStyle={buttonStyle}
                expires={150}
            >
                This website uses cookies to enhance the user experience.{" "}
                <span style={{ cursor: 'pointer' }} onClick={() => {
                    history.push({
                        pathname: './cookiepolicy'
                    })
                }}>Learn More....</span>
            </CookieConsent>
        );
    } else {
        return (
            null
        );
    }

}

export default Cookie;