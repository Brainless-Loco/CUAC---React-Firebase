import React from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="row w-100 text-center px-md-5 px-3 contactUs">
            <div className="col-md-6 mb-md-0 mb-3 float-left text-left" uk-scrollspy="cls: uk-animation-slide-left; delay:500; repeat: false">
                <h1 className="h1 text-color1">Get In Touch</h1>
                <p className="contact-us-text text-dark">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo in necessitatibus eum, facilis quidem! Omnis rerum temporibus mollitia molestiae impedit culpa nostrum perferendis consectetur expedita, exercitationem dicta laborum nulla accusantium consequuntur error vitae consequatur corrupti! Fuga ea ab eveniet.
                </p>
                <div className="text-dark ml-3 px-2">
                    <h1 className="d-inline h1 text-color1 mr-3"> <i className="fas fa-envelope"></i> </h1> <a href="mailto::someting@gmail.com" className="h2 text-color1">admin@admin.com</a>
                    <br/> <br />
                    <h1 className="d-inline h1 text-color1 mr-3"> <i className="fab fa-facebook"></i> </h1> <a href="mailto::someting@gmail.com" className="h2 text-color1">admin@admin.com</a>
                </div> 
            </div>
            <div className="col-md-6"  uk-scrollspy="cls: uk-animation-slide-right; delay:500; repeat: false">
                <form action="" className="ml-0">
                    <input type="text" className="contactUsTextInput" placeholder="Name" name="" id="" />
                    <input type="text" className="contactUsTextInput" placeholder="Email" name="" id="" />
                    <textarea name="" id="" className="contactUsMessageInput contactUsTextInput" placeholder="Message"></textarea>
                    <Link to="/join-us" type="submit" className="join-us-button">Send Message</Link>
                </form>
            </div>

        </div>
    );
};

export default ContactUs;