import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
const Show = ({ param }) => {
    const [show, setShow] = useState(param)
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
    return (
        <div className="carouselContent">
            <Carousel responsive={responsive}>
                {
                    show.map((show, index) => {
                        return (
                            <div className="movieTile" key={index} style={{ padding: '12px' }} >
                                <div className="movieTileImage">
                                    <div className="movieTileIcon movieTileHover">
                                        <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}>
                                            <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                            <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                        </svg>
                                    </div>
                                    {
                                        show.single_video == 1 ?
                                            <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                <div className="moviePoster" style={{ backgroundImage: `url(${bannerShowUrl + show.thumbnail})` }} >
                                                    <div className="FeNml"></div>
                                                </div>
                                            </Link> : <Link to={{ pathname: '/home/series', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                <div className="moviePoster" style={{ backgroundImage: `url(${bannerSeriesUrl + show.thumbnail})` }} >
                                                    <div className="FeNml"></div>
                                                </div>
                                            </Link>
                                    }


                                    <div className="wishlistPosition wishlistTranslate wishlistParentClose">
                                        <div className="wishlistButton">
                                            <div className="wlgradientPosition wlgradientTranslate wlgradientClose"
                                                style={{ backgroundImage: "linearGradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5)), url(&quot;2NsjBkYjIeJVUQCrm99FZLZYu4=/57x69:849x1202/400x574/smart/img.adrise.tv/b53d8c08-cd23-43cc-b74f-e814a34af8e1.jpg&quot;)", backgroundPosition: "center bottom", backgroundSize: "cover" }}
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
                                                    <div className="movieYearText">{show.year}</div>
                                                </div>
                                                <div className="movieCategory ">
                                                    <div>Mystery, Drama, Thriller</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="movieCensorBox moviecensorText">{show.rating}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        );
                    })
                }
            </Carousel>
        </div>
    );
}
export default Show;