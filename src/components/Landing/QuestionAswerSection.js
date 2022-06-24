import React, { useState, useEffect } from 'react';
const QuestionAswerSection = () => {

    return (
        <div className="lpWhiteSection">
            <div className="container lpMainContainer">
                <div className="row lpFlexWrapper">
                    <div className="col col-12 col-md-8">
                        <h2 className="H1">Frequently Asked Questions</h2></div>
                </div>
                <div className="row lpFlexWrapper">
                    <div className="col col-12 col-md-6">
                        <div className="faqContainer">
                            <ul>
                                <li className="faqBoxOpened" >
                                    <div className="faqQuestion" style={{ backgroundColor: 'red' }}>What is Boondock Nation?
                                    </div>
                                    <div className="faqAnswer" style={{ backgroundColor: '#f5cce1' }}>Boondocking: an adrenaline-fueled sport that requires snowmobilers to adjust their riding styles on the fly to conquer extreme weather conditions.</div>
                                </li>
                                <li className="faqBoxOpened" >
                                    <div className="faqQuestion" style={{ backgroundColor: 'red' }}>Is Boondock Nation really free?
                                    </div>
                                    <div className="faqAnswer" style={{ backgroundColor: '#f5cce1' }}> Yes, Boondock Nation is a 100% free content video streaming application.
                                    We are powered by ad revenue, which keeps our selection of films accessible to all.
                                    Please patronize our sponsors!</div>
                                </li>
                                <li className="faqBoxOpened">
                                    <div className="faqQuestion" style={{ backgroundColor: 'red' }}>Is Boondock Nation legal?
                                    </div>
                                    <div className="faqAnswer" style={{ backgroundColor: '#f5cce1' }}>You bet! We monetize with ad support.
                                    So again, patronize our sponsors, pretty please! Our buying power speaks for us.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QuestionAswerSection;
