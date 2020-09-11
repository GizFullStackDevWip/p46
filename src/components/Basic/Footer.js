import React, { useState, useEffect } from 'react';
import FooterInfo from '../Basic/FooterInfo';
class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row footerLogoSocial">
                        <div className="footerLogo">
                            <a href="#">
                                <svg className="svgIcon iconColor svgFooterLogo" preserveAspectRatio="xMidYMid meet" viewBox="0 0 213 92" style={{ fill: 'currentcolor' }}>
                                    <path d="M210.873307,26.4543269 L196.542112,26.4543269 L196.542112,89.9669695 C196.542112,91.0984165 197.458796,92.0157644 198.589425,92.0157644 L210.873307,92.0157644 C212.003936,92.0157644 212.920621,91.0984165 212.920621,89.9669695 L212.920621,28.5031219 C212.920621,27.3716749 212.003936,26.4543269 210.873307,26.4543269 M155.595838,75.6254051 C146.550295,75.6254051 139.217329,68.2871339 139.217329,59.2350457 C139.217329,50.1829575 146.550295,42.8446863 155.595838,42.8446863 C164.641382,42.8446863 171.974348,50.1829575 171.974348,59.2350457 C171.974348,68.2871339 164.641382,75.6254051 155.595838,75.6254051 M155.595838,26.4543269 C150.78721,26.4543269 146.222213,27.4920416 142.108648,29.3543962 L142.108136,29.353884 C141.843521,29.4737385 141.555361,29.5362267 141.264643,29.5362267 C140.134014,29.5362267 139.217329,28.6188788 139.217329,27.4874318 L139.217329,3.9175828 C139.217329,2.7861358 138.300644,1.86878787 137.170015,1.86878787 L122.83882,1.86878787 L122.83882,59.2350457 C122.83882,77.339222 137.504239,92.0157644 155.595838,92.0157644 C173.687437,92.0157644 188.352857,77.339222 188.352857,59.2350457 C188.352857,41.1308694 173.687437,26.4543269 155.595838,26.4543269 M48.0811613,85.7971597 L48.0832087,85.7986963 L41.9187472,75.1065478 L41.9151644,75.1085965 C41.3936113,74.2045658 40.2762898,73.8378315 39.3207062,74.2562979 C37.3112678,75.1367675 35.091468,75.6254051 32.7570186,75.6254051 C23.711475,75.6254051 16.3785093,68.2871339 16.3785093,59.2350457 L16.3785093,44.8934812 C16.3785093,43.7620342 17.295194,42.8446863 18.425823,42.8446863 L38.8989596,42.8446863 C40.0295885,42.8446863 40.9462732,41.9273384 40.9462732,40.7958914 L40.9462732,28.5036341 C40.9462732,27.3716749 40.0295885,26.4543269 38.8989596,26.4543269 L18.425823,26.4543269 C17.295194,26.4543269 16.3785093,25.536979 16.3785093,24.405532 L16.3785093,3.9170706 C16.3785093,2.7861358 15.4618246,1.86878787 14.3311956,1.86878787 L0,1.86878787 L0,59.2350457 C0,77.339222 14.6659314,92.0157644 32.7570186,92.0157644 C37.9459351,92.0157644 42.8528341,90.808512 47.2131003,88.6593262 C48.2275443,88.1594202 48.6446844,86.9311676 48.1446281,85.9159898 C48.1251786,85.8755261 48.1036818,85.8360868 48.0811613,85.7971597 M112.602251,26.4543269 L98.2710558,26.4543269 L98.2710558,59.2350457 C98.2710558,68.2871339 90.93809,75.6254051 81.8925465,75.6254051 C72.8470029,75.6254051 65.5140372,68.2871339 65.5140372,59.2350457 L65.5140372,28.5031219 C65.5140372,27.3716749 64.5973525,26.4543269 63.4667235,26.4543269 L49.1355279,26.4543269 L49.1355279,59.2350457 C49.1355279,77.339222 63.8014593,92.0157644 81.8925465,92.0157644 C99.9836336,92.0157644 114.649565,77.339222 114.649565,59.2350457 L114.649565,28.5031219 C114.649565,27.3716749 113.73288,26.4543269 112.602251,26.4543269 M204.731366,1.86878787 C200.208338,1.86878787 196.542112,5.53766738 196.542112,10.0639676 C196.542112,14.5902677 200.208338,18.2591473 204.731366,18.2591473 C209.254394,18.2591473 212.920621,14.5902677 212.920621,10.0639676 C212.920621,5.53766738 209.254394,1.86878787 204.731366,1.86878787" fill="currentcolor" transform="translate(0 -1)"></path>
                                </svg>
                            </a>
                        </div>
                        <div className="_23TJ8"></div>
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2 socialTray">
                            <div className="socialLinkContainer">
                                <div className="footerSLWrapper">
                                    <a href="https://www.facebook.com" rel="noopener" target="_blank" className="linkButton footerFacebook">
                                        <svg className="svgIcon facebookIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style={{ fill: 'currentcolor' }}>
                                            <path fill="currentColor" fillRule="evenodd" d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z"></path>
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com" rel="noopener" target="_blank" className="linkButton footerInsta">
                                        <svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style={{ fill: 'currentcolor' }}>
                                            <g fill="currentColor" fillRule="evenodd">
                                                <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.087.278 3.45.525c-.658.256-1.216.598-1.772 1.153C1.123 2.234.78 2.792.525 3.45.278 4.086.11 4.812.06 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.05 1.065.218 1.79.465 2.428.256.658.598 1.216 1.153 1.77.556.558 1.114.9 1.772 1.155.636.248 1.363.417 2.427.464 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.064-.048 1.79-.217 2.428-.465.658-.255 1.216-.597 1.77-1.154.558-.554.9-1.112 1.155-1.77.248-.636.417-1.362.464-2.427.048-1.066.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.048-1.065-.217-1.79-.465-2.427-.255-.658-.597-1.216-1.154-1.772-.554-.555-1.112-.897-1.77-1.153C15.915.278 15.188.11 14.124.06 13.057.012 12.716 0 10 0m0 2c2.606 0 2.914.01 3.943.057.952.044 1.468.202 1.812.336.455.177.78.39 1.123.73.34.34.552.667.73 1.12.133.346.292.862.335 1.814C17.99 7.087 18 7.394 18 10s-.01 2.914-.057 3.943c-.043.952-.202 1.468-.335 1.812-.178.455-.39.78-.73 1.123-.343.34-.668.552-1.123.73-.344.133-.86.292-1.812.335-1.03.047-1.337.057-3.943.057s-2.914-.01-3.943-.057c-.952-.043-1.468-.202-1.813-.335-.454-.178-.78-.39-1.12-.73-.342-.343-.554-.668-.73-1.123-.135-.344-.293-.86-.337-1.812C2.01 12.913 2 12.606 2 10s.01-2.914.057-3.943c.044-.952.202-1.468.336-1.813.177-.454.39-.78.73-1.12.34-.342.667-.554 1.12-.73.346-.135.862-.293 1.814-.337C7.087 2.01 7.394 2 10 2"></path>
                                                <path d="M10 13c-1.657 0-3-1.343-3-3 0-1.656 1.343-3 3-3s3 1.344 3 3c0 1.657-1.343 3-3 3m0-8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m6 0c0 .553-.447 1-1 1-.553 0-1-.447-1-1 0-.553.447-1 1-1 .553 0 1 .447 1 1"></path>
                                            </g>
                                        </svg>
                                    </a>
                                    <a href="https://twitter.com" rel="noopener" target="_blank" className="linkButton footerTwitter">
                                        <svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 17" style={{ fill: 'currentcolor' }}>
                                            <path d="M6 17c7.837 0 11.965-6.156 12-11-.035-.67-.035-.844 0-1 .756-.59 1.45-1.297 2-2-.75.218-1.543.433-2 1 .5-.978 1.14-1.77 1-3-.358.763-1.24 1.095-2 1C15.29.647 12.69.568 11 2c-1.03 1.084-1.48 2.555-1 4-3.45-.204-6.524-1.74-9-4C.303 3.584.86 5.945 3 7c-.99.11-1.63-.062-2 0-.2 1.6 1.178 3.255 3 4-.512-.202-1.146-.178-2 0 .777 1.35 2.318 2.478 4 3-1.38.635-3.175 1.246-5 1-.35.244-.675.223-1 0 1.877 1.37 4.06 2 6 2" fill="currentColor" fillRule="evenodd"></path>
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com" rel="noopener" target="_blank" className="linkButton footerLinkedIn">
                                        <svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 15" style={{ fill: 'currentcolor' }}>
                                            <path d="M13.89 0H1.11A1.1 1.1 0 0 0 0 1.08v12.84A1.1 1.1 0 0 0 1.11 15h12.78A1.1 1.1 0 0 0 15 13.92V1.08A1.1 1.1 0 0 0 13.89 0zM4 13H2V5h2zm0-9H2V2h2zm9 9h-2.24V9.2c0-.91 0-2.07-1.17-2.07s-1.35 1-1.35 2V13H6V5.19h2.15v1.07A2.33 2.33 0 0 1 10.31 5C12.58 5 13 6.62 13 8.72z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row footerSeperator">
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2 footerLine"></div>
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2 footerLine"></div>
                    </div>
                    <div className="row footerMenu">
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
                            <ul className="footerMenuContainer">
                                <li className="footerMenuHead">COMPANY</li>
                                <li> <a href="/aboutus" rel="noopener" target="_self" className="linkButton">About Us</a></li>
                                <li> <a href="#" rel="noopener" target="_self" className="linkButton">Careers</a></li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
                            <ul className="footerMenuContainer">
                                <li className="footerMenuHead">SUPPORT</li>
                                <li><a className="linkButton" href="#">Contact Support</a></li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Help Center</a></li>
                                <li><a className="linkButton" href="#">Supported Devices</a></li>
                                <li><a className="linkButton" href="#">Activate Your Device</a></li>
                            </ul>
                        </div>
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
                            <ul className="footerMenuContainer">
                                <li className="footerMenuHead">PARTNERS</li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Advertise with Us</a></li>
                                <li><a className="linkButton" href="#">Partner with Us</a></li>
                            </ul>
                        </div>
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
                            <ul className="footerMenuContainer">
                                <li className="footerMenuHead">GET THE APPS</li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">iOS</a></li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Android</a></li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Roku</a></li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Amazon Fire</a></li>
                            </ul>
                        </div>
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
                            <ul className="footerMenuContainer">
                                <li className="footerMenuHead">PRESS</li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Press Releases</a></li>
                                <li><a href="#" rel="noopener" target="_self" className="linkButton">Tubi in the News</a></li>
                            </ul>
                        </div>
                        <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2">
                            <ul className="footerMenuContainer">
                                <li className="footerMenuHead">LEGAL</li>
                                <li><a className="linkButton" href="#">Privacy Policy (Updated)</a></li>
                                <li><a className="linkButton" href="#">Terms of Use (Updated)</a></li>
                                <li><a className="linkButton" href="#">Do Not Sell My Personal Information</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <FooterInfo />
            </div>
        )
    }
}
export default Footer;