import React, { useEffect } from "react";
import "./KeyArtWork1.css";
let url = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";

const Keyartwork = ({ keyartWork }) => {
  useEffect(() => {
    console.log("keyartwork");
  }, [keyartWork]);

  if (keyartWork) {
    return (
      <div className="articleSection">
        <div className="showingCategoryWrapper123">
          <div className="articleSectionContainer">
            <h2 className="articleSectionHeading">Key Artwork</h2>
            <div className="articleSectionRowCol">
              {keyartWork &&
                keyartWork.map((item, index) => {
                  return (
                    <div className="articleSectionBox" key={index}>
                      <div className="articleSectionBoxPadding">
                        <div className="articleSectionImgText">
                          <div className="articleSectionImg">
                            <a href="#">
                              <img
                                src={url + item.image}
                                alt="No image"
                                loading="lazy"
                              />
                            </a>
                          </div>
                          {item.title && (
                            <div className="keyartwork__title__wrapper">
                              <div className="keyartwork__title">
                                {item.title}
                              </div>
                            </div>
                          )}

                          {/* <div className="articleSectionText">
                      <div className="articleSectionTextWidth">
                        <a href="#">
                          <h3 className="articleSectionTitle">
                            No Woman Can Cook the Same Meal Twice: The Video Work
                            of Les Insoumuses
                          </h3>
                          <div className="articleSectionPara">
                            In the 1970s a group of women came together to use the
                            power and accessibility of video to document women’s
                            stories.
                          </div>
                        </a>
                      </div>
                      <div className="articleSectionTextAuthor">
                        <span className="articleSectionAuthorWrap">
                          <a href="#" className="articleSectionAuthorBold">
                            Madeleine Wall
                          </a>
                          <time
                            datetime="2021-07-02T08:30:00Z"
                            className="articleSectionAuthorDate"
                          >
                            02 Jul 2021
                          </time>
                        </span>
                        <span className="articleSectionCommentBox">
                          <div width="18px" className="articleSectionCommentIcon">
                            <svg viewBox="0 0 91.6 87.54" fill="#9B9B9B">
                              <path d="M41.41,71.48l-17,14.07q-3.7,2.92-6.83,1.56t-3.13-6.25V71.48h-4.1a10,10,0,0,1-7.32-3,10.22,10.22,0,0,1-3-7.52V10.35A10,10,0,0,1,3,3a10,10,0,0,1,7.32-3h70.9a10,10,0,0,1,7.32,3,10,10,0,0,1,3,7.32V60.94a10.3,10.3,0,0,1-3,7.42,9.83,9.83,0,0,1-7.32,3.12Z"></path>
                            </svg>
                          </div>
                          <span>1</span>
                        </span>
                      </div>
                    </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Keyartwork;
