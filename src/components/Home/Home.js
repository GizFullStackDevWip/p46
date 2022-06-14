import React, { useState, useEffect, useRef, lazy, FC, Suspense } from "react";
import CategoryContainer from "./CategoryContainer";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../../network/Home/service";
import LiveContainer from "./LiveContainer";
import LiveSchedule from "./LiveSchedule";
import Notification from "../../common/Notification";
import $ from "jquery";
// import Banner from "./Banner";
const Home = () => {
  const [category, setCategory] = useState([]);
  const [playLink, setPlayLink] = useState(``);
  const [continueWatching, setContinueWatching] = useState([]);
  const [playStatus, setplayStatus] = useState(true);
  const signInBlock = useSelector((state) => state.signInBlock);
  const login = useSelector((state) => state.login);
  let offset = 0;
  let scrollHeight = 100;
  let maxScrollExceed = false;
  let loadedRows = [];
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
        loadedRows = singleObj;
      }
    });
  }, [login]);
  useEffect(() => {
    let prevPosition = 0;
    let newPosition = 0;
    let currentPosition = 0;
    window.addEventListener("scroll", (e) => {
      newPosition = window.pageYOffset;
      console.log(`Y offset is`, newPosition);
      if (newPosition > 250) {
        let sts= true;
        setplayStatus(true);
        console.log(`from home mute status should be :`,sts)
      }else{
        setplayStatus(false);
        let sts= false;
        console.log(`from home mute status should be :`,sts)
      }
      currentPosition += 1;
      if (
        !maxScrollExceed &&
        prevPosition < newPosition &&
        currentPosition > scrollHeight
      ) {
        currentPosition = 0;
        offset += 10;
        fetchData();
      } else if (prevPosition > newPosition) {
      }
      prevPosition = newPosition;
    });
  }, []);
  const liveFetch = (linkForLive) => {
    setPlayLink(linkForLive);
    console.log(`from home:`, linkForLive);
  };
  const fetchData = async () => {
    setTimeout(async () => {
      service.getshowsbyCategory(offset).then((response) => {
        if (response.success === true && response.data.length > 0) {
          var data = response.data;
          let singleObj = [];
          data.map((item, index) => {
            singleObj.push(item);
          });
          loadedRows = [...loadedRows, ...singleObj];
          setCategory(loadedRows);
        } else if (response.data.length == 0) {
          maxScrollExceed = true;
        }
      });
    }, 1000);
  };
  const updateFuction = () => {
    console.log("updated");
  };
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          {signInBlock === true ? <Notification /> : null}
          
          <LiveContainer param={playLink} playing={playStatus} />
          <LiveSchedule />
          {/* <Banner /> */}
          <div className="allCategoryContainer">
            {/* {continueWatching.length > 0 &&
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
              })} */}
            {category &&
              category.show_count !== "0" &&
              category.map((category, index) => {
                // if(category.type === "CONTINUE_WATCHING"){
                // return (
                //   <div key={index}>
                //     <CategoryContainer
                //       param={category}
                //     />
                //   </div>
                // );
                // }else{
                return (
                  <div key={index}>
                    <CategoryContainer
                      param={category}
                      funcc={liveFetch}
                      playing={playStatus}
                      clickHandler={updateFuction}
                    />
                  </div>
                );
                // }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
