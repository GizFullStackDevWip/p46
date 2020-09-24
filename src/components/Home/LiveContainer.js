import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';

const LiveContainer = () => {
    const [channels, setChannels] = useState([]);
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    useEffect(() => {
        service.getLiveChannels().then(response => {
            setChannels(response.data);
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
    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }
    return (
        <section className="categoryWrapper">
            <div className="_2vKa8"></div>
            <div className="container categoryHeadWrapper">
                <div className="categoryLinkWrapper">
                    <div className="categoryHeading">
                        {/* <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${param.param.category_id}`) }}> */}
                        <div className="_2hvCx">
                            <h2 className="_1mK3G">Live</h2>
                        </div>
                        {/* </Link> */}
                    </div>
                    {/* <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${param.param.category_id}`) }}> */}
                    {/* <div className="categoryDotsWrapper">
                        <div className="categoryDots"></div>
                    </div> */}
                    {/* </Link> */}
                </div>
                <div className="carouselContent">
                    <Carousel responsive={responsive}>
                        {
                            channels.map((item, index) => {
                                return (
                                    <div className="movieTile" key={index} style={{ padding: '12px' }} >
                                        <div className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index} onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}>
                                            <div className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}>
                                                {hover === true && focusedId === index ?
                                                    <Link to={{ pathname: '/home/live', state: { channel: channels } }}>
                                                        <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}>
                                                            <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                            <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                        </svg>
                                                    </Link>
                                                    : null}
                                            </div>

                                            <div className="moviePoster" style={{ backgroundImage: `url(${liveThumbnailUrl + item.logo})` }} >
                                                <div className="FeNml"></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </section>
    );
};
export default LiveContainer;