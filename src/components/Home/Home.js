import React, { useState, useEffect } from "react";
import CategoryContainer from "./CategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../../network/Home/service";
import Notification from "../../common/Notification";
import BannerContainer from "./BannerContainer";
import $ from "jquery";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);
  const [freeVideos, setFreeVideos] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [categoryOrgLength, setCategoryOrgLength] = useState([]);
  const signInBlock = useSelector((state) => state.signInBlock);
  const login = useSelector((state) => state.login);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.clear();
    console.log("Home Page");
    $(".menuItemContainer").addClass("menuClose");
    var singleObj = [];
    let newArrivalsArray = [];
    let freeVideosArray = [];
    let continueWatchingArray = [];
    service.getshowsbyCategory().then((response) => {
      if (response.success === true && response.data.length > 0) {
        setCategoryOrgLength(response.data.length);
        var data = response.data;
        data.map((item, index) => {
          if (index < 4) {
            singleObj.push(item);
          }
        });
        setCategory(singleObj);
      }
      service.getRecentlyAddedShows().then((response) => {
        if (response.data && response.data.length > 0) {
          let newArrivals = {};
          newArrivals.category_id = "0";
          newArrivals.category_name = "New Releases";
          newArrivals.shows = response.data.slice(0, 10);
          newArrivalsArray.push(newArrivals);
          setNewArrivals(newArrivalsArray);
        }
      });
      service.freeVideos().then((response) => {
        if (
          response.success == true &&
          response.data &&
          response.data.length > 0
        ) {
          let freeVideos = {};
          freeVideos.category_id = "free__videos";
          freeVideos.category_name = "Free Videos";
          freeVideos.shows = response.data;
          freeVideosArray.push(freeVideos);
          setFreeVideos(freeVideosArray);
        }
      });
      let isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn == "true") {
        service.getContinueWatchingVideos().then((response) => {
          if (
            response.success == true &&
            response.data &&
            response.data.length > 0
          ) {
            let continueWatching = {};
            continueWatching.category_id = "continuewatching";
            continueWatching.category_name = "Continue Watching";
            continueWatching.shows = response.data;
            continueWatchingArray.push(continueWatching);
            setContinueWatching(continueWatchingArray);
          }
        });
      }
    });
  }, []);

  const loadMoreCategory = () => {
    setLoadMore(true);
    service.getshowsbyCategory().then((response) => {
      if (response.success === true && response.data.length > 0) {
        setCategoryOrgLength(0);
        var data = response.data;
        setCategory(data);
      }
    });
  };
  const updateFuction = () => {
    if (loadMore === true) {
      let newArrivalsArray = [];
      let freeVideosArray = [];
      let continueWatchingArray = [];
      service.getshowsbyCategory().then((response) => {
        if (response.success === true && response.data.length > 0) {
          setCategoryOrgLength(0);
          var data = response.data;
          setCategory(data);
          service.getRecentlyAddedShows().then((response) => {
            if (response.data && response.data.length > 0) {
              let newArrivals = {};
              newArrivals.category_id = "0";
              newArrivals.category_name = "New Releases";
              newArrivals.shows = response.data.slice(0, 10);
              newArrivalsArray.push(newArrivals);
              setNewArrivals(newArrivalsArray);
            }
          });
          service.freeVideos().then((response) => {
            if (
              response.success == true &&
              response.data &&
              response.data.length > 0
            ) {
              let freeVideos = {};
              freeVideos.category_id = "free__videos";
              freeVideos.category_name = "Free Videos";
              freeVideos.shows = response.data;
              freeVideosArray.push(freeVideos);
              setFreeVideos(freeVideosArray);
            }
          });
          let isLoggedIn = localStorage.getItem("isLoggedIn");
          if (isLoggedIn == "true") {
            service.getContinueWatchingVideos().then((response) => {
              if (
                response.success == true &&
                response.data &&
                response.data.length > 0
              ) {
                let continueWatching = {};
                continueWatching.category_id = "continuewatching";
                continueWatching.category_name = "Continue Watching";
                continueWatching.shows = response.data;
                continueWatchingArray.push(continueWatching);
                setContinueWatching(continueWatchingArray);
              }
            });
          }
        }
      });
    } else {
      var singleObj = [];
      let newArrivalsArray = [];
      let freeVideosArray = [];
      let continueWatchingArray = [];
      service.getshowsbyCategory().then((response) => {
        if (response.success === true && response.data.length > 0) {
          setCategoryOrgLength(response.data.length);
          var data = response.data;
          data.map((item, index) => {
            if (index < 4) {
              singleObj.push(item);
            }
          });
          setCategory(singleObj);
          service.getRecentlyAddedShows().then((response) => {
            if (response.data) {
              let newArrivals = {};
              newArrivals.category_id = "0";
              newArrivals.category_name = "New Releases";
              newArrivals.shows = response.data.slice(0, 10);
              newArrivalsArray.push(newArrivals);
              setNewArrivals(newArrivalsArray);
            }
          });
          service.freeVideos().then((response) => {
            if (response.success == true && response.data) {
              let freeVideos = {};
              freeVideos.category_id = "free__videos";
              freeVideos.category_name = "Free Videos";
              freeVideos.shows = response.data;
              freeVideosArray.push(freeVideos);
              setFreeVideos(freeVideosArray);
            }
          });
          let isLoggedIn = localStorage.getItem("isLoggedIn");
          if (isLoggedIn == "true") {
            service.getContinueWatchingVideos().then((response) => {
              if (
                response.success == true &&
                response.data &&
                response.data.length > 0
              ) {
                let continueWatching = {};
                continueWatching.category_id = "continuewatching";
                continueWatching.category_name = "Continue Watching";
                continueWatching.shows = response.data;
                continueWatchingArray.push(continueWatching);
                setContinueWatching(continueWatchingArray);
              }
            });
          }
        }
      });
    }
  };

  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          {signInBlock === true ? <Notification /> : null}
          <BannerContainer />
          <div className="allCategoryContainer">
            {freeVideos.length > 0 &&
              freeVideos.map((freeVideo, index) => {
                if (freeVideo.show_count !== "0") {
                  return (
                    <div key={index}>
                      <CategoryContainer
                        param={freeVideo}
                        clickHandler={updateFuction}
                      />
                    </div>
                  );
                }
              })}
            {continueWatching.length > 0 &&
              continueWatching.map((item, index) => {
                if (item.show_count !== "0") {
                  return (
                    <div key={index}>
                      <CategoryContainer
                        param={item}
                        clickHandler={updateFuction}
                      />
                    </div>
                  );
                }
              })}
            {newArrivals.length > 0 &&
              newArrivals.slice(0, 10).map((newArrivals, index) => {
                if (newArrivals.show_count !== "0") {
                  return (
                    <div key={index}>
                      <CategoryContainer
                        param={newArrivals}
                        clickHandler={updateFuction}
                      />
                    </div>
                  );
                }
              })}
            {category &&
              category.map((category, index) => {
                if (category.show_count !== "0") {
                  return (
                    <div key={index}>
                      <CategoryContainer
                        param={category}
                        clickHandler={updateFuction}
                      />
                    </div>
                  );
                }
              })}
            {categoryOrgLength > 4 && (
              <div className="container" onClick={loadMoreCategory}>
                <div className="row loadMoreContainer">
                  <button className="button buttonLarge buttonSecondary">
                    <div className="buttonBg"></div>
                    <div className="buttonContent">Load More</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
