import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import $ from "jquery";
// import './css/all.css';
import './css/fonts.css';
// import './css/form-input.css';
import './css/free-v4-shims.css';
// import './css/free.css';
// import './css/ihover.css';
// import './css/js.composer.css';
import './css/layout.css';
// import './css/libs.css';
// import './css/style.5.2.css';
import './css/style.5.4.2.1.css';
import './css/style.5.4.2.css';

import './css/style.min.5.4.2.css';
import './css/style1.3.3.css';
import './css/discover-grid-content.css'
// import './css/discover-header.css';
import './css/discovertv.css';
// import './css/plugin/slick.css';
// import './js/plugin/jquery-3.5.1.min.js';
import './js/main.js';
// import './js/moviePage.js';
import './js/supportedDevice.js';
import './js/kidstv.js';
// import './js/careers.js';
// import './js/homepage.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/stylebanner.css';
import './css/style.css';
import './css/newstyles.css';

// import './js/landingRevry';

import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from './store/reducer/reducer';
const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
