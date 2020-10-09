import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import { convertTimeToLocal } from '../../Utils/utils';
import partnerThumb from '../../images/Layer-7.png';
import { Link } from 'react-router-dom';



var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';

const LiveContainer = () => {
    const [partner, setPartner] = useState([]);

    useEffect(() => {
        service.getPartners().then(response => {
            console.log('RESPOSNE OF PARTNER API', response.data);
            setPartner(response.data);
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
        <section id="partnerSection" className="categoryWrapper">
            {
                partner.length > 0 &&
                <div className="container categoryHeadWrapper">
                    <section className="categoryWrapper">
                        <div className="categoryLinkWrapper">
                            <div className="categoryHeading">
                                <div className="_2hvCx"><h2 className="_1mK3G">Partners</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="liveTvGuide">
                        <div className="vpRightWrapper">
                            <Carousel responsive={responsive}>
                                {
                                    partner.map((item, index) => {
                                        return (
                                            <Link to={{ pathname: '/home/partnershows', search: encodeURI(`partner_id=${item.partner_id}&partner_name=${item.name}`) }}>

                                                <div className="vpRelatedImage">
                                                    <img className="hiIconScreen" alt={item.name} src={bannerShowUrl + item.image} width="100%" style={{ borderRadius: '1.5px', cursor: 'pointer' }} />
                                                    <section className="movieTextWrapper movieTextWrapperPadding" style={{ background: '#0000000f', padding: '5px', marginTop: '-63px' }}>
                                                        <div className="movieTextFlex">
                                                            <h3 style={{
                                                                background: '#0000004d',
                                                                bottom: '85%',
                                                                position: 'absolute',
                                                                padding: '4px'
                                                            }}>
                                                                <div className="linkButton movieTextHeading" style={{ fontSize: '17px', textAlign: 'left' }} >{item.name}</div>
                                                            </h3>
                                                            <h3 style={{ 
                                                                bottom: '-40px',
                                                                position: 'absolute', }}>
                                                                <div className="linkButton movieTextHeading" style={{ fontSize: '14px', textAlign: 'left', padding: '5px' }} >{item.description.slice(0, 110) + '...'}</div>
                                                            </h3>
                                                            {/* <h3 style={{paddingBottom: '0px', marginBottom: '0px'}}>
                                                            <div className="linkButton movieTextHeading" style={{fontSize: '14px', textAlign: 'center'}} >{item.name}</div>
                                                        </h3> */}
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
export default LiveContainer;
