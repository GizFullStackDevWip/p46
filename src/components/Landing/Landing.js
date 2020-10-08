import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";
import SupportedDeviceSection from './SupportedDeviceSection';
import QuestionAswerSection from './QuestionAswerSection';
import image from '../../images/landing/1.jpg';
import image2 from '../../images/landing/2.jpg';
import image3 from '../../images/landing/3.jpg';

// import image4 from '../../images/landing/new4.jpg';
var landingImages = [image, image2, image3]

const Landing = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="landingPageWrapper closeMenuWrapper">
                    <Slider {...settings}>
                        {
                            landingImages.map((item, index) => {
                                return (
                                    <div key={index} >
                                        <div className="lpBannerSection" style={{ 
                                                        backgroundImage: `url(${item})`,
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: '100%'                                                        
                                                        }}>
                                            <div className="lpBannerwrapper">
                                                <div className="Xd2tG"></div>
                                                <div className="container lpMainContainer">
                                                    <div className="row lpSectionWrapper">
                                                        <div className="col col-12 col-md-12 lpFlexCenter">
                                                            {/* {
                                                                index === 2 ?
                                                                    <div>
                                                                        <h1 className="H1" style={{color:'#000'}}><span >FREE MOVIES &amp; TV<br /></span><span>FEWER ADS. NO SUBSCRIPTION<br /></span></h1>
                                                                        <div className="lpSectionFont lpSectionTextCenter" style={{color:'#000'}}>The best content, free and legal</div>
                                                                    </div> :
                                                                    <div>
                                                                        <h1 className="H1"><span>FREE MOVIES &amp; TV<br /></span><span>FEWER ADS. NO SUBSCRIPTION<br /></span></h1>
                                                                        <div className="lpSectionFont lpSectionTextCenter">The best content, free and legal</div>
                                                                    </div>
                                                            } */}

                                                            <Link to="/home">
                                                                <button className="button buttonLarge watchBottom" >
                                                                    <div className="buttonBg"></div>
                                                                    <div className="buttonContent">Start Watching</div>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Slider>
                    <div className="lpWhiteSection">
                        <SupportedDeviceSection />
                        <QuestionAswerSection />
                        <div className="getAccountSection">
                            <div className="container lpMainContainer">
                                <div className="row lpSectionWrapper lpFlexWrapper">
                                    <div className="col col-12 col-md-6 lpFlexCenter">
                                        <h2>Get an account today</h2>
                                        <div className="lpSectionFont gacTextColor lpSectionTextCenter">Access free content on all of your devices, sync your list and continue watching anywhere.</div>
                                        <Link to="/register">
                                            <button className="button buttonLarge buttonSecondary">
                                                <div className="buttonBg"></div>
                                                <div className="buttonContent">Register Free</div>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Landing;
