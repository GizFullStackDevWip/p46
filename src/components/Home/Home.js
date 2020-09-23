import React, { useState, useEffect } from 'react';
import BannerContainer from './BannerContainer';
import CategoryContainer from './CategoryContainer';
import { service } from '../../network/Home/service';
import LiveContainer from './LiveContainer';

const Home = () => {
    const [category, setCategory] = useState([]);
    const [categoryOrgLength, setCategoryOrgLength] = useState([]);

    useEffect(() => {
        var singleObj = []
        window.scrollTo(0, 0);
        service.getshowsbyCategory().then(response => {
            if (response.status == 100 && response.data.length > 0) {
                setCategoryOrgLength(response.data.length);
                var data = response.data;
                data.map((item, index) => {
                    if (index < 3) {
                        singleObj.push(item);
                    }
                })
                setCategory(singleObj);
            }
        })
    }, []);

    const loadMoreCategory = () => {
        service.getshowsbyCategory().then(response => {
            if (response.status == 100 && response.data.length > 0) {
                setCategoryOrgLength(0);
                var data = response.data;
                setCategory(data);
            }
        })
    }

    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <BannerContainer />
                    <div className="allCategoryContainer">
                        <LiveContainer />
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