import React, { useState, useEffect } from 'react';
import Subscription from './Subscription';
import { Link } from 'react-router-dom'

const SubscriptionContainer = (param) => {
    const [msgFlag, setMsgFlag] = useState(null);
    const [msg, setMsg] = useState(null);
    useEffect(() => {
    }, []);
    const msgHandler = (flag, msg) => {
        setMsgFlag(flag);
        setMsg(msg);
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
                            <h6 className="alert-heading"  style={{fontSize: '20px'}}>Success</h6>
                            <p>{msg}</p>

                        </div>
                    )}
                {
                    (msgFlag == 'false') && (
                        <div className="alert alert-danger" >
                            <h6 className="alert-heading"  style={{fontSize: '20px'}}>Failed</h6>
                             <p>{msg}</p>
                        </div>
                    )}
                {
                  param.param.length == 0 ? (
                        <div className="categoryLinkWrapper">
                            <p className="text-head packageMsg">No Subscribed Packages </p>
                        </div>
                    ):(
                       
                            <div className="categoryLinkWrapper">
                                <p className="text-head packageMsg">Subscribed Packages </p>
                            </div>
                    )}
                

                <Subscription param={param.param} msgHandler={msgHandler} />
            </div>
            
        </section>
    );
};
export default SubscriptionContainer;