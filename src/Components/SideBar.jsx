import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {
    
    render() {
      return (
    <div className="side-bar-box">
        <select id="pet-select">
            <option value="">--Select Filter--</option>
            <option value="mattList">Matt's Fav's</option>
            <option value="quickBites">Quick Bites</option>
            <option value="hasDrinks">Has a Bar</option>
       </select>
    </div>
      );
    }
  }
  
  export default SideBar;