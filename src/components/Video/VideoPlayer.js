import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/Video/service';
import { useSelector, useDispatch, connect } from 'react-redux';
import { convertAdUrl } from '../../Utils/utils';
import EpisodeDetails from './EpisodeDetails';
const queryString = require('query-string');
var details = []
const VideoPlayer = (history) => {
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    const historys = useHistory();
    const [videoPlayer, setVideoPlayer] = useState(
        <video id="content_video" className="video-js vjs-default-skin mainPlayer"
            controls preload="auto" > <source src="" type="video/mp4" /> </video>
    );
    const login = useSelector((state) => state.login);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            let show_details = ''
            service.getShowDetails(parsed.show_id).then(response => {
                setShowData(response.data);
                response.data.map((item, index) => {
                    console.log(parsed.video_id);
                    if (item.video_id == parsed.video_id) {
                        show_details = item
                    }
                })
                details = show_details;
                service.playerToken().then(tokenResponse => {
                    let arr = show_details.video_name.split('/');
                    let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[arr.length - 2] + '&token=' + tokenResponse.data.data + '&type=video';
                    let videoElem = 'content_video' + show_details.video_id + new Date().valueOf();
                    setVideoPlayer(<video id={videoElem} className="video-js vjs-default-skin mainPlayer"
                        controls preload="auto"
                        autoPlay >
                        <source src={newURL} type="application/x-mpegURL" />
                    </video>)
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
                        parsed.single_video == 0 ?
                            <EpisodeDetails showId={parsed.show_id} videoId={parsed.video_id}
                            /> : null
                    }
                </div>
            </div>
        </div>
    );
}
export default VideoPlayer;
