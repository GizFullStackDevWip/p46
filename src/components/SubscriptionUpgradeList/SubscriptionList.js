import React, { useState, useEffect } from "react";
import SubscriptionContainer from "./SubscriptionContainer";
import { useDispatch } from "react-redux";
import { service } from "./service";
import "./SubscriptionList.css";

const SubscriptionList = () => {
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);
  const [androidData, setAndroidData] = useState("");
  const [isAndroid, setIsAndroid] = useState(false);
  let urlParams = new URLSearchParams(window.location.search);
  let userID = service.getCookie("userId")
  var singleObj = [];
  let currentPlan = urlParams.get("cp");
  localStorage.setItem('previous_subscription_id', currentPlan)
  localStorage.setItem('is_upgrade', true)

  useEffect(() => {
    // var selectedVideoId =
    //   state.location.state != undefined ? state.location.state.videoData : null;
    console.log('currentPlan', currentPlan)

    dispatch({
      type: "IS_UPGRADE",
      payload: true,
    });

    let androidToken = urlParams.get("antkn");
    if (androidToken) {
      console.log("androidToken if");
      let deviceId = urlParams.get("deviceId");
      if (deviceId) {
        localStorage.setItem("deviceId", deviceId);
      }
      dispatch({ type: "SET_ANDROID" });
      service.androidTokeDecode(androidToken).then((response) => {
        if (response.success == true) {
          console.log("androidTokeDecode success");
          localStorage.setItem("access-token", androidToken);
          service.setCookie("userId", response.data[0].user_id, 15);
          userID = response.data[0].user_id
          localStorage.setItem("userId", userID);
          localStorage.setItem("userName", response.data[0].first_name);
          localStorage.setItem("isAndroid", "true");
          service.setCookie("isLoggedIn", "true", 15);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("deviceType", "android-web");
          setAndroidData(response.data);
          setIsAndroid(true);
          fetchPremiumSubscriptions()
          // if (selectedVideoId) {
          //   console.log("androidTokeDecode selectedVideoId");
          //   service.videoSubscription(selectedVideoId).then((response) => {
          //     var data = response.data;
          //     if (data != undefined)
          //       data.map((item, index) => {
          //         singleObj.push(item);
          //       });
          //     setSubscription(singleObj);
          //   });
          // } else {
          //   console.log("androidTokeDecode  selectedVideoId else");
          //   service.publisherSubscription().then((response) => {
          //     var data = response.data;
          //     if (data != undefined)
          //       data.map((item, index) => {
          //         singleObj.push(item);
          //       });
          //     setSubscription(singleObj);
          //   });
          // }
        }
      });
    } else {
      console.log("androidToken else");
      fetchPremiumSubscriptions()
      // if (selectedVideoId) {
      //   console.log("selectedVideoId");
        // service.videoSubscription(selectedVideoId).then((response) => {
      //     var data = response.data;
      //     if (data != undefined)
      //       data.map((item, index) => {
      //         singleObj.push(item);
      //       });
      //     setSubscription(singleObj);
      //   });
      // } else {
      //   console.log("selectedVideoId else");
      //   service.publisherSubscription().then((response) => {
      //     var data = response.data;
      //     if (data != undefined)
      //       data
      //         .filter(
      //           (item) =>
      //             item.subscription_type_id == 3 ||
      //             item.subscription_type_id == 4
      //         )
      //         .map((item, index) => {
      //           singleObj.push(item);
      //         });
      //     setSubscription(singleObj);
      //   });
      // }
    }
  }, []);

  const fetchPremiumSubscriptions = () => {
      service.fetchPremiumSubscriptionList(currentPlan).then((response) => {
          var data = response.data;
          if (data != undefined)
            data.map((item, index) => {
              singleObj.push(item);
            });
          setSubscription(singleObj);
        });
  }

  return (
    <div className="pageWrapper searchPageMain sub__container marginAdjust">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          <div className="allCategoryContainer">
            <div key={1}>
              <SubscriptionContainer
                param={subscription}
                androidData={androidData}
                isAndroid={isAndroid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionList;
