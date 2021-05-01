import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css';
import $ from 'jquery';
import About from '../AboutSection/About';
import Count from '../CountSection/Count';
import HomeMemories from '../HomeMemories/HomeMemories';
import FormerComment from '../FormerComments/FormerComment';


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
            <HomeMemories/>
            <FormerComment/>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In nostrum vero iste voluptate quod? Officiis libero quo iure aperiam facilis quasi? Provident, ex? Hic molestiae consequuntur nemo expedita recusandae, molestias odit voluptate. Explicabo labore, modi, omnis esse necessitatibus odio tempore quasi veritatis ducimus cupiditate deserunt odit. Neque hic deleniti commodi!
            </p>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi provident exercitationem officiis rerum, asperiores, inventore itaque iure illo expedita omnis, quia aliquid aspernatur beatae culpa corrupti dolores dolor at! Atque quis sed omnis natus blanditiis exercitationem modi ad vitae debitis, vero architecto, repudiandae totam eius excepturi consectetur magnam labore suscipit voluptates? Necessitatibus doloremque in quasi voluptatem quod nostrum laboriosam magni fuga voluptate expedita esse deserunt qui ea ab placeat consequuntur, facere repellat! Nostrum modi aut ratione. Possimus, quos. Quos eaque similique dignissimos, ipsa autem tempore id nam ducimus, temporibus ullam magni aliquid eius, asperiores quam magnam eos dolore officia quas!
            </p>
        </div>
    );
};

export default Home;