import React from 'react';
<<<<<<< HEAD
import { CollectionNames } from '../../Utilities/Constants';
import { getCollection } from '../../Utilities/FirebaseUtils';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {slides: []};
    }

    componentDidMount() {
        const data = Promise.resolve(getCollection(CollectionNames.slides));
        const tempSlides = [];

        data.then((object) => {
            object.forEach(item => {
                tempSlides.push(item.img_link);
            });

            // Notify the state change to render them.
            this.setState({slides: tempSlides});
        })
    }

    componentDidUpdate() {
        // Code
    }
    
    render() {
        return (
            <div>
                This is Home

                {/* This section is to test the fetched data from the firebase. */}
                {
                    this.state.slides.map((link, idx) => {
                        return(
                            <div key={idx}>
                                <p>{idx + 1}: Image link{link}</p><br/>
                                <img src={link}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
=======
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css';
import $ from 'jquery';
import About from '../AboutSection/About';
import Count from '../CountSection/Count';

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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magni quas veritatis!
                    </p>
                    <br/>
                    <Link to="/Join-us" className="join-us-button">Join us</Link>
                </div>
                
            </div>
            <About/>
            <Count/>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In nostrum vero iste voluptate quod? Officiis libero quo iure aperiam facilis quasi? Provident, ex? Hic molestiae consequuntur nemo expedita recusandae, molestias odit voluptate. Explicabo labore, modi, omnis esse necessitatibus odio tempore quasi veritatis ducimus cupiditate deserunt odit. Neque hic deleniti commodi!
            </p>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi provident exercitationem officiis rerum, asperiores, inventore itaque iure illo expedita omnis, quia aliquid aspernatur beatae culpa corrupti dolores dolor at! Atque quis sed omnis natus blanditiis exercitationem modi ad vitae debitis, vero architecto, repudiandae totam eius excepturi consectetur magnam labore suscipit voluptates? Necessitatibus doloremque in quasi voluptatem quod nostrum laboriosam magni fuga voluptate expedita esse deserunt qui ea ab placeat consequuntur, facere repellat! Nostrum modi aut ratione. Possimus, quos. Quos eaque similique dignissimos, ipsa autem tempore id nam ducimus, temporibus ullam magni aliquid eius, asperiores quam magnam eos dolore officia quas!
            </p>
        </div>
    );
};
>>>>>>> 1e88636db6e611b103aaf43f1c7de8bd33518d5c

export default Home;