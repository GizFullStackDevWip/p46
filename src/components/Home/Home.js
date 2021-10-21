import React, { useState, useEffect } from "react";
import CategoryContainer from "./CategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../../network/Home/service";
import LiveContainer from "./LiveContainer";
import LiveSchedule from "./LiveSchedule";
import PartnerContainer from "./PartnerContainer";
import Notification from "../../common/Notification";
import { useHistory, Redirect, Link } from "react-router-dom";
import $ from "jquery";
import Banner from "./Banner";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [categoryOrgLength, setCategoryOrgLength] = useState([]);
  const signInBlock = useSelector((state) => state.signInBlock);
  const login = useSelector((state) => state.login);
  useEffect(() => {
    window.scrollTo(0, 0);
    $(".menuItemContainer").addClass("menuClose");
    var singleObj = [];
    service.getshowsbyCategory().then((response) => {
      if (response.status === 100 && response.data.length > 0) {
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
  }, [login]);

  const loadMoreCategory = () => {
    setLoadMore(true);
    service.getshowsbyCategory().then((response) => {
      if (response.status == 100 && response.data.length > 0) {
        setCategoryOrgLength(0);
        var data = response.data;
        setCategory(data);
      }
    });
  };
  const updateFuction = () => {
    if (loadMore === true) {
      service.getshowsbyCategory().then((response) => {
        if (response.status == 100 && response.data.length > 0) {
          setCategoryOrgLength(0);
          var data = response.data;
          setCategory(data);
        }
      });
    } else {
      var singleObj = [];
      service.getshowsbyCategory().then((response) => {
        if (response.status === 100 && response.data.length > 0) {
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

  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          {signInBlock === true ? <Notification /> : null}
          <LiveContainer />
          {/* <Banner /> */}
          <LiveSchedule />
          <PartnerContainer />
          <div className="allCategoryContainer">
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
