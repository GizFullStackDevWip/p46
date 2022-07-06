import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import $ from "jquery";
const Contact = () => {
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    $(".menuItemContainer").addClass("menuClose");
  }, []);
  return (
    <div className="menuCloseJS closeMenuWrapper">
      <div id="content" className="site-content page-id-41">
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <article
              id="post-41"
              className="post-41 page type-page status-publish hentry"
            >
              <div className="entry-content">
                <div className="vc_row wpb_row vc_row-fluid">
                  <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner">
                      <div className="wpb_wrapper">
                        <div className=" vc_custom_1580990739237 discover-header">
                          <div id="main-bg" className="main-bg"></div>
                          <div className="header-content">
                            <h1>Contact Us</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  normal normal  vc_custom_1580990865321 container discover-content">
                                                    <div className="wpb_wrapper">
                                                        <h3 style={{ textAlign: 'center' }}>Our Locations</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                {/* <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_text_column wpb_content_element  vc_custom_1581596471221 container w_870 tabs-border g-maps discover-tab-list-tabs discover-tab-list mobile-select done" id="tab-list-1">
                                                    <div className="wpb_wrapper">
                                                        <form>
                                                            <fieldset className="filter">
                                                                <div className="form-field select-field">
                                                                    <div className="tab-select-wrapper discover-select" tabIndex="1">
                                                                        <div className="select-selected" data-event="null">Los Angeles</div>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        </form>
                                                        <div className="tab-list-outher" style={{ height: '40px' }}>
                                                            <div className="drag-container" style={{ height: '40px', width: '980px', left: '-55px' }}>
                                                                <div className="drag ui-draggable ui-draggable-handle" style={{ left: '55px' }}><span style={{ width: '188px', left: '0px' }}></span>
                                                                    <ul className="tab-list">
                                                                        <li><a className="on">Los Angeles</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="discover-tab-item on" id="tab-item-1-1">
                                                            <div className="wpb_wrapper">
                                                                <h3>Los Angeles</h3>
                                                                <div className="wpb_single_image wpb_content_element vc_align_center container">
                                                                    <figure className="wpb_wrapper vc_figure ">
                                                                        <a href="https://www.google.com/maps/place/7155+Hawthorn+Ave+%235,+Los+Angeles,+CA+90028,+USA/@34.1001107,-118.3488095,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2bedf66b1afcb:0xa0254915ec63506a!8m2!3d34.1001107!4d-118.3466155" target="_blank" className="vc_single_image-wrapper   vc_box_border_grey">
                                                                            <img width="1772" height="944" src={require('../../../images/contact/discover-san-francisco.png')} className="vc_single_image-img attachment-full" alt="" /></a>
                                                                    </figure>
                                                                </div>
                                                                <div className="wpb_text_column wpb_content_element  normal normal  container discover-content">
                                                                    <div className="wpb_wrapper">
                                                                        <p>Address 7155 Hawthorn Ave apt 5,
                                                                                <br />  Los Angeles,
                                                                                <br /> CA - 90046</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                <div className="vc_row wpb_row vc_row-fluid">
                  <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner">
                      <div className="wpb_wrapper">
                        <div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1580991299191 container discover-content">
                          <div className="wpb_wrapper">
                            <h3 style={{ textAlign: "center" }}>
                              Get in Touch
                            </h3>
                            <p>
                              Review the contact options below to ensure we get
                              your information to the right member of our team.
                            </p>
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
                                                <div className="wpb_text_column wpb_content_element  small_14 normal  container discover-content">
                                                    <div className="wpb_wrapper">
                                                        <h6 style={{ textAlign: 'center' }}>Visit Our Careers Page</h6>
                                                        <p style={{ textAlign: 'center' }}>Looking for a job at Boondock Nation?
                                                                <br /> <a className="contact-us-touch-link" title="Career" href="careers.html">Click here.</a></p>
                                                    </div>
                                                </div>
                                                <div className="wpb_text_column wpb_content_element  small_14 normal  container discover-content">
                                                    <div className="wpb_wrapper">
                                                        <h6 style={{ textAlign: 'center' }}>Press Inquiries</h6>
                                                        <p style={{ textAlign: 'center' }}>Are you a member of the media?
                                                                <br /> <a className="contact-us-touch-link" title="Press Inquiries" href="mailto:pr@discover.tv">Click here.</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                  <div className="wpb_column vc_column_container vc_col-sm-6">
                    <div className="vc_column-inner">
                      <div className="wpb_wrapper">
                        <div className="wpb_text_column wpb_content_element  small_14 normal  container discover-content">
                          <div className="wpb_wrapper">
                            <h6 style={{ textAlign: "center" }}>
                              Submit Your Content
                            </h6>
                            <p style={{ textAlign: "center" }}>
                              Follow the instructions&nbsp;
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  history.push({ pathname: "/contactsupport" });
                                }}
                                className="contact-us-touch-link"
                                title="Content Submission"
                              >
                                <u>here</u>
                              </span>
                              .
                            </p>
                            <div
                              id="gtx-trans"
                              style={{
                                position: "absolute",
                                left: "361px",
                                top: "39.9375px",
                              }}
                            >
                              <div className="gtx-trans-icon"></div>
                            </div>
                          </div>
                        </div>
                        <div className="wpb_text_column wpb_content_element  small_14 normal  vc_custom_1587428376968 container discover-content">
                          <div className="wpb_wrapper">
                            <h6 style={{ textAlign: "center" }}>
                              Advertise With Us
                            </h6>{" "}
                          </div>
                        </div>
                        <div
                          className="modal-popup-box"
                          data-bodybg="rgba(0,0,0,0.39)"
                          style={{ textAlign: "center" }}
                        >
                          <button
                            className="model-popup-btn popup-176"
                            data-id="popup-176"
                            onClick={() => {
                              history.push({ pathname: "/contactsupport" });
                            }}
                            style={{
                              color: "#26262d",
                              borderRadius: "2px",
                              fontSize: "14px",
                              padding: "14px 61px}",
                            }}
                          >
                            <i
                              style={{ paddingRight: "5px" }}
                              className="fa "
                              aria-hidden="true"
                            >
                              {" "}
                            </i>{" "}
                            Get in Touch With a Sales Rep{" "}
                          </button>
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
                        <div className="wpb_text_column wpb_content_element  b-color-border white small  vc_custom_1596100857685 container discover-text-banner">
                          <div className="wpb_wrapper">
                            <h4>Need additional help?</h4>
                            <p>
                              Contact our support team for any other questions.
                            </p>
                            <a
                              className="btn support-link"
                              onClick={() => {
                                history.push({ pathname: "/contactsupport" });
                              }}
                              title="Support"
                              target=""
                            >
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
                        <div className="wpb_text_column wpb_content_element    container discover-footer">
                          <div className="wpb_wrapper">
                            <hr />
                            <p>
                              The provided agreements on ISG TV are for
                              informational purposes only and do not constitute
                              legal advice.
                            </p>
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
};
export default Contact;
