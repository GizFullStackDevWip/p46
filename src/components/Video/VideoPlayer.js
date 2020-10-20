import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/Video/service';
import { useSelector, useDispatch } from 'react-redux';
import videothumbnail from '../../images/videothumbnail.png';
var imageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
const VideoPlayer = (history) => {
    const [videoPlayer, setVideoPlayer] = useState();
    const [autoPlay, setAutoplay] = useState(false);
    const [videoDetails, setVideoDetails] = useState();
    const historys = useHistory();
    const login = useSelector((state) => state.login);
    useEffect(() => {
        window.scrollTo(0, 0);
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            console.log(history.location.state.show_details, 'history');
            let show_details = history.location.state.show_details;
            setVideoDetails(show_details);
            service.playerToken().then(tokenResponse => {
                let arr = show_details.video_name.split('/');
                let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[5] + '&token=' + tokenResponse.data.data + '&type=video';
                setVideoPlayer(<ReactHlsPlayer
                    id='singleVideo'
                    url={newURL}
                    autoplay={true}
                    controls={true}
                    width={'100%'}
                    poster={videothumbnail}
                    height={'100%'}
                    onReady={onPlayerReady}
                    onPlay={onVideoPlay(show_details.video_id)}
                    onPause={onVideoPause}
                    onEnd={onVideoEnd}
                />)
            })
        } else {
            localStorage.setItem('currentUrl', window.location.pathname);
            historys.push({
                pathname: '/signin'
            });
        }
    }, [login, autoPlay])
    const onPlayerReady = () => {
        service.onVideoPlayFunction(videoDetails).then(response => {
        })
    }
    const onVideoPlay = (videoId) => {
        service.checkVideoSubscription(videoId).then(response => {
            let videoDetails = response.data[0];
            if (videoDetails.premium_flag == 1 || videoDetails.payper_flag == 1 || videoDetails.rental_flag == 1) {
                service.checkUserSubscription().then(useResponse => {
                    if (useResponse.data.length == 0) {
                        let isLoggedIn = localStorage.getItem('isLoggedIn');
                        if (isLoggedIn == 'false') {
                            localStorage.setItem('currentUrl', window.location.pathname);
                            history.push({
                                pathname: '/signin'
                            });
                        }
                        // window.location.href = 'http://stagingweb.gethappi.tv/homeSub?sh=' + videoId;
                    }
                    // if (useResponse.forcibleLogout === true) {
                    //     // signOut()
                    // }
                })
            } else {
                console.log('playing...')
            }
        })
        service.onVideoPlayFunction(videoDetails).then(response => {
        })
    }
    const onVideoPause = () => {
        service.onVideoPlayFunction(videoDetails).then(response => {
        })
    }
    const onVideoEnd = () => {
        service.onVideoPlayFunction(videoDetails).then(response => {
        })
    }
    const onclickFuntion = () => {
        console.log(autoPlay, 'clicked');
        setAutoplay(true);
    }

    const closeVideo = () => {
        historys.goBack();
    }
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer" style={{ marginTop: '84px' }}>
            <span className="videoPlayerBackBtn" onClick={closeVideo}>Back</span>
                <div className="videoContainer">
                    {/* {
                        autoPlay === false ?
                            (
                                <div className="playerOverlay">
                                    <svg className="svgIcon videoPlayIcon" onClick={onclickFuntion} preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor', marginTop: '20%', marginLeft: '47%' }}>
                                        <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                        <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                    </svg>
                                </div>
                            ) :
                            null
                    } */}
                    <div className="_3tqpT videoPlayerContainer" style={{ maxHeight: '600px' }}>
                        {/* <span className="mainPlayerBackButton" onClick={closeVideo}>X</span> */}

                        {videoPlayer}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VideoPlayer;
