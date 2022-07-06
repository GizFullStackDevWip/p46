import React from "react";
import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


const Banner = ()=>{
    const SliderData = [
        {
          image:
          'https://www.projectfortysix.com/wp-content/uploads/2021/12/Oklahoma-Conservative-News-Media.png'
         },
        {
          image:'https://cdn5.anyclip.com/cE20M30BumV05oWs-a2H/1637250110587_248x140_thumbnail.jpg?wid=0016900002hO7xy_13313'
         
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiUwEsxPFDWzfTaTbumkJLq40q38-Ln7toUw&usqp=CAU'
            
        },
        {
          image:'https://cdn5.anyclip.com/LyiGhYABVAAjy6w6_pux/1651507719905_248x140_thumbnail.jpg?wid=0016900002hO7xy_13313'
            
        },
        {
          image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvNhQJ2ZLKR3dTkwOTgdXxd3QqWOcSr_ezQ&usqp=CAU'
        }
      ];

      const [current, setCurrent] = useState(0);
      const length = SliderData.length;

      if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
      }
      const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
      const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
      };


    return(
        <>
        <div className="bannerWrapper">
           <div className="bannerImages">
           <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}  />
           <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
             {SliderData.map((item, index)=>{
                return (
                  <>
                  <div className={index === current ? 'slide active' : 'slide'} key={index}>
                  {index === current && (
                  <img className="bannerImage" src={item.image} alt="Banner Images"/>)}
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

export default Banner;