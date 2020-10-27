import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

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
import PartnerList from '../components/PartnerList/PartnerList';
import WebTermsOfUse from '../components/FooterComponents/WebTermsOfUse/WebTermsOfUse';
import WebPrivacyPolicy from '../components/FooterComponents/WebPrivacyPolicy/WebPrivacyPolicy';
import CookiePolicy from '../components/FooterComponents/CookiePolicy/CookiePolicy';
import Cookie from '../common/Cookie';
const routes = () => (
    <BrowserRouter>
        <Header />
        <Cookie />
        <div className="closeMenuWrapper">
            <Switch>
                <PublicRoutes restricted={true} path="/" exact component={Landing} />
                <PrivateRoutes path="/home" exact component={Home} />
                <PrivateRoutes path="/home/movies" exact component={Movies} />
                <PrivateRoutes path="/home/categorylist" exact component={CategoryList} />
                <PrivateRoutes path="/home/partnershows" exact component={PartnerShows} />
                <PrivateRoutes path="/home/recentlyadded" exact component={RecentlyAdded} />
                <PublicRoutes restricted={false} path="/signin" exact component={SignIn} />
                <PublicRoutes restricted={false} path="/register" exact component={Register} />
                <PrivateRoutes path="/home/series" exact component={Series} />
                <PublicRoutes restricted={false} path="/aboutus" exact component={AboutUs} />
                <PrivateRoutes path="/search" exact component={Search} />
                <PublicRoutes restricted={false} path="/subscription" exact component={SubscriptionList} />
                <PublicRoutes restricted={false} path="/success" exact component={Success} />
                <PublicRoutes restricted={false} path="/error" exact component={Error} />
                <PublicRoutes restricted={false} path="/payment" exact component={Payment} />
                <PrivateRoutes path="/videoplayer" exact component={VideoPlayer} />
                <PublicRoutes restricted={false} path="/termsandconditions" exact component={WebTermsOfUse} />
                <PublicRoutes restricted={false} path="/privacypolicy" exact component={WebPrivacyPolicy} />
                <PublicRoutes restricted={false} path="/termsofuse" exact component={TermsOfUse} />
                <PublicRoutes restricted={false} path="/policydarkmode" exact component={PrivacyPolicy} />
                <PublicRoutes restricted={false} path="/pressrelease" exact component={PressRelease} />
                <PrivateRoutes path="/advertisewithus" exact component={AdvertiseWithUs} />
                <PublicRoutes restricted={false} path="/contactus" exact component={Contact} />
                <PublicRoutes restricted={false} path="/contactsupport" exact component={ContactSupport} />
                <PublicRoutes restricted={false} path="/supportdevice" exact component={SupportedDevices} />
                <PrivateRoutes path="/partnerList" exact component={PartnerList} />
                <PublicRoutes restricted={false} path="/cookiepolicy" exact component={CookiePolicy} />
            </Switch>
        </div>
        <Footer />

    </BrowserRouter>

);
export default routes;
