import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import ReactHlsPlayer from 'react-hls-player';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";

const queryString = require('query-string');
var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';

const Live = (history) => {
    var { search } = useLocation();
    const parsed = queryString.parse(search);

    const [videoPlayer, setVideoPlayer] = useState();
    const [channels, setChannels] = useState([]);
    const [hover, setHover] = useState('none');

    useEffect(() => {
        setVideoPlayer(history.location.state.channel[0].live_link);
        service.getLiveChannels().then(response => {
            console.log('live channel',response.data)
            setChannels(response.data);
        })

    }, []);
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const settings = {

        dots: true,
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        verticalSwiping: true,
        arrows: false
    };
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="videoPageContainer" >
                        <div className="_2xXnB" >
                            <div className="_2KWdL">
                                <section>
                                    <div className="videoContainer">
                                        <div className="liverOverlay">
                                            <Slider {...settings} style={{ height: "100%" }}>
                                                {
                                                    channels.map((item, index) => {
                                                        return (
                                                            <div className="mySliderItem">
                                                                {/* <div className="moviePoster" style={{ backgroundImage: `url(${liveThumbnailUrl + item.logo})` }} >
                                                                </div> */}
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </Slider>
                                        </div>
                                        <div className="_3tqpT playerContainer" style={{ height: '100%' }}>
                                            <ReactHlsPlayer
                                                id='singleVideo'
                                                url={videoPlayer}
                                                autoplay={true}
                                                controls={true}
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Live;