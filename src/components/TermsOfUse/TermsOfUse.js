import React, { useState, useEffect } from 'react';
const TermsOfUse = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="menuCloseJS closeMenuWrapper">
                <div className="privacyTermsFlex privacyTermsColor">
                    <div className="privacyTermsWidth">
                        <h1 className="privacyTermsHeading">Terms of Use</h1>
                        <div className="privacyTermsWrapper"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TermsOfUse;
