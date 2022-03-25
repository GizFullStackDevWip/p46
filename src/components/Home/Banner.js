import React, { useState, useEffect } from "react";
import { service } from "../../network/Landing/service";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

let imageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/";
const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className + " " + "slick__carouselPrev"} onClick={onClick}>
      <div className="sliderPrewArrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 172 172"
          style={{ fill: "#000000", transform: "rotate(90deg)" }}
        >
          <g transform="translate(6.364,6.364) scale(0.926,0.926)">
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="none"
              stroke-linecap="butt"
              stroke-linejoin="none"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <g
                fill="#000000"
                stroke="#ffffff"
                stroke-width="14"
                stroke-linejoin="round"
              >
                <path d="M161.25,48.85875c1.10188,2.62031 0.45688,5.64375 -1.58562,7.60563l-68.8,68.8c-2.6875,2.6875 -7.04125,2.6875 -9.72875,0l-68.8,-68.8c-2.00219,-1.94844 -2.63375,-4.91813 -1.57219,-7.51156c1.04813,-2.59344 3.56094,-4.3 6.35594,-4.3c1.86781,0 3.64156,0.7525 4.945,2.08281l63.93562,63.93562l63.93563,-63.93562c1.26312,-1.31688 2.98312,-2.06938 4.81062,-2.12313c2.83531,-0.05375 5.41531,1.62594 6.50375,4.24625z"></path>
              </g>
              <path
                d="M0,172v-172h172v172z"
                fill="none"
                stroke="none"
                stroke-width="1"
                stroke-linejoin="miter"
              ></path>
              <g
                fill="#ffffff"
                stroke="none"
                stroke-width="1"
                stroke-linejoin="miter"
              >
                <path d="M154.74625,44.6125c-1.8275,0.05375 -3.5475,0.80625 -4.81062,2.12313l-63.93563,63.93562l-63.93562,-63.93562c-1.30344,-1.33031 -3.07719,-2.08281 -4.945,-2.08281c-2.795,0 -5.30781,1.70656 -6.35594,4.3c-1.06156,2.59344 -0.43,5.56312 1.57219,7.51156l68.8,68.8c2.6875,2.6875 7.04125,2.6875 9.72875,0l68.8,-68.8c2.0425,-1.96188 2.6875,-4.98531 1.58562,-7.60563c-1.08844,-2.62031 -3.66844,-4.3 -6.50375,-4.24625z"></path>
              </g>
              <path
                d=""
                fill="none"
                stroke="none"
                stroke-width="1"
                stroke-linejoin="miter"
              ></path>
            </g>
          </g>
        </svg>
        {/* <img
          src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png"
          style={{ transform: "rotate(90deg)" }}
        /> */}
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
        {/* <img src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 172 172"
          style={{ fill: "#000000" }}
        >
          <g transform="translate(6.364,6.364) scale(0.926,0.926)">
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="none"
              stroke-linecap="butt"
              stroke-linejoin="none"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <g
                fill="#000000"
                stroke="#ffffff"
                stroke-width="14"
                stroke-linejoin="round"
              >
                <path d="M161.25,48.85875c1.10188,2.62031 0.45688,5.64375 -1.58562,7.60563l-68.8,68.8c-2.6875,2.6875 -7.04125,2.6875 -9.72875,0l-68.8,-68.8c-2.00219,-1.94844 -2.63375,-4.91813 -1.57219,-7.51156c1.04813,-2.59344 3.56094,-4.3 6.35594,-4.3c1.86781,0 3.64156,0.7525 4.945,2.08281l63.93562,63.93562l63.93563,-63.93562c1.26312,-1.31688 2.98312,-2.06938 4.81062,-2.12313c2.83531,-0.05375 5.41531,1.62594 6.50375,4.24625z"></path>
              </g>
              <path
                d="M0,172v-172h172v172z"
                fill="none"
                stroke="none"
                stroke-width="1"
                stroke-linejoin="miter"
              ></path>
              <g
                fill="#ffffff"
                stroke="none"
                stroke-width="1"
                stroke-linejoin="miter"
              >
                <path d="M154.74625,44.6125c-1.8275,0.05375 -3.5475,0.80625 -4.81062,2.12313l-63.93563,63.93562l-63.93562,-63.93562c-1.30344,-1.33031 -3.07719,-2.08281 -4.945,-2.08281c-2.795,0 -5.30781,1.70656 -6.35594,4.3c-1.06156,2.59344 -0.43,5.56312 1.57219,7.51156l68.8,68.8c2.6875,2.6875 7.04125,2.6875 9.72875,0l68.8,-68.8c2.0425,-1.96188 2.6875,-4.98531 1.58562,-7.60563c-1.08844,-2.62031 -3.66844,-4.3 -6.50375,-4.24625z"></path>
              </g>
              <path
                d=""
                fill="none"
                stroke="none"
                stroke-width="1"
                stroke-linejoin="miter"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

const Banner = () => {
  const history = useHistory();
  const [bannerResp, setBannerResp] = useState();
  const [shows, setShows] = useState([]);
  const [hover, setHover] = useState(false);
  const [focusedId, setFocusedId] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
    service.landingPageBannerContent().then((response) => {
      if (response.success == true) {
        setBannerResp([...response.data]);
      }
      // console.log("landingPageBanner", response);
    });
  }, []);

  const settings = {
    dots: false,
    centerMode: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    // cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="categoryWrapper  bannerSlider">
      <div className="container categoryHeadWrapper">
        <div className="liveTvGuide">
          <div className="vpRightWrapper partnerWrapper">
            <Slider {...settings}>
              {bannerResp &&
                bannerResp.map((item, index) => {
                  // console.log("banner", index, bannerResp);
                  return (
                    <div className="bannerImgDiv"  
                   >
                      <img
                        className=""
                        alt={item.video_title}
                        src={imageUrl + item.banner_one}
                        onClick={() => {
                          {if(item.show_id != null){
                            history.push({
                              pathname: "/home/movies",
                              search: encodeURI(`show_id=${item.show_id}`),
                            }
                            );
                          }
                       if(item.community_id != null){
                          history.push({
                            pathname: "/home/communityShows",
                            search: encodeURI(`community_id=${item.community_id}`),
                          });
                        }
                        if(item.partner_id != null){
                          history.push({
                            pathname: "/home/partnershows",
                            search: encodeURI(`partner_id=${item.partner_id}`),
                          });
                        }
                      }
                     
                    }} key={index}
                        width="100%"
                        style={{ background: "#fff" }}
                      />
                     
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
