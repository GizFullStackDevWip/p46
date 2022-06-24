import React from 'react';
import ReactPlayer from 'react-player';
import './VideoStyle.css';


/**
 * 
 */
const VideoPlayer = () => { 
    return (
        <div>
            <VideoPlayer 
            height='50vh'
            controls 
            url='https://www.youtube.com/watch?v=KfjIaEP0EtY'
            />

        </div>
    )
}


export default VideoPlayer;