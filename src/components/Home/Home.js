import React, { useState, useEffect } from "react";
import CategoryContainer from "./CategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../../network/Home/service";
import LiveContainer from "./LiveContainer";
import LiveSchedule from "./LiveSchedule";
import PartnerContainer from "./PartnerContainer";
import CommunityContainer from "./CommunityContainer";
import Notification from "../../common/Notification";
import { useHistory, Redirect, Link } from "react-router-dom";
import $ from "jquery";
import Banner from "./Banner";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [categoryOrgLength, setCategoryOrgLength] = useState([]);
  const [freeCategory, setFreeCategory] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const signInBlock = useSelector((state) => state.signInBlock);
  const login = useSelector((state) => state.login);
  useEffect(() => {
    window.scrollTo(0, 0);
    $(".menuItemContainer").addClass("menuClose");
    var singleObj = [];
    var freeArray = [];
    var newArray = [];
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
    });

    // service.freeVideos().then((response) => {
    //   if (response.data && response.data.length > 0) {
    //     let freeObj = {};
    //     freeObj.category_id = 140;
    //     freeObj.category_name = "Watch for free";
    //     freeObj.shows = response.data;
    //     freeArray.push(freeObj);
    //     setFreeCategory(freeArray);
    //   } else {
    //     setFreeCategory([]);
    //   }
    // });
    // service.getRecentlyAddedShows().then((response) => {
    //   if (response.data && response.data.length > 0) {
    //     let freeObj = {};
    //     freeObj.category_id = 191;
    //     freeObj.category_name = "New Releases";
    //     freeObj.shows = response.data;
    //     newArray.push(freeObj);
    //     setNewRelease(newArray);
    //   } else {
    //     setNewRelease([]);
    //   }
    // });

  }, [login]);

  // const loadMoreCategory = () => {
  //   setLoadMore(true);
  //   service.getshowsbyCategory().then((response) => {
  //     if (response.status == 100 && response.data.length > 0) {
  //       setCategoryOrgLength(0);
  //       var data = response.data;
  //       setCategory(data);
  //     }
  //   });
  // };
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
      service.getshowsbyCategory().then((response) => {
        if (response.status == true && response.data.length > 0) {
          setCategoryOrgLength(0);
          var data = response.data;
          setCategory(data);
        }
      });
    } else {
      var singleObj = [];
      service.getshowsbyCategory().then((response) => {
        if (response.status === true && response.data.length > 0) {
          setCategoryOrgLength(response.data.length);
          var data = response.data;
          data.map((item, index) => {
            if (index < 4) {
              singleObj.push(item);
            }
          });
          setCategory(singleObj);
        }
      });
    }
  };
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          {signInBlock === true ? <Notification /> : null}
          <LiveContainer />
          <LiveSchedule />
          <Banner />
         
          <div className="allCategoryContainer">

          {/* {freeCategory && (
            <div className="free__videos">
              {freeCategory.length > 0 ? (
                <CategoryContainer
                        param={freeCategory[0]}
                        clickHandler={updateFuction}
                      />
              ) : null}
            </div>
          )} */}
           {newRelease && (
            <div className="free__videos">
              {newRelease.length > 0 ? (
                
                <CategoryContainer
                        param={newRelease[0]}
                        clickHandler={updateFuction}
                      />
              ) : null}
            </div>
          )}
          {category &&
              category.map((category, index) => {
                if (category.show_count !== "0" && index <= 0) {
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
           <PartnerContainer />
           {/* {category &&
              category.map((category, index) => {
                if (category.show_count !== "0" && index >= 0) {
                  return (
                    <div key={index}>
                      <CategoryContainer
                        param={category}
                        clickHandler={updateFuction}
                      />
                    </div>
                  );
                }
              })} */}
               {category && category.show_count !== "0" &&
              category.map((category, index) => {
                if ( index >= 1 && index <= 2) {
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
       
            {/* {category &&
              category.map((category, index) => {
                if (category.show_count !== "0" && index == 2) {
                  return (
                    <div key={index}>
                      <CategoryContainer
                        param={category}
                        clickHandler={updateFuction}
                      />
                    </div>
                  );
                }
              })} */}
              
              <CommunityContainer />
            {category &&
              category.map((category, index) => {
                if (category.show_count !== "0" && index >= 3) {
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
                    <div className="buttonBg" style={{background: 'white'}}></div>
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
