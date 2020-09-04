import React, { useState, useEffect } from 'react';
import Header from '../../Basic/Header';
import BannerContainer from './BannerContainer';
import CategoryContainer from './CategoryContainer';
import Footer from '../../Basic/Footer';
import FooterInfo from '../../Basic/FooterInfo';
import { service } from '../../network/Home/service';
const Home = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        service.fetchCategories().then(response => {
            console.log('fetchCategories', response);
            setCategory(response.data);
        })
    }, []);
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <Header />
                <div className="homepageWrapper menuCloseJS closeMenuWrapper">
                    <BannerContainer />
                    <div className="allCategoryContainer">
                        {
                            category.map((category, index) => {
                                if(category.show_count !== '0'){
                                    return (
                                        <div key={index}>
                                            <CategoryContainer param ={category}/>
                                        </div>
                                    );
                                }
                            })
                        }
                        <div className="container">
                            <div className="row loadMoreContainer">
                                <button className="button buttonLarge buttonSecondary">
                                    <div className="buttonBg"></div>
                                    <div className="buttonContent">Load More</div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                    <FooterInfo />
                </div>
            </div>
        </div>
    );
};
export default Home;