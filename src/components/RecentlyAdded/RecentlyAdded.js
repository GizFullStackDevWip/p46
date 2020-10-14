import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/Home/service';
import { Link, useHistory } from 'react-router-dom';
import { convertTime } from '../../Utils/utils';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
const queryString = require('query-string');

const RecentlyAdded = () => {
    var { search } = useLocation();
    const history = useHistory();
    const parsed = queryString.parse(search);
    const [showList, setShowList] = useState([]);
    const [showName, setShowName] = useState('');
    const [hover, setHover] = useState(false);
    const [update, setUpdate] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);

    useEffect(() => {
        window.scrollTo(0, 0);
        service.getRecentlyAddedShows().then(response => {
            var data = response.data;
            console.log('getRecentlyAddedShowsData', data)
            setShowName(parsed.partner_name);
            setShowList(data);
        })

    }, [search, update]);

    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }

    const addtoMylistFunction = (show) => {
        setUpdate(false);
        service.addToMyPlayList(show.show_id, 1).then(response => {
            if (response.status === 100) {
                setUpdate(true);
            }
        })
    }

    const removeFromMylistFunction = (show) => {
        setUpdate(false);
        service.addToMyPlayList(show.show_id, 0).then(response => {
            console.log('addto my list reponse', response);
            if (response.status === 100) {
                setUpdate(true);
            }

        })
    }

    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="menuCloseJS closeMenuWrapper">
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
                                                        onMouseOver={() => { hoverFunction(true, index) }}
                                                        onMouseLeave={() => { hoverFunction(false, index) }}>
                                                        <div onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}
                                                            className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>

                                                            <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}
                                                                onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}>
                                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                            </svg>
                                                            
                                                        </div>
                                                        {
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
                                                        }
                                                        {/* <div className="moviePoster"
                                                            style={{ backgroundImage: `url(${bannerShowUrl + show.logo})` }}>
                                                            <div className="FeNml"></div>
                                                        </div> */}
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
                                                                {/* <div className="wishlistTextWrapper">
                                                                    <div className="wishlistText">Add to My List</div>
                                                                    <noscript></noscript>
                                                                </div> */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RecentlyAdded;
