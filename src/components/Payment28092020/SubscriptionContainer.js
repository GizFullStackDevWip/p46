import React, { useState, useEffect } from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom'

const SubscriptionContainer = (param) => {

    useEffect(() => {
    }, []);

    return (
        <section className="categoryWrapper">
            <div className="_2vKa8"></div>
            <div className="container categoryHeadWrapper">
                <div className="categoryLinkWrapper">
                    <p className="text-head" style={{marginLeft:'-58px'}}>Subscribed Packages </p>
                </div>
                <Subscription  param={param.param}/>
            </div>
        </section>
    );
};
export default SubscriptionContainer;