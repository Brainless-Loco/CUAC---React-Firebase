import React from 'react';
import CountUp from 'react-countup';
import './Count.css';

const Count = () => {
    return (
        <div className="count-section">
            <h1 className="text-white display-4 text-center font-weight-bold">Till Now</h1>
            <div className="row text-center">
                <div className="eachCount mx-auto">
                        <p className="countUp mb-0"><CountUp start={0} end={100} duration={15} />+</p>
                        <h1 className="text-white mt-0 countTitle">Successful Events</h1>
                        <p className="countDesc">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ab facere beatae veritatis minima voluptate?
                        </p>
                </div>
                <div className="eachCount mx-auto">
                        <p className="countUp mb-0"><CountUp start={0} end={500} duration={15} />+</p>
                        <h1 className="text-white mt-0 countTitle">Active Members</h1>
                        <p className="countDesc">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ab facere beatae veritatis minima voluptate?
                        </p>
                </div>
                <div className="eachCount mx-auto">
                        <p className="countUp mb-0"><CountUp start={0} end={100} duration={15} />+</p>
                        <h1 className="text-white mt-0 countTitle">Great Volunteers</h1>
                        <p className="countDesc">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ab facere beatae veritatis minima voluptate?
                        </p>
                </div>
            </div>
            
        </div>
    );
};

export default Count;