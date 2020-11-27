import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/Video/service';
import { useSelector, useDispatch } from 'react-redux';
import { convertAdUrl } from '../../Utils/utils';
import EpisodeDetails from './EpisodeDetails';
// import { useId } from "react-id-generator";
var details = []
const VideoPlayer = (history) => {

    const [videoPlayer, setVideoPlayer] = useState(
        <video id="content_video" className="video-js vjs-default-skin mainPlayer"
            controls preload="auto" > <source src="" type="video/mp4" /> </video>
    );
    const [videoDetails, setVideoDetails] = useState();
    const historys = useHistory();
    // const [htmlId] = useId();
    const login = useSelector((state) => state.login);
    const data = { "show": history.location.state.show_details }

    useEffect(() => {
        window.scrollTo(0, 0);
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            let show_details = ''
            service.getShowDetails(history.location.state.show_details.show_id).then(response => {
                console.log(response.data);
                response.data.map((item, index) => {
                    if (item.video_id === history.location.state.show_details.video_id) {
                        show_details = item
                    }
                })
                console.log(show_details,'show details');
                setVideoDetails(show_details);
                console.log('session id', show_details);
                details = show_details;
                service.playerToken().then(tokenResponse => {
                    let arr = show_details.video_name.split('/');
                    // console.log('arrId', arr[arr.length-2] )
                    let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[arr.length-2] + '&token=' + tokenResponse.data.data + '&type=video';
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
            })


        } else {
            historys.push({
                pathname: '/signin'
            });
        }

    }, [login])

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
                    {
                        history.location.state.singleVideo === 0 ?
                            <EpisodeDetails categoryId={data}
                            /> : null
                    }
                </div>
            </div>
        </div>
    );
}
export default VideoPlayer;
