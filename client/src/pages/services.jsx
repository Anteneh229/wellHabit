import React from 'react';

import './styles.css';
const Services = () => {
    return (
        <div>
            <h1>Services Page</h1>
            <p>These are the services we offer</p>
            <div className="servicesContainer container">
      <h1 className="servicesHeader">Our Services</h1>
      <div className="service">
        <h2 className="serviceTitle">Service 1</h2>
        <p className="serviceDescription">user can add your daily routine that user want to adapt</p>
      </div>
      <div className="service">
        <h2 className="serviceTitle">Service 2</h2>
        <p className="serviceDescription">User can add their session to quite their unwilling habits</p>
      </div>
    </div>
        </div>
    )
}

export default Services;