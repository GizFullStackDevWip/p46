import React, { useState, useEffect } from 'react';
const WebPrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="menuCloseJS closeMenuWrapper">
                <div className="privacyTermsFlex privacyTermsColor privacyTermsScroll">
                    <div className="privacyTermsWidth">
                        <h1 className="privacyTermsHeading">Privacy</h1>
                        <div className="privacyTermsWrapper">
                            <div className="privacyTermsContent">
                               <p>privacy policy</p>
                            
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WebPrivacyPolicy;
