import React, { useState, useEffect } from 'react';
const RelatedVideos = () => {
    return (
        <div className="col col-4">
            <section className="vpRightSection">
                <h2>Related Titles</h2>
                <div className="vpRightWrapper">
                    <section className="movieTextWrapper vpRelatedMargin">
                        <div className="vpRelatedImage">
                            <a href="#"><img alt="Chick Chick: The Movie" src="./images/kidsTv/01.jpg" width="100%" /></a>
                        </div>
                        <div className="movieTextFlex">
                            <h3><a className="linkButton movieTextHeading" title="Chick Chick: The Movie" href="/movies/508840/chick_chick_the_movie">Chick Chick: The Movie</a></h3>
                            <div className="movieCatYear">
                                <div>
                                    <div className="movieYear">
                                        <div className="movieYearText">(2019)</div><span className="movieYearSeperator"> · </span>
                                        <div className="movieLength">32 min</div>
                                    </div>
                                    <div className="movieCategory mcMargin">
                                        <div>Kids &amp; Family, Adventure, Animation</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="movieCensorBox moviecensorText">TV-Y7</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}
export default RelatedVideos;