import React, { useState, useEffect } from "react";
import { service } from "../../network/Home/service";
import ReactHlsPlayer from "react-hls-player";
import "react-multi-carousel/lib/styles.css";
import {
  convertTimeToLocal,
  deviceDetect,
  playerController,
  //   ssaiAdParam,
} from "../../Utils/utils";
var liveThumbnailUrl = "https://gizmeon.s.llnwi.net/vod/thumbnails/images/";
var details = [];
var pause = false;
var isSafari = false;
const LiveContainer = (param) => {
  const [channels, setChannels] = useState([]);
  const [logo, setLogo] = useState("");
  const [videoPlayer, setVideoPlayer] = useState();
  const [isVideoPause, setIsVideoPause] = useState(true);
  const [isSSAI, setIsSSAI] = useState(false);
  const [livePlayerId, setLivePlayerId] = useState("");
  let lplayerId = "";
  useEffect(() => {
    isSafari =
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    if (param.param) {
      let videoElem =
        "live_content_video";
      setVideoPlayer(
        <video
          id={videoElem}
          className="video-js vjs-default-skin vjs-big-play-centered mainPlayer"
          controls
          preload="auto"
          autoPlay
          x-webkit-airplay="deny"
          crossOrigin="anonymous"
          onPlayerReady={window.onPlayerReady}
          onReady={window.onPlayerReady}
          onPlay={window.onVideoPlay}
          onPlaying={window.onPlayingFunction}
          onPause={window.onVideoPause}
          onEnded={window.onVideoEnd}
        >
          <source src={param.param} type="application/x-mpegURL" />
        </video>
      );
    }
    else {
      service.getLiveChannels().then((response) => {
        if (response.data) {
          setLogo(response.data[0].image);
          setChannels(response.data[0]);
          details = response.data[0];
          let videoElem =
            "live_content_video";

          if (!details.ssai_enabled) {
            console.log(`response.data[0].live_link`,response.data[0].live_link)

            setVideoPlayer(
              <video
                id={videoElem}
                className="video-js vjs-default-skin vjs-big-play-centered mainPlayer"
                controls
                preload="auto"
                autoPlay
                x-webkit-airplay="deny"
                crossOrigin="anonymous"
                onPlayerReady={window.onPlayerReady}
                onReady={window.onPlayerReady}
                onPlay={window.onVideoPlay}
                onPlaying={window.onPlayingFunction}
                onPause={window.onVideoPause}
                onEnded={window.onVideoEnd}
              >
                <source src={response.data[0].live_link} type="application/x-mpegURL" />
              </video>
            );

            window.playLivePlayer(videoElem);

          } else {
            lplayerId = "live_video" + new Date().valueOf();
            setLivePlayerId(lplayerId);
            setIsSSAI(true);
            // ssaiAdParam(response.data[0]).then((params) => {
            //   window.playLivePlayer(lplayerId, response.data[0], params);
            // });
          }
        }
      });
    }

    window.addEventListener("scroll", handleScroll);
  }, [param]);

  window.onPlayingFunction = () => {
    setInterval(() => {
      if (pause === false) {
        pause = false;
      }
    }, 5000);
  };

  window.onPlayerReady = () => {
    let event = "POP02";
    service.onVideoPlayFunction(details, event).then((response) => { });
  };
  window.onVideoPlay = () => {
    let event = "POP03";
    service.onVideoPlayFunction(details, event).then((response) => { });
  };
  window.onVideoPause = () => {
    let event = "POP04";
    setIsVideoPause(false);
    pause = true;
    service.onVideoPlayFunction(details, event).then((response) => { });
  };
  window.onVideoEnd = () => {
    let event = "POP05";
    service.onVideoPlayFunction(details, event).then((response) => { });
  };

  const handleScroll = () => {
    let playerId;
    if (lplayerId && lplayerId != "") {
      playerId = lplayerId + "_html5_api";
      if (deviceDetect() === true) {
        playerController(150, playerId);
      } else {
        playerController(150, playerId);
      }
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
              id={livePlayerId}
              className="video-js vjs-default-skin vjs-big-play-centered mainPlayer"
              controls
              preload="auto"
              autoPlay
              playsinline
            ></video>
          )}

        </div>
        <div className="overlayTiles"></div>
      </div>
    </div>
  );
};
export default LiveContainer;
