import React, { useState, useEffect } from "react";
import Show from "./Show";
import { Link, useHistory } from "react-router-dom";
const CategoryContainer = (param) => {
  var cat_flag = 0;
  const history = useHistory();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    setCategory(param.param);
  }, [param]);

  const historyPush = (id) => {
    console.log("inddddd", id);
    if (id === 99994) {
      console.log("inside if");
      history.push({
        pathname: "/home/recentlyadded",
      });
    } else if (id === 99993) {
      console.log("inside free");
      history.push({
        pathname: "/home/categorylist",
        search: encodeURI(
          `category_id=${99993}&category_name=${"Free Videos"}`
        ),
      });
    } else if (id === 99996) {
      console.log("inside news");
      history.push({
        pathname: "/home/categorylist",
        search: encodeURI(
          `category_id=${99996}&category_name=${"Latest News"}`
        ),
      });
    } else {
      console.log("inside else");
      history.push({
        pathname: "/home/categorylist",
        search: encodeURI(
          `category_id=${category.category_id}&category_name=${category.category_name}`
        ),
      });
    }
  };
  return (
    <section className="categoryWrapper">
      <div className="_2vKa8"></div>
      <div className="container categoryHeadWrapper">
        {category.category_name && category.category_id && (
          <div className="categoryLinkWrapper">
            <div className="categoryHeading" style={{ cursor: "pointer" }}>
              {category.category_id === 99999 ? 
              <div
              className="_2hvCx"
              // onClick={() => {
              //   if (category.category_id != "continuewatching") {
              //     historyPush(category.category_id);
              //   }
              // }}
            >
              <h2 className="_1mK3G" style={{ paddingBottom: "15px" }}>
                {category.category_name}
              </h2>
            </div> : category.category_id ===
                99995 ? 
                <div
                  className="_2hvCx"
                  // onClick={() => {
                  //   if (category.category_id != "continuewatching") {
                  //     historyPush(category.category_id);
                  //   }
                  // }}
                >
                  <h2 className="_1mK3G" style={{ paddingBottom: "15px" }}>
                    {category.category_name}
                  </h2>
                </div> : category.category_id === 99997 ? 
                <div
                  className="_2hvCx"
                  // onClick={() => {
                  //   if (category.category_id != "continuewatching") {
                  //     historyPush(category.category_id);
                  //   }
                  // }}
                >
                  <h2 className="_1mK3G" style={{ paddingBottom: "15px" }}>
                    {category.category_name}
                  </h2>
                </div> : (
                <div
                  className="_2hvCx"
                  onClick={() => {
                    if (category.category_id != "continuewatching") {
                      historyPush(category.category_id);
                    }
                  }}
                >
                  <h2 className="_1mK3G" style={{ paddingBottom: "15px" }}>
                    {category.category_name}
                  </h2>
                </div>
              )}
            </div>
            {category.category_id === 99999 ? null : category.category_id ===
              99995 ? null : category.category_id === 99997 ? null : (
              <div
                className="categoryDotsWrapper"
                style={{ cursor: "pointer", fontWeight: "900" }}
                onClick={() => {
                  historyPush(category.category_id);
                }}
              >
                Browse More
              </div>
            )}
          </div>
        )}
        {category.shows && (
          <Show
            param={category.shows}
            update={param}
            categoryId={category.category_id}
            funcc={param.funcc}
          />
        )}
      </div>
    </section>
  );
};
export default CategoryContainer;
