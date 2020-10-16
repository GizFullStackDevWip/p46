import React, { useState, useEffect } from 'react';
import Show from './Show';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
const CategoryContainer = (param, clickHandler) => {
    const history = useHistory();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        setCategory(param.param);
    }, [param]);

    return (
        <section className="categoryWrapper">
            <div className="_2vKa8"></div>
            <div className="container categoryHeadWrapper">
                <div className="categoryLinkWrapper">
                    <div className="categoryHeading" style={{ cursor: 'pointer' }}>
                        <div className="_2hvCx"
                            onClick={() => {
                                history.push({
                                    pathname: '/home/categorylist',
                                    search: encodeURI(`category_id=${category.category_id}&category_name=${category.category_name}`)
                                })
                            }}>
                            <h2 className="_1mK3G">{category.category_name}</h2>
                        </div>
                    </div>
                    <div className="categoryDotsWrapper" style={{ cursor: 'pointer' }}
                        onClick={() => {
                            history.push({
                                pathname: '/home/categorylist',
                                search: encodeURI(`category_id=${category.category_id}&category_name=${category.category_name}`)
                            })
                        }}>
                        <div className="categoryDots"></div>
                    </div>
                </div>
                <Show param={category.shows} update={param} />
            </div>
        </section>
    );
};
export default CategoryContainer;
