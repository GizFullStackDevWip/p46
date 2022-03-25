// import React, { useState, useEffect } from "react";
// import { service } from "../../network/service";
// import Carousel from "react-multi-carousel";
// import ReactHlsPlayer from "react-hls-player";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useHistory, Redirect } from "react-router-dom";
// import {
//   convertTime,
//   deviceDetect,
//   playerController,
//   convertSecondsToMin,
// } from "../../Utils/utils";
// import { FacebookShareButton, TwitterShareButton } from "react-share";
// import videothumbnail from "../../images/videothumbnail.png";

// var videoImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/";
// var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { service } from "../../network/GetVideos/service";
import Carousel from "react-multi-carousel";
import ReactHlsPlayer from "react-hls-player";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  convertTime,
  deviceDetect,
  playerController,
  convertSecondsToMin,
} from "../../Utils/utils";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import premium from "../../images/Image.png";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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
  const [watchBtnDisable, setWatchBtnDisable] = useState(true);
  const [categoryID, setCategoryID] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    service.getShowDetails(categoryId.categoryId.show_id).then((response) => {
      var data = response.data;
      setEpisodeLength(response.data.length);
      if (response.success === true) {
        var videoDetail = "";
        dispatch({ type: "SHOW_ID", payload: categoryId.categoryId.show_id });
        setShowDetails(response.data);
        setCategoryID(response.data.category_id);
        setCategories(response.data.categories);
        setEpisodeList(response.data.videos);
        videoDetail = response.data;
        service.playerToken().then((tokenResponse) => {
          let newURL = "";
          if (videoDetail.teaser && videoDetail.teaser_flag == 1) {
            let arr = videoDetail.teaser.split("/").reverse();
            newURL =
              "https://poppo.tv/playlist/playlist.m3u8?id=" +
              arr[1] +
              "&token=" +
              tokenResponse.data.data +
              "&type=trailer";
            // newURL = 'https://ads.poppo.tv/vmap?pid=275&width=[WIDTH]&height=[HEIGHT]&dnt=[DNT]&ip=[IP_ADDRESS]&lat=[LATITUDE]&lon=[LONGITUDE]&ua=[USER_AGENT]&advid=[DEVICE_IFA]&uuid=[UUID]&country=[COUNTRY]&deviceid=[DEVICE_ID]&kwds=[KEYWORDS]&device_model=[DEVICE_MODEL]&device_make=[DEVICE_MAKE]&channelid=[CHANNEL_ID]&videoid=[VIDEO_ID]&bundleid=[BUNDLE]&appname=[APP_NAME]&totalduration=[DURATION]&description_url=[APP_STORE_URL]'
          } else {
            setWatchBtnDisable(false);
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

            newURL = "";
          }
          setVideoPlayer(
            <ReactHlsPlayer
              id="singleVideo"
              url={newURL}
              autoplay={true}
              controls={true}
              width={"100%"}
              poster={videoImageUrl}
              height={"100%"}
              onReady={onPlayerReady}
              onPlay={onVideoPlay(videoDetail.videos[0].video_id)}
              onPause={onVideoPause}
              onEnd={onVideoEnd}
            />
          );
        });
        details = videoDetail;
        service.similarShow(videoDetail.show_id).then((response) => {
          if (response.success === true) {
            setSimilarShows(response.data);
          }
        });
      }
    });
    // setUpdate(false);
    // window.addEventListener('scroll', handleScroll)
  }, [update, login]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
    service.onVideoPlayFunction(details).then((response) => {});
  };
  const onVideoPlay = (videoId) => {
    setWatchBtnDisable(false);
    // let isLoggedIn = localStorage.getItem('isLoggedIn');
    // if (isLoggedIn == 'false' || isLoggedIn == null) {
    //     localStorage.setItem('currentUrl', window.location.pathname);
    //     history.push({
    //         pathname: '/signin'
    //     });
    // }
    service.onVideoPlayFunction(details).then((response) => {});
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
    service.onVideoPlayFunction(details).then((response) => {});
  };
  const onVideoEnd = () => {
    service.onVideoPlayFunction(details).then((response) => {});
  };
  const functionOnclick = (show) => {
    history.push({
      pathname: "/home/movies",
      search: encodeURI(`show_id=${show.show_id}`),
    });

    setUpdate(!update);
  };
  const hoverFunction = (flag, index) => {
    setHover(flag);
    setFocusedId(index);
  };
  const addtoMylistFunction = (show) => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      service.addToMyPlayList(show.show_id, 1).then((response) => {
        if (response.success === true) {
          service
            .getShowDetails(categoryId.categoryId.show_id)
            .then((response) => {
              var data = response.data;
              if (response.success === true) {
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
              }
            });
        }
      });
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
  };
  const removeFromMylistFunction = (show) => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      service.addToMyPlayList(show.show_id, 0).then((response) => {
        if (response.success === true) {
          service
            .getShowDetails(categoryId.categoryId.show_id)
            .then((response) => {
              var data = response.data;
              if (response.success === true) {
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
              }
            });
        }
      });
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
  };

  const socialMediaFunction = () => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setShare(!share);
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
  };
  const onWatchClick = (showDetails) => {
    let user_id = service.getCookie("userId");
    if (
      showDetails.premium_flag == 1 ||
      showDetails.rental_flag == 1 ||
      showDetails.payper_flag == 1
    ) {
      service
        .videoSubscription(showDetails.videos[0].video_id)
        .then((response) => {
          let videoDetails = response.data;
          let subFlag = true;
          let uId = 74961;
          let user_id = service.getCookie("userId");
          // if (videoDetails.length == 0) {
          //     history.push(
          //         { pathname: '/videoplayer', search: encodeURI(`show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${showDetails.videos[0].video_id}`) }
          //     );
          //     return
          // } else
          if (user_id == null || user_id == service.getCookie("guestUserId")) {
            service.setCookie("showId", showDetails.show_id, 10);
            history.push({
              pathname: "/signin",
            });
            return;
          }
          if (user_id) {
            uId = user_id;
          }

          service.userSubscription(uId).then((useResponse) => {
            var userData = useResponse.data;
            videoDetails.map(function (subscription, index) {
              // if (useResponse.forcibleLogout === false) {
              if (useResponse.data.length == 0 && subFlag) {
                subFlag = false;
                service.setCookie("showId", showDetails.show_id, 10);
                service.setCookie(
                  "videoId",
                  showDetails.videos[0].video_id,
                  10
                );
                history.push({
                  pathname: "/subscription",
                  state: {
                    videoData: showDetails.videos[0].video_id,
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
                  service.setCookie(
                    "videoId",
                    showDetails.videos[0].video_id,
                    10
                  );
                  history.push({
                    pathname: "/subscription",
                    state: {
                      videoData: showDetails.videos[0].video_id,
                    },
                  });
                } else if (subFlag) {
                  subFlag = false;
                  history.push({
                    pathname: "/videoplayer",
                    search: encodeURI(
                      `show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${showDetails.videos[0].video_id}`
                    ),
                  });
                }
              }
            });
          });
        });
    } else {
      history.push({
        pathname: "/videoplayer",
        search: encodeURI(
          `show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${showDetails.videos[0].video_id}`
        ),
      });
    }

    service.onVideoPlayFunction(details).then((response) => {});
  };
  const onEpisodePlay = (show) => {
    let user_id = service.getCookie("userId");
    if (show.subscriptions.length > 0) {
      service.videoSubscription(show.video_id).then((response) => {
        let videoDetails = response.data;
        let subFlag = true;
        let uId = 74961;
        let user_id = service.getCookie("userId");
        // if (videoDetails.length == 0) {
        //     history.push(
        //         { pathname: '/videoplayer', search: encodeURI(`show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${show.video_id}`) }
        //     );
        //     return
        // } else
        if (user_id == null || user_id == service.getCookie("guestUserId")) {
          service.setCookie("showId", showDetails.show_id, 10);
          history.push({
            pathname: "/signin",
          });
          return;
        }
        if (user_id) {
          uId = user_id;
        }

        service.userSubscription(uId).then((useResponse) => {
          var userData = useResponse.data;
          videoDetails.map(function (subscription, index) {
            // if (useResponse.forcibleLogout === false) {
            if (useResponse.data.length == 0 && subFlag) {
              subFlag = false;
              service.setCookie("showId", showDetails.show_id, 10);
              service.setCookie("videoId", show.video_id, 10);
              history.push({
                pathname: "/subscription",
                state: {
                  videoData: show.video_id,
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
                service.setCookie("videoId", show.video_id, 10);
                history.push({
                  pathname: "/subscription",
                  state: {
                    videoData: show.video_id,
                  },
                });
              } else if (subFlag) {
                subFlag = false;
                history.push({
                  pathname: "/videoplayer",
                  search: encodeURI(
                    `show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${show.video_id}`
                  ),
                });
              }
            }
          });
        });
      });
    } else {
      history.push({
        pathname: "/videoplayer",
        search: encodeURI(
          `show_id=${showDetails.show_id}&single_video=${showDetails.single_video}&video_id=${show.video_id}`
        ),
      });
    }

    service.onVideoPlayFunction(details).then((response) => {});
  };
  const categorySelect = (i) => {
    history.push({
      pathname: "/home/categorylist",
      search: encodeURI(
        `category_id=${i.category_id}&category_name=${i.category_name}`
      ),
    });
  };

  return (
    <div className="menuCloseJS closeMenuWrapper">
      <div className="videoPage">
        <div className="videoPageContainer">
          {showDetails.single_video === 0 ? (
            <div
              className="videoPageBGimg"
              // style={{ backgroundImage: `url(${showsImageUrl + showDetails.logo})` }}
            ></div>
          ) : showDetails.single_video === 1 ? (
            <div
              className="videoPageBGimg"
              // style={{ backgroundImage: `url(${showsImageUrl + showDetails.thumbnail})` }}
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
                  <div className="vpMiddleHeading">
                    <h1 className="vpMiddleh1">{showDetails.show_name}</h1>
                  </div>
                  {/* <div className="col col-2-5"> */}
                  <div
                    className={
                      showDetails.teaser ? "col col-2-5" : "col col-1-5"
                    }
                  >
                    <div className="vpLeftSection">
                      {showDetails.single_video === 0 ? (
                        <div
                          className="vpPoster"
                          style={{
                            backgroundImage: `url(${
                              showsImageUrl + showDetails.logo
                            })`,
                            marginLeft: "7px",
                          }}
                        ></div>
                      ) : showDetails.single_video === 1 ? (
                        <div
                          className="vpPoster"
                          style={{
                            backgroundImage: `url(${
                              videoImageUrl + showDetails.logo
                            })`,
                            marginLeft: "7px",
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
                            disabled={watchBtnDisable}
                            style={{ height: "41px" }}
                            onClick={() => {
                              onWatchClick(showDetails);
                            }}
                          >
                            <div className="buttonBg"></div>
                            <div className="buttonContent">
                              {showDetails.single_video === 0 ? (
                                <div className="vpWatchSeasonText">
                                  Watch S01:E01
                                </div>
                              ) : showDetails.single_video === 1 ? (
                                <div className="vpWatchSeasonText">
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
                              onClick={() => {
                                socialMediaFunction();
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
                                setOther(!other);
                              }}
                            >
                              <div className="buttonBg"></div>
                              <div className="buttonContent">
                                <div className="vpReport"></div>
                              </div>
                            </button>
                            {share === true ? (
                              <div>
                                <div
                                  className="_1TcfH _1Dgjh"
                                  style={{ left: "7px" }}
                                >
                                  <FacebookShareButton
                                    url={
                                      "https://adventuresportstv.net/home/movies?show_id=" +
                                      showDetails.show_id
                                    }
                                    quote={
                                      showDetails.show_name +
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
                                      "https://adventuresportstv.net/home/movies?show_id=" +
                                      showDetails.show_id
                                    }
                                    title={showDetails.show_name}
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
                              <div>
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
                  <div className="col col-3-5 movieTagsMob">
                    <div className="vpMiddleInfoSection vpInfoPadding">
                      <div className="vpLengthCensor">
                        <div className="vpLengthYear">
                          {showDetails.year && (
                            <div className="movieYearText">
                              {showDetails.year}
                              <span className="vpYearBreak">·</span>
                            </div>
                          )}

                          <div className="movieLength">
                            {showDetails.videos &&
                              convertTime(showDetails.videos[0].video_duration)}
                          </div>
                        </div>
                        <div className="vpCCwrapper">
                          <svg
                            className="svgIcon vpCCicon"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 28 18"
                            style={{ fill: "currentcolor" }}
                          >
                            <g fill="currentColor" fillRule="evenodd">
                              <path
                                fillRule="nonzero"
                                d="M2 9c0 3.867 3.13 7 6.994 7h10.012C22.868 16 26 12.866 26 9c0-3.867-3.13-7-6.994-7H8.994C5.132 2 2 5.134 2 9zM0 9c0-4.97 4.027-9 8.994-9h10.012C23.973 0 28 4.028 28 9c0 4.97-4.027 9-8.994 9H8.994C4.027 18 0 13.972 0 9z"
                              ></path>
                              <path d="M11.844 10.195c-.088.836-.517 1.375-1.32 1.375-1.21 0-1.606-1.22-1.606-2.475 0-1.287.374-2.464 1.606-2.464.803 0 1.232.53 1.342 1.354h1.815c-.252-1.716-1.363-2.98-3.156-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.057 4.07 3.433 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88zm7.38 0c-.087.836-.516 1.375-1.32 1.375-1.21 0-1.605-1.22-1.605-2.475 0-1.287.373-2.464 1.605-2.464.803 0 1.232.53 1.342 1.354h1.815c-.253-1.716-1.364-2.98-3.157-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.056 4.07 3.432 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88z"></path>
                            </g>
                          </svg>
                          {/* {showDetails.rating && <div className="movieCensorBox">{showDetails.rating}</div>} */}
                          <br />
                        </div>
                      </div>
                      <div className="vpMovieCategory">
                        <div className="vpCategoryFlex vpCategoryMargin">
                          {categories.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="movieCensorBox vpMovieType vpMovieTypeMargin"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  categorySelect(item);
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
                          Episodes : {episodeLength}
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
                {isDesktop === false ? (
                  showDetails.single_video === 0 ? (
                    <div className="">
                      Episodes : {episodeLength}
                      <br />
                      {showDetails.videos[0].video_description}
                    </div>
                  ) : (
                    <div className="">{showDetails.synopsis}</div>
                  )
                ) : null}
                {showDetails.single_video === 0 ? (
                  <div className="row vp3Section youMayLike">
                    <div className="col">
                      <div>
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
                        <div className="carousel carouselNoMask">
                          <div className="carouselContent">
                            <Carousel
                              className="row carouselRow"
                              responsive={responsive}
                            >
                              {episodeList.map((show, index) => {
                                if (!show.categories)
                                  show.categories = showDetails.categories;
                                return (
                                  <div className="col col-3" key={index}>
                                    <div className="movieTile">
                                      <div
                                        className="movieTileImage"
                                        className={
                                          hover === true && focusedId === index
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
                                        {showDetails.single_video == 0 ? (
                                          <div
                                            className="moviePoster"
                                            style={{
                                              backgroundImage: `url(${
                                                videoImageUrl + show.thumbnail
                                              })`,
                                            }}
                                          >
                                            <div className="FeNml"></div>
                                          </div>
                                        ) : (
                                          <div
                                            className="moviePoster"
                                            style={{
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
                                                });
                                              }}
                                            >
                                              {show.video_title}
                                            </a>
                                          </h3>
                                          <div className="movieCatYear">
                                            <div>
                                              <div className="movieYear">
                                                {show.year ? (
                                                  <div className="_1MmGl">
                                                    ({show.year}) .{" "}
                                                    {show.duration
                                                      ? convertTime(
                                                          show.duration
                                                        )
                                                      : convertTime(
                                                          show.video_duration
                                                        )}
                                                  </div>
                                                ) : (
                                                  <div className="_1MmGl">
                                                    {show.duration
                                                      ? convertTime(
                                                          show.duration
                                                        )
                                                      : convertTime(
                                                          show.video_duration
                                                        )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="movieCategory mcMargin">
                                                {show.categories.map(
                                                  (item, index) => {
                                                    if (
                                                      index ===
                                                      show.categories.length - 1
                                                    ) {
                                                      return (
                                                        <div key={index}>
                                                          {item.category_name}
                                                        </div>
                                                      );
                                                    } else {
                                                      return (
                                                        <div key={index}>
                                                          {item.category_name}
                                                          {","}&nbsp;
                                                        </div>
                                                      );
                                                    }
                                                  }
                                                )}
                                              </div>
                                            </div>
                                            {/* <div>
                                                                                                        {show.rating && <div className="movieCensorBox moviecensorText">{show.rating}</div>}
                                                                                                    </div> */}
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
                      <div className="carousel carouselNoMask">
                        <div className="carouselContent">
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
                                      className={
                                        hover === true && focusedId === index
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
                                          functionOnclick(show);
                                        }}
                                        className={
                                          hover === true && focusedId === index
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
                                            onClick={() => {
                                              functionOnclick(show);
                                            }}
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
                                      {show.single_video == 0 ? (
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
                                      ) : (
                                        <div
                                          className="moviePoster"
                                          style={{
                                            backgroundImage: `url(${
                                              videoImageUrl + show.logo
                                            })`,
                                          }}
                                        >
                                          <div className="FeNml"></div>
                                        </div>
                                      )}
                                      {/* <div className="moviePoster"
                                                                                    style={{ backgroundImage: `url(${showsImageUrl + show.logo})` }}>
                                                                                    <div className="FeNml"></div>
                                                                                </div> */}
                                      <div
                                        className={
                                          hover === true && focusedId === index
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
                                              functionOnclick(show);
                                            }}
                                          >
                                            {show.show_name}
                                          </a>
                                        </h3>
                                        <div className="movieCatYear">
                                          <div>
                                            <div className="movieYear">
                                              {show.year ? (
                                                <div className="_1MmGl">
                                                  ({show.year}) .{" "}
                                                  {show.duration
                                                    ? convertTime(show.duration)
                                                    : convertTime(
                                                        show.video_duration
                                                      )}
                                                </div>
                                              ) : (
                                                <div className="_1MmGl">
                                                  {show.duration
                                                    ? convertTime(show.duration)
                                                    : convertTime(
                                                        show.video_duration
                                                      )}
                                                </div>
                                              )}
                                            </div>
                                            <div className="movieCategory mcMargin">
                                              {show.categories &&
                                                show.categories.map(
                                                  (item, index) => {
                                                    if (
                                                      index ===
                                                      show.categories.length - 1
                                                    ) {
                                                      return (
                                                        <div key={index}>
                                                          {item.category_name}
                                                        </div>
                                                      );
                                                    } else {
                                                      return (
                                                        <div key={index}>
                                                          {item.category_name}
                                                          {","}&nbsp;
                                                        </div>
                                                      );
                                                    }
                                                  }
                                                )}
                                            </div>
                                          </div>
                                          {/* <div>
                                                                                            {show.rating && <div className="movieCensorBox moviecensorText">{show.rating}</div>}
                                                                                        </div> */}
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
