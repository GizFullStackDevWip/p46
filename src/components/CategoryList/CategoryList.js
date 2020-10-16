import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/Home/service';
import { Link, useHistory } from 'react-router-dom';
import { convertTime } from '../../Utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../../common/Notification';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';

var showsImageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';

const queryString = require('query-string');

const CategoryList = () => {
    var { search } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const parsed = queryString.parse(search);
    const [showList, setShowList] = useState([]);
    const [showName, setShowName] = useState('');
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    const signInBlock = useSelector((state) => state.signInBlock);

    useEffect(() => {
        window.scrollTo(0, 0);
        updateUseEffect();

    }, [search]);

    const updateUseEffect = () => {
        if (parsed.category_id === 'playlist') {
            let isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                service.playList().then(response => {
                    if (response.data) {
                        setShowList(response.data);
                        setShowName(parsed.category_name);
                    }
                })
            }
        } else {
            service.showsByCategory(parsed.category_id).then(response => {
                console.log(response.data);
                setShowName(parsed.category_name);
                setShowList(response.data);
            })
        }
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
                            <h1 className="SearchResultText">{showName}</h1></div>
                        <div className="searchResultMargin">
                            <div className="row">
                                {
                                    showList.map((show, index) => {
                                        return (
                                            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2" key={index}>
                                                <div className="movieTileMargin movieTile">
                                                    <div className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index}
                                                        onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>

                                                        <div onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}
                                                            className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                                            <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}
                                                                onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}>
                                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                            </svg>
                                                        </div>

                                                        {/* {
                                                            show.single_video == 0 ?

                                                                <div className="moviePoster"
                                                                    style={{ backgroundImage: `url(${bannerSeriesUrl + show.logo})` }}>
                                                                    <div className="FeNml"></div>
                                                                </div>
                                                                : (
                                                                    show.single_video == 1 ?
                                                                        <div className="moviePoster"
                                                                            style={{ backgroundImage: `url(${bannerShowUrl + show.logo})` }}>
                                                                            <div className="FeNml"></div>
                                                                        </div>
                                                                        : null
                                                                )
                                                        } */}
                                                        <div className="moviePoster"
                                                            style={{ backgroundImage: `url(${showsImageUrl + show.logo})` }}>
                                                            <div className="FeNml"></div>
                                                        </div>
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
                                                            <h3><div className="linkButton movieTextHeading"
                                                                onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}>{show.show_name}</div></h3>
                                                            <div className="movieCatYear">
                                                                <div>
                                                                    <div className="movieYear">
                                                                        {
                                                                            show.year ?
                                                                                <div className="_1MmGl">({show.year}) . {convertTime(show.teaser_duration)}</div>
                                                                                :
                                                                                <div className="_1MmGl">{convertTime(show.teaser_duration)}</div>
                                                                        }
                                                                    </div>
                                                                    <div className="movieCategory mcMargin">
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
                                                                {show.rating &&
                                                                    <div>
                                                                        <div className="movieCensorBox moviecensorText">{show.rating}</div>
                                                                    </div>
                                                                }
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
export default CategoryList;
