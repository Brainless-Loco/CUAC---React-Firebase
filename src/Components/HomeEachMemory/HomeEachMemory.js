import React from 'react';
import './HomeEachMemory.css';

const HomeEachMemory = (props) => {
    return (
        <div className="EachMemory">
            <a class="uk-inline" href={props.imageURL} data-type="image" data-caption={props.Caption}>
                <p className="date">15 December, 2020</p>
                <img src={props.imageURL}  alt=""/>
                <p className="title p-3">Omukh or Tomuk Event</p>
            </a>
        </div>
    );
};

export default HomeEachMemory;