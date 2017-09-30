import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class Nav extends Component{
    render(){
        return (
            <div>
            <h3> Welcome to Margaret Hamilton Interplanetary Academy of JavaScript </h3>
            <ul className="nav row justify-content-end nav-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="/campuses">Campuses</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/students">Students</NavLink>
                </li>
            </ul>
            </div>
        )
    }
}
