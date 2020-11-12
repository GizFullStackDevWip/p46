import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/Home/service';
import { convertTime } from '../../Utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../../common/Notification';
import $ from 'jquery';
const queryString = require('query-string');

var showsImageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
var videoImageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';

const Search = ({ history }) => {
    var { search } = useLocation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(history.location.state.item);
    const parsed = queryString.parse(search);
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    const signInBlock = useSelector((state) => state.signInBlock);

    useEffect(() => {
        window.scrollTo(0, 0);
        updateUseEffect();
        $('.menuItemContainer').addClass('menuClose');
    }, [parsed.input]);

    const updateUseEffect = () => {
        service.getShows(parsed.input).then(response => {
            setShow(response.data);
        })
    }

    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }

    const addtoMylistFunction = (show) => {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            service.addToMyPlayList(show.show_id, 1).then(response => {
                if (response.status === 100) {
                    updateUseEffect();
                }
            })
        } else {
            dispatch({ type: "SIGN_IN_BLOCK" });
        }
    }

    const removeFromMylistFunction = (show) => {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            service.addToMyPlayList(show.show_id, 0).then(response => {
                if (response.status === 100) {
                    updateUseEffect();
                }
            })
        } else {
            dispatch({ type: "SIGN_IN_BLOCK" });
        }
    }

    const functionOnClick = (show) => {
        if (show.video_id) {
            history.push({ pathname: '/videoplayer', state: { show_details: show } })
        } else {
            history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) })
        }
    }

    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="menuCloseJS closeMenuWrapper">
                    {
                        signInBlock === true ? (
                            <Notification />)
                            : null
                    }
                    <div className="container searchWrapper">
                        <div className="_1py48"></div>
                        <div className="searchResult">
                            Results for
                            <h1 className="SearchResultText">{parsed.input}</h1><br />
                            {
                                show.length > 0 ?
                                    null
                                    : <h3 style={{ color: 'white', fontSize: '2.3rem' }}>No Matches</h3>
                            }
                        </div>
                        <div className="searchResultMargin">
                            <div className="row">
                                {
                                    show &&
                                    show.map((show, index) => {
                                        return (
                                            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2" key={index}>
                                                <div className="movieTileMargin movieTile">
                                                    <div className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index}
                                                        onMouseOver={() => { hoverFunction(true, index) }}
                                                        onMouseLeave={() => { hoverFunction(false, index) }}>
                                                        <div onClick={() => { functionOnClick(show) }}
                                                            className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>

                                                            <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}
                                                                onClick={() => { functionOnClick(show) }} >
                                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                            </svg>
                                                        </div>
                                                        {

                                                            show.single_video === 0 ?
                                                            <div className="moviePoster"
                                                                style={{ backgroundImage: `url(${videoImageUrl + show.thumbnail})` }}>
                                                                <div className="FeNml"></div>
                                                            </div>:
                                                            <div className="moviePoster"
                                                            style={{ backgroundImage: `url(${showsImageUrl + show.logo})` }}>
                                                            <div className="FeNml"></div>
                                                        </div>
                                                        }

                                                        <div className={hover === true && focusedId === index ? "wishlistPosition wishlistTranslate wishlistParentOpen" : "wishlistPosition wishlistTranslate wishlistParentClose"}>
                                                            <div className="wishlistButton">
                                                                <div className={hover === true && focusedId === index ? "wlgradientPosition wlgradientTranslate wlgradientOpen" : "wlgradientPosition wlgradientTranslate wlgradientClose"}
                                                                    style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5)), url(./images/adventures/adventures-04.jpg)', backgroundPosition: 'center bottom', backgroundSize: 'cover' }}>
                                                                </div>
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
                                                            <h3>
                                                                {
                                                                    show.show_name &&
                                                                    <div className="linkButton movieTextHeading"
                                                                        onClick={() => { functionOnClick(show) }} >{show.show_name}&nbsp;
                                                                            {show.single_video === 0 ?
                                                                            <div>
                                                                                ({show.video_title.length > 26 ? show.video_title.slice(0, 26) + '..' : show.video_title})
                                                                                        </div>
                                                                            : null
                                                                        }
                                                                    </div>
                                                                }

                                                            </h3>
                                                            <div className="movieCatYear">
                                                                <div style={{ width: '130px' }}>
                                                                    {
                                                                        show.teaser_duration &&
                                                                        <div className="movieYear">
                                                                            <div className="_1MmGl">{convertTime(show.teaser_duration)}</div>
                                                                        </div>
                                                                    }

                                                                    <div className="movieCategory mcMargin">
                                                                        {
                                                                            show.category_name &&
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
                                                                    {
                                                                        show.rating &&
                                                                        <div className="movieCensorBox moviecensorText">{show.rating}</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Search;
