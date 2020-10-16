import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/service';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from '../../Utils/utils';
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

    currentPathStrings = (currentPath === '/register' ||
        currentPath === '/signin' ||
        currentPath === '/aboutus' ||
        currentPath === '/pressrelease' ||
        currentPath === '/advertisewithus' ||
        currentPath === '/contactus' ||
        currentPath === '/contactsupport' ||
        currentPath === '/policydarkmode' ||
        currentPath === '/termsofuse' ||
        currentPath === '/supportdevice');

    useEffect(() => {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            dispatch({ type: "LOGIN" });
        }
        service.getshowsbyCategory().then(response => {
            if (response.message == 'invalid token') {
                history.go(0)
            } else {
                setCategory(response.data);
            }
        })
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
        setTimeout(() => {
            window.location.reload(false);
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            localStorage.setItem('isLoggedIn', 'false');
            dispatch({ type: "LOGOUT" });
            setMouseHover(false);
            eraseCookie('userName');
            eraseCookie('userId');
            document.cookie = 'userId' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            eraseCookie('userEmail');
            eraseCookie('subscriptionId');
        }, 1000);
    }

    const eraseCookie = (name) => {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
    const submitSearch = (e) => {
        e.preventDefault();
    }
    return (
        <header className={currentPathStrings ?
            "headerMenu headerWhite headerGradient" : "headerMenu gradientCheck headerGradient"}>
            <div className="screenContainer">
                <div className={background === true ? "blackScreen1" : ''}
                    onMouseEnter={() => { setMouseHover(false), setBackground(false) }}>
                </div>
            </div>
            <div className="container headerWrapper">
                <div className="logosection">
                    <div className="logoContain">
                        <div className="menuIcon" rel="nofollow">
                            <span className="hamburger"></span>
                        </div>
                        <div className="menuItemContainer menuClose" >
                            <div className="menuWrapper" >
                                <div className="mobileSearch">
                                    <section className="searchContainer mobileSearchBG">
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
                                    </section>
                                </div>
                                <div className="menuRowItem">
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
                                                                (<Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${'playlist'}&category_name=${'My Playlist'}`) }}>
                                                                    <div className="linkButton headerMenuItems">My Playlist</div>
                                                                </Link>)
                                                                : null
                                                        }
                                                    </div>
                                                </div>
                                                <div className="menuListItems">
                                                    <div className="menuInnerCol">
                                                        <Link to={{ pathname: '/home/recentlyadded' }}>
                                                            <div className="linkButton headerMenuItems">Recently Added </div>
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
                                                <div className="menuItemHead" style={{ marginTop: '10px' }}>Categories</div>
                                                <div className="menuListItems">
                                                    <div className="menuInnerCol">
                                                        {
                                                            category.map((item, index) => {
                                                                if (category.length / 3 - 2 > index) {
                                                                    return (
                                                                        <div key={index}>
                                                                            <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${item.category_id}&category_name=${item.category_name}`) }}>
                                                                                <div className="linkButton headerMenuItems">{item.category_name}</div>
                                                                            </Link>
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
                                                            category.map((item, index) => {
                                                                if (category.length / 3 - 2 < index) {
                                                                    return (
                                                                        <div key={index}>
                                                                            <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${item.category_id}&category_name=${item.category_name}`) }}>
                                                                                <div className="linkButton headerMenuItems">{item.category_name}</div>
                                                                            </Link>
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
                        <img src={require('../../images/logo.png')} style={{ cursor: 'pointer' }} onClick={() => {
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
                            </section>
                        )
                }

                <div className="headerButton">
                    {
                        login === true ?
                            <div className="_1-UPh">
                                <div className={mouseHover === true ? "y_hxB _2Gq2l _1glLO IgZc0" : "y_hxB _2Gq2l"}>
                                    {
                                        currentPathStrings ?
                                            <div className="_3tRfC" onMouseOver={() => { setMouseHover(true), setBackground(true) }} style={{ color: 'black' }}>Hi, <span className="_4wVtj">{capitalize(userName)}</span>
                                            </div> :
                                            <div className="_3tRfC" onMouseOver={() => { setMouseHover(true), setBackground(true) }}>Hi, <span className="_4wVtj">{capitalize(userName)}</span>
                                            </div>
                                    }
                                    {
                                        mouseHover === true ?
                                            <div onMouseLeave={() => {
                                                setMouseHover(false),
                                                    setBackground(false)
                                            }}>
                                                <div className="_30s-L _13opw">
                                                    <a className="ATag activeOnWhite" href="/account">Account Settings</a>
                                                    <a href="/contactsupport" rel="noopener" target="_blank" className="ATag">Help Center</a>
                                                    {/* <a className="ATag" href="/activate">Activate Your Device</a> */}
                                                    <span className="_1xPbF"></span><div className="ATag signout" onClick={functionLogout}>Sign Out</div>
                                                </div>
                                            </div>
                                            : null}
                                </div>
                            </div> :
                            <div className="loginButtonContainer" >
                                {
                                    currentPath === '/register' ?
                                        (
                                            <ul>
                                                <li>
                                                    <div className="headerSignInButton" style={{ cursor: 'pointer', fontWeight: '700' }}
                                                        onClick={() => {
                                                            setInput('');
                                                            localStorage.setItem('currentUrl', window.location.pathname);
                                                            history.push({
                                                                pathname: '/signin'
                                                            });
                                                        }} >Sign In</div>
                                                </li>
                                            </ul>
                                        ) : currentPath === '/signin' ?
                                            (
                                                <ul>
                                                    <li style={{ marginRight: '20px' }}>
                                                        <div className="headerSignInButton" style={{ cursor: 'pointer', fontWeight: '700' }}
                                                            onClick={() => {
                                                                setInput('');
                                                                history.push({
                                                                    pathname: '/register'
                                                                });
                                                            }} >Register</div>
                                                    </li>
                                                    <li id="signInLink" style={{ display: 'block' }}>
                                                        <div className="headerSignInButton" style={{ cursor: 'pointer', fontWeight: '700' }}
                                                            onClick={() => {
                                                                setInput('');
                                                                window.signInTrigger();
                                                                history.push({
                                                                    pathname: '/signin'
                                                                });

                                                            }} >Sign In</div>
                                                    </li>
                                                </ul>
                                            ) :
                                            (
                                                <ul>
                                                    <li style={{ marginRight: '20px' }}   >
                                                        <div onClick={() => {
                                                            setInput('');
                                                            history.push({
                                                                pathname: '/register'
                                                            });
                                                        }}>
                                                            <button className="button buttonSecondary" tabIndex="-1">
                                                                <div className="buttonBg"></div>
                                                                <div className="buttonContent">Register</div>
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="headerSignInButton" style={{ cursor: 'pointer', fontWeight: '700' }}
                                                            onClick={() => {
                                                                setInput('');
                                                                localStorage.setItem('currentUrl', window.location.pathname);

                                                                history.push({
                                                                    pathname: '/signin'
                                                                });
                                                            }} >Sign In</div>
                                                    </li>
                                                </ul>
                                            )
                                }
                            </div>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
