import React, { useState, useEffect } from 'react';
const PressRelease = () => {
    useEffect(() => {
		window.scrollTo(0, 0);
    }, []);
    return (
        <div className="menuCloseJS closeMenuWrapper">
            <div id="content" className="site-content">
                <div id="primary" className="content-area">
                    <main id="main" className="site-main">
                        <article id="post-50" className="post-50 page type-page status-publish hentry">
                            <div className="entry-content">
                                <div className="vc_row wpb_row vc_row-fluid vc_custom_1579607672228">
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner">
                                            <div className="wpb_wrapper">
                                                <div className=" vc_custom_1579617708584 discover-header">
                                                    <div id="main-bg" className="main-bg" style={{ top: '0px' }}></div>
                                                    <div className="header-content">
                                                        <h1>Press Releases</h1> </div>
                                                </div>
                                                <div className="wpb_text_column wpb_content_element w_870  container  discover-file-list">
                                                    <div className="wpb_wrapper">
                                                        <div className="file-item">
                                                            {/* <span style="background-image: url(./images/article/press-kit.png);"></span> */}
                                                            <h6>Download Our Press Kit</h6>
                                                            <a href="#" title="Download Our Press Kit" className="btn slate-grey small download-our-press-kit" download="">
                                                                <span>Download</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text  container w_870">
                                                    <span className="vc_sep_holder vc_sep_holder_l">
                                                        <span style={{ borderColor: '#d3d7db' }} className="vc_sep_line"></span>
                                                    </span>
                                                    <span className="vc_sep_holder vc_sep_holder_r">
                                                        <span style={{ borderColor: '#d3d7db' }} className="vc_sep_line"></span>
                                                    </span>
                                                </div>
                                                <div className="wpb_text_column wpb_content_element w_870 grid  container discover-press" id="half-page-position">
                                                    <div className="wpb_wrapper">
                                                        <form>
                                                            <fieldset>
                                                                <input type="hidden" id="selected_cat" value="4" />
                                                                <input type="hidden" id="layout" value="grid" />
                                                                <input type="hidden" id="selected_page" value="1" />
                                                                <input type="hidden" id="posts_per_page" value="6" />
                                                                <div className="form-field select-field">
                                                                    <label htmlFor="select-this">From</label>
                                                                    <div className="discover-select" tabIndex="1" dataEvent="Filter dropdown">
                                                                        <div className="select-selected" dataEvent="Filter dropdown">Show all articles</div>
                                                                        <div className="select-items select-hide">
                                                                            <div className="same-as-selected">Show all articles</div>
                                                                            <div> August 2020 </div>
                                                                            <div> July 2020 </div>
                                                                            <div> June 2020 </div>
                                                                            <div> April 2020 </div>
                                                                            <div> March 2020 </div>
                                                                            <div> February 2020 </div>
                                                                            <div> January 2020 </div>
                                                                            <div> November 2019 </div>
                                                                            <div> October 2019 </div>
                                                                            <div> September 2019 </div>
                                                                            <div> August 2019 </div>
                                                                            <div> June 2019 </div>
                                                                            <div> May 2019 </div>
                                                                            <div> April 2019 </div>
                                                                            <div> March 2019 </div>
                                                                            <div> April 2018 </div>
                                                                            <div> March 2018 </div>
                                                                            <div> January 2017 </div>
                                                                            <div> December 2016 </div>
                                                                            <div> November 2016 </div>
                                                                            <div> October 2016 </div>
                                                                            <div> July 2016 </div>
                                                                            <div> June 2016 </div>
                                                                            <div> February 2016 </div>
                                                                            <div> January 2016 </div>
                                                                            <div> October 2014 </div>
                                                                            <div> September 2014 </div>
                                                                        </div>
                                                                        <select name="select-this" id="selected_date">
                                                                            <option value="">Show all articles</option>
                                                                            <option value="https://corporate.discovertv.com/2020/08/?post_type=press"> August 2020 </option>
                                                                            <option value="https://corporate.discovertv.com/2020/07/?post_type=press"> July 2020 </option>
                                                                            <option value="https://corporate.discovertv.com/2020/06/?post_type=press"> June 2020 </option>
                                                                            <option value="https://corporate.discovertv.com/2020/04/?post_type=press"> April 2020 </option>
                                                                            <option value="https://corporate.discovertv.com/2020/03/?post_type=press"> March 2020 </option>
                                                                            <option value="https://corporate.discovertv.com/2020/02/?post_type=press"> February 2020 </option>
                                                                            <option value="https://corporate.discovertv.com/2020/01/?post_type=press"> January 2020 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/11/?post_type=press"> November 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/10/?post_type=press"> October 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/09/?post_type=press"> September 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/08/?post_type=press"> August 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/06/?post_type=press"> June 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/05/?post_type=press"> May 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/04/?post_type=press"> April 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2019/03/?post_type=press"> March 2019 </option>
                                                                            <option value="https://corporate.discovertv.com/2018/04/?post_type=press"> April 2018 </option>
                                                                            <option value="https://corporate.discovertv.com/2018/03/?post_type=press"> March 2018 </option>
                                                                            <option value="https://corporate.discovertv.com/2017/01/?post_type=press"> January 2017 </option>
                                                                            <option value="https://corporate.discovertv.com/2016/12/?post_type=press"> December 2016 </option>
                                                                            <option value="https://corporate.discovertv.com/2016/11/?post_type=press"> November 2016 </option>
                                                                            <option value="https://corporate.discovertv.com/2016/10/?post_type=press"> October 2016 </option>
                                                                            <option value="https://corporate.discovertv.com/2016/07/?post_type=press"> July 2016 </option>
                                                                            <option value="https://corporate.discovertv.com/2016/06/?post_type=press"> June 2016 </option>
                                                                            <option value="https://corporate.discovertv.com/2016/02/?post_type=press"> February 2016 </option>
                                                                            <option value="https://corporate.discovertv.com/2016/01/?post_type=press"> January 2016 </option>
                                                                            <option value="https://corporate.discovertv.com/2014/10/?post_type=press"> October 2014 </option>
                                                                            <option value="https://corporate.discovertv.com/2014/09/?post_type=press"> September 2014 </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        </form>
                                                        <div id="press-wrapper">
                                                            <div className="file-item">
                                                                <a href="#" className="">
                                                                    <img width="430" height="240" src={require("../../../images/article/listing-01.jpg")}
                                                                        className="attachment-post-thumbnail-430x240 size-post-thumbnail-430x240 wp-post-image" alt="" /></a>
                                                                <div>
                                                                    <h6><a href="#">boondock NOW AVAILABLE ON NEW TIVO STREAM 4K DEVICE AND STREAMING ON TIVO+</a></h6>
                                                                    <div className="date">August 26, 2020</div>
                                                                </div>
                                                            </div>
                                                            <div className="file-item">
                                                                <a href="#" className="">
                                                                    <img width="430" height="240" src={require("../../../images/article/listing-02.jpg")}
                                                                        className="attachment-post-thumbnail-430x240 size-post-thumbnail-430x240 wp-post-image" alt="" /></a>
                                                                <div>
                                                                    <h6><a href="#">ENDEMOL SHINE ENTERS DEAL WITH US STREAMING SERVICE boondock FOR GLOBAL FORMATS OF MASTERCHEF AND LEGO® MASTERS</a></h6>
                                                                    <div className="date">August 19, 2020</div>
                                                                </div>
                                                            </div>
                                                            <div className="file-item">
                                                                <a href="#" className="">
                                                                    <img width="430" height="240" src={require("../../../images/article/listing-03.jpg")}
                                                                        className="attachment-post-thumbnail-430x240 size-post-thumbnail-430x240 wp-post-image" alt="" /></a>
                                                                <div>
                                                                    <h6><a href="#">boondock ADDS FOX’S SPORTS ENTERTAINMENT SERIES ULTIMATE TAG</a></h6>
                                                                    <div className="date">August 14, 2020</div>
                                                                </div>
                                                            </div>
                                                            <div className="file-item">
                                                                <a href="#" className="">
                                                                    <img width="430" height="240" src={require("../../../images/article/listing-04.jpg")}
                                                                        className="attachment-post-thumbnail-430x240 size-post-thumbnail-430x240 wp-post-image" alt="" /></a>
                                                                <div>
                                                                    <h6><a href="#">FOX ENTERTAINMENT’S AVOD SERVICE, boondock, NAMES CAROLYN FORREST  SENIOR VICE PRESIDENT, GENERAL COUNSEL</a></h6>
                                                                    <div className="date">July 9, 2020</div>
                                                                </div>
                                                            </div>
                                                            <div className="file-item">
                                                                <a href="#" className="">
                                                                    <img width="430" height="240" src={require("../../../images/article/listing-05.jpg")}
                                                                        className="attachment-post-thumbnail-430x240 size-post-thumbnail-430x240 wp-post-image" alt="" /></a>
                                                                <div>
                                                                    <h6><a href="#">FOX ENTERTAINMENT’S AVOD SERVICE boondock ADDS 30 SEASONS OF CULT PHENOM THE JOY OF PAINTING FEATURING BOB ROSS</a></h6>
                                                                    <div className="date">July 1, 2020</div>
                                                                </div>
                                                            </div>
                                                            <div className="file-item">
                                                                <a href="#" className="">
                                                                    <img width="430" height="240" src={require("../../../images/article/listing-01.jpg")}
                                                                        className="attachment-post-thumbnail-430x240 size-post-thumbnail-430x240 wp-post-image" alt="" /></a>
                                                                <div>
                                                                    <h6><a href="#">FOX ENTERTAINMENT’S AVOD SERVICE boondock ENTERS EXCLUSIVE AD SALES PARTNERSHIP WITH FOXTEL MEDIA IN AUSTRALIA</a></h6>
                                                                    <div className="date">June 30, 2020</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a href="#" className="btn white" id="load-more-posts"><span>Load More</span></a>
                                                    </div>
                                                    <div className="pagination">
                                                        <span aria-current="page" className="page-numbers current">1</span>
                                                        <a className="page-numbers" href="#">2</a>
                                                        <span className="page-numbers dots">…</span> <a className="page-numbers" href="#">12</a>
                                                        <a className="page-numbers" href="#">13</a> <a className="next page-numbers" href="#">Older Posts <i></i>
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
                                                <div className="wpb_text_column wpb_content_element ">
                                                    <div className="wpb_wrapper">
                                                        <p style={{ textAlign: 'center' }}>
                                                            <span style={{ color: '#999999' }}>The provided agreements on boondock.com are for informational purposes only and do not constitute legal advice.</span>
                                                        </p>
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
    );
}
export default PressRelease;
