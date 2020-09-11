import React, { useState, useEffect } from 'react';
const ShowThumbnail = () => {
    useEffect(() => {
    }, []);
    return (
        <div className="col col-1-5">
            <div className="vpLeftSection">
                <div className="vpPoster" style={{ backgroundImage: 'url(./images/transylvania/poster.jpg)' }}></div>
                <div className="vpLeftButtonWrapper vpLeftButtonMargin">
                    <button className="button buttonLarge buttonBlock vpWatchSeason">
                        <div className="buttonBg"></div>
                        <div className="buttonContent">
                            <div className="vpWatchSeasonText">Watch S01:E07</div>
                        </div>
                    </button>
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
    );
}
export default ShowThumbnail;