import React from "react";

import './SubStyle.css';
import cross from './cross.png'
import check from './check.png'
function SubPage() {
  return (
    <div style={{background:'black'}}>
      <section className="subscribe-table" >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="title-small-inner mb-2 text-uppercase">
                P46 plan features
              </h2>
              <p className="sub-title-small-inner">
                Subscribe now to get unlimited access to stream from thousands
                of hours of premium content. No Lock-IN
                Contract and Cancel anytime.
              </p>
            </div>
            <div className="clearfix"></div>
            <div className="table-price w-100 mt-5">
              <div className="row">
                <div className="col-sm-10 mx-auto">
                  <div className="table-responsive">
                    {/* <tdead></tdead> */}
                    <table className="table">
                      <tbody>
                        <tr id="subscriptionPlan">
                          <td scope="col"> </td>
                          <td scope="col"><center><button style={{minWidth:'62px' , textAlign:'center' , alignItems:'center'}} className="w-50 d-block mb-2 mb-lg-0">BASIC</button></center></td>
                          <td scope="col"><center><button style={{minWidth:'70px' , textAlign:'center', alignItems:'center'}} className="w-50 d-block mb-2 mb-lg-0"> STANDARD</button></center></td>
                          <td scope="col"><center><button style={{minWidth:'62px' , textAlign:'center', alignItems:'center'}} className="w-50 d-block mb-2 mb-lg-0">PREMIUM</button></center></td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr id="subscriptionName">
                          <td scope="row" style={{width:'300px'}}>PLAN</td>
                        </tr>
                        <tr id="subscriptionPrice">
                          <td scope="row" style={{width:'300px'}}>
                            Price
                          </td>
                        </tr>
                        <tr id="hdQuality">
                          <td scope="row" style={{width:'300px'}}>
                            SD/HD available
                          </td>
                          <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                        </tr>
                        <tr id="ads">
                          <td scope="row" style={{width:'300px'}}>
                            Ads on Videos
                          </td>
                          <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={cross} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={cross} className="d-block mx-auto" width="30" />

                            </td>
                        </tr>
                        <tr id="lap_support">
                          <td scope="row" style={{width:'300px'}}>
                            Watch P46 on your laptop, phone
                          </td>
                          <td>
                              <img src={cross} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                        </tr>
                        <tr id="screenShare">
                          <td scope="row" style={{width:'300px'}}>
                            Screens you can watch on at the same time
                          </td>
                          <td style={{textAlign:'center'}}>
                            2
                          </td>
                          <td style={{textAlign:'center'}}>
                            3
                          </td>
                          <td style={{textAlign:'center'}}>
                            4
                          </td>
                        </tr>
                        <tr id="tvSupport">
                          <td scope="row" style={{width:'300px'}}>
                            Watch P46 on your Android Tv,Roku Tv, Fire Tv
                            and can Chrome cast
                          </td>
                          <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                        </tr>
                        <tr id="tvSupportlg">
                          <td scope="row" style={{width:'300px'}}>
                            Watch P46 on your LG Tv, Samsung Tv and Apple Tv
                            (Coming Soon)
                          </td>
                          <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                        </tr>

                        <tr id="pack">
                          <td scope="row" style={{width:'300px'}}>
                            Watch Unlimited movies and TV shows
                          </td>
                          <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                            <td>
                              <img src={check} className="d-block mx-auto" width="30" />

                            </td>
                        </tr>

                        <tr id="sub_list">
                          <td scope="col"> </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="container">
              <div className="row mt-3">
                <div className="col-12">
                  <p className="text-white">
                    P46 offers unlimited access to
                    thousands of hours of content, latest information on
                    new TV shows, documentaries, classic
                    catalogue and P46 original series.
                  </p>
                  <p>
                    P46 can watch as much as you want with full HD on your
                    TV or favorite device, including tablets and smartphones
                  </p>
                  <p>
                    Also, anytime, anywhere, on nearly any Internet-connected
                    screen
                  </p>
                  <p>
                    You can play, pause and resume, with no ads or
                    commitments(depends on the chosen package ).
                  </p>
                  <p style={{color:'#c00706'}}>
                    WARNING – Only fully paid subscribers have authority to
                    access and view for their own personal use the videos broadcast by P46. In all other
                    circumstances you are notified that you may not use data
                    mining, screen scraping, copying or any other method to
                    enable you to reproduce or broadcast the content that
                    P46 makes available for subscribers on this site. If
                    you fraudulently use or attempt to use any of the content
                    P46 reserves the right to claim costs and damages on a
                    full indemnity basis and have your broadcast and your site
                    taken down. Your actions in breach of this Warning Notice
                    are serious and you and each of your representatives are
                    liable for prosecution. This site and the content each
                    contain meta data and encryption services to enable the
                    tracing of activities and to assist P46 in the
                    prosecution of all unauthorised activities including
                    fraudulent use or attempted use of any of the content or
                    breach of the Reserved Rights © held by P46.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubPage;
