import React, { useState, useEffect } from 'react';
import Header from '../Basic/Header';
import Footer from '../Basic/Footer';
import { service } from '../../network/service';
const Success = () => {
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        var urlParams = new URLSearchParams(window.location.search);
      var sessionId = urlParams.get("session_id")
      if (sessionId) {

        console.log(sessionId)
      }

    }, []);
    
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="container" style={{marginTop: '90px'}}>
                     <div className="card">
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
                                    <button className="btn btn-success btn-block" data-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                        
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};
export default Success;