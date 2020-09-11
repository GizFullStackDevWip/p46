import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';

const BannerContainer = () => {
    const [bannerShows, setBannerShows] = useState([]);
    const [bannerSliderShows, setBannerSliderShows] = useState([]);
    useEffect(() => {
        var singleObj = []
        service.fetchHomeBannerDetails().then(response => {
            console.log('this is the response', response.data);
            if (response.status == 100 && response.data.length > 0) {
                var data = response.data;
                setBannerSliderShows(data);
                data.map((item,index)=>{
                    if(index == 0){
                        singleObj.push(item);
                    }
                })
                setBannerShows(singleObj);
            }
        })
    }, []);
    const selectSliderImage = (show) =>{
        console.log(show);
        var singleObj = []
        service.fetchHomeBannerDetails().then(response => {
            console.log('this is the response', response.data);
            if (response.status == 100 && response.data.length > 0) {
                var data = response.data;
                setBannerSliderShows(data);
                data.map((item,index)=>{
                    if(show.show_id == item.show_id){
                        singleObj.push(item);
                    }
                })
                setBannerShows(singleObj);
            }
        })
    }
    const handleOnDragStart = (e) => e.preventDefault()
    return (
        < div className="entireBanner" >
            {
                bannerShows.slice(0, 1).map((show, index) => {
                    return (
                        <div className="bannerSlider" key={index}>
                            <div className="hpbSlider">
                                <div className="_1nirg _2KNcl">
                                    <div className="_1Y3Wa">
                                        <div className="wvPYB"
                                            style={{ backgroundImage: `url(${bannerShowUrl + show.banner})` }}
                                        ></div>
                                    </div>
                                    <div className="container _3wxhi" style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45))' }}>
                                        <Link to={{ pathname: '/home/series', search: encodeURI(`show_id=${show.show_id}`) }}>
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
                                                <div className="_3t5Xl">
                                                    <div className="BZw9g"
                                                        style={{ backgroundImage: `url(${bannerShowUrl + show.thumbnail})`, cursor: 'default' }}
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
                                                <Link to={{ pathname: '/home/series', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                    <button className="button buttonLarge _2SyTX">
                                                        <div className="buttonBg"></div>
                                                        <div className="buttonContent">Watch Now <span className="_2Vow3">FREE</span></div>
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="col col-lg-4 _3jpDM">
                                                <div className="hpbSliderNav">
                                                    <div className="thumbnailImage" >
                                                        {
                                                            bannerSliderShows.map((show, index) => {
                                                                return (
                                                                    <img key={index} style={{marginLeft: '12px'}} onClick={()=>{selectSliderImage(show)}} src={bannerShowUrl + show.thumbnail} alt="" />
                                                                );
                                                            })
                                                        }
                                                        <div className="black-overlay" style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45))' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div >
    );
}
export default BannerContainer;