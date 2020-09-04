import React, { useState, useEffect } from 'react';
class Header extends React.Component {
    render() {
        return (
            <header className="headerMenu gradientCheck headerGradient">
                <div className="screenContainer">
                    <div className="blackScreen">
                    </div>
                </div>
                <div className="container headerWrapper">
                    <div className="logosection">
                        <div className="logoContain">
                            <div className="menuIcon" rel="nofollow"><span className="hamburger"></span></div>
                            <div className="menuItemContainer menuClose">
                                <div className="menuWrapper">
                                    <div className="mobileSearch">
                                        <section className="searchContainer mobileSearchBG">
                                            <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                                                <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                            </svg>
                                            <form>
                                                <input className="searchInput" type="search" placeholder="Search" required="" defaultValue="" />
                                            </form>
                                            <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                                                <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                                            </svg>
                                        </section>
                                    </div>
                                    <div className="menuRowItem">
                                        <div className="menuWrapperHeight" style={{ height: '437px' }}>
                                            <div className="menuWidth20">
                                                <div className="menuCol">
                                                    <div className="menuItemHead">Popular</div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            <a className="linkButton headerMenuItems" href="#">Most Popular</a>
                                                            <a className="linkButton headerMenuItems" href="#">Recently Added</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="menuWidth20 menuBGcolor menuWidth40">
                                                <div className="menuCol">
                                                    <div className="menuItemHead">Genres</div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            <a className="linkButton headerMenuItems" href="#">Action</a>
                                                            <a className="linkButton headerMenuItems" href="#">Anime</a>
                                                            <a className="linkButton headerMenuItems" href="#">Classics</a>
                                                            <a className="linkButton headerMenuItems" href="#">Comedy</a>
                                                            <a className="linkButton headerMenuItems" href="#">Crime TV</a>
                                                            <a className="linkButton headerMenuItems" href="#">Documentary</a>
                                                            <a className="linkButton headerMenuItems" href="#">Docuseries</a>
                                                            <a className="linkButton headerMenuItems" href="#">Drama</a>
                                                            <a className="linkButton headerMenuItems" href="#">Faith</a>
                                                            <a className="linkButton headerMenuItems" href="#">Family Movies</a>
                                                            <a className="linkButton headerMenuItems" href="#">Foreign Language Films</a>
                                                            <a className="linkButton headerMenuItems" href="#">Foreign Language TV</a>
                                                            <a className="linkButton headerMenuItems" href="#">Horror</a>
                                                            <a className="linkButton headerMenuItems" href="#">Indie Films</a>
                                                            <a className="linkButton headerMenuItems" href="#">Kids Shows</a>
                                                            <a className="linkButton headerMenuItems" href="#">LGBTQ</a>
                                                        </div>
                                                        <div className="innerMenuCol">
                                                            <a className="linkButton headerMenuItems" href="#">Lifestyle</a>
                                                            <a className="linkButton headerMenuItems" href="#">Martial Arts</a>
                                                            <a className="linkButton headerMenuItems" href="#">Music &amp; Musicals</a>
                                                            <a className="linkButton headerMenuItems" href="#">Para niños y familias</a>
                                                            <a className="linkButton headerMenuItems" href="#">Películas en Español</a>
                                                            <a className="linkButton headerMenuItems" href="#">Preschool</a>
                                                            <a className="linkButton headerMenuItems" href="#">Reality TV</a>
                                                            <a className="linkButton headerMenuItems" href="#">Romance</a>
                                                            <a className="linkButton headerMenuItems" href="#">Sci-fi &amp; Fantasy</a>
                                                            <a className="linkButton headerMenuItems" href="#">Sports Movies &amp; Shows</a>
                                                            <a className="linkButton headerMenuItems" href="#">Stand Up Comedy</a>
                                                            <a className="linkButton headerMenuItems" href="#">Telenovelas y series</a>
                                                            <a className="linkButton headerMenuItems" href="#">Thrillers</a>
                                                            <a className="linkButton headerMenuItems" href="#">TV Comedies</a>
                                                            <a className="linkButton headerMenuItems" href="#">TV Dramas</a>
                                                            <a className="linkButton headerMenuItems" href="#">Westerns</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="menuWidth20">
                                                <div className="menuCol">
                                                    <div className="menuItemHead">Collections</div>
                                                    <div className="menuListItems">
                                                        <div className="innerMenuCol">
                                                            <a className="linkButton headerMenuItems" href="#">Award Winners &amp; Nominees</a>
                                                            <a className="linkButton headerMenuItems" href="#">Bollywood Dreams</a>
                                                            <a className="linkButton headerMenuItems" href="#">Cult Classics</a>
                                                            <a className="linkButton headerMenuItems" href="#">Highly Rated on Rotten Tomatoes</a>
                                                            <a className="linkButton headerMenuItems" href="#">Weekly Watchlist</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="logoLink" href="#">
                                <img src={require('../images/logo.png')} width={60}/>
                                {/* <svg className="svgIcon iconColor brandLogo" preserveAspectRatio="xMidYMid meet" viewBox="0 0 213 92" style={{ fill: 'currentcolor' }}>
                                    <path d="M210.873307,26.4543269 L196.542112,26.4543269 L196.542112,89.9669695 C196.542112,91.0984165 197.458796,92.0157644 198.589425,92.0157644 L210.873307,92.0157644 C212.003936,92.0157644 212.920621,91.0984165 212.920621,89.9669695 L212.920621,28.5031219 C212.920621,27.3716749 212.003936,26.4543269 210.873307,26.4543269 M155.595838,75.6254051 C146.550295,75.6254051 139.217329,68.2871339 139.217329,59.2350457 C139.217329,50.1829575 146.550295,42.8446863 155.595838,42.8446863 C164.641382,42.8446863 171.974348,50.1829575 171.974348,59.2350457 C171.974348,68.2871339 164.641382,75.6254051 155.595838,75.6254051 M155.595838,26.4543269 C150.78721,26.4543269 146.222213,27.4920416 142.108648,29.3543962 L142.108136,29.353884 C141.843521,29.4737385 141.555361,29.5362267 141.264643,29.5362267 C140.134014,29.5362267 139.217329,28.6188788 139.217329,27.4874318 L139.217329,3.9175828 C139.217329,2.7861358 138.300644,1.86878787 137.170015,1.86878787 L122.83882,1.86878787 L122.83882,59.2350457 C122.83882,77.339222 137.504239,92.0157644 155.595838,92.0157644 C173.687437,92.0157644 188.352857,77.339222 188.352857,59.2350457 C188.352857,41.1308694 173.687437,26.4543269 155.595838,26.4543269 M48.0811613,85.7971597 L48.0832087,85.7986963 L41.9187472,75.1065478 L41.9151644,75.1085965 C41.3936113,74.2045658 40.2762898,73.8378315 39.3207062,74.2562979 C37.3112678,75.1367675 35.091468,75.6254051 32.7570186,75.6254051 C23.711475,75.6254051 16.3785093,68.2871339 16.3785093,59.2350457 L16.3785093,44.8934812 C16.3785093,43.7620342 17.295194,42.8446863 18.425823,42.8446863 L38.8989596,42.8446863 C40.0295885,42.8446863 40.9462732,41.9273384 40.9462732,40.7958914 L40.9462732,28.5036341 C40.9462732,27.3716749 40.0295885,26.4543269 38.8989596,26.4543269 L18.425823,26.4543269 C17.295194,26.4543269 16.3785093,25.536979 16.3785093,24.405532 L16.3785093,3.9170706 C16.3785093,2.7861358 15.4618246,1.86878787 14.3311956,1.86878787 L0,1.86878787 L0,59.2350457 C0,77.339222 14.6659314,92.0157644 32.7570186,92.0157644 C37.9459351,92.0157644 42.8528341,90.808512 47.2131003,88.6593262 C48.2275443,88.1594202 48.6446844,86.9311676 48.1446281,85.9159898 C48.1251786,85.8755261 48.1036818,85.8360868 48.0811613,85.7971597 M112.602251,26.4543269 L98.2710558,26.4543269 L98.2710558,59.2350457 C98.2710558,68.2871339 90.93809,75.6254051 81.8925465,75.6254051 C72.8470029,75.6254051 65.5140372,68.2871339 65.5140372,59.2350457 L65.5140372,28.5031219 C65.5140372,27.3716749 64.5973525,26.4543269 63.4667235,26.4543269 L49.1355279,26.4543269 L49.1355279,59.2350457 C49.1355279,77.339222 63.8014593,92.0157644 81.8925465,92.0157644 C99.9836336,92.0157644 114.649565,77.339222 114.649565,59.2350457 L114.649565,28.5031219 C114.649565,27.3716749 113.73288,26.4543269 112.602251,26.4543269 M204.731366,1.86878787 C200.208338,1.86878787 196.542112,5.53766738 196.542112,10.0639676 C196.542112,14.5902677 200.208338,18.2591473 204.731366,18.2591473 C209.254394,18.2591473 212.920621,14.5902677 212.920621,10.0639676 C212.920621,5.53766738 209.254394,1.86878787 204.731366,1.86878787" fill="currentcolor" transform="translate(0 -1)"></path>
                                </svg> */}
                            </a>
                        </div>
                    </div>
                    <section className="searchContainer searchBar">
                        <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                            <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                        </svg>
                        <form>
                            <input className="searchInput" type="search" placeholder="Find movies, TV shows and more" required="" defaultValue="" />
                        </form>
                        <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                            <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                        </svg>
                    </section>
                    <div className="headerButton">
                        <div className="loginButtonContainer">
                            <ul>
                                <li><a className="headerSignInButton" href="signin.html">Sign In</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;