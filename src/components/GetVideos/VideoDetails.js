import React, { useState, useEffect } from 'react';
import RelatedVideos from './RelatedVideos';
import { service } from '../../network/GetVideos/service';
const VideoDetails =(categoryId)=>{
    useEffect(() => {
        console.log(categoryId,'cat')
        service.getShowDetails(categoryId.categoryId).then(response=>{
            console.log(response,'this is the response of show details');
        })
    }, []);
    return(
        <div className="videoPageContentWrapper videoPageContentPadding">
        <div className="vpContent">
            <div className="container vpContainer">
                <div className="row vp3Section">
                    <div className="col col-2">
                        <div className="vpLeftSection">
                            <div className="vpPoster"
                            // style="background-image: url(./images/kidstvPoster.jpg);"
                            ></div>
                            <div className="vpLeftButtonWrapper vpLeftButtonMargin">
                                <div className="vpLeftButtons">
                                    <button className="button buttonSecondary buttonBlock vpAddButton">
                                        <div className="buttonBg"></div>
                                        <div className="buttonContent">Add to My List</div>
                                    </button>
                                    <div className="vpTwoButton">
                                        <button className="button buttonTransparent vpShareButton">
                                            <div className="buttonBg"></div>
                                            <div className="buttonContent"><span>Share</span></div>
                                        </button>
                                        <button className="button buttonTransparent vpReportButton">
                                            <div className="buttonBg"></div>
                                            <div className="buttonContent">
                                                <div className="vpReport"></div>
                                            </div>
                                        </button>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-6">
                        <div className="vpMiddleHeading">
                            <h1 className="vpMiddleh1">Kids TV Cartoon Shows</h1>
                        </div>
                        <div className="vpMiddleInfoSection vpInfoPadding">
                            <div className="vpLengthCensor">
                                <div className="vpLengthYear">
                                    <div className="movieYearText">(2019)</div><span className="vpYearBreak">·</span>
                                    <div className="movieLength">43 min</div>
                                </div>
                                <div className="vpCCwrapper">
                                    <svg className="svgIcon vpCCicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 18" style={{ fill: 'currentcolor' }}>
                                        <g fill="currentColor" fillRule="evenodd">
                                            <path fillRule="nonzero" d="M2 9c0 3.867 3.13 7 6.994 7h10.012C22.868 16 26 12.866 26 9c0-3.867-3.13-7-6.994-7H8.994C5.132 2 2 5.134 2 9zM0 9c0-4.97 4.027-9 8.994-9h10.012C23.973 0 28 4.028 28 9c0 4.97-4.027 9-8.994 9H8.994C4.027 18 0 13.972 0 9z"></path>
                                            <path d="M11.844 10.195c-.088.836-.517 1.375-1.32 1.375-1.21 0-1.606-1.22-1.606-2.475 0-1.287.374-2.464 1.606-2.464.803 0 1.232.53 1.342 1.354h1.815c-.252-1.716-1.363-2.98-3.156-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.057 4.07 3.433 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88zm7.38 0c-.087.836-.516 1.375-1.32 1.375-1.21 0-1.605-1.22-1.605-2.475 0-1.287.373-2.464 1.605-2.464.803 0 1.232.53 1.342 1.354h1.815c-.253-1.716-1.364-2.98-3.157-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.056 4.07 3.432 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88z"></path>
                                        </g>
                                    </svg>
                                    <div>
                                        <div className="movieCensorBox">G</div>
                                    </div>
                                </div>
                            </div>
                            <div className="vpMovieCategory">
                                <div className="vpCategoryFlex vpCategoryMargin">
                                    <div className="movieCensorBox vpMovieType vpMovieTypeMargin">Kids &amp; Family</div>
                                    <div className="movieCensorBox vpMovieType vpMovieTypeMargin">Animation</div>
                                    <div className="movieCensorBox vpMovieType vpMovieTypeMargin">Comedy</div>
                                </div>
                            </div>
                        </div>
                        <div className="vpMiddleDesc">6 adorable animal friends known as The Loco Nuts are a comic treat as they prank each other while also being there for each other in times of trouble.</div>
                        <div className="vpMiddleCastCrew">
                            <div className="vpIndCast">
                                <div className="vpCastHeading">
                                    <div className="vpCasth1">DIRECTOR</div>
                                </div>
                                <div className="vpCastName">
                                    <a className="linkButton" href="/search/%22USP%20Studios%22">
                                        <div className="vpCastValue vpCastValueMargin">USP Studios</div>
                                    </a>
                                </div>
                                <br />
                            </div>
                            <div className="vpCastBreak"></div>
                            <div className="vpIndCast">
                                <div className="vpCastHeading">
                                    <div className="vpCasth1">STARRING</div>
                                </div>
                                <div className="vpCastName">
                                    <a className="linkButton" href="/search/%22Kids%20Channel%22">
                                        <div className="vpCastValue vpCastValueMargin">Kids Channel</div>
                                    </a>
                                    <a className="linkButton" href="/search/%22KidsTV%22">
                                        <div className="vpCastValue vpCastValueMargin">KidsTV</div>
                                    </a>
                                    <a className="linkButton" href="/search/%22Loco%20Nuts%22">
                                        <div className="vpCastValue vpCastValueMargin">Loco Nuts</div>
                                    </a>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                    <RelatedVideos/>
                </div>
            </div>
        </div>
    </div>
    );
}
export default VideoDetails;