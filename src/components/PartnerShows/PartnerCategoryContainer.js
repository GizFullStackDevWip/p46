import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { service } from '../../network/Partner/service';
import { useSelector, useDispatch } from 'react-redux';
import { convertTime ,convertSecondsToMin } from '../../Utils/utils';

var imageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
const PartnerCategoryContainer = ({ param }) => {
    const [similarShows, setSetimilarShows] = useState(param);
    const history = useHistory();
    const [hover, setHover] = useState(false);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [focusedId, setFocusedId] = useState(-1);
    useEffect(() => {
        window.scrollTo(0, 0);
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
    const functionOnclick = (show) => {
        history.push(
            { pathname: '/videoplayer', state: { show_details: show } }
        )
    }
    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }
    const addtoMylistFunction = (show) => {
        console.log('SHOWS', show);
        setUpdate(true);
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            service.addToMyPlayList(show.show_id, 1).then(response => {
                console.log('RESPONSE OF ADDMYPLAYLIST', response);
                if (response.status === 100) {
                    setUpdate(false);
                }
            })
        }
        else {
            dispatch({ type: "SIGN_IN_BLOCK" });
        }
    }
    const removeFromMylistFunction = (show) => {
        console.log('SHOWS', show);
        setUpdate(true);
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            service.addToMyPlayList(show.show_id, 0).then(response => {
                if (response.status === 100) {
                    setUpdate(false);
                }
                console.log('RESPONSE OF REMOVE MYPLAYLIST', response);
            })
        } else {
            dispatch({ type: "SIGN_IN_BLOCK" });
        }
    }
    return (
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
                                    {/* {
                                        show.single_video === 0 ?
                                            <div className="moviePoster"
                                                style={{ backgroundImage: `url(${bannerSeriesUrl + show.thumbnail})` }}>
                                                <div className="FeNml"></div>
                                            </div> : (
                                                show.single_video === 1 ?
                                                    <div className="moviePoster"
                                                        style={{ backgroundImage: `url(${imageUrl + show.thumbnail})` }}>
                                                        <div className="FeNml"></div>
                                                    </div>
                                                    :
                                                    null)
                                    } */}
                                    <div className="moviePoster"
                                        style={{ backgroundImage: `url(${imageUrl + show.thumbnail})` }}>
                                        <div className="FeNml"></div>
                                    </div>
                                    <div className={hover === true && focusedId === index ? "wishlistPosition wishlistTranslate wishlistParentOpen" : "wishlistPosition wishlistTranslate wishlistParentClose"}>
                                        <div className="wishlistButton">
                                            <div className={hover === true && focusedId === index ? "wlgradientPosition wlgradientTranslate wlgradientOpen" : "wlgradientPosition wlgradientTranslate wlgradientClose"}
                                                style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))', backgroundPosition: 'center bottom', backgroundSize: 'cover' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <section className="movieTextWrapper movieTextWrapperPadding">
                                    <div className="movieTextFlex">
                                        <h3><a className="linkButton movieTextHeading" onClick={() => { functionOnclick(show) }}>{show.video_title}</a></h3>
                                        <div className="movieCatYear">
                                            <div>
                                                <div className="movieYear">
                                                    <div className="_1MmGl">{convertSecondsToMin(show.video_duration)}</div>
                                                </div>
                                                <div className="movieCategory mcMargin" >
                                                </div>
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
    );
};
export default PartnerCategoryContainer;
