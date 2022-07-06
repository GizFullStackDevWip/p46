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
                <img src={appLogo} style={{ cursor: "pointer" }} width={65} />
              </div>
            </Link>
            <div className="_23TJ8"></div>
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2 socialTray">
              <div className="socialLinkContainer">
                <div className="footerSLWrapper">
                <a
                    href="#"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerFacebook"
                    style={{ color: "#c2d501" }}
                  >
                    <svg
                      className="svgIcon facebookIcon"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 20"
                      style={{ fill: "currentcolor" }}
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerInsta"
                    style={{ color: "#c2d501" }}
                  >
                    <svg
                      className="svgIcon"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 20"
                      style={{ fill: "currentcolor" }}
                    >
                      <g fill="currentColor" fillRule="evenodd">
                        <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.087.278 3.45.525c-.658.256-1.216.598-1.772 1.153C1.123 2.234.78 2.792.525 3.45.278 4.086.11 4.812.06 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.05 1.065.218 1.79.465 2.428.256.658.598 1.216 1.153 1.77.556.558 1.114.9 1.772 1.155.636.248 1.363.417 2.427.464 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.064-.048 1.79-.217 2.428-.465.658-.255 1.216-.597 1.77-1.154.558-.554.9-1.112 1.155-1.77.248-.636.417-1.362.464-2.427.048-1.066.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.048-1.065-.217-1.79-.465-2.427-.255-.658-.597-1.216-1.154-1.772-.554-.555-1.112-.897-1.77-1.153C15.915.278 15.188.11 14.124.06 13.057.012 12.716 0 10 0m0 2c2.606 0 2.914.01 3.943.057.952.044 1.468.202 1.812.336.455.177.78.39 1.123.73.34.34.552.667.73 1.12.133.346.292.862.335 1.814C17.99 7.087 18 7.394 18 10s-.01 2.914-.057 3.943c-.043.952-.202 1.468-.335 1.812-.178.455-.39.78-.73 1.123-.343.34-.668.552-1.123.73-.344.133-.86.292-1.812.335-1.03.047-1.337.057-3.943.057s-2.914-.01-3.943-.057c-.952-.043-1.468-.202-1.813-.335-.454-.178-.78-.39-1.12-.73-.342-.343-.554-.668-.73-1.123-.135-.344-.293-.86-.337-1.812C2.01 12.913 2 12.606 2 10s.01-2.914.057-3.943c.044-.952.202-1.468.336-1.813.177-.454.39-.78.73-1.12.34-.342.667-.554 1.12-.73.346-.135.862-.293 1.814-.337C7.087 2.01 7.394 2 10 2"></path>
                        <path d="M10 13c-1.657 0-3-1.343-3-3 0-1.656 1.343-3 3-3s3 1.344 3 3c0 1.657-1.343 3-3 3m0-8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m6 0c0 .553-.447 1-1 1-.553 0-1-.447-1-1 0-.553.447-1 1-1 .553 0 1 .447 1 1"></path>
                      </g>
                    </svg>
                  </a>
                  <a
                    href="#"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerTwitter"
                    style={{ color: "#c2d501" }}
                  >
                    <svg
                      id="container"
                      viewBox="0 0 310.05 310.05"
                      className="svgIcon"
                      style={{ fill: "currentcolor" }}
                    >
                      <path
                        id="logo"
                        d="M245.265,31.772C223.923,11.284,194.388,0,162.101,0c-49.32,0-79.654,20.217-96.416,37.176
		c-20.658,20.9-32.504,48.651-32.504,76.139c0,34.513,14.436,61.003,38.611,70.858c1.623,0.665,3.256,1,4.857,1
		c5.1,0,9.141-3.337,10.541-8.69c0.816-3.071,2.707-10.647,3.529-13.936c1.76-6.495,0.338-9.619-3.5-14.142
		c-6.992-8.273-10.248-18.056-10.248-30.788c0-37.818,28.16-78.011,80.352-78.011c41.412,0,67.137,23.537,67.137,61.425
		c0,23.909-5.15,46.051-14.504,62.35c-6.5,11.325-17.93,24.825-35.477,24.825c-7.588,0-14.404-3.117-18.705-8.551
		c-4.063-5.137-5.402-11.773-3.768-18.689c1.846-7.814,4.363-15.965,6.799-23.845c4.443-14.392,8.643-27.985,8.643-38.83
		c0-18.55-11.404-31.014-28.375-31.014c-21.568,0-38.465,21.906-38.465,49.871c0,13.715,3.645,23.973,5.295,27.912
		c-2.717,11.512-18.865,79.953-21.928,92.859c-1.771,7.534-12.44,67.039,5.219,71.784c19.841,5.331,37.576-52.623,39.381-59.172
		c1.463-5.326,6.582-25.465,9.719-37.845c9.578,9.226,25,15.463,40.006,15.463c28.289,0,53.73-12.73,71.637-35.843
		c17.367-22.418,26.932-53.664,26.932-87.978C276.869,77.502,265.349,51.056,245.265,31.772z"
                      />
                    </svg>
                  </a>

                  <a
                    href="#"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerLinkedIn"
                    style={{ color: "#c2d501" }}
                  >
                    <svg
                      className="svgIcon"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 15 15"
                      style={{ fill: "currentcolor" }}
                    >
                      <path d="M13.89 0H1.11A1.1 1.1 0 0 0 0 1.08v12.84A1.1 1.1 0 0 0 1.11 15h12.78A1.1 1.1 0 0 0 15 13.92V1.08A1.1 1.1 0 0 0 13.89 0zM4 13H2V5h2zm0-9H2V2h2zm9 9h-2.24V9.2c0-.91 0-2.07-1.17-2.07s-1.35 1-1.35 2V13H6V5.19h2.15v1.07A2.33 2.33 0 0 1 10.31 5C12.58 5 13 6.62 13 8.72z"></path>
                    </svg>
                  </a>
                  {/* <a
                    href="https://twitter.com/outdchannel"
                    rel="noopener"
                    target="_blank"
                    className="linkButton footerTwitter"
                    style={{ color: "#c2d501" }}
                  >
                    <svg
                      className="svgIcon"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 20 17"
                      style={{ fill: "currentcolor" }}
                    >
                      <path
                        d="M6 17c7.837 0 11.965-6.156 12-11-.035-.67-.035-.844 0-1 .756-.59 1.45-1.297 2-2-.75.218-1.543.433-2 1 .5-.978 1.14-1.77 1-3-.358.763-1.24 1.095-2 1C15.29.647 12.69.568 11 2c-1.03 1.084-1.48 2.555-1 4-3.45-.204-6.524-1.74-9-4C.303 3.584.86 5.945 3 7c-.99.11-1.63-.062-2 0-.2 1.6 1.178 3.255 3 4-.512-.202-1.146-.178-2 0 .777 1.35 2.318 2.478 4 3-1.38.635-3.175 1.246-5 1-.35.244-.675.223-1 0 1.877 1.37 4.06 2 6 2"
                        fill="currentColor"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/user/outdoorchannel"
                    rel="noopener"
                    target="_blank"
                    // className="linkButton footerTwitter"
                    style={{
                      color: "#c2d501",
                      // marginTop: "10px"
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      fill="currentColor"
                      className="bi bi-youtube"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.122C.002 7.343.01 6.6.064 5.78l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                    </svg>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row footerSeperator">
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2 footerLine"></div>
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2 footerLine"></div>
          </div>
          <div className="row footerMenu" style={{ lineHeight: "1.4rem" }}>
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
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
                  {/* <a
                    rel="noopener"
                    target="_blank"
                    href="https://www.outdoorchannelplus.com/"
                    style={{ color: "#fff" }}
                    className="linkButton"
                  > */}
                    Official Website
                  {/* </a> */}
                </li>
              </ul>
            </div>
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
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
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
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
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
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
                    // onClick={() => {
                    //   window.open(
                    //     "https://play.google.com/store/apps/details?id=com.discovermediaworks.boondocktemplate"
                    //   );
                    // }}
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
                    // onClick={() => {
                    //   window.open(
                    //     "https://channelstore.roku.com/details/16f2a379ecb08501662e6c33d49cf369/boondock-nation"
                    //   );
                    // }}
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
                    // onClick={() => {
                    //   window.open(
                    //     "https://play.google.com/store/apps/details?id=com.boondocknationtv.template&hl=en&gl=US"
                    //   );
                    // }}
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
            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
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
