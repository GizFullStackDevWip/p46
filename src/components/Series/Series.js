import React, { useState, useEffect } from 'react';
import { service } from '../../network/Series/service';
import { useParams, useLocation, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const queryString = require('query-string');
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';

const Series = () => {
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    const [showDetails, setShowDetails] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    console.log(parsed.show_id);
    useEffect(() => {
        window.scrollTo(0, 0);
        service.getShowDetails(parsed.show_id).then(response => {
            if (response.status == 100 && response.data.length > 0) {
                setEpisodes(response.data);
                setShowDetails(response.data[0]);
            }
        })
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div class="pageWrapper searchPageMain">
            <div class="topContainer">
                <div className="menuCloseJS closeMenuWrapper">
                    <div className="moviePageWrapper">
                        <div className="moviePageBG"
                            style={{ backgroundImage: `url(${bannerSeriesUrl + showDetails.thumbnail})` }}
                        ></div> <div className="moviePageBG"
                            style={{ backgroundImage: 'linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2))' }}
                        ></div>
                        <div className="moviePageContainer">
                            <div className="vpContent">
                                <div className="container vpContainer">
                                    <div className="row vp3Section">
                                        <div className="col col-1-5">
                                            <div className="vpLeftSection">
                                                <div className="vpPoster"
                                                    style={{ backgroundImage: `url(${bannerSeriesUrl + showDetails.thumbnail})` }}
                                                ></div>
                                                <div className="vpLeftButtonWrapper vpLeftButtonMargin">
                                                    <button className="button buttonLarge buttonBlock vpWatchSeason">
                                                        <div className="buttonBg"></div>
                                                        <div className="buttonContent">
                                                            <div className="vpWatchSeasonText">Watch</div>
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-4-5">
                                            <div className="vpMiddleHeading">
                                                <h1 className="vpMiddleh1">{showDetails.show_name}</h1></div>
                                            <div className="vpMiddleInfoSection vpInfoPadding">
                                                <div className="vpLengthCensor">
                                                    <div className="vpLengthYear">
                                                        <div className="movieYearText">{showDetails.year}</div>
                                                    </div>
                                                    <div className="vpCCwrapper">
                                                        <div>
                                                            <div className="movieCensorBox">{showDetails.rating}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="vpMovieCategory">
                                                    <div className="vpCategoryFlex vpCategoryMargin">
                                                        <div className="movieCensorBox vpMovieType vpMovieTypeMargin">Comedy</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="vpMiddleDesc">{showDetails.video_description}</div>
                                            <div className="vpMiddleCastCrew">
                                                <div className="vpIndCast">
                                                    <div className="vpCastHeading">
                                                        <div className="vpCasth1">DIRECTOR</div>
                                                    </div>
                                                    <div className="vpCastName">
                                                        <div className="linkButton">
                                                            <div className="vpCastValue vpCastValueMargin">{showDetails.director}</div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                                <div className="vpCastBreak"></div>
                                                <div className="vpIndCast">
                                                    <div className="vpCastHeading">
                                                        <div className="vpCasth1">STARRING</div>
                                                    </div>
                                                    <div className="vpCastName">
                                                        <div className="linkButton">
                                                            <div className="vpCastValue vpCastValueMargin">{showDetails.show_cast}</div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                            <h3 className="seasonTitle">Season 1</h3>
                                            <Carousel responsive={responsive}>
                                                {
                                                    episodes.map((episode, index) => {
                                                        return (
                                                            <div className="carousel carouselNoMask seasonCarouselWrapper" key={index}>
                                                                <div className="carouselContent"></div>
                                                                <div className="row carouselRow" style={{ padding: '20px' }}>
                                                                    <div className="seasonTileImgWrapper">
                                                                        <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${episode.show_id}&video_id=${episode.video_id}`) }}>
                                                                            <img src={bannerSeriesUrl + episode.thumbnail} />
                                                                        </Link>
                                                                        <div className="seasonTileImgExtra"></div>
                                                                        <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${episode.show_id}&video_id=${episode.video_id}`) }}>
                                                                            <div className="seasonTileHeading" style={{ color: 'white', fontSize: '1rem' }}>{episode.video_title}</div>
                                                                        </Link>
                                                                        <div className="seasonTilePara">{episode.video_description}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Series;
