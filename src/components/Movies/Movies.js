import React, { useState, useEffect} from 'react';
import Header from '../Basic/Header';
import Footer from '../Basic/Footer';
import VideoDetails from './VideoDetails';
import { useParams, useLocation } from 'react-router-dom';
const queryString = require('query-string');

const Movies = ({}) => {
    var { search } = useLocation();
    const parsed = queryString.parse(search);
    const [update,setUpdate] =useState(false)
    console.log(parsed.show_id);
    useEffect(() => {
        setUpdate(true);

    }, [update]);
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="menuCloseJS closeMenuWrapper">
                    <div className="videoPage">
                        <VideoDetails categoryId={parsed.show_id} />
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
                </div>
            </div>
        </div>
    );
}
export default Movies;