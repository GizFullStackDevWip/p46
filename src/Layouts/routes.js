import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Movies from '../components/Movies/Movies';
import CategoryList from '../components/CategoryList/CategoryList';
import PartnerShows from '../components/PartnerShows/PartnerShows';
import RecentlyAdded from '../components/RecentlyAdded/RecentlyAdded';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Series from '../components/Series/Series';
import AboutUs from '../components/FooterComponents/AboutUs/AboutUs';
import Search from '../components/Search/Search';
import Header from '../components/Basic/Header';
import Footer from '../components/Basic/Footer';
import Live from '../components/Live/Live';
import SubscriptionList from '../components/SubscriptionList/SubscriptionList';
import Landing from '../components/Landing/Landing';
import Success from '../components/Payment/Succes';
import Error from '../components/Payment/Error';
import Payment from '../components/Payment/Payment';
import VideoPlayer from '../components/Video/VideoPlayer';
import TermsOfUse from '../components/FooterComponents/TermsOfUse/TermsOfUse';
import PrivacyPolicy from '../components/FooterComponents/PrivacyPolicy/PrivacyPolicy';
import PressRelease from '../components/FooterComponents/PressRelease/PressRelease';
import AdvertiseWithUs from '../components/FooterComponents/AdvertiseWithUs/AdvertiseWithUs';
import Contact from '../components/FooterComponents/Contact/Contact';
import ContactSupport from '../components/FooterComponents/ContactSupport/ContactSupport';
import SupportedDevices from '../components/FooterComponents/SupportedDevices/SupportedDevices';
const routes = () => (
    <Router>
        <Header />
        <div className="closeMenuWrapper">
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/home" exact component={Home} />
                <Route path="/home/movies" exact component={Movies} />
                <Route path="/home/categorylist" exact component={CategoryList} />
                <Route path="/home/partnershows" exact component={PartnerShows} />
                <Route path="/home/recentlyadded" exact component={RecentlyAdded} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/register" exact component={Register} />
                <Route path="/home/series" exact component={Series} />
                <Route path="/aboutus" exact component={AboutUs} />
                <Route path="/search" exact component={Search} />
                <Route path="/home/live" exact component={Live} />
                <Route path="/subscription" exact component={SubscriptionList} />
                <Route path="/success" exact component={Success} />
                <Route path="/error" exact component={Error} />
                <Route path="/payment" exact component={Payment} />
                <Route path="/videoplayer" exact component={VideoPlayer} />
                <Route path="/termsofuse" exact component={TermsOfUse} />
                <Route path="/policydarkmode" exact component={PrivacyPolicy} />
                <Route path="/pressrelease" exact component={PressRelease} />
                <Route path="/advertisewithus" exact component={AdvertiseWithUs} />
                <Route path="/contactus" exact component={Contact} />
                <Route path="/contactsupport" exact component={ContactSupport} />
                <Route path="/supportdevice" exact component={SupportedDevices} />
            </Switch>
        </div>
        <Footer />
    </Router>

);
export default routes;
