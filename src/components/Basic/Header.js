import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { service } from '../../network/service';
const queryString = require('query-string');
const Header = () => {
    const [input, setInput] = useState([]);
    const history = useHistory();
    const [update, setUpdate] = useState([]);
    const [timeOut, setTimeOut] = useState(0);
    const [category, setCategory] = useState([]);
const [loginBlock, setLoginBlock] = useState('block');
    const [userBlock, setUserBlock] = useState('none');
    let userName = localStorage.getItem('userName');
const [typing, setTyping] = useState(false);

    var { search } = useLocation();
    const parsed = queryString.parse(search);


    useEffect(() => {
	let isLoggedIn = localStorage.getItem('isLoggedIn');
        console.log('isLoggedIn', isLoggedIn)  
        if (localStorage.getItem('isLoggedIn') == 'true') {
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

    const submitSearch = (e) => {
      e.preventDefault();
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
                            <div className="menuWrapper" style={{    width: '629px'}}>
                                <div className="mobileSearch">
                                    <section className="searchContainer mobileSearchBG">
                                        <svg className="svgIcon searchIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18.07 18.07" style={{ fill: 'currentcolor' }}>
                                            <path fill="currentColor" d="M7.5,13A5.5,5.5,0,1,0,2,7.5,5.5,5.5,0,0,0,7.5,13Zm4.55.46A7.5,7.5,0,1,1,13.46,12l4.31,4.31a1,1,0,1,1-1.41,1.41Z"></path>
                                        </svg>
                                        <form
                                            onSubmit={submitSearch}
                                        >
                                            <input className="searchInput" id="searchInput" type="search" placeholder="Search" required="" onChange={onChangeHandler}
                                                //  onClick={onClickHandler} 
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
                                        <div className="menuWidth20" style={{width:'40%'}}>
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
                                        <div className="menuWidth20 menuBGcolor menuWidth40" style={{width:'60%'}}>
                                            <div className="menuCol">
                                                <div className="menuItemHead">Categories</div>
                                                <div className="menuListItems">
                                                    <div className="menuInnerCol">
                                                        {
                                                            category.map((item,index)=>{
                                                                return(
                                                                    <a key={index} className="linkButton headerMenuItems" href="#">{item.category_name}</a>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                    {/* <div className="innerMenuCol">
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
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="menuWidth20">
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
                                        </div> */}
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
                    <form
                     onSubmit={submitSearch}
                    >
                        <input className="searchInput" id="searchInput" type="search" placeholder="Find movies, TV shows and more" required="" onChange={onChangeHandler}
                            //  onClick={onClickHandler} 
                            value={parsed.show_id ? typing === true ? input : '' : input} />
                    </form>
                    <svg className="svgIcon searchClose" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13 13" style={{ fill: 'currentcolor' }}>
                        <path fill="currentColor" fillRule="evenodd" d="M6.5 5.793l-2.12-2.12-.708.706 2.12 2.12-2.12 2.12.707.708 2.12-2.12 2.12 2.12.708-.707-2.12-2.12 2.12-2.12-.707-.708-2.12 2.12zM7 13c-4.09 0-7-2.91-7-6 0-4.09 2.91-7 7-7 3.09 0 6 2.91 6 7 0 3.09-2.91 6-6 6z"></path>
                    </svg>
                </section>
                <div className="headerButton">
                    <div className="loginButtonContainer" style={{display:loginBlock}}>
                        <ul>
                            <li>
                                <a className="" href="/register">
                                    <button className="button buttonSecondary buttonBlock" tabIndex="-1">
                                        <div className="buttonBg"></div>
                                        <div className="buttonContent">Register</div>
                                    </button>
                                </a>
                            </li>
                            <li><a className="headerSignInButton" href="http://stagingweb.gethappi.tv/login">Sign In</a></li>
                        </ul>
                    </div>
                    <div className="loginButtonContainer" style={{display:userBlock}}>
                        <ul>
                            <li><a className="headerSignInButton" href="#">{userName}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
