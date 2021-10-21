import React, { useState, useEffect } from "react";
import { service } from "../../network/Home/service";
import ReactHlsPlayer from "react-hls-player";
import "react-multi-carousel/lib/styles.css";
import {
  convertTimeToLocal,
  deviceDetect,
  playerController,
  ssaiAdParam,
} from "../../Utils/utils";
var liveThumbnailUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/images/";
var details = [];
var pause = false;

const LiveContainer = () => {
  const [channels, setChannels] = useState([]);
  const [logo, setLogo] = useState("");
  const [videoPlayer, setVideoPlayer] = useState();
  const [isVideoPause, setIsVideoPause] = useState(true);
  const [isSSAI, setIsSSAI] = useState(false);
  const [livePlayerId, setLivePlayerId] = useState("");
  useEffect(() => {
    service.getLiveChannels().then((response) => {
      if (response.data) {
        setLogo(response.data[0].image);
        setChannels(response.data[0]);
        details = response.data[0];
        // console.log('aaadetails', details.ssai_enabled)
        if (!details.ssai_enabled) {
          setVideoPlayer(
            <ReactHlsPlayer
              id="singleVideo_html5_api"
              url={response.data[0].live_link}
              autoplay={true}
              controls={true}
              width={"100%"}
              height={"100%"}
              onPlayerReady={window.onPlayerReady}
              onReady={window.onPlayerReady}
              onPlay={window.onVideoPlay}
              onPlaying={window.onPlayingFunction}
              onPause={window.onVideoPause}
              onEnded={window.onVideoEnd}
            />
          );
        } else {
          let videoElem = "live_video" + new Date().valueOf();
          setLivePlayerId(videoElem);
          setIsSSAI(true);
          ssaiAdParam(response.data[0]).then((params) => {
            window.playLivePlayer(videoElem, response.data[0], params);
          });
        }
      }
    });
    window.addEventListener("scroll", handleScroll);
  }, []);
  window.onPlayingFunction = () => {
    setInterval(() => {
      if (pause === false) {
        pause = false;
      }
    }, 5000);
  };
  window.onPlayerReady = () => {
    let event = "POP02";
    service.onVideoPlayFunction(details, event).then((response) => {});
  };
  window.onVideoPlay = () => {
    let event = "POP03";
    service.onVideoPlayFunction(details, event).then((response) => {});
  };
  window.onVideoPause = () => {
    let event = "POP04";
    setIsVideoPause(false);
    pause = true;
    service.onVideoPlayFunction(details, event).then((response) => {});
  };
  window.onVideoEnd = () => {
    let event = "POP05";
    service.onVideoPlayFunction(details, event).then((response) => {});
  };

  const handleScroll = () => {
    //   let playerId = "singleVideo_html5_api";
    let playerId;
    if (livePlayerId && livePlayerId != "") {
      playerId = livePlayerId + "_html5_api";
    }
    // let playerId = (!isSSAI) ? 'singleVideo': 'singleVideo_html5_api';
    if (deviceDetect() === true) {
      playerController(600, playerId);
    } else {
      playerController(150, playerId);
    }
  };

  return (
    <div className="entireBanner" id="live">
      <div className="hpLiveBanner">
        <div className="liveVideoWrapper">
          {!isSSAI ? (
            videoPlayer
          ) : (
            <video
              //   id="singleVideo"
              id={livePlayerId}
              className="video-js vjs-default-skin vjs-big-play-centered mainPlayer"
              controls
              preload="auto"
              autoPlay
            ></video>
          )}
          <div className="hpWrapperVideo" style={{ height: "88px" }}>
            <section className="movieTextWrapper vpRelatedMargin">
              <div className="vpRelatedImage">
                {logo && (
                  <img
                    alt={channels.video_title}
                    src={liveThumbnailUrl + logo}
                    width="100%"
                  />
                )}
                <div className="liveTvBlackOverlay"></div>
                <div className="liveTvPlay"></div>
              </div>
              <div className="movieTextFlex">
                <div className="movieCatYear">
                  <div>
                    <div className="movieCategory mcMargin">
                      <div>
                        {channels.starttime &&
                          convertTimeToLocal(channels.starttime)}
                        {channels.starttime && "-"}{" "}
                        {channels.endtime &&
                          convertTimeToLocal(channels.endtime)}
                      </div>
                    </div>
                  </div>
                </div>
                {channels.video_title && (
                  <h3>
                    <div className="linkButton movieTextHeading">
                      {channels.video_title}
                    </div>
                  </h3>
                )}
              </div>
            </section>
          </div>
        </div>
        <div className="overlayTiles"></div>
      </div>
    </div>
  );
};
export default LiveContainer;
