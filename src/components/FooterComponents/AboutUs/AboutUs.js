import React, { useState, useEffect } from "react";
import $ from "jquery";
const AboutUs = () => {
  window.scrollTo(0, 0);
  useEffect(() => {
    $(".menuItemContainer").addClass("menuClose");
  }, []);
  return (
    <div>
      <div className="pageWrapper">
        <div className="topContainer">
          <div className="menuCloseJS closeMenuWrapper">
            <div id="content" className="site-content">
              <div id="primary" className="content-area">
                <main id="main" className="site-main">
                  <article
                    id="post-39"
                    className="post-39 page type-page status-publish hentry"
                  >
                    <div className="entry-content" id="entry-content">
                      <div className="vc_row wpb_row vc_row-fluid vc_custom_1584031025503 bb_custom_1584031025503">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner">
                            <div className="wpb_wrapper">
                              <div className=" discover-header">
                                <div
                                  id="main-bg"
                                  className="main-bg"

                                ></div>
                                <div className="header-content" >
                                  <div className="Newheader-content" id="Newheader-content" >
                                    
                                    <div id=""> <p>   Project Forty-Six is a conservative news and information service that was
                                      created to combat censorship and circumvent the chokehold Big-Tech has on entry to the public square.</p>

                                      <p>Our goal is to provide insight into Oklahoma’s most pressing social and political issues.We bring you
                                        original content, in-depth interviews, and inside information you will not find anywhere else. Our focus
                                        is to maximize awareness of the issues that matter most to you and those that you can affect the most.</p>

                                      <p>Project Forty-Six aims to offer you content that provides you with the information you need at the local level.
                                        What happens in our communities matters so much more than what’s going on in DC.</p>

                                      <p>We will keep you engaged and informed at the State Capitol, at School Board meetings, and at City Council meetings.
                                        Wherever public policy is being decided, Project Forty-Six will bring you to the frontlines of every battlefield.</p>

                                      <p>Conservatives must be informed and engaged at every level of Oklahoma politics.
                                        The values we cherish in Oklahoma — life, liberty, and the pursuit of happiness — are under a coordinated attack
                                        by Marxist radicals who intend to destroy every American institution. The legacy media refuses to acknowledge or
                                        address this crisis — so we are stepping up.</p>
                                      <p>We invite you to enjoy our free content and we encourage you to subscribe. A monthly subscription will give you access 
                                        to exclusive interviews, insightful articles from Oklahoma’s leading conservatives, and you will help support a critical public
                                         service — a conservative source for Oklahoma news and information</p>
                                         <p>Being engaged and informed is a charge that Conservatives MUST adhere to, especially Oklahoma Conservatives. We have an obligation to keep our GREAT state RED and ensure it does not fall into the hands of the radical Left like we have witnessed in other states over the years.

                                           This is a FIGHT, a fight against Big Tech and a complicit media that has lost credibility.</p>

                                           <p>Being engaged and informed is a charge that Conservatives MUST adhere to, especially Oklahoma Conservatives. We have an obligation to keep our GREAT state RED and ensure it does not fall into the hands of the radical Left like we have witnessed in other states over the years.

                                   This is a FIGHT, a fight against Big Tech and a complicit media that has lost credibility.</p>

                                  <h1>Who is Behind Project Forty-Six?</h1>







                                    </div>







                                  </div>
                                  {/* </div> */}
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
															<div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1581433887497 container discover-content">
																<div className="wpb_wrapper">
																	<h3 style={{ textAlign: 'center' }}>Our Values</h3>
																	<p><span lang="EN">We care deeply about our culture. The five values below serve as the guiding principles for everything we do.</span></p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="vc_row wpb_row vc_row-fluid w_780 vc_custom_1581604165920 bb_custom_1581604165921">
												<div className="wpb_column vc_column_container vc_col-sm-12">
													<div className="vc_column-inner">
														<div className="wpb_wrapper">
															<div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text vc_custom_1581604145187  vc_custom_1581604145187 container w_870">
																<span className="vc_sep_holder vc_sep_holder_l">
																	<span style={{ borderColor: '#dde1e4' }} className="vc_sep_line"></span>
																</span>
																<span className="vc_sep_holder vc_sep_holder_r">
																	<span style={{ borderColor: '#dde1e4' }} className="vc_sep_line"></span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div> */}
                      {/* <div className="vc_row wpb_row vc_row-fluid">
												<div className="wpb_column vc_column_container vc_col-sm-12">
													<div className="vc_column-inner">
														<div className="wpb_wrapper">
															<div className="discover-service-list-wrapper ">
																<div className="wpb_text_column wpb_content_element  small w_870 b-border  container discover-service-list">
																	<div className="wpb_wrapper">
																		<div className="service-item "> <img src={require('../../../images/aboutus/team-first.png')} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Team First</h5>
																				<p style={{ color: '#707c86' }}>At Boondock Nation, our biggest success' have come when we work together.</p>
																			</div>
																		</div>
																		<div className="service-item "> <img src={require("../../../images/aboutus/act-with-integrity.png")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Act With Integrity</h5>
																				<p style={{ color: '#707c86' }}>discoveres believe that doing the right thing for the right reasons will always further the long-term health of our business and community.</p>
																			</div>
																		</div>
																		<div className="service-item "> <img src={require("../../../images/aboutus/grow-yourself.png")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Grow Yourself</h5>
																				<p style={{ color: '#707c86' }}>Today's version of you should be a slight improved version of yesterday's.</p>
																			</div>
																		</div>
																		<div className="service-item "> <img src={require("../../../images/aboutus/deliver-delight.png")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Deliver Delight</h5>
																				<p style={{ color: '#707c86' }}>In all we do, discoveres deliver delight passionately – whether that's in content, technology, customer experience or onboarding.</p>
																			</div>
																		</div>
																		<div className="service-item "> <img src={require("../../../images/aboutus/own-it.png")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Own It</h5>
																				<p style={{ color: '#707c86' }}>Owners do what is right for the team, help empower others and trust their teammates to do the same.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div> */}
                      <div className="vc_row wpb_row vc_row-fluid w_780 vc_custom_1581604732503 bb_custom_1581604732504">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner">
                            <div className="wpb_wrapper">
                              <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text vc_custom_1581604676832  vc_custom_1581604676832 container w_870">
                                <span className="vc_sep_holder vc_sep_holder_l">
                                  <span
                                    style={{ borderColor: "#dde1e4" }}
                                    className="vc_sep_line"
                                  ></span>
                                </span>
                                <span className="vc_sep_holder vc_sep_holder_r">
                                  <span
                                    style={{ borderColor: "#dde1e4" }}
                                    className="vc_sep_line"
                                  ></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="vc_row wpb_row vc_row-fluid">
												<div className="wpb_column vc_column_container vc_col-sm-12">
													<div className="vc_column-inner">
														<div className="wpb_wrapper">
															<div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1586980076062 container discover-content">
																<div className="wpb_wrapper">
																	<h3 style={{ textAlign: 'center' }}>Coverage</h3>
																	<p>Headquartered in San Francisco, Boondock Nation is available in the US, Canada, Australia and New Zealand and can be accessed on over 25 devices – the most of any AVOD service.</p>
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
                              <div className="wpb_single_image wpb_content_element vc_align_center container">
                                <figure className="wpb_wrapper vc_figure ">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey">
                                    {/* <img width="640" height="316" src={require('../../../images/aboutus/map3-1.png')}
																		 className="vc_single_image-img attachment-large" alt="" /> */}
                                  </div>
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="vc_row wpb_row vc_row-fluid w_780 vc_custom_1581604809853 bb_custom_1581604809853">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner">
                            <div className="wpb_wrapper">
                              <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text vc_custom_1581604759122  vc_custom_1581604759122 container w_870">
                                <span className="vc_sep_holder vc_sep_holder_l">
                                  <span
                                    style={{ borderColor: "#dde1e4" }}
                                    className="vc_sep_line"
                                  ></span>
                                </span>
                                <span className="vc_sep_holder vc_sep_holder_r">
                                  <span
                                    style={{ borderColor: "#dde1e4" }}
                                    className="vc_sep_line"
                                  ></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </article>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
