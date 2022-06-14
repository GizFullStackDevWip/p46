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
      setVideoPlayer(
        <ReactHlsPlayer
          id="singleVideo_html5_api"
          url={param.param}
          autoplay={true}
          muted={param.playing}
          controls={true}
          width={"75%"}
          height={"100%"}
          
          body
          playsinline
          onPlayerReady={window.onPlayerReady}
          onReady={window.onPlayerReady}
          onPlay={window.onVideoPlay}
          onPlaying={window.onPlayingFunction}
          onPause={window.onVideoPause}
          onEnded={window.onVideoEnd}
        />
      );
    }
    else
    {
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
                muted={param.playing}
                controls={true}
                width={"75%"}
                height={"100%"}
                body
                playsinline
                onPlayerReady={window.onPlayerReady}
                onReady={window.onPlayerReady}
                onPlay={window.onVideoPlay}
                onPlaying={window.onPlayingFunction}
                onPause={window.onVideoPause}
                onEnded={window.onVideoEnd}
              />
            );
          } else {
            // let videoElem = "live_video" + new Date().valueOf();
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

    // service.getLiveChannels().then((response) => {
    //   if (response.data) {
    //     setLogo(response.data[0].image);
    //     setChannels(response.data[0]);
    //     details = response.data[0];
    //     // console.log('aaadetails', details.ssai_enabled)
    //     if (!details.ssai_enabled) {
    //       setVideoPlayer(
    //         <ReactHlsPlayer
    //           id="singleVideo_html5_api"
    //           url={response.data[0].live_link}
    //           autoplay={true}
    //           controls={true}
    //           className="liveVideoPlayer"
    //           // width={"50%"}
    //           // height={"55%"}
    //           // style={{marginTop:"10%",marginLeft:"25%"}}
    //           playsinline
    //           onPlayerReady={window.onPlayerReady}
    //           onReady={window.onPlayerReady}
    //           onPlay={window.onVideoPlay}
    //           onPlaying={window.onPlayingFunction}
    //           onPause={window.onVideoPause}
    //           onEnded={window.onVideoEnd}
    //         />
    //       );
    //     } else {
    //       // let videoElem = "live_video" + new Date().valueOf();
    //       lplayerId = "live_video" + new Date().valueOf();
    //       setLivePlayerId(lplayerId);
    //       setIsSSAI(true);
    //     //   ssaiAdParam(response.data[0]).then((params) => {
    //     //     window.playLivePlayer(lplayerId, response.data[0], params);
    //     //   });
    //     }
    //   }
    // });
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
    if (lplayerId && lplayerId != "") {
      playerId = lplayerId + "_html5_api";
      if (deviceDetect() === true) {
        playerController(150, playerId);
      } else {
        playerController(150, playerId);
      }
    }
    // let playerId = (!isSSAI) ? 'singleVideo': 'singleVideo_html5_api';
  };

  return (
    <div className="entireBanner" id="live">
      <div className="hpLiveBanner">
        <div className="liveVideoWrapper" style={{marginTop:'80px' , display: 'flex' , justifyContent: 'center'}}>
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
              playsinline
            ></video>
          )}
          {/* <div className="hpWrapperVideo" style={{ height: "88px"}}>
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
          </div> */}
        </div>
        <div className="overlayTiles"></div>
      </div>
    </div>
  );
};
export default LiveContainer;
