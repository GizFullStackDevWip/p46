import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { convertTime, convertSecondsToMin, deviceDetect } from '../../Utils/utils';


import image1 from '../../images/landing/ride0.jpg';
import image2 from '../../images/landing/ride3.jpg';
import image3 from '../../images/landing/ride3.jpg';
import image4 from '../../images/landing/ride7.jpg';
import image5 from '../../images/landing/ride11.jpg';
// import image6 from '../../images/imagesRevry/4.png';
// import image7 from '../../images/imagesRevry/55.png';
let sliderimages = [
    image1, image2, image3, image4, image5
]
var showsImageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var time = '';

const BannerContainer = () => {
    const [bannerShows, setBannerShows] = useState([]);
    const [bannerSliderShows, setBannerSliderShows] = useState([]);
    const [bannerThumbnail, setBannerThumbnail] = useState([]);
    const [selectedSlider, setSelectedSlider] = useState([]);
    let isDesktop = deviceDetect();

    useEffect(() => {
        var singleObj = []
        service.fetchHomeBannerDetails().then(response => {
            console.log(response, 'response of banner');
            setSelectedSlider(response.data[0]);
            if (response.success == true && response.data.length > 0) {
                var data = response.data;
                setBannerSliderShows(data);
                data.map((item, index) => {
                    singleObj.push(item);
                })
                if (response.data.length < 5) {
                    console.log('if ');
                    let length = 5 - response.data.length;
                    for (var i = 0; i < length; i++) {
                        singleObj.push(response.data[i]);
                    }
                }
                console.log('singleObj', singleObj);
                setBannerThumbnail(singleObj);


            }
        })
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false
    };
    const secondslidersettings = {
        arrows: false,
        dots: false,
        speed: 800,
        autoplay: true,
        // variableWidth: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        // asNavFor: 'hpbSlider',
        centerMode: true,
        focusOnSelect: true,
        pauseOnHover: false
    }
    const selectSlider = (item) => {
        setSelectedSlider(item);
        var singleObj = []
        service.fetchHomeBannerDetails().then(response => {
            if (response.success == true && response.data.length > 0) {
                var data = response.data;
                let items = data.filter(data => data.item = item);
                console.log(items,'items');
                data.map((data, index) => {
                    if(data === item){
                        singleObj.push(data);
                    }
                })
                data.map((data, index) => {
                    if(data !== item){
                        singleObj.push(data);
                    }
                })
                if (response.data.length < 5) {
                    let length = 5 - response.data.length;
                    for (var i = 0; i < length; i++) {
                        singleObj.push(response.data[i]);
                    }
                }
                console.log('singleObj', singleObj);
                setBannerThumbnail(singleObj);
            }
        })

    }
    return (
        <div className="entireBanner">
            <div className="bannerSlider">
                <div className="hpbSlider">
                    {
                        bannerThumbnail !== undefined && bannerThumbnail.length > 0 ?
                            (
                                <Slider {...settings}>
                                    {
                                        bannerThumbnail.map((show, index) => {
                                            return (
                                                <div key={index} className="_1nirg _2KNcl">
                                                    <div className="_1Y3Wa">
                                                        <div className="wvPYB"
                                                            style={{ backgroundImage: `url(${showsImageUrl + show.banner})` }}
                                                        ></div>
                                                        <div className="wvPYB"
                                                            style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45))' }}
                                                        ></div>
                                                    </div>
                                                    <div className="container _3wxhi">
                                                        <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }} style={{ textDecoration: 'none' }}>
                                                            <div className="row _2XGPu">
                                                                <div className="col col-12 col-md-6 _29Ovi">
                                                                    <div className="_2c2HY">
                                                                        <div className="_2EQDR"><span className="_33NIK">{show.show_name}</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="row mGIih">
                                                            <div className="col col-lg-4 _3YKic">
                                                                <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }} style={{ textDecoration: 'none' }}>
                                                                    <div className="_3t5Xl">
                                                                        <div className="BZw9g"
                                                                            style={{ backgroundImage: `url(${showsImageUrl + show.thumbnail})`, cursor: 'default' }}
                                                                        ></div>
                                                                    </div>
                                                                </Link>
                                                                <div className="_3Xnk8">
                                                                    <div className="_1tLWN"></div>
                                                                    <div className="_1fjln">
                                                                        {show.category_name && <div className="_1_mFM">{show.category_name[0]}</div>}
                                                                        {
                                                                            show.year ?
                                                                                <div className="_1MmGl">({show.year}) · {convertSecondsToMin(show.video_duration)}</div>
                                                                                :
                                                                                <div className="_1MmGl">{convertSecondsToMin(show.video_duration)}</div>

                                                                        }
                                                                    </div>
                                                                    {
                                                                        show.rating &&
                                                                        <div className="PoLdP">{show.rating}</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col col-lg-4 _3WSKT">
                                                                <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }} style={{ textDecoration: 'none' }}>
                                                                    <button className="button buttonLarge _2SyTX">
                                                                        <div className="buttonBg"></div>
                                                                        <div className="buttonContent">Watch Now <span className="_2Vow3">FREE</span></div>
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                            <div className="col col-lg-4 _3jpDM">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </Slider>
                            )
                            : null
                    }

                </div>
            </div>
            <div className={isDesktop ? "hpbSliderNav" : "hpbSliderNav bottom"}>
                <Slider {...secondslidersettings}>
                    {
                        bannerThumbnail.map((show, index) => {
                            return (
                                <div className="thumbnailImage" style={{ paddingRight: '5px' }}
                                    onClick={() => { selectSlider(show) }}>
                                    <img src={showsImageUrl + show.thumbnail} alt="" />
                                    <div className="black-overlay"></div>
                                </div>
                            );
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}
export default BannerContainer;