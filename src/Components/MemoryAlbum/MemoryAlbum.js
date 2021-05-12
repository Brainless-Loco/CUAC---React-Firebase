import React from 'react';
import { Link } from 'react-router-dom';
import './MemoryAlbum.css';

const MemoryAlbum = (props) => {
    // make a query on props.name and find the event
    return (
        <Link to={"/MemoriesOf/"+props.Name} className="memoryAlbum card" title="omukh or tomukh event">
            <img key="1" src="Image/logo.png" alt=""/>
            <h5 className="h5 text-color1 my-1">Omukh or Tomukh Event</h5>
            <small className="memoryAlbumDate text-dark">15 July, 2020</small>
        </Link>
    );
};

export default MemoryAlbum;