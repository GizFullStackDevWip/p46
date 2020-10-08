import React, { useState, useEffect } from 'react';
import Header from '../Basic/Header';
import SubscriptionContainer from './SubscriptionContainer';
import Footer from '../Basic/Footer';
import { service } from '../../network/service';
const SubscriptionList = () => {
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        var singleObj = [];
        var selectedVideoId = 4057;
        if (selectedVideoId) {
            service.videoSubscription(selectedVideoId).then(response => {
                console.log(response.data, 'dara');
                var data = response.data;
                data.map((item, index) => {
                    singleObj.push(item);
                })
                setSubscription(singleObj);
            })
          } else {
            service.publisherSubscription().then(response => {
                console.log(response.data, 'dara');
                var data = response.data;
                data.map((item, index) => {
                    singleObj.push(item);
                })
                setSubscription(singleObj);
            })
          }
        

    }, []);
    
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="allCategoryContainer">
                    <div key={1}>
                        <SubscriptionContainer param={subscription} />
                            </div>
                        
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};
export default SubscriptionList;