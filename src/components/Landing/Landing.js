import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";
// import image from '../../images/landing1.jpeg';
// import image2 from '../../images/landing2.jpeg';
// var landingImages = [image,image2]
const Landing = () => {
    useEffect(() => {
    }, []);
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="landingPageWrapper closeMenuWrapper">
                {/* <Slider {...settings}>
                    {
                        landingImages.map((item, index) => {
                            return ( */}
                                <div className="lpBannerSection">
                                    <div className="lpBannerwrapper">
                                        <div className="Xd2tG"></div>
                                        <div className="container lpMainContainer">
                                            <div className="row lpSectionWrapper">
                                                <div className="col col-12 col-md-12 lpFlexCenter">
                                                    <h1 className="H1"><span>Free Movies &amp; TV<br /></span><span>Fewer Ads than Cable<br /></span><span>No Subscription Required<br /></span></h1>
                                                    <div className="lpSectionFont lpSectionTextCenter">Thousands of movies and TV shows. Always Free. 100% Legal.</div>
                                                    <Link to="/home">
                                                        <button className="button buttonLarge">
                                                            <div className="buttonBg"></div>
                                                            <div className="buttonContent">Start Watching</div>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             {/* );
                        })
                    }
                    </Slider> */}
                    <div className="platformLogosWrapper" style={{ backgroundColor: 'white' }}>
                        <div className="platformLogosImage mobilePlatformLogo">
                            <img src={require("../../images/landing/device-logos.png")} alt="" />
                        </div>
                        <div className="platformLogosImage desktopPlatformLogo">
                            <img src={require("../../images/landing/revry-LOGOS.png")} alt="" />
                        </div>
                        <div className="platformLogosText">
                            <h2 className="plHeading">Watch Free Live and On-Demand LGBTQ+ Movies, Shows, News, Music, Podcasts, &amp; Originals Anytime, Anywhere.&nbsp;And Did We Mention it’s Free?</h2>
                        </div>
                    </div>
                    <div className="feature-slider-container">
                        <div className="arrows">
                            <button className="button buttonSecondary buttonRound carouselPrev slick-prev">
                                <div className="buttonBg"></div>
                                <div className="buttonContent">
                                    <svg viewBox="0 0 12 5" preserveAspectRatio="xMidYMid meet">
                                        <path fill="currentColor" d="M19.5101147,20.9824691 L15.1222085,18.1291511 C14.7625781,17.8609086 14.3044469,18.0239987 14.0989439,18.4934232 C13.8934408,18.9628476 14.0183857,19.5608448 14.3780161,19.8290874 L18.8779198,22.7659425 C18.949842,22.8195882 19.0280761,22.8573102 19.1094446,22.8775766 C19.764809,23.0408078 20.235191,23.0408078 20.8905554,22.8775766 C20.9719239,22.8573102 21.050158,22.8195882 21.1220802,22.7659425 L25.6219839,19.8290874 C25.9816143,19.5608448 26.1065592,18.9628476 25.9010561,18.4934232 C25.6955531,18.0239987 25.2374219,17.8609086 24.8777915,18.1291511 L20.4898853,20.9824691 C20.127802,21.0619724 19.872198,21.0619724 19.5101147,20.9824691 Z" transform="translate(-14 -18)"></path>
                                    </svg>
                                </div>
                            </button>
                            <button className="button buttonSecondary buttonRound carouselNext slick-next">
                                <div className="buttonBg"></div>
                                <div className="buttonContent">
                                    <svg viewBox="0 0 12 5" preserveAspectRatio="xMidYMid meet">
                                        <path fill="currentColor" d="M19.5101147,20.9824691 L15.1222085,18.1291511 C14.7625781,17.8609086 14.3044469,18.0239987 14.0989439,18.4934232 C13.8934408,18.9628476 14.0183857,19.5608448 14.3780161,19.8290874 L18.8779198,22.7659425 C18.949842,22.8195882 19.0280761,22.8573102 19.1094446,22.8775766 C19.764809,23.0408078 20.235191,23.0408078 20.8905554,22.8775766 C20.9719239,22.8573102 21.050158,22.8195882 21.1220802,22.7659425 L25.6219839,19.8290874 C25.9816143,19.5608448 26.1065592,18.9628476 25.9010561,18.4934232 C25.6955531,18.0239987 25.2374219,17.8609086 24.8777915,18.1291511 L20.4898853,20.9824691 C20.127802,21.0619724 19.872198,21.0619724 19.5101147,20.9824691 Z" transform="translate(-14 -18)"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                        <div className="feature-row">
                            <div className="wpb_column vc_column_container vc_col-sm-3">
                                <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                        <div className="vc_row-fluid hover-image vc_custom_1588916753703">
                                            <div className="feature-col-full wpb_column vc_column_container vc_col-sm-12">
                                                <div className="vc_column-inner ">
                                                    <div className="wpb_wrapper">
                                                        <div className="wpb_content_element">
                                                            <div className="wpb_wrapper">
                                                                <a className="feature-link" href="#">
                                                                    <div className="feature-top"> <span>STREAM</span> <strong>LIVE TV<br />CHANNELS</strong> </div>
                                                                    <br />
                                                                    <div className="feature-bottom">
                                                                        <span>Laura Linney<br />
                                                                    Revry Original Series<br />
                                                                            <em>Sink Sank Sunk</em></span>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wpb_column vc_column_container vc_col-sm-3">
                                <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                        <div className="vc_row-fluid hover-image vc_custom_1588916766841">
                                            <div className="feature-col-half wpb_column vc_column_container vc_col-sm-12">
                                                <div className="vc_column-inner ">
                                                    <div className="wpb_wrapper">
                                                        <div className="wpb_content_element">
                                                            <div className="wpb_wrapper">
                                                                <a className="feature-link" href="#">
                                                                    <div className="feature-top"> <span>ALWAYS ON</span> <strong>NEWS</strong> </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="vc_row-fluid hover-image vc_custom_1588298771082">
                                            <div className="feature-col-half wpb_column vc_column_container vc_col-sm-12">
                                                <div className="vc_column-inner ">
                                                    <div className="wpb_wrapper">
                                                        <div className="wpb_content_element">
                                                            <div className="wpb_wrapper">
                                                                <a className="feature-link" href="#">
                                                                    <div className="feature-top"> <span>AUTHENTIC QUEER</span> <strong>MOVIES</strong> </div>
                                                                    <div className="feature-bottom"> <span><em>Blush</em></span> </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wpb_column vc_column_container vc_col-sm-3">
                                <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                        <div className="vc_row-fluid hover-image vc_custom_1588298774570">
                                            <div className="feature-col-full wpb_column vc_column_container vc_col-sm-12">
                                                <div className="vc_column-inner ">
                                                    <div className="wpb_wrapper">
                                                        <div className="wpb_content_element">
                                                            <div className="wpb_wrapper">
                                                                <a className="feature-link" href="#">
                                                                    <div className="feature-top"> <span> GROUNDBREAKING</span> <strong>ORIGINALS</strong> </div>
                                                                    <br />
                                                                    <div className="feature-bottom"> <span>Revry Original Series<br />
                                                                        <em>The Category Is...Mexico City</em></span> </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wpb_column vc_column_container vc_col-sm-3">
                                <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                        <div className="vc_row-fluid hover-image vc_custom_1588298778214">
                                            <div className="feature-col-half wpb_column vc_column_container vc_col-sm-12">
                                                <div className="vc_column-inner ">
                                                    <div className="wpb_wrapper">
                                                        <div className="wpb_content_element">
                                                            <div className="wpb_wrapper">
                                                                <a className="feature-link" href="#">
                                                                    <div className="feature-top"> <span>BOUNDARY-PUSHING</span> <strong>MUSIC</strong> </div>
                                                                    <div className="feature-bottom"> <span><em> LEADR </em></span> </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="vc_row-fluid hover-image vc_custom_1588298781688">
                                            <div className="feature-col-half wpb_column vc_column_container vc_col-sm-12">
                                                <div className="vc_column-inner ">
                                                    <div className="wpb_wrapper">
                                                        <div className="wpb_content_element">
                                                            <div className="wpb_wrapper">
                                                                <a className="feature-link" href="#">
                                                                    <div className="feature-top"> <span>ONE-OF-A-KIND</span> <strong>SHOWS</strong> </div>
                                                                    <div className="feature-bottom"> <span> Revry Original Series<br />
                                                                        <em>Barbelle</em></span> </div>
                                                                </a>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Landing;