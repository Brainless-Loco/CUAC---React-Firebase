import React from 'react';
import './HomeEachMemory.css';

const HomeEachMemory = (props) => {
    return (
        <div className="EachMemory mb-4 mx-3" >
            <img src={props.imageURL} alt=""/>
            <a className="uk-inline MemoryDescDiv" href={props.imageURL} data-type="image" data-caption={props.Caption} /* Ekhane Caption or behind the story Hobe */>
                <div className="MemoryDescriptions">
                    <p className="title py-0 my-0">Omukh or Tomuk Event</p> {/*Photo Name hobe ekhane  not caption or story*/}
                    <p className="date py-0 mt-1">15 December, 2020</p> {/*Photo Date */}
                    <p className="text-white my-0"> <i className="fas fa-link"></i> Preview </p>
                </div>
            </a>
        </div>
    );
};

export default HomeEachMemory;