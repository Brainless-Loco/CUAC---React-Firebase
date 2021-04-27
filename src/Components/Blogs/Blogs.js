import React from 'react';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

const Blogs = () => {
    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");
    return (
        <div>
            <Helmet>
                <title>Blogs | CUAC</title>
            </Helmet>
            <h1>This is blogs</h1>
        </div>
    );
};

export default Blogs;