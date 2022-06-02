import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { service } from "../../network/Video/service";
import { useSelector } from "react-redux";
import EpisodeDetails from "./EpisodeDetails";
import { convertAdUrl } from "../../Utils/utils";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

var details = [];

var videoDetailUtils = [];
const VideoPlayer = (history) => {
  const [videoPlayer, setVideoPlayer] = useState(
    <video
      id="content_video"
      className="video-js vjs-default-skin mainPlayer"
      controls
      preload="auto"
    >
      {" "}
      <source src="" type="video/mp4" />{" "}
    </video>
  );
  const [videoDetails, setVideoDetails] = useState();
  const historys = useHistory();
  const login = useSelector((state) => state.login);
  const data = { show: history.location.state };
  useEffect(() => {
    window.scrollTo(0, 0);
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userId = service.getCookie("userId");
    if (isLoggedIn === "true" && userId) {
      let show_details = "";
      let showId = "";
      if (history.location.state.showId) {
        showId = history.location.state.showId;
      } else {
        showId = history.location.state.show_details.show_id;
      }
      localStorage.setItem("showId", showId);
      service.getShowDetails(showId).then((response) => {
        let dataDetails = response.data.videos[0].videos;
        let showDetails = response.data;
        dataDetails.map((item, index) => {
          if (item.video_id === history.location.state.show_details.video_id) {
            show_details = item;
          }
        });

        setVideoDetails(show_details);
        details = show_details;
        videoDetailUtils = showDetails;
        service.playerToken().then((tokenResponse) => {
          let arr = show_details.video_name.split("/").reverse();
          console.log("show_details_player", show_details);
          let newURL =
            "https://poppo.tv/playlist/playlist.m3u8?id=" +
            arr[1] +
            "&token=" +
            tokenResponse.data.data +
            "&type=video";
          let videoElem =
            "content_video" + show_details.video_id + new Date().valueOf();
          var subtitle =
            '{ "employees" : [' +
            '{ "url":"https://gizmeon.s.llnwi.net/vod/subtitles/vsshort-de.vtt" , "lan":"german" },' +
            '{ "url":"https://gizmeon.s.llnwi.net/vod/subtitles/vsshort-en.vtt" , "lan":"english" },' +
            '{ "url":"https://gizmeon.s.llnwi.net/vod/subtitles/vsshort-gen.vtt" , "lan":"detch" } ]}';
          var obj = JSON.parse(subtitle);
          console.log("obj----->", obj);
          show_details.subtitles &&
            show_details.subtitles.map((item, index) => {
              return (
                <track
                  label={item.lan}
                  kind="subtitles"
                  srclang="ge"
                  src={item.url}
                  default
                />
              );
            });
          console.log(obj);

          setVideoPlayer(
            <video
              id={videoElem}
              className="video-js vjs-default-skin mainPlayer"
              controls
              preload="auto"
              autoPlay
              // onPlayerReady={onPlayerReady}
            >
              <source src={newURL} type="application/x-mpegURL" />
              {show_details.subtitles &&
                show_details.subtitles.map((item, index) => {
                  return (
                    <track
                      label={item.language_name}
                      kind="subtitles"
                      srclang={item.short_code}
                      src={item.subtitle_url}
                      default
                    />
                  );
                })}

              {show_details.closed_captions &&
                show_details.closed_captions.map((item, index) => {
                  return (
                    <track
                      label={item.language_name}
                      kind="captions"
                      srclang={item.short_code}
                      src={item.closed_caption_url}
                      default
                    />
                  );
                })}
            </video>
          );
          // show_details.ad_link = 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator=';
          let adUrl = convertAdUrl(show_details, videoDetailUtils);
          window.playMainPlayer(
            adUrl,
            videoElem,
            show_details.video_id,
            details,
            showDetails
          );
        });
      });
    } else {
      historys.push({
        pathname: "/signin",
      });
    }
  }, [login]);

  window.onVideoPlay = (videoId, vd, show_details) => {
    let event = "POP02";
    service.checkVideoSubscription(videoId).then((response) => {
      let videoDetails = response.data;
      if (
        videoDetails.premium_flag == 1 ||
        videoDetails.payper_flag == 1 ||
        videoDetails.rental_flag == 1
      ) {
        service.checkUserSubscription().then((useResponse) => {
          if (useResponse.data.length == 0) {
            let isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn == "false") {
              history.push({
                pathname: "/signin",
              });
            }
          }
        });
      } else {
        // console.log('playing...')
      }
    });
    service.onVideoPlayFunction(vd, event, show_details).then((response) => {});
  };
  window.onVideoPlayInteval = (vd, show_details) => {
    let event = "POP03";
    service.onVideoPlayFunction(vd, event, show_details).then((response) => {
      //sd
    });
  };
  window.onVideoResume = (vd, show_details) => {
    let event = "POP09";
    service
      .onVideoPlayFunction(vd, event, show_details, 240)
      .then((response) => {
        //sd
      });
  };
  window.onVideoPause = (vd, show_details) => {
    let event = "POP04";
    service
      .onVideoPlayFunction(vd, event, show_details, 240)
      .then((response) => {
        //sd
      });
  };
  window.onVideoEnd = (vd, show_details) => {
    let event = "POP05";
    service.onVideoPlayFunction(vd, event, show_details).then((response) => {
      historys.push({
        pathname: "/home",
      });
    });
  };

  return (
    <div className="pageWrapper searchPageMain">
      <div className="topContainer">
        <div className="homepageWrapper menuCloseJS closeMenuWrapper">
          <div className="entireBanner" style={{ zIndex: "2" }} id="live">
            <div className="hpLiveBanner">
              <div className="liveVideoWrapper">{videoPlayer}</div>
            </div>
          </div>
          {/* {history.location.state.singleVideo == 0 ? (
            <EpisodeDetails categoryId={data} />
          ) : null} */}
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
