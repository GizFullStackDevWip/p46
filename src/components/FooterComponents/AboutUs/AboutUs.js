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
																	{/*  digital platform dedicated to streaming content of interest made by and for the LGBTQ+ community.  */}
																	<h1>HappiTV<span>
																	HappiTV is streaming service dedicated to sharing empowering and captivating stories showcasing the LGBTQ+ experience. Featuring a wide-reaching carefully curated collection of inclusive feature films and TV series, visionary documentary style and short form content, happiTV serves as an anchor for positive models and messages for the queer population. happiTV is a place where our community can find powerful entertainment and educational resources that will better their lives. We are a 100% minority owned and operated enterprise (LGBTQ+ and Latino) based in the United States of America. Please help support our sponsors and enjoy the amazing work of our partners and creatives. We can bring big smiles to those around the world. That's what we are all about. We are happiTV.
																		</span></h1> </div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
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
