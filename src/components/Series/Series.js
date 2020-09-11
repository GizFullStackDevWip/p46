import React, { useState, useEffect } from 'react';
import Header from '../Basic/Header';
import Footer from '../Basic/Footer';
import FooterInfo from '../Basic/FooterInfo';
import { service } from '../../network/Series/service';
import { useParams, useLocation } from 'react-router-dom';
import EpisodeSlider from './EpisodeSlider';
import ShowThumbnail from './ShowThumbnail';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const queryString = require('query-string');
const Series = () => {
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    const [update, setUpdate] = useState(false)
    console.log(parsed.show_id);
    useEffect(() => {
        service.getShowDetails(parsed.show_id).then(response => {
            console.log(response, 'res show det');
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
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="menuCloseJS closeMenuWrapper">
                    <div className="moviePageWrapper">
                        <div className="moviePageBG"
                            style={{ backgroundImage: 'linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2)), url(./images/transylvania/video.jpg)' }}
                        ></div>
                        <div className="moviePageContainer">
                            <div className="vpContent">
                                <div className="container vpContainer">
                                    <div className="row vp3Section">
                                        <ShowThumbnail/>
                                        <div className="col col-4-5">
                                            <div className="vpMiddleHeading">
                                                <h1 className="vpMiddleh1">Transylvania TV</h1></div>
                                            <div className="vpMiddleInfoSection vpInfoPadding">
                                                <div className="vpLengthCensor">
                                                    <div className="vpLengthYear">
                                                        <div className="movieYearText">(2018)</div>
                                                    </div>
                                                    <div className="vpCCwrapper">
                                                        <div>
                                                            <div className="movieCensorBox">TV-14</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="vpMovieCategory">
                                                    <div className="vpCategoryFlex vpCategoryMargin">
                                                        <div className="movieCensorBox vpMovieType vpMovieTypeMargin">Comedy</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="vpMiddleDesc">In this adult-skewing puppet show, a vampire and his monster minions run an obscure Transylvanian TV station with the improbable power to reanimate dead TV shows.</div>
                                            <div className="vpMiddleCastCrew">
                                                <div className="vpIndCast">
                                                    <div className="vpCastHeading">
                                                        <div className="vpCasth1">DIRECTOR</div>
                                                    </div>
                                                    <div className="vpCastName">
                                                        <a className="linkButton" href="/search/%22Michael%20Heagle%22">
                                                            <div className="vpCastValue vpCastValueMargin">Michael Heagle</div>
                                                        </a>
                                                    </div>
                                                    <br />
                                                </div>
                                                <div className="vpCastBreak"></div>
                                                <div className="vpIndCast">
                                                    <div className="vpCastHeading">
                                                        <div className="vpCasth1">STARRING</div>
                                                    </div>
                                                    <div className="vpCastName">
                                                        <a className="linkButton" href="/search/%22Michael%20J.%20Heagle%22">
                                                            <div className="vpCastValue vpCastValueMargin">Michael J. Heagle</div>
                                                        </a>
                                                        <a className="linkButton" href="/search/%22Michael%20Huyck%22">
                                                            <div className="vpCastValue vpCastValueMargin">Michael Huyck</div>
                                                        </a>
                                                        <a className="linkButton" href="/search/%22Laszlo%20Nemesi%22">
                                                            <div className="vpCastValue vpCastValueMargin">Laszlo Nemesi</div>
                                                        </a>
                                                        <a className="linkButton" href="/search/%22Gordon%20Smuder%22">
                                                            <div className="vpCastValue vpCastValueMargin">Gordon Smuder</div>
                                                        </a>
                                                        <a className="linkButton" href="/search/%22Charles%20Hubbell%22">
                                                            <div className="vpCastValue vpCastValueMargin">Charles Hubbell</div>
                                                        </a>
                                                        <a className="linkButton" href="/search/%22Jeff%20Neppl%22">
                                                            <div className="vpCastValue vpCastValueMargin">Jeff Neppl</div>
                                                        </a>
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                            <EpisodeSlider/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
export default Series;