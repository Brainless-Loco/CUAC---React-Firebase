import React from 'react';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

const Tours = () => {
    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");
    return (
        <div>
            <Helmet>
                <title>Events | CUAC</title>
            </Helmet>
            This is Tours
        </div>
    );
};

export default Tours;