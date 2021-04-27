import React from 'react';
import { Helmet } from 'react-helmet';
import './JoinUs.css';
import $ from 'jquery';

const JoinUs = () => {
    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");
    return (
        <div>
            <Helmet>
                <title>Join CUAC</title>
            </Helmet>
            Join Us
        </div>
    );
};

export default JoinUs;