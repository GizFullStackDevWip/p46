import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import Carousel from 'react-multi-carousel';
import { convertTimeToLocal, getDateStatus } from '../../Utils/utils';

var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';

const LiveContainer = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        service.getLiveChannels().then(response => {
            if (response.data) {
                service.getLiveSchedule(response.data[0].channel_id).then(response => {
                    console.log('RESPOSNE OF LIVE SCHEDULE API', response.data);
                    setSchedule(response.data);
                })
            }
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
        <section className="categoryWrapper">
            {
                schedule.length > 0 &&
                <div className="container categoryHeadWrapper">
                    <section className="categoryWrapper">
                        <div className="categoryLinkWrapper">
                            <div className="categoryHeading">
                                <div className="_2hvCx"><h2 className="_1mK3G">Live TV Guide</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="liveTvGuide">
                        <div className="vpRightWrapper">
                            <Carousel responsive={responsive}>
                                {
                                    schedule.map((item, index) => {
                                        return (
                                            <section className="movieTextWrapper vpRelatedMargin liveScheduleItem" key={index}>
                                                <div className="vpRelatedImage">
                                                    <img alt={item.video_title} src={bannerShowUrl + item.thumbnail} width="100%" />
                                                    <div className="liveTvBlackOverlay"></div>
                                                    {/* <div className="liveTvPlay"></div> */}
                                                </div>
                                                <div className="movieTextFlex">
                                                    <div className="movieCatYear">
                                                        {
                                                            index === 0 ?
                                                                (
                                                                    <div className="linkButton movieTextHeading" style={{ color: '#fff', fontWeight: '800' }} title={item.video_title}>Now Playing</div>
                                                                ) : index === 1 ? (
                                                                    <div className="linkButton movieTextHeading" style={{ color: '#fff', fontWeight: '800' }} title={item.video_title}>Next</div>
                                                                ) : null
                                                        }
                                                        <div>
                                                            <div className="movieCategory mcMargin">
                                                                <div>{item.starttime && convertTimeToLocal(item.starttime)} - {item.endtime && convertTimeToLocal(item.endtime)}</div>
                                                            </div>
                                                            {
                                                                getDateStatus(item.starttime) &&
                                                                <div className="linkButton movieTextHeading" style={{ color: '#fff', fontWeight: '800' }} title={item.video_title}>{getDateStatus(item.starttime)}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <h3>{item.video_title && <div className="linkButton movieTextHeading" title={item.video_title}>{item.video_title}</div>}
                                                    </h3>
                                                </div>
                                            </section>
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
