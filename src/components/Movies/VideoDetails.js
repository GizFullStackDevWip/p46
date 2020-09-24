import React, { useState, useEffect } from 'react';
import { service } from '../../network/GetVideos/service';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactHlsPlayer from 'react-hls-player';
import { Link, useHistory } from 'react-router-dom';

var imageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
var details = []
var time = ''

const VideoDetails = (categoryId, episode) => {

    const history = useHistory();
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    const [showDetails, setShowDetails] = useState([]);
    const [similarShows, setSimilarShows] = useState([]);
    const [update, setUpdate] = useState(false);
    const [episodeList, setEpisodeList] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const [videoPlayer, setVideoPlayer] = useState();
    const [trailerVideoPlayer, setTrailerVideoPlayer] = useState();

    useEffect(() => {
        service.getShowDetails(categoryId.categoryId.show_id).then(response => {
            var data = response.data;
            if (data.length > 0) {
                var videoDetail = ''
                var episodes = []
                if (categoryId.categoryId.video_id) {
                    data.map((item, index) => {
                        if (item.video_id == categoryId.categoryId.video_id) {
                            setShowDetails(item);
                            videoDetail = item
                        }
                        else {
                            episodes.push(item);
                        }
                    })
                    setEpisodeList(episodes);
                } else {
                    setShowDetails(data[0]);
                    videoDetail = data[0];
                }
                service.playerToken().then(tokenResponse => {
                    let arr = videoDetail.video_name.split('/');
                    let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[5] + '&token=' + tokenResponse.data.data + '&type=video';
                    setVideoPlayer(<ReactHlsPlayer
                        id='singleVideo'
                        url={newURL}
                        autoplay={false}
                        controls={true}
                        width={'100%'}
                        height={'100%'}
                        onReady={onPlayerReady}
                        onPlay={onVideoPlay(videoDetail.video_id)}
                        onPause={onVideoPause}
                        onEnd={onVideoEnd}
                    />)
                    let arrTrailer = videoDetail.video_name.split('/');
                    let newTrailerURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arrTrailer[5] + '&token=' + tokenResponse.data.data + '&type=video';
                    setTrailerVideoPlayer(<ReactHlsPlayer
                        id='singleVideo'
                        url={newTrailerURL}
                        autoplay={false}
                        controls={true}
                        width={'100%'}
                        height={'100%'}
                        onReady={onPlayerReady}
                        onPlay={onVideoPlay(videoDetail.video_id)}
                        onPause={onVideoPause}
                        onEnd={onVideoEnd}
                    />)
                })
                details = videoDetail
                service.similarShow(videoDetail.video_id).then(response => {
                    if (response.status == 100 && response.data.length > 0) {
                        setSimilarShows(response.data);
                    }
                })
            }
        })
        setUpdate(false);
    }, [update]);

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
        service.onVideoPlayFunction(details).then(response => {
        })
    }

    const onVideoPlay = (videoId) => {
        service.checkVideoSubscription(videoId).then(response => {
            let videoDetails = response.data[0];
            if (videoDetails.premium_flag == 1 || videoDetails.payper_flag == 1 || videoDetails.rental_flag == 1) {
                service.checkUserSubscription().then(useResponse => {
                    if (useResponse.data.length == 0) {
                        let isLoggedIn = localStorage.getItem('isLoggedIn');
                        if (isLoggedIn == 'false') {
                            history.push({
                                pathname: '/signin'
                            });
                        }
                        // window.location.href = 'http://stagingweb.gethappi.tv/homeSub?sh=' + videoId;
                    }
                    if (useResponse.forcibleLogout === true) {
                        // signOut()
                    }
                })
            } else {
                console.log('playing...')
            }
        })
        service.onVideoPlayFunction(details).then(response => {
        })
    }

    const signOut = () => {
        let ui = localStorage.getItem('userId')
        setTimeout(function () {
            eraseCookie('userName');
            eraseCookie('userId');
            eraseCookie('userEmail');
            eraseCookie('subscriptionId');
        }, 10);
        setTimeout(function () {
            // history.push({
            //     pathname: '/signin'
            // });
            // window.location.href = "http://stagingweb.gethappi.tv/login?lo=1&ui=" + ui;
        }, 100);
    }

    const eraseCookie = (name) => {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    const onVideoPause = () => {
        service.onVideoPlayFunction(details).then(response => {
        })
    }
    const onVideoEnd = () => {
        service.onVideoPlayFunction(details).then(response => {
        })
    }

    const functionOnclick = (show) => {
        if (show.single_video == 1) {
            history.push({
                pathname: '/home/movies',
                search: encodeURI(`show_id=${show.show_id}`)
            });
        } else if (show.single_video == 0) {
            history.push({
                pathname: '/home/series',
                search: encodeURI(`show_id=${show.show_id}`)
            });
        }
        setUpdate(true);
    }
    const watchEpisode = (show) => {
        history.push({
            pathname: '/home/movies',
            search: encodeURI(`show_id=${show.show_id}&video_id=${show.video_id}`)
        });
        setUpdate(true);
    }


    const playTrailerFunction = () => {
        setShowTrailer(true);
    }

    const stopTrailerFunction = () => {
        setShowTrailer(false);
    }

    const convertTime = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";

        console.log(hDisplay + mDisplay + sDisplay, 'jjjj');
        time = hDisplay + mDisplay + sDisplay;

        // return hDisplay + mDisplay + sDisplay; 
    }
    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }
    return (
        <div className="videoPageContainer" >
            {
                showDetails.single_video === 0 ?
                    <div className="videoPageBGimg"
                        style={{ backgroundImage: `url(${bannerSeriesUrl + showDetails.thumbnail})` }}
                    ></div> : (
                        showDetails.single_video === 1 ?
                            <div className="videoPageBGimg"
                                style={{ backgroundImage: `url(${imageUrl + showDetails.thumbnail})` }}
                            ></div>
                            :
                            null
                    )
            }
            <div className="videoPageBGimg"
                style={{ backgroundImage: 'linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2))' }}
            ></div>
            <div className="_2xXnB" >
                <div className="_2KWdL">
                    <section>
                        <div className="_3tqpT" style={{ height: '100%' }}>
                            {videoPlayer}
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
                                    {
                                        showDetails.single_video === 0 ?
                                            <div className="vpPoster" style={{ backgroundImage: `url(${bannerSeriesUrl + showDetails.thumbnail})` }}
                                            ></div> : (
                                                showDetails.single_video === 1 ?
                                                    <div className="vpPoster" style={{ backgroundImage: `url(${imageUrl + showDetails.thumbnail})` }}
                                                    ></div>
                                                    :
                                                    null
                                            )
                                    }
                                    <div className="vpLeftButtonWrapper vpLeftButtonMargin">
                                        <div className="vpLeftButtons">
                                            <button className="button buttonSecondary buttonBlock vpAddButton">
                                                <div className="buttonBg"></div>
                                                <div className="buttonContent">Add to My List</div>
                                            </button>
                                            <button className="button buttonSecondary buttonBlock vpAddButton" onClick={playTrailerFunction}>
                                                <div className="buttonBg"></div>
                                                <div className="buttonContent">Trailer</div>
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
                                            {
                                                showDetails.year &&
                                                <div className="movieYearText">{showDetails.year}
                                                <span className="vpYearBreak">·</span>
                                                </div>
                                            }

                                            {
                                                convertTime(showDetails.video_duration)
                                            }
                                            <div className="movieLength">{time}</div>
                                        </div>
                                        <div className="vpCCwrapper">
                                            <svg className="svgIcon vpCCicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 18" style={{ fill: 'currentcolor' }}>
                                                <g fill="currentColor" fillRule="evenodd">
                                                    <path fillRule="nonzero" d="M2 9c0 3.867 3.13 7 6.994 7h10.012C22.868 16 26 12.866 26 9c0-3.867-3.13-7-6.994-7H8.994C5.132 2 2 5.134 2 9zM0 9c0-4.97 4.027-9 8.994-9h10.012C23.973 0 28 4.028 28 9c0 4.97-4.027 9-8.994 9H8.994C4.027 18 0 13.972 0 9z"></path>
                                                    <path d="M11.844 10.195c-.088.836-.517 1.375-1.32 1.375-1.21 0-1.606-1.22-1.606-2.475 0-1.287.374-2.464 1.606-2.464.803 0 1.232.53 1.342 1.354h1.815c-.252-1.716-1.363-2.98-3.156-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.057 4.07 3.433 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88zm7.38 0c-.087.836-.516 1.375-1.32 1.375-1.21 0-1.605-1.22-1.605-2.475 0-1.287.373-2.464 1.605-2.464.803 0 1.232.53 1.342 1.354h1.815c-.253-1.716-1.364-2.98-3.157-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.056 4.07 3.432 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88z"></path>
                                                </g>
                                            </svg>
                                            <div>
                                                {
                                                    showDetails.rating &&
                                                    <div className="movieCensorBox">{showDetails.rating}</div>
                                                }
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
                                {
                                    showDetails.single_video === 0 &&
                                    <div>
                                        <h3 className="seasonTitle">Season 1</h3>
                                        <Carousel responsive={responsive}>
                                            {
                                                episodeList.map((episode, index) => {
                                                    return (
                                                        <div className="carousel carouselNoMask seasonCarouselWrapper" key={index}>
                                                            <div className="carouselContent"></div>
                                                            <div className="row carouselRow" style={{ padding: '12px' }}>
                                                                <div className="seasonTileImgWrapper" onClick={() => { watchEpisode(episode) }} style={{ cursor: 'pointer' }}>
                                                                    <img src={bannerSeriesUrl + episode.thumbnail} />
                                                                    <div className="seasonTileImgExtra"></div>
                                                                    <div className="seasonTileHeading" style={{ color: 'white', fontSize: '1rem' }}>{episode.video_title}</div>
                                                                    <div className="seasonTilePara">{episode.video_description}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Carousel>
                                    </div>
                                }

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
                                                                    <div className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index} onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>
                                                                        <div className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                                                        {hover === true && focusedId === index ?
                                                                            <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }} onClick={() => { functionOnclick(show) }}>
                                                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                                            </svg>
                                                                            :null}
                                                                        </div>
                                                                        {
                                                                            show.single_video === 0 ?
                                                                                <div className="moviePoster" 
                                                                                    style={{ backgroundImage: `url(${bannerSeriesUrl + show.logo})` }}>
                                                                                    <div className="FeNml"></div>
                                                                                </div> : (
                                                                                    show.single_video === 1 ?
                                                                                        <div className="moviePoster" 
                                                                                            style={{ backgroundImage: `url(${imageUrl + show.logo})` }}>
                                                                                            <div className="FeNml"></div>
                                                                                        </div>
                                                                                        :
                                                                                        null)
                                                                        }
                                                                        <div className={hover === true && focusedId === index ? "wishlistPosition wishlistTranslate wishlistParentOpen" : "wishlistPosition wishlistTranslate wishlistParentClose"}>
                                                                            <div className="wishlistButton">
                                                                                <div className={hover === true && focusedId === index ? "wlgradientPosition wlgradientTranslate wlgradientOpen" : "wlgradientPosition wlgradientTranslate wlgradientClose"}
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
                                                                                    <div className="movieCensorBox moviecensorText">{show.rating}</div>
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
            {
                showTrailer &&
                <div>
                    <div className="modal-overlay" />
                    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={stopTrailerFunction} >
                        <div className="modal-header">
                            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={stopTrailerFunction} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="_2xXnB" >
                            <div className="_2KWdL">
                                <section>
                                    <div className="_3tqpT" style={{ height: '100%' }}>
                                        {trailerVideoPlayer}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}
export default VideoDetails;
