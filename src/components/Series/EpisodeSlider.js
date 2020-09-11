import React, { useState, useEffect } from 'react';
const EpisodeSlider = () => {
    useEffect(() => {
    }, []);
    return (
        <div>
            <h3 className="seasonTitle">Season 1</h3>
            <div className="carousel carouselNoMask seasonCarouselWrapper">
                <div className="carouselContent">
                    <div className="row carouselRow" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'none 0s ease 0s' }}>
                        <div className="col col-6 col-lg-4 seasonTileWrapper">
                            <div className="seasonTileImgWrapper"
                                style={{ backgroundImage: 'url(./images/transylvania/01.jpg)' }}>
                                <div className="seasonTileImgExtra"></div>
                                <a className="seasonTilePlay" href="/tv-shows/490035/s01_e07_beach_blanket_kink_oh?start=true">
                                    <svg className="svgIcon seasonTileSVG" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}>
                                        <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                        <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                    </svg>
                                </a>
                            </div>
                            <a className="linkButton" href="/tv-shows/490035/s01_e07_beach_blanket_kink_oh?start=true">
                                <div className="seasonTileHeading">S01:E07 - Beach Blanket Kink-Oh!</div>
                            </a>
                            <div className="seasonTilePara">When Batfink discovers a back-door into the station's film library, his first inclination is to chase down his surf-movie crush Annette Funicello. Dwayne introduces the boys to his new paramour. VB and Furry face off with a mirror-bound demon (MST3K's Trace Beaulieu) in an off-kilter version of rock paper scissors.</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default EpisodeSlider;