import React from 'react';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import './Tours.css';
import AnEvent from '../AnEvent/AnEvent';

const Tours = () => {
    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");

    return (
        <div className="EventsPage">
            <Helmet>
                <title>Events | CUAC</title>
            </Helmet>
            <h1 className="display-4 mt-0 font-weight-bold text-color1 text-center py-2">Upcoming Events</h1>

            {/* Ekhane ekta Map cholbe */}
            <div className="col-md-9 col-lg-7 mx-auto">
                <AnEvent/>
                <AnEvent/>
            </div>

            <h1 className="display-4 font-weight-bold text-color1 text-center py-2">Past Events</h1>
            <div className="col-md-9 col-lg-7 mx-auto">
                <AnEvent/>
                <AnEvent/>
            </div>

        </div>
    );
};

export default Tours;