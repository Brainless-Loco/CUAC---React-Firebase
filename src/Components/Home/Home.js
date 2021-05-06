import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css';
import $ from 'jquery';
import About from '../AboutSection/About';
import Count from '../CountSection/Count';
import fakeData from '../../MOCK_DATA.json';
import HomeMemories from '../HomeMemories/HomeMemories';
import FormerComment from '../FormerComments/FormerComment';
import HomeEvents from '../HomeEventTimeLine/HomeEvents';
import ContactUs from '../ContactUs/ContactUs';


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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magni quas veritatis!
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
            <ContactUs/>
        </div>
    );
};

export default Home;