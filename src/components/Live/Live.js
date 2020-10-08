import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/Home/service';
import ReactHlsPlayer from 'react-hls-player';
import 'react-alice-carousel/lib/alice-carousel.css';

const queryString = require('query-string');
var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';

const Live = (history) => {
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    console.log('parsed', parsed);
    const [videoPlayer, setVideoPlayer] = useState();
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        setVideoPlayer(history.location.state.channel[0].live_link);
        console.log(history.location.state.channel[0].live_link);
        service.getLiveChannels().then(response => {
            console.log('live channel', response.data)
            setChannels(response.data);
            console.log(response.data[0].channel_id);
            service.getChannelDetails(response.data[0].channel_id).then(response => {
                console.log('response', response);
            })
        })


    }, []);
    const settings = {
        dots: true,
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        verticalSwiping: true,
        arrows: false
    };
    const liveChannelFunction = () => {

    }
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
                                            {/* <Slider {...settings} style={{ height: "100%" }}> */}
                                            {
                                                channels.map((item, index) => {
                                                    return (
                                                        <div className="mySliderItem">
                                                            <img src={liveThumbnailUrl + item.logo} width={120} onClick={liveChannelFunction} style={{ cursor: 'pointer' }} />
                                                        </div>
                                                    );
                                                })
                                            }
                                            {/* </Slider> */}
                                        </div>
                                        <div className="_3tqpT liveContainer" style={{ height: '100%' }}>
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