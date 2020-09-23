import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/GetVideos/service';
import ReactHlsPlayer from 'react-hls-player';

const queryString = require('query-string');
var details = ''
const Live = (history) => {
    const [videoPlayer, setVideoPlayer] = useState();
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    console.log(parsed.live_link);

    useEffect(() => {
        console.log(history.location.state.channel[0].live_link, 'history gggggggg');
        setVideoPlayer(history.location.state.channel[0].live_link);
        console.log(history, 'history');
    }, []);

    return (
        <div class="pageWrapper searchPageMain">
            <div class="topContainer">
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="videoPageContainer" >
                        <div className="videoPageBGimg"
                            style={{ backgroundImage: 'linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2))' }}
                        ></div>
                        <div className="_2xXnB" >
                            <div className="_2KWdL">
                                <section>
                                    <div className="_3tqpT" style={{ height: '100%' }}>
                                        <ReactHlsPlayer
                                            id='singleVideo'
                                            url="https://gizmeon.s.llnwi.net/livehls/VODToLiveApp/ngrp:CHANNEL354_all/playlist.m3u8"
                                            // url={videoPlayer}
                                            autoplay={false}
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