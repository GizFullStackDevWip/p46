import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import ReactHlsPlayer from 'react-hls-player';

const queryString = require('query-string');
var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';

const Live = (history) => {
    const [videoPlayer, setVideoPlayer] = useState();
    const [channels, setChannels] = useState([]);
    const [hover, setHover] = useState('none');

    var { search } = useLocation();
    const parsed = queryString.parse(search);
    console.log(parsed.live_link);

    useEffect(() => {
        console.log(history.location.state.channel[0].live_link, 'history gggggggg');
        setVideoPlayer(history.location.state.channel[0].live_link);
        console.log(history, 'history');
        service.getLiveChannels().then(response => {
            console.log(response, 'res chanel')
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
    return (
        <div class="pageWrapper searchPageMain">
            <div class="topContainer">
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="videoPageContainer" >
                        <div className="videoPageBGimg" onMouseLeave={() => { setHover('none') }}
                            style={{ zIndex: '2', width: '30%',display:hover }}>
                        </div>


                        <div className="_2xXnB" >
                            <div className="_2KWdL">
                                <button onMouseOver={() => { setHover('block') }}>click</button>
                                <section>
                                    <div className="_3tqpT" style={{ height: '100%' }}>
                                        <ReactHlsPlayer
                                            id='singleVideo'
                                            url={videoPlayer}
                                            autoplay={true}
                                            controls={true}
                                            width={'100%'}
                                            height={'100%'}
                                        />
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