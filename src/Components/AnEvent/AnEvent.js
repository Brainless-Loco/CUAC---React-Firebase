import React from 'react';
import './AnEvent.css';

const AnEvent = (props) => {

    const {title, bannerLink, happeningAt, detailsMarkup} = props.data;

    return (
        <div className="AnEvent">
            <div className="EventCover">
                <img src={bannerLink} alt="" srcset="" />
            </div>
            <div className="EventDetails p-2">
                <h2 className="h4 text-white mb-1">{title}</h2>
                <small className="text-white"><i class="fas h5 mb-0 fa-calendar-alt"></i> {new Date(happeningAt).toDateString()} </small>
                {/* Manipulate the details markup. */}
                <div className="text-left mb-1 text-white"> 
                    {detailsMarkup}
                </div>

                {/* I'll work on the 'cost' field later */}
                <h5 className="text-left h5 my-1 text-white">Cost: 1500 BDT Only</h5>
                <button className="full-details-button">Full Details</button>
            </div>
        </div>
    );
};

export default AnEvent;