import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavStyle from './nav.component.css'

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-info navbar-expand-lg">
        <Link to="/" className="navbar-brand"><i>Knuckleball</i></Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto darken" >
          <li className="navbar-item">
          <Link to="/allstats" className="nav-link">Stats</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Enter Stats</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/suggestions" className="nav-link">Tips for You</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}

