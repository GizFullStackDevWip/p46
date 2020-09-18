import React, { useState, useEffect } from 'react';
import Header from '../Basic/Header';
import BannerContainer from './BannerContainer';
import CategoryContainer from './CategoryContainer';
import Footer from '../Basic/Footer';
import { service } from '../../network/Home/service';
const Home = () => {
    const [category, setCategory] = useState([]);
    const [categoryOrgLength, setCategoryOrgLength] = useState([]);
    useEffect(() => {
        var singleObj = []
        window.scrollTo(0, 0);
        service.getshowsbyCategory().then(response => {
            console.log(response.data, 'dara');
            setCategoryOrgLength(response.data.length);
            var data = response.data;
            data.map((item, index) => {
                if (index < 3) {
                    singleObj.push(item);
                }
            })
            setCategory(singleObj);
        })

    }, []);
    const loadMoreCategory =()=>{
        service.getshowsbyCategory().then(response => {
            console.log(response.data, 'dara');
            setCategoryOrgLength(0);
            var data = response.data;
            setCategory(data);
        })
    }
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <BannerContainer />
                    <div className="allCategoryContainer">
                        {
                            category.map((category, index) => {
                                if (category.show_count !== '0') {
                                    return (
                                        <div key={index}>
                                            <CategoryContainer param={category} />
                                        </div>
                                    );
                                }
                            })
                        }
                        {
                            categoryOrgLength > 3 &&
                            <div className="container" onClick={loadMoreCategory}>
                                <div className="row loadMoreContainer">
                                    <button className="button buttonLarge buttonSecondary">
                                        <div className="buttonBg"></div>
                                        <div className="buttonContent">Load More</div>
                                    </button>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;