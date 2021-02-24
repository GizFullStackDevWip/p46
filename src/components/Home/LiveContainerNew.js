import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import ReactHlsPlayer from 'react-hls-player';
import 'react-multi-carousel/lib/styles.css';
import { convertTimeToLocal, deviceDetect, playerController, ssaiAdParam } from '../../Utils/utils';
var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';
var details = [];
var pause = false;
const handleScroll = () => {
    let playerId = 'singleVideo_html5_api';
    if (deviceDetect() === true) {
        playerController(600, playerId);
    } else {
        playerController(150, playerId);
    }
}

const LiveContainer = () => {
    const [channels, setChannels] = useState([]);
    const [logo, setLogo] = useState('');
    const [videoPlayer, setVideoPlayer] = useState();
    const [isVideoPause, setIsVideoPause] = useState(true);
    useEffect(() => {

        service.getLiveChannels().then(response => {
            if (response.data) {
                setLogo(response.data[0].image);
                setChannels(response.data[0]);
                details = response.data[0];
                if (response.data[0].live_link) {
                    ssaiAdParam(response.data[0]).then(params => {
                        window.playLivePlayer('singleVideo', response.data[0], params);
                    })
                }
            }
        })
        window.addEventListener('scroll', handleScroll)
    }, []);
    const onPlayingFunction = () => {
        setInterval(() => {
            if (pause === false) {
                pause = false
            }
        }, 5000);
    }
    const onPlayerReady = () => {
        let event = 'POP02';
        service.onVideoPlayFunction(details, event).then(response => {
        })
    }
    window.onLiveVideoPlay = (vd) => {
        let event = 'POP03';
        service.onVideoPlayFunction(vd, event).then(response => {
        })
    }
    window.onLiveVideoPause = (vd) => {
        let event = 'POP04';
        setIsVideoPause(false);
        pause = true
        service.onVideoPlayFunction(vd, event).then(response => {
        })
    }
    window.onLiveVideoEnd = (vd) => {
        let event = 'POP05';
        service.onVideoPlayFunction(vd, event).then(response => {
        })
    }
    return (
        <div className="entireBanner" id="live">
            <div className="hpLiveBanner">
                <div className="liveVideoWrapper">
                <video id="singleVideo" className="video-js vjs-default-skin mainPlayer"
                        controls preload="auto"
                        autoPlay >
                    </video>
                    <div className="hpWrapperVideo" style={{ height: '88px' }}>
                        <section className="movieTextWrapper vpRelatedMargin">
                            <div className="vpRelatedImage">
                                {
                                    logo && <img alt={channels.video_title} src={liveThumbnailUrl + logo} width="100%" />
                                }
                                <div className="liveTvBlackOverlay"></div>
                                <div className="liveTvPlay"></div>
                            </div>
                            <div className="movieTextFlex">
                                <div className="movieCatYear">
                                    <div>
                                        <div className="movieCategory mcMargin">
                                            <div>{channels.starttime && convertTimeToLocal(channels.starttime)}{channels.starttime && "-"} {channels.endtime && convertTimeToLocal(channels.endtime)}</div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    channels.video_title && <h3><div className="linkButton movieTextHeading">{channels.video_title}</div></h3>
                                }
                            </div>
                        </section>
                    </div>
                </div>
                <div className="overlayTiles">
                </div>
            </div>
        </div>
    );
};
export default LiveContainer;
