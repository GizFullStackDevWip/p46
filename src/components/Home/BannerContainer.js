import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
const BannerContainer = () => {
    // const [videoDisplay, setVideoDisplay] = useState('none');

    // const [homeVideoUrl, setHomeVideoUrl] = useState();
    // const [homeInnerVideoUrl, setHomeInnerVideoUrl] = useState();
    // const [homeInnerVideoId, setHomeInnerVideoId] = useState();
    // const [homeInnerVideoTitle, setHomeInnerVideoTitle] = useState();
    // const [homeInnerVideoCat, setHomeInnerVideoCat] = useState();

    // const [homeBannerUrl, setHomeBannerUrl] = useState();
    // const [movieLogo, setMovieLogol] = useState();
    // const [bannerShowName, setBannerShowName] = useState();

    const [bannerShows, setBannerShows] = useState([])

    useEffect(() => {
        service.fetchHomeBannerDetails().then(response => {
            console.log('this is the response', response.data);

            if (response.status == 100 && response.data.length > 0) {
                var dataOne = response.data[0];
                var dataTwo = response.data[1];
                localStorage.setItem('bannerUpdate', 1);
                setBannerShows(response.data);

                // setBannerShowName(dataOne.show_name);
                // setHomeVideoUrl(dataOne.teaser);
                // setHomeInnerVideoUrl(dataOne.video_name);
                // setHomeInnerVideoId(dataOne.video_id);
                // setHomeInnerVideoTitle(dataOne.video_title);
                // setHomeInnerVideoCat(dataOne.category_id);
                // setHomeBannerUrl('https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/' + dataOne.banner);
                // setMovieLogol('https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/' + dataOne.banner2);

            } else {
                // setBannerShowName('Fantastic Entertainment');
                // setHomeBannerUrl('../../src/static/cey/img/zbaw.jpg');
                // localStorage.setItem('bannerUpdate', 1);
            }
        })
    }, []);
    return (

        bannerShows.slice(0,1).map((show, index) => {
            return (
                <div className="_1nirg _2KNcl" key={index}>
                    <div className="_1Y3Wa">
                        <div className="wvPYB" style={{ backgroundImage: `url(${bannerShowUrl+show.banner})` }}></div>
                    </div>
                    <div className="container _3wxhi">
                        <div className="row _2XGPu">
                            <div className="col col-12 col-md-6 _29Ovi">
                                <div className="_2c2HY">
                                    <div className="_2EQDR"><span className="_33NIK">{show.show_name}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="row mGIih">
                            <div className="col col-lg-4 _3YKic">
                                <div className="_3t5Xl">
                                    <div className="BZw9g _35eGs"
                                    style={{ backgroundImage: `linear-gradient(to right bottom, rgba(38, 38, 45, 0.7), rgba(38, 38, 45, 0.7)), url(${bannerShowUrl+show.banner}), cursor: pointer` }}
                                    ></div>
                                    <div className="BZw9g"
                                    // style={{ backgroundImage: 'url(./images/homepage/banner-thumbnail/kevin.jpg); cursor: default' }}
                                    ></div>
                                </div>
                                <div className="_3Xnk8">
                                    <div className="_1tLWN"></div>
                                    <div className="_1fjln">
                                        <div className="_1_mFM">Thriller</div>
                                        <div className="_1MmGl">{show.year} · {show.video_duration}min</div>
                                    </div>
                                    <div className="PoLdP">R</div>
                                </div>
                            </div>
                            <div className="col col-lg-4 _3WSKT">
                                <a href="/movies/512252/we_need_to_talk_about_kevin">
                                    <button className="button buttonLarge _2SyTX">
                                        <div className="buttonBg"></div>
                                        <div className="buttonContent">Watch Now <span className="_2Vow3">FREE</span></div>
                                    </button>
                                </a>
                            </div>
                            <div className="col col-lg-4 _3jpDM">
                                <div className="_3t5Xl bqj5o">
                                    <div className="BZw9g _35eGs" style={{ backgroundImage: 'linear-gradient(to right bottom, rgba(38, 38, 45, 0.7), rgba(38, 38, 45, 0.7))' }}
                                    // style="background-image: linear-gradient(to right bottom, rgba(38, 38, 45, 0.7), rgba(38, 38, 45, 0.7)), url(./images/homepage/banner-thumbnail/messenger.jpg); cursor: pointer;"
                                    >
                                        <img src={require("../../images/homepage/banner-thumbnail/messenger.jpg")} />
                                    </div>
                                    <div className="BZw9g"
                                    //  style="background-image: linear-gradient(to right bottom, rgba(38, 38, 45, 0.7), rgba(38, 38, 45, 0.7)), url(./images/homepage/banner-thumbnail/jimi.jpg); cursor: pointer;"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })

    );
}
export default BannerContainer;