import React, { useState, useEffect, Fragment } from "react";
import { service } from "../../network/GetVideos/service";
import Carousel from "react-multi-carousel";
import ReactHlsPlayer from "react-hls-player";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
// import "../../css/Imagestyle.css";
import { convertAdUrl } from "../../Utils/utils";
import { ToastsContainer, ToastsStore } from "react-toasts";
// import ReadMoreAndLess from "react-read-more-less";
import freeimg from "../../images/free.png";
import { confirmAlert } from "react-confirm-alert";
import {
  convertTime,
  deviceDetect,
  playerController,
  convertSecondsToMin,
} from "../../Utils/utils";
import { FacebookShareButton, TwitterShareButton } from "react-share";
// import videothumbnail from "../../images/videothumbnail.png";
var videothumbnail =
  "https://gizmeon.s.llnwi.net/vod/ChicanoHollywood/main.jpg";
var videoImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/";
var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";
// var newsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/news/";
var details = [];
var isSafari = false;
const handleScroll = () => {
  let playerId = "singleVideo";
  if (deviceDetect() === true) {
    playerController(600, playerId);
  } else {
    playerController(150, playerId);
  }
};
const VideoDetails = (categoryId, episode) => {
  const history = useHistory();
  const login = useSelector((state) => state.login);
  const [hover, setHover] = useState(false);
  const [share, setShare] = useState(false);
  const [other, setOther] = useState(false);
  const [focusedId, setFocusedId] = useState(-1);
  const [showDetails, setShowDetails] = useState([]);
  const [episodeLength, setEpisodeLength] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [update, setUpdate] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [videoPlayer, setVideoPlayer] = useState();
  const [categories, setCategories] = useState([]);
  const [isDesktop, setIsDesktop] = useState(deviceDetect());
  //   const [watchBtnDisable, setWatchBtnDisable] = useState(true);
  //   const [categoryID, setCategoryID] = useState([]);
  const dispatch = useDispatch();
  const border = {
    "border-radius": "12px",
    width: '100%',
    height: '100%',
  };

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

    window.scrollTo(0, 0);
    if (categoryId.categoryId.show_id == "undefined") {
      categoryId.categoryId.show_id = localStorage.getItem("showId");
      history.goBack();
    }
    service.getShowDetails(categoryId.categoryId.show_id).then((response) => {
      var data = response.data;
      setEpisodeLength(response.data.videos.length);
      //   if (response.success === true) {
      var videoDetail = "";
      dispatch({ type: "SHOW_ID", payload: response.data.show_id });
      setShowDetails(response.data);
      // setCategoryID(response.data.category_id);
      setCategories(response.data.categories);
      setEpisodeList(response.data.videos);
      videoDetail = response.data;
      service.playerToken().then((tokenResponse) => {
        let newURL = "";
        if (videoDetail.teaser) {
          let arr = videoDetail.teaser.split("/").reverse();
          newURL =
            "https://poppo.tv/playlist/playlist.m3u8?id=" +
            arr[1] +
            "&token=" +
            tokenResponse.data.data +
            "&type=trailer";
          // newURL = 'https://ads.poppo.tv/vmap?pid=275&width=[WIDTH]&height=[HEIGHT]&dnt=[DNT]&ip=[IP_ADDRESS]&lat=[LATITUDE]&lon=[LONGITUDE]&ua=[USER_AGENT]&advid=[DEVICE_IFA]&uuid=[UUID]&country=[COUNTRY]&deviceid=[DEVICE_ID]&kwds=[KEYWORDS]&device_model=[DEVICE_MODEL]&device_make=[DEVICE_MAKE]&channelid=[CHANNEL_ID]&videoid=[VIDEO_ID]&bundleid=[BUNDLE]&appname=[APP_NAME]&totalduration=[DURATION]&description_url=[APP_STORE_URL]'
        } else {
          newURL = "";
          // setWatchBtnDisable(false);
          // setTimeout(() => {
          //     if (videoDetail.premium_flag == 1 || videoDetail.payper_flag == 1 || videoDetail.rental_flag == 1) {
          //         let isLoggedIn = localStorage.getItem('isLoggedIn');

          //         if (isLoggedIn == 'false' || isLoggedIn == null) {
          //             localStorage.setItem('currentUrl', window.location.pathname);
          //             history.push({
          //                 pathname: '/signin'
          //             });
          //         }
          //     }
          // }, 500)

          // newURL = "";
        }

        setVideoPlayer(
          !isSafari ? (
            <ReactHlsPlayer
              id="singleVideo"
              url={newURL}
              autoplay={true}
              controls={true}
              width={"100%"}
              poster={videothumbnail}
              height={"100%"}
              //   onReady={onPlayerReady}
              //   onPlay={onVideoPlay(videoDetail.videos[0].video_id)}
              //   onPause={onVideoPause}
              //   onEnd={onVideoEnd}
            />
          ) : (
            <video
              controls={true}
              id="singleVideo"
              className="video-js vjs-default-skin"
              autoPlay={true}
              style={border}
            >
              <source src={newURL} type="application/x-mpegURL" />
            </video>
          )
        );
      });
      details = videoDetail;
      service.similarShow(videoDetail.show_id).then((response) => {
        if (response.success === true && response.data.length > 0) {
          setSimilarShows(response.data);
        }
      });
      //   }
    });
    setUpdate(false);
    // window.addEventListener('scroll', handleScroll)
  }, [update, login]);
  const freeVideoPopup = (onClickYes, onClickNo) => {
    confirmAlert({
      title: "",
      message: "Watch without ads?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onClickYes();
          },
        },
        {
          label: "No",
          onClick: () => {
            onClickNo();
          },
        },
      ],
    });
  };

  const redirectToLogin = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("deviceAnalytics");
    service.setCookie("isLoggedIn", false, 30);
    localStorage.removeItem("isLoggedIn");
    service.eraseCookie("showId");

    // dispatch({ type: "LOGOUT" });
    // setMouseHover(false);
    service.eraseCookie("userName");
    service.eraseCookie("userId");
    service.eraseCookie("userEmail");
    service.eraseCookie("subscriptionId");
    sessionStorage.removeItem("applaunch");
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1500);
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const onPlayerReady = () => {
    let event = "POP02";
    service.onVideoPlayFunction(details, event).then((response) => {});
  };
  const onVideoPlay = (videoId) => {
    // setWatchBtnDisable(false);
    // let isLoggedIn = localStorage.getItem('isLoggedIn');
    // if (isLoggedIn == 'false' || isLoggedIn == null) {
    //     localStorage.setItem('currentUrl', window.location.pathname);
    //     history.push({
    //         pathname: '/signin'
    //     });
    // }
    // service.onVideoPlayFunction(details).then((response) => {});

    service.checkVideoSubscription(videoId).then((response) => {
      let videoDetails = response.data[0];
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
            // window.location.href = 'http://stagingweb.staging.discovermediaworks.com/homeSub?sh=' + videoId;
          }
          // if (useResponse.forcibleLogout === true) {
          //     // signOut()
          // }
        });
      } else {
        // console.log('playing...');
      }
    });
    let event = "POP03";
    service.onVideoPlayFunction(details, event).then((response) => {});
  };
  const signOut = () => {
    let ui = localStorage.getItem("userId");
    setTimeout(function () {
      eraseCookie("userName");
      eraseCookie("userId");
      eraseCookie("userEmail");
      eraseCookie("subscriptionId");
    }, 10);
    setTimeout(function () {
      // history.push({
      //     pathname: '/signin'
      // });
      // window.location.href = "http://stagingweb.adventuresportstv.net/login?lo=1&ui=" + ui;
    }, 100);
  };
  const eraseCookie = (name) => {
    document.cookie = name + "=; Max-Age=-99999999;";
  };
  const onVideoPause = () => {
    let event = "POP05";
    service.onVideoPlayFunction(details, event).then((response) => {});
  };
  const onVideoEnd = () => {
    let event = "POP05";
    service.onVideoPlayFunction(details).then((response) => {});
  };
  const functionOnclick = (show) => {
    history.push({
      pathname: "/home/movies",
      search: encodeURI(`show_id=${show.show_id}`),
    });

    setUpdate(true);
  };
  const hoverFunction = (flag, index) => {
    setHover(flag);
    setFocusedId(index);
  };
  const addtoMylistFunction = (show) => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      service.addToMyPlayList(show.show_id, 1).then((response) => {
        if (response.success === true) {
          service
            .getShowDetails(categoryId.categoryId.show_id)
            .then((response) => {
              var data = response.data;
              //   if (response.success === true) {
              var videoDetail = "";
              dispatch({
                type: "SHOW_ID",
                payload: categoryId.categoryId.show_id,
              });
              setShowDetails(response.data);
              setCategories(response.data.categories);
              setEpisodeList(response.data.videos);
              videoDetail = response.data;
              details = videoDetail;
              service.similarShow(videoDetail.video_id).then((response) => {
                if (response.success === true) {
                  setSimilarShows(response.data);
                }
              });
              //   }
            });
        }
      });
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
  };
  const removeFromMylistFunction = (show) => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      service.addToMyPlayList(show.show_id, 0).then((response) => {
        if (response.success === true) {
          service
            .getShowDetails(categoryId.categoryId.show_id)
            .then((response) => {
              var data = response.data;
              //   if (response.success === true) {
              var videoDetail = "";
              dispatch({
                type: "SHOW_ID",
                payload: categoryId.categoryId.show_id,
              });
              setShowDetails(response.data);
              setCategories(response.data.categories);
              setEpisodeList(response.data.videos);
              videoDetail = response.data;
              details = videoDetail;
              service
                .similarShow(videoDetail.videos[0].show_id)
                .then((response) => {
                  if (response.success === true && response.data.length > 0) {
                    setSimilarShows(response.data);
                  }
                });
              //   }
            });
        }
      });
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
  };

  const onEpisodePlay = (video) => {
    console.log("showDetailsqt", showDetails);
    console.log("episode,...", video);
    ;
    let user_id = service.getCookie("userId");
    if (
      user_id == undefined ||
      user_id == null ||
      user_id == service.getCookie("guestUserId")
    ) {
      history.push({
        pathname: "/signin",
      });
    } else {
      if (video && video.free_video != true) {
        service.videoSubscription(video.video_id).then((response) => {
          let videoDetails = response.data;
          let subFlag = true;
          let uId = service.getCookie("guestUserId");
          let user_id = service.getCookie("userId");
          if (user_id) {
            uId = user_id;
          }
          service.userSubscription(uId).then((useResponse) => {
            var userData = useResponse.data;

            if (useResponse.success == true) {
              if (useResponse.forcibleLogout === true) {
                alert(
                  "Sorry, You’ve reached the maximum Device limit. Please log in again!"
                );
                service.logoutAll(uId).then((res) => {
                  setTimeout(() => {
                    redirectToLogin();
                  }, 1000);
                });
              } else if (useResponse.session_expired === true) {
                ToastsStore.warning("Sorry! Session Has Expired");
                redirectToLogin();
              } else {
                videoDetails.map(function (subscription, index) {
                  if (useResponse.data.length == 0 && subFlag) {
                    subFlag = false;
                    service.setCookie("showId", showDetails.show_id, 10);
                    service.setCookie("videoId", video.video_id, 10);
                    history.push({
                      pathname: "/SubscriptionList",
                      state: {
                        videoData: video.video_id,
                      },
                    });
                  } else {
                    let subscribedVideo = userData.filter(
                      (e) => e.sub_id == subscription.publisher_subscription_id
                    );
                    if (
                      subscribedVideo.length == 0 &&
                      index + 1 < videoDetails.length
                    ) {
                      return;
                    }
                    if (
                      subscribedVideo.length == 0 &&
                      subFlag &&
                      index + 1 == videoDetails.length
                    ) {
                      subFlag = false;
                      service.setCookie("showId", showDetails.show_id, 10);
                      service.setCookie("videoId", video.video_id, 10);
                      history.push({
                        pathname: "/SubscriptionList",
                        state: {
                          videoData: video.video_id,
                        },
                      });
                    } else if (subFlag) {
                      subFlag = false;
                      service.setCookie("showId", showDetails.show_id, 10);
                      localStorage.setItem("ContinueWatching", "true");
                      history.push({
                        pathname: "/videoDetails",
                        state: { movie: video, show_id: showDetails.show_id },
                      });
                    }
                  }
                });
              }
            }
          });
        });
      } else if (
        video &&
        video.free_video == true &&
        video.subscriptions &&
        video.subscriptions.length > 0
      ) {
        let uId = service.getCookie("guestUserId");
        let user_id = service.getCookie("userId");
        if (user_id) {
          uId = user_id;
        }
        const onClickNo = () => {
          service.setCookie("showId", showDetails.show_id, 10);
          localStorage.setItem("ContinueWatching", "true");
          history.push({
            pathname: "/videoDetails",
            state: { movie: video, show_id: showDetails.show_id },
          });
        };

        const onClickYes = () => {
          service.setCookie("showId", showDetails.show_id, 10);
          service.setCookie("videoId", video.video_id, 10);
          history.push({
            pathname: "/SubscriptionList",
            state: {
              videoData: video.video_id,
            },
          });
        };

        service.videoSubscription(video.video_id).then((response) => {
          let videoSubDetails = response.data;
          let subFlag = true;
          service.userSubscription(uId).then((useResponse) => {
            if (useResponse.success == true) {
              var userSubDetails = useResponse.data;
              if (useResponse.forcibleLogout === true) {
                alert(
                  "Sorry, You’ve reached the maximum Device limit. Please log in again!"
                );
                service.logoutAll(uId).then((res) => {
                  setTimeout(() => {
                    redirectToLogin();
                  }, 1000);
                });
              } else if (useResponse.session_expired === true) {
                ToastsStore.warning("Sorry! Session Has Expired");
                redirectToLogin();
              } else {
                videoSubDetails.map(function (subscription, index) {
                  if (useResponse.data.length == 0 && subFlag) {
                    subFlag = false;
                    freeVideoPopup(onClickYes, onClickNo);
                  } else {
                    let subscribedVideo = userSubDetails.filter(
                      (e) => e.sub_id == subscription.publisher_subscription_id
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
                      freeVideoPopup(onClickYes, onClickNo);
                    } else if (subFlag) {
                      subFlag = false;
                      service.setCookie("showId", showDetails.show_id, 10);
                      localStorage.setItem("ContinueWatching", "true");
                      history.push({
                        pathname: "/videoDetails",
                        state: { movie: video, show_id: showDetails.show_id },
                      });
                    }
                  }
                });
                // }
              }
            }
          });
        });
      } else if (
        video &&
        video.free_video == true &&
        video.subscriptions &&
        video.subscriptions.length == 0
      ) {
        service.setCookie("showId", showDetails.show_id, 10);
        localStorage.setItem("ContinueWatching", "true");
        history.push({
          pathname: "/videoDetails",
          state: { movie: video, show_id: showDetails.show_id },
        });
      }
      // }
    }
  };

  // const onEpisodePlay = (videoDetails, singleVideo, showId) => {
  //   console.clear();
  //   // console.log("episode click", videoDetails, singleVideo, showId);
  //   history.push({
  //     pathname: "/videoplayer",
  //     state: {
  //       show_details: videoDetails,
  //       singleVideo: singleVideo,
  //       showId: showId,
  //     },
  //   });
  // };

  const onWatchClick = (showDetails) => {
    // ;
    // console.log("showDetailsq", showDetails);
    let user_id = service.getCookie("userId");
    if (user_id == null || user_id == service.getCookie("guestUserId")) {
      history.push({
        pathname: "/signin",
      });
    } else {
      if (
        showDetails &&
        showDetails.videos &&
        showDetails.videos[0] &&
        showDetails.videos[0].free_video != true
      ) {
        let movie = showDetails.videos[0];
        service.videoSubscription(movie.video_id).then((response) => {
          let videoDetails = response.data;
          let subFlag = true;
          let uId = service.getCookie("guestUserId");
          let user_id = service.getCookie("userId");
          if (user_id) {
            uId = user_id;
          }
          service.userSubscription(uId).then((useResponse) => {
            var userData = useResponse.data;

            if (useResponse.success == true) {
              if (useResponse.forcibleLogout === true) {
                alert(
                  "Sorry, You’ve reached the maximum Device limit. Please log in again!"
                );
                service.logoutAll(uId).then((res) => {
                  setTimeout(() => {
                    redirectToLogin();
                  }, 1000);
                });
              } else if (useResponse.session_expired === true) {
                ToastsStore.warning("Sorry! Session Has Expired");
                redirectToLogin();
              } else {
                videoDetails.map(function (subscription, index) {
                  if (useResponse.data.length == 0 && subFlag) {
                    subFlag = false;
                    service.setCookie("showId", showDetails.show_id, 10);
                    service.setCookie("videoId", movie.video_id, 10);
                    history.push({
                      pathname: "/SubscriptionList",
                      state: {
                        videoData: movie.video_id,
                      },
                    });
                  } else {
                    let subscribedVideo = userData.filter(
                      (showDetails) =>
                        showDetails.sub_id ==
                        subscription.publisher_subscription_id
                    );
                    if (
                      subscribedVideo.length == 0 &&
                      index + 1 < videoDetails.length
                    ) {
                      return;
                    }
                    if (
                      subscribedVideo.length == 0 &&
                      subFlag &&
                      index + 1 == videoDetails.length
                    ) {
                      subFlag = false;
                      service.setCookie("showId", showDetails.show_id, 10);
                      service.setCookie("videoId", movie.video_id, 10);
                      history.push({
                        pathname: "/SubscriptionList",
                        state: {
                          videoData: movie.video_id,
                        },
                      });
                    } else if (subFlag) {
                      subFlag = false;
                      service.setCookie("showId", showDetails.show_id, 10);
                      localStorage.setItem("ContinueWatching", "true");
                      history.push({
                        pathname: "/videoDetails",
                        state: { movie: movie, show_id: showDetails.show_id },
                      });
                    }
                  }
                });
              }
            }
          });
        });
      } else if (
        // {
        // if (
        //   showDetails &&
        //   showDetails.videos &&
        //   showDetails.videos[0]
        // ) {
        //   let movie = showDetails.videos[0];
        //   service.setCookie("showId", showDetails.show_id, 10);
        //   localStorage.setItem("ContinueWatching", "true");
        //   history.push({
        //     pathname: "/videoDetails",
        //     state: { movie: movie, show_id: showDetails.show_id },
        //   });
        // } else if
        showDetails &&
        // showDetails.videos &&
        // showDetails.videos[0] &&
        showDetails.videos[0].free_video == true &&
        showDetails.videos[0].subscriptions &&
        showDetails.videos[0].subscriptions.length > 0
      ) {
        let uId = service.getCookie("guestUserId");
        let user_id = service.getCookie("userId");
        if (user_id) {
          uId = user_id;
        }
        let movie = showDetails.videos[0];
        const onClickNo = () => {
          service.setCookie("showId", showDetails.show_id, 10);
          localStorage.setItem("ContinueWatching", "true");
          history.push({
            pathname: "/videoDetails",
            state: { movie: movie, show_id: showDetails.show_id },
          });
        };

        const onClickYes = () => {
          service.setCookie("showId", showDetails.show_id, 10);
          service.setCookie("videoId", movie.video_id, 10);
          history.push({
            pathname: "/SubscriptionList",
            state: {
              videoData: movie.video_id,
            },
          });
        };

        service.videoSubscription(movie.video_id).then((response) => {
          let videoSubDetails = response.data;
          let subFlag = true;
          service.userSubscription(uId).then((useResponse) => {
            if (useResponse.success == true) {
              var userSubDetails = useResponse.data;
              if (useResponse.forcibleLogout === true) {
                alert(
                  "Sorry, You’ve reached the maximum Device limit. Please log in again!"
                );
                service.logoutAll(uId).then((res) => {
                  setTimeout(() => {
                    redirectToLogin();
                  }, 1000);
                });
              } else if (useResponse.session_expired === true) {
                ToastsStore.warning("Sorry! Session Has Expired");
                redirectToLogin();
              } else {
                videoSubDetails.map(function (subscription, index) {
                  if (useResponse.data.length == 0 && subFlag) {
                    subFlag = false;
                    freeVideoPopup(onClickYes, onClickNo);
                  } else {
                    let subscribedVideo = userSubDetails.filter(
                      (e) => e.sub_id == subscription.publisher_subscription_id
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
                      freeVideoPopup(onClickYes, onClickNo);
                    } else if (subFlag) {
                      subFlag = false;
                      service.setCookie("showId", showDetails.show_id, 10);
                      localStorage.setItem("ContinueWatching", "true");
                      history.push({
                        pathname: "/videoDetails",
                        state: { movie: movie, show_id: showDetails.show_id },
                      });
                    }
                  }
                });
                // }
              }
            }
          });
        });
      } else if (
        showDetails &&
        // showDetails.videos &&
        // showDetails.videos[0] &&
        showDetails.videos[0].free_video == true &&
        showDetails.videos[0].subscriptions &&
        showDetails.videos[0].subscriptions.length == 0
      ) {
        let movie = showDetails.videos[0];
        service.setCookie("showId", showDetails.show_id, 10);
        localStorage.setItem("ContinueWatching", "true");
        history.push({
          pathname: "/videoDetails",
          state: { movie: movie, show_id: showDetails.show_id },
        });
        // }
      }
    }
  };
  return (
    <div className="menuCloseJS closeMenuWrapper">
      <div className="videoPage">
        <div className="videoPageContainer">
          {/* {showDetails.is_free_video === true ? (
            <img
              src={freeimg}
              style={{
                width: "20%",
                height: "13%",
                position: "absolute",
                zIndex: "1",
              }}
            />
          ) : (
            ""
          )} */}
          {showDetails.single_video === 0 ? (
            <div
              className="videoPageBGimg"
              style={{
                backgroundImage: `url(${
                  videoImageUrl + showDetails.logo
                  // showsImageUrl + showDetails.logo
                })`,
              }}
            ></div>
          ) : showDetails.single_video === 1 ? (
            <div
              className="videoPageBGimg"
              style={{
                backgroundImage: `url(${videoImageUrl + showDetails.logo})`,
              }}
            ></div>
          ) : null}
          <div
            className="videoPageBGimg"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2))",
            }}
          ></div>
          {showDetails.teaser && (
            <div>
              {isDesktop === true ? (
                <div className="_2xXnB forLargeDevice">
                  <div className="_2KWdL">
                    <section className="_1dQ5J">
                      <div className="_3tqpT">{videoPlayer}</div>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="forSmallDevice">
                  <div className="_2KWdL">
                    <section className="_1dQ5J">
                      <div className="_3tqpT">{videoPlayer}</div>
                    </section>
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className={
              showDetails.teaser
                ? "videoPageContentWrapper videoPageContentPadding"
                : "videoPageContentWrapper videoPageContentPadding detailTopAdj"
            }
          >
            <div className="vpContent">
              <div className="container vpContainer vpDesktopContainer">
                <div
                  className={
                    showDetails.teaser
                      ? "row vp3Section movieInfo"
                      : "row vp3Section"
                  }
                >
                  {showDetails.show_name && (
                    <div className="vpMiddleHeading">
                      <h1 className="vpMiddleh1" style={{ display: "flex" }}>
                        {showDetails.show_name}
                      </h1>
                    </div>
                  )}
                  {/* <div className="col col-2-5"> */}
                  <div
                    className={
                      showDetails.teaser ? "col col-2-5" : "col col-1-5"
                    }
                  >
                    <div className="vpLeftSection">
                      {/* {showDetails.is_free_video === true ? (
                        <img
                          src={freeimg}
                          style={{
                            width: "20%",
                            height: "13%",
                            position: "absolute",
                            zIndex: "1",
                          }}
                        />
                      ) : (
                        ""
                      )} */}
                      {showDetails.single_video === 0 ? (
                        <div
                          className="vpPoster"
                          style={{
                            backgroundImage: `url(${
                              showsImageUrl + showDetails.logo
                            })`,
                            marginLeft: "7px",
                            // height: "385px",
                          }}
                        ></div>
                      ) : showDetails.single_video === 1 ? (
                        <div
                          className="vpPoster"
                          style={{
                            backgroundImage: `url(${
                              // showDetails.logo == null ?  showsImageUrl+showDetails.logo : showDetails.logo
                              // videoImageUrl + showDetails.logo == null ? showDetails.logo :  videoImageUrl + showDetails.logo
                              showsImageUrl+showDetails.logo
                            })`,
                            marginLeft: "7px",
                            // height: "365px",
                          }}
                        ></div>
                      ) : null}
                      <div
                        className="vpLeftButtonWrapper vpLeftButtonMargin"
                        style={{ marginTop: "7px" }}
                      >
                        <div className="vpLeftButtons">
                          <button
                            className="button buttonLarge buttonBlock vpWatchSeason"
                            // style={{ height: "41px" }}
                            onClick={() => {
                              onWatchClick(showDetails);
                            }}
                          >
                            <div className="buttonBg"></div>
                            <div className="buttonContent">
                              {/* {showDetails.ad_link != null
                                      ? (
                                        window.alert("Do you want to continue watching???")
                                      ) : (
                                        ""
                                      )} */}

                              {showDetails.single_video === 0 ? (
                                <Fragment>
                                  <div
                                    className="vpWatchSeasonText"
                                    onClick={() => {
                                      onEpisodePlay(episodeList[0]);
                                    }}
                                  >
                                    Watch S01:E01
                                  </div>
                                </Fragment>
                              ) : showDetails.single_video === 1 ? (
                                <div
                                  className="vpWatchSeasonText"
                                  onClick={() => {
                                    onWatchClick(showDetails);
                                  }}
                                >
                                  Watch Now
                                </div>
                              ) : null}
                            </div>
                          </button>
                          {showDetails.watchlist_flag === 1 ? (
                            <button
                              className="button buttonSecondary buttonBlock vpAddButton"
                              onClick={() => {
                                removeFromMylistFunction(showDetails);
                              }}
                            >
                              <div className="buttonBg"></div>
                              <div className="buttonContent">
                                Remove from My List
                              </div>
                            </button>
                          ) : showDetails.watchlist_flag === null ||
                            showDetails.watchlist_flag === 0 ? (
                            <button
                              className="button buttonSecondary buttonBlock vpAddButton"
                              onClick={() => {
                                addtoMylistFunction(showDetails);
                              }}
                            >
                              <div className="buttonBg"></div>
                              <div className="buttonContent">
                                Add to My List
                              </div>
                            </button>
                          ) : null}
                          <div className="vpTwoButton">
                            <button
                              className="button buttonTransparent vpShareButton"
                              style={{ width: "0px" }}
                              onClick={() => {
                                !share ? setShare(!share) : setShare(share);
                              }}
                            >
                              <div className="buttonBg"></div>
                              <div className="buttonContent">
                                <span>Share</span>
                              </div>
                            </button>
                            <button
                              className="button buttonTransparent vpReportButton"
                              onClick={() => {
                                // setOther(!other);
                                !other ? setOther(!other) : setOther(other);
                              }}
                            >
                              <div className="buttonBg"></div>
                              <div className="buttonContent">
                                <div className="vpReport"></div>
                              </div>
                            </button>
                            {share === true ? (
                              <div
                                onMouseEnter={() => {
                                  setShare(true);
                                }}
                                onMouseLeave={() => {
                                  setShare(false);
                                }}
                              >
                                <div
                                  className="_1TcfH _1Dgjh"
                                  style={{ left: "7px" }}
                                >
                                  <FacebookShareButton
                                    url={
                                      "https://chicanohollywood.tv/home/movies?show_id="+
                                      //   "https://adventuresportstv.net/home/movies?show_id=" +
                                      // "watch.chicanohollywood.com/home/movies?show_id=" +
                                      showDetails.show_id
                                    }
                                    quote={
                                      //   showDetails.show_name +
                                      //   " || " +
                                      (showDetails.videos
                                        ? showDetails.videos[0].video_title
                                        : "") +
                                      " || " +
                                      showDetails.synopsis
                                    }
                                    className="share"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span className="ATag _1H0lX _135ID _3Dyhl">
                                      <svg
                                        className="svgIcon facebookIcon"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 20 20"
                                        style={{ fill: "currentcolor" }}
                                      >
                                        <path
                                          fill="currentColor"
                                          fillRule="evenodd"
                                          d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z"
                                        ></path>
                                      </svg>
                                      <span className="_3SXQW">Facebook</span>
                                    </span>
                                  </FacebookShareButton>
                                  <TwitterShareButton
                                    url={
                                      "https://chicanohollywood.tv/home/movies?show_id="+
                                      // "watch.chicanohollywood.com/home/movies?show_id=" +
                                      showDetails.show_id
                                    }
                                    title={
                                      showDetails.videos
                                        ? showDetails.videos[0].video_title
                                        : ""
                                    }
                                    description={showDetails.synopsis}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span className="ATag _1H0lX _135ID _3Dyhl">
                                      <svg
                                        className="svgIcon"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 20 17"
                                        style={{ fill: "currentcolor" }}
                                      >
                                        <path
                                          d="M6 17c7.837 0 11.965-6.156 12-11-.035-.67-.035-.844 0-1 .756-.59 1.45-1.297 2-2-.75.218-1.543.433-2 1 .5-.978 1.14-1.77 1-3-.358.763-1.24 1.095-2 1C15.29.647 12.69.568 11 2c-1.03 1.084-1.48 2.555-1 4-3.45-.204-6.524-1.74-9-4C.303 3.584.86 5.945 3 7c-.99.11-1.63-.062-2 0-.2 1.6 1.178 3.255 3 4-.512-.202-1.146-.178-2 0 .777 1.35 2.318 2.478 4 3-1.38.635-3.175 1.246-5 1-.35.244-.675.223-1 0 1.877 1.37 4.06 2 6 2"
                                          fill="currentColor"
                                          fillRule="evenodd"
                                        ></path>
                                      </svg>
                                      <span className="_3SXQW">Twitter</span>
                                    </span>
                                  </TwitterShareButton>
                                </div>
                              </div>
                            ) : null}
                            {other === true ? (
                              <div
                                onMouseEnter={() => {
                                  setOther(true);
                                }}
                                onMouseLeave={() => {
                                  setOther(false);
                                }}
                              >
                                <div className="_9gMn_ R8UiN">
                                  <div
                                    onClick={() => {
                                      history.push({
                                        pathname: "/contactsupport",
                                      });
                                    }}
                                    className="ATag _3kieO"
                                    rel="nofollow"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Report a problem
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      showDetails.teaser
                        ? "col col-4-5 movieTagsMob"
                        : "col col-5 movieTagsMob"
                    }
                  >
                    <div
                      className={
                        showDetails.teaser
                          ? "vpMiddleInfoSection vpInfoPadding nonTrailerPadding"
                          : "vpMiddleInfoSection vpInfoPadding"
                      }
                    >
                      <div className="vpLengthCensor">
                        <div className="vpLengthYear">
                          {showDetails.year ? `(${showDetails.year}) . ` : ""}
                          {showDetails.duration_text && (
                            <div
                              className="movieLength"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {showDetails.duration_text}
                              <span className="vpYearBreak"></span>
                            </div>
                          )}
                        </div>
                        <div className="vpCCwrapper">
                          {showDetails.rating && (
                            <div className="movieCensorBox">
                              {showDetails.rating}
                            </div>
                          )}
                          <br />
                        </div>
                      </div>

                      <div className="vpMovieCategory">
                        <div className="vpCategoryFlex vpCategoryMargin">
                          {categories &&
                            categories.map((item, index) => {
                              if (categories.length === index + 1) {
                                return (
                                  <div
                                    key={index}
                                    className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "12px",
                                    }}
                                    onClick={() => {
                                      // categorySelect(item);
                                      history.push({
                                        pathname: "/home/categorylist",
                                        search: encodeURI(
                                          `category_id=${item.category_id}&category_name=${item.category_name}`
                                        ),
                                      });
                                    }}
                                  >
                                    {item.category_name}
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    key={index}
                                    className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "12px",
                                    }}
                                    onClick={() => {
                                      // categorySelect(item);
                                      history.push({
                                        pathname: "/home/categorylist",
                                        search: encodeURI(
                                          `category_id=${item.category_id}&category_name=${item.category_name}`
                                        ),
                                      });
                                    }}
                                  >
                                    {item.category_name}
                                  </div>
                                );
                              }
                            })}
                        </div>
                      </div>
                      {isDesktop === true ? (
                        showDetails.single_video === 0 ? (
                          <div className="vpMiddleDesc">
                            <br />
                            {showDetails.videos[0].video_description}
                          </div>
                        ) : (
                          <div className="vpMiddleDesc">
                            {showDetails.synopsis}
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
                {isDesktop === false ? (
                  showDetails.single_video === 0 ? (
                    <div className="">
                      <br />
                    </div>
                  ) : (
                    <div className="">{showDetails.synopsis}</div>
                  )
                ) : null}
                {showDetails && showDetails.single_video === 0 ? (
                  <div className="row vp3Section youMayLike">
                    <div className="col">
                      <div>
                        <div
                          className="heading"
                          style={{
                            paddingBottom: "7px",
                            fontSize: "15pt",
                          }}
                        >
                          Season 1
                        </div>
                        <div className="carousel carouselNoMask">
                          <div className="carouselContent">
                            <Carousel
                              className="row carouselRow"
                              responsive={responsive}
                            >
                              {episodeList &&
                                episodeList.map((show, index) => {
                                  return (
                                    <div className="col col-3" key={index}>
                                      <div className="movieTile">
                                        <div
                                          className="movieTileImage"
                                          // className={
                                          //   hover === true &&
                                          //   focusedId === index
                                          //     ? "movieTileImage movieTileImageOpen"
                                          //     : "movieTileImage"
                                          // }
                                          id={index}
                                          onMouseOver={() => {
                                            hoverFunction(true, index);
                                          }}
                                          onMouseLeave={() => {
                                            hoverFunction(false, index);
                                          }}
                                        >
                                          <div
                                            onClick={() => onEpisodePlay(show)}
                                            className={
                                              hover === true &&
                                              focusedId === index
                                                ? "movieTileIcon "
                                                : "movieTileIcon  movieTileHoverOpened"
                                            }
                                          >
                                            {hover === true &&
                                            focusedId === index ? (
                                              <svg
                                                className="svgIcon movieTilePlayIcon"
                                                preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 62 62"
                                                style={{ fill: "currentcolor" }}
                                                // onClick={() => {
                                                //   functionOnclick(show);
                                                // }}
                                              >
                                                <circle
                                                  r="30"
                                                  stroke="currentColor"
                                                  fill="none"
                                                  strokeWidth="2"
                                                  cx="31"
                                                  cy="31"
                                                ></circle>
                                                <path
                                                  fill="currentColor"
                                                  d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"
                                                ></path>
                                              </svg>
                                            ) : null}
                                          </div>
                                          {/* {show.free_video === true ? (
                                            <img
                                              src={freeimg}
                                              style={{
                                                width: "20%",
                                                height: "13%",
                                                position: "absolute",
                                                zIndex: "1",
                                              }}
                                            />
                                          ) : (
                                            ""
                                          )} */}
                                          {show.thumbnail_350_200 && (
                                            <div
                                              className="moviePoster"
                                              style={{
                                                // height: "320px",
                                                // width: "210px",
                                                backgroundImage: `url(${
                                                  videoImageUrl + show.thumbnail
                                                })`,
                                              }}
                                            >
                                              <div className="FeNml"></div>
                                            </div>
                                          )}

                                          <div
                                            className={
                                              hover === true &&
                                              focusedId === index
                                                ? "wishlistPosition wishlistTranslate wishlistParentOpen"
                                                : "wishlistPosition wishlistTranslate wishlistParentClose"
                                            }
                                          >
                                            <div className="wishlistButton">
                                              <div
                                                className={
                                                  hover === true &&
                                                  focusedId === index
                                                    ? "wlgradientPosition wlgradientTranslate wlgradientOpen"
                                                    : "wlgradientPosition wlgradientTranslate wlgradientClose"
                                                }
                                                style={{
                                                  backgroundImage:
                                                    "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))",
                                                  backgroundPosition:
                                                    "center bottom",
                                                  backgroundSize: "cover",
                                                }}
                                              ></div>
                                              {show.watchlist_flag === 1 ? (
                                                <div className="wishlistTextWrapper">
                                                  <div
                                                    className="wishlistText"
                                                    onClick={() => {
                                                      removeFromMylistFunction(
                                                        showDetails
                                                      );
                                                    }}
                                                  >
                                                    Remove from My List{" "}
                                                  </div>
                                                </div>
                                              ) : show.watchlist_flag ===
                                                  null ||
                                                show.watchlist_flag === 0 ? (
                                                <div className="wishlistTextWrapper">
                                                  <div
                                                    className="wishlistText"
                                                    onClick={() => {
                                                      addtoMylistFunction(
                                                        showDetails
                                                      );
                                                    }}
                                                  >
                                                    Add to My List
                                                  </div>
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                        <section className="movieTextWrapper movieTextWrapperPadding">
                                          <div className="movieTextFlex">
                                            <h3>
                                              <a
                                                className="linkButton movieTextHeading"
                                                onClick={() => {
                                                  history.push({
                                                    pathname: "/videoplayer",
                                                    //   search: encodeURI(
                                                    //     `show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${show.video_id}`
                                                    //   ),
                                                    state: {
                                                      show_details: show,
                                                      singleVideo:
                                                        showDetails.single_video,
                                                      showId:
                                                        showDetails.show_id,
                                                    },
                                                  });
                                                }}
                                              >
                                                {/* {show.free_video ===
                                                            true ? (
                                                              <img
                                                                src={freeimg}
                                                                style={{
                                                                  width: "20%",
                                                                  height: "45%",
                                                                }}
                                                              />
                                                            ) : (
                                                              ""
                                                            )} */}
                                                {show.video_title}
                                                {show.videos &&
                                                  show.videos.map(
                                                    (item, index) => {
                                                      if (
                                                        show.videos.length ===
                                                        index + 1
                                                      ) {
                                                        return (
                                                          <div
                                                            key={index}
                                                            // className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                                          ></div>
                                                        );
                                                      } else {
                                                        return (
                                                          <div
                                                            key={index}
                                                            // className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                                          ></div>
                                                        );
                                                      }
                                                    }
                                                  )}
                                              </a>
                                            </h3>
                                            <div
                                              className="movieCatYear"
                                              style={{ display: "contents" }}
                                            >
                                              <div>
                                                
                                                {show && (
                                                  <div className="movieYear">
                                                    <div
                                                      className="_1MmGl"
                                                      style={{
                                                        marginRight: "auto",
                                                      }}
                                                    >

                                                      {showDetails.year
                                                        ? `(${showDetails.year})`
                                                        : ""}
                                                      {showDetails.year &&
                                                      show.duration_text
                                                        ? " . "
                                                        : ""}
                                                      {show.duration_text &&
                                                        show.duration_text}
                                                    </div>
                                                    {showDetails.rating && (
                                                      <div className="movieCensorBox moviecensorText">
                                                        {showDetails.rating}
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              {console.log(
                                                "season",
                                                showDetails.categories
                                              )}
                                              <div className="vpMovieCategory">
                                                <div className="vpCategoryFlex vpCategoryMargin">
                                                  {categories &&
                                                    categories.map(
                                                      (item, index) => {
                                                        if (
                                                          categories.length ===
                                                          index + 1
                                                        ) {
                                                          return (
                                                            <div
                                                              key={index}
                                                              // className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                                fontSize:
                                                                  "12px",
                                                              }}
                                                              onClick={() => {
                                                                // categorySelect(item);
                                                                history.push({
                                                                  pathname:
                                                                    "/home/categorylist",
                                                                  search:
                                                                    encodeURI(
                                                                      `category_id=${item.category_id}&category_name=${item.category_name}`
                                                                    ),
                                                                });
                                                              }}
                                                            >
                                                              {
                                                                item.category_name
                                                              }
                                                            </div>
                                                          );
                                                        } else {
                                                          return (
                                                            <div
                                                              key={index}
                                                              // className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                                fontSize:
                                                                  "12px",
                                                              }}
                                                              onClick={() => {
                                                                // categorySelect(item);
                                                                history.push({
                                                                  pathname:
                                                                    "/home/categorylist",
                                                                  search:
                                                                    encodeURI(
                                                                      `category_id=${item.category_id}&category_name=${item.category_name}`
                                                                    ),
                                                                });
                                                              }}
                                                            >
                                                              {
                                                                item.category_name
                                                              }
                                                              {","}
                                                            </div>
                                                          );
                                                        }
                                                      }
                                                    )}
                                                </div>
                                              </div>{" "}
                                            </div>
                                          </div>
                                        </section>
                                      </div>
                                    </div>
                                  );
                                })}
                            </Carousel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="row vp3Section youMayLike">
                  <div className="col">
                    <div>
                      {similarShows.length > 0 && (
                        <div
                          className="heading"
                          style={{
                            paddingBottom: "7px",
                            fontSize: "15pt",
                          }}
                        >
                          You May Also Like
                        </div>
                      )}
                      <div className="carousel carouselNoMask">
                        <div className="carouselContent ">
                          <Carousel
                            className="row carouselRow"
                            responsive={responsive}
                          >
                            {similarShows.map((show, index) => {
                              return (
                                <div className="col col-3" key={index}>
                                  <div className="movieTile">
                                    <div
                                      className="movieTileImage"
                                      // className={
                                      //   hover === true &&
                                      //   focusedId === index + "key"
                                      //     ? "movieTileImage movieTileImageOpen"
                                      //     : "movieTileImage"
                                      // }
                                      id={index + "key"}
                                      onMouseOver={() => {
                                        hoverFunction(true, index + "key");
                                      }}
                                      onMouseLeave={() => {
                                        hoverFunction(false, index + "key");
                                      }}
                                    >
                                      <div
                                        onClick={() => {
                                          functionOnclick(show);
                                        }}
                                        className={
                                          hover === true &&
                                          focusedId === index + "key"
                                            ? "movieTileIcon "
                                            : "movieTileIcon  movieTileHoverOpened"
                                        }
                                      >
                                        {hover === true &&
                                        focusedId === index + "key" ? (
                                          <svg
                                            className="svgIcon movieTilePlayIcon"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 62 62"
                                            style={{ fill: "currentcolor" }}
                                            // onClick={() => {
                                            //   functionOnclick(show);
                                            // }}
                                          >
                                            <circle
                                              r="30"
                                              stroke="currentColor"
                                              fill="none"
                                              strokeWidth="2"
                                              cx="31"
                                              cy="31"
                                            ></circle>
                                            <path
                                              fill="currentColor"
                                              d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"
                                            ></path>
                                          </svg>
                                        ) : null}
                                      </div>
                                      {/* {show.single_video == 0 ? ( */}
                                      {/* {show.is_free_video === true ? (
                                        <img
                                          src={freeimg}
                                          style={{
                                            width: "20%",
                                            height: "13%",
                                            position: "absolute",
                                            zIndex: "1",
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )} */}
                                      <div
                                        className="moviePoster"
                                        style={{
                                          // height: "320px",
                                          // width: "210px",
                                          backgroundImage: `url(${
                                            showsImageUrl + show.logo
                                          })`,
                                        }}
                                      >
                                        <div className="FeNml"></div>
                                      </div>

                                      <div
                                        className={
                                          hover === true &&
                                          focusedId === index + "key"
                                            ? "wishlistPosition wishlistTranslate wishlistParentOpen"
                                            : "wishlistPosition wishlistTranslate wishlistParentClose"
                                        }
                                      >
                                        <div className="wishlistButton">
                                          <div
                                            className={
                                              hover === true &&
                                              focusedId === index + "key"
                                                ? "wlgradientPosition wlgradientTranslate wlgradientOpen"
                                                : "wlgradientPosition wlgradientTranslate wlgradientClose"
                                            }
                                            style={{
                                              backgroundImage:
                                                "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))",
                                              backgroundPosition:
                                                "center bottom",
                                              backgroundSize: "cover",
                                            }}
                                          ></div>
                                          {show.watchlist_flag === 1 ? (
                                            <div className="wishlistTextWrapper">
                                              <div
                                                className="wishlistText"
                                                onClick={() => {
                                                  removeFromMylistFunction(
                                                    show
                                                  );
                                                }}
                                              >
                                                Remove from My List{" "}
                                              </div>
                                            </div>
                                          ) : show.watchlist_flag === null ||
                                            show.watchlist_flag === 0 ? (
                                            <div className="wishlistTextWrapper">
                                              <div
                                                className="wishlistText"
                                                onClick={() => {
                                                  addtoMylistFunction(show);
                                                }}
                                              >
                                                Add to My List
                                              </div>
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>

                                    <section className="movieTextWrapper movieTextWrapperPadding">
                                      <div className="movieTextFlex">
                                        <h3>
                                          <a
                                            className="linkButton movieTextHeading"
                                            onClick={() => {
                                              history.push({
                                                pathname: "/videoplayer",
                                                  search: encodeURI(
                                                    `show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${show.video_id}`
                                                  ),
                                                // state: {
                                                //   show_details: show,
                                                //   singleVideo:
                                                //     show.single_video,
                                                //   showId: show.show_id,
                                                // },
                                              });
                                            }}
                                          >
                                            {/* {show.is_free_video === true ? (
                                              <img
                                                src={freeimg}
                                                style={{
                                                  width: "20%",
                                                  height: "45%",
                                                }}
                                              />
                                            ) : (
                                              ""
                                            )} */}
                                            {show.show_name}
                                          </a>
                                        </h3>
                                        <div
                                          className="movieCatYear"
                                          style={{ display: "contents" }}
                                        >
                                          <div>
                                            {show && (
                                              <div className="movieYear">
                                                <div
                                                  className="_1MmGl"
                                                  style={{
                                                    marginRight: "auto",
                                                  }}
                                                >
                                                  {show.year
                                                    ? `(${show.year})`
                                                    : ""}
                                                  {show.year &&
                                                  show.duration_text
                                                    ? " . "
                                                    : ""}
                                                  {show.duration_text &&
                                                    show.duration_text}
                                                </div>
                                                {show.rating && (
                                                  <div className="movieCensorBox moviecensorText">
                                                    {show.rating}
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                          {/* {show.category_names && (
                                            <div className="movieCategory mcMargin">
                                              <div>{show.category_names}
                                             </div>
                                            </div>
                                          )} */}

                                          {/* {show.category_names &&
                                            show.category_names.map(
                                              (item, index) => {
                                                if (
                                                  show.category_names.length ===
                                                  index + 1
                                                ) {
                                                  return (
                                                    <div
                                                      key={index}
                                                      // className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                                    >
                                                      {show.category_names}
                                                      {item.category_names}
                                                    </div>
                                                  );
                                                } else {
                                                  return (
                                                    <div
                                                      key={index}
                                                      // className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                                    >  {show.category_names}
                                                      {item.category_names}
                                                      {","}
                                                    </div>
                                                  );
                                                }
                                              }
                                            )} */}
                                          {show.category_names && (
                                            <div className="movieCategory mcMargin">
                                              <div>{show.category_names}</div>
                                            </div>
                                          )}
                                        </div>
                                        <div className="movieCatYear">
                                          <div>
                                            <div className="movieYear"></div>
                                            <div className="movieCategory mcMargin">
                                              {/* {show.category_names &&
                                                show.category_names.map(
                                                  (item, index) => {
                                                    if (
                                                      index ===
                                                      show.category_names
                                                        .length -
                                                        1
                                                    ) {
                                                      return (
                                                        <div key={index}>
                                                          {item.category_names}
                                                        </div>
                                                      );
                                                    } else {
                                                      return (
                                                        <div key={index}>
                                                          {item.category_names}
                                                        </div>
                                                      );
                                                    }
                                                  }
                                                )} */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </div>
                                </div>
                              );
                            })}
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoDetails;
