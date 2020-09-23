import React, { useState, useEffect } from 'react';
import Show from './Show';
import { Link } from 'react-router-dom'
import { service } from '../../network/Home/service';

const CategoryContainer = (param) => {
    useEffect(() => {
    }, []);

    return (
        <section className="categoryWrapper">
            <div className="_2vKa8"></div>
            <div className="container categoryHeadWrapper">
                <div className="categoryLinkWrapper">
                    <div className="categoryHeading">
                        <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${param.param.category_id}`) }}>
                            <div className="_2hvCx">
                                <h2 className="_1mK3G">{param.param.category_name}</h2>
                            </div>
                        </Link>
                    </div>
                    <Link to={{ pathname: '/home/categorylist', search: encodeURI(`category_id=${param.param.category_id}`) }}>
                        <div className="categoryDotsWrapper">
                            <div className="categoryDots"></div>
                        </div>
                    </Link>
                </div>
                <Show param={param.param.shows} />
            </div>
        </section>
    );
};
export default CategoryContainer;