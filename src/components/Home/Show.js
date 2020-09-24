import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
var time = ''

const Show = ({ param }) => {
    const [show, setShow] = useState(param);
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    useEffect(() => {

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

    const convertTime = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";

        time = hDisplay + mDisplay + sDisplay;
        
    }
    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }

    return (
        <div className="carouselContent">
            <Carousel responsive={responsive}>
                {
                    show.map((show, index) => {
                        return (
                            <div className="movieTile" key={index} style={{ padding: '12px' }} >
                                <div className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index} onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>
                                    <div className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                        {hover === true && focusedId === index ?
                                            <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }}>
                                            <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}>
                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                            </svg>
                                             </Link>
                                            : null}
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


                                <div className={hover === true && focusedId === index ? "wishlistPosition wishlistTranslate wishlistParentOpen" : "wishlistPosition wishlistTranslate wishlistParentClose"}>
                                    <div className="wishlistButton">
                                        <div className={hover === true && focusedId === index ? "wlgradientPosition wlgradientTranslate wlgradientOpen" : "wlgradientPosition wlgradientTranslate wlgradientClose"}
                                            style={{ backgroundImage: "linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5))", backgroundPosition: "center bottom", backgroundSize: "cover" }}
                                        ></div>
                                        <div className="wishlistTextWrapper">
                                            <div className="wishlistText">Add to My List</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="movieTextWrapper movieTextWrapperPadding">
                                <div className="movieTextFlex">
                                    <h3>
                                        <div className="linkButton movieTextHeading" title="Cold Squad">{show.show_name}</div></h3>
                                    <div className="movieCatYear">
                                        <div>
                                            <div className="movieYear">
                                                {
                                                    convertTime(show.video_duration)
                                                }
                                                {
                                                    show.year ?
                                                        <div className="_1MmGl">({show.year}) . {time}</div>
                                                        :
                                                        <div className="_1MmGl">{time}</div>

                                                }
                                            </div>
                                            <div className="movieCategory ">
                                                <div>{show.category_name}</div>
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
                        );
                    })
                }
            </Carousel>
        </div >
    );
}
export default Show;