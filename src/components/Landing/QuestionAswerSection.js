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
                                    <div className="faqQuestion" style={{ backgroundColor: '#e0559c' }}>What is HappiTV?
                                    </div>
                                    <div className="faqAnswer" style={{ backgroundColor: '#f5cce1' }}>Happi TV is the streaming service made by and for members of the LGBTQ+ community.
                                    We are powered by an expansive and wide-reaching collection of Queer Cinema and TV series options tailored to the discerning,
                                    sophisticated consumer. Our content creators are the fiercest in the world! We proudly present them in a unique setting,
                                    unlike anything else in the marketplace nowadays. HappiTV is the place our community thrives!</div>
                                </li>
                                <li className="faqBoxOpened" >
                                    <div className="faqQuestion" style={{ backgroundColor: '#e0559c' }}>Is HappiTV really free?
                                    </div>
                                    <div className="faqAnswer" style={{ backgroundColor: '#f5cce1' }}> Yes, HappiTV is a content streaming platform application.
                                    We are powered by ad revenue, which keeps our vast selection of films and television series accessible to all.
                                    Please help support our sponsors!</div>
                                </li>
                                {/* <li className="faqBoxOpened">
                                    <div className="faqQuestion" style={{ backgroundColor: '#e0559c' }}>Is HappiTV legal?
                                    </div>
                                    <div className="faqAnswer" style={{ backgroundColor: '#f5cce1' }}>You bet! We monetize with ad support.
                                    So again, patronize our sponsors, pretty please! Our buying power speaks for us.
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QuestionAswerSection;
