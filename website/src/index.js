import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// styles
import './index.css';
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

import LandingPage from "views/pages/LandingPage.js";
import TimeTablesPage from "views/pages/TimeTablePage";
import SubscriptionsPage from "views/pages/SubscriptionsPage";
import AboutUsPage from "./views/pages/AboutUsPage";
import ContactUsPage from "./views/pages/ContactUsPage";
import LoginPage from "./views/pages/LoginPage";
import PaymentPage from "./views/pages/PaymentPage";
import SignUpPage from "./views/pages/SignUpPage";


ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path='/time-tables' exact component={TimeTablesPage}/>
                <Route path='/' exact component={LandingPage}/>
                <Route path='/subscriptions' exact component={SubscriptionsPage}/>
                <Route path='/contact-us' exact component={ContactUsPage}/>
                <Route path='/aboutUs' exact component={AboutUsPage}/>
                <Route path='/login' exact component={LoginPage}/>
                <Route path='/payments' exact component={PaymentPage}/>
                <Route path='/signup' exact component={SignUpPage}/>

            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
);
