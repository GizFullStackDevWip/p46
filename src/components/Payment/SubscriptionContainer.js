import React, { useState, useEffect } from 'react';
import Subscription from './Subscription';

const SubscriptionContainer = (param) => {

    const [msgFlag, setMsgFlag] = useState(null);
    useEffect(() => {
    }, []);
    
    const msgHandler = (flag) => {
        setMsgFlag(flag);
        setTimeout(function () {
            setMsgFlag(null);
        }, 5000);
    }
    return (
        <section className="categoryWrapper">
            <div className="_2vKa8"></div>
            <div className="container categoryHeadWrapper">
                {
                    (msgFlag == 'true') && (
                        <div className="alert alert-success" >
                            <h4 className="alert-heading">Success!</h4>
                            <p>You are successfully unsubscribed.</p>

                        </div>
                    )}
                {
                    (msgFlag == 'false') && (
                        <div className="alert alert-danger" >
                            <h4 className="alert-heading">Failed!</h4>
                            <p>Your subscription cancellation has failed.</p>
                        </div>
                    )}
                <div className="categoryLinkWrapper">
                    <p className="text-head" style={{ marginLeft: '-58px' }}>Subscribed Packages </p>
                </div>

                <Subscription param={param.param} msgHandler={msgHandler} />
            </div>
        </section>
    );
};
export default SubscriptionContainer;