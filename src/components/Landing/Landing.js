import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Slider from "react-slick";
import SupportedDeviceSection from './SupportedDeviceSection';
import QuestionAswerSection from './QuestionAswerSection';
import { deviceDetect } from '../../Utils/utils';

import images from '../../images/landing/mobile1.jpeg';
import images2 from '../../images/landing/mobile2.jpeg';
import images3 from '../../images/landing/mobile3.jpeg';

import Header from '../Basic/Header';
var landingImages = [
    'https://gizmeon.s.llnwi.net/vod/happitv-static-files/banner/BOYSBOAT1440X890-2.jpg'
    , 'https://gizmeon.s.llnwi.net/vod/happitv-static-files/banner/BOYSPARK1440X890-2.jpg'
    , 'https://gizmeon.s.llnwi.net/vod/happitv-static-files/banner/GIRLS1440X890copy-2.jpg'
    , 'https://gizmeon.s.llnwi.net/vod/happitv-static-files/banner/PRIDE1440X890-2.jpg'];
var landingImagesMobile = [
    'https://gizmeon.s.llnwi.net/vod/happitv-static-files/banner/mobile1_portrait.jpg'
    , 'https://gizmeon.s.llnwi.net/vod/happitv-static-files/banner/mobile2_portrait.jpg'
    , 'https://gizmeon.s.llnwi.net/vod/happitv-static-files/banner/mobile4_portrait.jpg'];

const Landing = () => {
    const history = useHistory();
    const [isDesktop, setIsDesktop] = useState(deviceDetect());
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
        <div>
            {
                isDesktop === false ?
                    (
                        <div className="pageWrapper searchPageMain">
                            <div className="topContainer">
                                <div className="landingPageWrapper closeMenuWrapper">
                                    <Slider {...settings}>
                                        {
                                            landingImagesMobile &&
                                            landingImagesMobile.map((item, index) => {
                                                return (
                                                    <div key={index} >
                                                        <div className="mobileBanner" style={{
                                                            backgroundImage: `url(${item})`,
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: '100%'
                                                        }}>
                                                            <div className="lpBannerwrapper">
                                                                <div className="Xd2tG"></div>
                                                                <div className="container lpMainContainer">
                                                                    <div className="row lpSectionWrapper">
                                                                        <div className="col col-12 col-md-12 lpFlexCenter" style={{ paddingTop: '147%', paddingLeft: '13%' }}>
                                                                            <Link to="/register">
                                                                                <button className="button buttonLarge watchBottom" >
                                                                                    <div className="buttonBg" style={{ background: '#e0559ca1' }}></div>
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
                                                        <button className="button buttonLarge buttonSecondary" onClick={() => {
                                                            history.push(
                                                                { pathname: '/register' }
                                                            )
                                                        }}>
                                                            <div className="buttonBg"></div>
                                                            <div className="buttonContent">Register Free</div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    ) :
                    (
                        <div className="pageWrapper searchPageMain">
                            <div className="topContainer">
                                <div className="landingPageWrapper closeMenuWrapper">
                                    <Slider {...settings}>
                                        {
                                            landingImages &&
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
                                                                            <Link to="/register">
                                                                                <button className="button buttonLarge watchBottom" >
                                                                                    <div className="buttonBg" style={{ background: '#e0559ca1' }}></div>
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
                                                        <button className="button buttonLarge buttonSecondary" onClick={() => {
                                                            history.push(
                                                                { pathname: '/register' }
                                                            )
                                                        }}>
                                                            <div className="buttonBg"></div>
                                                            <div className="buttonContent">Register Free</div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
            }
        </div>
    );
}
export default Landing;
