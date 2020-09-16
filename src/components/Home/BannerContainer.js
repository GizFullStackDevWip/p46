import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';

const BannerContainer = () => {
    const [bannerShows, setBannerShows] = useState([]);
    const [bannerSliderShows, setBannerSliderShows] = useState([]);
    useEffect(() => {
        var singleObj = []
        service.fetchHomeBannerDetails().then(response => {
            console.log('this is the bannertresponse', response.data);
            if (response.status == 100 && response.data.length > 0) {
                var data = response.data;
                setBannerSliderShows(data);
                data.map((item, index) => {
                    if (index == 0) {
                        singleObj.push(item);
                    }
                })
                setBannerShows(singleObj);
            }
        })
    }, []);
    const selectSliderImage = (show) => {
        console.log(show);
        var singleObj = []
        service.fetchHomeBannerDetails().then(response => {
            console.log('this is the response', response.data);
            if (response.status == 100 && response.data.length > 0) {
                var data = response.data;
                setBannerSliderShows(data);
                data.map((item, index) => {
                    if (show.show_id == item.show_id) {
                        singleObj.push(item);
                    }
                })
                setBannerShows(singleObj);
            }
        })
    }
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const setting = {
        arrows: false,
        dots: false,
        speed: 500,
        autoplay: true,
        variableWidth: true,
        cssEase: 'linear',
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
    };
    const handleOnDragStart = (e) => e.preventDefault()
    return (
        < div className="entireBanner"  style={{height: '500px'}}>
            <div className="bannerSlider">
                {
                    bannerSliderShows !== undefined && bannerSliderShows.length > 0 ?

                        (
                            <Slider {...settings}>
                                {
                                    bannerSliderShows.map((show, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="_1nirg _2KNcl">
                                                    <div className="_1Y3Wa">
                                                        <div className="wvPYB"
                                                            style={{ backgroundImage: `url(${bannerShowUrl + show.banner})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="container _3wxhi" style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45))' }}>
                                                        {

                                                            show.single_video === 0 ?
                                                                (
                                                                    <Link to={{ pathname: '/home/series', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                                        <div className="row _2XGPu">
                                                                            <div className="col col-12 col-md-6 _29Ovi">
                                                                                <div className="_2c2HY">
                                                                                    <div className="_2EQDR"><span className="_33NIK">{show.show_name}</span></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                ) :
                                                                (
                                                                    show.single_video === 1 ?
                                                                        <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                                            <div className="row _2XGPu">
                                                                                <div className="col col-12 col-md-6 _29Ovi">
                                                                                    <div className="_2c2HY">
                                                                                        <div className="_2EQDR"><span className="_33NIK">{show.show_name}</span></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                        :
                                                                        null
                                                                )
                                                        }
                                                        <div className="row mGIih">
                                                            <div className="col col-lg-4 _3YKic">
                                                                <div className="_3t5Xl">
                                                                    <div className="BZw9g"
                                                                        style={{ backgroundImage: `url(${bannerShowUrl + show.banner})`, cursor: 'default' }}
                                                                    ></div>
                                                                </div>
                                                                <div className="_3Xnk8">
                                                                    <div className="_1tLWN"></div>
                                                                    <div className="_1fjln">
                                                                        <div className="_1_mFM">{show.category_name[0]}</div>
                                                                        <div className="_1MmGl">{show.year} · {show.video_duration}min</div>
                                                                    </div>
                                                                    <div className="PoLdP">{show.rating}</div>
                                                                </div>
                                                            </div>
                                                            <div className="col col-lg-4 _3WSKT">
                                                                {
                                                                    show.single_video === 0 ?
                                                                        (
                                                                            <Link to={{ pathname: '/home/series', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                                                <button className="button buttonLarge _2SyTX">
                                                                                    <div className="buttonBg"></div>
                                                                                    <div className="buttonContent">Watch Now <span className="_2Vow3">FREE</span></div>
                                                                                </button>
                                                                            </Link>
                                                                        ) : (
                                                                            show.single_video === 1 ?
                                                                                <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                                                    <button className="button buttonLarge _2SyTX">
                                                                                        <div className="buttonBg"></div>
                                                                                        <div className="buttonContent">Watch Now <span className="_2Vow3">FREE</span></div>
                                                                                    </button>
                                                                                </Link>
                                                                                :
                                                                                null
                                                                        )
                                                                }

                                                            </div>
                                                            <div className="col col-lg-4 _3jpDM">
                                                            </div>
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
            {/* <div className="hpbSliderNav">
                <Slider {...setting}>
                    {
                        bannerSliderShows.map((show, index) => {
                            return (
                                <div className="thumbnailImage">
                                    <img src={bannerShowUrl + show.banner} alt="" />
                                    <div className="black-overlay"></div>
                                </div>
                            );
                        })
                    }
                </Slider>
            </div> */}
        </div >
    );
}
export default BannerContainer;