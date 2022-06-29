import React, { useState, useEffect } from 'react';
const WebTermsOfUse = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="menuCloseJS closeMenuWrapper">
                <div className="privacyTermsFlex privacyTermsColor">
                    <div className="privacyTermsWidth">
                        <h1 className="privacyTermsHeading">Terms of Use</h1>
                        <div className="privacyTermsWrapper">
                            <div className="privacyTermsContent">
                               <p>Project 46 Terms of use</p>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WebTermsOfUse;
