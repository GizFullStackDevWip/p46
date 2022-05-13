import React, { useState, useEffect } from 'react';
import Header from '../../Basic/Header';
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
				{/* <Header /> */}
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
																	<h1>RunwayTV<span>
																	RUNWAY® TV is lifestyle brand which includes a state of the art geolocation work application, a TV station and a premiere quarterly print high fashion and celebrity review magazine with a focus on runway shows and designers from around the world. Book a talent to come work for you, read about the newest celebrity news and see our picks from the world's top runway collections and read up on beauty & fashion tips all in one place.																		</span></h1> </div>
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
																{/* <div className="wpb_wrapper">
																	<h3 style={{ textAlign: 'center' }}>Leadership</h3>
																	<div id="gtx-trans" style={{ position: 'absolute', left: '-14px', top: '39.4375px' }}>
																		<div className="gtx-trans-icon"></div>
																	</div>
																</div> */}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="vc_row wpb_row vc_row-fluid">
												<div className="wpb_column vc_column_container vc_col-sm-12">
													<div className="vc_column-inner">
														<div className="wpb_wrapper">
															{/* <div className="happi-service-list-wrapper ">
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
															</div> */}
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
																	<p>The provided agreements on RunwayTV are for informational purposes only and do not constitute legal advice.</p>
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
