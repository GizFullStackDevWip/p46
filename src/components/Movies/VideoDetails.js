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
    const [share, setShare] = useState(false);
    const [other, setOther] = useState(false);
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
            setEpisodeList(response.data);
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
                    // setEpisodeList(episodes);
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
                            autoplay={false}
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
        history.push({
            pathname: '/home/movies',
            search: encodeURI(`show_id=${show.show_id}`)
        });
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
    return (

        <div className="menuCloseJS closeMenuWrapper">
            <div className="videoPage">
                <div className="videoPageContainer">
                    {
                        showDetails.single_video === 0 ?
                            <div className="videoPageBGimg"
                                style={{ backgroundImage: `url(${bannerSeriesUrl + showDetails.logo})` }}
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
                                                    <div className="vpPoster" style={{ backgroundImage: `url(${bannerSeriesUrl + showDetails.logo})`, marginLeft: '7px' }}
                                                    ></div> : (
                                                        showDetails.single_video === 1 ?
                                                            <div className="vpPoster" style={{ backgroundImage: `url(${imageUrl + showDetails.thumbnail})`, marginLeft: '7px' }}
                                                            ></div>
                                                            :
                                                            null
                                                    )
                                            }
                                            <div className="vpLeftButtonWrapper vpLeftButtonMargin" style={{ marginTop: '7px' }}>
                                                <div className="vpLeftButtons">
                                                    {
                                                        showDetails.single_video === 1 ?
                                                            (<button className="button buttonLarge buttonBlock vpWatchSeason" style={{ height: '41px' }} onClick={() => {
                                                                history.push(
                                                                    { pathname: '/videoplayer', state: { show_details: showDetails } }
                                                                )
                                                            }}>
                                                                <div className="buttonBg"></div>
                                                                <div className="buttonContent">
                                                                    <div className="vpWatchSeasonText">Watch Now</div>
                                                                </div>
                                                            </button>) : null
                                                    }

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
                                                        <button className="button buttonTransparent vpShareButton" onClick={() => { setShare(!share) }}>
                                                            <div className="buttonBg"></div>
                                                            <div className="buttonContent"><span>Share</span></div>
                                                        </button>
                                                        <button className="button buttonTransparent vpReportButton" onClick={() => { setOther(!other) }}>
                                                            <div className="buttonBg"></div>
                                                            <div className="buttonContent">
                                                                <div className="vpReport"></div>
                                                            </div>
                                                        </button>
                                                        {
                                                            share === true ?
                                                                <div>
                                                                    <div class="_1TcfH _1Dgjh" style={{ left: '7px' }}>
                                                                        <a href="https://www.facebook.com/GetHappiTV" rel="noopener" target="_blank" class="ATag _1H0lX _135ID _3Dyhl">
                                                                            <svg className="svgIcon facebookIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style={{ fill: 'currentcolor' }}>
                                                                                <path fill="currentColor" fillRule="evenodd" d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z"></path>
                                                                            </svg><span class="_3SXQW">Facebook</span></a>
                                                                        <a href="https://www.instagram.com/gethappitv/?fbclid=IwAR0kCEbOZR5ZinmfFLEhTP41ru-e13CymopaHsb4De3WQqyM40wgGpmvu9s" rel="noopener" target="_blank" class="ATag _1H0lX _135ID _3Dyhl">
                                                                            <svg className="svgIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style={{ fill: 'currentcolor' }}>
                                                                                <g fill="currentColor" fillRule="evenodd">
                                                                                    <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.087.278 3.45.525c-.658.256-1.216.598-1.772 1.153C1.123 2.234.78 2.792.525 3.45.278 4.086.11 4.812.06 5.877.012 6.944 0 7.284 0 10s.012 3.057.06 4.123c.05 1.065.218 1.79.465 2.428.256.658.598 1.216 1.153 1.77.556.558 1.114.9 1.772 1.155.636.248 1.363.417 2.427.464 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c1.064-.048 1.79-.217 2.428-.465.658-.255 1.216-.597 1.77-1.154.558-.554.9-1.112 1.155-1.77.248-.636.417-1.362.464-2.427.048-1.066.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.048-1.065-.217-1.79-.465-2.427-.255-.658-.597-1.216-1.154-1.772-.554-.555-1.112-.897-1.77-1.153C15.915.278 15.188.11 14.124.06 13.057.012 12.716 0 10 0m0 2c2.606 0 2.914.01 3.943.057.952.044 1.468.202 1.812.336.455.177.78.39 1.123.73.34.34.552.667.73 1.12.133.346.292.862.335 1.814C17.99 7.087 18 7.394 18 10s-.01 2.914-.057 3.943c-.043.952-.202 1.468-.335 1.812-.178.455-.39.78-.73 1.123-.343.34-.668.552-1.123.73-.344.133-.86.292-1.812.335-1.03.047-1.337.057-3.943.057s-2.914-.01-3.943-.057c-.952-.043-1.468-.202-1.813-.335-.454-.178-.78-.39-1.12-.73-.342-.343-.554-.668-.73-1.123-.135-.344-.293-.86-.337-1.812C2.01 12.913 2 12.606 2 10s.01-2.914.057-3.943c.044-.952.202-1.468.336-1.813.177-.454.39-.78.73-1.12.34-.342.667-.554 1.12-.73.346-.135.862-.293 1.814-.337C7.087 2.01 7.394 2 10 2"></path>
                                                                                    <path d="M10 13c-1.657 0-3-1.343-3-3 0-1.656 1.343-3 3-3s3 1.344 3 3c0 1.657-1.343 3-3 3m0-8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m6 0c0 .553-.447 1-1 1-.553 0-1-.447-1-1 0-.553.447-1 1-1 .553 0 1 .447 1 1"></path>
                                                                                </g>
                                                                            </svg><span class="_3SXQW">Instagram</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                : null
                                                        }
                                                        {
                                                            other === true ?
                                                                <div>
                                                                    <div class="_9gMn_ R8UiN">
                                                                        <div onClick={() => {
                                                                            history.push(
                                                                                { pathname: '/contactsupport' }
                                                                            )
                                                                        }} class="ATag _3kieO" rel="nofollow" style={{ cursor: 'pointer' }} >Report a problem</div>
                                                                    </div>
                                                                </div> : null
                                                        }

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
                                        <div className="vpMiddleDesc">{showDetails.video_title}</div>
                                    </div>
                                </div>
                                {
                                    showDetails.single_video === 0 ?
                                        (
                                            <div className="row vp3Section youMayLike">
                                                <div className="col">
                                                    <div>
                                                        <div className="heading" style={{ fontWeight: '800', paddingBottom: '7px', fontSize: '15pt' }}>Season 1</div>
                                                        <div className="carousel carouselNoMask">
                                                            <div className="carouselContent">
                                                                <Carousel className="row carouselRow" responsive={responsive}>
                                                                    {
                                                                        episodeList.map((show, index) => {
                                                                            return (
                                                                                <div className="col col-3" index={index}>
                                                                                    <div className="movieTile">
                                                                                        <div className="movieTileImage" className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index}
                                                                                            onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>
                                                                                            <div onClick={() => {
                                                                                                history.push(
                                                                                                    { pathname: '/videoplayer', state: { show_details: showDetails } }
                                                                                                )
                                                                                            }} className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                                                                                {hover === true && focusedId === index ?
                                                                                                    <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }} onClick={() => { functionOnclick(show) }}>
                                                                                                        <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                                                        <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                                                                    </svg>
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
                                                                                                <h3><a className="linkButton movieTextHeading" onClick={() => {
                                                                                                    history.push(
                                                                                                        { pathname: '/videoplayer', state: { show_details: showDetails } }
                                                                                                    )
                                                                                                }}>{show.show_name}</a></h3>
                                                                                                <div className="movieCatYear">
                                                                                                    <div>
                                                                                                        <div className="movieYear">
                                                                                                            {
                                                                                                                show.year ?
                                                                                                                    <div className="_1MmGl">({show.year}) . {convertTime(show.video_duration)}</div>
                                                                                                                    :
                                                                                                                    <div className="_1MmGl">{convertTime(show.video_duration)}</div>
                                                                                                            }
                                                                                                        </div>
                                                                                                        <div className="movieCategory mcMargin" style={{ display: 'flex' }}>
                                                                                                            {
                                                                                                                show.category_name.map((item, index) => {
                                                                                                                    if (index === show.category_name.length - 1) {
                                                                                                                        return (
                                                                                                                            <div key={index}>{item}</div>
                                                                                                                        );
                                                                                                                    } else {
                                                                                                                        return (
                                                                                                                            <div key={index}>{item}{","}&nbsp;</div>
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
                                        ) : null
                                }
                                <div className="row vp3Section youMayLike">
                                    <div className="col">
                                        <div>
                                            <div className="heading" style={{ fontWeight: '800', paddingBottom: '7px', fontSize: '15pt' }}>You May Also Like</div>
                                            <div className="carousel carouselNoMask">
                                                <div className="carouselContent">
                                                    <Carousel className="row carouselRow" responsive={responsive}>
                                                        {
                                                            similarShows.map((show, index) => {
                                                                return (
                                                                    <div className="col col-3" index={index}>
                                                                        <div className="movieTile">
                                                                            <div className="movieTileImage" className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index} onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>
                                                                                <div onClick={() => { functionOnclick(show) }} className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                                                                    {hover === true && focusedId === index ?
                                                                                        <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }} onClick={() => { functionOnclick(show) }}>
                                                                                            <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                                            <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                                                        </svg>
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
                                                                                        <div>
                                                                                            <div className="movieYear">
                                                                                                {
                                                                                                    show.year ?
                                                                                                        <div className="_1MmGl">({show.year}) . {convertTime(show.video_duration)}</div>
                                                                                                        :
                                                                                                        <div className="_1MmGl">{convertTime(show.video_duration)}</div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className="movieCategory mcMargin" style={{ display: 'flex' }}>
                                                                                                {
                                                                                                    show.category_name.map((item, index) => {
                                                                                                        if (index === show.category_name.length - 1) {
                                                                                                            return (
                                                                                                                <div key={index}>{item}</div>
                                                                                                            );
                                                                                                        } else {
                                                                                                            return (
                                                                                                                <div key={index}>{item}{","}&nbsp;</div>
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
