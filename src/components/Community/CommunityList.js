import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { service } from "../../network/Home/service";
import { Link, useHistory } from "react-router-dom";
// import { Carousel } from "bootstrap";
import Carousel from 'react-multi-carousel';

var showsImageUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/";

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
    service.getCommunity().then((response) => {
      setPartner(response.data);
    });
  };
  const hoverFunction = (flag, index) => {
    setHover(flag);
    setFocusedId(index);
  };
  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
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
        <div className="menuCloseJS closeMenuWrapper">
          <div className="container searchWrapper">
            <div className="_1py48"></div>
            <div className="searchResult">
              <h1 className="SearchResultText">Communities</h1>
            </div>
            <div className="searchResultMargin">
              <div className="row">
              <Carousel responsive={responsive}  autoPlay={true} infinite={true} centerMode={true}
                                autoPlaySpeed={2000} >
                {partner &&
                  partner.map((partner, index) => {
                    return (
                      <div
                        className="col col-4 col-lg-3 col-xl-1-5 col-xxl-2"
                        key={index}
                      >
                        <div className="movieTileMargin movieTile">
                          <div
                            className={
                              hover === true && focusedId === index
                                ? "movieTileImage movieTileImageOpen"
                                : "movieTileImage"
                            }
                            id={index}
                            onMouseOver={() => {
                              hoverFunction(true, index);
                            }}
                            onMouseLeave={() => {
                              hoverFunction(false, index);
                            }}
                          >
                            <div
                              className="movieTileIcon"
                              onClick={() => {
                                history.push({
                                  pathname: "/home/communityShows",
                                  search: encodeURI(
                                    `community_id=${partner.community_id}&community_name=${partner.name}`
                                  ),
                                });
                              }}
                            ></div>
                            {partner.image && (
                              <div
                                className="moviePoster"
                                style={{
                                  backgroundImage: `url(${
                                    showsImageUrl + partner.image
                                  })`,
                                }}
                              >
                                <div className="FeNml"></div>
                              </div>
                            )}

                            <div className="wishlistPosition wishlistTranslate wishlistParentClose">
                              <div className="wishlistButton">
                                <div className="wlgradientPosition wlgradientTranslate wlgradientClose"></div>
                              </div>
                            </div>
                          </div>
                          <section className="movieTextWrapper movieTextWrapperPadding">
                            <div className="movieTextFlex">
                              <h3>
                                {partner.name && (
                                  <div
                                    className="linkButton movieTextHeading"
                                    style={{display:"flex"}}
                                    onClick={() => {
                                      history.push({
                                        pathname: "/home/partnershows",
                                        search: encodeURI(
                                          `community_id=${partner.community_id}&community_name=${partner.name}`
                                        ),
                                      });
                                    }}
                                  >
                                    {partner.name}
                                  </div>
                                )}
                              </h3>
                              <div className="movieCatYear">
                                <div>
                                  {partner.description && (
                                    <div className="movieYear">
                                      <div className="_1MmGl">
                                        {partner.description.slice(0, 90) +
                                          "..."}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    );
                  })}
              </Carousel>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PartnerList;
