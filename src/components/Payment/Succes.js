import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Basic/Header';
import Footer from '../Basic/Footer';
import { useDispatch } from 'react-redux';
import { service } from '../../network/service';
import './Success.css';
const Success = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isSucess, setIsSucces] = useState(false); //false
    const [isLoading, setIsLoading] = useState(true); //true
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        let isAndroid = localStorage.getItem('isAndroid');
        var urlParams = new URLSearchParams(window.location.search);
        var sessionId = urlParams.get("session_id");
        // let paypalData = urlParams.get("amt");  // live
        let paypalData;
        // sandbox
        if(urlParams.get("token")) {
            paypalData = urlParams.get("token")
        } else if (urlParams.get("PayerID")) {
            paypalData = urlParams.get("PayerID")
        } else if (urlParams.get("amt")) {
            paypalData = urlParams.get("amt")
        }
        if ( localStorage.getItem('isAndroid')=='true'){
            dispatch({ type: "SET_ANDROID" });
        }
        if (sessionId) {
            service.stripeDecode(sessionId).then(response => {
                console.log('decoderes', response, response.subscription)
                if (response.data.subscription) {
                    let subscription = response.data.subscription;
                    service.paymentUpdate(subscription, 'stripe', 'success').then(response => {
                        if (response.status == 200) {
                            let isAndroid = localStorage.getItem('isAndroid');
                            if (isAndroid == 'true') {
                                window.location.href = 'https://gethappi.tv/webviewsuccess';  // android success redirect
                            } else {
                                setIsLoading(false);
                                setIsSucces(true);
                            }
                        } else {
                            service.paymentUpdate(subscription, 'stripe', 'failed').then(response => {
                                if (response.status == 100) {
                                    let isAndroid = localStorage.getItem('isAndroid');
                                    if (isAndroid == 'true') {
                                        window.location.href = 'https://gethappi.tv/webviewsuccess';  // android error redirect
                                    } else {
                                        setIsLoading(false);
                                        setIsSucces(true);
                                    }
                                } else {
                                    let isAndroid = localStorage.getItem('isAndroid');
                                    if (isAndroid == 'true') {
                                        window.location.href = 'https://gethappi.tv/webviewfailed';  // android error redirect
                                    } else {
                                        console.log('goes to error page 1')
                                        history.push('/error');
                                    }
                                }
                            });

                        }
                    });
                } else {
                    let isAndroid = localStorage.getItem('isAndroid');
                    if (isAndroid == 'true') {
                        window.location.href = 'https://gethappi.tv/webviewfailed';  // android error redirect
                    } else {
                        console.log('goes to error page 2')
                        history.push('/error');
                    }
                }
            });

        } else if (paypalData) {
            let subID = localStorage.getItem('selectedSubId');

            var myInterval = setInterval(async () => {
                const result = await service.paypalSubscription(subID).then(response => {
                    if (response.status == 201) {
                        setIsLoading(false);
                        setIsSucces(true);
                        clearInterval(myInterval);
                        let isAndroid = localStorage.getItem('isAndroid');
                        if (isAndroid == 'true') {
                            window.location.href = 'https://gethappi.tv/webviewsuccess';  // android succes redirect
                        }
                    }
                });
            }, 10 * 1000);
        }

    }, []);
    const handleClick = () => {
        let showId = service.getCookie('showId');
        history.push
            ({ pathname: '/home/movies', search: encodeURI(`show_id=${showId}`) });
       
    }
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="container" style={{ marginTop: '90px' }}>
                        <div className="card">
                            {
                                isLoading && (
                                    <div className="mycontainer">
                                          {/* <div className='payment-update'> */}
                                        <div className="modal-dialog modal-confirm" style={{paddingRight: "70px"}}>
                                          
                                            <div className="modal-content">

                                                <div className="modal-body">
                                                    <div className="d-flex align-items-center">
                                                        <strong>Your payment will be updated soon.... </strong>
                                                        <div className="spinner-border ml-auto" role="status" aria-hidden="true" style={{color: '#219cb2'}}></div>
                                                    </div>
                                                {/* </div> */}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {isSucess && (
                                <div className="mycontainer">
                                    <div className="modal-dialog modal-confirm">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <div className="icon-box">
                                                    <i className="material-icons">&#xE876;</i>
                                                </div>
                                                <h4 className="modal-title w-100">Success!</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p className="text-center">Your payment has been confirmed. Enjoy the videos.</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="myBtn1 btn-success btn-block" style={{height: '50px'}}  onClick={handleClick} data-dismiss="modal">OK</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};
export default Success;