import React from 'react';
import OneComment from '../OneComment/OneComment';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core';
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import './FormerComment.css';

SwiperCore.use([Pagination]);


const FormerComment = () => {
    return (
        <div className="container-fluid text-center swiper-container formersNoteSection">
            <h1 className="text-white glipse-title mt-3">What Formers Say about CUAC </h1>

            <Swiper className="mySwiper" slidesPerView='auto' pagination={{"clickable":true}}>

                {/* Ekhane ekta map cholbe Json Data er upore and OneComment e props jabe */}

                <SwiperSlide  className="NoteSlide"><OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide "><OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"> <OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"><OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"> <OneComment/></SwiperSlide>
                <SwiperSlide  className="NoteSlide"><OneComment/></SwiperSlide>

            </Swiper>
            
            <br/>
        </div>
    );
};

export default FormerComment;