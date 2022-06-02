import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Slider from "react-slick";
import "react-alice-carousel/lib/alice-carousel.css";
import SupportedDeviceSection from "./SupportedDeviceSection";
import QuestionAswerSection from "./QuestionAswerSection";
import { deviceDetect } from "../../Utils/utils";
import { service } from "../../network/service";
// import image1 from "./images/banner.png";
import image1 from "./images/maxresdefault.jpg";

import Header from "../Basic/Header";
var landingImages = [image1];
var landingImagesMobile = [image1];
// var landingImages = [
//   "https://aes-encrypted-playlists.s3.amazonaws.com/discover-static-files/boondock/ride2.jpg",
//   "https://aes-encrypted-playlists.s3.amazonaws.com/discover-static-files/boondock/ride4.jpg",
//   'https://aes-encrypted-playlists.s3.amazonaws.com/discover-static-files/boondock/ride5.jpg',
//   'https://aes-encrypted-playlists.s3.amazonaws.com/discover-static-files/boondock/ride8.jpg',
// ];
// 'https://gizmeon.s.llnwi.net/vod/discover-static-files/boondock/1440x890-bg.jpg'
// , 'https://gizmeon.s.llnwi.net/vod/discover-static-files/boondock/1440x890-bn.jpg'];
// var landingImagesMobile = [
//   "https://gizmeon.s.llnwi.net/vod/discover-static-files/boondock/1440x890-bn.jpg",
//   "https://gizmeon.s.llnwi.net/vod/discover-static-files/boondock/1440x890-bg.jpg",
// ];

const Landing = () => {
  const history = useHistory();
  localStorage.setItem("location", "/");
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let userId = service.getCookie("userId");
  if (isLoggedIn === "true" && userId) {
    return <Redirect to="/home" />;
  }
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
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div>
      {isDesktop === false ? (
        <div className="pageWrapper searchPageMain">
          <div className="topContainer">
            <div className="landingPageWrapper closeMenuWrapper">
              <Slider {...settings}>
                {landingImagesMobile &&
                  landingImagesMobile.map((item, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="mobileBanner"
                          style={{
                            backgroundImage: `url(${item})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "100%",
                          }}
                        >
                          <div className="lpBannerwrapper">
                            <div className="Xd2tG"></div>
                            <div className="container lpMainContainer">
                              <div className="row lpSectionWrapper">
                                <div
                                  className="col col-12 col-md-12 lpFlexCenter"
                                  style={{
                                    paddingTop: "147%",
                                    paddingLeft: "13%",
                                  }}
                                >
                                  <Link to="/home">
                                    <button className="button buttonLarge   bigButton center">
                                      <div
                                        className="buttonBg rounderbutton"
                                        style={{
                                          background: "#cb0a3d",
                                          opacity: "0.7",
                                        }}
                                      ></div>
                                      <div className="buttonContent">
                                        Watch Now for Free
                                      </div>
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
              <div className="lpWhiteSection">
                {/* <div className="platformLogosWrapper" style={{ backgroundColor: 'white' }}>
                                                <div className="platformLogosImage mobilePlatformLogo">
                                                    <img src="https://Into The Outdoorsnation.com/wp-content/uploads/2018/07/bnstream.png" alt="" />
                                                </div>
                                                <div className="platformLogosImage desktopPlatformLogo">
                                                    <img src="https://Into The Outdoorsnation.com/wp-content/uploads/2018/07/bnstream.png" alt="" />
                                                </div>
                                            </div> */}
                <SupportedDeviceSection />
                {/* <QuestionAswerSection /> */}
                <div className="getAccountSection">
                  <div className="container lpMainContainer">
                    <div className="row lpSectionWrapper lpFlexWrapper">
                      <div className="col col-12 col-md-6 lpFlexCenter">
                        <h2>Get an account today</h2>
                        <div className="lpSectionFont gacTextColor lpSectionTextCenter">
                          Access free content on all of your devices, sync your
                          list and continue watching anywhere.
                        </div>
                        <button
                          className="button buttonLarge buttonSecondary"
                          onClick={() => {
                            history.push({ pathname: "/register" });
                          }}
                        >
                          <div className="buttonBg rounderbutton"></div>
                          <div className="buttonContent">Register Free</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pageWrapper searchPageMain">
          <div className="topContainer">
            <div className="landingPageWrapper closeMenuWrapper">
              <Slider {...settings}>
                {landingImages &&
                  landingImages.map((item, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="lpBannerSection"
                          style={{
                            backgroundImage: `url(${item})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "100%",
                          }}
                        >
                          <div className="lpBannerwrapper">
                            <div className="Xd2tG"></div>
                            <div className="container lpMainContainer">
                              {/* <div className="row lpSectionWrapper">
                                                                            <div className="col col-12 col-md-12 lpFlexCenter">
                                                                                <Link to="/register">
                                                                                    <button className="button buttonLarge  " >
                                                                                        <div className="buttonBg" style={{ background: 'rgb(26 144 228 / 98%)' }}></div>
                                                                                        <div className="buttonContent">Watch Now for Free</div>
                                                                                    </button>
                                                                                </Link>
                                                                            </div>
                                                                        </div> */}
                              <div className="row lpSectionWrapper">
                                <div className="col col-4"></div>
                                {localStorage.getItem("isLoggedIn") ? (
                                  <div
                                    className="col col-4"
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginBottom: "35px",
                                    }}
                                  >
                                    <Link to="/home">
                                      <button className="button buttonLarge _2SyTX bigButton center">
                                        <div
                                          className="buttonBg rounderbutton"
                                          style={{
                                            background: "#cb0a3d",
                                            opacity: "0.7",
                                          }}
                                        ></div>
                                        <div className="buttonContent">
                                          Watch Now for Free
                                        </div>
                                      </button>
                                    </Link>
                                  </div>
                                ) : (
                                  <div
                                    className="col col-4"
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginBottom: "35px",
                                    }}
                                  >
                                    <Link to="/home">
                                      <button className="button buttonLarge _2SyTX bigButton center">
                                        <div
                                          className="buttonBg rounderbutton"
                                          style={{
                                            background: "red",
                                            opacity: "0.7",
                                          }}
                                        ></div>
                                        <div className="buttonContent">
                                          Watch Now
                                        </div>
                                      </button>
                                    </Link>
                                  </div>
                                )}
                                <div className="col col-4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
              <div className="lpWhiteSection">
                {/* <div className="platformLogosWrapper" style={{ backgroundColor: 'white' }}>
                                                <div className="platformLogosImage mobilePlatformLogo">
                                                    <img src="https://Into The Outdoorsnation.com/wp-content/uploads/2018/07/bnstream.png" alt="" />
                                                </div>
                                                <div className="platformLogosImage desktopPlatformLogo">
                                                    <img src="https://Into The Outdoorsnation.com/wp-content/uploads/2018/07/bnstream.png" alt="" />
                                                </div>
                                            </div> */}
                <SupportedDeviceSection />

                {/* <QuestionAswerSection /> */}
                <div className="getAccountSection">
                  <div className="container lpMainContainer">
                    <div className="row lpSectionWrapper lpFlexWrapper">
                      <div className="col col-12 col-md-6 lpFlexCenter">
                        <h2>Get an account today</h2>
                        <div className="lpSectionFont gacTextColor lpSectionTextCenter">
                          Access free content on all of your devices, sync your
                          list and continue watching anywhere.
                        </div>
                        <button
                          className="button buttonLarge buttonSecondary"
                          onClick={() => {
                            history.push({ pathname: "/register" });
                          }}
                        >
                          <div className="buttonBg rounderbutton"></div>
                          <div className="buttonContent">Register Free</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Landing;
