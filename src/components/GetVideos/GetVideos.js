import React, { useState, useEffect } from 'react';
import Header from '../../Basic/Header';
import Footer from '../../Basic/Footer';
import FooterInfo from '../../Basic/FooterInfo';
import VideoPlayer from './VideoPlayer';
import VideoDetails from './VideoDetails';
const GetVideos = (history) => {
    const [category,setCategory]= useState('')
    useEffect(() => {
        // console.log(history.location.state.categoryId,'his');
        // setCategory(history.location.state.categoryId);

    }, []);
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <div className="videoPage">
                        <div className="videoPageContainer">
                            <div className="videoPageBGimg"
                            // style="background-image: linear-gradient(to top, rgb(38, 38, 45), rgba(38, 38, 45, 0.4) 83%, rgba(38, 38, 45, 0.2)), url(./images/kidstvBG.jpg);"
                            ></div>
                            <VideoPlayer />
                            <VideoDetails categoryId={category}/>
                        </div>
                        <div itemProp="video" itemScope="" itemType="//schema.org/VideoObject" style={{ display: 'none' }}>
                            <meta itemProp="name" property="media:title" content="Kids TV Cartoon Shows (2019)" />
                            <span property="media:type" content="application/x-shockwave-flash">
                                <meta itemProp="duration" content="PT43M53S" />
                                <meta itemProp="thumbnailUrl" rel="media:thumbnail" content="https://canvas-bridge02.tubitv.com/TqhXytttTFksHhwcrb4GXqvcle0=/0x156:1000x713/640x360/smart/img.adrise.tv/617cbb9f-c81f-47d2-94f4-8fb757d352fe.jpg" />
                                <meta itemProp="uploadDate" content="2014-01-01T00:00:00.000Z" />
                                <meta itemProp="description" content="6 adorable animal friends known as The Loco Nuts are a comic treat as they prank each other while also being there for each other in times of trouble." />
                            </span>
                        </div>
                    </div>
                    <Footer />
                    <FooterInfo />
                </div>
            </div>
        </div>
    );
}
export default GetVideos;