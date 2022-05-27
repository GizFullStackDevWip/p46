import React, { useState, useEffect, useRef, lazy, FC, Suspense } from "react";
import CategoryContainer from "./CategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../../network/Home/service";
import LiveContainer from "./LiveContainer";
import LiveSchedule from "./LiveSchedule";
import Notification from "../../common/Notification";
import $ from "jquery";
import Banner from "./Banner";

const Home = () => {
  const [category, setCategory] = useState([]);
  const signInBlock = useSelector((state) => state.signInBlock);
  const login = useSelector((state) => state.login);
  let offset = 0
  let scrollHeight = 100
  let maxScrollExceed = false;
  let loadedRows = []

  useEffect(() => {
    window.scrollTo(0, 0);
    $(".menuItemContainer").addClass("menuClose");
    var singleObj = [];
    service.getshowsbyCategory().then((response) => {
      if (response.success === true && response.data.length > 0) {
        var data = response.data;
        data.map((item, index) => {
          singleObj.push(item);
        });
        setCategory(singleObj);
        loadedRows = singleObj
      }
    });
  }, [login]);

  useEffect(() => {

    let prevPosition = 0
    let newPosition = 0
    let currentPosition = 0
    window.addEventListener('scroll', (e) => {
      newPosition = window.pageYOffset;
      currentPosition += 1;
      if (!maxScrollExceed && prevPosition < newPosition && currentPosition > scrollHeight) {
        currentPosition = 0
        offset += 10
        fetchData();
      } else if (prevPosition > newPosition) {
      }
      prevPosition = newPosition;
    });
  }, []);

  const fetchData = async () => {
    setTimeout(async () => {
      service.getshowsbyCategory(offset).then((response) => {
        if (response.success === true && response.data.length > 0) {
          var data = response.data;
          let singleObj = []
          data.map((item, index) => {
            singleObj.push(item);
          });
          loadedRows = [...loadedRows, ...singleObj]
          setCategory(loadedRows);
        } else if (response.data.length == 0) {
          maxScrollExceed = true;
        }
      });
    }, 1000);
  };


  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          {signInBlock === true ? <Notification /> : null}
          <LiveContainer />
          <LiveSchedule />
          <Banner />
          <div className="allCategoryContainer">
            {category &&
              category.show_count !== "0" &&
              category.map((category, index) => {
                return (
                  <div key={index}>
                    <CategoryContainer
                      param={category}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;