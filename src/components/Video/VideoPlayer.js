// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { service } from "../../network/Video/service";
// import { useSelector } from "react-redux";
// import EpisodeDetails from "./EpisodeDetails";
// import { convertAdUrl } from "../../Utils/utils";
// import { ToastsContainer, ToastsStore } from "react-toasts";
// import { clearUserData } from "../../Utils/utils";
// import closepanel from "../../img/icon-closepanel.png";
// import "./videoPlayer.css";

// var details = [];

// var videoDetailUtils = [];
// const VideoPlayer = (history) => {
//   var videoStarted = false;
//   let isFreeVideo = false;
//   var isContinueWatching = localStorage.getItem("ContinueWatching");
//   var NoContinueWatchPopUp = localStorage.getItem("NoContinueWatchPopUp");
//   const [videoLoading, setVideoLoading] = useState(false);
//   const [videoFlag, setVideoflag] = useState('0');
//   var linearFlag = 0;

//   // var isContinueWatching = true;
//   const [videoPlayer, setVideoPlayer] = useState(
//     <video
//       id="content_video"
//       className="video-js vjs-default-skin mainPlayer"
//       controls
//       preload="auto"
//     >
//       {" "}
//       <source src="" type="video/mp4" />{" "}
//     </video>
//   );
//   const historys = useHistory();
//   const login = useSelector((state) => state.login);
//   const data = { show: history.location.state }; //episodeList
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     localStorage.setItem("fromVideoplayer", "true");
//     let isLoggedIn = localStorage.getItem("isLoggedIn");
//     let userId = service.getCookie("userId");
//     if (isLoggedIn === "true" && userId) {
//       let videoId = "";
//       if (history.location.state.show_details) {
//         ;
//         console.log(
//           "showid videoid state",
//           history.location.state.show_details
//         );
//         if (history.location.state.show_details.type === 'linear_event') {
//           console.log(`flag changed to` , videoFlag)
//           setVideoflag('1')
//           linearFlag = 1;
//           console.log(`flag changed to` , videoFlag)
          
//         }

//        else if (history.location.state.show_details.type == "live_event") {
//           videoId = history.location.state.show_details[0].videos[0].video_id;
//           console.log("live if",history.location.state.show_details.videos[0].video_id);
//         }
        
//         else if (history.location.state.show_details[0].video_id != null) {
//           videoId = history.location.state.show_details[0].video_id;
//         }
        
//         else if (history.location.state.show_details.videos[0].video_id != null) {
//           videoId = history.location.state.show_details.videos[0].video_id;
//         }
        
//         else if (history.location.state.show_details[0].show_id != null) {
//           videoId = history.location.state.show_details[0].show_id;
//         }
        
//         else if (history.location.state.show_details[0].video_id != null) {
//           videoId = history.location.state.show_details[0].video_id;
//         }

//         // videoId =history.location.state.show_details.video_id ? history.location.state.show_details.video_id :history.location.state.show_details.videos[0].video_id
//         // videoId =history.location.state.show_details.video_id ?history.location.state.show_details.video_id :history.location.state.show_details.videos[0].video_id
//         //  videoId =history.location.state.show_details.videos[0].video_id ?history.location.state.show_details.videos[0].video_id :history.location.state.show_details.show_id
//         // videoId = history.location.state.show_details[0].video_id;
//       }
//       console.log("data", videoId);
//       if (history.location.state.showId) {
//         localStorage.setItem("watchingshowId", history.location.state.showId);
//       }
//       // localStorage.setItem("showId", showId);
//       service.getVideoDetails(videoId).then((response) => {
//         console.log(`the response is:`, response)
//         if (response.success == true && response.data) {
//           if(linearFlag === 1)
//           {

          
//           console.log(`everything is true`)
//           let respVideoDetails = response.data;
//           service.playerToken().then((tokenResponse) => {
//             let arr = respVideoDetails.video_name.split("/").reverse();
//             let newURL = response.data.video_name;
//             console.log(`videoname is:`, newURL)
//             let videoElem =
//               "content_video" +
//               respVideoDetails.video_id +
//               new Date().valueOf();
//             console.log("videoId", videoElem);
//             setVideoPlayer(
//               <video
//                 id={videoElem}
//                 className="video-js vjs-default-skin mainPlayer"
//                 controls
//                 preload="auto"
//                 autoPlay
//               >
//                 <source src={newURL} type="application/x-mpegURL" />
//                 {respVideoDetails.subtitles &&
//                   respVideoDetails.subtitles.map((item, index) => {
//                     return (
//                       <track
//                         label={item.language_name}
//                         kind="subtitles"
//                         srclang={item.short_code}
//                         src={item.subtitle_url}
//                         default
//                       />
//                     );
//                   })}

//                 {respVideoDetails.closed_captions &&
//                   respVideoDetails.closed_captions.map((item, index) => {
//                     return (
//                       <track
//                         label={item.language_name}
//                         kind="captions"
//                         srclang={item.short_code}
//                         src={item.closed_caption_url}
//                         default
//                       />
//                     );
//                   })}
//               </video>
//             );
//             let uId = service.getCookie("guestUserId");
//             let user_id = service.getCookie("userId");
//             if (user_id) {
//               uId = user_id;
//             }

//             service
//               .videoSubscription(respVideoDetails.video_id)
//               .then((response) => {
//                 let videoSubDetails = response.data;
//                 let subFlag = true;
//                 service.checkUserSubscription(uId).then((userResponse) => {
//                   if (userResponse.success == true) {
//                     var userSubDetails = userResponse.data;
//                     if (userResponse.forcibleLogout === true) {
//                       alert(
//                         "Sorry, You’ve reached the maximum Device limit. Please log in again!"
//                       );
//                       service.logoutAll(uId).then((res) => {
//                         setTimeout(() => {
//                           redirectToLogin();
//                         }, 1000);
//                       });
//                     } else if (userResponse.session_expired === true) {
//                       ToastsStore.warning("Sorry! Session Has Expired");
//                       redirectToLogin();
//                     } else {
//                       if (userSubDetails && userSubDetails.length != 0) {
//                         let subCount =
//                           userSubDetails &&
//                           userSubDetails.filter(
//                             (e) =>
//                               e.subscription_type_id == 4 ||
//                               e.subscription_type_id == 3
//                           );
//                         if (
//                           subCount &&
//                           subCount.length > 0 &&
//                           respVideoDetails.free_video == true &&
//                           respVideoDetails.premium_flag == 0 &&
//                           respVideoDetails.rental_flag == 0 &&
//                           respVideoDetails.payper_flag == 0
//                         ) {
//                           isFreeVideo = true;
//                         } else {
//                           videoSubDetails.map(function (subscription, index) {
//                             let subscribedVideo = userSubDetails.filter(
//                               (e) =>
//                                 e.sub_id ==
//                                 subscription.publisher_subscription_id
//                             );
//                             if (
//                               subscribedVideo.length == 0 &&
//                               index + 1 < videoSubDetails.length
//                             ) {
//                               return;
//                             }
//                             if (
//                               subscribedVideo.length == 0 &&
//                               subFlag &&
//                               index + 1 == videoSubDetails.length
//                             ) {
//                               subFlag = false;
//                             } else if (subFlag) {
//                               subFlag = false;
//                               isFreeVideo = true;
//                             }
//                           });
//                         }
//                       }
//                       // let adUrl = convertAdUrl(respVideoDetails);
//                       let adUrl =
//                         isFreeVideo == false
//                           ? convertAdUrl(respVideoDetails)
//                           : null;
//                       console.log("ad-link", adUrl);
//                       if (
//                         isContinueWatching == "true" &&
//                         respVideoDetails.watched_duration &&
//                         respVideoDetails.watched_duration != 0
//                       ) {
//                         localStorage.removeItem("ContinueWatching");
//                         isContinueWatching = false;
//                         if (NoContinueWatchPopUp == "true") {
//                           localStorage.removeItem("NoContinueWatchPopUp");
//                           window.playMainPlayer(
//                             adUrl,
//                             videoElem,
//                             respVideoDetails.video_id,
//                             respVideoDetails,
//                             true,
//                             respVideoDetails.watched_duration
//                           );
//                         } else if (
//                           window.confirm("Continue from where you stopped?")
//                         ) {
//                           window.playMainPlayer(
//                             adUrl,
//                             videoElem,
//                             respVideoDetails.video_id,
//                             respVideoDetails,
//                             true,
//                             respVideoDetails.watched_duration
//                           );
//                         } else {
//                           window.playMainPlayer(
//                             adUrl,
//                             videoElem,
//                             respVideoDetails.video_id,
//                             respVideoDetails,
//                             false
//                           );
//                         }
//                       } else {
//                         localStorage.removeItem("ContinueWatching");
//                         window.playMainPlayer(
//                           adUrl,
//                           videoElem,
//                           respVideoDetails.video_id,
//                           respVideoDetails,
//                           false
//                         );
//                       }
//                       setTimeout(() => {
//                         setVideoLoading(true);
//                       }, 3500);
//                     }
//                   }
//                 });
//               });
//           });
        
//           }
//           else
//           {

          
//           console.log(`everything is false`)
//           let respVideoDetails = response.data;
//           service.playerToken().then((tokenResponse) => {
//             let arr = respVideoDetails.video_name.split("/").reverse();
//             let newURL =  "https://poppo.tv/playlist/playlist.m3u8?id=" +
//             arr[1] +
//             "&token=" +
//             tokenResponse.data.data +
//             "&type=video";
//             console.log(`videoname is:`, newURL)
//             let videoElem =
//               "content_video" +
//               respVideoDetails.video_id +
//               new Date().valueOf();
//             console.log("videoId", videoElem);
//             setVideoPlayer(
//               <video
//                 id={videoElem}
//                 className="video-js vjs-default-skin mainPlayer"
//                 controls
//                 preload="auto"
//                 autoPlay
//               >
//                 <source src={newURL} type="application/x-mpegURL" />
//                 {respVideoDetails.subtitles &&
//                   respVideoDetails.subtitles.map((item, index) => {
//                     return (
//                       <track
//                         label={item.language_name}
//                         kind="subtitles"
//                         srclang={item.short_code}
//                         src={item.subtitle_url}
//                         default
//                       />
//                     );
//                   })}

//                 {respVideoDetails.closed_captions &&
//                   respVideoDetails.closed_captions.map((item, index) => {
//                     return (
//                       <track
//                         label={item.language_name}
//                         kind="captions"
//                         srclang={item.short_code}
//                         src={item.closed_caption_url}
//                         default
//                       />
//                     );
//                   })}
//               </video>
//             );
//             let uId = service.getCookie("guestUserId");
//             let user_id = service.getCookie("userId");
//             if (user_id) {
//               uId = user_id;
//             }

//             service
//               .videoSubscription(respVideoDetails.video_id)
//               .then((response) => {
//                 let videoSubDetails = response.data;
//                 let subFlag = true;
//                 service.checkUserSubscription(uId).then((userResponse) => {
//                   if (userResponse.success == true) {
//                     var userSubDetails = userResponse.data;
//                     if (userResponse.forcibleLogout === true) {
//                       alert(
//                         "Sorry, You’ve reached the maximum Device limit. Please log in again!"
//                       );
//                       service.logoutAll(uId).then((res) => {
//                         setTimeout(() => {
//                           redirectToLogin();
//                         }, 1000);
//                       });
//                     } else if (userResponse.session_expired === true) {
//                       ToastsStore.warning("Sorry! Session Has Expired");
//                       redirectToLogin();
//                     } else {
//                       if (userSubDetails && userSubDetails.length != 0) {
//                         let subCount =
//                           userSubDetails &&
//                           userSubDetails.filter(
//                             (e) =>
//                               e.subscription_type_id == 4 ||
//                               e.subscription_type_id == 3
//                           );
//                         if (
//                           subCount &&
//                           subCount.length > 0 &&
//                           respVideoDetails.free_video == true &&
//                           respVideoDetails.premium_flag == 0 &&
//                           respVideoDetails.rental_flag == 0 &&
//                           respVideoDetails.payper_flag == 0
//                         ) {
//                           isFreeVideo = true;
//                         } else {
//                           videoSubDetails.map(function (subscription, index) {
//                             let subscribedVideo = userSubDetails.filter(
//                               (e) =>
//                                 e.sub_id ==
//                                 subscription.publisher_subscription_id
//                             );
//                             if (
//                               subscribedVideo.length == 0 &&
//                               index + 1 < videoSubDetails.length
//                             ) {
//                               return;
//                             }
//                             if (
//                               subscribedVideo.length == 0 &&
//                               subFlag &&
//                               index + 1 == videoSubDetails.length
//                             ) {
//                               subFlag = false;
//                             } else if (subFlag) {
//                               subFlag = false;
//                               isFreeVideo = true;
//                             }
//                           });
//                         }
//                       }
//                       // let adUrl = convertAdUrl(respVideoDetails);
//                       let adUrl =
//                         isFreeVideo == false
//                           ? convertAdUrl(respVideoDetails)
//                           : null;
//                       console.log("ad-link", adUrl);
//                       if (
//                         isContinueWatching == "true" &&
//                         respVideoDetails.watched_duration &&
//                         respVideoDetails.watched_duration != 0
//                       ) {
//                         localStorage.removeItem("ContinueWatching");
//                         isContinueWatching = false;
//                         if (NoContinueWatchPopUp == "true") {
//                           localStorage.removeItem("NoContinueWatchPopUp");
//                           window.playMainPlayer(
//                             adUrl,
//                             videoElem,
//                             respVideoDetails.video_id,
//                             respVideoDetails,
//                             true,
//                             respVideoDetails.watched_duration
//                           );
//                         } else if (
//                           window.confirm("Continue from where you stopped?")
//                         ) {
//                           window.playMainPlayer(
//                             adUrl,
//                             videoElem,
//                             respVideoDetails.video_id,
//                             respVideoDetails,
//                             true,
//                             respVideoDetails.watched_duration
//                           );
//                         } else {
//                           window.playMainPlayer(
//                             adUrl,
//                             videoElem,
//                             respVideoDetails.video_id,
//                             respVideoDetails,
//                             false
//                           );
//                         }
//                       } else {
//                         localStorage.removeItem("ContinueWatching");
//                         window.playMainPlayer(
//                           adUrl,
//                           videoElem,
//                           respVideoDetails.video_id,
//                           respVideoDetails,
//                           false
//                         );
//                       }
//                       setTimeout(() => {
//                         setVideoLoading(true);
//                       }, 3500);
//                     }
//                   }
//                 });
//               });
//           });
        
//           }
//         }
//       });
//     } else {
//       historys.push({
//         pathname: "/signin",
//       });
//     }
//     return () => {
//       console.log("component unmounted");
//       try {
//         window.disposeMainPlayer();
//       } catch (e) {
//         console.log("component unmounted", e);
//       }
//     };
//   }, []);

//   const redirectToLogin = () => {
//     clearUserData();
//     setTimeout(() => {
//       window.location.href = "/signin";
//     }, 1500);
//   };

//   window.onVideoPlay = (vd, currentTime) => {
//     //start and resume
//     let event = videoStarted == true ? "POP09" : "POP02";
//     videoStarted = true;
//     console.log(
//       "The video has started to play",
//       event,
//       currentTime,
//       typeof currentTime
//     );

//     if (event === "POP02" && currentTime > 0) {
//       console.log("POP02", event, currentTime, typeof currentTime);
//     } else {
//       service
//         .onVideoPlayFunction(vd, event, currentTime)
//         .then((response) => {});
//     }
//   };
//   window.onVideoPlaying = (vd, currentTime) => {
//     let event = "POP03";
//     service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
//       //sd
//     });
//   };
//   window.onVideoResume = (vd, currentTime) => {
//     let event = "POP09";
//     service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
//       //sd
//     });
//   };
//   window.onVideoPause = (vd, currentTime) => {
//     let event = "POP04";
//     service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
//       //sd
//     });
//   };
//   window.onVideoEnd = (vd, currentTime) => {
//     let event = "POP05";
//     service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
//       // historys.push({
//       //   pathname: "/home",
//       // });
//     });
//   };

//   const closeVideo = () => {
//     let showId = localStorage.getItem("watchingshowId");
//     if (showId) {
//       historys.push({
//         pathname: "/home/movies",
//         search: encodeURI(`show_id=${showId}`),
//       });
//     } else {
//       historys.push({
//         pathname: "/home",
//       });
//     }
//   };

//   return (
//     <div className="pageWrapper searchPageMain">
//       <div className="topContainer">
//         <div className="homepageWrapper menuCloseJS closeMenuWrapper">
//           <div className="entireBanner" style={{ zIndex: "2" }} id="live">
//             <div className="hpLiveBanner">
//               {videoLoading == true ? (
//                 <div
//                   className="closingButton"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => closeVideo()}
//                 >
//                   <img
//                     src={closepanel}
//                     style={{ width: "35px", padding: "3px", opacity: ".5" }}
//                     className="close-video-button"
//                   />
//                 </div>
//               ) : null}
//               <div className="liveVideoWrapper">{videoPlayer}</div>
//             </div>
//           </div>
//           {history.location.state.singleVideo == 0 ? (
//             <EpisodeDetails statesDetails={data} />
//           ) : null}
//         </div>
//         <ToastsContainer store={ToastsStore} />
//       </div>
//     </div>
//   );
// };
// export default VideoPlayer;


import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { service } from "../../network/Video/service";
import { useSelector } from "react-redux";
import EpisodeDetails from "./EpisodeDetails";
import { convertAdUrl } from "../../Utils/utils";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { clearUserData } from "../../Utils/utils";
import closepanel from "../../img/icon-closepanel.png";
import "./videoPlayer.css";

var details = [];

var videoDetailUtils = [];
const VideoPlayer = (history) => {
  var videoStarted = false;
  let isFreeVideo = false;
  var isContinueWatching = localStorage.getItem("ContinueWatching");
  var NoContinueWatchPopUp = localStorage.getItem("NoContinueWatchPopUp");
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoFlag, setVideoflag] = useState('0');
  var linearFlag = 0;

  // var isContinueWatching = true;
  const [videoPlayer, setVideoPlayer] = useState(
    <video
      id="content_video"
      className="video-js vjs-default-skin mainPlayer"
      controls
      preload="auto"
    >
      {" "}
      <source src="" type="video/mp4" />{" "}
    </video>
  );
  const historys = useHistory();
  const login = useSelector((state) => state.login);
  const data = { show: history.location.state }; //episodeList
  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem("fromVideoplayer", "true");
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      let videoId = "";
      if (history.location.state.show_details) {
        ;
        console.log(
          "showid videoid state",
          history.location.state.show_details[0]
        );
        // debugger
        if (history.location.state.show_details.type === 'linear_event') {
          console.log(`flag changed to` , videoFlag)
          setVideoflag('1')
          linearFlag = 1;
          console.log(`flag changed to` , videoFlag)
          
        }

        if (history.location.state.show_details.type == "live_event") {
          videoId = history.location.state.show_details.videos[0].video_id;
        } else if (history.location.state.show_details.video_id != null) {
          videoId = history.location.state.show_details.video_id;
          console.log("1 history.location.state.show_details.video_id", history.location.state.show_details.video_id);
        }  else if (history.location.state.show_details[0].video_id != null) {
          videoId = history.location.state.show_details[0].video_id;
          console.log("3  history.location.state.show_details[0].video_id", history.location.state.show_details[0].video_id);
        } else if (history.location.state.show_details.videos[0].show_id != null) {
          videoId = history.location.state.show_details.videos[0].show_id;  
          console.log("4  history.location.state.show_details.videos[0].video_id", history.location.state.show_details.videos[0].video_id);
        }
        else if (history.location.state.show_details.show_id != null) {
          videoId = history.location.state.show_details.show_id;  
          console.log("2  history.location.state.show_details.show_id", history.location.state.show_details.show_id);
        }
          else if (history.location.state.show_details.show_id != null) {
          videoId = history.location.state.show_details.show_id;  
          console.log("2  history.location.state.show_details.show_id", history.location.state.show_details.show_id);
        } 

        // videoId =history.location.state.show_details.video_id ? history.location.state.show_details.video_id :history.location.state.show_details.videos[0].video_id
        // videoId =history.location.state.show_details.video_id ?history.location.state.show_details.video_id :history.location.state.show_details.videos[0].video_id
        //  videoId =history.location.state.show_details.videos[0].video_id ?history.location.state.show_details.videos[0].video_id :history.location.state.show_details.show_id
        // videoId = history.location.state.show_details[0].video_id;
      }
      console.log("data", videoId);
      if (history.location.state.showId) {
        localStorage.setItem("watchingshowId", history.location.state.showId);
      }
      // localStorage.setItem("showId", showId);
      service.getVideoDetails(videoId).then((response) => {
        console.log(`the response is:`, response)
        if (response.success == true && response.data) {
          if(linearFlag === 1)
          {

          
          console.log(`everything is true`)
          let respVideoDetails = response.data;
          service.playerToken().then((tokenResponse) => {
            let arr = respVideoDetails.video_name.split("/").reverse();
            let newURL = response.data.video_name;
            console.log(`videoname is:`, newURL)
            let videoElem =
              "content_video" +
              respVideoDetails.video_id +
              new Date().valueOf();
            console.log("videoId", videoElem);
            setVideoPlayer(
              <video
                id={videoElem}
                className="video-js vjs-default-skin mainPlayer"
                controls
                preload="auto"
                autoPlay
              >
                <source src={newURL} type="application/x-mpegURL" />
                {respVideoDetails.subtitles &&
                  respVideoDetails.subtitles.map((item, index) => {
                    return (
                      <track
                        label={item.language_name}
                        kind="subtitles"
                        srclang={item.short_code}
                        src={item.subtitle_url}
                        default
                      />
                    );
                  })}

                {respVideoDetails.closed_captions &&
                  respVideoDetails.closed_captions.map((item, index) => {
                    return (
                      <track
                        label={item.language_name}
                        kind="captions"
                        srclang={item.short_code}
                        src={item.closed_caption_url}
                        default
                      />
                    );
                  })}
              </video>
            );
            let uId = service.getCookie("guestUserId");
            let user_id = service.getCookie("userId");
            if (user_id) {
              uId = user_id;
            }

            service
              .videoSubscription(respVideoDetails.video_id)
              .then((response) => {
                let videoSubDetails = response.data;
                let subFlag = true;
                service.checkUserSubscription(uId).then((userResponse) => {
                  if (userResponse.success == true) {
                    var userSubDetails = userResponse.data;
                    if (userResponse.forcibleLogout === true) {
                      alert(
                        "Sorry, You’ve reached the maximum Device limit. Please log in again!"
                      );
                      service.logoutAll(uId).then((res) => {
                        setTimeout(() => {
                          redirectToLogin();
                        }, 1000);
                      });
                    } else if (userResponse.session_expired === true) {
                      ToastsStore.warning("Sorry! Session Has Expired");
                      redirectToLogin();
                    } else {
                      if (userSubDetails && userSubDetails.length != 0) {
                        let subCount =
                          userSubDetails &&
                          userSubDetails.filter(
                            (e) =>
                              e.subscription_type_id == 4 ||
                              e.subscription_type_id == 3
                          );
                        if (
                          subCount &&
                          subCount.length > 0 &&
                          respVideoDetails.free_video == true &&
                          respVideoDetails.premium_flag == 0 &&
                          respVideoDetails.rental_flag == 0 &&
                          respVideoDetails.payper_flag == 0
                        ) {
                          isFreeVideo = true;
                        } else {
                          videoSubDetails.map(function (subscription, index) {
                            let subscribedVideo = userSubDetails.filter(
                              (e) =>
                                e.sub_id ==
                                subscription.publisher_subscription_id
                            );
                            if (
                              subscribedVideo.length == 0 &&
                              index + 1 < videoSubDetails.length
                            ) {
                              return;
                            }
                            if (
                              subscribedVideo.length == 0 &&
                              subFlag &&
                              index + 1 == videoSubDetails.length
                            ) {
                              subFlag = false;
                            } else if (subFlag) {
                              subFlag = false;
                              isFreeVideo = true;
                            }
                          });
                        }
                      }
                      // let adUrl = convertAdUrl(respVideoDetails);
                      let adUrl =
                        isFreeVideo == false
                          ? convertAdUrl(respVideoDetails)
                          : null;
                      console.log("ad-link", adUrl);
                      if (
                        isContinueWatching == "true" &&
                        respVideoDetails.watched_duration &&
                        respVideoDetails.watched_duration != 0
                      ) {
                        localStorage.removeItem("ContinueWatching");
                        isContinueWatching = false;
                        if (NoContinueWatchPopUp == "true") {
                          localStorage.removeItem("NoContinueWatchPopUp");
                          window.playMainPlayer(
                            adUrl,
                            videoElem,
                            respVideoDetails.video_id,
                            respVideoDetails,
                            true,
                            respVideoDetails.watched_duration
                          );
                        } else if (
                          window.confirm("Continue from where you stopped?")
                        ) {
                          window.playMainPlayer(
                            adUrl,
                            videoElem,
                            respVideoDetails.video_id,
                            respVideoDetails,
                            true,
                            respVideoDetails.watched_duration
                          );
                        } else {
                          window.playMainPlayer(
                            adUrl,
                            videoElem,
                            respVideoDetails.video_id,
                            respVideoDetails,
                            false
                          );
                        }
                      } else {
                        localStorage.removeItem("ContinueWatching");
                        window.playMainPlayer(
                          adUrl,
                          videoElem,
                          respVideoDetails.video_id,
                          respVideoDetails,
                          false
                        );
                      }
                      setTimeout(() => {
                        setVideoLoading(true);
                      }, 3500);
                    }
                  }
                });
              });
          });
        
          }
          else
          {

          
          console.log(`everything is false`)
          let respVideoDetails = response.data;
          service.playerToken().then((tokenResponse) => {
            let arr = respVideoDetails.video_name.split("/").reverse();
            let newURL =  "https://poppo.tv/playlist/playlist.m3u8?id=" +
            arr[1] +
            "&token=" +
            tokenResponse.data.data +
            "&type=video";
            console.log(`videoname is:`, newURL)
            let videoElem =
              "content_video" +
              respVideoDetails.video_id +
              new Date().valueOf();
            console.log("videoId", videoElem);
            setVideoPlayer(
              <video
                id={videoElem}
                className="video-js vjs-default-skin mainPlayer"
                controls
                preload="auto"
                autoPlay
              >
                <source src={newURL} type="application/x-mpegURL" />
                {respVideoDetails.subtitles &&
                  respVideoDetails.subtitles.map((item, index) => {
                    return (
                      <track
                        label={item.language_name}
                        kind="subtitles"
                        srclang={item.short_code}
                        src={item.subtitle_url}
                        default
                      />
                    );
                  })}

                {respVideoDetails.closed_captions &&
                  respVideoDetails.closed_captions.map((item, index) => {
                    return (
                      <track
                        label={item.language_name}
                        kind="captions"
                        srclang={item.short_code}
                        src={item.closed_caption_url}
                        default
                      />
                    );
                  })}
              </video>
            );
            let uId = service.getCookie("guestUserId");
            let user_id = service.getCookie("userId");
            if (user_id) {
              uId = user_id;
            }

            service
              .videoSubscription(respVideoDetails.video_id)
              .then((response) => {
                let videoSubDetails = response.data;
                let subFlag = true;
                service.checkUserSubscription(uId).then((userResponse) => {
                  if (userResponse.success == true) {
                    var userSubDetails = userResponse.data;
                    if (userResponse.forcibleLogout === true) {
                      alert(
                        "Sorry, You’ve reached the maximum Device limit. Please log in again!"
                      );
                      service.logoutAll(uId).then((res) => {
                        setTimeout(() => {
                          redirectToLogin();
                        }, 1000);
                      });
                    } else if (userResponse.session_expired === true) {
                      ToastsStore.warning("Sorry! Session Has Expired");
                      redirectToLogin();
                    } else {
                      if (userSubDetails && userSubDetails.length != 0) {
                        let subCount =
                          userSubDetails &&
                          userSubDetails.filter(
                            (e) =>
                              e.subscription_type_id == 4 ||
                              e.subscription_type_id == 3
                          );
                        if (
                          subCount &&
                          subCount.length > 0 &&
                          respVideoDetails.free_video == true &&
                          respVideoDetails.premium_flag == 0 &&
                          respVideoDetails.rental_flag == 0 &&
                          respVideoDetails.payper_flag == 0
                        ) {
                          isFreeVideo = true;
                        } else {
                          videoSubDetails.map(function (subscription, index) {
                            let subscribedVideo = userSubDetails.filter(
                              (e) =>
                                e.sub_id ==
                                subscription.publisher_subscription_id
                            );
                            if (
                              subscribedVideo.length == 0 &&
                              index + 1 < videoSubDetails.length
                            ) {
                              return;
                            }
                            if (
                              subscribedVideo.length == 0 &&
                              subFlag &&
                              index + 1 == videoSubDetails.length
                            ) {
                              subFlag = false;
                            } else if (subFlag) {
                              subFlag = false;
                              isFreeVideo = true;
                            }
                          });
                        }
                      }
                      // let adUrl = convertAdUrl(respVideoDetails);
                      let adUrl =
                        isFreeVideo == false
                          ? convertAdUrl(respVideoDetails)
                          : null;
                      console.log("ad-link", adUrl);
                      if (
                        isContinueWatching == "true" &&
                        respVideoDetails.watched_duration &&
                        respVideoDetails.watched_duration != 0
                      ) {
                        localStorage.removeItem("ContinueWatching");
                        isContinueWatching = false;
                        if (NoContinueWatchPopUp == "true") {
                          localStorage.removeItem("NoContinueWatchPopUp");
                          window.playMainPlayer(
                            adUrl,
                            videoElem,
                            respVideoDetails.video_id,
                            respVideoDetails,
                            true,
                            respVideoDetails.watched_duration
                          );
                        } else if (
                          window.confirm("Continue from where you stopped?")
                        ) {
                          window.playMainPlayer(
                            adUrl,
                            videoElem,
                            respVideoDetails.video_id,
                            respVideoDetails,
                            true,
                            respVideoDetails.watched_duration
                          );
                        } else {
                          window.playMainPlayer(
                            adUrl,
                            videoElem,
                            respVideoDetails.video_id,
                            respVideoDetails,
                            false
                          );
                        }
                      } else {
                        localStorage.removeItem("ContinueWatching");
                        window.playMainPlayer(
                          adUrl,
                          videoElem,
                          respVideoDetails.video_id,
                          respVideoDetails,
                          false
                        );
                      }
                      setTimeout(() => {
                        setVideoLoading(true);
                      }, 3500);
                    }
                  }
                });
              });
          });
        
          }
        }
      });
    } else {
      historys.push({
        pathname: "/signin",
      });
    }
    return () => {
      console.log("component unmounted");
      try {
        window.disposeMainPlayer();
      } catch (e) {
        console.log("component unmounted", e);
      }
    };
  }, []);

  const redirectToLogin = () => {
    clearUserData();
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1500);
  };

  window.onVideoPlay = (vd, currentTime) => {
    //start and resume
    let event = videoStarted == true ? "POP09" : "POP02";
    videoStarted = true;
    console.log(
      "The video has started to play",
      event,
      currentTime,
      typeof currentTime
    );

    if (event === "POP02" && currentTime > 0) {
      console.log("POP02", event, currentTime, typeof currentTime);
    } else {
      service
        .onVideoPlayFunction(vd, event, currentTime)
        .then((response) => {});
    }
  };
  window.onVideoPlaying = (vd, currentTime) => {
    let event = "POP03";
    service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
      //sd
    });
  };
  window.onVideoResume = (vd, currentTime) => {
    let event = "POP09";
    service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
      //sd
    });
  };
  window.onVideoPause = (vd, currentTime) => {
    let event = "POP04";
    service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
      //sd
    });
  };
  window.onVideoEnd = (vd, currentTime) => {
    let event = "POP05";
    service.onVideoPlayFunction(vd, event, currentTime).then((response) => {
      // historys.push({
      //   pathname: "/home",
      // });
    });
  };

  const closeVideo = () => {
    let showId = localStorage.getItem("watchingshowId");
    if (showId) {
      historys.push({
        pathname: "/home/movies",
        search: encodeURI(`show_id=${showId}`),
      });
    } else {
      historys.push({
        pathname: "/home",
      });
    }
  };

  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          <div className="entireBanner" style={{ zIndex: "2" }} id="live">
            <div className="hpLiveBanner">
              {videoLoading == true ? (
                <div
                  className="closingButton"
                  style={{ cursor: "pointer" }}
                  onClick={() => closeVideo()}
                >
                  <img
                    src={closepanel}
                    style={{ width: "35px", padding: "3px", opacity: ".5" }}
                    className="close-video-button"
                  />
                </div>
              ) : null}
              <div className="liveVideoWrapper">{videoPlayer}</div>
            </div>
          </div>
          {history.location.state.singleVideo == 0 ? (
            <EpisodeDetails statesDetails={data} />
          ) : null}
        </div>
        <ToastsContainer store={ToastsStore} />
      </div>
    </div>
  );
};
export default VideoPlayer;
