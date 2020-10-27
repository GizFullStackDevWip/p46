import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import ReactHlsPlayer from 'react-hls-player';
import 'react-multi-carousel/lib/styles.css';
import { convertTimeToLocal, deviceDetect, playerController } from '../../Utils/utils';
var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';
var details = [];
var pause = false;
const handleScroll = () => {
    let playerId = 'singleVideo';
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
            console.log('channel get all->', response.data[0]);
            if (response.data) {
                setLogo(response.data[0].image);
                setChannels(response.data[0]);
                details = response.data[0];
                if (response.data[0].live_link) {
                    setVideoPlayer(<ReactHlsPlayer
                        id='singleVideo'
                        url={response.data[0].live_link}
                        autoplay={true}
                        controls={true}
                        width={'100%'}
                        height={'100%'}
                        onPlayerReady={onPlayerReady}
                        onReady={onPlayerReady}
                        onPlay={onVideoPlay}
                        onPlaying={onPlayingFunction}
                        onPause={onVideoPause}
                        onEnded={onVideoEnd}
                    />)
                }
            }
        })
        window.addEventListener('scroll', handleScroll)
    }, []);
    const onPlayingFunction = () => {
        setInterval(() => {
            console.log('isVideoPause', pause);
            if (pause === false) {
                console.log('hey time out paying');
                pause = false
            }
        }, 5000);
    }
    const onPlayerReady = () => {
        let event = 'POP02';
        service.onVideoPlayFunction(details, event).then(response => {
        })
    }
    const onVideoPlay = () => {
        let event = 'POP03';
        service.onVideoPlayFunction(details, event).then(response => {
        })
    }
    const onVideoPause = () => {
        console.log('clicked');
        let event = 'POP04';
        setIsVideoPause(false);
        pause = true
        service.onVideoPlayFunction(details, event).then(response => {
        })
    }
    const onVideoEnd = () => {
        let event = 'POP05';
        service.onVideoPlayFunction(details, event).then(response => {
        })
    }
    return (
        <div className="entireBanner" id="live">
            <div className="hpLiveBanner">
                <div className="liveVideoWrapper">
                    {videoPlayer}
                    <div className="hpWrapperVideo">
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
