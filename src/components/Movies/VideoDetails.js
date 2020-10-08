import React, { useState, useEffect } from 'react';
import { service } from '../../network/GetVideos/service';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactHlsPlayer from 'react-hls-player';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { convertTime } from '../../Utils/utils';


var imageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
var details = []

const VideoDetails = (categoryId, episode) => {

    const history = useHistory();
    const login = useSelector((state) => state.login);
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    const [showDetails, setShowDetails] = useState([]);
    const [similarShows, setSimilarShows] = useState([]);
    const [update, setUpdate] = useState(false);
    const [episodeList, setEpisodeList] = useState([]);
    const [videoPlayer, setVideoPlayer] = useState();
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        service.getShowDetails(categoryId.categoryId.show_id).then(response => {
            console.log('RESPONSE OF SHOWS', response.data);
            var data = response.data;
            if (data.length > 0) {
                dispatch({ type: "SHOW_ID", payload: categoryId.categoryId.show_id });
                var videoDetail = '';
                var episodes = [];
                if (categoryId.categoryId.video_id) {
                    data.map((item, index) => {
                        if (item.video_id == categoryId.categoryId.video_id) {
                            setShowDetails(item);
                            videoDetail = item;
                        }
                        else {
                            episodes.push(item);
                        }
                    })
                    setEpisodeList(episodes);
                } else {
                    setCategories(data[0].category_name);
                    setShowDetails(data[0]);
                    videoDetail = data[0];
                }
                service.playerToken().then(tokenResponse => {
                    if (videoDetail.teaser) {
                        let arr = videoDetail.teaser.split('/');
                        let newURL = 'https://poppo.tv/playlist/playlist.m3u8?id=' + arr[5] + '&token=' + tokenResponse.data.data + '&type=trailer';
                        setVideoPlayer(<ReactHlsPlayer
                            id='singleVideo'
                            url={newURL}
                            autoplay={true}
                            controls={true}
                            width={'100%'}
                            height={'100%'}
                            onReady={onPlayerReady}
                            onPlay={onVideoPlay(videoDetail.video_id)}
                            onPause={onVideoPause}
                            onEnd={onVideoEnd}
                        />)
                    }
                })
                details = videoDetail;
                service.similarShow(videoDetail.video_id).then(response => {
                    if (response.status == 100 && response.data.length > 0) {
                        console.log('resposne of related videos', response.data);
                        setSimilarShows(response.data);
                    }
                })
            }
        })
        setUpdate(false);
    }, [update, login, update]);

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
                            localStorage.setItem('currentUrl', window.location.pathname);
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
    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }
    const addtoMylistFunction = (show) => {
        console.log('SHOWS', show);
        setUpdate(true);
        service.addToMyPlayList(show.show_id, 1).then(response => {
            console.log('RESPONSE OF ADDMYPLAYLIST', response);
            if (response.status === 100) {
                setUpdate(false);
            }
        })
    }
    const removeFromMylistFunction = (show) => {
        console.log('SHOWS', show);
        setUpdate(true);
        service.addToMyPlayList(show.show_id, 0).then(response => {
            if (response.status === 100) {
                setUpdate(false);
            }
            console.log('RESPONSE OF REMOVE MYPLAYLIST', response);
        })
    }
    const closeVideo = () => {
        history.goBack();
    }
    return (

        <div className="menuCloseJS closeMenuWrapper">
            <div className="videoPage">
                <div className="videoPageContainer">
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
                        style={{ backgroundImage: 'linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2))' }}>
                    </div>
                    <div className="_2xXnB" >
                        <div className="_2KWdL">
                            <section className="_1dQ5J">
                                <div className="_3tqpT">
                                    {videoPlayer}
                                    <span className="playerBackButton" onClick={closeVideo}>X</span>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="videoPageContentWrapper videoPageContentPadding">
                        <div className="vpContent">
                            <div className="container vpContainer vpDesktopContainer">
                                <div className="row vp3Section movieInfo">
                                    <div className="vpMiddleHeading">
                                        <h1 className="vpMiddleh1">{showDetails.show_name}</h1>
                                    </div>
                                    <div className="col col-2-5">
                                        <div className="vpLeftSection">
                                            {
                                                showDetails.single_video === 0 ?
                                                    <div className="vpPoster" style={{ backgroundImage: `url(${bannerSeriesUrl + showDetails.thumbnail})`, marginLeft: '3px' }}
                                                    ></div> : (
                                                        showDetails.single_video === 1 ?
                                                            <div className="vpPoster" style={{ backgroundImage: `url(${imageUrl + showDetails.thumbnail})`, marginLeft: '3px' }}
                                                            ></div>
                                                            :
                                                            null
                                                    )
                                            }
                                            <div className="vpLeftButtonWrapper vpLeftButtonMargin" style={{ marginTop: '7px' }}>
                                                <div className="vpLeftButtons">
                                                    <button className="button buttonLarge buttonBlock vpWatchSeason" style={{ height: '41px' }} onClick={() => {
                                                        history.push(
                                                            { pathname: '/videoplayer', state: { show_details: showDetails } }
                                                        )
                                                    }}>
                                                        <div className="buttonBg"></div>
                                                        <div className="buttonContent">
                                                            <div className="vpWatchSeasonText">Watch Now</div>
                                                        </div>
                                                    </button>
                                                    {
                                                        showDetails.watchlist_flag === 1 ?
                                                            (
                                                                <button className="button buttonSecondary buttonBlock vpAddButton" onClick={() => { removeFromMylistFunction(showDetails) }}>
                                                                    <div className="buttonBg"></div>
                                                                    <div className="buttonContent">Remove from My List</div>
                                                                </button>
                                                            ) :
                                                            (showDetails.watchlist_flag === null || showDetails.watchlist_flag === 0) ?
                                                                (
                                                                    <button className="button buttonSecondary buttonBlock vpAddButton" onClick={() => { addtoMylistFunction(showDetails) }}>
                                                                        <div className="buttonBg"></div>
                                                                        <div className="buttonContent">Add to My List</div>
                                                                    </button>
                                                                ) : null
                                                    }
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
                                    <div className="col col-3-5">
                                        <div className="vpMiddleInfoSection vpInfoPadding">
                                            <div className="vpLengthCensor">
                                                <div className="vpLengthYear">
                                                    {
                                                        showDetails.year &&
                                                        <div className="movieYearText">{showDetails.year}
                                                            <span className="vpYearBreak">·</span>
                                                        </div>
                                                    }
                                                    <div className="movieLength">{showDetails.video_duration && convertTime(showDetails.video_duration)}</div>
                                                </div>
                                                <div className="vpCCwrapper">
                                                    <svg className="svgIcon vpCCicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 18" style={{ fill: 'currentcolor' }}>
                                                        <g fill="currentColor" fillRule="evenodd">
                                                            <path fillRule="nonzero" d="M2 9c0 3.867 3.13 7 6.994 7h10.012C22.868 16 26 12.866 26 9c0-3.867-3.13-7-6.994-7H8.994C5.132 2 2 5.134 2 9zM0 9c0-4.97 4.027-9 8.994-9h10.012C23.973 0 28 4.028 28 9c0 4.97-4.027 9-8.994 9H8.994C4.027 18 0 13.972 0 9z"></path>
                                                            <path d="M11.844 10.195c-.088.836-.517 1.375-1.32 1.375-1.21 0-1.606-1.22-1.606-2.475 0-1.287.374-2.464 1.606-2.464.803 0 1.232.53 1.342 1.354h1.815c-.252-1.716-1.363-2.98-3.156-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.057 4.07 3.433 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88zm7.38 0c-.087.836-.516 1.375-1.32 1.375-1.21 0-1.605-1.22-1.605-2.475 0-1.287.373-2.464 1.605-2.464.803 0 1.232.53 1.342 1.354h1.815c-.253-1.716-1.364-2.98-3.157-2.98-2.42 0-3.443 1.858-3.443 4.09 0 2.278 1.056 4.07 3.432 4.07 1.804 0 3.07-1.286 3.212-2.97h-1.88z"></path>
                                                        </g>
                                                    </svg>
                                                    {showDetails.rating && <div className="movieCensorBox">{showDetails.rating}</div>}
                                                </div>
                                            </div>
                                            <div className="vpMovieCategory">
                                                <div className="vpCategoryFlex vpCategoryMargin">
                                                    {
                                                        categories.map((item, index) => {
                                                            return (
                                                                <div key={index} className="movieCensorBox vpMovieType vpMovieTypeMargin">{item}</div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="vpMiddleDesc">{showDetails.video_description}</div>
                                    </div>
                                </div>
                                <div className="row vp3Section youMayLike">
                                    <div className="col">
                                        <div>
                                            <h2>You May Also Like</h2>
                                            <div className="carousel carouselNoMask">
                                                <div className="carouselContent">
                                                    <Carousel className="row carouselRow" responsive={responsive}>
                                                        {
                                                            similarShows.map((show, index) => {
                                                                return (
                                                                    <div className="col col-3" index={index}>
                                                                        <div className="movieTile">
                                                                            <div className="movieTileImage" className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index} onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>
                                                                                <div className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                                                                    {hover === true && focusedId === index ?
                                                                                        // <Link to={{ pathname: '/videoplayer', state: { show_details: show } }}>
                                                                                        <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }} onClick={() => { functionOnclick(show) }}>
                                                                                            <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                                            <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                                                        </svg>
                                                                                        // </Link>
                                                                                        : null}
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
                                                                                        ></div>
                                                                                        {
                                                                                            show.watchlist_flag === 1 ?
                                                                                                (
                                                                                                    <div className="wishlistTextWrapper">
                                                                                                        <div className="wishlistText" onClick={() => { removeFromMylistFunction(show) }}>Remove from My List </div>
                                                                                                    </div>
                                                                                                ) :
                                                                                                (show.watchlist_flag === null || show.watchlist_flag === 0) ?
                                                                                                    (
                                                                                                        <div className="wishlistTextWrapper">
                                                                                                            <div className="wishlistText" onClick={() => { addtoMylistFunction(show) }}>Add to My List</div>
                                                                                                        </div>
                                                                                                    ) : null
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <section className="movieTextWrapper movieTextWrapperPadding">
                                                                                <div className="movieTextFlex">
                                                                                    <h3><a className="linkButton movieTextHeading" onClick={() => { functionOnclick(show) }}>{show.show_name}</a></h3>
                                                                                    <div className="movieCatYear">
                                                                                        <div style={{ marginRight: '2px' }}>
                                                                                            {
                                                                                                show.video_duration &&
                                                                                                <div className="movieYear">
                                                                                                    <div className="movieLength">{convertTime(show.video_duration)}</div>
                                                                                                </div>
                                                                                            }
                                                                                            <div className="movieCategory mcMargin" style={{ display: 'flex', marginRight: '2px' }}>

                                                                                                {
                                                                                                    show.category_name.map((item, index) => {
                                                                                                        if (index === show.category_name.length - 1) {
                                                                                                            return (<div key={index}>{item}</div>);
                                                                                                        } else {
                                                                                                            return (
                                                                                                                < div key={index} > {item}{"  "},</div>
                                                                                                            );
                                                                                                        }

                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                        <div>
                                                                                            {show.rating && <div className="movieCensorBox moviecensorText">{show.rating}</div>}
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
            </div>
        </div >
    );
}
export default VideoDetails;
