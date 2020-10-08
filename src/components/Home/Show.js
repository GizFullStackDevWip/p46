import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useHistory } from 'react-router-dom';
import { service } from '../../network/Home/service';
import { convertTime } from '../../Utils/utils';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';

const Show = ({ param }) => {
    const history = useHistory();

    const [shows, setShows] = useState(param);
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    useEffect(() => {
    }, [param]);

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
    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }
    const addtoMylistFunction = (show) => {
        service.addToMyPlayList(show.show_id, 1).then(response => {
            console.log('ADD TO MYPLAY LIST RESPONSE', response);
        })
    }
    const removeFromMylistFunction = (show) => {
        service.addToMyPlayList(show.show_id, 0).then(response => {
            console.log('REMOVE FROM MY PLAYLIST RESPONSE', response);
        })
    }
    return (
        <div className="carouselContent">
            <Carousel responsive={responsive}>
                {
                    shows.map((show, index) => {
                        return (
                            <div className="movieTile" key={index} style={{ padding: '12px' }} >
                                <div className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index}
                                    onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>
                                    <div className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                        {/* <Link to={{ pathname: '/videoplayer', state: { show_details: show } }}> */}
                                        <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}
                                            onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}>
                                            <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                            <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                        </svg>
                                        {/* </Link> */}
                                    </div>
                                    {
                                        show.single_video == 1 ?

                                            <div className="moviePoster" style={{ backgroundImage: `url(${bannerShowUrl + show.thumbnail})` }} >
                                                <div className="FeNml"></div>
                                            </div>
                                            :
                                            <div className="moviePoster" style={{ backgroundImage: `url(${bannerSeriesUrl + show.thumbnail})` }} >
                                                <div className="FeNml"></div>
                                            </div>
                                    }
                                }
                                    <div className={hover === true && focusedId === index ? "wishlistPosition wishlistTranslate wishlistParentOpen" : "wishlistPosition wishlistTranslate wishlistParentClose"}>
                                        <div className="wishlistButton">
                                            <div className={hover === true && focusedId === index ? "wlgradientPosition wlgradientTranslate wlgradientOpen" : "wlgradientPosition wlgradientTranslate wlgradientClose"}
                                                style={{ backgroundImage: "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))", backgroundPosition: "center bottom", backgroundSize: "cover" }}
                                            ></div>
                                            {
                                                show.watchlist_flag === 1 ?
                                                    (
                                                        <div className="wishlistTextWrapper">
                                                            <div className="wishlistText"
                                                                onClick={() => { removeFromMylistFunction(show) }}>Remove from My List </div>
                                                        </div>
                                                    ) :
                                                    (show.watchlist_flag === null || show.watchlist_flag === 0) ?
                                                        (
                                                            <div className="wishlistTextWrapper">
                                                                <div className="wishlistText"
                                                                    onClick={() => { addtoMylistFunction(show) }}>Add to My List</div>
                                                            </div>
                                                        ) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <section className="movieTextWrapper movieTextWrapperPadding">
                                    <div className="movieTextFlex">
                                        <h3>
                                            <div className="linkButton movieTextHeading"
                                                onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}>{show.show_name}
                                            </div>
                                        </h3>
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
                                                <div className="movieCategory ">
                                                    {show.category_name && <div>{show.category_name}</div>}
                                                </div>
                                            </div>
                                            <div>
                                                {show.rating && <div className="movieCensorBox moviecensorText">{show.rating}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        );
                    })
                }
            </Carousel>
        </div >
    );
}
export default Show;
