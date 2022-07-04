import React, { useState, useEffect } from "react";
import { service } from "../../network/GetVideos/service";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./VideoDetails.css";
import {
  convertTime,
  deviceDetect,
  playerController,
  convertSecondsToMin,
} from "../../Utils/utils";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import KeyArtWork from "./KeyArtWork1";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { clearUserData } from "../../Utils/utils";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import freeTag from "../../images/free1.png";
import "react-dropdown/style.css";
import { convertAdUrl } from "../../Utils/utils";

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
  const [focusedId, setFocusedId] = useState(-1);
  const [showDetails, setShowDetails] = useState([]);
  const [episodeLength, setEpisodeLength] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [update, setUpdate] = useState(false);
  const [videoFlag, setVideoflag] = useState('0');
  var linearFlag = 0;
  let isFreeVideo = false;
  var isContinueWatching = localStorage.getItem("ContinueWatching");
  var NoContinueWatchPopUp = localStorage.getItem("NoContinueWatchPopUp");
  const [videoLoading, setVideoLoading] = useState(false);
  const historys = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [VideoElemState, setVideoElemState] = useState('')





  const [episodeList, setEpisodeList] = useState([]);
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
  const [categories, setCategories] = useState([]);
  const [isDesktop, setIsDesktop] = useState(deviceDetect());
  const dispatch = useDispatch();
  const border = {
    "border-radius": "12px",
  };
  const [CatId, setCatId] = useState(queryParams.get('show_id'))
  const [currentSeason, setCurrentSeason] = useState([]);
  const [allSeasonList, setAllSeasonList] = useState([]);
  const [numberOfSeason, setNumberOfSeason] = useState(-1);
  const [optionsS, setOptionsS] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [Videodetailstate, setVideodetailstate] = useState([])
  const [ShowDetailState, setShowDetailState] = useState([])

  useEffect(() => {

    // ############## Login check ##############

    let user_id = service.getCookie("userId");
    if (user_id == null || user_id == service.getCookie("guestUserId")) {
      history.push({
        pathname: "/signin",
      });
    }
    else {

      mainFunction()

    }


    window.scrollTo(0, 0);
    if (categoryId.categoryId.show_id == "undefined") {
      categoryId.categoryId.show_id = localStorage.getItem("showId");
      history.goBack();
    }
    console.log("news id", categoryId);

    // ############ old video detail page show call ie: can be deleted ############
    setUpdate(false);
    window.addEventListener("scroll", handleScroll);

  }, [update, CatId]);



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


    // ################ watch without ads click no function ################

    const onClickNo = (videoDetail, videoElem) => {
      let adUrl = convertAdUrl(videoDetail);

      console.log(`adUrl`, adUrl)

      if (isContinueWatching == "true" &&
        videoDetail.watched_duration &&
        videoDetail.watched_duration != 0) {

        localStorage.removeItem("ContinueWatching");
        isContinueWatching = false;
        console.log(`$$ inside IF`)
        if (NoContinueWatchPopUp == "true") {
          localStorage.removeItem("NoContinueWatchPopUp");
          window.playMainPlayer(
            adUrl,
            videoElem,
            videoDetail.videos[0].video_id,
            videoDetail,
            true,
            videoDetail.watched_duration
          );
          console.log(`$$ 2nd inside IF`)
        }
        else if (
          window.confirm("Continue from where you stopped?")
        ) {
          console.log(`$$ 3rd inside IF`)
          window.playMainPlayer(
            adUrl,
            videoElem,
            videoDetail.videos[0].video_id,
            videoDetail,
            true,
            videoDetail.watched_duration
          );
        }
        else {
          console.log(`$$ 4th inside IF`)
          window.playMainPlayer(
            adUrl,
            videoElem,
            videoDetail.videos[0].video_id,
            videoDetail,
            false
          );
        }

      }
      else {
        console.log(`$$ inside else`, adUrl,
          videoElem,
          videoDetail.videos[0].video_id,
          videoDetail)
        localStorage.removeItem("ContinueWatching");
        window.playMainPlayer(
          adUrl,
          videoElem,
          videoDetail.video_id,
          videoDetail,
          false
        );
      }
      setTimeout(() => {
        setVideoLoading(true);
      }, 3500);

    }

  // ######### function used in useeffect erlier #########

  const mainFunction = (videoElem) => {
    
    console.log(`videoElem main from funx  start` , videoElem)
    let videoElement = videoElem ;
    window.scrollTo(0, 0);
    if (categoryId.categoryId.show_id == "undefined") {
      categoryId.categoryId.show_id = localStorage.getItem("showId");
      history.goBack();
    }
    console.log("news id", categoryId);
    setCatId(queryParams.get('show_id'))

    service.getShowDetails(categoryId.categoryId.show_id).then((response) => {
      // debugger
      var data = response.data;
      setShowDetailState(response.data)
      console.log("quo", response);
      setEpisodeLength(
        response.data.videos
          ? response.data.videos.length
          :
          response.data.videos.length
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
        response.data.videos ? response.data.videos[0].videos : []
      );
      let defaultOpt = [];
      defaultOpt.push(response.data.videos[0]);
      setDefaultOptions(defaultOpt);
      let option = [];
      response.data.videos[0].videos &&
        response.data.videos[0].videos.map((item, index) => {
          console.log(`inside`);
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
      service.getVideoDetails(videoDetail.videos[0].video_id).then((VideoDetailResponse) => {
        setVideodetailstate(VideoDetailResponse.data)
        // VideodetailVar = response.data;
        console.log(`video detail response`, VideoDetailResponse)

        service.playerToken().then((tokenResponse) => {
          let arr = videoDetail.videos[0].video_name
            ? (arr = videoDetail.videos[0].video_name.split("/").reverse())
            : (arr = videoDetail.videos[0].videos[0].video_name
              .split("/")
              .reverse());

          let newURL =
            "https://poppo.tv/playlist/playlist.m3u8?id=" +
            arr[1] +
            "&token=" +
            tokenResponse.data.data +
            "&type=video";
          console.log(`videoname url:`, videoDetail);
          console.log(`videoElem b4 setting`, videoElem)
          let videoElem = (videoElement) ? (videoElement) :
            ("content_video" + videoDetail.videos[0].video_id + new Date().valueOf());
          console.log("videoelem after setting", videoElem);

          let uId = service.getCookie("guestUserId");
          let user_id = service.getCookie("userId");
          if (user_id) {
            uId = user_id;
          }
          service.videoSubscription(videoDetail.videos[0].video_id).then((response) => {
            let videoSubDetails = response.data;
            console.log(`videoSubDetails`, videoSubDetails)
            let subFlag = true;
            service.checkUserSubscription(uId).then((userResponse) => {

              if (userResponse.success == true) {

                var userSubDetails = userResponse.data;
                console.log(`userSubDetails`, userSubDetails)

                if (userResponse.forcibleLogout === true) {
                  alert(
                    "Sorry, You’ve reached the maximum Device limit. Please log in again!"
                  );
                  service.logoutAll(uId).then((res) => {
                    setTimeout(() => {
                      redirectToLogin();
                    }, 1000);
                  });
                }
                else if (userResponse.session_expired === true) {
                  ToastsStore.warning("Sorry! Session Has Expired");
                  redirectToLogin();
                }
                else {
                  console.log(`sub check else`)
                  console.log(`userSubDetails & userSubDetails`, userSubDetails, userSubDetails.length)
                  console.log(`VideoDetailResponse.data`, VideoDetailResponse.data)
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
                      VideoDetailResponse.data.free_video == true &&
                      VideoDetailResponse.data.premium_flag == 0 &&
                      VideoDetailResponse.data.rental_flag == 0 &&
                      VideoDetailResponse.data.payper_flag == 0
                    ) {
                      // ----------------------------------------------
                      isFreeVideo = true;
                      console.log(`isFreeVideo`)
                    } else {
                      console.log(`subscribedVideo`)
                      videoSubDetails.map(function (subscription, index) {
                        let subscribedVideo = userSubDetails.filter(
                          (e) =>
                            e.sub_id ==
                            subscription.publisher_subscription_id
                        );
                        console.log(`subscribedVideo`, subscribedVideo)
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
                      }
                      );
                    }
                    let adUrl = isFreeVideo == false
                      ? convertAdUrl(videoDetail)
                      : null;
                    console.log(`adUrl`, adUrl)

                    if (isContinueWatching == "true" &&
                      videoDetail.watched_duration &&
                      videoDetail.watched_duration != 0) {

                      localStorage.removeItem("ContinueWatching");
                      isContinueWatching = false;
                      console.log(`$$ inside IF`)
                      if (NoContinueWatchPopUp == "true") {
                        localStorage.removeItem("NoContinueWatchPopUp");
                        window.playMainPlayer(
                          adUrl,
                          VideoElemState ? VideoElemState : videoElem,
                          videoDetail.videos[0].video_id,
                          videoDetail,
                          true,
                          videoDetail.watched_duration
                        );
                        console.log(`$$ 2nd inside IF`)
                      }
                      else if (
                        window.confirm("Continue from where you stopped?")
                      ) {
                        console.log(`$$ 3rd inside IF`)
                        window.playMainPlayer(
                          adUrl,
                          videoElem,
                          videoDetail.videos[0].video_id,
                          videoDetail,
                          true,
                          videoDetail.watched_duration
                        );
                      }
                      else {
                        console.log(`$$ 4th inside IF`)
                        window.playMainPlayer(
                          adUrl,
                          videoElem,
                          videoDetail.videos[0].video_id,
                          videoDetail,
                          false
                        );
                      }

                    }
                    else {
                      console.log(`$$ inside else`, adUrl,
                        videoElem,
                        videoDetail.videos[0].video_id,
                        videoDetail)
                      localStorage.removeItem("ContinueWatching");
                      window.playMainPlayer(
                        adUrl,
                        videoElem,
                        videoDetail.video_id,
                        videoDetail,
                        false
                      );
                    }
                    setTimeout(() => {
                      setVideoLoading(true);
                    }, 3500);
                  }
                  else {
                    //###################### checking watch without adds ##########################
                    confirmAlert({
                      title: "",
                      message: "Watch without ads?",
                      buttons: [
                        {
                          label: "Yes",
                          onClick: () => {
                            service.setCookie("showId", videoDetail.show_id, 10);
                            service.setCookie("videoId", VideoDetailResponse.video_id, 10);
                            history.push({
                              pathname: "/SubscriptionList",
                              state: {
                                videoData: VideoDetailResponse.video_id
                              }
                            })
                          },

                        },
                        {
                          label: "No",
                          onClick: () => {
                            onClickNo(videoDetail, videoElem);
                          }
                        },
                      ],
                    });

                  }



                }

              }
            })




          })
          // ################## setting video player ##################


          setVideoPlayer(
            <video
              id={videoElem}
              className="video-js vjs-default-skin mainPlayer"
              controls
              preload="auto"
              autoPlay
            >
              <source src={newURL} type="application/x-mpegURL" />


            </video>
          );
        });
        details = videoDetail;
        service.similarShow(videoDetail.show_id).then((response) => {
          if (response.success == true && response.data.length > 0) {
            setSimilarShows(response.data);
          }
        });
        // }
      })
    });
    setUpdate(false);
    window.addEventListener("scroll", handleScroll);

  
  }

  const functionOnclick = (show , Videodetailstate) => {
    console.log(`show00000000000`, show)
    history.push({
      pathname: "/home/movies",
      search: encodeURI(`show_id=${show.show_id}`),
    });
   let videoElem = "content_video" + Videodetailstate.video_id + new Date().valueOf();
   setVideoElemState(videoElem)
   mainFunction(videoElem);
   console.log(`videoElem from onclick function `,videoElem)
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




  return (
    <div className="menuCloseJS closeMenuWrapper">
      <div className="videoPage">
        <ToastsContainer store={ToastsStore} />
        <div
          className="videoPageContainer"
          style={{ backgroundColor: "black" }}
        >
          {console.log(`showDetails.single_video`, showDetails.single_video)}
          {showDetails.single_video == 0 ? (
            <div
              className="videoPageBGimg"
              style={{
                backgroundImage: `url(${showDetails.type === "linear_event"
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
                backgroundImage: `url(${showDetails.type === "linear_event"
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
                      <div className="_3tqpT">
                        {videoPlayer}
                        <div style={{ height: "20vh", paddingBottom: "100px" }}>
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
                                      {showDetails.year &&
                                        `(${showDetails.year})`}
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
                            {showDetails.key_art_work &&
                              showDetails.key_art_work.length > 0 ? (
                              <KeyArtWork
                                keyartWork={showDetails.key_art_work}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="forSmallDevice">
                  <div className="_2KWdL">
                    <section className="_1dQ5J">
                      <div className="_3tqpT">
                        {videoPlayer}
                        <div style={{ height: "20vh", paddingBottom: "100px" }}>
                          <div
                            className={
                              showDetails.teaser
                                ? "col col-4-5 movieTagsMob"
                                : "col col-5 movieTagsMob"
                            }
                          >
                            <div className="vpMiddleInfoSection vpInfoPadding">
                              {showDetails.show_name && (
                                <div className="vpMiddleHeading">
                                  <h1 className="vpMiddleh1 titleprops">
                                    {showDetails.show_name}
                                  </h1>
                                </div>
                              )}
                              <div className="vpLengthCensor">
                                <div className="vpLengthYear">
                                  {showDetails && (
                                    <div className="movieLength">
                                      {showDetails.year &&
                                        `(${showDetails.year})`}
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
                                  <a
                                    href="https://www.facebook.com/MaxBetTV/"
                                    rel="noopener"
                                    target="_blank"
                                    className="linkButton footerFacebook"
                                    style={{ color: "#c2d501" }}
                                  >
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
                                  </a>
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
                              <div className="vpMovieCategory">
                                <div className="vpCategoryFlex vpCategoryMargin">
                                  {" "}
                                  <a
                                    href="https://www.facebook.com/MaxBetTV/"
                                    rel="noopener"
                                    target="_blank"
                                    className="linkButton footerFacebook"
                                    style={{ color: "#c2d501" }}
                                  >
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
                                  </a>
                                  <a
                                    href="https://www.instagram.com/maxbettv/?hl=en"
                                    rel="noopener"
                                    target="_blank"
                                    className="linkButton footerInsta"
                                    style={{ color: "#c2d501" }}
                                  >
                                    <svg
                                      className="svgIcon"
                                      preserveAspectRatio="xMidYMid meet"
                                      viewBox="0 0 20 20"
                                      style={{ fill: "currentcolor" }}
                                    >
                                      <g fill="currentColor" fillRule="evenodd">
                                        <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.087.278 3.45.525c-.658.256-1.216.598-1.772 1.153C1.123 2.234.78 2.792.525 3.45.278 4.086.11 4.812.06 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.05 1.065.218 1.79.465 2.428.256.658.598 1.216 1.153 1.77.556.558 1.114.9 1.772 1.155.636.248 1.363.417 2.427.464 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.064-.048 1.79-.217 2.428-.465.658-.255 1.216-.597 1.77-1.154.558-.554.9-1.112 1.155-1.77.248-.636.417-1.362.464-2.427.048-1.066.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.048-1.065-.217-1.79-.465-2.427-.255-.658-.597-1.216-1.154-1.772-.554-.555-1.112-.897-1.77-1.153C15.915.278 15.188.11 14.124.06 13.057.012 12.716 0 10 0m0 2c2.606 0 2.914.01 3.943.057.952.044 1.468.202 1.812.336.455.177.78.39 1.123.73.34.34.552.667.73 1.12.133.346.292.862.335 1.814C17.99 7.087 18 7.394 18 10s-.01 2.914-.057 3.943c-.043.952-.202 1.468-.335 1.812-.178.455-.39.78-.73 1.123-.343.34-.668.552-1.123.73-.344.133-.86.292-1.812.335-1.03.047-1.337.057-3.943.057s-2.914-.01-3.943-.057c-.952-.043-1.468-.202-1.813-.335-.454-.178-.78-.39-1.12-.73-.342-.343-.554-.668-.73-1.123-.135-.344-.293-.86-.337-1.812C2.01 12.913 2 12.606 2 10s.01-2.914.057-3.943c.044-.952.202-1.468.336-1.813.177-.454.39-.78.73-1.12.34-.342.667-.554 1.12-.73.346-.135.862-.293 1.814-.337C7.087 2.01 7.394 2 10 2"></path>
                                        <path d="M10 13c-1.657 0-3-1.343-3-3 0-1.656 1.343-3 3-3s3 1.344 3 3c0 1.657-1.343 3-3 3m0-8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m6 0c0 .553-.447 1-1 1-.553 0-1-.447-1-1 0-.553.447-1 1-1 .553 0 1 .447 1 1"></path>
                                      </g>
                                    </svg>
                                  </a>
                                  <a
                                    href="https://in.pinterest.com/0uettaf6f5so56zhsl4f3jdd8r6oiz/_created/"
                                    rel="noopener"
                                    target="_blank"
                                    className="linkButton footerTwitter"
                                    style={{ color: "#c2d501" }}
                                  >
                                    <svg
                                      id="container"
                                      viewBox="0 0 310.05 310.05"
                                      className="svgIcon"
                                      style={{ fill: "currentcolor" }}
                                    >
                                      <path
                                        id="logo"
                                        d="M245.265,31.772C223.923,11.284,194.388,0,162.101,0c-49.32,0-79.654,20.217-96.416,37.176
		c-20.658,20.9-32.504,48.651-32.504,76.139c0,34.513,14.436,61.003,38.611,70.858c1.623,0.665,3.256,1,4.857,1
		c5.1,0,9.141-3.337,10.541-8.69c0.816-3.071,2.707-10.647,3.529-13.936c1.76-6.495,0.338-9.619-3.5-14.142
		c-6.992-8.273-10.248-18.056-10.248-30.788c0-37.818,28.16-78.011,80.352-78.011c41.412,0,67.137,23.537,67.137,61.425
		c0,23.909-5.15,46.051-14.504,62.35c-6.5,11.325-17.93,24.825-35.477,24.825c-7.588,0-14.404-3.117-18.705-8.551
		c-4.063-5.137-5.402-11.773-3.768-18.689c1.846-7.814,4.363-15.965,6.799-23.845c4.443-14.392,8.643-27.985,8.643-38.83
		c0-18.55-11.404-31.014-28.375-31.014c-21.568,0-38.465,21.906-38.465,49.871c0,13.715,3.645,23.973,5.295,27.912
		c-2.717,11.512-18.865,79.953-21.928,92.859c-1.771,7.534-12.44,67.039,5.219,71.784c19.841,5.331,37.576-52.623,39.381-59.172
		c1.463-5.326,6.582-25.465,9.719-37.845c9.578,9.226,25,15.463,40.006,15.463c28.289,0,53.73-12.73,71.637-35.843
		c17.367-22.418,26.932-53.664,26.932-87.978C276.869,77.502,265.349,51.056,245.265,31.772z"
                                      />
                                    </svg>
                                  </a>
                                  <a
                                    href="https://www.linkedin.com/company/maxbettv/"
                                    rel="noopener"
                                    target="_blank"
                                    className="linkButton footerLinkedIn"
                                    style={{ color: "#c2d501" }}
                                  >
                                    <svg
                                      className="svgIcon"
                                      preserveAspectRatio="xMidYMid meet"
                                      viewBox="0 0 15 15"
                                      style={{ fill: "currentcolor" }}
                                    >
                                      <path d="M13.89 0H1.11A1.1 1.1 0 0 0 0 1.08v12.84A1.1 1.1 0 0 0 1.11 15h12.78A1.1 1.1 0 0 0 15 13.92V1.08A1.1 1.1 0 0 0 13.89 0zM4 13H2V5h2zm0-9H2V2h2zm9 9h-2.24V9.2c0-.91 0-2.07-1.17-2.07s-1.35 1-1.35 2V13H6V5.19h2.15v1.07A2.33 2.33 0 0 1 10.31 5C12.58 5 13 6.62 13 8.72z"></path>
                                    </svg>
                                  </a>
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
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </div>
          )}

          <div
            className=" dynamicresp"
          // style={{
          //   marginTop: "35px",
          //   paddingTop: "90px",
          //   width: "330px",
          //   marginLeft: "965px",
          // }}
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
                    {!currentSeason ? (
                      <div>Recommendations</div>
                    ) : (
                      <div>Episodes</div>
                    )}
                  </div>
                )}
                <div className="carousel carouselNoMask">
                  <div className="carouselContent categoryShowWrapperDetails">
                    <li
                      className="row carouselRow column-vd"
                      style={{ flexDirection: "column", height: "900px" }}
                      responsive={responsive}
                    >
                      {!currentSeason
                        ? similarShows &&
                        similarShows.map((show, index) => {
                          return (
                            <div className="" key={index}>
                              {console.log(`similarShows`, similarShows)}
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
                                      functionOnclick(show , Videodetailstate);
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
                                      // backgroundImage: `url(${
                                      //   showDetails.type ===
                                      //   "linear_event"
                                      //     ? showDetails.logo
                                      //     : showDetails.type === "news"
                                      //     ? showDetails.logo_thumb
                                      //     : showsImageUrl +
                                      //       showDetails.logo_thumb
                                      // })`,
                                      backgroundImage: `url(${showsImageUrl + show.logo
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
                                          backgroundPosition: "center bottom",
                                          backgroundSize: "cover",
                                          width: "260px",
                                        }}
                                      ></div>
                                      {show.watchlist_flag === 1 ? (
                                        <div className="wishlistTextWrapper">
                                          <div
                                            className="wishlistText"
                                            onClick={() => {
                                              removeFromMylistFunction(show);
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
                        })
                        : currentSeason.map((show, index) => {
                          return (
                            <div className="" key={index}>
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

                                  {show.thumbnail_350_200 && (
                                    <div
                                      className="moviePoster"
                                      style={{
                                        backgroundImage: `url(${videoImageUrl +
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
                                          backgroundPosition: "center bottom",
                                          backgroundSize: "cover",
                                          width: "260px",
                                        }}
                                      ></div>
                                      {show.watchlist_flag === 1 ? (
                                        <div className="wishlistTextWrapper">
                                          <div
                                            className="wishlistText"
                                            onClick={() => {
                                              removeFromMylistFunction(show);
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
                                        {show.video_title}
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
                                        {show.category_names ? (
                                          <div className="movieCategory mcMargin">
                                            {show.category_names}
                                          </div>
                                        ) : (
                                          categories &&
                                          categories.map((item, index) => {
                                            if (
                                              index ===
                                              showDetails.categories.length -
                                              1
                                            ) {
                                              return item.category_name;
                                            } else {
                                              return item.category_name + ",";
                                            }
                                          })
                                        )}
                                      </div>
                                      <div>
                                        {showDetails.rating && (
                                          <div className="movieCensorBox moviecensorText">
                                            {showDetails.rating}
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
                    </li>
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

























































// import React, { useState, useEffect } from "react";
// import { service } from "../../network/GetVideos/service";
// import Carousel from "react-multi-carousel";
// import ReactHlsPlayer from "react-hls-player";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import {
//   convertTime,
//   deviceDetect,
//   playerController,
//   convertSecondsToMin,
// } from "../../Utils/utils";
// import { FacebookShareButton, TwitterShareButton } from "react-share";
// import KeyArtWork from "./KeyArtWork1";
// import videothumbnail from "../../images/boondock.jpg";
// import { ToastsContainer, ToastsStore } from "react-toasts";
// import { clearUserData } from "../../Utils/utils";
// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import freeTag from "../../images/free1.png";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

// var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";
// var videoImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/";

// var details = [];

// const handleScroll = () => {
//   let playerId = "singleVideo";
//   if (deviceDetect() === true) {
//     playerController(600, playerId);
//   } else {
//     playerController(150, playerId);
//   }
// };
// const VideoDetails = (categoryId, episode) => {
//   const history = useHistory();
//   const login = useSelector((state) => state.login);
//   const [hover, setHover] = useState(false);
//   const [share, setShare] = useState(false);
//   const [other, setOther] = useState(false);
//   const [focusedId, setFocusedId] = useState(-1);
//   const [showDetails, setShowDetails] = useState([]);
//   const [episodeLength, setEpisodeLength] = useState([]);
//   const [similarShows, setSimilarShows] = useState([]);
//   const [update, setUpdate] = useState(false);
//   const [episodeList, setEpisodeList] = useState([]);
//   const [videoPlayer, setVideoPlayer] = useState();
//   const [categories, setCategories] = useState([]);
//   const [isDesktop, setIsDesktop] = useState(deviceDetect());
//   const dispatch = useDispatch();
//   const [ShwID, setShwID] = useState('')
//   const border = {
//     "border-radius": "12px",
//   };

//   const [currentSeason, setCurrentSeason] = useState([]);
//   const [allSeasonList, setAllSeasonList] = useState([]);
//   const [numberOfSeason, setNumberOfSeason] = useState(-1);
//   const [optionsS, setOptionsS] = useState([]);
//   const [defaultOptions, setDefaultOptions] = useState([]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     localStorage.removeItem('detailWatchNowClicked')
//     var urlParams = new URLSearchParams(window.location.search);
//     let Shw_ID = urlParams.get("show_id");
//     console.log(`show id from url params:`, Shw_ID);
//     setShwID(Shw_ID)
//     if (categoryId.categoryId.show_id == "undefined") {
//       categoryId.categoryId.show_id = localStorage.getItem("showId");
//       history.goBack();
//     }
//     service.getShowDetails(categoryId.categoryId.show_id).then((response) => {
//       var data = response.data;
//       console.log("quo", data);
//       setEpisodeLength(
//         response.data.videos
//           ? response.data.videos
//           : response.data.videos.length
//       );
//       // if (data.length > 0) {
//       var videoDetail = "";
//       dispatch({ type: "SHOW_ID", payload: response.data.show_id });
//       setShowDetails(response.data);
//       setCategories(response.data.categories);
//       // setEpisodeList(response.data.videos);
//       setEpisodeList(
//         response.data.videos
//           ? response.data.videos
//           : response.data.videos[0].videos
//       );
//       setAllSeasonList(response.data.videos);
//       // debugger
//       setCurrentSeason(
//         response.data.videos
//           ? response.data.videos[0].videos
//           : []
//       );
//       let defaultOpt = [];
//       defaultOpt.push(response.data.videos[0]);
//       setDefaultOptions(defaultOpt);
//       let option = [];
//       response.data.videos &&
//         response.data.videos.map((item, index) => {
//           let data = {};
//           data.value = item.season;
//           data.label =
//             item.season == null ? `Season 0` : `Season ${item.season}`;
//           data.className = "myOptionClassName";
//           option.push(data);
//         });
//       console.log("option", option);
//       setOptionsS(option);
//       setNumberOfSeason(response.data.videos.length);
//       videoDetail = response.data;
//       service.playerToken().then((tokenResponse) => {
//         let newURL = "";
//         if (videoDetail.teaser) {
//           let arr = videoDetail.teaser.split("/").reverse();
//           newURL =
//             "https://poppo.tv/playlist/playlist.m3u8?id=" +
//             arr[1] +
//             "&token=" +
//             tokenResponse.data.data +
//             "&type=trailer";
            
//         } else {
//           newURL = "";
//         }
//         setVideoPlayer(
//           <ReactHlsPlayer
//             id="singleVideo"
//             url={newURL}
//             // url="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
//             autoplay={true}
//             controls={true}
//             width={"100%"}
//             height={"100%"}
//             style={border}
//             poster={videothumbnail}
//           />
//         );
//       });
//       details = videoDetail;
//       service.similarShow(videoDetail.show_id).then((response) => {
//         if (response.success == true && response.data.length > 0) {
//           setSimilarShows(response.data);
//         }
//       });
//       // }
//     });
//     setUpdate(false);
//     window.addEventListener("scroll", handleScroll);
//   }, [update]);

//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   const functionOnclick = (show) => {
//     history.push({
//       pathname: "/home/movies",
//       search: encodeURI(`show_id=${show.show_id}`),
//     });
//     setUpdate(true);
//   };
//   const hoverFunction = (flag, index) => {
//     setHover(flag);
//     setFocusedId(index);
//   };
//   const addtoMylistFunction = (show) => {
//     ;
//     let isLoggedIn = localStorage.getItem("isLoggedIn");
//     let userId = service.getCookie("userId");
//     if (isLoggedIn === "true" && userId) {
//       service.addToMyPlayList(show.show_id, 1).then((response) => {
//         if (response.success === true) {
//           service
//             .getShowDetails(categoryId.categoryId.show_id)
//             .then((response) => {
//               var data = response.data;
//               // if (data.length > 0) {
//               var videoDetail = "";
//               dispatch({
//                 type: "SHOW_ID",
//                 payload: categoryId.categoryId.show_id,
//               });
//               setShowDetails(response.data);
//               setCategories(response.data.categories);
//               setEpisodeList(response.data.videos);
//               setAllSeasonList(response.data.videos);
//               setCurrentSeason(response.data.videos[0].videos);
//               let option = [];
//               response.data.videos &&
//                 response.data.videos.map((item, index) => {
//                   let data = {};
//                   data.value = item.season;
//                   data.label =
//                     item.season == null ? `Season 0` : `Season ${item.season}`;
//                   data.className = "myOptionClassName";
//                   option.push(data);
//                 });
//               setOptionsS(option);
//               videoDetail = response.data;
//               details = videoDetail;
//               service
//                 .similarShow(categoryId.categoryId.show_id)
//                 .then((response) => {
//                   if (response.success == true && response.data.length > 0) {
//                     setSimilarShows(response.data);
//                   }
//                 });
//               // }
//             });
//         }
//       });
//     } else {
//       dispatch({ type: "SIGN_IN_BLOCK" });
//     }
//   };
//   const removeFromMylistFunction = (show) => {
//     let isLoggedIn = localStorage.getItem("isLoggedIn");
//     let userId = service.getCookie("userId");
//     if (isLoggedIn === "true" && userId) {
//       service.addToMyPlayList(show.show_id, 0).then((response) => {
//         if (response.success === true) {
//           service
//             .getShowDetails(categoryId.categoryId.show_id)
//             .then((response) => {

//               var data = response.data;
//               // if (data.length > 0) {
//               var videoDetail = "";
//               dispatch({
//                 type: "SHOW_ID",
//                 payload: categoryId.categoryId.show_id,
//               });
//               setShowDetails(response.data);
//               setCategories(response.data.categories);
//               setEpisodeList(response.data.videos);
//               setAllSeasonList(response.data.videos);
//               setCurrentSeason(response.data.videos[0].videos);
//               let option = [];
//               response.data.videos &&
//                 response.data.videos.map((item, index) => {
//                   let data = {};
//                   data.value = item.season;
//                   data.label =
//                     item.season == null ? `Season 0` : `Season ${item.season}`;
//                   data.className = "myOptionClassName";
//                   option.push(data);
//                 });
//               console.log("option", option);
//               setOptionsS(option);
//               videoDetail = response.data;
//               details = videoDetail;
//               service
//                 .similarShow(categoryId.categoryId.show_id)
//                 .then((response) => {

//                   if (response.success == true && response.data.length > 0) {
//                     setSimilarShows(response.data);
//                   }
//                 });
//               // }
//             });
//         }
//       });
//     } else {
//       dispatch({ type: "SIGN_IN_BLOCK" });
//     }
//   };

//   const redirectToLogin = () => {
//     clearUserData();
//     localStorage.setItem('detailWatchNowClicked', ShwID)
//     setTimeout(() => {
//       history.push({
//         pathname: "/signin",
//       });
//     }, 1500);
//   };

//   const WatchWithoutAdsPopUp = (onClickYes, onClickNo) => {
//     confirmAlert({
//       title: "",
//       message: "Watch without ads?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             onClickYes();
//           },
//         },
//         {
//           label: "No",
//           onClick: () => {
//             onClickNo();
//           },
//         },
//       ],
//     });
//   };

//   const onWatchBtnClick = (videoDetails, singleVideo, showId) => {
//     console.log("watch btn click");
//     ;
//     let user_id = service.getCookie("userId");
//     let countryName =
//       localStorage.getItem("currentLocation") &&
//       JSON.parse(localStorage.getItem("currentLocation")).country_name;
//     // if (
//     //   countryName != "United States" &&
//     //   countryName != "United States of America"
//     // ) {
//     if (user_id == null || user_id == service.getCookie("guestUserId")) {
//       localStorage.setItem('detailWatchNowClicked', ShwID)
//       setTimeout(() => {
//         history.push({
//           pathname: "/signin",
//         });
//       }, 1000);
//     } else {
//       if (
//         videoDetails &&
//         videoDetails.free_video != true &&
//         videoDetails.subscriptions &&
//         videoDetails.subscriptions.length > 0
//       ) {
//         // history.push({
//         //   pathname: "/SubscriptionList",
//         //   state: {
//         //     videoData: videoDetails.video_id,
//         //   },
//         // });
//         service.videoSubscription(videoDetails.video_id).then((response) => {
//           let videoSubLists = response.data;
//           let subFlag = true;
//           let uId = service.getCookie("guestUserId");
//           let user_id = service.getCookie("userId");
//           if (user_id) {
//             uId = user_id;
//           }

//           service.checkUserSubscription(uId).then((useResponse) => {
//             var userData = useResponse.data;
//             if (useResponse.success == true) {
//               if (useResponse.forcibleLogout === true) {
//                 alert(
//                   "Sorry, You’ve reached the maximum Device limit. Please log in again!"
//                 );
//                 service.logoutAll(uId).then((res) => {
//                   setTimeout(() => {
//                     redirectToLogin();
//                   }, 1000);
//                 });
//               } else if (useResponse.session_expired === true) {
//                 ToastsStore.warning("Sorry! Session Has Expired");
//                 redirectToLogin();
//               } else {
//                 videoSubLists.map(function (subscription, index) {
//                   if (useResponse.data.length == 0 && subFlag) {
//                     subFlag = false;
//                     service.setCookie("showId", showId, 10);
//                     service.setCookie("videoId", videoDetails.video_id, 10);
//                     history.push({
//                       pathname: "/SubscriptionList",
//                       state: {
//                         videoData: videoDetails.video_id,
//                       },
//                     });
//                   } else {
//                     let subscribedVideo = userData.filter(
//                       (e) =>
//                         e.sub_id == subscription.publisher_subscription_id
//                     );
//                     if (
//                       subscribedVideo.length == 0 &&
//                       index + 1 < videoSubLists.length
//                     ) {
//                       return;
//                     }
//                     if (
//                       subscribedVideo.length == 0 &&
//                       subFlag &&
//                       index + 1 == videoSubLists.length
//                     ) {
//                       subFlag = false;
//                       service.setCookie("showId", showId, 10);
//                       service.setCookie("videoId", videoDetails.video_id, 10);
//                       history.push({
//                         pathname: "/SubscriptionList",
//                         state: {
//                           videoData: videoDetails.video_id,
//                         },
//                       });
//                     } else if (subFlag) {
//                       subFlag = false;
//                       service.setCookie("showId", showId, 10);
//                       localStorage.setItem("ContinueWatching", "true");
//                       history.push({
//                         pathname: "/videoplayer",
//                         state: {
//                           show_details: videoDetails,
//                           singleVideo: singleVideo,
//                           showId: showId,
//                         },
//                       });
//                     }
//                   }
//                 });
//               }
//             }
//           });
//         });
//       } else if (
//         videoDetails &&
//         videoDetails.free_video === true &&
//         videoDetails.subscriptions &&
//         videoDetails.subscriptions.length > 0
//       ) {
//         let uId = service.getCookie("guestUserId");
//         let user_id = service.getCookie("userId");
//         if (user_id) {
//           uId = user_id;
//         }

//         const onClickNo = () => {
//           localStorage.setItem("ContinueWatching", "true");
//           history.push({
//             pathname: "/videoplayer",
//             state: {
//               show_details: videoDetails,
//               singleVideo: singleVideo,
//               showId: showId,
//             },
//           });
//         };

//         const onClickYes = () => {
//           service.setCookie("showId", showId, 10);
//           service.setCookie("videoId", videoDetails.video_id, 10);
//           history.push({
//             pathname: "/SubscriptionList",
//             state: {
//               videoData: videoDetails.video_id,
//             },
//           });
//         };

//         service.videoSubscription(videoDetails.video_id).then((response) => {
//           let videoSubDetails = response.data;
//           let subFlag = true;
//           service.checkUserSubscription(uId).then((useResponse) => {
//             if (useResponse.success == true) {
//               var userSubDetails = useResponse.data;
//               if (useResponse.forcibleLogout === true) {
//                 alert(
//                   "Sorry, You’ve reached the maximum Device limit. Please log in again!"
//                 );
//                 service.logoutAll(uId).then((res) => {
//                   setTimeout(() => {
//                     redirectToLogin();
//                   }, 1000);
//                 });
//               } else if (useResponse.session_expired === true) {
//                 ToastsStore.warning("Sorry! Session Has Expired");
//                 redirectToLogin();
//               } else {
//                 videoSubDetails.map(function (subscription, index) {
//                   if (useResponse.data.length == 0 && subFlag) {
//                     subFlag = false;
//                     WatchWithoutAdsPopUp(onClickYes, onClickNo);
//                   } else {
//                     let subscribedVideo = userSubDetails.filter(
//                       (e) =>
//                         e.sub_id == subscription.publisher_subscription_id
//                     );
//                     if (
//                       subscribedVideo.length == 0 &&
//                       index + 1 < videoSubDetails.length
//                     ) {
//                       return;
//                     }
//                     if (
//                       subscribedVideo.length == 0 &&
//                       subFlag &&
//                       index + 1 == videoSubDetails.length
//                     ) {
//                       subFlag = false;
//                       WatchWithoutAdsPopUp(onClickYes, onClickNo);
//                     } else if (subFlag) {
//                       subFlag = false;
//                       localStorage.setItem("ContinueWatching", "true");
//                       history.push({
//                         pathname: "/videoplayer",
//                         state: {
//                           show_details: videoDetails,
//                           singleVideo: singleVideo,
//                           showId: showId,
//                         },
//                       });
//                     }
//                   }
//                 });
//               }
//             }
//           });
//         });
//       } else if (
//         videoDetails &&
//         videoDetails.free_video === true &&
//         videoDetails.subscriptions &&
//         videoDetails.subscriptions.length === 0
//       ) {
//         localStorage.setItem("ContinueWatching", "true");
//         history.push({
//           pathname: "/videoplayer",
//           state: {
//             show_details: videoDetails,
//             singleVideo: singleVideo,
//             showId: showId,
//           },
//         });
//       } else {
//         ToastsStore.error("Oops! Something went wrong.");
//       }
//     }
//     // } else {
//     //   history.push({
//     //     pathname: "/unavailable",
//     //   });
//     // }
//   };
//   const onNewsClick = (videoDetails) => {
//     ToastsStore.warning("Oops!!! There is no video for this news...");
//   };
//   const onWatchClick = (videoDetails) => {
//     // ;
//     console.log("showDetailsq", videoDetails);
//     let user_id = service.getCookie("userId");
//     if (user_id == null || user_id == service.getCookie("guestUserId")) {
//       localStorage.setItem('detailWatchNowClicked', ShwID)
//       setTimeout(() => {
//         history.push({
//           pathname: "/signin",
//         });
//       }, 1000);
//     } else {
//       if (
//         videoDetails &&
//         videoDetails.videos &&
//         videoDetails.videos[0] &&
//         videoDetails.videos[0].free_video != true
//       ) {
//         let movie = videoDetails.videos[0];
//         service.videoSubscription(movie.video_id).then((response) => {
//           let videoDetails = response.data;
//           let subFlag = true;
//           let uId = service.getCookie("guestUserId");
//           let user_id = service.getCookie("userId");
//           if (user_id) {
//             uId = user_id;
//           }
//           service.userSubscription(uId).then((useResponse) => {
//             var userData = useResponse.data;

//             if (useResponse.success == true) {
//               if (useResponse.forcibleLogout === true) {
//                 alert(
//                   "Sorry, You’ve reached the maximum Device limit. Please log in again!"
//                 );
//                 service.logoutAll(uId).then((res) => {
//                   setTimeout(() => {
//                     redirectToLogin();
//                   }, 1000);
//                 });
//               } else if (useResponse.session_expired === true) {
//                 ToastsStore.warning("Sorry! Session Has Expired");
//                 redirectToLogin();
//               } else {
//                 console.log(`the video details are :`, videoDetails);
//                 videoDetails.map(function (subscription, index) {
//                   if (useResponse.data.length == 0 && subFlag) {
//                     subFlag = false;
//                     service.setCookie("showId", ShwID, 10);
//                     service.setCookie("videoId", movie.video_id, 10);
//                     history.push({
//                       pathname: "/SubscriptionList",
//                       state: {
//                         videoData: movie.video_id,
//                       },
//                     });
//                   } else {
//                     let subscribedVideo = userData.filter(
//                       (videoDetails) =>
//                         videoDetails.sub_id ==
//                         subscription.publisher_subscription_id
//                     );
//                     if (
//                       subscribedVideo.length == 0 &&
//                       index + 1 < videoDetails.length
//                     ) {
//                       return;
//                     }
//                     if (
//                       subscribedVideo.length == 0 &&
//                       subFlag &&
//                       index + 1 == videoDetails.length
//                     ) {
//                       subFlag = false;
//                       service.setCookie("showId", ShwID, 10);
//                       service.setCookie("videoId", movie.video_id, 10);
//                       history.push({
//                         pathname: "/SubscriptionList",
//                         state: {
//                           videoData: movie.video_id,
//                         },
//                       });
//                     } else if (subFlag) {
//                       subFlag = false;
//                       service.setCookie("showId", ShwID, 10);
//                       localStorage.setItem("ContinueWatching", "true");
//                       history.push({
//                         pathname: "/videoplayer",
//                         state: {
//                           show_details: videoDetails,
//                           showId: videoDetails.show_id,
//                         },
//                         // state: { movie: movie, show_id: showDetails.show_id },
//                       });
//                     }
//                   }
//                 });
//               }
//             }
//           });
//         });
//       } else if (videoDetails && videoDetails.videos[0] === null) {
//         ToastsStore.warning("Oops!!! There is no video for this news...");
//       } else if (
//         // {
//         // if (
//         //   showDetails &&
//         //   showDetails.videos &&
//         //   showDetails.videos[0]
//         // ) {
//         //   let movie = showDetails.videos[0];
//         //   service.setCookie("showId", showDetails.show_id, 10);
//         //   localStorage.setItem("ContinueWatching", "true");
//         //   history.push({
//         //     pathname: "/videoDetails",
//         //     state: { movie: movie, show_id: showDetails.show_id },
//         //   });
//         // } else if
//         videoDetails &&
//         // showDetails.videos &&
//         // showDetails.videos[0] &&
//         videoDetails.videos[0].free_video == true &&
//         videoDetails.videos[0].subscriptions &&
//         videoDetails.videos[0].subscriptions.length > 0
//       ) {
//         let uId = service.getCookie("guestUserId");
//         let user_id = service.getCookie("userId");
//         if (user_id) {
//           uId = user_id;
//         }
//         let movie = videoDetails.videos[0];
//         const onClickNo = () => {
//           service.setCookie("showId", ShwID, 10);
//           localStorage.setItem("ContinueWatching", "true");
//           history.push({
//             pathname: "/videoplayer",
//             state: {
//               show_details: videoDetails,
//               showId: videoDetails.show_id,
//             },
//             // state: { movie: movie, show_id: showDetails.show_id },
//           });
//         };

//         const onClickYes = () => {
//           service.setCookie("showId", ShwID, 10);
//           service.setCookie("videoId", movie.video_id, 10);
//           history.push({
//             pathname: "/SubscriptionList",
//             state: {
//               videoData: movie.video_id,
//             },
//           });
//         };

//         service.videoSubscription(movie.video_id).then((response) => {
//           let videoSubDetails = response.data;
//           let subFlag = true;
//           service.userSubscription(uId).then((useResponse) => {
//             if (useResponse.success == true) {
//               var userSubDetails = useResponse.data;
//               if (useResponse.forcibleLogout === true) {
//                 alert(
//                   "Sorry, You’ve reached the maximum Device limit. Please log in again!"
//                 );
//                 service.logoutAll(uId).then((res) => {
//                   setTimeout(() => {
//                     redirectToLogin();
//                   }, 1000);
//                 });
//               } else if (useResponse.session_expired === true) {
//                 ToastsStore.warning("Sorry! Session Has Expired");
//                 redirectToLogin();
//               } else {
//                 videoSubDetails.map(function (subscription, index) {
//                   if (useResponse.data.length == 0 && subFlag) {
//                     subFlag = false;
//                     WatchWithoutAdsPopUp(onClickYes, onClickNo);
//                   } else {
//                     let subscribedVideo = userSubDetails.filter(
//                       (e) => e.sub_id == subscription.publisher_subscription_id
//                     );
//                     if (
//                       subscribedVideo.length == 0 &&
//                       index + 1 < videoSubDetails.length
//                     ) {
//                       return;
//                     }
//                     if (
//                       subscribedVideo.length == 0 &&
//                       subFlag &&
//                       index + 1 == videoSubDetails.length
//                     ) {
//                       subFlag = false;
//                       WatchWithoutAdsPopUp(onClickYes, onClickNo);
//                     } else if (subFlag) {
//                       subFlag = false;
//                       service.setCookie("showId", ShwID, 10);
//                       localStorage.setItem("ContinueWatching", "true");
//                       history.push({
//                         pathname: "/videoplayer",
//                         state: {
//                           show_details: videoDetails,
//                           showId: videoDetails.show_id,
//                         },
//                         // state: { movie: movie, show_id: showDetails.show_id },
//                       });
//                     }
//                   }
//                 });
//                 // }
//               }
//             }
//           });
//         });
//       } else if (
//         videoDetails &&
//         // showDetails.videos &&
//         // showDetails.videos[0] &&
//         videoDetails.videos[0].free_video == true &&
//         videoDetails.videos[0].subscriptions &&
//         videoDetails.videos[0].subscriptions.length == 0
//       ) {
//         let movie = videoDetails.videos[0];
//         service.setCookie("showId", ShwID, 10);
//         localStorage.setItem("ContinueWatching", "true");
//         history.push({
//           pathname: "/videoplayer",
//           state: {
//             show_details: videoDetails,
//             showId: videoDetails.show_id,
//           },
//           // state: { movie: movie, show_id: showDetails.show_id },
//         });
//         // }
//       }
//     }
//   };
//   return (
//     <div className="menuCloseJS closeMenuWrapper">
//       <div className="videoPage">
//         <ToastsContainer store={ToastsStore} />
//         <div className="videoPageContainer">
//           {showDetails.single_video == 0 ? (
//             <div
//               className="videoPageBGimg"
//               style={{
//                 backgroundImage: `url(${showDetails.type === "linear_event"
//                     ? showDetails.logo
//                     : showDetails.type === "news"
//                       ? showDetails.logo_thumb
//                       : showsImageUrl + showDetails.logo_thumb
//                   })`,
//               }}
//             ></div>
//           ) : showDetails.single_video == 1 ? (
//             <div
//               className="videoPageBGimg"
//               style={{
//                 backgroundImage: `url(${showDetails.type === "linear_event"
//                     ? showDetails.logo
//                     : showDetails.type === "news"
//                       ? showDetails.logo_thumb
//                       : showsImageUrl + showDetails.logo_thumb
//                   })`,
//               }}
//             ></div>
//           ) : null}
//           <div
//             className="videoPageBGimg"
//             style={{
//               backgroundImage:
//                 "linear-gradient(to top, rgb(0 0 0), rgb(60 59 59 / 40%) 83%, rgb(0 0 0 / 63%))",
//             }}
//           ></div>
//           {showDetails.teaser && (
//             <div>
//               {isDesktop === true ? (
//                 <div className="_2xXnB forLargeDevice">
//                   <div className="_2KWdL">
//                     <section className="_1dQ5J">
//                       <div className="_3tqpT">{videoPlayer}</div>
//                     </section>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="forSmallDevice">
//                   <div className="_2KWdL">
//                     <section className="_1dQ5J">
//                       <div className="_3tqpT">{videoPlayer}</div>
//                     </section>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           <div
//             className={
//               showDetails.teaser
//                 ? "videoPageContentWrapper videoPageContentPadding"
//                 : " videoPageContentWrapper videoPageContentPadding paddingtop"
//             }
//           >
//             <div className="vpContent">
//               <div className="container vpContainer vpDesktopContainer">
//                 <div
//                   className={
//                     showDetails.teaser
//                       ? "row vp3Section movieInfo"
//                       : "row vp3Section"
//                   }
//                 >
//                   {showDetails.show_name && (
//                     <div className="vpMiddleHeading">
//                       <h1 className="vpMiddleh1">{showDetails.show_name}</h1>
//                     </div>
//                   )}
//                   <div
//                     className={showDetails.teaser ? "col col-9" : "col col-4"}
//                   >
//                     <div className="vpLeftSection">

//                       {showDetails.single_video === 0 ? (
//                         <div
//                           className="vpPoster"
//                           style={{
//                             backgroundImage: `url(${showDetails.type === "linear_event"
//                                 ? showDetails.logo
//                                 : showDetails.type === "news"
//                                   ? showDetails.logo_thumb
//                                   : showsImageUrl + showDetails.logo_thumb
//                               })`,
//                             marginLeft: "7px",
//                             // height: "385px",
//                           }}
//                         ></div>
//                       ) : showDetails.single_video === 1 ? (
//                         <div
//                           className="vpPoster"
//                           style={{
//                             backgroundImage:
//                               // `url(${
//                               // showDetails.logo
//                               `url(${showDetails.type === "linear_event"
//                                 ? showDetails.logo
//                                 : showDetails.type === "news"
//                                   ? showDetails.logo_thumb
//                                   : videoImageUrl + showDetails.logo_thumb
//                               })`,

//                             marginLeft: "7px",
//                             // height: "365px",
//                           }}
//                         ></div>
//                       ) : null}
//                       <div
//                         className="vpLeftButtonWrapper vpLeftButtonMargin"
//                         style={{ marginTop: "7px" }}
//                       >
//                         <div className="vpLeftButtons">
//                           {showDetails.type === "news" ||
//                             showDetails.video == [] ? (
//                             <div> </div>
//                           ) : (
//                             <button
//                               className="button buttonLarge buttonBlock vpWatchSeason innerPageBtnMargin"
//                               style={{ height: "41px" }}
//                               onClick={() => {
//                                 if (
//                                   showDetails.type === "news" ||
//                                   showDetails.video == []
//                                 ) {
//                                   onNewsClick();
//                                 } else if (showDetails.single_video === 1) {
//                                   onWatchClick(showDetails);
//                                 } else {
//                                   onWatchBtnClick(
//                                     defaultOptions[0].videos[0],
//                                     showDetails.single_video,
//                                     showDetails.show_id
//                                   );
//                                 }
//                               }}
//                             >
//                               <div className="buttonBg rounderbutton"></div>
//                               <div className="buttonContent">
//                                 {showDetails.single_video === 0 &&
//                                   defaultOptions &&
//                                   defaultOptions.length > 0 ? (
//                                   <div className="vpWatchSeasonText">
//                                     {defaultOptions[0].season == null
//                                       ? `Watch S00:E0${defaultOptions[0].videos[0].video_order}`
//                                       : `Watch S0${defaultOptions[0].season}:E0${defaultOptions[0].videos[0].video_order}`}
//                                   </div>
//                                 ) : showDetails.type === "news" ||
//                                   showDetails.video == [] ? (
//                                   <div
//                                     className="vpWatchSeasonText"
//                                     style={{ display: "none" }}
//                                   >
//                                     {" "}
//                                     News
//                                   </div>
//                                 ) : showDetails.single_video === 1 ? (
//                                   <div className="vpWatchSeasonText">
//                                     Watch Now
//                                   </div>
//                                 ) : null}
//                               </div>
//                             </button>
//                           )}

//                           {showDetails.watchlist_flag === 1 ? (
//                             <button
//                               className="button buttonSecondary buttonBlock vpAddButton innerPageBtnMargin"
//                               onClick={() => {
//                                 removeFromMylistFunction(showDetails);
//                               }}
//                             >
//                               <div className="buttonBg"></div>
//                               <div className="buttonContent">
//                                 Remove from My List
//                               </div>
//                             </button>
//                           ) : showDetails.watchlist_flag === null ||
//                             showDetails.watchlist_flag === 0 ? (
//                             <button
//                               className="button buttonSecondary buttonBlock vpAddButton innerPageBtnMargin"
//                               onClick={() => {
//                                 addtoMylistFunction(showDetails);
//                               }}
//                             >
//                               <div className="buttonBg"></div>
//                               <div className="buttonContent">
//                                 Add to My List
//                               </div>
//                             </button>
//                           ) : null}
//                           <div className="vpTwoButton">
//                             <button
//                               className="button buttonTransparent vpShareButton"
//                               onMouseEnter={() => {
//                                 setShare(true);
//                               }}
//                               onMouseLeave={() => {
//                                 setShare(false);
//                               }}
//                               onClick={() => {
//                                 !share ? setShare(!share) : setShare(share);
//                               }}
//                             >
//                               <div className="buttonBg"></div>
//                               <div className="buttonContent">
//                                 <span>Share</span>
//                               </div>
//                             </button>

//                             <button
//                               className="button buttonTransparent vpReportButton"
//                               onClick={() => {
//                                 !other ? setOther(!other) : setOther(other);
//                               }}
//                               onMouseEnter={() => {
//                                 setOther(true);
//                               }}
//                               onMouseLeave={() => {
//                                 setOther(false);
//                               }}
//                             >
//                               <div className="buttonBg"></div>
//                               <div className="buttonContent">
//                                 <div className="vpReport"></div>
//                               </div>
//                             </button>
//                             {share === true ? (
//                               <div
//                                 onMouseEnter={() => {
//                                   setShare(true);
//                                 }}
//                                 onMouseLeave={() => {
//                                   setShare(false);
//                                 }}
//                               >
//                                 <div
//                                   className="_1TcfH _1Dgjh dropAdj"
//                                   style={{ left: "7px" }}
//                                 >
//                                   {console.log(`show details are:`, showDetails)}
//                                   <FacebookShareButton
//                                     url={
//                                       "watch.runwaytv.com/home/movies?show_id=" +
//                                       showDetails.show_id
//                                     }


//                                     quote={
//                                       showDetails.show_name +
//                                       " || " +
//                                       (showDetails.videos
//                                         ? showDetails.videos[0].video_title
//                                         : "") +
//                                       " || " +
//                                       showDetails.synopsis
//                                     }
//                                     className="share"
//                                     style={{
//                                       display: "flex",
//                                       flexDirection: "column",
//                                     }}
//                                   >
//                                     <span className="ATag _1H0lX _135ID _3Dyhl">
//                                       <svg
//                                         className="svgIcon facebookIcon"
//                                         preserveAspectRatio="xMidYMid meet"
//                                         viewBox="0 0 20 20"
//                                         style={{ fill: "currentcolor" }}
//                                       >
//                                         <path
//                                           fill="currentColor"
//                                           fillRule="evenodd"
//                                           d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z"
//                                         ></path>
//                                       </svg>
//                                       <span className="_3SXQW">Facebook</span>
//                                     </span>
//                                   </FacebookShareButton>

//                                   <TwitterShareButton
//                                     url={
//                                       "watch.runwaytv.com/home/movies?show_id=" +
//                                       showDetails.show_id
//                                     }
//                                     title={
//                                       showDetails.videos
//                                         ? showDetails.videos[0].video_title
//                                         : ""
//                                     }
//                                     description={showDetails.synopsis}
//                                     style={{
//                                       display: "flex",
//                                       flexDirection: "column",
//                                     }}
//                                   >
//                                     <span className="ATag _1H0lX _135ID _3Dyhl">
//                                       <svg
//                                         className="svgIcon"
//                                         preserveAspectRatio="xMidYMid meet"
//                                         viewBox="0 0 20 17"
//                                         style={{ fill: "currentcolor" }}
//                                       >
//                                         <path
//                                           d="M6 17c7.837 0 11.965-6.156 12-11-.035-.67-.035-.844 0-1 .756-.59 1.45-1.297 2-2-.75.218-1.543.433-2 1 .5-.978 1.14-1.77 1-3-.358.763-1.24 1.095-2 1C15.29.647 12.69.568 11 2c-1.03 1.084-1.48 2.555-1 4-3.45-.204-6.524-1.74-9-4C.303 3.584.86 5.945 3 7c-.99.11-1.63-.062-2 0-.2 1.6 1.178 3.255 3 4-.512-.202-1.146-.178-2 0 .777 1.35 2.318 2.478 4 3-1.38.635-3.175 1.246-5 1-.35.244-.675.223-1 0 1.877 1.37 4.06 2 6 2"
//                                           fill="currentColor"
//                                           fillRule="evenodd"
//                                         ></path>
//                                       </svg>
//                                       <span className="_3SXQW">Twitter</span>
//                                     </span>
//                                   </TwitterShareButton>
//                                 </div>
//                               </div>
//                             ) : null}
//                             {other === true ? (
//                               <div
//                                 onMouseEnter={() => {
//                                   setOther(true);
//                                 }}
//                                 onMouseLeave={() => {
//                                   setOther(false);
//                                 }}
//                               >
//                                 <div className="_9gMn_ R8UiN dropAdj reportAdj">
//                                   <div
//                                     onClick={() => {
//                                       history.push({
//                                         pathname: "/contactsupport",
//                                       });
//                                     }}
//                                     className="ATag _3kieO"
//                                     rel="nofollow"
//                                     style={{ cursor: "pointer" }}
//                                   >
//                                     Report a problem
//                                   </div>
//                                 </div>
//                               </div>
//                             ) : null}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     className={
//                       showDetails.teaser
//                         ? "col col-4-5 movieTagsMob"
//                         : "col col-5 movieTagsMob"
//                     }
//                   >
//                     <div className="vpMiddleInfoSection vpInfoPadding">
//                       <div className="vpLengthCensor">
//                         <div className="vpLengthYear">
//                           {showDetails && (
//                             <div className="movieLength">
//                               {showDetails.year && `(${showDetails.year})`}
//                               {showDetails.year &&
//                                 showDetails.videos &&
//                                 showDetails.videos[0] &&
//                                 showDetails.videos[0].duration_text &&
//                                 " . "}
//                               {showDetails.videos &&
//                                 showDetails.videos[0] &&
//                                 showDetails.videos[0].duration_text &&
//                                 showDetails.videos[0].duration_text}
//                             </div>
//                           )}
//                         </div>
//                         <div className="vpCCwrapper">
//                           {/* <svg className="svgIcon vpCCicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 18" style={{ fill: 'currentcolor' }}>
//                                                         <g fill="currentColor" fillRule="evenodd">
//                                                             <path fillRule="nonzero" d="M2 9c0 3.867 3.13 7 6.994 7h10.012C22.868 16 26 12.866 26 9c0-3.867-3.13-7-6.994-7H8.994C5.132 2 2 5.134 2 9zM0 9c0-4.97 4.027-9 8.994-9h10.012C23.973 0 28 4.028 28 9c0 4.97-4.027 9-8.994 9H8.994C4.027 18 0 13.972 0 9z"></path>
//                                                             <path d="M11.844 10.195c-.088.836-.517 1.375-1.32 1.375-1.21 0-1.606-1.22-1.606-2.475 0-1.287.374-2.464 1.606-2.464.803 0 1.232.53 1.342 1.354h1.815c-.252-1.716-1.363-2.98-3.156-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.057 4.07 3.433 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88zm7.38 0c-.087.836-.516 1.375-1.32 1.375-1.21 0-1.605-1.22-1.605-2.475 0-1.287.373-2.464 1.605-2.464.803 0 1.232.53 1.342 1.354h1.815c-.253-1.716-1.364-2.98-3.157-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.056 4.07 3.432 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88z"></path>
//                                                         </g>
//                                                     </svg> //cc*/}
//                           {showDetails.rating && (
//                             <div className="movieCensorBox">
//                               {showDetails.rating}
//                             </div>
//                           )}
//                           <br />
//                         </div>
//                       </div>
//                       <div className="vpMovieCategory">
//                         <div className="vpCategoryFlex vpCategoryMargin">
//                           {categories &&
//                             categories.map((item, index) => {
//                               return (
//                                 <div
//                                   key={index}
//                                   className="movieCensorBox vpMovieType vpMovieTypeMargin linkhover"
//                                   onClick={() => {
//                                     history.push({
//                                       pathname: "/home/categorylist",
//                                       search: encodeURI(
//                                         `category_id=${item.category_id}&category_name=${item.category_name}`
//                                       ),
//                                     });
//                                   }}
//                                 >
//                                   {item.category_name}
//                                 </div>
//                               );
//                             })}
//                         </div>
//                       </div>
//                     </div>
//                     {console.log("showdetails season", showDetails)}
//                     {isDesktop === true ? (
//                       showDetails.single_video === 0 ? (
//                         <div className="vpMiddleDesc">
//                           Seasons : {numberOfSeason}
//                           <br />
//                           {showDetails.synopsis && showDetails.synopsis}
//                         </div>
//                       ) : (
//                         <div className="vpMiddleDesc">
//                           {showDetails.synopsis && showDetails.synopsis}
//                         </div>
//                       )
//                     ) : null}
//                   </div>
//                 </div>
//                 {isDesktop === false ? (
//                   showDetails.single_video === 0 ? (
//                     <div className="">
//                       Seasons : {numberOfSeason}
//                       <br />
//                       {showDetails.synopsis && showDetails.synopsis}
//                     </div>
//                   ) : (
//                     <div className="">
//                       {showDetails.synopsis && showDetails.synopsis}
//                     </div>
//                   )
//                 ) : null}
//                 {showDetails && showDetails.single_video === 0 ? (
//                   <div className="row vp3Section youMayLike">
//                     <div className="col">
//                       <div>
//                         {optionsS && optionsS.length === 1 && (
//                           <div
//                             className="heading"
//                             style={{
//                               fontWeight: "800",
//                               paddingBottom: "7px",
//                               fontSize: "15pt",
//                             }}
//                           >
//                             Season 1
//                           </div>
//                         )}
//                         {optionsS && optionsS.length > 1 && (
//                           <div style={{ width: "200px", marginBottom: "20px" }}>
//                             <Dropdown
//                               options={optionsS}
//                               onChange={(item) => {
//                                 console.log("dd", item.value, item.label);
//                                 let newSeason = allSeasonList.filter(function (
//                                   e
//                                 ) {
//                                   return e.season === item.value;
//                                 });
//                                 console.log("newSeason", newSeason);
//                                 if (newSeason && newSeason.length > 0) {
//                                   setCurrentSeason(newSeason[0].videos);
//                                 }
//                               }}
//                               value={optionsS[0]}
//                               controlClassName="myControlClassName"
//                             />
//                           </div>
//                         )}
//                         <div className="carousel carouselNoMask">
//                           <div className="carouselContent categoryShowWrapperDetails">
//                             <Carousel
//                               className="row carouselRow"
//                               responsive={responsive}
//                             >
//                               {currentSeason &&
//                                 currentSeason.map((show, index) => {
//                                   return (
//                                     <div className="col col-3" key={index}>
//                                       <div className="movieTile">
//                                         <div
//                                           // className="movieTileImage"
//                                           className={
//                                             hover === true &&
//                                               focusedId === index
//                                               ? "movieTileImage movieTileImageOpen"
//                                               : "movieTileImage"
//                                           }
//                                           id={index}
//                                           onMouseOver={() => {
//                                             hoverFunction(true, index);
//                                           }}
//                                           onMouseLeave={() => {
//                                             hoverFunction(false, index);
//                                           }}
//                                         >
//                                           <div
//                                             onClick={() => {
//                                               onWatchBtnClick(
//                                                 show,
//                                                 showDetails.single_video,
//                                                 showDetails.show_id
//                                               );
//                                             }}
//                                             className={
//                                               hover === true &&
//                                                 focusedId === index
//                                                 ? "movieTileIcon "
//                                                 : "movieTileIcon  movieTileHoverOpened"
//                                             }
//                                           >
//                                             {hover === true &&
//                                               focusedId === index ? (
//                                               <svg
//                                                 className="svgIcon movieTilePlayIcon"
//                                                 preserveAspectRatio="xMidYMid meet"
//                                                 viewBox="0 0 62 62"
//                                                 style={{ fill: "currentcolor" }}
//                                               >
//                                                 <circle
//                                                   r="30"
//                                                   stroke="currentColor"
//                                                   fill="none"
//                                                   strokeWidth="2"
//                                                   cx="31"
//                                                   cy="31"
//                                                 ></circle>
//                                                 <path
//                                                   fill="currentColor"
//                                                   d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"
//                                                 ></path>
//                                               </svg>
//                                             ) : null}
//                                           </div>
//                                           {show.thumbnail_350_200 && (
//                                             <div
//                                               className="moviePoster"
//                                               style={{
//                                                 backgroundImage: `url(${videoImageUrl +
//                                                   show.thumbnail_350_200
//                                                   })`,
//                                               }}
//                                             >
//                                               <div className="FeNml"></div>
//                                             </div>
//                                           )}

//                                           <div
//                                             className={
//                                               hover === true &&
//                                                 focusedId === index
//                                                 ? "wishlistPosition wishlistTranslate wishlistParentOpen"
//                                                 : "wishlistPosition wishlistTranslate wishlistParentClose"
//                                             }
//                                           >
//                                             <div className="wishlistButton">
//                                               <div
//                                                 className={
//                                                   hover === true &&
//                                                     focusedId === index
//                                                     ? "wlgradientPosition wlgradientTranslate wlgradientOpen"
//                                                     : "wlgradientPosition wlgradientTranslate wlgradientClose"
//                                                 }
//                                                 style={{
//                                                   backgroundImage:
//                                                     "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))",
//                                                   backgroundPosition:
//                                                     "center bottom",
//                                                   backgroundSize: "cover",
//                                                   width: "260px",
//                                                 }}
//                                               ></div>
//                                               {showDetails.watchlist_flag ===
//                                                 1 ? (
//                                                 <div className="wishlistTextWrapper">
//                                                   <div
//                                                     className="wishlistText"
//                                                     onClick={() => {
//                                                       removeFromMylistFunction(
//                                                         showDetails
//                                                       );
//                                                     }}
//                                                   >
//                                                     Remove from My List{" "}
//                                                   </div>
//                                                 </div>
//                                               ) : showDetails.watchlist_flag ===
//                                                 null ||
//                                                 showDetails.watchlist_flag ===
//                                                 0 ? (
//                                                 <div className="wishlistTextWrapper">
//                                                   <div
//                                                     className="wishlistText"
//                                                     onClick={() => {
//                                                       addtoMylistFunction(
//                                                         showDetails
//                                                       );
//                                                     }}
//                                                   >
//                                                     Add to My List
//                                                   </div>
//                                                 </div>
//                                               ) : null}
//                                             </div>
//                                           </div>
//                                           {show.free_video == false ? (
//                                             <div className="freeTagWrapper">
//                                               <img src={freeTag} />
//                                             </div>
//                                           ) : null}
//                                         </div>
//                                         <section className="movieTextWrapper movieTextWrapperPadding">
//                                           <div className="movieTextFlex">
//                                             <h3>
//                                               <a
//                                                 className="linkButton movieTextHeading"
//                                                 onClick={() => {
//                                                   onWatchBtnClick(
//                                                     show,
//                                                     showDetails.single_video,
//                                                     showDetails.show_id
//                                                   );
//                                                 }}
//                                               >
//                                                 {show.video_title}
//                                               </a>
//                                             </h3>
//                                             <div className="movieCatYear">
//                                               <div>
//                                                 <div className="_1MmGl">
//                                                   {showDetails.year
//                                                     ? `(${showDetails.year})`
//                                                     : null}
//                                                   {showDetails.year &&
//                                                     show.duration_text
//                                                     ? " . "
//                                                     : null}
//                                                   {show.duration_text
//                                                     ? show.duration_text
//                                                     : null}
//                                                 </div>
//                                                 <div className="movieCategory mcMargin">
//                                                   {showDetails.categories &&
//                                                     showDetails.categories.map(
//                                                       (item, index) => {
//                                                         if (
//                                                           index ===
//                                                           showDetails.categories
//                                                             .length -
//                                                           1
//                                                         ) {
//                                                           return item.category_name;
//                                                         } else {
//                                                           return (
//                                                             item.category_name +
//                                                             ","
//                                                           );
//                                                         }
//                                                       }
//                                                     )}
//                                                 </div>
//                                               </div>
//                                               <div>
//                                                 {showDetails.rating && (
//                                                   <div className="movieCensorBox moviecensorText">
//                                                     {showDetails.rating}
//                                                   </div>
//                                                 )}
//                                               </div>
//                                             </div>
//                                             {/* {show.video_description && (
//                                               <div className="_2GgQ0 epi_desc">
//                                                 <div className="_2GgQ0 epi_desc">
//                                                   {show.video_description.substring(
//                                                     0,
//                                                     80
//                                                   ) + "..."}
//                                                 </div>
//                                               </div>
//                                             )} */}
//                                           </div>
//                                         </section>
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                             </Carousel>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : null}
//                 {showDetails.key_art_work &&
//                   showDetails.key_art_work.length > 0 ? (
//                   <KeyArtWork keyartWork={showDetails.key_art_work} />
//                 ) : null}
//                 <div
//                   className="row vp3Section youMayLike"
//                   style={{ marginTop: "35px", paddingTop: "0" }}
//                 >
//                   <div className="col">
//                     <div>
//                       {similarShows.length > 0 && (
//                         <div
//                           className="heading"
//                           style={{
//                             fontWeight: "800",
//                             paddingBottom: "7px",
//                             fontSize: "15pt",
//                           }}
//                         >
//                           You May Also Like
//                         </div>
//                       )}
//                       <div className="carousel carouselNoMask">
//                         <div className="carouselContent categoryShowWrapperDetails">
//                           <Carousel
//                             className="row carouselRow"
//                             responsive={responsive}
//                           >
//                             {similarShows &&
//                               similarShows.map((show, index) => {
//                                 return (
//                                   <div className="col col-3" key={index}>
//                                     <div className="movieTile">
//                                       <div
//                                         // className="movieTileImage"
//                                         className={
//                                           hover === true &&
//                                             focusedId === index + "key"
//                                             ? "movieTileImage movieTileImageOpen"
//                                             : "movieTileImage"
//                                         }
//                                         id={index + "key"}
//                                         onMouseOver={() => {
//                                           hoverFunction(true, index + "key");
//                                         }}
//                                         onMouseLeave={() => {
//                                           hoverFunction(false, index + "key");
//                                         }}
//                                       >
//                                         <div
//                                           onClick={() => {
//                                             functionOnclick(show);
//                                           }}
//                                           className={
//                                             hover === true &&
//                                               focusedId === index + "key"
//                                               ? "movieTileIcon "
//                                               : "movieTileIcon  movieTileHoverOpened"
//                                           }
//                                         >
//                                           {hover === true &&
//                                             focusedId === index + "key" ? (
//                                             <svg
//                                               className="svgIcon movieTilePlayIcon"
//                                               preserveAspectRatio="xMidYMid meet"
//                                               viewBox="0 0 62 62"
//                                               style={{ fill: "currentcolor" }}
//                                             // onClick={() => {
//                                             //   functionOnclick(show);
//                                             // }}
//                                             >
//                                               <circle
//                                                 r="30"
//                                                 stroke="currentColor"
//                                                 fill="none"
//                                                 strokeWidth="2"
//                                                 cx="31"
//                                                 cy="31"
//                                               ></circle>
//                                               <path
//                                                 fill="currentColor"
//                                                 d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"
//                                               ></path>
//                                             </svg>
//                                           ) : null}
//                                         </div>

//                                         <div
//                                           className="moviePoster"
//                                           style={{
//                                             backgroundImage: `url(${showsImageUrl + show.logo
//                                               })`,
//                                           }}
//                                         >
//                                           <div className="FeNml"></div>
//                                         </div>
//                                         <div
//                                           className={
//                                             hover === true &&
//                                               focusedId === index + "key"
//                                               ? "wishlistPosition wishlistTranslate wishlistParentOpen"
//                                               : "wishlistPosition wishlistTranslate wishlistParentClose"
//                                           }
//                                         >
//                                           <div className="wishlistButton">
//                                             <div
//                                               className={
//                                                 hover === true &&
//                                                   focusedId === index + "key"
//                                                   ? "wlgradientPosition wlgradientTranslate wlgradientOpen"
//                                                   : "wlgradientPosition wlgradientTranslate wlgradientClose"
//                                               }
//                                               style={{
//                                                 backgroundImage:
//                                                   "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))",
//                                                 backgroundPosition:
//                                                   "center bottom",
//                                                 backgroundSize: "cover",
//                                                 width: "260px",
//                                               }}
//                                             ></div>
//                                             {show.watchlist_flag === 1 ? (
//                                               <div className="wishlistTextWrapper">
//                                                 <div
//                                                   className="wishlistText"
//                                                   onClick={() => {
//                                                     removeFromMylistFunction(
//                                                       show
//                                                     );
//                                                   }}
//                                                 >
//                                                   Remove from My List{" "}
//                                                 </div>
//                                               </div>
//                                             ) : show.watchlist_flag === null ||
//                                               show.watchlist_flag === 0 ? (
//                                               <div className="wishlistTextWrapper">
//                                                 <div
//                                                   className="wishlistText"
//                                                   onClick={() => {
//                                                     addtoMylistFunction(show);
//                                                   }}
//                                                 >
//                                                   Add to My List
//                                                 </div>
//                                               </div>
//                                             ) : null}
//                                           </div>
//                                         </div>
//                                         {show.is_free_video == false ? (
//                                           <div className="freeTagWrapper">
//                                             <img src={freeTag} />
//                                           </div>
//                                         ) : null}
//                                       </div>
//                                       <section className="movieTextWrapper movieTextWrapperPadding">
//                                         <div className="movieTextFlex">
//                                           <h3>
//                                             <a
//                                               className="linkButton movieTextHeading"
//                                               onClick={() => {
//                                                 functionOnclick(show);
//                                               }}
//                                             >
//                                               {(show.show_name).toUpperCase()}
//                                             </a>
//                                           </h3>
//                                           <div className="movieCatYear">
//                                             <div>
//                                               {/* <div className="movieYear">
//                                                                                                 <div className="_1MmGl">{convertTime(show.duration)}</div>
//                                                                                             </div> */}
//                                               <div className="_1MmGl">
//                                                 {show.year
//                                                   ? `(${show.year})`
//                                                   : null}
//                                                 {show.year && show.duration_text
//                                                   ? " . "
//                                                   : null}
//                                                 {show.duration_text
//                                                   ? show.duration_text
//                                                   : null}
//                                               </div>
//                                               {/* {show.year ? (
//                                               <div className="_1MmGl">
//                                                 ({show.year}) ·{" "}
//                                                 {convertTime(show.duration)}
//                                               </div>
//                                             ) : (
//                                               <div className="_1MmGl">
//                                                 {convertTime(show.duration)}
//                                               </div>
//                                             )} */}
//                                               {show.category_names && (
//                                                 <div className="movieCategory mcMargin">
//                                                   {show.category_names}
//                                                 </div>
//                                               )}
//                                             </div>
//                                             <div>
//                                               {show.rating && (
//                                                 <div className="movieCensorBox moviecensorText">
//                                                   {show.rating}
//                                                 </div>
//                                               )}
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </section>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                           </Carousel>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default VideoDetails;
