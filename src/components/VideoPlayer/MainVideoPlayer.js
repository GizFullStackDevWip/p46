import React from "react";
import VideoSearchBar from "./VideoSearchBar";
import VideoPlayer from "./VideoPlayer";
import "./VideoStyle.css";
import VideoList from "./VideoList";
import MainPlayer from "../../NewVideoDetails/MainPlayer";

const MainVideoPlayer = () => {
  return (
    <div className="MainVideoPlayer" id="MainVideoPlayer">
      <div className="SinglePlayer">
        <VideoPlayer/>
        <MainPlayer/>
      </div>
      <div>
        <VideoList />
      </div>
    </div>
  );
};

export default MainVideoPlayer;
