import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/service';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize, checkOperatingSystem } from '../../Utils/utils';
import $ from 'jquery';
const queryString = require('query-string');
var currentPathStrings = '';

const Header = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let { search } = useLocation();
    const parsed = queryString.parse(search);
    const location = useLocation();
    const currentPath = location.pathname;
    const login = useSelector((state) => state.login);

    const [input, setInput] = useState([]);
    const [timeOut, setTimeOut] = useState(0);
    const [category, setCategory] = useState([]);
    let userName = localStorage.getItem('userName');
    const [typing, setTyping] = useState(false);
    const [background, setBackground] = useState(false);
    const [mouseHover, setMouseHover] = useState(false);
    const [update, setUpdate] = useState(true);

    const [downloadHoverStyle, setDownloadHoverStyle] = useState([]);
    const [downloadHover, setDownloadHover] = useState(false);
    const [deviceType, setDeviceType] = useState('');
    // const [menuClose, setMenuClose] = useState('menuItemContainer menuClose');
    const [menuClose, setMenuClose] = useState(false);


    currentPathStrings = (currentPath === '/register' ||
        currentPath === '/signin' ||
        currentPath === '/aboutus' ||
        currentPath === '/pressrelease' ||
        currentPath === '/advertisewithus' ||
        currentPath === '/contactus' ||
        currentPath === '/contactsupport' ||
        currentPath === '/privacypolicy' ||
        currentPath === '/termsandconditions' ||
        currentPath === '/supportdevice' ||
        currentPath === '/cookiepolicy');

    useEffect(() => {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        let userId = service.getCookie("userId");
        if (isLoggedIn === "true" && userId) {
            dispatch({ type: "LOGIN" });
        }
        service.getshowsbyCategory().then(response => {
            if (response.message == 'invalid token') {
                history.go(0)
            } else {
                setCategory(response.data);
            }
        })
        let device = checkOperatingSystem();
        setDeviceType(device);
        if (device === 'none' || device === 'window' || device === 'mac') {
            setDownloadHover(false);
            setDownloadHoverStyle('0px');
        } else {
            setDownloadHoverStyle('80px');
            setDownloadHover(true);
            $(window).on('scroll', function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop < 50) {
                    setDownloadHoverStyle('0px');
                }
                if (scrollTop === 0) {
                    setDownloadHoverStyle('80px');
                }
            });
        }

    }, []);

    const onChangeHandler = (e) => {
        setTyping(true);
        const inputValue = e.target.value;
        if (timeOut) {
            clearTimeout(timeOut);
        }
        setTimeOut(setTimeout(() => {
            if (inputValue.length > 0) {
                service.getShows(inputValue).then(response => {
                    setTyping(false);
                    history.push({
                        pathname: '/search',
                        search: encodeURI(`input=${inputValue}`),
                        state: { item: response.data }
                    });
                })

            } else {
                history.push({
                    pathname: '/home'
                });
            }
        }, 500))
        setInput(e.target.value);
    }

    const functionLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        service.setCookie("isLoggedIn", false, 30);
        localStorage.removeItem('isLoggedIn');
        dispatch({ type: "LOGOUT" });
        setMouseHover(false);
        eraseCookie('userName');
        eraseCookie('userId');
        eraseCookie('userEmail');
        eraseCookie('subscriptionId');
        history.push({
            pathname: '/'
        });
    }


    const eraseCookie = (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    const submitSearch = (e) => {
        e.preventDefault();
    }
    const deviceOpenFunction = () => {
        if (deviceType === 'android') {
            window.location = "https://play.google.com/store/apps/details?id=com.happi.android";
        } else if (deviceType === 'iPhone') {
            window.location = "https://apps.apple.com/in/app/happitv/id1535463535";
        }
    }

    if (currentPath === '/termsofuse' || currentPath === '/policydarkmode') {
        return (null);
    } else if (currentPath === '/') {
        return (
            <div style={{ paddingTop: downloadHoverStyle }}>
                {
                    downloadHover === true &&
                    <header className="headerMenu headerWhite headerGradient"
                        style={{ backgroundColor: '#d9d7d7', marginTop: '-80px', padding: '0px' }}>
                        <div className="container headerWrapper" >
                            <img src={'https://gizmeon.s.llnwi.net/vod/happitv-static-files/logo/fav.png'} style={{ cursor: 'pointer' }} width={40} />
                            <div className="logosection" style={{ padding: '4px' }}>
                                <div className="logoContain" style={{ width: '174px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: '700' }}>HappiTV - Watch Movies & TV Shows<br />
                                        <span style={{ fontSize: '10px', fontWeight: '600' }} >Open in the HappiTV app</span></span>
                                </div>
                            </div>
                            <div>
                                <div className="buttonopen" onClick={deviceOpenFunction}>OPEN</div>
                            </div>
                        </div>
                    </header>
                }
                <header className={currentPathStrings ?
                    "headerMenu headerWhite headerGradient" : "headerMenu gradientCheck headerGradient"}
                >
                    <div className="screenContainer">
                        <div className={background === true ? "blackScreen1" : ''}
                            onMouseEnter={() => { setMouseHover(false); setBackground(false); setMenuClose(true) }}>
                        </div>
                    </div>
                    <div className="container headerWrapper">
                        <div className="logosection">
                            <div className="logoContain">
                                <div className="menuIcon" rel="nofollow" onMouseOver={() => { if (menuClose === false) {
                                        setMenuClose(true);
                                    } else {
                                        setMenuClose(false);
                                    } }} onClick={() => {
                                    if (menuClose === false) {
                                        setMenuClose(true);
                                    } else {
                                        setMenuClose(false);
                                    }
                                }}>
                                    <span className="hamburger"></span>
                                </div>
                                <div className={menuClose === true ? 'menuItemContainer' : 'menuItemContainer menuClose'}
                                    onMouseLeave={() => { setMenuClose(false); setBackground(false) }}>
                                    <div className="menuWrapper" >
                                        <div className="mobileSearch">
                                            <section className="searchContainer mobileSearchBG">
                                                {
                                                    login === true ?
                                                        <div>
                                                            <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                                                                <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                                            </svg>
                                                            <form onSubmit={submitSearch}>
                                                                <input className="searchInput" id="searchInput" type="search" placeholder="Search" required="" onChange={onChangeHandler}
                                                                    value={parsed.show_id ? typing === true ? input : '' : input} />
                                                            </form>
                                                            <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                                                                <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                                                            </svg>
                                                        </div> : null
                                                }
                                            </section>
                                        </div>
                                        <div className="menuRowItem" onMouseLeave={() => { setMenuClose(true) }}>
                                            <div className="menuWrapperHeight">
                                                <div className="menuWidth20" >
                                                    <div className="menuCol">
                                                        <div className="menuItemHead">Popular</div>
                                                        <div className="menuListItems">
                                                            <div className="menuInnerCol">
                                                                <Link to={{ pathname: '/home' }}>
                                                                    <div className="linkButton headerMenuItems">Live TV</div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="menuListItems">
                                                            <div className="menuInnerCol">
                                                                {
                                                                    login === true ?
                                                                        (<Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${'playlist'}&category_name=${'My List'}`) }}>
                                                                            <div className="linkButton headerMenuItems">My List</div>
                                                                        </Link>)
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="menuListItems">
                                                            <div className="menuInnerCol">
                                                                <Link to={{ pathname: '/home/recentlyadded' }}>
                                                                    <div className="linkButton headerMenuItems">New Arrivals </div>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="menuItemHead">Main Links</div>
                                                        <div className="menuListItems">
                                                            <Link to={{ pathname: '/aboutus' }}>
                                                                <div className="linkButton headerMenuItems">About Us</div>
                                                            </Link>

                                                        </div>
                                                        <div className="menuListItems">
                                                            <Link to={{ pathname: '/contactus' }}>
                                                                <div className="linkButton headerMenuItems">Contact</div>
                                                            </Link>
                                                        </div>
                                                        <div className="menuListItems">
                                                        <Link to={{ pathname: '/tv' }}>
                                                            <div className="linkButton headerMenuItems">Link TV App</div>
                                                        </Link>
                                                    </div>
                                                        <div className="menuItemHead" style={{ marginTop: '10px' }}>Categories</div>
                                                        <div className="menuListItems">
                                                            <div className="menuInnerCol">
                                                                {
                                                                    category &&
                                                                    category.map((item, index) => {
                                                                        if (category.length / 3 - 2 > index) {
                                                                            return (
                                                                                <div key={index}>
                                                                                    {
                                                                                        item.category_name &&
                                                                                        <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${item.category_id}&category_name=${item.category_name}`) }}>
                                                                                            <div className="linkButton headerMenuItems">{item.category_name}</div>
                                                                                        </Link>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }

                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="menuWidth20 menuBGcolor menuWidth40" >
                                                    <div className="menuCol">
                                                        <div className="menuItemHead">More Categories</div>
                                                        <div className="menuListItems">
                                                            <div className="menuInnerCol">
                                                                {
                                                                    category &&
                                                                    category.map((item, index) => {
                                                                        if (category.length / 3 - 2 < index) {
                                                                            return (
                                                                                <div key={index}>
                                                                                    {
                                                                                        item.category_name &&
                                                                                        <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${item.category_id}&category_name=${item.category_name}`) }}>
                                                                                            <div className="linkButton headerMenuItems">{item.category_name}</div>
                                                                                        </Link>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
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
                                <img src={'https://gizmeon.s.llnwi.net/vod/happitv-static-files/logo/fav.png'} style={{ cursor: 'pointer' }} onClick={() => {
                                    setInput('');
                                    history.push({
                                        pathname: '/home'
                                    });
                                }} width={60} />
                            </div>
                        </div>
                        {
                            currentPathStrings ?
                                (<section className="searchContainer searchBar" style={{ border: 'none' }}>
                                </section>) :
                                (
                                    <section className="searchContainer searchBar">
                                        {
                                            login === true ?
                                                <div>
                                                    <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                                                        <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                                    </svg>
                                                    <form onSubmit={submitSearch}>
                                                        <input className="searchInput" id="searchInput" type="search" placeholder="Find movies, TV shows and more" required="" onChange={onChangeHandler}
                                                            value={parsed.show_id ? typing === true ? input : '' : input} />
                                                    </form>

                                                    <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                                                        <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                                                    </svg>
                                                </div>
                                                : null
                                        }

                                    </section>
                                )
                        }

                        <div className="headerButton">
                            <div className="loginButtonContainer">
                                {
                                    login === true ?
                                        <div className={mouseHover === true ? "y_hxB _2Gq2l _1glLO IgZc0" : "y_hxB _2Gq2l"}>
                                            {
                                                currentPathStrings ?
                                                    <div className="_3tRfC" onMouseOver={() => { setMouseHover(true); setBackground(true) }} style={{ color: 'black' }}>Hi, <span className="_4wVtj">{capitalize(userName)}</span>
                                                    </div> :
                                                    <div className="_3tRfC" onMouseOver={() => { setMouseHover(true); setBackground(true) }}>Hi, <span className="_4wVtj">{capitalize(userName)}</span>
                                                    </div>
                                            }
                                            {
                                                mouseHover === true ?
                                                    <div onMouseLeave={() => {
                                                        setMouseHover(false);
                                                        setBackground(false)
                                                    }}>
                                                        <div className="_30s-L _13opw">
                                                            {/* <a className="ATag activeOnWhite" href="/account">Account Settings</a> */}
                                                            <a href="/contactsupport" rel="noopener" target="_blank" className="ATag activeOnWhite">Help Center</a>
                                                            <span className="_1xPbF"></span><div className="ATag signout" onClick={functionLogout}>Sign Out</div>
                                                        </div>
                                                    </div>
                                                    : null}
                                        </div>
                                        : (
                                            currentPath === '/register' ?
                                                <ul>
                                                    <li><a onClick={() => {
                                                        setInput('');
                                                        history.push({
                                                            pathname: '/signin'
                                                        });
                                                    }} style={{ cursor: 'pointer' }} className="headerSignInButton" >Sign In</a></li>
                                                </ul>
                                                : (currentPath === '/signin' ?

                                                    <ul>
                                                        <li>
                                                            <a className="" onClick={() => {
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
                                                        <li id="signInLink" style={{ display: 'block' }}>
                                                            <a className="headerSignInButton" onClick={() => {
                                                                setInput('');
                                                                history.push({
                                                                    pathname: '/signin'
                                                                });
                                                            }} style={{ cursor: 'pointer' }} >Sign In</a></li>
                                                    </ul>
                                                    :
                                                    <ul>
                                                        <li>
                                                            <a className="" onClick={() => {
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
                                                        <li><a className="headerSignInButton" onClick={() => {
                                                            setInput('');
                                                            history.push({
                                                                pathname: '/signin'
                                                            });
                                                        }} style={{ cursor: 'pointer' }} >Sign In</a></li>
                                                    </ul>
                                                )
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
    else {
        return (
            <header className={currentPathStrings ?
                "headerMenu headerWhite headerGradient" : "headerMenu gradientCheck headerGradient"}
            >
                <div className="screenContainer">
                    <div className={background === true ? "blackScreen1" : ''}
                        onMouseEnter={() => { setMouseHover(false); setBackground(false); setMenuClose(false) }}>
                    </div>
                </div>
                <div className="container headerWrapper">
                    <div className="logosection">
                        <div className="logoContain">
                            <div className="menuIcon" rel="nofollow" onMouseOver={() => { if (menuClose === false) {
                                        setMenuClose(true);
                                    } else {
                                        setMenuClose(false);
                                    } }} onClick={() => {
                                    if (menuClose === false) {
                                        setMenuClose(true);
                                    } else {
                                        setMenuClose(false);
                                    }
                                }}>
                                <span className="hamburger" ></span>
                            </div>
                            <div className={menuClose === true ? 'menuItemContainer' : 'menuItemContainer menuClose'}
                                onMouseLeave={() => { setMenuClose(false); setBackground(false) }}>
                                <div className="menuWrapper" >
                                    <div className="mobileSearch">
                                        <section className="searchContainer mobileSearchBG">
                                            {
                                                login === true ?
                                                    <div>
                                                        <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                                                            <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                                        </svg>
                                                        <form onSubmit={submitSearch}>
                                                            <input className="searchInput" id="searchInput" type="search" placeholder="Search" required="" onChange={onChangeHandler}
                                                                value={parsed.show_id ? typing === true ? input : '' : input} />
                                                        </form>

                                                        <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                                                            <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                                                        </svg>
                                                    </div> : null
                                            }

                                        </section>
                                    </div>
                                    <div className="menuRowItem" onMouseLeave={() => { setMenuClose('menuItemContainer menuClose') }}>
                                        <div className="menuWrapperHeight">
                                            <div className="menuWidth20" >
                                                <div className="menuCol">
                                                    <div className="menuItemHead">Popular</div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            <Link to={{ pathname: '/home' }}>
                                                                <div className="linkButton headerMenuItems">Live TV</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            {
                                                                login === true ?
                                                                    (<Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${'playlist'}&category_name=${'My List'}`) }}>
                                                                        <div className="linkButton headerMenuItems">My List</div>
                                                                    </Link>)
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            <Link to={{ pathname: '/home/recentlyadded' }}>
                                                                <div className="linkButton headerMenuItems">New Arrivals </div>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="menuItemHead">Main Links</div>
                                                    <div className="menuListItems">
                                                        <Link to={{ pathname: '/aboutus' }}>
                                                            <div className="linkButton headerMenuItems">About Us</div>
                                                        </Link>

                                                    </div>
                                                    <div className="menuListItems">
                                                        <Link to={{ pathname: '/contactus' }}>
                                                            <div className="linkButton headerMenuItems">Contact</div>
                                                        </Link>
                                                    </div>
                                                    <div className="menuListItems">
                                                        <Link to={{ pathname: '/tv' }}>
                                                            <div className="linkButton headerMenuItems">Link TV App</div>
                                                        </Link>
                                                    </div>
                                                    <div className="menuItemHead" style={{ marginTop: '10px' }}>Categories</div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            {
                                                                category &&
                                                                category.map((item, index) => {
                                                                    if (category.length / 3 - 2 > index) {
                                                                        return (
                                                                            <div key={index}>
                                                                                {
                                                                                    item.category_name &&
                                                                                    <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${item.category_id}&category_name=${item.category_name}`) }}>
                                                                                        <div className="linkButton headerMenuItems">{item.category_name}</div>
                                                                                    </Link>
                                                                                }
                                                                            </div>
                                                                        );
                                                                    }

                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="menuWidth20 menuBGcolor menuWidth40" >
                                                <div className="menuCol">
                                                    <div className="menuItemHead">More Categories</div>
                                                    <div className="menuListItems">
                                                        <div className="menuInnerCol">
                                                            {
                                                                category &&
                                                                category.map((item, index) => {
                                                                    if (category.length / 3 - 2 < index) {
                                                                        return (
                                                                            <div key={index}>
                                                                                {
                                                                                    item.category_name &&
                                                                                    <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${item.category_id}&category_name=${item.category_name}`) }}>
                                                                                        <div className="linkButton headerMenuItems">{item.category_name}</div>
                                                                                    </Link>
                                                                                }
                                                                            </div>
                                                                        );
                                                                    }
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
                            <img src={'https://gizmeon.s.llnwi.net/vod/happitv-static-files/logo/fav.png'} style={{ cursor: 'pointer' }} onClick={() => {
                                setInput('');
                                history.push({
                                    pathname: '/home'
                                });
                            }} width={60} />
                        </div>
                    </div>
                    {
                        currentPathStrings ?
                            (<section className="searchContainer searchBar" style={{ border: 'none' }}>
                            </section>) :
                            (
                                <section className="searchContainer searchBar">
                                    {
                                        login === true ?
                                            <div>
                                                <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                                                    <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                                </svg>
                                                <form onSubmit={submitSearch}>
                                                    <input className="searchInput" id="searchInput" type="search" placeholder="Find movies, TV shows and more" required="" onChange={onChangeHandler}
                                                        value={parsed.show_id ? typing === true ? input : '' : input} />
                                                </form>
                                                <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                                                    <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                                                </svg>
                                            </div>
                                            : null
                                    }
                                </section>
                            )
                    }

                    <div className="headerButton">
                        <div className="loginButtonContainer">
                            {
                                login === true ?
                                    <div className={mouseHover === true ? "y_hxB _2Gq2l _1glLO IgZc0" : "y_hxB _2Gq2l"}>
                                        {
                                            currentPathStrings ?
                                                <div className="_3tRfC" onMouseOver={() => { setMouseHover(true); setBackground(true) }} style={{ color: 'black' }}>Hi, <span className="_4wVtj">{capitalize(userName)}</span>
                                                </div> :
                                                <div className="_3tRfC" onMouseOver={() => { setMouseHover(true); setBackground(true) }}>Hi, <span className="_4wVtj">{capitalize(userName)}</span>
                                                </div>
                                        }
                                        {
                                            mouseHover === true ?
                                                <div onMouseLeave={() => {
                                                    setMouseHover(false);
                                                    setBackground(false)
                                                }}>
                                                    <div className="_30s-L _13opw">
                                                        {/* <a className="ATag activeOnWhite" href="/account">Account Settings</a> */}
                                                        <a href="/contactsupport" rel="noopener" target="_blank" className="ATag activeOnWhite">Help Center</a>
                                                        <span className="_1xPbF"></span><div className="ATag signout" onClick={functionLogout}>Sign Out</div>
                                                    </div>
                                                </div>
                                                : null}
                                    </div>
                                    : (
                                        currentPath === '/register' ?
                                            <ul>
                                                <li><a onClick={() => {
                                                    setInput('');
                                                    history.push({
                                                        pathname: '/signin'
                                                    });
                                                }} style={{ cursor: 'pointer' }} className="headerSignInButton" >Sign In</a></li>
                                            </ul>
                                            : (currentPath === '/signin' ?

                                                <ul>
                                                    <li>
                                                        <a className="" onClick={() => {
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
                                                    <li id="signInLink" style={{ display: 'block' }}>
                                                        <a className="headerSignInButton" onClick={() => {
                                                            setInput('');
                                                            history.push({
                                                                pathname: '/signin'
                                                            });
                                                        }} style={{ cursor: 'pointer' }} >Sign In</a></li>
                                                </ul>
                                                :
                                                <ul>
                                                    <li>
                                                        <a className="" onClick={() => {
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
                                                    <li><a className="headerSignInButton" onClick={() => {
                                                        setInput('');
                                                        history.push({
                                                            pathname: '/signin'
                                                        });
                                                    }} style={{ cursor: 'pointer' }} >Sign In</a></li>
                                                </ul>
                                            )
                                    )
                            }
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
