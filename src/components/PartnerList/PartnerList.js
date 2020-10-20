import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/Home/service';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

var showsImageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
const queryString = require('query-string');

const PartnerList = () => {
    var { search } = useLocation();
    const history = useHistory();
    const [hover, setHover] = useState(false);
    const [focusedId, setFocusedId] = useState(-1);
    const [partner, setPartner] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        updateUseEffect();

    }, [search]);

    const updateUseEffect = () => {
        service.getPartners().then(response => {
            console.log('response of the partner--->', response);
            setPartner(response.data);
        })
    }
    const hoverFunction = (flag, index) => {
        setHover(flag);
        setFocusedId(index);
    }
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="menuCloseJS closeMenuWrapper">
                    <div className="container searchWrapper">
                        <div className="_1py48"></div>
                        <div className="searchResult">
                            <h1 className="SearchResultText">Partners</h1>
                        </div>
                        <div className="searchResultMargin">
                            <div className="row">
                                {
                                    partner.map((partner, index) => {
                                        return (
                                            <div className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2" key={index}>
                                                <div className="movieTileMargin movieTile">
                                                    <div
                                                    className={hover === true && focusedId === index ? "movieTileImage movieTileImageOpen" : "movieTileImage"} id={index}
                                                    onMouseOver={() => { hoverFunction(true, index) }} onMouseLeave={() => { hoverFunction(false, index) }}
                                                    >

                                                        <div className="movieTileIcon"
                                                        onClick={() => { history.push({ pathname: '/home/partnershows', search: encodeURI(`partner_id=${partner.partner_id}&partner_name=${partner.name}`) }) }}
                                                        // className={hover === true && focusedId === index ? "movieTileIcon " : "movieTileIcon  movieTileHoverOpened"}
                                                        >
                                                            {/* <svg className="svgIcon movieTilePlayIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 62 62" style={{ fill: 'currentcolor' }}
                                                            onClick={() => { history.push({ pathname: '/home/movies', search: encodeURI(`show_id=${show.show_id}`) }) }}
                                                            >
                                                                <circle r="30" stroke="currentColor" fill="none" strokeWidth="2" cx="31" cy="31"></circle>
                                                                <path fill="currentColor" d="M28.42,37.6c-2,1-3.42,0-3.42-2.35v-8.5c0-2.34,1.38-3.39,3.42-2.35l9,4.7c2,1,2.11,2.76.07,3.8Z"></path>
                                                            </svg> */}
                                                        </div>
                                                        <div className="moviePoster"
                                                            style={{ backgroundImage: `url(${showsImageUrl + partner.image})` }}>
                                                            <div className="FeNml"></div>
                                                        </div>
                                                        <div className="wishlistPosition wishlistTranslate wishlistParentClose"
                                                        // className={hover === true && focusedId === index ? "wishlistPosition wishlistTranslate wishlistParentOpen" : "wishlistPosition wishlistTranslate wishlistParentClose"}
                                                        >
                                                            <div className="wishlistButton">
                                                                <div className="wlgradientPosition wlgradientTranslate wlgradientClose"
                                                                // className={hover === true && focusedId === index ? "wlgradientPosition wlgradientTranslate wlgradientOpen" : "wlgradientPosition wlgradientTranslate wlgradientClose"}
                                                                // style={{ backgroundImage: 'linear-gradient(rgba(38, 38, 45, 0.5), rgba(38, 38, 45, 0.5)), url(./images/adventures/adventures-04.jpg)', backgroundPosition: 'center bottom', backgroundSize: 'cover' }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <section className="movieTextWrapper movieTextWrapperPadding">
                                                        <div className="movieTextFlex">
                                                            <h3>
                                                                <div className="linkButton movieTextHeading"
                                                                    onClick={() => { history.push({ pathname: '/home/partnershows', search: encodeURI(`partner_id=${partner.partner_id}&partner_name=${partner.name}`) }) }}>{partner.name}</div>
                                                            </h3>
                                                            <div className="movieCatYear">
                                                                <div>
                                                                    <div className="movieYear">
                                                                        <div className="_1MmGl">{partner.description.slice(0, 90) + '...'}</div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PartnerList;
