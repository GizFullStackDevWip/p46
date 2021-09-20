import React, { useState, useEffect } from 'react';
import $ from 'jquery';
const AboutUs = () => {
	window.scrollTo(0, 0);
	useEffect(() => {
		$('.menuItemContainer').addClass('menuClose');
	}, []);
	return (
		<div>
			<div className="pageWrapper">
				<div className="topContainer">
					<div className="menuCloseJS closeMenuWrapper">
						<div id="content" className="site-content">
							<div id="primary" className="content-area">
								<main id="main" className="site-main">
									<article id="post-39" className="post-39 page type-page status-publish hentry">
										<div className="entry-content">
											<div className="vc_row wpb_row vc_row-fluid vc_custom_1584031025503 bb_custom_1584031025503">
												<div className="wpb_column vc_column_container vc_col-sm-12">
													<div className="vc_column-inner">
														<div className="wpb_wrapper">
															<div className=" happi-header">
																<div id="main-bg" className="main-bg" style={{ top: '0px' }}></div>
																<div className="header-content">
																	<h1>HappiTV<span>
																		HappiTV is a new entertainment app dedicated to streaming content of interest to the LGBTQ+ community. Featuring Feature films, TV series, Non-fiction or short form videos,  HappiTV serves as an anchor for positive role models and powerful messages for the queer population. HappiTV is a place where the community can find powerful entertainment and resources that will better their lives.

																		We are a 100% minority owned and operated enterprise (LGBTQ+ and Latino) in the United Stated of America.

																		Please patronize our sponsors and enjoy the work of our partners and creatives. Together, we can bring smiles and big grins around the world. That's what we are all about. We are HappiTV.
																		</span></h1> </div>
															</div>
														</div>
													</div>
												</div>
											</div>
											{/* <div className="vc_row wpb_row vc_row-fluid">
												<div className="wpb_column vc_column_container vc_col-sm-12">
													<div className="vc_column-inner">
														<div className="wpb_wrapper">
															<div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1581433887497 container happi-content">
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
															<div className="happi-service-list-wrapper ">
																<div className="wpb_text_column wpb_content_element  small w_870 b-border  container happi-service-list">
																	<div className="wpb_wrapper">
																		<div className="service-item "> <img src={require('../../../images/aboutus/team-first.png')} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Team First</h5>
																				<p style={{ color: '#707c86' }}>At HappiTV, our biggest success' have come when we work together.</p>
																			</div>
																		</div>
																		<div className="service-item "> <img src={require("../../../images/aboutus/act-with-integrity.png")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Act With Integrity</h5>
																				<p style={{ color: '#707c86' }}>happies believe that doing the right thing for the right reasons will always further the long-term health of our business and community.</p>
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
																				<p style={{ color: '#707c86' }}>In all we do, happies deliver delight passionately – whether that's in content, technology, customer experience or onboarding.</p>
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
																	<span style={{ borderColor: '#dde1e4' }} className="vc_sep_line">
																	</span>
																</span>
																<span className="vc_sep_holder vc_sep_holder_r">
																	<span style={{ borderColor: '#dde1e4' }} className="vc_sep_line"></span>
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
															<div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1586980076062 container happi-content">
																<div className="wpb_wrapper">
																	<h3 style={{ textAlign: 'center' }}>Coverage</h3>
																	<p>Headquartered in San Francisco, HappiTV is available in the US, Canada, Australia and New Zealand and can be accessed on over 25 devices – the most of any AVOD service.</p>
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
															<div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text vc_custom_1581604759122  vc_custom_1581604759122 container w_870"><span className="vc_sep_holder vc_sep_holder_l"><span style={{ borderColor: '#dde1e4' }} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r"><span style={{ borderColor: '#dde1e4' }} className="vc_sep_line"></span></span>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div id="half-page-position" className="vc_row wpb_row vc_row-fluid vc_custom_1596013627396 bb_custom_1596013627397">
												<div className="wpb_column vc_column_container vc_col-sm-12">
													<div className="vc_column-inner">
														<div className="wpb_wrapper">
															<div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1581604390850 container happi-content">
																<div className="wpb_wrapper">
																	<h3 style={{ textAlign: 'center' }}>Leadership</h3>
																	<div id="gtx-trans" style={{ position: 'absolute', left: '-14px', top: '39.4375px' }}>
																		<div className="gtx-trans-icon"></div>
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
															<div className="happi-service-list-wrapper ">
																<div className="wpb_text_column wpb_content_element  small w_870 b-border  leadership container happi-service-list">
																	<div className="wpb_wrapper">
																		<div className="service-item "> <img src={require("../../../images/aboutus/DanielBort.jpg")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Daniel Bort</h5>
																				<span style={{ color: '#707c86' }}>Acquisitions</span><br />
																				<span>Daniel@gethappi.tv</span>
																			</div>
																		</div>
																		<div className="service-item "> <img src={require("../../../images/aboutus/DanielBerilla.jpg")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Daniel Berilla</h5>
																				<span style={{ color: '#707c86' }}>Marketing</span><br />
																				<span>Daniel.berilla@gethappi.tv</span>
																			</div>
																		</div>
																		<div className="service-item "> <img src={require("../../../images/aboutus/RafaelGavioli.jpg")} alt="" style={{ width: '100%' }} />
																			<div>
																				<h5 style={{ color: '#26262d' }}>Rafael Gavioli</h5>
																				<span style={{ color: '#707c86' }}>Operations</span><br />
																				<span>Rafael@gethappi.tv</span>
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
															<div className="wpb_text_column wpb_content_element    container happi-footer">
																<div className="wpb_wrapper">
																	<hr />
																	<p>The provided agreements on HappiTv are for informational purposes only and do not constitute legal advice.</p>
																</div>
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
}
export default AboutUs;
