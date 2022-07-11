import React from "react";
import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import './banner.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Image  from './1655804111972.jpg'
import Imagea from './1656051544092.jpg'
import Imageb from './1656052487839.jpg'
import Imagec from './1656056640391.jpg'
import Imaged from './1657518986663.jpg'
import Landscapea from './1657518755751.jpg'
import Landscapeb from './1657518755751.jpg'
import Landscapec from './1657522456266.jpg'




const BannerP = () => {
  const SliderData = [
    
    {
      image: Imagea
    }, 
    {
      image: Imageb
    }, {
      image: Imagec
    }
 ];
 const LandscapeImage = [
  {
    image: Image
  },
  {
    image: Landscapea
  }, {
    image: Landscapeb
  }, {
    image: Landscapec
  }
];


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

 


  return (
    <>
      <div id="slider" className="LandScape">
        <div className="figure">
          {LandscapeImage.map((item, index) => {
            return (
              <>
                <div>

                  <img src={item.image}></img>

                </div>
              </>

            )
          })
          }
        </div>
      </div>

      <div id="slider" className="Portrait">
        <div className="figure" >
          {SliderData.map((item, index) => {
            return (
              <>
                <div>

                  <img src={item.image}></img>

                </div>
              </>

            )
          })
          }
        </div>
      </div>


    </>
  )

}

export default BannerP;









