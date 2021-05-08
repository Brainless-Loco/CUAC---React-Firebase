import React from 'react';
import './AnEvent.css';

const AnEvent = (props) => {

    

    return (
        <div className="AnEvent">
            <div className="EventCover">
                <img src="Image/logo.png" alt="" srcset="" />
            </div>
            <div className="EventDetails p-2">
                <h2 className="h4 text-white mb-1">Here will be an Event Title 2022</h2>
                <small className="text-white"><i class="fas h5 mb-0 fa-calendar-alt"></i> 15 th January, 2023</small>
                <p className="text-left mb-1 text-white"> 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas provident sit molestiae odit repellendus molestias similique quae veritatis aliquid error.<br/>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, adipisci!
                </p>
                <h5 className="text-left h5 my-1 text-white">Cost: 1500 BDT Only</h5>
                <button className="full-details-button">Full Details</button>
            </div>
        </div>
    );
};

export default AnEvent;