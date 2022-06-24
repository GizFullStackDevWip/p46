import React from 'react';
import './VideoStyle.css';
import './VideoPlayer';
import VideoPlayer from "./VideoPlayer";
import { useState } from 'react';
import ReactPlayer from 'react-player';
import VideoFilter from './VideoFilter';

/**
 * 
 */
const VideoList = () => {

const [videoUrl, setVideoUrl] = useState([]);

const RandomVideos = [
    {
      video:'https://www.youtube.com/watch?v=CHSnz0bCaUk'
     },
    {
      video:'https://www.youtube.com/watch?v=y9yhdPuP8QE'
     
    },
    {
      video: 'https://www.youtube.com/watch?v=BFS9n4B_2xA'
        
    },
    {
      video:'https://youtu.be/mw_aMpYnKxM'
    },
    {
      video:'https://www.dailymotion.com/video/x8azi89'
    }
  ];



    return(
       <>
       <div className='VideoList'>
       {/**<h1 className='ListHeadng'>{/**dynamic hello</h1> */}
       <VideoFilter/>


       {RandomVideos.map((item, index)=>{
                return (
                  <>
                  <div className='VideoCards' keys={index}>
                  <ReactPlayer width='400px' height='251px' url={item.video}/>
                  <div className='justSpacing'></div>
                  </div>
                  </>
                )
                })
                }


       
       
       </div>
       
        </>
    )
}


export default VideoList;