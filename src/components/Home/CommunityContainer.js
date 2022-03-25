import React, { useState, useEffect } from 'react';
import { service } from '../../network/Partner/service';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import './PartnerContainer.css'

var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';

const CommunityContainer = () => {
    const [community, setCommunity] = useState([]);
    useEffect(() => {
        service.getCommunity().then(response => {
            setCommunity(response.data);
        })
    }, []);
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
        <section id="partnerSection" className="categoryWrapper landscapeContainerWrapper">
            {
                community &&
                community.length > 0 &&
                <div className="container categoryHeadWrapper">
                    <section className="categoryWrapper">
                        <div className="categoryLinkWrapper">
                            <div className="categoryHeading">
                                <Link to="/communityList">
                                    <div className="_2hvCx"><h2 className="_1mK3G">Communities</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </section>
                    <div className="liveTvGuide">
                        <div className="vpRightWrapper partnerWrapper">
                            <Carousel responsive={responsive} autoPlay={true} infinite={true} centerMode={true}
                                autoPlaySpeed={3000} >
                                {
                                    community &&
                                    community.map((item, index) => {
                                        // console.log('communityitem', item)
                                        return (
                                            <Link key={index} to={{ pathname: '/home/communityShows', search: encodeURI(`community_id=${item.community_id}&community_name=${item.name}`) }}>
                                                <div className="vpRelatedImage " style={{margin: '0px 10px'}}>
                                                
                                                <img className="hiIconScreen" alt={item.name} src={bannerShowUrl + item.image} width="100%" style={{ borderRadius: '1.5px', cursor: 'pointer', background: '#fff',height:"344px", width:"256px" }} />
                                                    {/* <img className="hiIconScreen" alt={item.name} src="https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/1603334959.jpg" width="100%" style={{ borderRadius: '1.5px', cursor: 'pointer', height: '225px' }} /> */}
                                                    <section className="movieTextWrapper movieTextWrapperPadding" style={{ paddingBottom: '44px' }}>
                                                        <div className="movieTextFlex">
                                                            <h3 style={{
                                                                padding: '4px',
                                                                bottom: '5px'
                                                            }}>
                                                                {
                                                                    item.name && <div className="linkButton movieTextHeading" style={{ fontSize: '16px', textAlign: 'left', display:"flex" }} >{item.name}</div>
                                                                }
                                                            </h3>
                                                            <h3>
                                                                {
                                                                    item.description && <div className="linkButton movieTextHeading" style={{ fontSize: '12px', textAlign: 'left', padding: '5px', display:"flex" }} >{item.description && item.description.slice(0, 90) + '...'}</div>
                                                                }
                                                            </h3>
                                                            
                                                        </div>
                                                    </section>
                                                </div>
                                            </Link>
                                        );
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
};
export default CommunityContainer;
