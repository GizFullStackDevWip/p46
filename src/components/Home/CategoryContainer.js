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

  const historyPush = (type) => {
    // console.log("inddddd", id);
    if (type === "NEW_RELEASES") {
      console.log("inside if");
      history.push({
        pathname: "/home/recentlyadded",
      });
    } else if (type === "FREE_SHOWS") {
      console.log("inside free");
      history.push({
        pathname: "/home/categorylist",
        search: encodeURI(
          `category_id=${
            category.category_id
          }&category_type=${type}&category_name=${"Free Videos"}`
        ),
      });
    } else if (type === "NEWS") {
      console.log("inside news");
      history.push({
        pathname: "/home/categorylist",
        search: encodeURI(
          `category_id=${
            category.category_id
          }&category_type=${type}&category_name=${"Latest News"}`
        ),
      });
    } else {
      console.log("inside else");
      history.push({
        pathname: "/home/categorylist",
        search: encodeURI(
          `category_id=${category.category_id}&category_type=${type}&category_name=${category.category_name}`
        ),
      });
    }
  };
  //  console.log("###category###",category)
  return (
    <section className="categoryWrapper">
      <div className="_2vKa8"></div>
      <div className="container categoryHeadWrapper">
        {category.category_name && category.category_id && (
          <div className="categoryLinkWrapper">
            <div className="categoryHeading" style={{ cursor: "pointer" }}>
              {console.log("$$category", category)}
              {category.type === "LIVE" ? (
                <div className="_2hvCx">
                  <h2
                    className="_1mK3G"
                    onClick={() => {
                      historyPush(category.type);
                    }}
                    style={{ paddingBottom: "15px" }}
                  >
                    {category.category_name}
                  </h2>
                </div>
              ) : category.type === "FEATURED" ? (
                <div
                  className="_2hvCx"
                  onClick={() => {
                    historyPush(category.type);
                  }}
                >
                  <h2
                    className="_1mK3G"
                    onClick={() => {
                      historyPush(category.type);
                    }}
                    style={{ paddingBottom: "15px" }}
                  >
                    {category.category_name}
                  </h2>
                </div>
              ) : category.type === "ENDED_EVENTS" ? (
                <div
                  className="_2hvCx"
                  onClick={() => {
                    if (category.category_id != "continuewatching") {
                      historyPush(category.category_id);
                    }
                  }}
                >
                  <h2
                    className="_1mK3G"
                    onClick={() => {
                      historyPush(category.type);
                    }}
                    style={{ paddingBottom: "15px" }}
                  >
                    {category.category_name}
                  </h2>
                </div>
              ) : (
                <div
                  className="_2hvCx"
                  // onClick={() => {
                  //   if (category.category_id != "continuewatching") {
                  //     historyPush(category.category_id);
                  //   }
                  // }}
                >
                  <h2
                    className="_1mK3G"
                    onClick={() => {
                      historyPush(category.type);
                    }}
                    style={{ paddingBottom: "15px" }}
                  >
                    {category.category_name}
                  </h2>
                </div>
              )}
            </div>
            {category.type === "LIVE" ? null : category.type ===
              "FEATURED" ? null : category.type === "ENDED_EVENTS" ? null : (
              <div
                className="categoryDotsWrapper"
                style={{ cursor: "pointer", fontWeight: "900" }}
                onClick={() => {
                  historyPush(category.type);
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
            categoryId={category.type}
            funcc={param.funcc}
          />
        )}
      </div>
    </section>
  );
};
export default CategoryContainer;
