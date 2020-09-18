import React, { useState, useEffect } from 'react';
import Header from '../Basic/Header';
import Footer from '../Basic/Footer';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/Home/service';
import { Link } from 'react-router-dom';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerSeriesUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/';
const queryString = require('query-string');

const CategoryList = () => {
    window.scrollTo(0, 0);
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    console.log(parsed.category_id);
    const [showList, setShowList] = useState([]);
    const [showName, setShowName] = useState('');
    useEffect(() => {
        service.getshowsbyCategory().then(response => {
            console.log(response.data, 'data');
            var data = response.data;
            data.map((item, index) => {
                if (item.category_id == parsed.category_id) {
                    setShowName(item.category_name);
                    console.log(item.shows, 'shows');
                    setShowList(item.shows);
                }
            })
        })
    }, []);
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="menuCloseJS closeMenuWrapper">
                    <div className="container searchWrapper">
                        <div className="_1py48"></div>
                        <div className="searchResult">
                            {/* Results for */}
                            <h1 className="SearchResultText">{showName}</h1></div>
                        <div className="searchResultMargin">
                            <div className="row">
                                {
                                    showList.map((show, index) => {
                                        return (
                                            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2" key={index}>
                                                <div className="movieTileMargin movieTile">
                                                    <div className="movieTileImage">
                                                        <a className="movieTileIcon movieTileHover" href="/series/300005083/adventures_of_sonic_the_hedgehog">
                                                            <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}>
                                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                            </svg>
                                                        </a>
                                                        {
                                                            show.single_video == 0 ?
                                                                <Link to={{ pathname: '/home/series', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                                    <div className="moviePoster"
                                                                        style={{ backgroundImage: `url(${bannerSeriesUrl + show.thumbnail})` }}>
                                                                        <div className="FeNml"></div>
                                                                    </div>
                                                                </Link> : (
                                                                    show.single_video == 1 ?
                                                                        <Link to={{ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }}>
                                                                            <div className="moviePoster"
                                                                                style={{ backgroundImage: `url(${bannerShowUrl + show.thumbnail})` }}>
                                                                                <div className="FeNml"></div>
                                                                            </div>
                                                                        </Link> : null
                                                                )
                                                        }
                                                        <div className="wishlistPosition wishlistTranslate wishlistParentClose">
                                                            <div className="wishlistButton">
                                                                <div className="wlgradientPosition wlgradientTranslate wlgradientClose"
                                                                    style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5)), url(./images/adventures/adventures-04.jpg)', backgroundPosition: 'center bottom', backgroundSize: 'cover' }}>
                                                                </div>
                                                                <div className="wishlistTextWrapper">
                                                                    <div className="wishlistText">Add to My List</div>
                                                                    <noscript></noscript>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <section className="movieTextWrapper movieTextWrapperPadding">
                                                        <div className="movieTextFlex">
                                                            <h3><a className="linkButton movieTextHeading" title="Adventures In Comedy" href="/series/300005083/adventures_of_sonic_the_hedgehog">{show.show_name}</a></h3>
                                                            <div className="movieCatYear">
                                                                <div>
                                                                    <div className="movieYear">
                                                                        <div className="movieYearText">{show.year}</div>
                                                                    </div>
                                                                    <div className="movieCategory mcMargin">
                                                                        <div>Comedy, Documentary</div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="movieCensorBox moviecensorText">TV-MA</div>
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
export default CategoryList;