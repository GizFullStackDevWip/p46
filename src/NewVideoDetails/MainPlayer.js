import React from 'react';
import VideoPlayer from'react-video-js-player';
//
import videojs from 'video.js';


const MainPlayer = () => {
    return (
    <>
    <div>
     <VideoPlayer
     src = 'https://www.youtube.com/watch?v=lVJLNsLNnWs'
     width='720'
     />
    </div>;
    </>
    )
}



export default MainPlayer;