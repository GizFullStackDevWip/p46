import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import Home from "../components/Home/Home";
import Movies from "../components/Movies/Movies";
import CategoryList from "../components/CategoryList/CategoryList";
import PartnerShows from "../components/PartnerShows/PartnerShows";
import RecentlyAdded from "../components/RecentlyAdded/RecentlyAdded";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import Series from "../components/Series/Series";
import AboutUs from "../components/FooterComponents/AboutUs/AboutUs";
import Search from "../components/Search/Search";
import Header from "../components/Basic/Header";
import Footer from "../components/Basic/Footer";
import Landing from "../components/Landing/Landing";
import Success from "../components/Payment/Success";
import Error from "../components/Payment/Error";
import VideoPlayer from "../components/Video/VideoPlayer";
import TermsOfUse from "../components/TermsOfUse/TermsOfUse";
// import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
import PressRelease from "../components/FooterComponents/PressRelease/PressRelease";
import AdvertiseWithUs from "../components/FooterComponents/AdvertiseWithUs/AdvertiseWithUs";
import Contact from "../components/FooterComponents/Contact/Contact";
import ContactSupport from "../components/FooterComponents/ContactSupport/ContactSupport";
import SupportedDevices from "../components/FooterComponents/SupportedDevices/SupportedDevices";
import PartnerList from "../components/PartnerList/PartnerList";
// import WebTermsOfUse from "../components/FooterComponents/WebTermsOfUse/WebTermsOfUse";
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "../components/FooterComponents/CookiePolicy/CookiePolicy";
import Activate from "../components/Activate/Activate";
import Account from "../components/Account/Account";
import LandingNew from "../components/LandingNew/Landing";
import LandingUS from "../components/LandingUS/Landing";
import ManageDevice from "../components/ManageDevice/ManageDevice";
import SignOutAll from "../components/SignOutAll/Signout";
import ChangePassword from "../components/Changepassword/changePassword";
import BilingActivity from "../components/BillingDetails/BilingActivity";
import SubscriptionList from "../components/SubscriptionList/SubscriptionList";
import Payment from "../components/Payment/Payment";

const routes = () => {
  const isAndroid = useSelector((state) => state.isAndroid);
  let isCoutryAllowed = true;
  let countryName =
    localStorage.getItem("currentLocation") &&
    JSON.parse(localStorage.getItem("currentLocation")).country_name;

  return (
    <Router>
      {!isAndroid && <Header />}

      <>
        <div className="closeMenuWrapper">
          <Switch>
            <PublicRoute path="/" exact component={Home} />
            {/* <PublicRoute path="/test" exact component={Landing} /> */}
            <PublicRoute path="/home" exact component={Home} />
            <PublicRoute path="/home/movies" exact component={Movies} />
            <PublicRoute
              path="/home/categorylist"
              exact
              component={CategoryList}
            />
            <PublicRoute
              path="/home/recentlyadded"
              exact
              component={RecentlyAdded}
            />
            <Route path="/signin" exact component={SignIn} />
            {/* <Route path="/unavailable" exact component={LandingUS} /> */}
            <Route path="/register" exact component={Register} />
            <PublicRoute path="/aboutus" exact component={AboutUs} />
            <PublicRoute path="/search" exact component={Search} />
            <PublicRoute path="/videoplayer" exact component={VideoPlayer} />
            <PublicRoute path="/termsofuse" exact component={TermsOfUse} />
            <PublicRoute
              path="/policydarkmode"
              exact
              component={PrivacyPolicy}
            />
            <PublicRoute
              path="/pressrelease"
              exact
              component={PressRelease}
            />
            <PublicRoute
              path="/contactsupport"
              exact
              component={ContactSupport}
            />
            <PublicRoute
              path="/termsandconditions"
              exact
              component={TermsOfUse}
            />
            <PublicRoute
              path="/privacypolicy"
              exact
              component={PrivacyPolicy}
            />
            <PrivateRoute path="/tv" exact component={Activate} />
            <PrivateRoute path="/account" exact component={Account} />
            <PrivateRoute
              path="/manageDevice"
              exact
              component={ManageDevice}
            />
            <PrivateRoute path="/signout" exact component={SignOutAll} />
            <PrivateRoute
              path="/changePassword"
              exact
              component={ChangePassword}
            />
            <PrivateRoute
              path="/BilingActivity"
              exact
              component={BilingActivity}
            />
            <PublicRoute
              path="/SubscriptionList"
              exact
              component={SubscriptionList}
            />
            <PrivateRoute path="/payment" exact component={Payment} />
            <PrivateRoute path="/success" exact component={Success} />
            <PrivateRoute path="/error" exact component={Error} />
          </Switch>
        </div>
        <Footer />
      </>

    </Router>
  );
};
export default routes;
