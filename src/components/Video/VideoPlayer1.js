import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/Video/service';
import { useSelector, useDispatch, connect } from 'react-redux';
import { convertAdUrl } from '../../Utils/utils';
import EpisodeDetails from './EpisodeDetails';



const queryString = require('query-string');

var details = [];
var videoDetailUtils = [];
var isSafari = false;

const VideoPlayer = (history) => {
  let subTitle = [];
  var videoStarted = false;
  var categories = "";
  var isContinueWatching = localStorage.getItem("ContinueWatching");
  
  const [videoPlayer, setVideoPlayer] = useState(
    <video
      data-setup='{"customControlsOnMobile": true}'
      id="content_video"
      className="video-js vjs-default-skin mainPlayer"
      controls="controls"
      preload="auto"
      style={{marginTop:"10%"}}
      // x-webkit-airplay="deny"
      // defaultResolution= "480p"
    >
      {" "}
      <source src="" type="video/mp4" />{" "}
    </video>
  );
  const [videoDetails, setVideoDetails] = useState();
  const historys = useHistory();
  // const [htmlId] = useId();
  const [categoryName, setCategoryNames] = useState("");
  const login = useSelector((state) => state.login);
  const data = { show: history.location.state };
  useEffect(() => {
    isSafari =
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    console.log("history.location.state", history.location.state);
    window.scrollTo(0, 0);
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      let show_details = "";
      let showId = "";
      if (history.location.state.showId) {
        showId = history.location.state.showId;
      } else {
        showId = history.location.state.show_details.show_id;
      }
      localStorage.setItem("showId", showId);
      service.getShowDetails(showId).then((response) => {
        subTitle = history.location.state.show_details.subtitles;
        let dataDetails = response.data.videos;
        let showDetails = response.data;
        dataDetails.map((item, index) => {
          if (item.video_id === history.location.state.show_details.video_id) {
            show_details = item;
          }
        });
        setVideoDetails(show_details);
        details = show_details;
        videoDetailUtils = showDetails;
        var subtitles = [];
        subtitles = dataDetails.subtitles;
        service.playerToken().then((tokenResponse) => {
          let arr = show_details.video_name.split("/").reverse();
          // console.log('arrId', arr[arr.length-2] )
          let newURL =
            "https://poppo.tv/playlist/playlist.m3u8?id=" +
            arr[1] +
            "&token=" +
            tokenResponse.data.data +
            "&type=video";
          let videoElem =
            "content_video" + show_details.video_id + new Date().valueOf();
          setVideoPlayer(
         
            <video
              data-setup='{"customControlsOnMobile": true}'
              // data-setup='{"nativeControlsForTouch": false}'
              id={videoElem}
              className="video-js vjs-default-skin mainPlayer "
              controls="controls"
              preload="auto"
              autoPlay
              x-webkit-airplay="deny"
              crossorigin="anonymous"
              // style={{marginTop:"10%"}}
            >
              
              <source src={newURL} type="application/x-mpegURL" />
              {subTitle &&
                subTitle.map((item) => {
                  return (
                    <track
                      label={item.language_name}
                      kind="subtitles"
                      srclang={item.short_code}
                      src={item.subtitle_url}
                    />
                  );
                })}
            </video>
          );

          setTimeout(() => {
            const image = document.createElement("img");
            // image.src = outputonlinepngtools;
            image.className = "videoSettingsIcon";
            var parent = document.querySelector(".vjs-resolution-button");
            if (parent.querySelector(".videoSettingsIcon")) {
            } else {
              document
                .querySelector(".vjs-resolution-button")
                .appendChild(image);
            }
          }, 10000);
          show_details.ad_link = 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator=';
         
          // https://ads.poppo.tv/vmap?pid=368&width=[WIDTH]&height=[HEIGHT]&dnt=[DNT]&ip=[IP_ADDRESS]&lat=[LATITUDE]&lon=[LONGITUDE]&ua=[USER_AGENT]&advid=[DEVICE_IFA]&uuid=[UUID]&country=[COUNTRY]&city=[CITY]&region=[REGION]&deviceid=[DEVICE_ID]&kwds=[KEYWORDS]&device_model=[DEVICE_MODEL]&device_make=[DEVICE_MAKE]&channelid=[CHANNEL_ID]&userid=[USER_ID]&videoid=[VIDEO_ID]&bundleid=[BUNDLE]&appname=[APP_NAME]&totalduration=[DURATION]&showid=[SHOW_ID]&categories=[CATEGORIES]&description_url=[APP_STORE_URL]
          let adUrl = convertAdUrl(show_details, videoDetailUtils);
          window.playMainPlayer(
            adUrl,
            videoElem,
            show_details.video_id,
            details,
            showDetails
          );
        });
      });
    } else {
      historys.push({
        pathname: "/signin",
      });
    }
  }, [login]);
  window.onVideoPlay = (videoId, vd, show_details) => {
    let event = "POP02";
    service.checkVideoSubscription(videoId).then((response) => {
      let videoDetails = response.data;
      if (
        videoDetails.premium_flag == 1 ||
        videoDetails.payper_flag == 1 ||
        videoDetails.rental_flag == 1
      ) {
        service.checkUserSubscription().then((useResponse) => {
          if (useResponse.data.length == 0) {
           
            let isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn == "false") {
              history.push({
                pathname: "/signin",
              });
            }
          }
        });
      } else {
        // console.log('playing...')
      }
    });
    service.onVideoPlayFunction(vd, event, show_details).then((response) => {});
  };
  // window.onVideoPlaying = (vd, show_details) => {
  //   let event = "POP03";
  //   service.onVideoPlayFunction(vd, event, show_details).then((response) => {
      
  //   });
  // };
  window.onVideoPlaying = (vd, show_details) => {
    let event = "POP03";
    console.log("The video is playing", event, show_details);
    service
      .onVideoPlayFunction(vd, event, categoryName, show_details)
      .then((response) => {});
  };
  window.onVideoResume = (vd, show_details) => {
    console.log("show_detailssonVideoResumePOP09", show_details);
    let event = "POP09";
    service.onVideoPlayFunction(vd, event, show_details).then((response) => {
      //sd
    });
  };
  window.onVideoPause = (vd, show_details, currentTime) => {
    let event = "POP04";
    console.log("pause");
    service.onVideoPlayFunction(vd, event, show_details, currentTime).then((response) => {
      //sd
    });
  };
  window.onVideoEnd = (vd, show_details) => {
    let event = "POP05";
    console.log("ended");
    service.onVideoPlayFunction(vd, event, show_details).then((response) => {
      // historys.push({
      //   pathname: "/home",
      // });
    });
  };

  return (
    <div className="player-wrapper">
      <div className="pageWrapper searchPageMain">
        <div className="topContainer">
          <div className="homepageWrapper menuCloseJS closeMenuWrapper">
            <div className="entireBanner" style={{ zIndex: "2" }} id="live">
              <div className="hpLiveBanner1">
                <div className="liveVideoWrapper1" style={{height:"750px",backgroundColor:"black", marginTop:"4%"}}>{videoPlayer}</div>
              </div>
            </div>

            {/* {history.location.state.singleVideo == 0 ? (
              <EpisodeDetails categoryId={data} />
            ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;


// const queryString = require('query-string');
// var details = []
// const VideoPlayer = (history) => {
//     var { search } = useLocation();
//     const parsed = queryString.parse(search);
//     const historys = useHistory();
//     const [videoPlayer, setVideoPlayer] = useState(
//         <video id="content_video" className="video-js vjs-default-skin mainPlayer"
//             controls preload="auto" > <source src="" type="video/mp4" /> </video>
//     );
//     const login = useSelector((state) => state.login);
//     const [showData, setShowData] = useState([]);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         let isLoggedIn = localStorage.getItem('isLoggedIn');
//         if (isLoggedIn === 'true') {
//             let show_details = ''
//             service.getShowDetails(parsed.show_id).then(response => {
//                 let showDetails = response.data
//                 setShowData(response.data);
//                 response.data.videos.map((item, index) => {
//                     if (item.video_id == parsed.video_id) {
//                         show_details = item
//                     }
//                 })
//                 details = show_details;
//                 console.log("abcdefghi",show_details.video_name);
//                 service.playerToken().then(tokenResponse => {
//                     let arr = show_details.video_name.split('/');
                   
//                     let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[arr.length - 2] + '&token=' + tokenResponse.data.data + '&type=video';
//                     let videoElem = 'content_video' + show_details.video_id + new Date().valueOf();
//                     setVideoPlayer(<video id={videoElem} className="video-js vjs-default-skin mainImaPlayer"
//                         controls preload="auto"
//                         autoPlay >
//                         <source src={newURL} type="application/x-mpegURL" />
//                     </video>)
//                     let adUrl = convertAdUrl(show_details, showDetails);
//                     window.playMainPlayer(adUrl, videoElem, show_details.video_id, details);
//                 })
//             })

//         } else {
//             historys.push({
//                 pathname: '/signin'
//             });
//         }

//     }, [login])

//     const onPlayerReady = () => {
//         let event = 'POP02';
//         service.onVideoPlayFunction(details, event).then(response => {
//         })
//     }
//     window.onVideoPlay = (videoId, vd) => {
//         let event = 'POP03';
//         service.checkVideoSubscription(videoId).then(response => {
//             let videoDetails = response.data[0];
//             if (videoDetails.premium_flag == 1 || videoDetails.payper_flag == 1 || videoDetails.rental_flag == 1) {
//                 service.checkUserSubscription().then(useResponse => {
//                     if (useResponse.data.length == 0) {
//                         let isLoggedIn = localStorage.getItem('isLoggedIn');
//                         if (isLoggedIn == 'false') {
//                             history.push({
//                                 pathname: '/signin'
//                             });
//                         }
//                     }
//                 })
//             } else {
//                 // console.log('playing...')
//             }
//         })
//         service.onVideoPlayFunction(vd, event).then(response => {
//         })
//     }
//     window.onVideoPause = (vd) => {
//         let event = 'POP04';
//         service.onVideoPlayFunction(vd, event).then(response => {
//         })
//     }
//     window.onVideoEnd = (vd) => {
//         let event = 'POP05';
//         service.onVideoPlayFunction(vd, event).then(response => {
//             historys.push({
//                 pathname: '/home'
//             });
//         })
//     }

//     return (
//         <div className="pageWrapper searchPageMain">
//             <div className="topContainer" style={{ marginTop: '84px' }}>
//                 <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                   
//                         <div className="videoContainer">
//                             <div className="_3tqpT videoPlayerContainer">
//                                 {videoPlayer}
//                             </div>
//                         </div>
                    
//                     {
//                         parsed.single_video == 0 ?
//                             <EpisodeDetails showId={parsed.show_id} videoId={parsed.video_id}
//                             /> : null
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default VideoPlayer;