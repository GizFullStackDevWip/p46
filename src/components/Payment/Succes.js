import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Basic/Header';
import Footer from '../Basic/Footer';
import { service } from '../../network/service';
const Success = () => {
    const history = useHistory();
    const [isSucess, setIsSucces] = useState(false);
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        let isAndroid = localStorage.getItem('isAndroid');
        var urlParams = new URLSearchParams(window.location.search);
        var sessionId = urlParams.get("session_id");
        let paypalData = urlParams.get("amt");
        if (sessionId) {
            service.stripeDecode(sessionId).then(response => {
                service.paymentUpdate(response.data.subscription, 'stripe', 'success').then(response => {
                    if (response.status == 100) {
                        let isAndroid = localStorage.getItem('isAndroid');
                        if (isAndroid == 'true') {
                            window.location.href = '';  // android success redirect
                        } else {
                            setIsSucces(true);
                        }
                    } else {
                        service.paymentUpdate(response.data.subscription, 'stripe', 'failed').then(response => {
                            if (response.status == 100) {
                                let isAndroid = localStorage.getItem('isAndroid');
                                if (isAndroid == 'true') {
                                    window.location.href = '';  // android error redirect
                                }
                            }
                        });

                    }
                });
            });

        } else if (paypalData) {
            setInterval(async () => {
               const result = await service.paypalSubscription().then(response => {
                    if (response.status == 101) {
                        let isAndroid = localStorage.getItem('isAndroid');
                        if (isAndroid == 'true') {
                            window.location.href = '';  // android succes redirect
                        }
                    }
                });
            }, 10 * 1000);
        }

    }, []);
    const handleClick = () => {
        // success redirect
    }
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="container" style={{ marginTop: '90px' }}>
                        <div className="card">
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
                                                <button className="btn btn-success btn-block" onClick={handleClick} data-dismiss="modal">OK</button>
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