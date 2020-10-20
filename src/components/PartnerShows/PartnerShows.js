import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { service } from '../../network/Partner/service';
import PartnerCategoryContainer from './PartnerCategoryContainer';
var imageUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';
const queryString = require('query-string');

const PartnerShows = () => {
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    const [partnerDetails, setPartnerDetails] = useState([]);
    const [partnerCategory, setPartnerCategory] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        service.getPartnerShows(parsed.partner_id).then(response => {
            setPartnerDetails(response.data);
            setPartnerCategory(response.data.shows);
        })

    }, []);

    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="menuCloseJS closeMenuWrapper">
                    <div className="moviePageWrapper">
                        <div className="moviePageBG"
                            style={{ backgroundImage: `url(${imageUrl + partnerDetails.partner_image})` }}
                        ></div> <div className="moviePageBG"
                            style={{ backgroundImage: 'linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2))' }}
                        ></div>
                        <div className="moviePageContainer">
                            <div className="vpContent">
                                <div className="container vpContainer">
                                    <div className="row vp3Section">
                                        <div className="col col-5-5">
                                        <div className="vpLeftSection partnerDetailLeftSection" >
                                                <div className="vpPoster partnerDetailProfilePic"
                                                    style={{ backgroundImage: `url(${imageUrl + partnerDetails.partner_image})` }}
                                                ></div>
                                            </div>
                                            <div className="vpMiddleHeading">
                                                <h1 className="vpMiddleh1" style={{ paddingBottom: '12px' }}>{partnerDetails.partner_name}</h1>
                                            </div>
                                            <div className="vpMiddleDesc partnerMiddleDesc" >{partnerDetails.partner_description}</div>
                                            {
                                                partnerCategory.map((item, index) => {
                                                    return (
                                                        <div className="row vp3Section youMayLike">
                                                            <div className="col">
                                                                <div>
                                                                    <div className="heading" style={{ fontWeight: '800', paddingBottom: '7px', fontSize: '15pt' }}>{item.show_name}</div>
                                                                    <div className="carousel carouselNoMask">
                                                                        <div className="carouselContent">
                                                                            <PartnerCategoryContainer param={item.videos} />
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                </div>
            </div>
        </div>
    );
}
export default PartnerShows;
