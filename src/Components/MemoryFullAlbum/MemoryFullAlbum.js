import React from 'react';
import { useParams } from 'react-router-dom';
import './MemoryFullAlbum.css';
import fakeData from '../../MOCK_DATA.json';
import HomeEachMemory from '../HomeEachMemory/HomeEachMemory';

const MemoryFullAlbum = () => {
    const {MemoryName} = useParams();
    // make a query from the database and find the photos of this eventname
    return (
        <div className="MemoryFullAlbumDiv">
            <h1 className="h1 text-color1 text-center">{MemoryName}</h1>
            <p className="MemoryDesc mx-md-5 mb-5 mx-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reprehenderit sunt aspernatur nihil assumenda ipsa, illum nisi corrupti itaque magni doloribus, aperiam eveniet qui ducimus soluta maiores obcaecati pariatur esse dolores praesentium laudantium! Sapiente iusto aut repudiandae, doloribus expedita aspernatur quo ea nostrum nisi quas similique facere suscipit dignissimos nulla perferendis saepe. Quaerat, possimus exercitationem.
            </p>
            <div className="d-flex mb-5 justify-content-center flex-wrap" uk-scrollspy="cls: uk-animation-fade; target: .EachMemory; delay: 300;" uk-lightbox="animation: fade">
                {
                    fakeData.map( Image =>  <HomeEachMemory imageURL={Image.imageSrc} Caption={Image.Caption} />)
                }
            </div>
        </div>
    );
};

export default MemoryFullAlbum;