import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import "./Landing.css";
import "./landingSlider.css";
import { service } from "../../network/service";
import deviceLogoM from "../../images/device-logos.png";
import deviceLogoD from "../../images/revry-LOGOS.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var mobileImgList = [
  {
    image:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/revry1.png",
    show_name: "Bottom Feeders",
    title: "TV CHANNELS",
  },
  {
    image:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/news.jpg",
    show_name: "Dropped",
    title: "TV SHOWS",
  },
  {
    image:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/layer-7.jpg",
    show_name: "Alaskas Wild Gourmet",
    title: "SERIES",
  },
  {
    image: "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/09.jpg",
    show_name: "Carters WAR",
    title: "TV CHANNELS",
  },
  {
    image: "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/08.jpg",
    show_name: "Close Quarter Battles",
    title: "TV SHOWS",
  },
  {
    image:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/bcr.JPG",
    show_name: "Back Country Rescue",
    title: "SERIES",
  },
];

var desktopImgList = [
  {
    image:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/revry1.png",
    show_name: "Bottom Feeders",
    singleImage: true,
  },
  {
    image1:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/08.jpg",
    image2:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/03.jpg",
    show_name1: "Close Quarter Battles",
    show_name2: "Alaska's Ultimate Bush Pilots",
    singleImage: false,
  },
  {
    image:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/layer-7.jpg",
    show_name: "Alaskas Wild Gourmet",
    singleImage: true,
  },
  {
    image1:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/news.jpg",
    image2:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/09.jpg",
    show_name1: "Dropped",
    show_name2: "Carters WAR",
    singleImage: false,
  },
  {
    image: "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/07.jpg",
    show_name: "Carters WAR",
    singleImage: true,
  },
  {
    image1:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/06.jpg",
    image2:
      "https://gizmeon.s.llnwi.net/vod/outdoorchannel-static-files/barbelle8438.jpg",
    show_name1: "Alaska's Ultimate Bush Pilots",
    show_name2: "Alaskas Wild Gourmet",
    singleImage: false,
  },
];

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className + " " + "slick__carouselPrev"} onClick={onClick}>
      <div className="sliderPrevArrow">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png"
          style={{ transform: "rotate(90deg)" }}
        />
      </div>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className + " " + "slick__carouselNext"}
      onClick={onClick}
      style={{ zIndex: "999999", width: "50px" }}
    >
      <div className="sliderNextArrow">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png"
          style={{ transform: "rotate(90deg)" }}
        />
      </div>
    </div>
  );
};

const Landing = () => {
  const history = useHistory();
  localStorage.setItem("location", "/");
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let userId = service.getCookie("userId");
  if (isLoggedIn === "true" && userId) {
    return <Redirect to="/home" />;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    arrows: true,
    dots: false,
    // infinite: true,
    speed: 500,
    fade: true,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
  };
  const settingss = {
    dots: false,
    centerMode: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1147,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // arrows: false,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="top__container">
      <div className="landing__Page__Wrapper menuCloseJS closeMenuWrapper">
        {/* <div className="lpBanner__Section">
          <div className="lpBanner__wrapper">
            <div className="Xd2tG"></div>
            <div className="container lpMain__Container">
              <div className="row lpSection__Wrapper">
                <div className="col col-12 col-md-12 lpFlex__Center">
                  <h1 className="H1">
                    <span>
                      VOD &amp; TV
                      <br />
                    </span>
                    <span>
                      Fewer Ads than Cable
                      <br />
                    </span>
                    
                  </h1>
                  <div className="lpSection__Font lpSection__Text__Center">
                    Thousands of series and TV shows. 100% Legal.
                  </div>
                  <a href="/home">
                    <button className="button buttonLarge">
                      <div className="buttonBg"></div>
                      <div className="buttonContent">Start Watching</div>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="platform__Logos__Wrapper">
          <div className="platform__Logos__Image mobile__Platform__Logo">
            <img src={deviceLogoM} alt="" />
          </div>
          <div className="platform__Logos__Image desktop__Platform__Logo">
            <img src={deviceLogoD} alt="" />
          </div>
          <div className="platform__Logos__Text">
            <h2 className="pl__Heading">
              Sorry! Outdoor MAX content is unavailable in your country.
            </h2>
          </div>
        </div>
        <div className="feature-slider-container moblie__slider__wrapper">
          <div className="feature-row">
            {mobileImgList &&
              mobileImgList.map((item, index) => {
                return (
                  <div
                    className="wpb_column vc_column_container vc_col-sm-3"
                    key={index}
                  >
                    <div className="vc_column-inner ">
                      <div className="wpb_wrapper">
                        <div
                          className="vc_row-fluid hover-image vc__custom_1588916753703"
                          style={{ backgroundImage: `url("${item.image}")` }}
                        >
                          <div className="feature-col-full wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner ">
                              <div className="wpb_wrapper">
                                <div className="wpb_content_element">
                                  <div className="wpb_wrapper">
                                    <a className="feature-link" href="#">
                                      <div className="feature-top">
                                        {" "}
                                        <span>VOD</span>
                                        <strong>{item.title}</strong>
                                      </div>
                                      <br />
                                      <div className="feature-bottom">
                                        <span>
                                          {item.show_name}
                                          {/* <br />
                                          Revry Original Series
                                          <br /> */}
                                          {/* <em>Sink Sank Sunk</em> */}
                                        </span>
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
                );
              })}
          </div>
        </div>
        {/* dddd */}
        <div className="feature-slider-container desktop__slider__wrapper">
          <div className="feature-row">
            {/* start */}
            <Slider {...settingss}>
              {desktopImgList &&
                desktopImgList.map((item, index) => {
                  if (item.singleImage === true) {
                    return (
                      <div
                        className="wpb_column vc_column_container vc_col-sm-3"
                        key={index}
                      >
                        <div className="vc_column-inner ">
                          <div className="wpb_wrapper">
                            <div
                              className="vc_row-fluid hover-image vc_custom_1588916753703"
                              style={{
                                backgroundImage: `url("${item.image}")`,
                              }}
                            >
                              <div className="feature-col-full wpb_column vc_column_container vc_col-sm-12">
                                <div className="vc_column-inner ">
                                  <div className="wpb_wrapper">
                                    <div className="wpb_content_element">
                                      <div className="wpb_wrapper">
                                        <a className="feature-link" href="#">
                                          <div className="feature-top">
                                            {" "}
                                            <span>VOD</span>
                                            <strong>
                                              TV
                                              <br />
                                              CHANNELS
                                            </strong>
                                          </div>
                                          <br />
                                          <div className="feature-bottom">
                                            <span>
                                              {/* {item.show_name}
                                              <br />
                                              Revry Original Series
                                              <br /> */}
                                              <em>{item.show_name}</em>
                                            </span>
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
                    );
                  } else {
                    return (
                      <div
                        className="wpb_column vc_column_container vc_col-sm-3"
                        key={index}
                      >
                        <div className="vc_column-inner ">
                          <div className="wpb_wrapper">
                            <div
                              className="vc_row-fluid hover-image vc_custom_1588916766841"
                              style={{
                                backgroundImage: `url("${item.image1}")`,
                              }}
                            >
                              <div className="feature-col-half wpb_column vc_column_container vc_col-sm-12">
                                <div className="vc_column-inner ">
                                  <div className="wpb_wrapper">
                                    <div className="wpb_content_element">
                                      <div className="wpb_wrapper">
                                        <a className="feature-link" href="#">
                                          <div className="feature-top">
                                            {" "}
                                            <span>ALWAYS ON</span>
                                            <strong>NEWS</strong>
                                          </div>
                                          <div className="feature-bottom">
                                            <span>
                                              <em>{item.show_name1}</em>
                                            </span>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="vc_row-fluid hover-image vc_custom_1588298771082"
                              style={{
                                backgroundImage: `url("${item.image2}")`,
                              }}
                            >
                              <div className="feature-col-half wpb_column vc_column_container vc_col-sm-12">
                                <div className="vc_column-inner ">
                                  <div className="wpb_wrapper">
                                    <div className="wpb_content_element">
                                      <div className="wpb_wrapper">
                                        <a className="feature-link" href="#">
                                          <div className="feature-top">
                                            {" "}
                                            {/* <span>SERIES</span>{" "} */}
                                            <strong>SERIES</strong>{" "}
                                          </div>
                                          <div className="feature-bottom">
                                            <span>
                                              <em>{item.show_name2}</em>
                                            </span>
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
                    );
                  }
                })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
