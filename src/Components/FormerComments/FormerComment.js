import React from 'react';
import OneComment from '../OneComment/OneComment';
import './FormerComment.css';

const FormerComment = () => {
    return (
        <div className="container-fluid text-center swiper-container mySwiper formersNoteSection">
            <div className="col-md-10 swiper-wrapper py-3 col-lg-8 mx-auto d-flex align-items-center justify-content-center flex-wrap">
                <OneComment/>
                <OneComment/>
            </div>
            <div className="swiper-pagination"></div>
        </div>
    );
};

export default FormerComment;