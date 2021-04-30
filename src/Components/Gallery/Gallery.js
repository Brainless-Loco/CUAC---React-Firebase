import React from 'react';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

const Gallery = () => {
    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");
    return (
        <div>
            <Helmet>
                <title>Memories | CUAC</title>
            </Helmet>
            <h4>Gallery Route check</h4>
        </div>
    );
};

export default Gallery;