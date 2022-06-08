import React, { useState, useEffect } from "react";
import { service } from "../../network/GetVideos/service";
import Carousel from "react-multi-carousel";
import ReactHlsPlayer from "react-hls-player";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  convertTime,
  deviceDetect,
  playerController,
  convertSecondsToMin,
} from "../../Utils/utils";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import KeyArtWork from "./KeyArtWork1";
import videothumbnail from "../../images/boondock.jpg";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { clearUserData } from "../../Utils/utils";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import freeTag from "../../images/free1.png";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";
var videoImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/";

var details = [];

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
  const dispatch = useDispatch();
  const border = {
    "border-radius": "12px",
  };

  const [currentSeason, setCurrentSeason] = useState([]);
  const [allSeasonList, setAllSeasonList] = useState([]);
  const [numberOfSeason, setNumberOfSeason] = useState(-1);
  const [optionsS, setOptionsS] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryId.categoryId.show_id == "undefined") {
      categoryId.categoryId.show_id = localStorage.getItem("showId");
      history.goBack();
    }
    service.getShowDetails(categoryId.categoryId.show_id).then((response) => {
      var data = response.data;
      console.log("quo", data);
      setEpisodeLength(
        response.data.videos
          ? response.data.videos
          : response.data.videos.length
      );
      // if (data.length > 0) {
      var videoDetail = "";
      dispatch({ type: "SHOW_ID", payload: response.data.show_id });
      setShowDetails(response.data);
      setCategories(response.data.categories);
      // setEpisodeList(response.data.videos);
      setEpisodeList(
        response.data.videos
          ? response.data.videos
          : response.data.videos[0].videos
      );
      setAllSeasonList(response.data.videos);
      setCurrentSeason(
        response.data.videos
          ? response.data.videos
          : response.data.videos[0].videos
      );
      let defaultOpt = [];
      defaultOpt.push(response.data.videos[0]);
      setDefaultOptions(defaultOpt);
      let option = [];
      response.data.videos &&
        response.data.videos.map((item, index) => {
          let data = {};
          data.value = item.season;
          data.label =
            item.season == null ? `Season 0` : `Season ${item.season}`;
          data.className = "myOptionClassName";
          option.push(data);
        });
      console.log("option", option);
      setOptionsS(option);
      setNumberOfSeason(response.data.videos.length);
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
        } else {
          newURL = "";
        }
        setVideoPlayer(
          <ReactHlsPlayer
            id="singleVideo"
            url={newURL}
            // url="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
            autoplay={true}
            controls={true}
            width={"100%"}
            height={"100%"}
            style={border}
            poster={videothumbnail}
          />
        );
      });
      details = videoDetail;
      service.similarShow(videoDetail.show_id).then((response) => {
        if (response.success == true && response.data.length > 0) {
          setSimilarShows(response.data);
        }
      });
      // }
    });
    setUpdate(false);
    window.addEventListener("scroll", handleScroll);
  }, [update]);

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
    ;
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      service.addToMyPlayList(show.show_id, 1).then((response) => {
        if (response.success === true) {
          service
            .getShowDetails(categoryId.categoryId.show_id)
            .then((response) => {
              var data = response.data;
              // if (data.length > 0) {
              var videoDetail = "";
              dispatch({
                type: "SHOW_ID",
                payload: categoryId.categoryId.show_id,
              });
              setShowDetails(response.data);
              setCategories(response.data.categories);
              setEpisodeList(response.data.videos);
              setAllSeasonList(response.data.videos);
              setCurrentSeason(response.data.videos[0].videos);
              let option = [];
              response.data.videos &&
                response.data.videos.map((item, index) => {
                  let data = {};
                  data.value = item.season;
                  data.label =
                    item.season == null ? `Season 0` : `Season ${item.season}`;
                  data.className = "myOptionClassName";
                  option.push(data);
                });
              setOptionsS(option);
              videoDetail = response.data;
              details = videoDetail;
              service
                .similarShow(categoryId.categoryId.show_id)
                .then((response) => {
                  if (response.success == true && response.data.length > 0) {
                    setSimilarShows(response.data);
                  }
                });
              // }
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
              // if (data.length > 0) {
              var videoDetail = "";
              dispatch({
                type: "SHOW_ID",
                payload: categoryId.categoryId.show_id,
              });
              setShowDetails(response.data);
              setCategories(response.data.categories);
              setEpisodeList(response.data.videos);
              setAllSeasonList(response.data.videos);
              setCurrentSeason(response.data.videos[0].videos);
              let option = [];
              response.data.videos &&
                response.data.videos.map((item, index) => {
                  let data = {};
                  data.value = item.season;
                  data.label =
                    item.season == null ? `Season 0` : `Season ${item.season}`;
                  data.className = "myOptionClassName";
                  option.push(data);
                });
              console.log("option", option);
              setOptionsS(option);
              videoDetail = response.data;
              details = videoDetail;
              service
                .similarShow(categoryId.categoryId.show_id)
                .then((response) => {
                  if (response.success == true && response.data.length > 0) {
                    setSimilarShows(response.data);
                  }
                });
              // }
            });
        }
      });
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
  };

  const redirectToLogin = () => {
    clearUserData();
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1500);
  };

  const WatchWithoutAdsPopUp = (onClickYes, onClickNo) => {
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

  const onWatchBtnClick = (videoDetails, singleVideo, showId) => {
    console.log("watch btn click");
    ;
    let user_id = service.getCookie("userId");
    let countryName =
      localStorage.getItem("currentLocation") &&
      JSON.parse(localStorage.getItem("currentLocation")).country_name;
    // if (
    //   countryName != "United States" &&
    //   countryName != "United States of America"
    // ) {
      if (user_id == null || user_id == service.getCookie("guestUserId")) {
        history.push({
          pathname: "/signin",
        });
      } else {
        if (
          videoDetails &&
          videoDetails.free_video != true &&
          videoDetails.subscriptions &&
          videoDetails.subscriptions.length > 0
        ) {
          // history.push({
          //   pathname: "/SubscriptionList",
          //   state: {
          //     videoData: videoDetails.video_id,
          //   },
          // });
          service.videoSubscription(videoDetails.video_id).then((response) => {
            let videoSubLists = response.data;
            let subFlag = true;
            let uId = service.getCookie("guestUserId");
            let user_id = service.getCookie("userId");
            if (user_id) {
              uId = user_id;
            }

            service.checkUserSubscription(uId).then((useResponse) => {
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
                  videoSubLists.map(function (subscription, index) {
                    if (useResponse.data.length == 0 && subFlag) {
                      subFlag = false;
                      service.setCookie("showId", showId, 10);
                      service.setCookie("videoId", videoDetails.video_id, 10);
                      history.push({
                        pathname: "/SubscriptionList",
                        state: {
                          videoData: videoDetails.video_id,
                        },
                      });
                    } else {
                      let subscribedVideo = userData.filter(
                        (e) =>
                          e.sub_id == subscription.publisher_subscription_id
                      );
                      if (
                        subscribedVideo.length == 0 &&
                        index + 1 < videoSubLists.length
                      ) {
                        return;
                      }
                      if (
                        subscribedVideo.length == 0 &&
                        subFlag &&
                        index + 1 == videoSubLists.length
                      ) {
                        subFlag = false;
                        service.setCookie("showId", showId, 10);
                        service.setCookie("videoId", videoDetails.video_id, 10);
                        history.push({
                          pathname: "/SubscriptionList",
                          state: {
                            videoData: videoDetails.video_id,
                          },
                        });
                      } else if (subFlag) {
                        subFlag = false;
                        service.setCookie("showId", showId, 10);
                        localStorage.setItem("ContinueWatching", "true");
                        history.push({
                          pathname: "/videoplayer",
                          state: {
                            show_details: videoDetails,
                            singleVideo: singleVideo,
                            showId: showId,
                          },
                        });
                      }
                    }
                  });
                }
              }
            });
          });
        } else if (
          videoDetails &&
          videoDetails.free_video === true &&
          videoDetails.subscriptions &&
          videoDetails.subscriptions.length > 0
        ) {
          let uId = service.getCookie("guestUserId");
          let user_id = service.getCookie("userId");
          if (user_id) {
            uId = user_id;
          }

          const onClickNo = () => {
            localStorage.setItem("ContinueWatching", "true");
            history.push({
              pathname: "/videoplayer",
              state: {
                show_details: videoDetails,
                singleVideo: singleVideo,
                showId: showId,
              },
            });
          };

          const onClickYes = () => {
            service.setCookie("showId", showId, 10);
            service.setCookie("videoId", videoDetails.video_id, 10);
            history.push({
              pathname: "/SubscriptionList",
              state: {
                videoData: videoDetails.video_id,
              },
            });
          };

          service.videoSubscription(videoDetails.video_id).then((response) => {
            let videoSubDetails = response.data;
            let subFlag = true;
            service.checkUserSubscription(uId).then((useResponse) => {
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
                      WatchWithoutAdsPopUp(onClickYes, onClickNo);
                    } else {
                      let subscribedVideo = userSubDetails.filter(
                        (e) =>
                          e.sub_id == subscription.publisher_subscription_id
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
                        WatchWithoutAdsPopUp(onClickYes, onClickNo);
                      } else if (subFlag) {
                        subFlag = false;
                        localStorage.setItem("ContinueWatching", "true");
                        history.push({
                          pathname: "/videoplayer",
                          state: {
                            show_details: videoDetails,
                            singleVideo: singleVideo,
                            showId: showId,
                          },
                        });
                      }
                    }
                  });
                }
              }
            });
          });
        } else if (
          videoDetails &&
          videoDetails.free_video === true &&
          videoDetails.subscriptions &&
          videoDetails.subscriptions.length === 0
        ) {
          localStorage.setItem("ContinueWatching", "true");
          history.push({
            pathname: "/videoplayer",
            state: {
              show_details: videoDetails,
              singleVideo: singleVideo,
              showId: showId,
            },
          });
        } else {
          ToastsStore.error("Oops! Something went wrong.");
        }
      }
    // } else {
    //   history.push({
    //     pathname: "/unavailable",
    //   });
    // }
  };
  const onNewsClick = (videoDetails) => {
    ToastsStore.warning("Oops!!! There is no video for this news...");
  };
  const onWatchClick = (videoDetails) => {
    // ;
    console.log("showDetailsq", videoDetails);
    let user_id = service.getCookie("userId");
    if (user_id == null || user_id == service.getCookie("guestUserId")) {
      history.push({
        pathname: "/signin",
      });
    } else {
      if (
        videoDetails &&
        videoDetails.videos &&
        videoDetails.videos[0] &&
        videoDetails.videos[0].free_video != true
      ) {
        let movie = videoDetails.videos[0];
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
                console.log(`the video details are :`, videoDetails);
                videoDetails.map(function (subscription, index) {
                  if (useResponse.data.length == 0 && subFlag) {
                    subFlag = false;
                    service.setCookie("showId", videoDetails.show_id, 10);
                    service.setCookie("videoId", movie.video_id, 10);
                    history.push({
                      pathname: "/SubscriptionList",
                      state: {
                        videoData: movie.video_id,
                      },
                    });
                  } else {
                    let subscribedVideo = userData.filter(
                      (videoDetails) =>
                        videoDetails.sub_id ==
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
                      service.setCookie("showId", videoDetails.show_id, 10);
                      service.setCookie("videoId", movie.video_id, 10);
                      history.push({
                        pathname: "/SubscriptionList",
                        state: {
                          videoData: movie.video_id,
                        },
                      });
                    } else if (subFlag) {
                      subFlag = false;
                      service.setCookie("showId", videoDetails.show_id, 10);
                      localStorage.setItem("ContinueWatching", "true");
                      history.push({
                        pathname: "/videoplayer",
                        state: {
                          show_details: videoDetails,
                          showId: videoDetails.show_id,
                        },
                        // state: { movie: movie, show_id: showDetails.show_id },
                      });
                    }
                  }
                });
              }
            }
          });
        });
      } else if (videoDetails && videoDetails.videos[0] === null) {
        ToastsStore.warning("Oops!!! There is no video for this news...");
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
        videoDetails &&
        // showDetails.videos &&
        // showDetails.videos[0] &&
        videoDetails.videos[0].free_video == true &&
        videoDetails.videos[0].subscriptions &&
        videoDetails.videos[0].subscriptions.length > 0
      ) {
        let uId = service.getCookie("guestUserId");
        let user_id = service.getCookie("userId");
        if (user_id) {
          uId = user_id;
        }
        let movie = videoDetails.videos[0];
        const onClickNo = () => {
          service.setCookie("showId", videoDetails.show_id, 10);
          localStorage.setItem("ContinueWatching", "true");
          history.push({
            pathname: "/videoplayer",
            state: {
              show_details: videoDetails,
              showId: videoDetails.show_id,
            },
            // state: { movie: movie, show_id: showDetails.show_id },
          });
        };

        const onClickYes = () => {
          service.setCookie("showId", videoDetails.show_id, 10);
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
                    WatchWithoutAdsPopUp(onClickYes, onClickNo);
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
                      WatchWithoutAdsPopUp(onClickYes, onClickNo);
                    } else if (subFlag) {
                      subFlag = false;
                      service.setCookie("showId", videoDetails.show_id, 10);
                      localStorage.setItem("ContinueWatching", "true");
                      history.push({
                        pathname: "/videoplayer",
                        state: {
                          show_details: videoDetails,
                          showId: videoDetails.show_id,
                        },
                        // state: { movie: movie, show_id: showDetails.show_id },
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
        videoDetails &&
        // showDetails.videos &&
        // showDetails.videos[0] &&
        videoDetails.videos[0].free_video == true &&
        videoDetails.videos[0].subscriptions &&
        videoDetails.videos[0].subscriptions.length == 0
      ) {
        let movie = videoDetails.videos[0];
        service.setCookie("showId", videoDetails.show_id, 10);
        localStorage.setItem("ContinueWatching", "true");
        history.push({
          pathname: "/videoplayer",
          state: {
            show_details: videoDetails,
            showId: videoDetails.show_id,
          },
          // state: { movie: movie, show_id: showDetails.show_id },
        });
        // }
      }
    }
  };
  return (
    <div className="menuCloseJS closeMenuWrapper">
      <div className="videoPage">
        <ToastsContainer store={ToastsStore} />
        <div className="videoPageContainer">
          {showDetails.single_video == 0 ? (
            <div
              className="videoPageBGimg"
              style={{
                backgroundImage: `url(${
                  showDetails.type === "linear_event"
                    ? showDetails.logo
                    : showDetails.type === "news"
                    ? showDetails.logo_thumb
                    : showsImageUrl + showDetails.logo_thumb
                })`,
              }}
            ></div>
          ) : showDetails.single_video == 1 ? (
            <div
              className="videoPageBGimg"
              style={{
                backgroundImage: `url(${
                  showDetails.type === "linear_event"
                    ? showDetails.logo
                    : showDetails.type === "news"
                    ? showDetails.logo_thumb
                    : showsImageUrl + showDetails.logo_thumb
                })`,
              }}
            ></div>
          ) : null}
          <div
            className="videoPageBGimg"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0 0 0), rgb(60 59 59 / 40%) 83%, rgb(0 0 0 / 63%))",
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
                : " videoPageContentWrapper videoPageContentPadding paddingtop"
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
                      <h1 className="vpMiddleh1">{showDetails.show_name}</h1>
                    </div>
                  )}
                  <div
                    className={showDetails.teaser ? "col col-9" : "col col-4"}
                  >
                    <div className="vpLeftSection">
                      
                      {showDetails.single_video === 0 ? (
                        <div
                          className="vpPoster"
                          style={{
                            backgroundImage: `url(${
                              showDetails.type === "linear_event"
                                ? showDetails.logo
                                : showDetails.type === "news"
                                ? showDetails.logo_thumb
                                : showsImageUrl + showDetails.logo_thumb
                            })`,
                            marginLeft: "7px",
                            // height: "385px",
                          }}
                        ></div>
                      ) : showDetails.single_video === 1 ? (
                        <div
                          className="vpPoster"
                          style={{
                            backgroundImage:
                              // `url(${
                              // showDetails.logo
                              `url(${
                                showDetails.type === "linear_event"
                                  ? showDetails.logo
                                  : showDetails.type === "news"
                                  ? showDetails.logo_thumb
                                  : videoImageUrl + showDetails.logo_thumb
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
                          {showDetails.type === "news" ||
                          showDetails.video == [] ? (
                            <div> </div>
                          ) : (
                            <button
                              className="button buttonLarge buttonBlock vpWatchSeason innerPageBtnMargin"
                              style={{ height: "41px" }}
                              onClick={() => {
                                if (
                                  showDetails.type === "news" ||
                                  showDetails.video == []
                                ) {
                                  onNewsClick();
                                } else if (showDetails.single_video === 1) {
                                  onWatchClick(showDetails);
                                } else {
                                  onWatchBtnClick(
                                    defaultOptions[0].videos[0],
                                    showDetails.single_video,
                                    showDetails.show_id
                                  );
                                }
                              }}
                            >
                              <div className="buttonBg rounderbutton"></div>
                              <div className="buttonContent">
                                {showDetails.single_video === 0 &&
                                defaultOptions &&
                                defaultOptions.length > 0 ? (
                                  <div className="vpWatchSeasonText">
                                    {defaultOptions[0].season == null
                                      ? `Watch S00:E0${defaultOptions[0].videos[0].video_order}`
                                      : `Watch S0${defaultOptions[0].season}:E0${defaultOptions[0].videos[0].video_order}`}
                                  </div>
                                ) : showDetails.type === "news" ||
                                  showDetails.video == [] ? (
                                  <div
                                    className="vpWatchSeasonText"
                                    style={{ display: "none" }}
                                  >
                                    {" "}
                                    News
                                  </div>
                                ) : showDetails.single_video === 1 ? (
                                  <div className="vpWatchSeasonText">
                                    Watch Now
                                  </div>
                                ) : null}
                              </div>
                            </button>
                          )}

                          {showDetails.watchlist_flag === 1 ? (
                            <button
                              className="button buttonSecondary buttonBlock vpAddButton innerPageBtnMargin"
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
                              className="button buttonSecondary buttonBlock vpAddButton innerPageBtnMargin"
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
                              onMouseEnter={() => {
                                setShare(true);
                              }}
                              onMouseLeave={() => {
                                setShare(false);
                              }}
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
                                !other ? setOther(!other) : setOther(other);
                              }}
                              onMouseEnter={() => {
                                setOther(true);
                              }}
                              onMouseLeave={() => {
                                setOther(false);
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
                                  className="_1TcfH _1Dgjh dropAdj"
                                  style={{ left: "7px" }}
                                >
                                  {console.log(`show details are:`, showDetails)}
                                  <FacebookShareButton
                                    url={
                                      "staging.runwaytv.com/home/movies?show_id=" +
                                      showDetails.show_id
                                    }
                                    
                                    
                                    quote={
                                      showDetails.show_name +
                                      " || " +
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
                                      "staging.runwaytv.com/home/movies?show_id=" +
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
                                <div className="_9gMn_ R8UiN dropAdj reportAdj">
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
                    <div className="vpMiddleInfoSection vpInfoPadding">
                      <div className="vpLengthCensor">
                        <div className="vpLengthYear">
                          {showDetails && (
                            <div className="movieLength">
                              {showDetails.year && `(${showDetails.year})`}
                              {showDetails.year &&
                                showDetails.videos &&
                                showDetails.videos[0] &&
                                showDetails.videos[0].duration_text &&
                                " . "}
                              {showDetails.videos &&
                                showDetails.videos[0] &&
                                showDetails.videos[0].duration_text &&
                                showDetails.videos[0].duration_text}
                            </div>
                          )}
                        </div>
                        <div className="vpCCwrapper">
                          {/* <svg className="svgIcon vpCCicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 18" style={{ fill: 'currentcolor' }}>
                                                        <g fill="currentColor" fillRule="evenodd">
                                                            <path fillRule="nonzero" d="M2 9c0 3.867 3.13 7 6.994 7h10.012C22.868 16 26 12.866 26 9c0-3.867-3.13-7-6.994-7H8.994C5.132 2 2 5.134 2 9zM0 9c0-4.97 4.027-9 8.994-9h10.012C23.973 0 28 4.028 28 9c0 4.97-4.027 9-8.994 9H8.994C4.027 18 0 13.972 0 9z"></path>
                                                            <path d="M11.844 10.195c-.088.836-.517 1.375-1.32 1.375-1.21 0-1.606-1.22-1.606-2.475 0-1.287.374-2.464 1.606-2.464.803 0 1.232.53 1.342 1.354h1.815c-.252-1.716-1.363-2.98-3.156-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.057 4.07 3.433 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88zm7.38 0c-.087.836-.516 1.375-1.32 1.375-1.21 0-1.605-1.22-1.605-2.475 0-1.287.373-2.464 1.605-2.464.803 0 1.232.53 1.342 1.354h1.815c-.253-1.716-1.364-2.98-3.157-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.056 4.07 3.432 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88z"></path>
                                                        </g>
                                                    </svg> //cc*/}
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
                              return (
                                <div
                                  key={index}
                                  className="movieCensorBox vpMovieType vpMovieTypeMargin linkhover"
                                  onClick={() => {
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
                            })}
                        </div>
                      </div>
                    </div>
                    {isDesktop === true ? (
                      showDetails.single_video === 0 ? (
                        <div className="vpMiddleDesc">
                          Seasons : {numberOfSeason}
                          <br />
                          {showDetails.synopsis && showDetails.synopsis}
                        </div>
                      ) : (
                        <div className="vpMiddleDesc">
                          {showDetails.synopsis && showDetails.synopsis}
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
                {isDesktop === false ? (
                  showDetails.single_video === 0 ? (
                    <div className="">
                      Seasons : {numberOfSeason}
                      <br />
                      {showDetails.synopsis && showDetails.synopsis}
                    </div>
                  ) : (
                    <div className="">
                      {showDetails.synopsis && showDetails.synopsis}
                    </div>
                  )
                ) : null}
                {showDetails && showDetails.single_video === 0 ? (
                  <div className="row vp3Section youMayLike">
                    <div className="col">
                      <div>
                        {optionsS && optionsS.length === 1 && (
                          <div
                            className="heading"
                            style={{
                              fontWeight: "800",
                              paddingBottom: "7px",
                              fontSize: "15pt",
                            }}
                          >
                            Season 1
                          </div>
                        )}
                        {optionsS && optionsS.length > 1 && (
                          <div style={{ width: "200px", marginBottom: "20px" }}>
                            <Dropdown
                              options={optionsS}
                              onChange={(item) => {
                                console.log("dd", item.value, item.label);
                                let newSeason = allSeasonList.filter(function (
                                  e
                                ) {
                                  return e.season === item.value;
                                });
                                console.log("newSeason", newSeason);
                                if (newSeason && newSeason.length > 0) {
                                  setCurrentSeason(newSeason[0].videos);
                                }
                              }}
                              value={optionsS[0]}
                              controlClassName="myControlClassName"
                            />
                          </div>
                        )}
                        <div className="carousel carouselNoMask">
                          <div className="carouselContent categoryShowWrapperDetails">
                            <Carousel
                              className="row carouselRow"
                              responsive={responsive}
                            >
                              {currentSeason &&
                                currentSeason.map((show, index) => {
                                  return (
                                    <div className="col col-3" key={index}>
                                      <div className="movieTile">
                                        <div
                                          // className="movieTileImage"
                                          className={
                                            hover === true &&
                                            focusedId === index
                                              ? "movieTileImage movieTileImageOpen"
                                              : "movieTileImage"
                                          }
                                          id={index}
                                          onMouseOver={() => {
                                            hoverFunction(true, index);
                                          }}
                                          onMouseLeave={() => {
                                            hoverFunction(false, index);
                                          }}
                                        >
                                          <div
                                            onClick={() => {
                                              onWatchBtnClick(
                                                show,
                                                showDetails.single_video,
                                                showDetails.show_id
                                              );
                                            }}
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
                                          {show.thumbnail_350_200 && (
                                            <div
                                              className="moviePoster"
                                              style={{
                                                backgroundImage: `url(${
                                                  videoImageUrl +
                                                  show.thumbnail_350_200
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
                                                  width: "260px",
                                                }}
                                              ></div>
                                              {showDetails.watchlist_flag ===
                                              1 ? (
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
                                              ) : showDetails.watchlist_flag ===
                                                  null ||
                                                showDetails.watchlist_flag ===
                                                  0 ? (
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
                                          {show.free_video == false ? (
                                            <div className="freeTagWrapper">
                                              <img src={freeTag} />
                                            </div>
                                          ) : null}
                                        </div>
                                        <section className="movieTextWrapper movieTextWrapperPadding">
                                          <div className="movieTextFlex">
                                            <h3>
                                              <a
                                                className="linkButton movieTextHeading"
                                                onClick={() => {
                                                  onWatchBtnClick(
                                                    show,
                                                    showDetails.single_video,
                                                    showDetails.show_id
                                                  );
                                                }}
                                              >
                                                {show.video_title}
                                              </a>
                                            </h3>
                                            <div className="movieCatYear">
                                              <div>
                                                <div className="_1MmGl">
                                                  {showDetails.year
                                                    ? `(${showDetails.year})`
                                                    : null}
                                                  {showDetails.year &&
                                                  show.duration_text
                                                    ? " . "
                                                    : null}
                                                  {show.duration_text
                                                    ? show.duration_text
                                                    : null}
                                                </div>
                                                <div className="movieCategory mcMargin">
                                                  {showDetails.categories &&
                                                    showDetails.categories.map(
                                                      (item, index) => {
                                                        if (
                                                          index ===
                                                          showDetails.categories
                                                            .length -
                                                            1
                                                        ) {
                                                          return item.category_name;
                                                        } else {
                                                          return (
                                                            item.category_name +
                                                            ","
                                                          );
                                                        }
                                                      }
                                                    )}
                                                </div>
                                              </div>
                                              <div>
                                                {showDetails.rating && (
                                                  <div className="movieCensorBox moviecensorText">
                                                    {showDetails.rating}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            {/* {show.video_description && (
                                              <div className="_2GgQ0 epi_desc">
                                                <div className="_2GgQ0 epi_desc">
                                                  {show.video_description.substring(
                                                    0,
                                                    80
                                                  ) + "..."}
                                                </div>
                                              </div>
                                            )} */}
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
                {showDetails.key_art_work &&
                showDetails.key_art_work.length > 0 ? (
                  <KeyArtWork keyartWork={showDetails.key_art_work} />
                ) : null}
                <div
                  className="row vp3Section youMayLike"
                  style={{ marginTop: "35px", paddingTop: "0" }}
                >
                  <div className="col">
                    <div>
                      {similarShows.length > 0 && (
                        <div
                          className="heading"
                          style={{
                            fontWeight: "800",
                            paddingBottom: "7px",
                            fontSize: "15pt",
                          }}
                        >
                          You May Also Like
                        </div>
                      )}
                      <div className="carousel carouselNoMask">
                        <div className="carouselContent categoryShowWrapperDetails">
                          <Carousel
                            className="row carouselRow"
                            responsive={responsive}
                          >
                            {similarShows &&
                              similarShows.map((show, index) => {
                                return (
                                  <div className="col col-3" key={index}>
                                    <div className="movieTile">
                                      <div
                                        // className="movieTileImage"
                                        className={
                                          hover === true &&
                                          focusedId === index + "key"
                                            ? "movieTileImage movieTileImageOpen"
                                            : "movieTileImage"
                                        }
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

                                        <div
                                          className="moviePoster"
                                          style={{
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
                                                width: "260px",
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
                                        {show.is_free_video == false ? (
                                          <div className="freeTagWrapper">
                                            <img src={freeTag} />
                                          </div>
                                        ) : null}
                                      </div>
                                      <section className="movieTextWrapper movieTextWrapperPadding">
                                        <div className="movieTextFlex">
                                          <h3>
                                            <a
                                              className="linkButton movieTextHeading"
                                              onClick={() => {
                                                functionOnclick(show);
                                              }}
                                            >
                                              {show.show_name}
                                            </a>
                                          </h3>
                                          <div className="movieCatYear">
                                            <div>
                                              {/* <div className="movieYear">
                                                                                                <div className="_1MmGl">{convertTime(show.duration)}</div>
                                                                                            </div> */}
                                              <div className="_1MmGl">
                                                {show.year
                                                  ? `(${show.year})`
                                                  : null}
                                                {show.year && show.duration_text
                                                  ? " . "
                                                  : null}
                                                {show.duration_text
                                                  ? show.duration_text
                                                  : null}
                                              </div>
                                              {/* {show.year ? (
                                              <div className="_1MmGl">
                                                ({show.year}) ·{" "}
                                                {convertTime(show.duration)}
                                              </div>
                                            ) : (
                                              <div className="_1MmGl">
                                                {convertTime(show.duration)}
                                              </div>
                                            )} */}
                                              {show.category_names && (
                                                <div className="movieCategory mcMargin">
                                                  {show.category_names}
                                                </div>
                                              )}
                                            </div>
                                            <div>
                                              {show.rating && (
                                                <div className="movieCensorBox moviecensorText">
                                                  {show.rating}
                                                </div>
                                              )}
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

