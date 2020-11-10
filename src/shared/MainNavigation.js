import React from 'react';
import { NavLink } from 'react-router-dom';

import '../shared/MainNavigation.css';

const MainNavigation = props => {
return (
    <header className="masthead mb-auto">
        <div className="inner">
            <h3 className="masthead-brand">
                <NavLink to="/">Contoso</NavLink>
            </h3>
            <nav className="nav nav-masthead justify-content-center">
                <NavLink className="nav-link" to="/" exact>Home</NavLink>
                <NavLink className="nav-link" to="/add" exact>Add Product</NavLink>
            </nav>
        </div>
    </header>
    );
};

export default MainNavigation;