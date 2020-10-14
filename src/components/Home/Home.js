import React, { useState, useEffect } from 'react';
import CategoryContainer from './CategoryContainer';
import { useSelector, useDispatch } from 'react-redux';
import { service } from '../../network/Home/service';
import LiveContainer from './LiveContainer';
import LiveSchedule from './LiveSchedule';
import { Link, useHistory } from 'react-router-dom';
import PartnerContainer from './PartnerContainer';
import partnerThumb from '../../images/Layer-7.png';
import Notification from '../../common/Notification';

const Home = () => {
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const [categoryOrgLength, setCategoryOrgLength] = useState([]);
    const dispatch = useDispatch();
    const addToMyList = useSelector((state) => state.addToMyList);
    const signInBlock = useSelector((state) => state.signInBlock);
    const login = useSelector((state) => state.login);
    useEffect(() => {
        window.scrollTo(0, 0);
        var singleObj = []
        service.getshowsbyCategory().then(response => {
            console.log(response.data, 'resssss');
            if (response.status === 100 && response.data.length > 0) {
                setCategoryOrgLength(response.data.length);
                var data = response.data;
                data.map((item, index) => {
                    if (index < 4) {
                        singleObj.push(item);
                    }
                })
                setCategory(singleObj);
            }
        })
    }, [login]);

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
                    {
                        signInBlock === true ? (
                            <Notification />)
                            : null
                    }
                    <LiveContainer />
                    <LiveSchedule />
                    <PartnerContainer />
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
                            categoryOrgLength > 4 &&
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
