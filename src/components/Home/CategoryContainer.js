import React, { useState, useEffect } from 'react';
import Show from './Show';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
const CategoryContainer = (param) => {
    const history = useHistory();
    useEffect(() => {
    }, []);

    return (
        <section className="categoryWrapper">
            <div className="_2vKa8"></div>
            <div className="container categoryHeadWrapper">
                <div className="categoryLinkWrapper">
                    <div className="categoryHeading" style={{cursor:'pointer'}}>
                        <div className="_2hvCx" onClick={() => { history.push({ pathname: '/home/categorylist', search: encodeURI(`category_id=${param.param.category_id}`) }) }}>
                            <h2 className="_1mK3G">{param.param.category_name}</h2>
                        </div>
                    </div>
                    <div className="categoryDotsWrapper" style={{cursor:'pointer'}} onClick={() => { history.push({ pathname: '/home/categorylist', search: encodeURI(`category_id=${param.param.category_id}`) }) }}>
                        <div className="categoryDots"></div>
                    </div>
                </div>
                <Show param={param.param.shows} />
            </div>
        </section>
    );
};
export default CategoryContainer;
