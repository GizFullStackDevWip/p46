import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';

const Contact = () => {
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="menuCloseJS closeMenuWrapper">
            <div id="content" className="site-content page-id-41">
                <div id="primary" className="content-area">
                    <main id="main" className="site-main">
                        <article id="post-41" className="post-41 page type-page status-publish hentry">
                            <div className="entry-content">
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className=" vc_custom_1580990739237 tubi-header">
                                                    <div id="main-bg" className="main-bg"></div>
                                                    <div className="header-content">
                                                        <h1>Contact Us</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  normal normal  vc_custom_1580990865321 container tubi-content">
                                                    <div className="wpb_wrapper">
                                                        <h3 style={{ textAlign: 'center' }}>Our Locations</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  vc_custom_1581596471221 container w_870 tabs-border g-maps tubi-tab-list-tabs tubi-tab-list mobile-select done" id="tab-list-1">
                                                    <div className="wpb_wrapper">
                                                        <form>
                                                            <fieldset className="filter">
                                                                <div className="form-field select-field">
                                                                    <div className="tab-select-wrapper tubi-select" tabIndex="1">
                                                                        <div className="select-selected" data-event="null">San Francisco (HQ)</div>
                                                                        <div className="select-items select-hide">
                                                                            <div className="same-as-selected">San Francisco (HQ)</div>
                                                                            <div>Chicago</div>
                                                                            <div>Los Angeles</div>
                                                                            <div>New York</div>
                                                                            <div>Beijing, China</div>
                                                                        </div>
                                                                        <select name="tab-list-filter">
                                                                            <option value="#tab-item-1-1">San Francisco (HQ)</option>
                                                                            <option value="#tab-item-1-2">Chicago</option>
                                                                            <option value="#tab-item-1-3">Los Angeles</option>
                                                                            <option value="#tab-item-1-4">New York</option>
                                                                            <option value="#tab-item-1-5">Beijing, China</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        </form>
                                                        <div className="tab-list-outher" style={{ height: '40px' }}>
                                                            <div className="drag-container" style={{ height: '40px', width: '980px', left: '-55px' }}>
                                                                <div className="drag ui-draggable ui-draggable-handle" style={{ left: '55px' }}><span style={{ width: '188px', left: '0px' }}></span>
                                                                    <div className="separator"><span></span><span></span><span></span><span></span><span></span></div>
                                                                    <ul className="tab-list">
                                                                        <li><a href="#" className="on">San Francisco (HQ)</a></li>
                                                                        <li><a href="#" className="">Chicago</a></li>
                                                                        <li><a href="#" className="">Los Angeles</a></li>
                                                                        <li><a href="#" className="">New York</a></li>
                                                                        <li><a href="#" className="">Beijing, China</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tubi-tab-item on" id="tab-item-1-1">
                                                            <div className="wpb_wrapper">
                                                                <h3>San Francisco (HQ)</h3>
                                                                <div className="wpb_single_image wpb_content_element vc_align_center container">
                                                                    <figure className="wpb_wrapper vc_figure ">
                                                                        <a href="http://www.google.com/maps/place/315+Montgomery+St,+San+Francisco,+CA+94104/@37.7921352,-122.4051841,17z/data=!3m1!4b1!4m5!3m4!1s0x8085808a17929195:0xfbda687154d7778c!8m2!3d37.7921352!4d-122.4029901" target="_blank" className="vc_single_image-wrapper   vc_box_border_grey">
                                                                            <img width="1772" height="944" src={require('../../../images/contact/tubi-san-francisco.png')} className="vc_single_image-img attachment-full" alt="" /></a>
                                                                    </figure>
                                                                </div>
                                                                <div className="wpb_text_column wpb_content_element  normal normal  container tubi-content">
                                                                    <div className="wpb_wrapper">
                                                                        <p>Address 7155 Hawthorn Ave apt 5,
                                                                                <br />  Los Angeles,
                                                                                <br /> CA - 90046</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tubi-tab-item" id="tab-item-1-2">
                                                            
                                                        </div>
                                                        <div className="tubi-tab-item" id="tab-item-1-3">
                                                            <div className="wpb_wrapper">
                                                                <h3>Los Angeles</h3>
                                                                <div className="wpb_single_image wpb_content_element vc_align_center container">
                                                                    <figure className="wpb_wrapper vc_figure ">
                                                                        <a href="http://goo.gl/maps/MyhgrhmYjjbwv7eg7" target="_blank" className="vc_single_image-wrapper   vc_box_border_grey">
                                                                            <img width="1772" height="944" src={require('../../../images/contact/tubi-los-angeles.png')} className="vc_single_image-img attachment-full" alt="" /></a>
                                                                    </figure>
                                                                </div>
                                                                <div className="wpb_text_column wpb_content_element  normal normal  container tubi-content">
                                                                    <div className="wpb_wrapper">
                                                                        <p>Los Angeles
                                                                                <br /> 10250 Constellation Blvd, Floor 23
                                                                                <br /> Los Angeles, CA 90067</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tubi-tab-item" id="tab-item-1-4">
                                                            <div className="wpb_wrapper">
                                                                <h3>New York</h3>
                                                                <div className="wpb_single_image wpb_content_element vc_align_center container">
                                                                    <figure className="wpb_wrapper vc_figure ">
                                                                        <a href="http://goo.gl/maps/wfd7JfbPRTWBKfZD6" target="_blank" className="vc_single_image-wrapper   vc_box_border_grey">
                                                                            <img width="1772" height="944" src={require('../../../images/contact/tubi-ny.png')} className="vc_single_image-img attachment-full" alt="" /></a>
                                                                    </figure>
                                                                </div>
                                                                <div className="wpb_text_column wpb_content_element  normal normal  container tubi-content">
                                                                    <div className="wpb_wrapper">
                                                                        <p>New York
                                                                                <br /> 530 7th Avenue, Suite #2801
                                                                                <br /> New York, NY 10018</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tubi-tab-item" id="tab-item-1-5">
                                                            <div className="wpb_wrapper">
                                                                <h3>Beijing, China</h3>
                                                                <div className="wpb_single_image wpb_content_element vc_align_center container">
                                                                    <figure className="wpb_wrapper vc_figure ">
                                                                        <a href="https://goo.gl/maps/nCdFWTxfoBjWUbU78" target="_blank" className="vc_single_image-wrapper   vc_box_border_grey">
                                                                            <img width="1772" height="944" src={require('../../../images/contact/bejing.png')} className="vc_single_image-img attachment-full" alt="HappiTv's Bejing office" /></a>
                                                                    </figure>
                                                                </div>
                                                                <div className="wpb_text_column wpb_content_element  normal normal  container tubi-content">
                                                                    <div className="wpb_wrapper">
                                                                        <div>Beijing, China</div>
                                                                        <div>Donghuang Bldg. Guangshun S. Street, 16</div>
                                                                        <div>Room 19110, 19th Floor</div>
                                                                        <div>Beijing, China 100096</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1580991299191 container tubi-content">
                                                    <div className="wpb_wrapper">
                                                        <h3 style={{ textAlign: 'center' }}>Get in Touch</h3>
                                                        <p>Review the contact options below to ensure we get your information to the right member of our team.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid container w_870 middle-border vc_custom_1580992849222">
                                    {/* <div className="wpb_column vc_column_container vc_col-sm-6">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  small_14 normal  container tubi-content">
                                                    <div className="wpb_wrapper">
                                                        <h6 style={{ textAlign: 'center' }}>Visit Our Careers Page</h6>
                                                        <p style={{ textAlign: 'center' }}>Looking for a job at HappiTv?
                                                                <br /> <a className="contact-us-touch-link" title="Career" href="careers.html">Click here.</a></p>
                                                    </div>
                                                </div>
                                                <div className="wpb_text_column wpb_content_element  small_14 normal  container tubi-content">
                                                    <div className="wpb_wrapper">
                                                        <h6 style={{ textAlign: 'center' }}>Press Inquiries</h6>
                                                        <p style={{ textAlign: 'center' }}>Are you a member of the media?
                                                                <br /> <a className="contact-us-touch-link" title="Press Inquiries" href="mailto:pr@tubi.tv">Click here.</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="wpb_column vc_column_container vc_col-sm-6">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  small_14 normal  container tubi-content">
                                                    <div className="wpb_wrapper">
                                                        <h6 style={{ textAlign: 'center' }}>Submit Your Content</h6>
                                                        <p style={{ textAlign: 'center' }}>Follow the instructions <a className="contact-us-touch-link" title="Content Submission" href="#">here</a>.</p>
                                                        <div id="gtx-trans" style={{ position: 'absolute', left: '361px', top: '39.9375px' }}>
                                                            <div className="gtx-trans-icon"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="wpb_text_column wpb_content_element  small_14 normal  vc_custom_1587428376968 container tubi-content">
                                                    <div className="wpb_wrapper">
                                                        <h6 style={{ textAlign: 'center' }}>Advertise With Us</h6> </div>
                                                </div>
                                                <div className="modal-popup-box" data-bodybg="rgba(0,0,0,0.39)" style={{ textAlign: 'center' }}>
                                                    <button className="model-popup-btn popup-176" data-id="popup-176" style={{ color: '#26262d', borderRadius: '2px', fontSize: '14px', padding: '14px 61px}' }}>
                                                        <i style={{ paddingRight: '5px' }} className="fa " aria-hidden="true"> </i> Get in Touch With a Sales Rep </button>
                                                </div>
                                                {/* <style>
                                                    .modal-popup-box .popup-176:hover {
                                                        color: #26262d !important;
                                                        background: !important;
                                                    }
                                                    </style> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  b-color-border white small  vc_custom_1596100857685 container tubi-text-banner">
                                                    <div className="wpb_wrapper">
                                                        <h4>Need additional help?</h4>
                                                        <p>Contact our support team for any other HappiTv questions.</p>
                                                        <a className="btn support-link"
                                                            onClick={() => {
                                                                history.push(
                                                                    { pathname: '/contactsupport' }
                                                                )
                                                            }}
                                                            title="Support" target="">
                                                            <span>Support</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element    container tubi-footer">
                                                    <div className="wpb_wrapper">
                                                        <hr />
                                                        <p>The provided agreements on gethappitv.com are for informational purposes only and do not constitute legal advice.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner vc_custom_1578648045732">
                                            <div className="wpb_wrapper"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </div>
    );
}
export default Contact;
