import React, { useState, useEffect } from 'react';
// import Header from '../Basic/Header';
import SubscriptionContainer from './SubscriptionContainer';
import Footer from '../Basic/Footer';
import { useDispatch } from 'react-redux';
// import { service } from "../../network/service";
import { service } from '../../network/Subscription/service';
const SubscriptionList = (state) => {
    const [subscription, setSubscription] = useState([]);
    const dispatch = useDispatch();
    const [androidData, setAndroidData] = useState('');
    const [isAndroid, setIsAndroid] = useState(false);
    const [antkn, setAntkn] = useState('');
    let urlParams = new URLSearchParams(window.location.search);
    
    useEffect(() => {
       
        var selectedVideoId = state.location.state !== undefined ? state.location.state.videoData : null;
        console.log("selectedVideoId",state.location.state);
        var singleObj = [];
        setAntkn(urlParams.get('antkn'));
        let androidToken = urlParams.get('antkn');
        if (androidToken) {
            dispatch({ type: "SET_ANDROID" });
            selectedVideoId = urlParams.get('vd');
            service.androidTokeDecode(androidToken).then(response => {
                if(response.success == true) {
                    localStorage.setItem('access-token', androidToken);
                    localStorage.setItem("userId", response.data[0].user_id);
                    service.setCookie('userId', response.data[0].user_id, 15);
                    localStorage.setItem('userName', response.data[0].first_name);
                    localStorage.setItem('isAndroid', 'true');
                    service.setCookie('isLoggedIn', 'true', 15);
                    localStorage.setItem('isLoggedIn', 'true');
                    setAndroidData(response.data);
                    setIsAndroid(true);
                    }
            })
        }
        if (selectedVideoId) {
            service.videoSubscriptionActive(selectedVideoId).then(response => {
                var data = response.data;
                if (data != undefined)
                data.map((item, index) => {
                    singleObj.push(item);
                })
                setSubscription(singleObj);
            })
        } else {
            service.publisherSubscription().then(response => {
                var data = response.data;
                if (data != undefined)
                data.map((item, index) => {
                    singleObj.push(item);
                })
                setSubscription(singleObj);
            })
        }


    }, []);

    return (
        <div className="pageWrapper searchPageMain" >
            <div className="topContainer" >
          
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="allCategoryContainer">
                        <div key={1}>
                            <SubscriptionContainer param={subscription}
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
