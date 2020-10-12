import React, { useState, useEffect } from 'react';
import { service } from '../../network/Home/service';
import ReactHlsPlayer from 'react-hls-player';
import 'react-multi-carousel/lib/styles.css';
import { convertTimeToLocal } from '../../Utils/utils';
var liveThumbnailUrl = 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/';

const LiveContainer = () => {
    const [channels, setChannels] = useState([]);
    const [logo, setLogo] = useState('');
    const [videoPlayer, setVideoPlayer] = useState();
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
    }, []);
    return (
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
                            <div className="movieTextFlex">
                                <div className="movieCatYear">
                                    <div>
                                        <div className="movieCategory mcMargin">
                                            <div>{channels.starttime && convertTimeToLocal(channels.starttime)}{channels.starttime && "-"} {channels.endtime && convertTimeToLocal(channels.endtime)}</div>
                                        </div>
                                    </div>
                                </div>
                                <h3><div className="linkButton movieTextHeading">{channels.video_title}</div></h3>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="overlayTiles">
                </div>
            </div>
        </div>
    );
};
export default LiveContainer;
