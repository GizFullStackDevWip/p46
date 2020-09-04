import React, { useState, useEffect } from 'react';
import Show from './Show';
import { service } from '../../network/Home/service';

const CategoryContainer = (param) => {
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
    }, []);

    return (
        <section className="categoryWrapper">
            <div className="_2vKa8"></div>
            <div className="container categoryHeadWrapper">
                <div className="categoryLinkWrapper">
                    <div className="categoryHeading">
                        <a className="_2hvCx" href="/category/most_popular">
                            <h2 className="_1mK3G">{param.param.categoryname}</h2>
                        </a>
                    </div>
                    <a href="/category/most_popular">
                        <div className="categoryDotsWrapper">
                            <div className="categoryDots"></div>
                        </div>
                    </a>
                </div>
                    <Show param={param.param.categoryid} />
            </div>
        </section>
    );
};
export default CategoryContainer;