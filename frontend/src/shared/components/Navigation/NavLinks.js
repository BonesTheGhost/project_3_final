import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {
    //Here's where the context manages what links we see. 'auth' here holds the 'isLoggedIn' property, and both of our login() and logout() methods.
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>

            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">MY SCORES</NavLink>
                </li>
            )}

            
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">ADD SCORE</NavLink>
                </li>
            )}


            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">LOGIN</NavLink>
                </li>
            )}
            {auth.isLoggedIn && <li><button onClick={auth.logout}>LOGOUT</button></li>}
        </ul>
    )
};

export default NavLinks;