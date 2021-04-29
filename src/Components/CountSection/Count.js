import React from 'react';
import './Count.css';
import CountEachSection from './CountEach/CountEachSection';

const Count = () => {
    return (
        <div className="count-section">
            <h1 className="text-white display-4 text-center font-weight-bold">Till Now</h1>
            <div className="row text-center">
                <CountEachSection EndCount={100} Name="Successful Events" />
                <CountEachSection EndCount={500} Name="Active Travellers" />
                <CountEachSection EndCount={80} Name="Active Volunteers" />
            </div>
            
        </div>
    );
};

export default Count;