import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import ReactHlsPlayer from 'react-hls-player';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { convertTimeToLocal, getDateStatus } from '../../Utils/utils';
var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';
var bannerShowUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/thumbnails/';


const LiveContainer = () => {
    const [channels, setChannels] = useState([]);
    const [logo, setLogo] = useState('');
    const [videoPlayer, setVideoPlayer] = useState();
    const [schedule, setSchedule] = useState([]);
    const [next, setNext] = useState('');
    useEffect(() => {
        service.getLiveChannels().then(response => {
            console.log('response of channel', response.data);
            setLogo(response.data[0].logo);
            setChannels(response.data[0]);
            if (response.data[0].live_link) {
                setVideoPlayer(<ReactHlsPlayer
                    id='singleVideo'
                    url={response.data[0].live_link}
                    autoplay={true}
                    controls={true}
                    width={'100%'}
                    height={'100%'}
                />)
            }
        })
        service.getLiveChannels().then(response => {
            if (response.data) {
                service.getLiveSchedule(response.data[0].channel_id).then(response => {
                    console.log('RESPOSNE OF LIVE SCHEDULE API', response.data);
                    setSchedule(response.data);
                    setNext(response.data[1].video_title);
                    response.data.map((item, index) => {
                        var date = getDateStatus(item.starttime);
                        if (date === 'tomorrow') {
                            console.log(item.video_title, 'date');
                        }
                    })
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
        <div>
            <div className="entireBanner">
                <div className="hpLiveBanner">
                    <div className="liveVideoWrapper">
                        {videoPlayer}
                        <div className="hpWrapperVideo">
                            <section className="movieTextWrapper vpRelatedMargin">
                                <div className="vpRelatedImage">
                                    <img alt={channels.video_title} src={liveThumbnailUrl + logo} width="100%" />
                                    <div className="liveTvBlackOverlay"></div>
                                    <div className="liveTvPlay"></div>
                                </div>
                                <div className="movieTextFlex" style={{height: '236px',overflowY:'scroll'}}>
                                    <div className="movieCatYear">
                                        <div>
                                            <div className="movieCategory mcMargin">
                                                <div>{channels.starttime && convertTimeToLocal(channels.starttime)}{channels.starttime && "-"} {channels.endtime && convertTimeToLocal(channels.endtime)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="linkButton movieTextHeading" style={{color: 'white',fontWeight: 'bold',fontSize: '9pt',paddingBottom: '4px'}} title={channels.video_title} >Now Playing:&nbsp;{channels.video_title}</div>
                                    <div className="linkButton movieTextHeading" style={{color: 'white',fontWeight: 'bold',fontSize: '9pt',paddingBottom: '4px'}}  title={channels.video_title} >Upcoming:&nbsp;{next}</div>
                                    {
                                        schedule.map((item,index)=>{
                                            if(index === 0 || index === 1){
                                                return(null);
                                            }else{
                                                return(
                                                    <div className="linkButton movieTextHeading" style={{color: 'white',fontWeight: 'bold',fontSize: '9pt',paddingBottom: '4px'}}  title={channels.video_title} >{getDateStatus(item.starttime)}:&nbsp;{item.video_title}</div>
                                                );
                                            }
                                            
                                        })
                                    }
                                    {/* {
                                        schedule.map((item,index)=>{
                                            if(index === 0 || index === 1){
                                                return(null);
                                            }else{
                                                {
                                                    var time = checkDateInstance(item.starttime);
                                                    if(time === 1){
                                                        <h3><div className="linkButton movieTextHeading" title={channels.video_title} >Tomorow:&nbsp;{item.video_title}</div></h3>
                                                    }
                                                }
                                            }
                                        })
                                    } */}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="overlayTiles">
                    </div>
                </div>
            </div>
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
                                                <section className="movieTextWrapper vpRelatedMargin" key={index}>
                                                    <div className="vpRelatedImage">
                                                        <img alt={item.video_title} src={bannerShowUrl + item.thumbnail} width="100%" />
                                                        <div className="liveTvBlackOverlay"></div>
                                                        {/* <div className="liveTvPlay"></div> */}
                                                    </div>
                                                    <div className="movieTextFlex">
                                                        <div className="movieCatYear">
                                                            <div>
                                                                <div className="movieCategory mcMargin">
                                                                    <div>{item.starttime && convertTimeToLocal(item.starttime)} - {item.endtime && convertTimeToLocal(item.endtime)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3>
                                                            {
                                                                item.video_title && <div className="linkButton movieTextHeading" title={item.video_title}>{item.video_title}</div>
                                                            }
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
        </div>
    );
};
export default LiveContainer;
