import React from 'react';
import Navbar from '../../common/navbar/Navbar' ;
import logo from '../../../images/Contacts_(iOS).png';

import './Header.css';

function Header () {

  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
        <a href="/" className="header-logo">   
            <img alt="header-logo" src={logo} width="100px" height="100px"/>
        </a>
        </section>
        <section className="header-top__navbar">
          <section className="header-top__navigation">
            <Navbar />
          </section>
          <hr className="header-top__seperator" />
        </section>
      </section>
      <section className="header-bottom">
        <section className="header-bottom__phone">
          +91-8986149172
        </section>
        <section className="header-bottom__email">
          manishtrivedi994@gmail.com
        </section>
      </section>
    </section>
  )
}

export default Header;