import React, { useState, useEffect, useRef } from "react";
import { service } from "../../network/Home/service";
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  convertTime,
  convertSecondsToMin,
  deviceDetect,
} from "../../Utils/utils";

import image1 from "../../images/landing/ride0.jpg";
import image2 from "../../images/landing/ride2.jpg";
import image3 from "../../images/landing/ride3.jpg";
import image4 from "../../images/landing/ride7.jpg";
import image5 from "../../images/landing/ride11.jpg";
// import image6 from '../../images/imagesRevry/4.png';
// import image7 from '../../images/imagesRevry/55.png';
let sliderimages = [image1, image2, image3, image4, image5];
var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/";
var time = "";

const BannerContainer = () => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const [bannerSliderShows, setBannerSliderShows] = useState([]);
  const [bannerThumbnail, setBannerThumbnail] = useState([]);
  const [selectedSlider, setSelectedSlider] = useState([]);
  let isDesktop = deviceDetect();

  useEffect(() => {
    var singleObj = [];
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
    // service.fetchHomeBannerDetails().then((response) => {
    //   setSelectedSlider(response.data);
    //   if (response.success == true && response.data.length > 0) {
    //     var data = response.data;
    //     setBannerSliderShows(data);
    //     data.map((item, index) => {
    //       singleObj.push(item);
    //     });
    //     if (response.data.length < 5) {
    //       let length = 5 - response.data.length;
    //       for (var i = 0; i < length; i++) {
    //         if (response.data[i] == undefined) {
    //           length = length - i;
    //           i = 0;
    //         }
    //         singleObj.push(response.data[i]);
    //       }
    //     }
    //     setBannerThumbnail(singleObj);
    //   }
    // });
  }, []);
  const { nav1, nav2 } = state;

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    // asNavFor: 'hpbSliderNav',
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  const secondslidersettings = {
    arrows: false,
    dots: false,
    speed: 800,
    autoplay: true,
    // variableWidth: true,
    autoplaySpeed: 6000,
    slidesToShow: 4,
    slidesToScroll: 1,
    // asNavFor: 'hpbSlider',
    centerMode: true,
    focusOnSelect: true,
    pauseOnHover: false,
  };
  return (
    <div className="entireBanner">
      <div className="bannerSlider">
        <Slider
          asNavFor={nav2}
          {...settings}
          ref={(slider) => (slider1.current = slider)}
        >
          {bannerThumbnail.map((show, index) => {
            return (
              <div key={index} className="_1nirg _2KNcl">
                {isDesktop ? (
                  <div className="_1Y3Wa">
                    <div
                      className="wvPYB"
                      style={{
                        backgroundImage: `url(${showsImageUrl + show.banner3})`,
                      }}
                    ></div>
                    <div
                      className="wvPYB"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45))",
                      }}
                    ></div>
                  </div>
                ) : (
                  <div className="_1Y3Wa">
                    <div
                      className="wvPYB"
                      style={{
                        backgroundImage: `url(${showsImageUrl + show.banner})`,
                      }}
                    ></div>
                    <div
                      className="wvPYB"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45))",
                      }}
                    ></div>
                  </div>
                )}
                {/* <div className="_1Y3Wa">
                                        <div className="wvPYB"
                                            style={{ backgroundImage: `url(${showsImageUrl + show.banner_1920_676})` }}
                                        ></div>
                                        <div className="wvPYB"
                                            style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45))' }}
                                        ></div>
                                    </div> */}
                <div className="container _3wxhi">
                  <Link
                    to={{
                      pathname: "/home/movies",
                      search: encodeURI(`show_id=${show.show_id}`),
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="row _2XGPu">
                      <div className="col col-12 col-md-6 _29Ovi">
                        <div className="_2c2HY">
                          <div className="_2EQDR">
                            <span className="_33NIK">{show.show_name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="row mGIih">
                    <div className="col col-lg-4 _3YKic">
                      <Link
                        to={{
                          pathname: "/home/movies",
                          search: encodeURI(`show_id=${show.show_id}`),
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="_3t5Xl">
                          <div
                            className="BZw9g"
                            style={{
                              backgroundImage: `url(${
                                showsImageUrl + show.banner
                              })`,
                              cursor: "default",
                              backgroundSize: "55px 80px",
                            }}
                          ></div>
                        </div>
                      </Link>
                      <div className="_3Xnk8">
                        <div className="_1tLWN"></div>
                        <div className="_1fjln">
                          {show.category_name && (
                            <div className="_1_mFM">
                              {show.category_name[0]}
                            </div>
                          )}
                          {show.year ? (
                            <div className="_1MmGl">
                              ({show.year}) · {convertTime(show.video_duration)}
                            </div>
                          ) : (
                            <div className="_1MmGl">
                              {convertTime(show.video_duration)}
                            </div>
                          )}
                          {show.rating && (
                            <div
                              className="PoLdP"
                              style={{ top: "0px", padding: "0px 18px" }}
                            >
                              {show.rating}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col col-lg-4 _3WSKT">
                      <Link
                        to={{
                          pathname: "/home/movies",
                          search: encodeURI(`show_id=${show.show_id}`),
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <button className="button buttonLarge _2SyTX bigButton">
                          <div className="buttonBg rounderbutton"></div>
                          <div className="buttonContent">Watch Now</div>
                        </button>
                      </Link>
                    </div>
                    <div className="col col-lg-4 _3jpDM"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
        <div className={isDesktop ? "hpbSliderNav" : "hpbSliderNav bottom"}>
          <Slider
            {...secondslidersettings}
            asNavFor={nav1}
            ref={(slider) => (slider2.current = slider)}
          >
            {bannerThumbnail.map((show, index) => {
              return show.single_video == 0 ? (
                <div
                  className="thumbnailImage"
                  style={{ paddingRight: "5px" }}
                  key={index}
                >
                  <img src={showsImageUrl + show.banner} alt="" />
                  <div className="black-overlay"></div>
                </div>
              ) : show.single_video == 1 ? (
                <div
                  className="thumbnailImage"
                  style={{ paddingRight: "5px" }}
                  key={index}
                >
                  <img src={showsImageUrl + show.banner} alt="" />
                  <div className="black-overlay"></div>
                </div>
              ) : null;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default BannerContainer;
