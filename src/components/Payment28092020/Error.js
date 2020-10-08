import React, { useState, useEffect } from 'react';
import Header from '../Basic/Header';
import Footer from '../Basic/Footer';
import { service } from '../../network/service';
const Error = () => {
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
       
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
                                     <div className="icon-box" style={{backgroundColor: '#f2110f'}}>
                                        <i className="material-icons" style={{top: '-5px'}}>&#10005;</i>
                                    </div>				
                                    <h4 className="modal-title w-100">Error!</h4>	
                                </div>
                                 <div className="modal-body">
                                    <p className="text-center">Your payment has been failed. Please try again..</p>
                                </div>
                                 <div className="modal-footer">
                                    <button className="btn btn-success btn-block" style={{backgroundColor: '#f2110f'}} data-dismiss="modal">OK</button>
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
export default Error;