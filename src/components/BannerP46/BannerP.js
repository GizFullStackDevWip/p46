import React from "react";
import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Image from "./1655804111972.jpg";
import Imagea from "./1656051544092.jpg";
import Imageb from "./1656052487839.jpg";
import Imagec from "./1656056640391.jpg";
import Imaged from "./1657518986663.jpg";
import Landscapea from "./1657518755751.jpg";
import Landscapeb from "./1657518755751.jpg";
import Landscapec from "./1657522456266.jpg";

const BannerP = () => {
  const SliderData = [
    {
      image: Imagea,
    },
    {
      image: Imageb,
    },
    {
      image: Imagec,
    },
  ];
  const LandscapeImage = [
    {
      image: Image,
    },
    {
      image: Landscapea,
    },
    {
      image: Landscapeb,
    },
    {
      image: Landscapec,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div style={{ marginTop: "100px" }} className="LandScape">
        <Slider {...settings}>
          {LandscapeImage.map((item, index) => {
            return (
              <>
                <img style={{ width: "100%" }} src={item.image}></img>
              </>
            );
          })}
        </Slider>
      </div>

      <div style={{ marginTop: "100px" }} className="Portrait">
        <Slider {...settings}>
          {SliderData.map((item, index) => {
            return (
              <>
                <img style={{ width: "100%" }} src={item.image}></img>
              </>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default BannerP;
