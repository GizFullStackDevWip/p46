import React, { useState, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";
import { Link, useHistory, useLocation } from 'react-router-dom';

const Cookie = () => {
    const history = useHistory();
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

    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            enableDeclineButton
            declineButtonStyle={buttonStyle}
            declineButtonText="Decline"
            cookieName="happitvCookie"
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
}

export default Cookie;