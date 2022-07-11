/**Most recent*/
import React from "react";
import './NewBanner.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';

const pic = [

    {
        imag: 'https://www.projectfortysix.com/wp-content/uploads/2021/12/Oklahoma-Conservative-News-Media.png'
    },
    {
        imag: 'https://cdn5.anyclip.com/cE20M30BumV05oWs-a2H/1637250110587_248x140_thumbnail.jpg?wid=0016900002hO7xy_13313'
    },
    {
        imag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiUwEsxPFDWzfTaTbumkJLq40q38-Ln7toUw&usqp=CAU'
    }
]
/**showThumbs={false} */

const NewBanner = () => {
    return (
        <div>
            <Carousel  autoPlay={false} showArrows={true} >
                {pic.map((imags, index) => {
                    return (<div className="" key={index}>
                        <img src={imags.imag} />
                        <p className="legend">Legend {index}</p>
                    </div>
                    )

                })}

            </Carousel>

        </div>
    );
}

export default NewBanner;
