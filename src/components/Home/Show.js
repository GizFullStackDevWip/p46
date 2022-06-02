import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useHistory } from "react-router-dom";
import { service } from "../../network/Home/service";
import { convertTime } from "../../Utils/utils";
import { useSelector, useDispatch } from "react-redux";
import "./show.css";
import freeTag from "../../images/free1.png";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastsContainer, ToastsStore } from "react-toasts";
import { clearUserData } from "../../Utils/utils";
import logo from '../../images/placeholder.png';

var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";

const Show = ({ param, update, categoryId, funcc }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [eventLink, setEventLink] = useState("");
  const [shows, setShows] = useState([]);
  const [hover, setHover] = useState(false);
  const [focusedId, setFocusedId] = useState(-1);

  useEffect(() => {
    if (param !== undefined) {
      setShows(param);
    }
  }, [param, update]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
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
  const hoverFunction = (flag, index) => {
    setHover(flag);
    setFocusedId(index);
  };
  const addtoMylistFunction = (show) => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      service.addToMyPlayList(show.show_id, 1).then((response) => {
        update.clickHandler();
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
        update.clickHandler();
      });
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
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

  const redirectToLogin = () => {
    clearUserData();
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1500);
  };

  const onClickPlaybutton = (showId, videoId, singleVideo) => {
    // ToastsStore.warning(`${showId},${videoId},${singleVideo}`);
    console.log("continueWatching", showId, videoId, singleVideo);
    if (showId && videoId) {
      service.getVideoDetails(videoId).then((response) => {
        console.log("response", response);
        if (response.success == true && response.data) {
          let videoDetails = response.data;
          if (videoDetails && videoDetails.free_video != true) {
            // Not a free video
            service
              .videoSubscription(videoDetails.video_id)
              .then((response) => {
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
                          service.setCookie("videoId", videoId, 10);
                          history.push({
                            pathname: "/SubscriptionList",
                            state: {
                              videoData: videoId,
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
                            service.setCookie("videoId", videoId, 10);
                            history.push({
                              pathname: "/SubscriptionList",
                              state: {
                                videoData: videoId,
                              },
                            });
                          } else if (subFlag) {
                            subFlag = false;
                            service.setCookie("showId", showId, 10);
                            localStorage.setItem("ContinueWatching", "true");
                            localStorage.setItem(
                              "NoContinueWatchPopUp",
                              "true"
                            );
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
          } else if (videoDetails && videoDetails.free_video == true) {
            //free video
            if (
              videoDetails.premium_flag == 1 ||
              videoDetails.rental_flag == 1 ||
              videoDetails.payper_flag == 1
            ) {
              //free video with subscription
              let uId = service.getCookie("guestUserId");
              let user_id = service.getCookie("userId");
              if (user_id) {
                uId = user_id;
              }
              const onClickNo = () => {
                service.setCookie("showId", showId, 10);
                localStorage.setItem("ContinueWatching", "true");
                localStorage.setItem("NoContinueWatchPopUp", "true");
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
                service.setCookie("videoId", videoId, 10);
                history.push({
                  pathname: "/SubscriptionList",
                  state: {
                    videoData: videoId,
                  },
                });
              };

              service
                .videoSubscription(videoDetails.video_id)
                .then((response) => {
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
                              WatchWithoutAdsPopUp(onClickYes, onClickNo);
                            } else if (subFlag) {
                              subFlag = false;
                              localStorage.setItem("ContinueWatching", "true");
                              localStorage.setItem(
                                "NoContinueWatchPopUp",
                                "true"
                              );
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
            } else {
              //free video without subscription
              localStorage.setItem("ContinueWatching", "true");
              localStorage.setItem("NoContinueWatchPopUp", "true");
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
        } else {
          history.push("/404");
        }
      });
    }
  };

  return (
    <div
      className="carouselContent categoryShowWrapper"
      style={{ borderBottom: "1px solid rgba(211,215,219,.1)" }}
    >
      <ToastsContainer store={ToastsStore} />
      <Carousel responsive={responsive}>
        {shows &&
          shows.map((show, index) => {
            return (
              <div
                className="movieTile"
                key={index}
                style={{ padding: "12px" }}
              >
                <div
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
                      console.log("clicked", show.live_url);

                      if (categoryId == 99992) {
                        console.log(
                          "continuewatching click",
                          show.show_id,
                          show.video_id,
                          show.single_video
                        );
                        onClickPlaybutton(
                          show.show_id,
                          show.video_id,
                          show.single_video
                        );
                      } else if (show.type === "LIVE_EVENT") {
                        setEventLink(show.event_id);
                        console.log(`live link active:`, eventLink);
                        funcc(show.live_url);
                      } else if (show.type === "LIVE") {
                        setEventLink(show.event_id);
                        console.log(`live link active:`, eventLink);
                        funcc(show.live_link);
                      } else if (show.type === "UPCOMING_EVENT") {
                        alert("This Event Will be Live Soon");
                      } else {
                        console.log(
                          "Non continuewatching click",
                          show.show_id,
                          show.video_id
                        );
                        history.push({
                          pathname: "/home/movies",
                          search: encodeURI(`show_id=${show.show_id}`),
                        });
                      }
                    }}
                    className={
                      hover === true && focusedId === index
                        ? "movieTileIcon "
                        : "movieTileIcon  movieTileHoverOpened"
                    }
                  >
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
                  </div>
                  {/* {show.logo_thumb && (
                    <div
                      className="moviePoster"
                      style={{
                        backgroundImage: `url(${ show.logo_thumb})`,
                      }}
                    >
                      <div className="FeNml"></div>
                    </div>
                  )} */}
                  {show.logo_thumb ? (
                    <div
                      className="moviePoster"
                      style={{
                        backgroundImage: `url(${show.logo_thumb})`,
                      }}
                    >
                      <div className="FeNml"></div>
                    </div>
                  ) : (
                    <div className="moviePoster" 
                    style={{
                      backgroundImage: `url(${logo})`,
                    }}>
                     
                      <div className="FeNml"></div>
                    </div>
                  )}

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
                          hover === true && focusedId === index
                            ? "wlgradientPosition wlgradientTranslate wlgradientOpen"
                            : "wlgradientPosition wlgradientTranslate wlgradientClose"
                        }
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))",
                          backgroundPosition: "center bottom",
                          backgroundSize: "cover",
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
                  {show.is_free_video == false ||
                  categoryId == "free__videos" ? (
                    <div className="freeTagWrapper">
                      <img src={freeTag} />
                    </div>
                  ) : null}
                </div>
                {show.watched_percentage != undefined ? (
                  <div className="progressbar__div">
                    <div className="progressbar-border">
                      <div
                        className="progressbar-grey"
                        style={
                          show.watched_percentage == 0
                            ? { height: "4px", width: "1%" }
                            : {
                                height: "4px",
                                width: `${show.watched_percentage}%`,
                              }
                        }
                      ></div>
                    </div>
                  </div>
                ) : null}
                <section className="movieTextWrapper movieTextWrapperPadding">
                  <div className="movieTextFlex">
                    <h3>
                      {show.show_name && (
                        <div
                          className="linkButton movieTextHeading"
                          onClick={() => {
                            if (categoryId == 99992) {
                              console.log(
                                "continuewatching click",
                                show.show_id,
                                show.video_id,
                                show.single_video
                              );
                              onClickPlaybutton(
                                show.show_id,
                                show.video_id,
                                show.single_video
                              );
                            } else {
                              console.log(
                                "Non continuewatching click",
                                show.show_id,
                                show.video_id
                              );
                              history.push({
                                pathname: "/home/movies",
                                search: encodeURI(`show_id=${show.show_id}`),
                              });
                            }
                          }}
                        >
                          {show.show_name}
                        </div>
                      )}
                    </h3>

                    <div
                      className="movieCatYear"
                      style={{ display: "contents" }}
                    >
                      <div>
                        <div className="movieYear">
                          <div
                            className="_1MmGl"
                            style={{
                              marginRight: "auto",
                            }}
                          >
                            {show.year ? `(${show.year})` : null}
                            {show.year && show.duration_text ? " . " : null}
                            {show.duration_text ? show.duration_text : null}
                          </div>

                          {show.rating && (
                            <div
                              className="movieCensorBox moviecensorText"
                              style={{
                                // left: "250px",
                                borderRadius: "0px",
                              }}
                            >
                              {show.rating}
                            </div>
                          )}
                        </div>
                      </div>
                      {show.category_names && (
                        <div className="movieCategory mcMargin">
                          <div>{show.category_names}</div>
                        </div>
                      )}
                      {show.categories && (
                        <div className="movieCategory mcMargin">
                          <div>
                            {show.categories.map((item, index) => {
                              if (show.categories.length === index + 1) {
                                return item.category_name;
                              } else {
                                return item.category_name + ",";
                              }
                            })}
                          </div>
                        </div>
                      )}
                      {/* {show.synopsis && (
                        <div className="movieCategory mcMargin">
                          {show.synopsis.length > 180 ? (
                            <div>{show.synopsis.slice(0, 175) + "..."}</div>
                          ) : (
                            <div>{show.synopsis}</div>
                          )}
                        </div>
                      )} */}
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
export default Show;
