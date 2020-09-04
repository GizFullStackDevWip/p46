import React, { useState, useEffect } from 'react';
const VideoPlayer = () => {
    return (
        <div className="_2xXnB">
            <div className="_2KWdL">
                <section className="_1dQ5J">
                    <div className="_3tqpT">
                        <video controls style={{ width: '100%', height: '100%' }}>
                            <source src="./video/devstories.webm" type='video/webm;codecs="vp8, vorbis"' />
                            <source src="./video/devstories.mp4" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
                        </video>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default VideoPlayer;