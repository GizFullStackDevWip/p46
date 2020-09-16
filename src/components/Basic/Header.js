import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
    const [input, setInput] = useState([]);

    const history = useHistory();
    useEffect(() => {

    }, []);
    const onChangeHandler = (e) => {
        setInput(e.target.value);
    }
    const submitSearch = () => {
        if (input) {
            history.push({
                pathname: '/search',
                search: encodeURI(`input=${input}`),
                state: { detail: 'some_value' }
            });
        }
    }
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
                                            <input className="searchInput" type="search" placeholder="Search" required="" onChange={onChangeHandler} value={input} />
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
                                                        <a className="linkButton headerMenuItems" href="#">classNameics</a>
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
                                                        <a className="linkButton headerMenuItems" href="#">Cult classNameics</a>
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
                        <Link to="/"><img src={require('../../images/logo.png')} width={60} /></Link>
                    </div>
                </div>
                <section className="searchContainer searchBar">
                    <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                        <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                    </svg>
                    <form onSubmit={submitSearch}>
                        <input className="searchInput" type="search" placeholder="Find movies, TV shows and more" required="" onChange={onChangeHandler} value={input} />
                    </form>
                    <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                        <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                    </svg>
                </section>
                <div className="headerButton">
                    <div className="loginButtonContainer">
                        <ul>
                            <li>
                                <a className="" href="/register">
                                    <button className="button buttonSecondary buttonBlock" tabIndex="-1">
                                        <div className="buttonBg"></div>
                                        <div className="buttonContent">Register</div>
                                    </button>
                                </a>
                            </li>
                            <li><a className="headerSignInButton" href="/signin">Sign In</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;