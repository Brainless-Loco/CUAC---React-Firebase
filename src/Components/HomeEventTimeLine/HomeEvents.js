import React from 'react';
import './HomeEvents.css';
import { Link } from 'react-router-dom';
import { Timeline }  from 'vertical-timeline-component-for-react';
import AnEventDiv from '../HomeEvent/AnEventDiv';

const HomeEvents = () => {
    return (
        <div className="EventTimeLine py-5 col-md-11 mx-auto text-center">
            <h1 className="h1 text-center mb-0">Activities of CUAC</h1>

            <Timeline className="py-1 mt-4 mb-5">
                {/* Ekta Map cholbe Json Data er upore */}
                <AnEventDiv/>
                <AnEventDiv/>
                <AnEventDiv/>
                <AnEventDiv/>
            </Timeline>

            <Link to="/Events" className="see-more-button mt-0">See All</Link>
        </div>
    );
};

export default HomeEvents;