import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/service';
const queryString = require('query-string');
const Header = () => {
    const [input, setInput] = useState([]);
    const history = useHistory();
    const [timeOut, setTimeOut] = useState(0);
    const [category, setCategory] = useState([]);
    const [loginBlock, setLoginBlock] = useState('block');
    const [userBlock, setUserBlock] = useState('none');
    let userName = localStorage.getItem('userName');
    const [typing, setTyping] = useState(false);
    const [mouseHover, setMouseHover] = useState(false);

    var { search } = useLocation();
    const location = useLocation();
    const currentPath = location.pathname;
    const parsed = queryString.parse(search);

    useEffect(() => {
    }, []);
    useEffect(() => {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        console.log(localStorage.getItem('userName'), 'userid');
        if (isLoggedIn == 'true') {
            setLoginBlock('none')
            setUserBlock('block')
        }
        window.scrollTo(0, 0);
        service.getshowsbyCategory().then(response => {
            console.log(response.data, 'dara');
            setCategory(response.data);
        })
    }, []);
    const onChangeHandler = (e) => {
        setTyping(true);
        const inputValue = e.target.value
        if (timeOut) {
            clearTimeout(timeOut);
        }
        setTimeOut(setTimeout(() => {
            if (inputValue.length > 0) {
                service.getShows(inputValue).then(response => {
                    console.log(response, 'response');
                    setTyping(false);
                    history.push({
                        pathname: '/search',
                        search: encodeURI(`input=${inputValue}`),
                        state: { item: response.data }
                    });
                })

            } else {
                history.push({
                    pathname: '/'
                });
            }
        }, 500))
        setInput(e.target.value);
    }

    const functionLogout = () => {
        setTimeout(() => {
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            localStorage.setItem('isLoggedIn', 'false');

            setLoginBlock('block')
            setUserBlock('none')
            setMouseHover(false);

            eraseCookie('userName');
            eraseCookie('userId');
            eraseCookie('userEmail');
            eraseCookie('subscriptionId');
            history.push({
                pathname: '/'
            });
        }, 1000);
    }

    const eraseCookie = (name) => {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
    const submitSearch = (e) => {
        e.preventDefault();
    }
    return (
        <header className={currentPath === '/register' || currentPath === '/signin' ? "headerMenu headerWhite headerGradient" : "headerMenu gradientCheck headerGradient"}>
            <div className="screenContainer">
                <div className="blackScreen">
                </div>
            </div>
            <div className="container headerWrapper">
                <div className="logosection">
                    <div className="logoContain">
                        <div className="menuIcon" rel="nofollow"><span className="hamburger"></span></div>
                        <div className="menuItemContainer menuClose">
                            <div className="menuWrapper" style={{ width: '629px' }}>
                                <div className="mobileSearch">
                                    <section className="searchContainer mobileSearchBG">
                                        <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                                            <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                        </svg>
                                        <form
                                            onSubmit={submitSearch}
                                        >
                                            <input className="searchInput" id="searchInput" type="search" placeholder="Search" required="" onChange={onChangeHandler}
                                                value={parsed.show_id ? typing === true ? input : '' : input} />
                                        </form>
                                        <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                                            <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                                        </svg>
                                    </section>
                                </div>
                                <div className="menuRowItem">
                                    <div className="menuWrapperHeight"
                                    // style={{ height: '437px' }}
                                    >
                                        <div className="menuWidth20" style={{ width: '40%' }}>
                                            <div className="menuCol">
                                                <div className="menuItemHead">Popular</div>
                                                <div className="menuListItems">
                                                    <div className="menuInnerCol">
                                                        <a className="linkButton headerMenuItems" href="#">My Playlist</a>
                                                        <a className="linkButton headerMenuItems" href="#">Recently Added</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="menuWidth20 menuBGcolor menuWidth40" style={{ width: '60%' }}>
                                            <div className="menuCol">
                                                <div className="menuItemHead">Categories</div>
                                                <div className="menuListItems">
                                                    <div className="menuInnerCol">
                                                        {
                                                            category.map((item, index) => {
                                                                return (
                                                                    <a key={index} className="linkButton headerMenuItems" href="#">{item.category_name}</a>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={require('../../images/logo.png')} style={{ cursor: 'pointer' }} onClick={() => {
                            setInput('');
                            history.push({
                                pathname: '/'
                            });
                        }} width={60} />
                    </div>
                </div>
                <section className="searchContainer searchBar">
                    <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                        <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                    </svg>
                    <form
                        onSubmit={submitSearch}
                    >
                        <input className="searchInput" id="searchInput" type="search" placeholder="Find movies, TV shows and more" required="" onChange={onChangeHandler}
                            value={parsed.show_id ? typing === true ? input : '' : input} />
                    </form>
                    <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                        <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                    </svg>
                </section>
                <div className="headerButton">
                    <div className="loginButtonContainer" style={{ display: loginBlock }}>
                        {
                            currentPath === '/register' ?
                                (
                                    <ul>
                                        {/* <li><a className="headerSignInButton" href="http://stagingweb.gethappi.tv/login">Sign In</a></li> */}
                                        <li><a className="headerSignInButton" style={{ cursor: 'pointer' }} onClick={() => {
                                            setInput('');
                                            history.push({
                                                pathname: '/signin'
                                            });
                                        }} >Sign In</a></li>
                                    </ul>
                                ) : currentPath === '/signin' ?
                                    (
                                        <ul>
                                            <li>
                                                <a className="headerSignInButton" style={{ cursor: 'pointer' }} onClick={() => {
                                                    setInput('');
                                                    history.push({
                                                        pathname: '/register'
                                                    });
                                                }} >Register</a>
                                            </li>
                                        </ul>
                                    ) :
                                    (
                                        <ul>
                                            <li>
                                                <a onClick={() => {
                                                    setInput('');
                                                    history.push({
                                                        pathname: '/register'
                                                    });
                                                }}>
                                                    <button className="button buttonSecondary buttonBlock" tabIndex="-1">
                                                        <div className="buttonBg"></div>
                                                        <div className="buttonContent">Register</div>
                                                    </button>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="headerSignInButton" style={{ cursor: 'pointer' }} onClick={() => {
                                                    setInput('');
                                                    history.push({
                                                        pathname: '/signin'
                                                    });
                                                }} >Sign In</a>
                                            </li>
                                        </ul>
                                    )

                        }

                    </div>
                    <div className="loginButtonContainer" style={{ display: userBlock }}>
                        <ul>
                            <li><div className="headerSignInButton username logoutMenu"
                                onMouseOver={() => { setMouseHover(true) }}>Hi,{userName}</div>
                                {
                                    mouseHover === true ?
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                        :
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                mouseHover === true ?
                    <div className="signpadding" 
                        onMouseLeave={() => { setMouseHover(false) }}>
                        <div className="signin">
                            <div>
                                <div className="sign">
                                    <a className="linkButton headerMenuItems" href="#">Account Settings</a>
                                    <a className="linkButton headerMenuItems" href="#">Help Center</a>
                                    <a className="linkButton headerMenuItems" href="#">Activate Your Device</a>
                                    <span className="_1xPbF"></span>
                                    <div className="linkButton headerMenuItems" onClick={functionLogout}>
                                        <span className="signout">Sign Out</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
        </header>
    );
}

export default Header;
