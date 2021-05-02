import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css';
import $ from 'jquery';
import About from '../AboutSection/About';
import Count from '../CountSection/Count';
import fakeData from '../../MOCK_DATA.json';
import HomeMemories from '../HomeMemories/HomeMemories';
import { Strings } from '../../Utilities/Constants';
import FormerComment from '../FormerComments/FormerComment';
import HomeEvents from '../HomeEventTimeLine/HomeEvents';


const Home = () => {
    $('.header').removeClass("bg-color-1");
    $('.header .logo').removeClass("bg-color-1");
    return (
        <div>
            <Helmet>
                <title> CUAC | Chittagong University Advenchar Club</title>
            </Helmet>
            <div className="home-first">
                <div className="slideShow" uk-slideshow="finite: true;autoplay: true;autoplay-interval: 1200; velocity: .3; draggable:false; animation: scale">

                    {/* <ul class="uk-slideshow-items">
                        {
                            fakeData.map(image=><li>
                                <img src={image.imageSrc} alt=""/>
                            </li>
                            )
                        }
                    </ul> */}
                 
                </div>       
                <div className="middle-center text-center">
                    <h1 className="text-white pb-0">Welcome to the world of Travellers</h1>
                    <p className="">
                        {/* Get a substring of 128 characters of the placeholder text */}
                        {Strings.placeholder_text.substr(0, 128)}
                    </p>
                    <br/>
                    <Link to="/Join-us" className="join-us-button">Join us</Link>
                </div>
                
            </div>
            <About/>
            <Count/>
            <HomeEvents/>
            <HomeMemories/>
            <FormerComment/>
            <p>
                {/* This gets a substring with 256 characters from the placeholder text. */}
                {Strings.placeholder_text.substr(0, 256)}
            </p>
            <p>
                {/* Get the whole placeholder text */}
                {Strings.placeholder_text}
            </p>
        </div>
    );
};

export default Home;