import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css';
import $ from 'jquery';
import About from '../AboutSection/About';
import Count from '../CountSection/Count';
import HomeMemories from '../HomeMemories/HomeMemories';
import { Strings } from '../../Utilities/Constants';

const Home = () => {
    $('.header').removeClass("bg-color-1");
    $('.header .logo').removeClass("bg-color-1");
    return (
        <div>
            <Helmet>
                <title> CUAC | Chittagong University Advenchar Club</title>
            </Helmet>
            <div className="home-first">
                <div className="slide-center text-center">
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
            <HomeMemories/>
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