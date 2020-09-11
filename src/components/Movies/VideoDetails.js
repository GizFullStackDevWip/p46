import React, { useState, useEffect } from 'react';
import { service } from '../../network/GetVideos/service';
import VideoPlayer from 'react-video-js-player';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
var imageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var details = []
const VideoDetails = (categoryId) => {
    const [showDetails, setShowDetails] = useState([]);
    const [similarShows, setSimilarShows] = useState([]);
    useEffect(() => {
        service.getShowDetails(categoryId.categoryId).then(response => {
            console.log(response.data, 'this is the response of show details');
            setShowDetails(response.data[0]);
            details = response.data[0]
            service.similarShow(response.data[0].video_id).then(response => {
                console.log(response.data, 'response of similar shows');
                setSimilarShows(response.data);
            })
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
    const onPlayerReady = () => {
        console.log(details, 'f');
        service.onVideoPlayFunction(details).then(response => {
            console.log(response, 'onVideoPlayFunction');
        })
    }
    const onVideoPlay = () => {
        console.log(details, 'f');
        service.onVideoPlayFunction(details).then(response => {
            console.log(response, 'onVideoPlayFunction');
        })
    }
    const onVideoPause = () => {
        console.log(details, 'f');
        service.onVideoPlayFunction(details).then(response => {
            console.log(response, 'onVideoPlayFunction');
        })
    }
    const onVideoEnd = () => {
        console.log(details, 'f');
        service.onVideoPlayFunction(details).then(response => {
            console.log(response, 'onVideoPlayFunction');
        })
    }

    const functionOnclick =(showId)=>{
        service.getShowDetails(showId).then(response => {
            console.log(response.data, 'this is the response of show details');
            setShowDetails(response.data[0]);
            details = response.data[0]
            service.similarShow(response.data[0].video_id).then(response => {
                console.log(response.data, 'response of similar shows');
                setSimilarShows(response.data);
            })
        })
    }
    return (
        <div className="videoPageContainer">
            <div className="videoPageBGimg"
            // style={{ backgroundImage: `url(${imageUrl + showDetails.thumbnail})` }}
            // style="background-image: linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2)), url(./images/kidstvBG.jpg);"
            ></div>
            <div className="_2xXnB">
                <div className="_2KWdL">
                    <section className="_1dQ5J">
                        <div className="_3tqpT" style={{ height: '100%' }}>
                            <VideoPlayer
                                config={{
                                    file: {
                                        hlsOptions: {
                                            forceHLS: true,
                                            debug: false
                                        },
                                    },
                                }}
                                // controls={true}
                                src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                                // poster={this.state.video.poster}
                                width="1190"
                                height="660"
                            // onReady={onPlayerReady}
                            // onPlay={onVideoPlay}
                            // onPause={onVideoPause}
                            // onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                            // onSeeking={this.onVideoSeeking.bind(this)}
                            // onSeeked={this.onVideoSeeked.bind(this)}
                            // onEnd={onVideoEnd}
                            />
                        </div>
                    </section>
                </div>
            </div>

            <div className="videoPageContentWrapper videoPageContentPadding">
                <div className="vpContent">
                    <div className="container vpContainer">
                        <div className="row vp3Section">
                            <div className="col col-1-5">
                                <div className="vpLeftSection">
                                    <div className="vpPoster" style={{ backgroundImage: `url(${imageUrl + showDetails.thumbnail})` }}
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
                            <div className="col col-4-5">
                                <div className="vpMiddleHeading">
                                    <h1 className="vpMiddleh1">{showDetails.show_name}</h1>
                                </div>
                                <div className="vpMiddleInfoSection vpInfoPadding">
                                    <div className="vpLengthCensor">
                                        <div className="vpLengthYear">
                                            <div className="movieYearText">{showDetails.year}</div><span className="vpYearBreak">·</span>
                                            <div className="movieLength">{showDetails.video_duration} min</div>
                                        </div>
                                        <div className="vpCCwrapper">
                                            <svg className="svgIcon vpCCicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 18" style={{ fill: 'currentcolor' }}>
                                                <g fill="currentColor" fillRule="evenodd">
                                                    <path fillRule="nonzero" d="M2 9c0 3.867 3.13 7 6.994 7h10.012C22.868 16 26 12.866 26 9c0-3.867-3.13-7-6.994-7H8.994C5.132 2 2 5.134 2 9zM0 9c0-4.97 4.027-9 8.994-9h10.012C23.973 0 28 4.028 28 9c0 4.97-4.027 9-8.994 9H8.994C4.027 18 0 13.972 0 9z"></path>
                                                    <path d="M11.844 10.195c-.088.836-.517 1.375-1.32 1.375-1.21 0-1.606-1.22-1.606-2.475 0-1.287.374-2.464 1.606-2.464.803 0 1.232.53 1.342 1.354h1.815c-.252-1.716-1.363-2.98-3.156-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.057 4.07 3.433 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88zm7.38 0c-.087.836-.516 1.375-1.32 1.375-1.21 0-1.605-1.22-1.605-2.475 0-1.287.373-2.464 1.605-2.464.803 0 1.232.53 1.342 1.354h1.815c-.253-1.716-1.364-2.98-3.157-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.056 4.07 3.432 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88z"></path>
                                                </g>
                                            </svg>
                                            <div>
                                                <div className="movieCensorBox">{showDetails.rating}</div>
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
                                <div className="vpMiddleDesc">{showDetails.video_description}</div>
                                <div className="vpMiddleCastCrew">
                                    <div className="vpIndCast">
                                        <div className="vpCastHeading">
                                            <div className="vpCasth1">DIRECTOR</div>
                                        </div>
                                        <div className="vpCastName">
                                            <a className="linkButton" href="/search/%22USP%20Studios%22">
                                                <div className="vpCastValue vpCastValueMargin">{showDetails.director}</div>
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
                                                <div className="vpCastValue vpCastValueMargin">{showDetails.show_cast}</div>
                                            </a>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                                <div>
                                    <h2>You May Also Like</h2>
                                    <div className="carousel carouselNoMask">
                                        <div className="carouselContent">
                                            <Carousel className="row carouselRow" responsive={responsive}>
                                                {
                                                    similarShows.map((show, index) => {
                                                        return (
                                                            <div className="col col-3" key={index}>
                                                                <div className="movieTile">
                                                                    <div className="movieTileImage">
                                                                        <a className="movieTileIcon movieTileHover" href="/movies/321882/coloring_books_with_om_nom">
                                                                            <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}>
                                                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                                            </svg>
                                                                        </a>
                                                                        {/* <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }}> */}
                                                                            <div className="moviePoster" onClick={()=>{functionOnclick(show.show_id)}}
                                                                                style={{ backgroundImage: `url(${imageUrl + show.logo})` }}
                                                                            >
                                                                                <div className="FeNml"></div>
                                                                            </div>
                                                                        {/* </Link> */}
                                                                        <div className="wishlistPosition wishlistTranslate wishlistParentClose">
                                                                            <div className="wishlistButton">
                                                                                <div className="wlgradientPosition wlgradientTranslate wlgradientClose"
                                                                                    style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))', backgroundPosition: 'center bottom', backgroundSize: 'cover' }}
                                                                                >
                                                                                </div>
                                                                                <div className="wishlistTextWrapper">
                                                                                    <div className="wishlistText">Add to My List</div>
                                                                                    <noscript></noscript>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <section className="movieTextWrapper movieTextWrapperPadding">
                                                                        <div className="movieTextFlex">
                                                                            <h3><a className="linkButton movieTextHeading" title="Coloring Books with Om Nom" href="/movies/321882/coloring_books_with_om_nom">{show.show_name}</a></h3>
                                                                            <div className="movieCatYear">
                                                                                <div>
                                                                                    <div className="movieYear">
                                                                                        <div className="movieLength">{show.duration} min</div>
                                                                                    </div>
                                                                                    <div className="movieCategory mcMargin">
                                                                                        {
                                                                                            show.category_name.map((item, index) => {
                                                                                                return (
                                                                                                    <div key={index}>{item},</div>
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="movieCensorBox moviecensorText">TV-PG</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
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
export default VideoDetails;