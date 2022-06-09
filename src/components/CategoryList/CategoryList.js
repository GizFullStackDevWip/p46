import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { service } from "../../network/Home/service";
import { Link, useHistory } from "react-router-dom";
import { convertTime } from "../../Utils/utils";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../../common/Notification";
import $ from "jquery";
import freeTag from "../../images/free1.png";

var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";

const queryString = require("query-string");

const CategoryList = () => {
  const [category, setCategory] = useState([]);
  let offset = 0;
  let scrollHeight = 100;
  let maxScrollExceed = false;
  let loadedRows = [];
  var { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const parsed = queryString.parse(search);
  const [showList, setShowList] = useState([]);
  let listArray = [];
  const [showName, setShowName] = useState("");
  const [hover, setHover] = useState(false);
  const [focusedId, setFocusedId] = useState(-1);
  const signInBlock = useSelector((state) => state.signInBlock);

  useEffect(() => {
    window.scrollTo(0, 0);
    $(".menuItemContainer").addClass("menuClose");

    updateUseEffect();
  }, [search]);

  const updateUseEffect = () => {
    var singleObj = [];
    console.log("list");
    if (parsed.category_id === "99991") {
      console.log("list", parsed.category_id);
      let isLoggedIn = localStorage.getItem("isLoggedIn");
      let userId = service.getCookie("userId");
      if (isLoggedIn === "true" && userId) {
        service.playList().then((response) => {
          if (response.data) {
            setShowList(response.data);
            setShowName(parsed.category_name);
          }
        });
      }
    } else if (parsed.category_id === "99993") {
      service.freeVideos().then((response) => {
        console.log("freeeee", response);
        setShowName(parsed.category_name);
        setShowList(response.data);
      });
    } else if (parsed.category_id === "99992") {
      service.getContinueWatchingVideos().then((response) => {
        console.log("freeeee", response);
        setShowName(parsed.category_name);
        setShowList(response.data);
      });
    
    }
    
    else if(parsed.category_id === "99996"){
      service.getNews(parsed.category_id).then((response) => {
        if (response.success == true && response.data) {
          console.log(`$$news response is:`, response);
          var data = response.data;
          data.map((item, index) => {
            singleObj.push(item);
          });

          setShowName(parsed.category_name);
          setShowList(singleObj);
          loadedRows = singleObj;
          
        }
      });
    }


    else {
      service.showsByCategory(parsed.category_id).then((response) => {
        if (response.success == true && response.data) {
          console.log(`$$response is:`, response);
          var data = response.data.shows;
          data.map((item, index) => {
            singleObj.push(item);
          });

          setShowName(parsed.category_name);
          setShowList(singleObj);
          loadedRows = singleObj;
        }
      });
    }
  };

  const hoverFunction = (flag, index) => {
    setHover(flag);
    setFocusedId(index);
  };

  useEffect(() => {
    let prevPosition = 0;
    let newPosition = 0;
    let currentPosition = 0;
    window.addEventListener("scroll", (e) => {
      console.log(showList);
      newPosition = window.pageYOffset;
      currentPosition += 1;
      if (
        !maxScrollExceed &&
        prevPosition < newPosition &&
        currentPosition > scrollHeight
      ) {
        currentPosition = 0;
        offset += 10;
        console.log(showList);

        fetchData();
      } else if (prevPosition > newPosition) {
      }
      prevPosition = newPosition;
    });
  }, []);

  const fetchData = async () => {
    setTimeout(async () => {
      if (parsed.category_id === "99991") {
        console.log("list", parsed.category_id);
        let isLoggedIn = localStorage.getItem("isLoggedIn");
        let userId = service.getCookie("userId");
        if (isLoggedIn === "true" && userId) {
          service.playList(offset).then((response) => {
            if (response.data) {
              setShowList(response.data);
              setShowName(parsed.category_name);
            }
          });
        }
      } else if (parsed.category_id === "99993") {
        service.freeVideos(offset).then((response) => {
          console.log("freeeee", response);
          setShowName(parsed.category_name);
          setShowList(response.data);
        });
      } else if (parsed.category_id === "99992") {
        service.getContinueWatchingVideos(offset).then((response) => {
          if (response.success == true && response.data) {
            var data = response.data.shows;
            let singleObj = [];
            data.map((item, index) => {
              singleObj.push(item);
            });
            loadedRows = [...loadedRows, ...singleObj];
            setShowName(parsed.category_name);
            setShowList(loadedRows);
          } else if (response.data.shows.length === 0) {
            maxScrollExceed = true;
          }
        });
      } else {
        service.showsByCategory(parsed.category_id, offset).then((response) => {
          console.log(`catagory response is:`, response);

          if (response.success == true && response.data) {
            var data = response.data.shows;
            let singleObj = [];
            data.map((item, index) => {
              singleObj.push(item);
            });
            loadedRows = [...loadedRows, ...singleObj];
            setShowName(parsed.category_name);
            setShowList(loadedRows);
          } else if (response.data.shows.length === 0) {
            maxScrollExceed = true;
          }
        });
      }
      // else if (response.data.length == 0) {
      //   maxScrollExceed = true;
      // }
    }, 1000);
  };

  const addtoMylistFunction = (show) => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      service.addToMyPlayList(show.show_id, 1).then((response) => {
        if (response.success === true) {
          updateUseEffect();
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
          updateUseEffect();
        }
      });
    } else {
      dispatch({ type: "SIGN_IN_BLOCK" });
    }
  };

  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="menuCloseJS closeMenuWrapper">
          {signInBlock === true ? <Notification /> : null}
          <div className="container searchWrapper">
            <div className="_1py48"></div>
            <div className="searchResult">
              <h1 className="SearchResultText">{showName}</h1>
              {parsed.category_id === "playlist" ? (
                <span
                  style={{ fontWeight: "600", fontSize: "9pt", color: "white" }}
                >
                  To add to your playlist, click "Add To My List" on any movie
                  title or show and it will populate here.
                </span>
              ) : null}
            </div>
            <div className="searchResultMargin">
              <div className="row">
                {showList &&
                  showList.map((show, index) => {
                    return (
                      <div
                        className="col col-12 col-lg-4 col-xl-2-5 col-xxl-2"
                        key={index}
                      >
                        <div className="movieTileMargin movieTile">
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
                                let show_id=show.show_id
                                history.push({
                                  pathname: "/home/movies",
                                  search: encodeURI(`show_id=${show_id}`),
                                });
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
                                // onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}
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
                            {show.logo ? (
                              <div
                                className="moviePoster imageSizeAdj thumbImage"
                                style={{
                                  backgroundImage: `url(${
                                    showsImageUrl + show.logo
                                  })`,
                                }}
                              >
                                <div className="FeNml"></div>
                              </div>
                            ) :
                            <div
                                className="moviePoster imageSizeAdj thumbImage"
                                style={{
                                  backgroundImage: `url(${show.logo_landscape
                                  })`,
                                }}
                              >
                                <div className="FeNml"></div>
                              </div>
                            }
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
                                      "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5)), url(./images/adventures/adventures-04.jpg)",
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
                            {show.is_free_video == false ||
                            parsed.category_id == "free__videos" ? (
                              <div className="freeTagWrapper">
                                <img src={freeTag} />
                              </div>
                            ) : null}
                          </div>
                          <section className="movieTextWrapper movieTextWrapperPadding">
                            <div className="movieTextFlex">
                              <h3>
                                {(show.show_name) ? 
                                (
                                  <div
                                    className="linkButton movieTextHeading"
                                    onClick={() => {
                                      history.push({
                                        pathname: "/home/movies",
                                        search: encodeURI(
                                          `show_id=${show.show_id}`
                                        ),
                                      });
                                    }}
                                  >
                                    {show.show_name}
                                  </div>
                                ) :
                                <div
                                    className="linkButton movieTextHeading"
                                    onClick={() => {
                                      console.log(`news show id is :`, show.show_id)
                                      history.push({
                                        pathname: "/home/movies",
                                        search: encodeURI(
                                          `show_id=${show.show_id}`
                                        ),
                                      });
                                    }}
                                  >
                                    {show.title}
                                  </div>
                              }
                              </h3>
                              <div className="movieCatYear">
                                <div>
                                  <div className="movieYear">
                                    {show.duration_text && show.year ? (
                                      <div className="movieYear">
                                        <div className="_1MmGl">
                                          ({show.year}) . {show.duration_text}
                                        </div>
                                      </div>
                                    ) : show.duration_text ? (
                                      <div className="movieYear">
                                        <div className="_1MmGl">
                                          {show.duration_text}
                                        </div>
                                      </div>
                                    ) : show.year ? (
                                      <div className="movieYear">
                                        <div className="_1MmGl">
                                          ({show.year})
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="movieCategory mcMargin">
                                    {show.category_names && show.category_names}
                                    {/* {show.categories &&
                                      show.categories.map((item, index) => {
                                        if (
                                          index ===
                                          show.categories.length - 1
                                        ) {
                                          return item.category_name;
                                        } else {
                                          return item.category_name + ",";
                                        }
                                      })} */}
                                  </div>
                                </div>
                                {show.rating && (
                                  <div>
                                    <div className="movieCensorBox moviecensorText">
                                      {show.rating}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryList;
