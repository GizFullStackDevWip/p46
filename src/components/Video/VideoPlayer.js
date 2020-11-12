import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/Video/service';
import { useSelector, useDispatch } from 'react-redux';
import {convertAdUrl} from '../../Utils/utils'
// import { useId } from "react-id-generator";
var details = []
const VideoPlayer = (history) => {

    const [videoPlayer, setVideoPlayer] = useState(
        <video id="content_video" className="video-js vjs-default-skin mainPlayer"
            controls preload="auto" > <source src="" type="video/mp4" /> </video>
    );
    const [autoPlay, setAutoplay] = useState(false);
    const [videoDetails, setVideoDetails] = useState();
    const historys = useHistory();
    // const [htmlId] = useId();
    const login = useSelector((state) => state.login);

    useEffect(() => {
        // console.log('session id',htmlId);
        window.scrollTo(0, 0);

        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            let show_details = history.location.state.show_details;
            setVideoDetails(show_details);
            details = show_details;
            service.playerToken().then(tokenResponse => {
                let arr = show_details.video_name.split('/');
                let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[5] + '&token=' + tokenResponse.data.data + '&type=video';
                // setVideoPlayer(<ReactHlsPlayer
                //     id='singleVideo'
                //     url={newURL}
                //     autoplay={true}
                //     controls={true}
                //     width={'100%'}
                //     height={'100%'}
                //     onPlayerReady={onPlayerReady}
                //     onReady={onPlayerReady}
                //     onPlay={onVideoPlay(show_details.video_id)}
                //     onPause={onVideoPause}
                //     onEnded={onVideoEnd}
                // />)
                let videoElem = 'content_video' + show_details.video_id + new Date().valueOf();
                setVideoPlayer(<video id={videoElem} className="video-js vjs-default-skin mainPlayer"
                    controls preload="auto"
                    autoPlay >
                    <source src={newURL} type="application/x-mpegURL" />
                </video>)
                // show_details.ad_link = 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator=';
                
                let adUrl = convertAdUrl(show_details);
                window.playMainPlayer(adUrl, videoElem, show_details.video_id, details);

            })
        } else {
            historys.push({
                pathname: '/signin'
            });
        }
    }, [login, autoPlay])
    const onPlayerReady = () => {
        let event = 'POP02';
        service.onVideoPlayFunction(details, event).then(response => {
        })
    }
    window.onVideoPlay = (videoId, vd) => {
        let event = 'POP03';
        service.checkVideoSubscription(videoId).then(response => {
            let videoDetails = response.data[0];
            if (videoDetails.premium_flag == 1 || videoDetails.payper_flag == 1 || videoDetails.rental_flag == 1) {
                service.checkUserSubscription().then(useResponse => {
                    if (useResponse.data.length == 0) {
                        let isLoggedIn = localStorage.getItem('isLoggedIn');
                        if (isLoggedIn == 'false') {
                            history.push({
                                pathname: '/signin'
                            });
                        }
                    }
                })
            } else {
                // console.log('playing...')
            }
        })
        service.onVideoPlayFunction(vd, event).then(response => {
        })
    }
    window.onVideoPause = (vd) => {
        let event = 'POP04';
        service.onVideoPlayFunction(vd, event).then(response => {
            //sd
        })
    }
    window.onVideoEnd = (vd) => {
        let event = 'POP05';
        service.onVideoPlayFunction(vd, event).then(response => {
            historys.push({
                pathname: '/home'
            });
        })
    }
    const onclickFuntion = () => {
        setAutoplay(true);
    }

    const closeVideo = () => {
        historys.goBack();
    }
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="entireBanner" id="live">
                        <div className="hpLiveBanner">
                            <div className="liveVideoWrapper">
                                {videoPlayer}
                            </div>
                        </div>
                    </div>
                    {/* <div className="videoContainer">
                        <div className="_3tqpT videoPlayerContainer">
                            {videoPlayer}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
export default VideoPlayer;
