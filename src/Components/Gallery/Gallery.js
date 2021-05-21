import React from 'react';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import './Gallery.css';
import MemoryAlbum from '../MemoryAlbum/MemoryAlbum';

const Gallery = () => {
    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");

    return (
        <div className="memoriesDiv pb-5">
            <Helmet>
                <title>Memories | CUAC</title>
            </Helmet>
            <h1 className="text-color1 text-center font-weight-bold">Memories of CUAC</h1>

            <div className="memoryAlbums" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .memoryAlbum; delay: 400; repeat: false">
                {/* map through Database */}

                <MemoryAlbum Name="One Event Name" date=""/>
                <MemoryAlbum Name="safd alifdj" date=""/>
                <MemoryAlbum Name="aldfhdv daifjv" date=""/>
                <MemoryAlbum Name="adfvd ojdav o" date=""/>
                <MemoryAlbum Name="dalvn advj p" date=""/>
                <MemoryAlbum Name="haha" date=""/>
                
            </div>

        </div>
    );
};

export default Gallery;