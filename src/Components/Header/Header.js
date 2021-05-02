import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../Images/logo.png';

const Header = () => {
    let menuList = ["Home","Memories","Events", "Blogs","Join-us"]
    return (
        <div className="header">
            <Link to="/"><img className="logo uk-animation-slide-left" src={logo} alt="logo"/></Link>
            <div className="text-md-right">
                <ul className="menu ml-0 mb-5 pr-1">
                    <div className="col-10 mx-auto">
                        <img className="menu-btn mx-auto" width="120px" src={logo} alt="logo"/>
                        <hr className="menu-btn mt-3 mx-auto"/>
                    </div>
                    {
                     menuList.map(LinkName => <li><Link to={"/"+LinkName} className="menu-btn mx-0">{LinkName}</Link></li>)
                    }
                </ul>
                <div className="menu-btn float-right">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </div>
    );
};

export default Header;