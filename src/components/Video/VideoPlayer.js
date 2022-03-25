import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/Video/service';
import { useSelector, useDispatch, connect } from 'react-redux';
import { convertAdUrl } from '../../Utils/utils';
import EpisodeDetails from './EpisodeDetails';

const queryString = require('query-string');
var details = []
var videoDetailUtils = [];
var isSafari = false;
const VideoPlayer = ({history}) => {
    console.log("his1123",history.location.state);
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    const historys = useHistory();
    // console.log("his11",history.location.state.videoId);
    const [videoPlayer, setVideoPlayer] = useState(
        <video id="content_video" className="video-js vjs-default-skin mainPlayer1"
            controls preload="auto" > <source src="" type="video/mp4" /> </video>
    );
    const login = useSelector((state) => state.login);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        console.log("parsed",parsed)
        window.scrollTo(0, 0);
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        let userId = service.getCookie("userId");
        if (isLoggedIn === "true"  && userId) {
            let show_details = '';
            let show_id='';
            service.getShowDetails(parsed.show_id).then(response => {
                setShowData(response.data);
                console.log("hasjhaskc",response.data);
                response.data.videos.map((item, index) => {
                    if (item.video_id == parsed.show_id) {
                        show_details = item
                    }
                })
                details = show_details;
                console.log("show_details55",show_details);
                service.playerToken().then(tokenResponse => {
                    let arr = response.data.videos[0].video_name.split('/');
                    let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[arr.length - 2] + '&token=' + tokenResponse.data.data + '&type=video';
                    let videoElem = 'content_video' + show_details.video_id + new Date().valueOf();
                    setVideoPlayer(<video id={videoElem} className="video-js vjs-default-skin mainPlayer1"
                        controls preload="auto"
                        autoPlay >
                        <source src={newURL} type="application/x-mpegURL" />
                    </video>)
                    console.log("adurl",adUrl);
                    let adUrl = convertAdUrl(response.data);
                    console.log("adUrl--",adUrl);
                    // let adUrl = null;
                    window.playMainPlayer(adUrl, videoElem, show_details.video_id, details ); //parsed.wa
                })
            })

        } 
        else {
            let show_details = ''
            service.getShowDetails(parsed.show_id).then(response => {
                setShowData(response.data);
                response.data.videos.map((item, index) => {
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
                    setVideoPlayer(<video id={videoElem} className="video-js vjs-default-skin mainPlayer1"
                        controls preload="auto"
                        autoPlay >
                        <source src={newURL} type="application/x-mpegURL" />
                    </video>)
                    //  let adUrl = null;
                    console.log("adurl",adUrl);
                    let adUrl = convertAdUrl(response.data);
                    console.log("adurl1111111",adUrl);
                    console.log("ads----------",response.data.teaser);
                    window.playMainPlayer(adUrl, videoElem, show_details.video_id, details ); //parsed.wa
                })
            })


        }
        return () => {
            console.log("component unmounted");
            try {
              window.disposeMainPlayer();
            } catch (e) {
              console.log("component unmounted disposal failed", e);
            }
          };
    }, [login])

    const onPlayerReady = () => {
        let event = 'POP02';
        service.onVideoPlayFunction(details, event).then(response => {
        })
    }
    window.onVideoPlay = (videoId, vd) => {
        let event = 'POP03';
     
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
                <div className="homepageWrapper1 menuCloseJS closeMenuWrapper">
                    <div className="entireBanner1" id="live">
                        <div className="hpLiveBanner1">
                            <div className="liveVideoWrapper1">
                                {videoPlayer}
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;