import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    let menuList = ["Home","Memories","Events", "Blogs","Join-us"]
    return (
        <div className="header">
            <Link to="/"><img className="logo uk-animation-slide-left" src='./Image/logo.png' alt=""/></Link>
            <div className="text-md-right">
                <ul class="menu ml-0 mb-5 pr-1">
                    <div className="col-10 mx-auto">
                        <img className="menu-btn mx-auto" width="120px" src='./Image/logo.png' alt=""/>
                        <hr className="menu-btn mt-3 mx-auto"/>
                    </div>
                    {
                     menuList.map(LinkName => <li><Link to={"/"+LinkName} class="menu-btn mx-0">{LinkName}</Link></li>)
                    }
                </ul>
                <div class="menu-btn float-right">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </div>
    );
};

export default Header;