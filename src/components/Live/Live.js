import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import ReactHlsPlayer from 'react-hls-player';

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
                            style={{ zIndex: '2', width: '30%', display: hover }}>
                            <Carousel responsive={responsive}>
                                {
                                    channels.map((item, index) => {
                                        return (
                                            <div className="movieTile" key={index} style={{ padding: '12px',backgroundColor:'white' }} >
                                                <div className="movieTileImage">
                                                    <div className="movieTileIcon movieTileHover">
                                                        <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}>
                                                            <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                            <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                        </svg>
                                                    </div>
                                                    <Link to={{ pathname: '/home/live', state: { channel: channels } }}>
                                                        <img  src={liveThumbnailUrl + item.logo}/>
                                                        {/* <div className="moviePoster" style={{ backgroundImage: `url(${liveThumbnailUrl + item.logo})` }} >
                                                            <div className="FeNml"></div>
                                                        </div> */}
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </Carousel>
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