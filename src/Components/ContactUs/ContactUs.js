import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="row w-100 text-center px-md-5 px-3 contactUs">
            <div className="col-md-6 float-left text-left">
                <h1 className="h1 text-color1">Get In Touch</h1>
                <p className="contact-us-text text-dark">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo in necessitatibus eum, facilis quidem! Omnis rerum temporibus mollitia molestiae impedit culpa nostrum perferendis consectetur expedita, exercitationem dicta laborum nulla accusantium consequuntur error vitae consequatur corrupti! Fuga ea ab eveniet.
                </p>
                <p className="text-dark ml-3 px-2">
                    <h1 className="d-inline h1 text-color1 mr-3"> <i class="fas fa-envelope"></i> </h1> <a href="mailto::someting@gmail.com" className="h2 text-color1">admin@admin.com</a>
                    <br/> <br />
                    <h1 className="d-inline h1 text-color1 mr-3"> <i class="fab fa-facebook"></i> </h1> <a href="mailto::someting@gmail.com" className="h2 text-color1">admin@admin.com</a>
                </p> 
            </div>
            <div className="col-md-6 float-left">
                <form action="">
                    <input type="text" className="contactUsTextInput" placeholder="Name" name="" id="" />
                    <input type="text" className="contactUsTextInput" placeholder="Email" name="" id="" />
                    <textarea name="" id="" className="contactUsMessageInput contactUsTextInput" placeholder="Message"></textarea>
                </form>
            </div>

        </div>
    );
};

export default ContactUs;