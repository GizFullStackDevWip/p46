import React, { useState, useEffect } from 'react';
import Header from '../../Basic/Header';
import Footer from '../../Basic/Footer';
const AboutUs =()=>{
    useEffect(() => {
    }, []);
    return(
        <div>
	<div className="pageWrapper">
		<div className="topContainer">
			<header className="headerMenu headerWhite headerGradient">
                <div className="screenContainer">
                    <div className="blackScreen">
                    </div>
                </div>
                <div className="container headerWrapper">
					<div className="logosection">
						<div className="logoContain">
							<div className="menuIcon" rel="nofollow"><span className="hamburger"></span></div>
							<div className="menuItemContainer menuClose">
                                <div className="menuWrapper">
                                    <div className="mobileSearch">
                                        <section className="searchContainer mobileSearchBG">
                                            <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{fill: 'currentcolor'}}>
                                                <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                            </svg>
                                            <form>
                                                <input className="searchInput" type="search" placeholder="Search" required="" value=""/>
                                            </form>
                                            <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{fill: 'currentcolor'}}>
                                                <path fill="currentColor" fill-rule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                                            </svg>
                                        </section>
                                    </div>
                                    <div className="menuRowItem">
                                        <div className="menuWrapperHeight" style={{height: '437px'}}>
                                            <div className="menuWidth20">
                                                <div className="menuCol">
                                                    <div className="menuItemHead">Popular</div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            <a className="linkButton headerMenuItems" href="#">Most Popular</a>
                                                            <a className="linkButton headerMenuItems" href="#">Recently Added</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="menuWidth20 menuBGcolor menuWidth40">
                                                <div className="menuCol">
                                                    <div className="menuItemHead">Genres</div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            <a className="linkButton headerMenuItems" href="#">Action</a>
                                                            <a className="linkButton headerMenuItems" href="#">Anime</a>
                                                            <a className="linkButton headerMenuItems" href="#">classNameics</a>
                                                            <a className="linkButton headerMenuItems" href="#">Comedy</a>
                                                            <a className="linkButton headerMenuItems" href="#">Crime TV</a>
                                                            <a className="linkButton headerMenuItems" href="#">Documentary</a>
                                                            <a className="linkButton headerMenuItems" href="#">Docuseries</a>
                                                            <a className="linkButton headerMenuItems" href="#">Drama</a>
                                                            <a className="linkButton headerMenuItems" href="#">Faith</a>
                                                            <a className="linkButton headerMenuItems" href="#">Family Movies</a>
                                                            <a className="linkButton headerMenuItems" href="#">Foreign Language Films</a>
                                                            <a className="linkButton headerMenuItems" href="#">Foreign Language TV</a>
                                                            <a className="linkButton headerMenuItems" href="#">Horror</a>
                                                            <a className="linkButton headerMenuItems" href="#">Indie Films</a>
                                                            <a className="linkButton headerMenuItems" href="#">Kids Shows</a>
                                                            <a className="linkButton headerMenuItems" href="#">LGBTQ</a>
                                                        </div>
                                                        <div className="innerMenuCol">
                                                            <a className="linkButton headerMenuItems" href="#">Lifestyle</a>
                                                            <a className="linkButton headerMenuItems" href="#">Martial Arts</a>
                                                            <a className="linkButton headerMenuItems" href="#">Music &amp; Musicals</a>
                                                            <a className="linkButton headerMenuItems" href="#">Para niños y familias</a>
                                                            <a className="linkButton headerMenuItems" href="#">Películas en Español</a>
                                                            <a className="linkButton headerMenuItems" href="#">Preschool</a>
                                                            <a className="linkButton headerMenuItems" href="#">Reality TV</a>
                                                            <a className="linkButton headerMenuItems" href="#">Romance</a>
                                                            <a className="linkButton headerMenuItems" href="#">Sci-fi &amp; Fantasy</a>
                                                            <a className="linkButton headerMenuItems" href="#">Sports Movies &amp; Shows</a>
                                                            <a className="linkButton headerMenuItems" href="#">Stand Up Comedy</a>
                                                            <a className="linkButton headerMenuItems" href="#">Telenovelas y series</a>
                                                            <a className="linkButton headerMenuItems" href="#">Thrillers</a>
                                                            <a className="linkButton headerMenuItems" href="#">TV Comedies</a>
                                                            <a className="linkButton headerMenuItems" href="#">TV Dramas</a>
                                                            <a className="linkButton headerMenuItems" href="#">Westerns</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="menuWidth20">
                                                <div className="menuCol">
                                                    <div className="menuItemHead">Collections</div>
                                                    <div className="menuListItems">
                                                        <div className="innerMenuCol">
                                                            <a className="linkButton headerMenuItems" href="#">Award Winners &amp; Nominees</a>
                                                            <a className="linkButton headerMenuItems" href="#">Bollywood Dreams</a>
                                                            <a className="linkButton headerMenuItems" href="#">Cult classNameics</a>
                                                            <a className="linkButton headerMenuItems" href="#">Highly Rated on Rotten Tomatoes</a>
                                                            <a className="linkButton headerMenuItems" href="#">Weekly Watchlist</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
							<a className="logoLink" href="#">
								<svg className="svgIcon iconColor brandLogo" preserveAspectRatio="xMidYMid meet" viewBox="0 0 213 92" style={{fill: 'currentcolor'}}>
									<path d="M210.873307,26.4543269 L196.542112,26.4543269 L196.542112,89.9669695 C196.542112,91.0984165 197.458796,92.0157644 198.589425,92.0157644 L210.873307,92.0157644 C212.003936,92.0157644 212.920621,91.0984165 212.920621,89.9669695 L212.920621,28.5031219 C212.920621,27.3716749 212.003936,26.4543269 210.873307,26.4543269 M155.595838,75.6254051 C146.550295,75.6254051 139.217329,68.2871339 139.217329,59.2350457 C139.217329,50.1829575 146.550295,42.8446863 155.595838,42.8446863 C164.641382,42.8446863 171.974348,50.1829575 171.974348,59.2350457 C171.974348,68.2871339 164.641382,75.6254051 155.595838,75.6254051 M155.595838,26.4543269 C150.78721,26.4543269 146.222213,27.4920416 142.108648,29.3543962 L142.108136,29.353884 C141.843521,29.4737385 141.555361,29.5362267 141.264643,29.5362267 C140.134014,29.5362267 139.217329,28.6188788 139.217329,27.4874318 L139.217329,3.9175828 C139.217329,2.7861358 138.300644,1.86878787 137.170015,1.86878787 L122.83882,1.86878787 L122.83882,59.2350457 C122.83882,77.339222 137.504239,92.0157644 155.595838,92.0157644 C173.687437,92.0157644 188.352857,77.339222 188.352857,59.2350457 C188.352857,41.1308694 173.687437,26.4543269 155.595838,26.4543269 M48.0811613,85.7971597 L48.0832087,85.7986963 L41.9187472,75.1065478 L41.9151644,75.1085965 C41.3936113,74.2045658 40.2762898,73.8378315 39.3207062,74.2562979 C37.3112678,75.1367675 35.091468,75.6254051 32.7570186,75.6254051 C23.711475,75.6254051 16.3785093,68.2871339 16.3785093,59.2350457 L16.3785093,44.8934812 C16.3785093,43.7620342 17.295194,42.8446863 18.425823,42.8446863 L38.8989596,42.8446863 C40.0295885,42.8446863 40.9462732,41.9273384 40.9462732,40.7958914 L40.9462732,28.5036341 C40.9462732,27.3716749 40.0295885,26.4543269 38.8989596,26.4543269 L18.425823,26.4543269 C17.295194,26.4543269 16.3785093,25.536979 16.3785093,24.405532 L16.3785093,3.9170706 C16.3785093,2.7861358 15.4618246,1.86878787 14.3311956,1.86878787 L0,1.86878787 L0,59.2350457 C0,77.339222 14.6659314,92.0157644 32.7570186,92.0157644 C37.9459351,92.0157644 42.8528341,90.808512 47.2131003,88.6593262 C48.2275443,88.1594202 48.6446844,86.9311676 48.1446281,85.9159898 C48.1251786,85.8755261 48.1036818,85.8360868 48.0811613,85.7971597 M112.602251,26.4543269 L98.2710558,26.4543269 L98.2710558,59.2350457 C98.2710558,68.2871339 90.93809,75.6254051 81.8925465,75.6254051 C72.8470029,75.6254051 65.5140372,68.2871339 65.5140372,59.2350457 L65.5140372,28.5031219 C65.5140372,27.3716749 64.5973525,26.4543269 63.4667235,26.4543269 L49.1355279,26.4543269 L49.1355279,59.2350457 C49.1355279,77.339222 63.8014593,92.0157644 81.8925465,92.0157644 C99.9836336,92.0157644 114.649565,77.339222 114.649565,59.2350457 L114.649565,28.5031219 C114.649565,27.3716749 113.73288,26.4543269 112.602251,26.4543269 M204.731366,1.86878787 C200.208338,1.86878787 196.542112,5.53766738 196.542112,10.0639676 C196.542112,14.5902677 200.208338,18.2591473 204.731366,18.2591473 C209.254394,18.2591473 212.920621,14.5902677 212.920621,10.0639676 C212.920621,5.53766738 209.254394,1.86878787 204.731366,1.86878787" fill="currentcolor" transform="translate(0 -1)"></path>
								</svg>
							</a>
						</div>
					</div>
					<section className="searchContainer searchBar">
						<svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{fill: 'currentcolor'}}>
							<path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
						</svg>
						<form>
							<input className="searchInput" type="search" placeholder="Find movies, TV shows and more" required="" value=""/>
						</form>
						<svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{fill: 'currentcolor'}}>
							<path fill="currentColor" fill-rule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
						</svg>
					</section>
					<div className="headerButton">
						<div className="loginButtonContainer">
							<ul>
								<li>
									<a className="" href="register.html">
										<button className="button buttonSecondary buttonBlock" tabindex="-1">
											<div className="buttonBg"></div>
											<div className="buttonContent">Register</div>
										</button>
									</a>
								</li>
								<li><a className="headerSignInButton" href="signin.html">Sign In</a></li>
							</ul>
						</div>
					</div>
				</div>
			</header>
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
                                                    <div className=" tubi-header">
                                                        <div id="main-bg" className="main-bg" style={{top: '0px'}}></div>
                                                        <div className="header-content">
                                                            <h1>TV Reimagined<span>Happi is the world’s largest ad-supported video on demand service with over 20,000 movies and television shows from nearly every major Hollywood studio. Tubi gives millions of viewers an easy way to discover new content, which is all available completely free.</span></h1> </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vc_row wpb_row vc_row-fluid">
                                        <div className="wpb_column vc_column_container vc_col-sm-12">
                                            <div className="vc_column-inner">
                                                <div className="wpb_wrapper">
                                                    <div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1581433887497 container tubi-content">
                                                        <div className="wpb_wrapper">
                                                            <h3 style={{textAlign: 'center'}}>Our Values</h3>
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
                                                        <span className="vc_sep_holder vc_sep_holder_l"><span style={{borderColor:'#dde1e4'}} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r">
                                                            <span style={{borderColor:'#dde1e4'}} className="vc_sep_line"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vc_row wpb_row vc_row-fluid">
                                        <div className="wpb_column vc_column_container vc_col-sm-12">
                                            <div className="vc_column-inner">
                                                <div className="wpb_wrapper">
                                                    <div className="tubi-service-list-wrapper ">
                                                        <div className="wpb_text_column wpb_content_element  small w_870 b-border  container tubi-service-list">
                                                            <div className="wpb_wrapper">
                                                                <div className="service-item "> <img src="./images/aboutus/team-first.png" alt="" style={{width:'100%'}}/>
                                                                    <div>
                                                                        <h5 style={{color: '#26262d'}}>Team First</h5>
                                                                        <p style={{color: '#707c86'}}>At Tubi, our biggest success' have come when we work together.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vc_row wpb_row vc_row-fluid w_780 vc_custom_1581604732503 bb_custom_1581604732504">
                                        <div className="wpb_column vc_column_container vc_col-sm-12">
                                            <div className="vc_column-inner">
                                                <div className="wpb_wrapper">
                                                    <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text vc_custom_1581604676832  vc_custom_1581604676832 container w_870"><span className="vc_sep_holder vc_sep_holder_l">
                                                        <span style={{borderColor:'#dde1e4'}} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r"><span style={{borderColor:'#dde1e4'}} className="vc_sep_line"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vc_row wpb_row vc_row-fluid">
                                        <div className="wpb_column vc_column_container vc_col-sm-12">
                                            <div className="vc_column-inner">
                                                <div className="wpb_wrapper">
                                                    <div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1586980076062 container tubi-content">
                                                        <div className="wpb_wrapper">
                                                            <h3 style={{textAlign: 'center'}}>Coverage</h3>
                                                            <p>Headquartered in San Francisco, Tubi is available in the US, Canada, Australia and New Zealand and can be accessed on over 25 devices – the most of any AVOD service.</p>
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
                                                    <div className="wpb_single_image wpb_content_element vc_align_center container">
                                                        <figure className="wpb_wrapper vc_figure ">
                                                            <div className="vc_single_image-wrapper   vc_box_border_grey">
                                                                <img width="640" height="316" src="./images/aboutus/map3-1.png" className="vc_single_image-img attachment-large" alt="" /></div>
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
                                                    <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text vc_custom_1581604759122  vc_custom_1581604759122 container w_870"><span className="vc_sep_holder vc_sep_holder_l"><span style={{borderColor:'#dde1e4'}} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r"><span style={{borderColor:'#dde1e4'}} className="vc_sep_line"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="half-page-position" className="vc_row wpb_row vc_row-fluid vc_custom_1596013627396 bb_custom_1596013627397">
                                        <div className="wpb_column vc_column_container vc_col-sm-12">
                                            <div className="vc_column-inner">
                                                <div className="wpb_wrapper">
                                                    <div className="wpb_text_column wpb_content_element  normal w_780  vc_custom_1581604390850 container tubi-content">
                                                        <div className="wpb_wrapper">
                                                            <h3 style={{textAlign: 'center'}}>Leadership</h3>
                                                            <div id="gtx-trans" style={{position: 'absolute', left: '-14px', top: '39.4375px'}}>
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
                                                    <div className="tubi-service-list-wrapper ">
                                                        <div className="wpb_text_column wpb_content_element  small w_870 b-border  leadership container tubi-service-list">
                                                            <div className="wpb_wrapper">
                                                                <div className="service-item "> 
                                                                <img src="./images/aboutus/farhad.png" alt="" style={{width:'100%'}}/>
                                                                    <div>
                                                                        <h5 style={{color: '#26262d'}}>Farhad Massoudi</h5>
                                                                        <p style={{color: '#707c86'}}>Founder &amp; CEO</p>
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
                                                    <div className="wpb_text_column wpb_content_element  b-color-border white small  vc_custom_1594934164650 container tubi-text-banner" id="career-page-company">
                                                        <div className="wpb_wrapper">
                                                            <h4>Let’s Work Together</h4>
                                                            <p>We’re always looking for talented people to join Tubi!</p> <a className="btn  " href="careers.html" title="Careers" target=""><span>Careers Page</span></a> </div>
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
                                                            <p>The provided agreements on tubitv.com are for informational purposes only and do not constitute legal advice.</p>
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
				<div className="footer">
					<div className="container">
						<div className="row footerLogoSocial">
							<div className="footerLogo">
								<a href="#">
									<svg className="svgIcon iconColor svgFooterLogo" preserveAspectRatio="xMidYMid meet" viewBox="0 0 213 92" style={{fill: 'currentcolor'}}>
										<path d="M210.873307,26.4543269 L196.542112,26.4543269 L196.542112,89.9669695 C196.542112,91.0984165 197.458796,92.0157644 198.589425,92.0157644 L210.873307,92.0157644 C212.003936,92.0157644 212.920621,91.0984165 212.920621,89.9669695 L212.920621,28.5031219 C212.920621,27.3716749 212.003936,26.4543269 210.873307,26.4543269 M155.595838,75.6254051 C146.550295,75.6254051 139.217329,68.2871339 139.217329,59.2350457 C139.217329,50.1829575 146.550295,42.8446863 155.595838,42.8446863 C164.641382,42.8446863 171.974348,50.1829575 171.974348,59.2350457 C171.974348,68.2871339 164.641382,75.6254051 155.595838,75.6254051 M155.595838,26.4543269 C150.78721,26.4543269 146.222213,27.4920416 142.108648,29.3543962 L142.108136,29.353884 C141.843521,29.4737385 141.555361,29.5362267 141.264643,29.5362267 C140.134014,29.5362267 139.217329,28.6188788 139.217329,27.4874318 L139.217329,3.9175828 C139.217329,2.7861358 138.300644,1.86878787 137.170015,1.86878787 L122.83882,1.86878787 L122.83882,59.2350457 C122.83882,77.339222 137.504239,92.0157644 155.595838,92.0157644 C173.687437,92.0157644 188.352857,77.339222 188.352857,59.2350457 C188.352857,41.1308694 173.687437,26.4543269 155.595838,26.4543269 M48.0811613,85.7971597 L48.0832087,85.7986963 L41.9187472,75.1065478 L41.9151644,75.1085965 C41.3936113,74.2045658 40.2762898,73.8378315 39.3207062,74.2562979 C37.3112678,75.1367675 35.091468,75.6254051 32.7570186,75.6254051 C23.711475,75.6254051 16.3785093,68.2871339 16.3785093,59.2350457 L16.3785093,44.8934812 C16.3785093,43.7620342 17.295194,42.8446863 18.425823,42.8446863 L38.8989596,42.8446863 C40.0295885,42.8446863 40.9462732,41.9273384 40.9462732,40.7958914 L40.9462732,28.5036341 C40.9462732,27.3716749 40.0295885,26.4543269 38.8989596,26.4543269 L18.425823,26.4543269 C17.295194,26.4543269 16.3785093,25.536979 16.3785093,24.405532 L16.3785093,3.9170706 C16.3785093,2.7861358 15.4618246,1.86878787 14.3311956,1.86878787 L0,1.86878787 L0,59.2350457 C0,77.339222 14.6659314,92.0157644 32.7570186,92.0157644 C37.9459351,92.0157644 42.8528341,90.808512 47.2131003,88.6593262 C48.2275443,88.1594202 48.6446844,86.9311676 48.1446281,85.9159898 C48.1251786,85.8755261 48.1036818,85.8360868 48.0811613,85.7971597 M112.602251,26.4543269 L98.2710558,26.4543269 L98.2710558,59.2350457 C98.2710558,68.2871339 90.93809,75.6254051 81.8925465,75.6254051 C72.8470029,75.6254051 65.5140372,68.2871339 65.5140372,59.2350457 L65.5140372,28.5031219 C65.5140372,27.3716749 64.5973525,26.4543269 63.4667235,26.4543269 L49.1355279,26.4543269 L49.1355279,59.2350457 C49.1355279,77.339222 63.8014593,92.0157644 81.8925465,92.0157644 C99.9836336,92.0157644 114.649565,77.339222 114.649565,59.2350457 L114.649565,28.5031219 C114.649565,27.3716749 113.73288,26.4543269 112.602251,26.4543269 M204.731366,1.86878787 C200.208338,1.86878787 196.542112,5.53766738 196.542112,10.0639676 C196.542112,14.5902677 200.208338,18.2591473 204.731366,18.2591473 C209.254394,18.2591473 212.920621,14.5902677 212.920621,10.0639676 C212.920621,5.53766738 209.254394,1.86878787 204.731366,1.86878787" fill="currentcolor" transform="translate(0 -1)"></path>
									</svg>
								</a>
							</div>
							<div className="_23TJ8"></div>
							<div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2 socialTray">
								<div className="socialLinkContainer">
									<div className="footerSLWrapper">
										<a href="https://www.facebook.com" rel="noopener" target="_blank" className="linkButton footerFacebook">
											<svg className="svgIcon facebookIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style={{fill: 'currentcolor'}}>
												<path fill="currentColor" fill-rule="evenodd" d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z"></path>
											</svg>
										</a>
										<a href="https://www.instagram.com" rel="noopener" target="_blank" className="linkButton footerInsta">
											<svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style={{fill: 'currentcolor'}}>
												<g fill="currentColor" fill-rule="evenodd">
													<path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.087.278 3.45.525c-.658.256-1.216.598-1.772 1.153C1.123 2.234.78 2.792.525 3.45.278 4.086.11 4.812.06 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.05 1.065.218 1.79.465 2.428.256.658.598 1.216 1.153 1.77.556.558 1.114.9 1.772 1.155.636.248 1.363.417 2.427.464 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.064-.048 1.79-.217 2.428-.465.658-.255 1.216-.597 1.77-1.154.558-.554.9-1.112 1.155-1.77.248-.636.417-1.362.464-2.427.048-1.066.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.048-1.065-.217-1.79-.465-2.427-.255-.658-.597-1.216-1.154-1.772-.554-.555-1.112-.897-1.77-1.153C15.915.278 15.188.11 14.124.06 13.057.012 12.716 0 10 0m0 2c2.606 0 2.914.01 3.943.057.952.044 1.468.202 1.812.336.455.177.78.39 1.123.73.34.34.552.667.73 1.12.133.346.292.862.335 1.814C17.99 7.087 18 7.394 18 10s-.01 2.914-.057 3.943c-.043.952-.202 1.468-.335 1.812-.178.455-.39.78-.73 1.123-.343.34-.668.552-1.123.73-.344.133-.86.292-1.812.335-1.03.047-1.337.057-3.943.057s-2.914-.01-3.943-.057c-.952-.043-1.468-.202-1.813-.335-.454-.178-.78-.39-1.12-.73-.342-.343-.554-.668-.73-1.123-.135-.344-.293-.86-.337-1.812C2.01 12.913 2 12.606 2 10s.01-2.914.057-3.943c.044-.952.202-1.468.336-1.813.177-.454.39-.78.73-1.12.34-.342.667-.554 1.12-.73.346-.135.862-.293 1.814-.337C7.087 2.01 7.394 2 10 2"></path>
													<path d="M10 13c-1.657 0-3-1.343-3-3 0-1.656 1.343-3 3-3s3 1.344 3 3c0 1.657-1.343 3-3 3m0-8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m6 0c0 .553-.447 1-1 1-.553 0-1-.447-1-1 0-.553.447-1 1-1 .553 0 1 .447 1 1"></path>
												</g>
											</svg>
										</a>
										<a href="https://twitter.com" rel="noopener" target="_blank" className="linkButton footerTwitter">
											<svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 17" style={{fill: 'currentcolor'}}>
												<path d="M6 17c7.837 0 11.965-6.156 12-11-.035-.67-.035-.844 0-1 .756-.59 1.45-1.297 2-2-.75.218-1.543.433-2 1 .5-.978 1.14-1.77 1-3-.358.763-1.24 1.095-2 1C15.29.647 12.69.568 11 2c-1.03 1.084-1.48 2.555-1 4-3.45-.204-6.524-1.74-9-4C.303 3.584.86 5.945 3 7c-.99.11-1.63-.062-2 0-.2 1.6 1.178 3.255 3 4-.512-.202-1.146-.178-2 0 .777 1.35 2.318 2.478 4 3-1.38.635-3.175 1.246-5 1-.35.244-.675.223-1 0 1.877 1.37 4.06 2 6 2" fill="currentColor" fill-rule="evenodd"></path>
											</svg>
										</a>
										<a href="https://www.linkedin.com" rel="noopener" target="_blank" className="linkButton footerLinkedIn">
											<svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 15" style={{fill: 'currentcolor'}}>
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
									<li> <a href="#" rel="noopener" target="_self" className="linkButton">About Us</a></li>
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
						<div className="footerInfo">
							<div className="footerApps">
								<a href="#" rel="noopener" target="_blank" className="linkButton">
									<svg locale="[object Object]" className="svgIcon appStoreApple" preserveAspectRatio="xMidYMid meet" viewBox="0 0 119.66 40" style={{fill: 'rgb(32, 32, 38)'}}>
										<title>Download_on_the_App_Store_Badge_US-UK_RGB_blk_4SVG_092917</title>
										<path d="M110.13477,0H9.53468c-.3667,0-.729,0-1.09473.002-.30615.002-.60986.00781-.91895.0127A13.21476,13.21476,0,0,0,5.5171.19141a6.66509,6.66509,0,0,0-1.90088.627A6.43779,6.43779,0,0,0,1.99757,1.99707,6.25844,6.25844,0,0,0,.81935,3.61816a6.60119,6.60119,0,0,0-.625,1.90332,12.993,12.993,0,0,0-.1792,2.002C.00587,7.83008.00489,8.1377,0,8.44434V31.5586c.00489.3105.00587.6113.01515.9219a12.99232,12.99232,0,0,0,.1792,2.0019,6.58756,6.58756,0,0,0,.625,1.9043A6.20778,6.20778,0,0,0,1.99757,38.001a6.27445,6.27445,0,0,0,1.61865,1.1787,6.70082,6.70082,0,0,0,1.90088.6308,13.45514,13.45514,0,0,0,2.0039.1768c.30909.0068.6128.0107.91895.0107C8.80567,40,9.168,40,9.53468,40H110.13477c.3594,0,.7246,0,1.084-.002.3047,0,.6172-.0039.9219-.0107a13.279,13.279,0,0,0,2-.1768,6.80432,6.80432,0,0,0,1.9082-.6308,6.27742,6.27742,0,0,0,1.6172-1.1787,6.39482,6.39482,0,0,0,1.1816-1.6143,6.60413,6.60413,0,0,0,.6191-1.9043,13.50643,13.50643,0,0,0,.1856-2.0019c.0039-.3106.0039-.6114.0039-.9219.0078-.3633.0078-.7246.0078-1.0938V9.53613c0-.36621,0-.72949-.0078-1.09179,0-.30664,0-.61426-.0039-.9209a13.5071,13.5071,0,0,0-.1856-2.002,6.6177,6.6177,0,0,0-.6191-1.90332,6.46619,6.46619,0,0,0-2.7988-2.7998,6.76754,6.76754,0,0,0-1.9082-.627,13.04394,13.04394,0,0,0-2-.17676c-.3047-.00488-.6172-.01074-.9219-.01269-.3594-.002-.7246-.002-1.084-.002Z" fill="#36373A"></path>
										<path d="M8.44483,39.125c-.30468,0-.602-.0039-.90429-.0107a12.68714,12.68714,0,0,1-1.86914-.1631,5.88381,5.88381,0,0,1-1.65674-.5479,5.40573,5.40573,0,0,1-1.397-1.0166,5.32082,5.32082,0,0,1-1.02051-1.3965,5.72186,5.72186,0,0,1-.543-1.6572,12.41351,12.41351,0,0,1-.1665-1.875c-.00634-.2109-.01464-.9131-.01464-.9131V8.44434S.88185,7.75293.8877,7.5498a12.37039,12.37039,0,0,1,.16553-1.87207,5.7555,5.7555,0,0,1,.54346-1.6621A5.37349,5.37349,0,0,1,2.61183,2.61768,5.56543,5.56543,0,0,1,4.01417,1.59521a5.82309,5.82309,0,0,1,1.65332-.54394A12.58589,12.58589,0,0,1,7.543.88721L8.44532.875H111.21387l.9131.0127a12.38493,12.38493,0,0,1,1.8584.16259,5.93833,5.93833,0,0,1,1.6709.54785,5.59374,5.59374,0,0,1,2.415,2.41993,5.76267,5.76267,0,0,1,.5352,1.64892,12.995,12.995,0,0,1,.1738,1.88721c.0029.2832.0029.5874.0029.89014.0079.375.0079.73193.0079,1.09179V30.4648c0,.3633,0,.7178-.0079,1.0752,0,.3252,0,.6231-.0039.9297a12.73126,12.73126,0,0,1-.1709,1.8535,5.739,5.739,0,0,1-.54,1.67,5.48029,5.48029,0,0,1-1.0156,1.3857,5.4129,5.4129,0,0,1-1.3994,1.0225,5.86168,5.86168,0,0,1-1.668.5498,12.54218,12.54218,0,0,1-1.8692.1631c-.2929.0068-.5996.0107-.8974.0107l-1.084.002Z"></path>
										<g data-name="<Group>">
											<g data-name="<Group>">
												<g fill="#fff" data-name="<Group>">
													<path d="m24.769 20.301a4.9488 4.9488 0 0 1 2.3566-4.1521 5.0657 5.0657 0 0 0-3.9912-2.1577c-1.6792-0.17626-3.3072 1.0048-4.1629 1.0048-0.87227 0-2.1898-0.98733-3.6085-0.95814a5.3153 5.3153 0 0 0-4.4729 2.7279c-1.934 3.3484-0.49141 8.2695 1.3612 10.976 0.9269 1.3254 2.0102 2.8058 3.4276 2.7533 1.3871-0.05753 1.9051-0.88448 3.5794-0.88448 1.6588 0 2.1448 0.88448 3.591 0.8511 1.4884-0.02416 2.4261-1.3312 3.3205-2.6691a10.962 10.962 0 0 0 1.5184-3.0925 4.782 4.782 0 0 1-2.9192-4.3992z" data-name="<Path>"></path>
													<path d="m22.037 12.211a4.8725 4.8725 0 0 0 1.1145-3.4906 4.9575 4.9575 0 0 0-3.2076 1.6596 4.6363 4.6363 0 0 0-1.1437 3.3614 4.099 4.099 0 0 0 3.2368-1.5304z" data-name="<Path>"></path>
												</g>
											</g>
											<g fill="#fff">
												<path d="m42.302 27.14h-4.7334l-1.1367 3.3564h-2.0049l4.4834-12.418h2.083l4.4834 12.418h-2.0391zm-4.2432-1.5488h3.752l-1.8496-5.4473h-0.05176z"></path>
												<path d="m55.16 25.97c0 2.8135-1.5059 4.6211-3.7783 4.6211a3.0693 3.0693 0 0 1-2.8486-1.584h-0.043v4.4844h-1.8584v-12.049h1.7989v1.5059h0.03418a3.2116 3.2116 0 0 1 2.8828-1.6006c2.2978 1e-5 3.8125 1.8164 3.8125 4.6221zm-1.9102 0c0-1.833-0.94727-3.0381-2.3926-3.0381-1.4199 0-2.375 1.2305-2.375 3.0381 0 1.8242 0.95508 3.0459 2.375 3.0459 1.4453 0 2.3926-1.1963 2.3926-3.0459z"></path>
												<path d="m65.125 25.97c0 2.8135-1.5059 4.6211-3.7783 4.6211a3.0693 3.0693 0 0 1-2.8486-1.584h-0.043v4.4844h-1.8584v-12.049h1.7988v1.5059h0.03418a3.2116 3.2116 0 0 1 2.8828-1.6006c2.2979 0 3.8125 1.8164 3.8125 4.6221zm-1.9102 0c0-1.833-0.94727-3.0381-2.3926-3.0381-1.4199 0-2.375 1.2305-2.375 3.0381 0 1.8242 0.95508 3.0459 2.375 3.0459 1.4453 0 2.3926-1.1963 2.3926-3.0459z"></path>
												<path d="m71.71 27.036c0.1377 1.2314 1.334 2.04 2.9688 2.04 1.5664 0 2.6934-0.80859 2.6934-1.919 0-0.96387-0.67969-1.541-2.2891-1.9365l-1.6094-0.3877c-2.2803-0.55078-3.3389-1.6172-3.3389-3.3477 0-2.1426 1.8672-3.6143 4.5186-3.6143 2.624 0 4.4228 1.4717 4.4834 3.6143h-1.876c-0.1123-1.2393-1.1367-1.9873-2.6338-1.9873s-2.5215 0.75684-2.5215 1.8584c0 0.87793 0.6543 1.3945 2.2549 1.79l1.3682 0.33594c2.5478 0.60254 3.6064 1.626 3.6064 3.4424 0 2.3232-1.8506 3.7783-4.794 3.7783-2.7539 0-4.6133-1.4209-4.7334-3.667z"></path>
												<path d="m83.346 19.3v2.1426h1.7217v1.4717h-1.7217v4.9912c0 0.77539 0.34473 1.1367 1.1016 1.1367a5.8075 5.8075 0 0 0 0.61133-0.043v1.4629a5.1035 5.1035 0 0 1-1.0322 0.08594c-1.833 0-2.5478-0.68848-2.5478-2.4443v-5.1894h-1.3164v-1.4717h1.3164v-2.1426z"></path>
												<path d="m86.065 25.97c0-2.8486 1.6777-4.6387 4.294-4.6387 2.625 0 4.2949 1.79 4.2949 4.6387 0 2.8564-1.6611 4.6387-4.2949 4.6387-2.6329 0-4.294-1.7822-4.294-4.6387zm6.6953 0c0-1.9541-0.89551-3.1074-2.4014-3.1074s-2.4004 1.1621-2.4004 3.1074c0 1.9619 0.89453 3.1064 2.4004 3.1064s2.4013-1.1445 2.4013-3.1064z"></path>
												<path d="m96.186 21.442h1.7725v1.541h0.043a2.1594 2.1594 0 0 1 2.1777-1.6357 2.8662 2.8662 0 0 1 0.63672 0.06934v1.7383a2.5979 2.5979 0 0 0-0.835-0.1123 1.8726 1.8726 0 0 0-1.9365 2.083v5.3701h-1.8584z"></path>
												<path d="m109.38 27.837c-0.25 1.6436-1.8506 2.7715-3.8984 2.7715-2.6338 0-4.2686-1.7646-4.2686-4.5957 0-2.8398 1.6436-4.6816 4.1904-4.6816 2.5049 0 4.0801 1.7207 4.0801 4.4658v0.63672h-6.3945v0.1123a2.358 2.358 0 0 0 2.4356 2.5644 2.0483 2.0483 0 0 0 2.0908-1.2734zm-6.2822-2.7022h4.5264a2.1773 2.1773 0 0 0-2.2207-2.2978 2.292 2.292 0 0 0-2.3057 2.2979z"></path>
											</g>
										</g>
										<g data-name="<Group>">
											<g fill="#fff">
												<path d="m37.826 8.731a2.6396 2.6396 0 0 1 2.8076 2.9648c0 1.9062-1.0303 3.002-2.8076 3.002h-2.1553v-5.9668zm-1.2285 5.123h1.125a1.8759 1.8759 0 0 0 1.9678-2.146 1.881 1.881 0 0 0-1.9678-2.1338h-1.125z"></path>
												<path d="m41.681 12.444a2.1332 2.1332 0 1 1 4.2471 0 2.1336 2.1336 0 1 1-4.2471 0zm3.333 0c0-0.97607-0.43848-1.5469-1.208-1.5469-0.77246 0-1.207 0.5708-1.207 1.5469 0 0.98389 0.43457 1.5503 1.207 1.5503 0.76954-1e-5 1.208-0.57032 1.208-1.5503z"></path>
												<path d="M51.57326,14.69775h-.92187l-.93066-3.31641h-.07031l-.92676,3.31641h-.91309l-1.24121-4.50293h.90137l.80664,3.436h.06641l.92578-3.436h.85254l.92578,3.436h.07031l.80273-3.436h.88867Z"></path>
												<path d="m53.854 10.195h0.85546v0.71533h0.06641a1.348 1.348 0 0 1 1.3438-0.80225 1.4646 1.4646 0 0 1 1.5586 1.6748v2.915h-0.88867v-2.6918c0-0.72363-0.31445-1.0835-0.97168-1.0835a1.0329 1.0329 0 0 0-1.0752 1.1411v2.6343h-0.88867z"></path>
												<path d="m59.094 8.437h0.88867v6.2607h-0.88867z"></path>
												<path d="m61.218 12.444a2.1335 2.1335 0 1 1 4.2476 0 2.1338 2.1338 0 1 1-4.2476 0zm3.333 0c0-0.97607-0.43848-1.5469-1.208-1.5469-0.77246 0-1.207 0.5708-1.207 1.5469 0 0.98389 0.43457 1.5503 1.207 1.5503 0.76953-1e-5 1.208-0.57032 1.208-1.5503z"></path>
												<path d="M66.4009,13.42432c0-.81055.60352-1.27783,1.6748-1.34424l1.21973-.07031v-.38867c0-.47559-.31445-.74414-.92187-.74414-.49609,0-.83984.18213-.93848.50049h-.86035c.09082-.77344.81836-1.26953,1.83984-1.26953,1.12891,0,1.76563.562,1.76563,1.51318v3.07666h-.85547v-.63281h-.07031a1.515,1.515,0,0,1-1.35254.707A1.36026,1.36026,0,0,1,66.4009,13.42432Zm2.89453-.38477v-.37646l-1.09961.07031c-.62012.0415-.90137.25244-.90137.64941,0,.40527.35156.64111.835.64111A1.0615,1.0615,0,0,0,69.29543,13.03955Z"></path>
												<path d="m71.348 12.444c0-1.4228 0.73145-2.3242 1.8691-2.3242a1.484 1.484 0 0 1 1.3809 0.79h0.06641v-2.4731h0.88867v6.2607h-0.85156v-0.71143h-0.07031a1.5628 1.5628 0 0 1-1.4141 0.78564c-1.1455 5e-5 -1.8692-0.90134-1.8692-2.3276zm0.918 0c0 0.95508 0.4502 1.5298 1.2031 1.5298 0.749 0 1.2119-0.583 1.2119-1.5259 0-0.93848-0.46777-1.5298-1.2119-1.5298-0.74808 0-1.2032 0.57861-1.2032 1.5259z"></path>
												<path d="m79.23 12.444a2.1332 2.1332 0 1 1 4.2471 0 2.1336 2.1336 0 1 1-4.2471 0zm3.333 0c0-0.97607-0.43848-1.5469-1.208-1.5469-0.77246 0-1.207 0.5708-1.207 1.5469 0 0.98389 0.43457 1.5503 1.207 1.5503 0.76953-1e-5 1.208-0.57032 1.208-1.5503z"></path>
												<path d="m84.669 10.195h0.85547v0.71533h0.06641a1.348 1.348 0 0 1 1.3438-0.80225 1.4646 1.4646 0 0 1 1.5586 1.6748v2.915h-0.88867v-2.6918c0-0.72363-0.31445-1.0835-0.97168-1.0835a1.0329 1.0329 0 0 0-1.0752 1.1411v2.6343h-0.88867z"></path>
												<path d="M93.51516,9.07373v1.1416h.97559v.74854h-.97559V13.2793c0,.47168.19434.67822.63672.67822a2.96657,2.96657,0,0,0,.33887-.02051v.74023a2.9155,2.9155,0,0,1-.4834.04541c-.98828,0-1.38184-.34766-1.38184-1.21582v-2.543h-.71484v-.74854h.71484V9.07373Z"></path>
												<path d="m95.705 8.437h0.88086v2.4814h0.07031a1.3856 1.3856 0 0 1 1.373-0.80664 1.4834 1.4834 0 0 1 1.5508 1.6787v2.9072h-0.88956v-2.688c0-0.71924-0.335-1.0835-0.96289-1.0835a1.0519 1.0519 0 0 0-1.1338 1.1416v2.6299h-0.88867z"></path>
												<path d="m104.76 13.482a1.828 1.828 0 0 1-1.9512 1.3027 2.0453 2.0453 0 0 1-2.0801-2.3242 2.0768 2.0768 0 0 1 2.0762-2.3525c1.2529 0 2.0088 0.856 2.0088 2.27v0.31009h-3.1797v0.0498a1.1902 1.1902 0 0 0 1.1992 1.29 1.0793 1.0793 0 0 0 1.0713-0.5459zm-3.126-1.4512h2.2744a1.0865 1.0865 0 0 0-1.1084-1.1665 1.1516 1.1516 0 0 0-1.166 1.1665z"></path>
											</g>
										</g>
									</svg>
								</a>
								<a href="#" rel="noopener" target="_blank" className="linkButton">
									<svg locale="[object Object]" className="svgIcon appStoreGoogle" preserveAspectRatio="xMidYMid meet" viewBox="0 0 180 53.3" style={{fill: 'rgb(32, 32, 38)'}}>
										<g id="g10" transform="matrix(1.33333 0 0 -1.33333 0 80)">
											<g id="g12" transform="scale(.1)">
												<path id="path16" d="M1299.8 200H49.7c-27.5 0-50 22.5-50 50v300c0 27.5 22.5 50 50 50h1250c27.5 0 50-22.5 50-50V250c.1-27.5-22.4-50-49.9-50"></path>
												<path id="path18" d="M1299.8 600H49.7c-27.5 0-50-22.5-50-50V250c0-27.5 22.5-50 50-50h1250c27.5 0 50 22.5 50 50v300c.1 27.5-22.4 50-49.9 50m0-8c23.2 0 42-18.8 42-42V250c0-23.2-18.8-42-42-42H49.7c-23.2 0-42 18.8-42 42v300c0 23.2 18.8 42 42 42h1250.1" fill="#36373A"></path>
												<path id="path20" fill="#fff" d="M474 497.6c0-8.4-2.5-15-7.5-20-5.6-5.9-13-8.9-22-8.9-8.7 0-16 3-22.1 9s-9.1 13.4-9.1 22.3 3 16.3 9.1 22.3 13.4 9 22.1 9c4.3 0 8.4-.8 12.3-2.5 3.9-1.7 7-3.9 9.4-6.7l-5.3-5.3c-4 4.7-9.4 7.1-16.4 7.1-6.3 0-11.8-2.2-16.4-6.7-4.6-4.4-6.9-10.2-6.9-17.3s2.3-12.9 6.9-17.3c4.6-4.4 10.1-6.7 16.4-6.7 6.7 0 12.3 2.2 16.8 6.7 2.9 2.9 4.6 7 5 12.2h-21.8v7.2h29.1c.2-1.5.4-3 .4-4.4"></path>
												<path id="path22" fill="#fff" d="M474 497.6h-1c0-8.2-2.4-14.5-7.2-19.3-5.5-5.7-12.5-8.6-21.3-8.6-8.4 0-15.5 2.9-21.4 8.7-5.9 5.8-8.8 13-8.8 21.6 0 8.7 2.9 15.8 8.8 21.6 5.9 5.8 12.9 8.7 21.4 8.7 4.2 0 8.1-.8 11.9-2.4 3.8-1.6 6.8-3.8 9-6.4l.8.6-.7.7-5.3-5.3.7-.7.8.6c-4.2 5-10 7.5-17.2 7.5-6.5 0-12.3-2.3-17.1-6.9-4.8-4.6-7.2-10.7-7.2-18s2.4-13.4 7.2-18 10.5-7 17.1-6.9c6.9 0 12.8 2.3 17.5 7 3.1 3.1 4.9 7.4 5.3 12.8l.1 1.1h-21.9v5.2h28.1v1l-1-.2c.3-1.5.4-3 .4-4.4h2c0 1.5-.1 3.1-.4 4.7l-.1.8h-30.9v-9.2h22.8v1l-1 .1c-.4-5-2-8.8-4.7-11.5-4.3-4.3-9.6-6.4-16.1-6.4-6.1 0-11.2 2.1-15.7 6.4-4.4 4.3-6.6 9.7-6.6 16.6s2.2 12.3 6.6 16.6c4.4 4.3 9.6 6.4 15.7 6.4 6.8 0 11.9-2.2 15.7-6.8l.7-.8 6 6.1.6.6-.6.7c-2.5 2.9-5.7 5.3-9.8 7-4 1.7-8.3 2.6-12.7 2.6-8.9 0-16.6-3.1-22.8-9.3-6.2-6.2-9.4-13.9-9.4-23s3.1-16.9 9.4-23c6.2-6.2 13.9-9.3 22.8-9.3 9.3 0 16.9 3.1 22.8 9.2l-.7.7.7-.7c5.2 5.2 7.8 12.2 7.7 20.7l-1-.2"></path>
												<path id="path24" fill="#fff" d="M520.1 522.6h-27.3v-19h24.6v-7.2h-24.6v-19h27.3V470h-35v60h35v-7.4"></path>
												<path id="path26" fill="#fff" d="M520.1 522.6v1h-28.3v-21h24.6v-5.2h-24.6v-21h27.3V471h-33v58h33v-6.4h1v1-1h1v8.4h-37v-62h37v9.4h-27.3v17h24.6v9.2h-24.6v17h27.3v1h-1"></path>
												<path id="path28" fill="#fff" d="M552.6 470h-7.7v52.6h-16.8v7.4h41.2v-7.4h-16.8l.1-52.6"></path>
												<path id="path30" fill="#fff" d="M552.6 470v1h-6.7v52.6h-16.8v5.4h39.2v-5.4h-16.8V470h1.1v1-1h1v51.6h16.8v9.4h-43.2v-9.4H544V469h9.7v1h-1.1"></path>
												<path id="path32" fill="#fff" d="M599.2 470v60h7.7v-60h-7.7"></path>
												<path id="path34" fill="#fff" d="M599.2 470h1v59h5.7v-58h-6.7v-1h1-1v-1h8.7v62h-9.7v-62h1v1"></path>
												<path id="path36" fill="#fff" d="M641.1 470h-7.7v52.6h-16.8v7.4h41.2v-7.4H641l.1-52.6"></path>
												<path id="path38" fill="#fff" d="M641.1 470v1h-6.7v52.6h-16.8v5.4h39.2v-5.4H640V470h1.1v1-1h1v51.6h16.7v9.4h-43.2v-9.4h16.8V469h9.7v1h-1"></path>
												<path id="path40" fill="#fff" d="M697.6 482.8c4.4-4.5 9.9-6.7 16.3-6.7s11.9 2.2 16.3 6.7 6.7 10.2 6.7 17.2-2.2 12.7-6.7 17.2c-4.4 4.5-9.9 6.7-16.3 6.7s-11.9-2.2-16.3-6.7-6.7-10.2-6.7-17.2 2.3-12.7 6.7-17.2zm38.3-5c-5.9-6.1-13.2-9.1-22-9.1s-16.1 3-22 9.1-8.8 13.5-8.8 22.2 2.9 16.2 8.8 22.2c5.9 6.1 13.2 9.1 22 9.1 8.7 0 16-3 22-9.1 5.9-6.1 8.9-13.5 8.9-22.2-.1-8.8-3-16.2-8.9-22.2"></path>
												<path id="path42" fill="#fff" d="M697.6 482.8l-.7-.7c4.6-4.7 10.4-7.1 17-7 6.7 0 12.4 2.4 17 7 4.6 4.7 7 10.7 7 17.9 0 7.2-2.3 13.2-7 17.9-4.6 4.7-10.4 7.1-17 7-6.7 0-12.4-2.4-17-7-4.6-4.7-7-10.7-6.9-17.9 0-7.2 2.3-13.2 6.9-17.9l.7.7.7.7c-4.2 4.3-6.4 9.7-6.4 16.5s2.1 12.2 6.4 16.5c4.3 4.3 9.4 6.4 15.6 6.4 6.2 0 11.3-2.1 15.6-6.4 4.2-4.3 6.4-9.7 6.4-16.5s-2.1-12.2-6.4-16.5c-4.3-4.3-9.4-6.4-15.6-6.4-6.2 0-11.3 2.1-15.6 6.4l-.7-.7zm38.3-5l-.7.7c-5.7-5.9-12.7-8.8-21.3-8.8-8.5 0-15.6 2.9-21.3 8.8-5.7 5.9-8.5 13-8.6 21.6 0 8.5 2.8 15.7 8.6 21.6 5.7 5.9 12.7 8.8 21.3 8.8 8.5 0 15.5-2.9 21.2-8.8 5.7-5.9 8.6-13 8.6-21.5s-2.8-15.7-8.6-21.6l.8-.8.7-.7c6.1 6.2 9.1 13.9 9.1 22.9 0 8.9-3.1 16.6-9.2 22.9-6.1 6.3-13.7 9.5-22.7 9.4-9 0-16.7-3.1-22.7-9.4-6.1-6.2-9.1-14-9.1-22.9 0-9 3-16.7 9.1-22.9 6.1-6.3 13.7-9.4 22.7-9.4s16.7 3.1 22.7 9.4l-.6.7"></path>
												<path id="path44" fill="#fff" d="M755.6 470v60h9.4l29.2-46.7h.3l-.3 11.6V530h7.7v-60h-8l-30.5 48.9h-.3l.3-11.6V470h-7.8"></path>
												<path id="path46" fill="#fff" d="M755.6 470h1v59h7.8l29.2-46.7h1.9l-.4 12.6V529h5.7v-58h-6.5l-30.5 48.9h-1.9l.4-12.6V471h-6.7v-1h1-1v-1h8.7v38.4L764 519h-1v-1h.3v1l-.8-.5 30.8-49.4h9.6v62h-9.7V495l.3-11.6h1v1h-.3v-1l.8.5-29.5 47.1h-10.9v-62h1v1"></path>
												<path id="path48" fill="#fff" d="M1069.2 300h18.7v125h-18.7V300zm168 80l-21.4-54.2h-.6L1193 380h-20.1l33.3-75.8-19-42.1h19.5L1258 380h-20.8zm-105.8-65.8c-6.1 0-14.6 3.1-14.6 10.6 0 9.6 10.6 13.3 19.8 13.3 8.2 0 12.1-1.8 17.1-4.2-1.5-11.5-11.5-19.7-22.3-19.7zm2.3 68.5c-13.5 0-27.5-6-33.3-19.1l16.6-6.9c3.5 6.9 10.1 9.2 17.1 9.2 9.7 0 19.5-5.8 19.6-16.1v-1.3c-3.4 1.9-10.6 4.8-19.5 4.8-17.8 0-36-9.8-36-28.1 0-16.7 14.6-27.5 31-27.5 12.6 0 19.5 5.6 23.8 12.2h.6v-9.6h18v47.9c0 22.1-16.5 34.5-37.9 34.5zm-115.4-17.9h-26.5v42.9h26.5c13.9 0 21.9-11.5 21.9-21.4 0-9.8-7.9-21.5-21.9-21.5zm-.4 60.2h-44.7V300h18.6v47.4h26.1c20.7 0 41 15 41 38.8 0 23.8-20.4 38.8-41 38.8zM774.1 314.2c-12.9 0-23.7 10.8-23.7 25.6 0 15 10.8 25.9 23.7 25.9 12.7 0 22.7-11 22.7-25.9 0-14.8-10-25.6-22.7-25.6zm21.4 58.8h-.7c-4.2 5-12.2 9.5-22.4 9.5-21.3 0-40.8-18.7-40.8-42.7 0-23.8 19.5-42.4 40.8-42.4 10.1 0 18.2 4.5 22.4 9.7h.6V301c0-16.3-8.7-25-22.7-25-11.4 0-18.5 8.2-21.4 15.1l-16.3-6.8c4.7-11.3 17.1-25.1 37.7-25.1 21.9 0 40.4 12.9 40.4 44.3v76.4h-17.7V373h.1zm30.6-73h18.7v125h-18.7V300zm46.2 41.2c-.5 16.4 12.7 24.8 22.2 24.8 7.4 0 13.7-3.7 15.8-9l-38-15.8zm58 14.2c-3.5 9.5-14.3 27.1-36.4 27.1-21.9 0-40.1-17.2-40.1-42.5 0-23.8 18-42.5 42.2-42.5 19.5 0 30.8 11.9 35.4 18.8l-14.5 9.7c-4.8-7.1-11.4-11.8-20.9-11.8s-16.3 4.4-20.6 12.9l56.9 23.5-2 4.8zm-453.1 14v-18h43.2c-1.3-10.1-4.7-17.6-9.8-22.7-6.3-6.3-16.1-13.2-33.3-13.2-26.6 0-47.4 21.4-47.4 48s20.8 48 47.4 48c14.3 0 24.8-5.6 32.5-12.9l12.7 12.7c-10.8 10.3-25.1 18.2-45.3 18.2-36.4 0-67-29.6-67-66.1 0-36.4 30.6-66.1 67-66.1 19.7 0 34.5 6.4 46.1 18.5 11.9 11.9 15.6 28.7 15.6 42.2 0 4.2-.3 8.1-1 11.3l-60.7.1zM588 314.2c-12.9 0-24 10.6-24 25.8 0 15.3 11.1 25.8 24 25.8s24-10.5 24-25.8c0-15.2-11.1-25.8-24-25.8zm0 68.3c-23.5 0-42.7-17.9-42.7-42.5 0-24.5 19.2-42.5 42.7-42.5s42.7 18 42.7 42.5c0 24.6-19.2 42.5-42.7 42.5zm93.2-68.3c-12.9 0-24 10.6-24 25.8 0 15.3 11.1 25.8 24 25.8s24-10.5 24-25.8c0-15.2-11.2-25.8-24-25.8zm0 68.3c-23.5 0-42.7-17.9-42.7-42.5 0-24.5 19.2-42.5 42.7-42.5 23.5 0 42.7 18 42.7 42.5 0 24.6-19.2 42.5-42.7 42.5"></path>
												<g id="g50">
													<defs>
														<path id="SVGID_1_" d="M104.8 276.1l-.7.7c-2.9 3.1-4.6 7.9-4.6 14.1v-1.5 221.2-1.5c0 6.7 2 11.8 5.4 14.8L228.8 400l-124-123.9m-5.4 234.5v0m.1 1.7"></path>
													</defs>
													<clipPath id="SVGID_2_">
														<use xlinkHref="#SVGID_1_" overflow="visible"></use>
													</clipPath>
													<g id="g52" clip-path="url(#SVGID_2_)">
														<linearGradient id="path72_1_" gradientUnits="userSpaceOnUse" x1="-18811.891" y1="-21267.199" x2="-18810.891" y2="-21267.199" gradientTransform="scale(-4.2194) rotate(45 -34956.32 11951.093)">
															<stop offset="0" stop-color="#00a0ff"></stop>
															<stop offset=".007" stop-color="#00a1ff"></stop>
															<stop offset=".26" stop-color="#00beff"></stop>
															<stop offset=".512" stop-color="#00d2ff"></stop>
															<stop offset=".76" stop-color="#00dfff"></stop>
															<stop offset="1" stop-color="#00e3ff"></stop>
														</linearGradient>
														<path id="path72" d="M104.8 276.1l-.7.7c-2.9 3.1-4.6 7.9-4.6 14.1v-1.5 221.2-1.5c0 6.7 2 11.8 5.4 14.8L228.8 400l-124-123.9m-5.4 234.5v0m.1 1.7" fill="url(#path72_1_)"></path>
													</g>
												</g>
												<g id="g74">
													<defs>
														<path id="SVGID_3_" d="M270 357.2l.9.5 48.9 27.8c4.7 2.7 7.8 5.9 9.3 9.3-1.5-3.4-4.7-6.6-9.3-9.3l-48.9-27.8-.9-.5m0 1.5L228.8 400l41.3 41.3L320 413c6.3-3.6 9.9-8.2 10.5-13-.6-4.7-4.1-9.4-10.5-13l-50-28.3"></path>
													</defs>
													<clipPath id="SVGID_4_">
														<use xlinkHref="#SVGID_3_" overflow="visible"></use>
													</clipPath>
													<g id="g76" clip-path="url(#SVGID_4_)">
														<linearGradient id="path92_1_" gradientUnits="userSpaceOnUse" x1="-20002.412" y1="-21661.736" x2="-20001.412" y2="-21661.736" gradientTransform="rotate(180 -42853.031 -46391.445) scale(4.3017)">
															<stop offset="0" stop-color="#ffe000"></stop>
															<stop offset=".409" stop-color="#ffbd00"></stop>
															<stop offset=".775" stop-color="orange"></stop>
															<stop offset="1" stop-color="#ff9c00"></stop>
														</linearGradient>
														<path id="path92" d="M270 357.2l.9.5 48.9 27.8c4.7 2.7 7.8 5.9 9.3 9.3-1.5-3.4-4.7-6.6-9.3-9.3l-48.9-27.8-.9-.5m0 1.5L228.8 400l41.3 41.3L320 413c6.3-3.6 9.9-8.2 10.5-13-.6-4.7-4.1-9.4-10.5-13l-50-28.3" fill="url(#path92_1_)"></path>
													</g>
												</g>
												<g id="g94">
													<defs>
														<path id="SVGID_5_" d="M113.6 271.4c-3.5 0-6.5 1.1-8.8 3.2 2.4-2.1 5.4-3.2 8.8-3.2h.9-.9m0 1.5c-3.5 0-6.5 1.1-8.8 3.2l124 123.9 41.3-41.3-145.2-82.5c-4.1-2.3-7.9-3.3-11.3-3.3m-8.8 1.8l-.6.6.6-.6"></path>
													</defs>
													<clipPath id="SVGID_6_">
														<use xlinkHref="#SVGID_5_" overflow="visible"></use>
													</clipPath>
													<g id="g96" clip-path="url(#SVGID_6_)">
														<linearGradient id="path108_1_" gradientUnits="userSpaceOnUse" x1="-18853.475" y1="-21699.688" x2="-18852.475" y2="-21699.688" gradientTransform="scale(-5.7218) rotate(45 -35562.742 11823.155)">
															<stop offset="0" stop-color="#ff3a44"></stop>
															<stop offset="1" stop-color="#c31162"></stop>
														</linearGradient>
														<path id="path108" d="M113.6 271.4c-3.5 0-6.5 1.1-8.8 3.2 2.4-2.1 5.4-3.2 8.8-3.2h.9-.9m0 1.5c-3.5 0-6.5 1.1-8.8 3.2l124 123.9 41.3-41.3-145.2-82.5c-4.1-2.3-7.9-3.3-11.3-3.3m-8.8 1.8l-.6.6.6-.6" fill="url(#path108_1_)"></path>
													</g>
												</g>
												<g id="g110">
													<defs>
														<path id="SVGID_7_" d="M228.8 400l-124 123.9c2.4 2.1 5.4 3.2 8.8 3.2 3.4 0 7.2-1.1 11.2-3.4L270 441.2 228.8 400m42.2 42.2l-146.1 83c-4 2.3-7.8 3.4-11.2 3.4h.1c3.4 0 7.2-1.1 11.2-3.4l146-83m-157.5 86.4"></path>
													</defs>
													<clipPath id="SVGID_8_">
														<use xlinkHref="#SVGID_7_" overflow="visible"></use>
													</clipPath>
													<g id="g112" clip-path="url(#SVGID_8_)">
														<linearGradient id="path130_1_" gradientUnits="userSpaceOnUse" x1="-16251.162" y1="-23175.293" x2="-16250.162" y2="-23175.293" gradientTransform="scale(2.555) rotate(-45 20145.964 -31121.24)">
															<stop offset="0" stop-color="#32a071"></stop>
															<stop offset=".069" stop-color="#2da771"></stop>
															<stop offset=".476" stop-color="#15cf74"></stop>
															<stop offset=".801" stop-color="#06e775"></stop>
															<stop offset="1" stop-color="#00f076"></stop>
														</linearGradient>
														<path id="path130" d="M228.8 400l-124 123.9c2.4 2.1 5.4 3.2 8.8 3.2 3.4 0 7.2-1.1 11.2-3.4L270 441.2 228.8 400m42.2 42.2l-146.1 83c-4 2.3-7.8 3.4-11.2 3.4h.1c3.4 0 7.2-1.1 11.2-3.4l146-83m-157.5 86.4" fill="url(#path130_1_)"></path>
													</g>
												</g>
												<path id="path132" d="M114.6 271.4c3.1.2 6.6 1.3 10.3 3.3L270 357.2l-145.1-82.5c-3.7-2-7.2-3.1-10.3-3.3m-9.8 3.2c0 .1 0 0 0 0m-.7.7"></path>
												<g id="g134">
													<defs>
														<path id="SVGID_9_" d="M270 357.2l1 .6-1-.6"></path>
													</defs>
													<clipPath id="SVGID_10_">
														<use xlinkHref="#SVGID_9_" overflow="visible"></use>
													</clipPath>
													<g id="g136" clip-path="url(#SVGID_10_)">
														<linearGradient id="path152_1_" gradientUnits="userSpaceOnUse" x1="-20002.412" y1="-21652.018" x2="-20001.412" y2="-21652.018" gradientTransform="rotate(180 -42853.031 -46391.445) scale(4.3017)">
															<stop offset="0" stop-color="#ccb300"></stop>
															<stop offset=".409" stop-color="#cc9700"></stop>
															<stop offset=".775" stop-color="#cc8400"></stop>
															<stop offset="1" stop-color="#cc7d00"></stop>
														</linearGradient>
														<path id="path152" d="M270 357.2l.9.5-.9-.5" fill="url(#path152_1_)"></path>
													</g>
												</g>
												<g id="g154">
													<defs>
														<path id="SVGID_11_" d="M113.6 271.4c-3.5 0-6.5 1.1-8.8 3.3l-.6.6-.1.1.7.7c2.4-2.1 5.4-3.3 8.8-3.2 3.4 0 7.2 1.1 11.2 3.4L270 358.8l.9-.9-.9-.5-145.1-82.5c-3.7-2.1-7.1-3.2-10.3-3.3-.4-.2-.7-.2-1-.2"></path>
													</defs>
													<clipPath id="SVGID_12_">
														<use xlinkHref="#SVGID_11_" overflow="visible"></use>
													</clipPath>
													<g id="g156" clip-path="url(#SVGID_12_)">
														<linearGradient id="path168_1_" gradientUnits="userSpaceOnUse" x1="-18853.475" y1="-21699.582" x2="-18852.475" y2="-21699.582" gradientTransform="scale(-5.7218) rotate(45 -35562.742 11823.155)">
															<stop offset="0" stop-color="#cc2e36"></stop>
															<stop offset="1" stop-color="#9c0e4e"></stop>
														</linearGradient>
														<path id="path168" d="M113.6 271.4c-3.5 0-6.5 1.1-8.8 3.3l-.6.6-.1.1.7.7c2.4-2.1 5.4-3.3 8.8-3.2 3.4 0 7.2 1.1 11.2 3.4L270 358.8l.9-.9-.9-.5-145.1-82.5c-3.7-2.1-7.1-3.2-10.3-3.3-.4-.2-.7-.2-1-.2" fill="url(#path168_1_)"></path>
													</g>
												</g>
												<path id="path170" d="M104.1 275.4c-2.9 3.1-4.6 7.9-4.6 14.1-.1-6.3 1.6-11.1 4.6-14.1"></path>
												<g id="g172">
													<defs>
														<path id="SVGID_13_" d="M104.1 275.4c-2.9 3.1-4.6 7.9-4.6 14.1v1.5c0-6.2 1.7-11 4.6-14.1l.7-.7-.7-.8"></path>
													</defs>
													<clipPath id="SVGID_14_">
														<use xlinkHref="#SVGID_13_" overflow="visible"></use>
													</clipPath>
													<g id="g174" clip-path="url(#SVGID_14_)">
														<linearGradient id="path194_1_" gradientUnits="userSpaceOnUse" x1="-18811.891" y1="-21248.135" x2="-18810.891" y2="-21248.135" gradientTransform="scale(-4.2194) rotate(45 -34956.32 11951.093)">
															<stop offset="0" stop-color="#008de0"></stop>
															<stop offset=".007" stop-color="#008de0"></stop>
															<stop offset=".26" stop-color="#00a7e0"></stop>
															<stop offset=".512" stop-color="#00b8e0"></stop>
															<stop offset=".76" stop-color="#00c4e0"></stop>
															<stop offset="1" stop-color="#00c7e0"></stop>
														</linearGradient>
														<path id="path194" d="M104.1 275.4c-2.9 3.1-4.6 7.9-4.6 14.1v1.5c0-6.2 1.7-11 4.6-14.1l.7-.7-.7-.8" fill="url(#path194_1_)"></path>
													</g>
												</g>
												<g id="g196">
													<defs>
														<path id="SVGID_15_" d="M104.1 275.4l.7.7-.7-.7"></path>
													</defs>
													<clipPath id="SVGID_16_">
														<use xlinkHref="#SVGID_15_" overflow="visible"></use>
													</clipPath>
													<g id="g198" clip-path="url(#SVGID_16_)">
														<linearGradient id="path210_1_" gradientUnits="userSpaceOnUse" x1="-18853.475" y1="-21704.791" x2="-18852.475" y2="-21704.791" gradientTransform="scale(-5.7218) rotate(45 -35562.742 11823.155)">
															<stop offset="0" stop-color="#e0333c"></stop>
															<stop offset="1" stop-color="#ab0f56"></stop>
														</linearGradient>
														<path id="path210" d="M104.1 275.4l.7.7-.7-.7" fill="url(#path210_1_)"></path>
													</g>
												</g>
												<path id="path212" d="M329.3 394.8c.8 1.7 1.2 3.4 1.2 5.2-.1-1.8-.5-3.5-1.2-5.2"></path>
												<g id="g214">
													<defs>
														<path id="SVGID_17_" d="M271 357.8l-.9.9L320 387c6.3 3.6 9.9 8.2 10.5 13 0-1.7-.4-3.5-1.2-5.2-1.6-3.4-4.7-6.6-9.3-9.3l-49-27.7"></path>
													</defs>
													<clipPath id="SVGID_18_">
														<use xlinkHref="#SVGID_17_" overflow="visible"></use>
													</clipPath>
													<g id="g216" clip-path="url(#SVGID_18_)">
														<linearGradient id="path232_1_" gradientUnits="userSpaceOnUse" x1="-20002.412" y1="-21657.006" x2="-20001.412" y2="-21657.006" gradientTransform="rotate(180 -42853.031 -46391.445) scale(4.3017)">
															<stop offset="0" stop-color="#e0c500"></stop>
															<stop offset=".409" stop-color="#e0a600"></stop>
															<stop offset=".775" stop-color="#e09100"></stop>
															<stop offset="1" stop-color="#e08900"></stop>
														</linearGradient>
														<path id="path232" d="M271 357.8l-.9.9L320 387c6.3 3.6 9.9 8.2 10.5 13 0-1.7-.4-3.5-1.2-5.2-1.6-3.4-4.7-6.6-9.3-9.3l-49-27.7" fill="url(#path232_1_)"></path>
													</g>
												</g>
												<path id="path234" fill="#404040" d="M330.4 400c0 5.2-3.5 10.5-10.5 14.4L271 442.2l48.9-27.8c7-3.9 10.5-9.2 10.5-14.4"></path>
												<g id="g236">
													<defs>
														<path id="SVGID_19_" d="M330.4 400c-.6 4.7-4.1 9.4-10.5 13L270 441.3l.9.9 48.9-27.8c7.1-3.9 10.6-9.2 10.6-14.4"></path>
													</defs>
													<clipPath id="SVGID_20_">
														<use xlinkHref="#SVGID_19_" overflow="visible"></use>
													</clipPath>
													<g id="g238" clip-path="url(#SVGID_20_)">
														<linearGradient id="path254_1_" gradientUnits="userSpaceOnUse" x1="-20002.412" y1="-21666.815" x2="-20001.412" y2="-21666.815" gradientTransform="rotate(180 -42853.031 -46391.445) scale(4.3017)">
															<stop offset="0" stop-color="#ffe840"></stop>
															<stop offset=".409" stop-color="#ffce40"></stop>
															<stop offset=".775" stop-color="#ffbc40"></stop>
															<stop offset="1" stop-color="#ffb540"></stop>
														</linearGradient>
														<path id="path254" d="M330.4 400c-.6 4.7-4.1 9.4-10.5 13L270 441.3l.9.9 48.9-27.8c7.1-3.9 10.6-9.2 10.6-14.4" fill="url(#path254_1_)"></path>
													</g>
												</g>
												<path id="path256" fill="#404040" d="M99.5 512.2c0 .1 0 .1 0 0 0 .1 0 .1 0 0m0 .2c.6 10.3 6.2 16.2 14.1 16.2-3.4 0-6.4-1.1-8.7-3.2l-.7-.7c-2.8-2.9-4.4-7-4.7-12.3"></path>
												<g id="g258">
													<defs>
														<path id="SVGID_21_" d="M99.4 509.1v3.2c.3 5.3 2 9.5 4.6 12.3l.7-.7c-3.3-3-5.3-8.1-5.3-14.8m5.4 16.2"></path>
													</defs>
													<clipPath id="SVGID_22_">
														<use xlinkHref="#SVGID_21_" overflow="visible"></use>
													</clipPath>
													<g id="g260" clip-path="url(#SVGID_22_)">
														<linearGradient id="path280_1_" gradientUnits="userSpaceOnUse" x1="-18811.891" y1="-21287.307" x2="-18810.891" y2="-21287.307" gradientTransform="scale(-4.2194) rotate(45 -34956.32 11951.093)">
															<stop offset="0" stop-color="#40b8ff"></stop>
															<stop offset=".007" stop-color="#40b9ff"></stop>
															<stop offset=".26" stop-color="#40ceff"></stop>
															<stop offset=".512" stop-color="#40ddff"></stop>
															<stop offset=".76" stop-color="#40e7ff"></stop>
															<stop offset="1" stop-color="#40eaff"></stop>
														</linearGradient>
														<path id="path280" d="M99.4 509.1v3.2c.3 5.3 2 9.5 4.6 12.3l.7-.7c-3.3-3-5.3-8.1-5.3-14.8m5.4 16.2" fill="url(#path280_1_)"></path>
													</g>
												</g>
												<path id="path282" fill="#404040" d="M113.5 528.6s.1 0 0 0c.1 0 0 0 0 0"></path>
												<g id="g284">
													<defs>
														<path id="SVGID_23_" d="M270 441.3l-145.1 82.5c-4 2.3-7.8 3.4-11.2 3.4-3.5 0-6.5-1.1-8.8-3.2l-.7.7.7.7c2.3 2.1 5.3 3.2 8.7 3.2 3.4 0 7.2-1.1 11.2-3.4l146.1-83-.9-.9"></path>
													</defs>
													<clipPath id="SVGID_24_">
														<use xlinkHref="#SVGID_23_" overflow="visible"></use>
													</clipPath>
													<g id="g286" clip-path="url(#SVGID_24_)">
														<linearGradient id="path304_1_" gradientUnits="userSpaceOnUse" x1="-16251.162" y1="-23175.266" x2="-16250.162" y2="-23175.266" gradientTransform="scale(2.555) rotate(-45 20145.964 -31121.24)">
															<stop offset="0" stop-color="#65b895"></stop>
															<stop offset=".069" stop-color="#62bd95"></stop>
															<stop offset=".476" stop-color="#50db97"></stop>
															<stop offset=".801" stop-color="#44ed98"></stop>
															<stop offset="1" stop-color="#40f498"></stop>
														</linearGradient>
														<path id="path304" d="M270 441.3l-145.1 82.5c-4 2.3-7.8 3.4-11.2 3.4-3.5 0-6.5-1.1-8.8-3.2l-.7.7.7.7c2.3 2.1 5.3 3.2 8.7 3.2 3.4 0 7.2-1.1 11.2-3.4l146.1-83-.9-.9" fill="url(#path304_1_)"></path>
													</g>
												</g>
											</g>
										</g>
									</svg>
								</a>
							</div>
							<div className="footerCopyright">
								<div className="footerCopyText">
									<div>Copyright &copy; 2020 Tubi, Inc.</div>
									<div>Tubi is a registered trademark of Tubi, Inc.
										<br /> All rights reserved.</div>
								</div>
							</div>
							<div className="footerLove">Made with
								<svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 10 9" style={{fill: 'currentcolor'}}>
									<path fill="currentColor" fill-rule="evenodd" d="M9.024 2.58C8.88 1.163 7.87 0 6.448 0c-.766 0-1.453.335-1.924.866C4.05.336 3.364 0 2.6 0 1.175 0 .165 1.162.023 2.58c-.11 1.086.132 2.537 1.197 3.91 1.106 1.424 2.946 2.318 2.946 2.318.227.115.48.103.694 0 0 0 1.86-.894 2.967-2.318C8.89 5.117 9.132 3.666 9.024 2.58"></path>
								</svg> in San Francisco</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    );
}
export default AboutUs;