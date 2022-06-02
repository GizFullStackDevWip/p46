import React, { useState, useEffect } from "react";
import { service } from "./service";
import { useHistory } from "react-router-dom";
import "./normalize.css";
import "./basic-formpage.css";
const ManageDevice = () => {
  const history = useHistory();
  const [apiResponse, setApiResponse] = useState({ data: [] });
  const [subItems, setSubItems] = useState([]);
  let path = window.location.pathname;
  path = path.length == 1 ? "/home" : path;
  useEffect(() => {
    let singleObj = [];
    service.manageDeviceAccess().then((response) => {
      if (response.success === true) {
        let temp = [];
        setApiResponse(response.data);
        response.data.map((item, index) => {
          let subItem = (
            <li className="new">
              <hr></hr>
              <h3 className="activityUesn manageText">{item.device}</h3>
              <div className="activityAccess manageText">
                <div>{item.location}</div>
                <div className="activityDate manageText">{item.last_used}</div>
              </div>
              <hr></hr>
            </li>
          );
          temp.push(subItem);
        });
        setSubItems(temp);
      }
    });
  }, []);
  const onBack = (e) => {
    history.push("/account");
  };
  return (
    <div
      id="appMountPoint"
      className="searchPageMain"
      style={{ paddingTop: "115px", paddingBottom: "1px" }}
    >
      <div className="netflix-sans-font-loaded">
        <div lang="en-IN" className="accountLayout" dir="ltr">
          <div className="bd">
            <div
              className="responsive-account-container"
              style={{ marginBottom: "20px" }}
            >
              <div>
                <h1 style={{ color: "#fff" }}>
                  Recent device streaming activity
                </h1>
                <p style={{ color: "#6d6868", fontSize: "18px" }}>
                  The most recently used devices and locations on your account.
                </p>
                <ul className="structural retable" id="recentDeviceId">
                  {subItems}
                </ul>
                <button class="Mbutton MbuttonLarge" onClick={onBack}>
                  <div class="MbuttonBg"></div>
                  <div class="MbuttonContent">Done</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageDevice;
