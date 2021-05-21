import React from 'react';
import HomeEachMemory from '../HomeEachMemory/HomeEachMemory';
import './HomeMemories.css';
import fakeData from '../../MOCK_DATA.json';
import { Link } from 'react-router-dom';

const HomeMemories = () => {
    
    return (
        <div className="pb-5 pt-3 text-center svg-bg">
            <h1 className="display-4 text-center text-white glipse-title">A glimpse of Memories</h1>
            <div className="d-flex mb-5 justify-content-center flex-wrap"  uk-scrollspy="target: > .EachMemory; cls: uk-animation-fade; delay: 300"  uk-lightbox="animation: fade">
                {
                    fakeData.map( Image =>  <HomeEachMemory imageURL={Image.imageSrc} Caption={Image.Caption} />)
                }
            </div>
            <Link to="/Memories" className="see-more-button">See More</Link>
        </div>
    );
};

export default HomeMemories;