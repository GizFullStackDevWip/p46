import React, { useState, useEffect } from "react";
import FooterInfo from "../Basic/FooterInfo";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import appLogo from "../../images/logo.png";

const Footer = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;
  const functionOnclick = (path) => {
    history.push({ pathname: path });
  };
  if (currentPath === "/termsofuse" || currentPath === "/policydarkmode") {
    return null;
  } else {
    return (
      <div className="footer">
   
        <div className="container">
          <div className="row footerLogoSocial">
            <Link to="/home">
              <div className="footerLogo">
                <img src={appLogo} style={{ cursor: "pointer" }} width={70} />
              </div>
            </Link>
            <div className="_23TJ8"></div>
            <div className="col col-4 col-lg-3 col-xl-1-5  socialTray">
              <div className="socialLinkContainer">
                <div className="footerSLWrapper">
                <a
                    href="https://www.Facebook.com/runwaytv"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerFacebook"
                  >
                    <svg style={{color:'red'}}
                      className="svgIcon facebookIcon"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 20"
                      
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/runwaytv/?hl=en"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerInsta"
                  >
                    <svg style={{color:'red'}}
                      className="svgIcon"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 20"
                      
                    >
                      <g fill="currentColor" fillRule="evenodd">
                        <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.087.278 3.45.525c-.658.256-1.216.598-1.772 1.153C1.123 2.234.78 2.792.525 3.45.278 4.086.11 4.812.06 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.05 1.065.218 1.79.465 2.428.256.658.598 1.216 1.153 1.77.556.558 1.114.9 1.772 1.155.636.248 1.363.417 2.427.464 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.064-.048 1.79-.217 2.428-.465.658-.255 1.216-.597 1.77-1.154.558-.554.9-1.112 1.155-1.77.248-.636.417-1.362.464-2.427.048-1.066.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.048-1.065-.217-1.79-.465-2.427-.255-.658-.597-1.216-1.154-1.772-.554-.555-1.112-.897-1.77-1.153C15.915.278 15.188.11 14.124.06 13.057.012 12.716 0 10 0m0 2c2.606 0 2.914.01 3.943.057.952.044 1.468.202 1.812.336.455.177.78.39 1.123.73.34.34.552.667.73 1.12.133.346.292.862.335 1.814C17.99 7.087 18 7.394 18 10s-.01 2.914-.057 3.943c-.043.952-.202 1.468-.335 1.812-.178.455-.39.78-.73 1.123-.343.34-.668.552-1.123.73-.344.133-.86.292-1.812.335-1.03.047-1.337.057-3.943.057s-2.914-.01-3.943-.057c-.952-.043-1.468-.202-1.813-.335-.454-.178-.78-.39-1.12-.73-.342-.343-.554-.668-.73-1.123-.135-.344-.293-.86-.337-1.812C2.01 12.913 2 12.606 2 10s.01-2.914.057-3.943c.044-.952.202-1.468.336-1.813.177-.454.39-.78.73-1.12.34-.342.667-.554 1.12-.73.346-.135.862-.293 1.814-.337C7.087 2.01 7.394 2 10 2"></path>
                        <path d="M10 13c-1.657 0-3-1.343-3-3 0-1.656 1.343-3 3-3s3 1.344 3 3c0 1.657-1.343 3-3 3m0-8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m6 0c0 .553-.447 1-1 1-.553 0-1-.447-1-1 0-.553.447-1 1-1 .553 0 1 .447 1 1"></path>
                      </g>
                    </svg>
                  </a>
                  

                  <a
                    href="https://www.Twitter.com/runwaytv"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerTwitter"
                  >
                    <svg
                      className="svgIcon"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 17"
                      style={{ fill: "currentcolor" }}
                    >
                      <path style={{color:'red'}}
                        d="M6 17c7.837 0 11.965-6.156 12-11-.035-.67-.035-.844 0-1 .756-.59 1.45-1.297 2-2-.75.218-1.543.433-2 1 .5-.978 1.14-1.77 1-3-.358.763-1.24 1.095-2 1C15.29.647 12.69.568 11 2c-1.03 1.084-1.48 2.555-1 4-3.45-.204-6.524-1.74-9-4C.303 3.584.86 5.945 3 7c-.99.11-1.63-.062-2 0-.2 1.6 1.178 3.255 3 4-.512-.202-1.146-.178-2 0 .777 1.35 2.318 2.478 4 3-1.38.635-3.175 1.246-5 1-.35.244-.675.223-1 0 1.877 1.37 4.06 2 6 2"
                        fill="currentColor"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="row footerSeperator">
            <div className="col col-4 col-lg-3 col-xl-1-5  footerLine"></div>
            <div className="col col-4 col-lg-3 col-xl-1-5  footerLine"></div>
          </div>
          <div className="row footerMenu" style={{ lineHeight: "1.4rem" }}>
            <div className="col col-4 col-lg-3 col-xl-1-5 ">
              <ul className="footerMenuContainer">
                <li className="footerMenuHead">COMPANY</li>
                <li>
                  {" "}
                  <div
                    style={{ color: "#fff" }}
                    onClick={() => {
                      functionOnclick("/aboutus");
                    }}
                    rel="noopener"
                    target="_self"
                    className="linkButton"
                  >
                    About Us
                  </div>
                </li>
                <li>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://watch.runwaytv.com/"
                    style={{ color: "#fff" }}
                    className="linkButton"
                  >
                    Official Website
                  </a>
                </li>
              </ul>
            </div>
            <div className="col col-4 col-lg-3 col-xl-1-5 ">
              <ul className="footerMenuContainer">
                <li className="footerMenuHead">SUPPORT</li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    className="linkButton"
                    onClick={() => {
                      functionOnclick("/contactsupport");
                    }}
                  >
                    Contact Support
                  </div>
                </li>
                {/* <li><a rel="noopener" target="_self" className="linkButton">Help Center</a></li> */}
                {/* <li><a className="linkButton"  >Supported Devices</a></li>
                            <li><a className="linkButton"  >Activate Your Device</a></li> */}
              </ul>
            </div>
            <div className="col col-4 col-lg-3 col-xl-1-5 ">
              <ul className="footerMenuContainer">
                <li className="footerMenuHead">PARTNERS</li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    rel="noopener"
                    target="_self"
                    onClick={() => {
                      functionOnclick("/contactsupport");
                    }}
                    className="linkButton"
                  >
                    Advertise with Us
                  </div>
                </li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    className="linkButton"
                    onClick={() => {
                      functionOnclick("/contactsupport");
                    }}
                  >
                    Partner with Us
                  </div>
                </li>
              </ul>
            </div>
            <div className="col col-4 col-lg-3 col-xl-1-5 ">
              <ul className="footerMenuContainer">
                <li className="footerMenuHead">GET THE APPS</li>
                {/* <li><div style={{ color: '#fff' }} onClick={() => { window.open('https://apps.apple.com/in/app/boondock-nation/id1448300263') }} rel="noopener" target="_self" className="linkButton">iOS</div></li> */}
                {/* <li><div style={{ color: '#fff' }} onClick={() => { window.open('https://play.google.com/store/apps/details?id=com.discovermediaworks.boondocktemplate') }} rel="noopener" target="_self" className="linkButton">Android</div></li> */}
                {/* <li><div style={{ color: '#fff' }} onClick={() => { window.open('https://channelstore.roku.com/details/16f2a379ecb08501662e6c33d49cf369/boondock-nation') }} rel="noopener" target="_self" className="linkButton">Roku</div></li> */}
                {/* <li><div style={{ color: '#fff' }} onClick={() => { window.open('https://www.amazon.com') }} rel="noopener" target="_self" className="linkButton">Amazon Fire</div></li> */}

                <li>
                  <div
                    style={{ color: "#fff" }}
                    // onClick={() => {
                    //   window.open(
                    //     "https://apps.apple.com/in/app/boondock-nation/id1448300263"
                    //   );
                    // }}
                    rel="noopener"
                    target="_self"
                    className="linkButton"
                  >
                    iOS
                  </div>
                </li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.runway.androidtv"
                      );
                    }}
                    rel="noopener"
                    target="_self"
                    className="linkButton"
                  >
                    Android
                  </div>
                </li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    onClick={() => {
                      window.open(
                        "https://channelstore.roku.com/details/a7088d4e53090842812815e0c681a4bd/runway-tv"
                      );
                    }}
                    rel="noopener"
                    target="_self"
                    className="linkButton"
                  >
                    Roku
                  </div>
                </li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    onClick={() => {
                      window.open(
                        "https://www.amazon.com/Runway-TV/dp/B0B3MXCGMR/ref=sr_1_1?crid=2KBAYJ58VUDPB&keywords=runway+tv&qid=1655379684&rnid=2941120011&s=mobile-apps&sprefix=runway+tv%2Caps%2C310&sr=1-1"
                      );
                    }}
                    rel="noopener"
                    target="_self"
                    className="linkButton"
                  >
                    Amazon Fire
                  </div>
                </li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.runway.androidtv"
                      );
                    }}
                    rel="noopener"
                    target="_self"
                    className="linkButton"
                  >
                    Android TV
                  </div>
                </li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    rel="noopener"
                    target="_self"
                    className="linkButton"
                  >
                    Apple TV
                  </div>
                </li>
              </ul>
            </div>
            <div className="col col-4 col-lg-3 col-xl-1-5 ">
              <ul className="footerMenuContainer">
                <li className="footerMenuHead">LEGAL</li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    onClick={() => {
                      functionOnclick("/privacypolicy");
                    }}
                    // onClick={() => {
                    //   window.open(
                    //     "https://www.outdoorchannel.com/privacy/247031"
                    //   );
                    // }}
                    className="linkButton"
                  >
                    Privacy Policy
                  </div>
                </li>
                <li>
                  <div
                    style={{ color: "#fff" }}
                    onClick={() => {
                      functionOnclick("/termsandconditions");
                    }}
                    // onClick={() => {
                    //   window.open("https://www.outdoorchannel.com/terms/99078");
                    // }}
                    className="linkButton"
                  >
                    Terms of Use
                  </div>
                </li>
                {/* <li><div style={{ color: '#fff' }} className="linkButton"
                                    onClick={() => { functionOnclick('/cookiepolicy') }}>Cookie Policy</div>
                                    </li> */}
                {/* <li><a className="linkButton" >Do Not Sell My Personal Information</a></li> */}
              </ul>
            </div>
          </div>
        </div>
        <FooterInfo />
      </div>
    );
  }
};
export default Footer;
