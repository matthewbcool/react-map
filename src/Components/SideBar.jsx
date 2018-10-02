import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {

    componentDidUpdate() {

    }
    
    render() {
      return (
    <div className="side-bar-box">
        <select id="filter select">
            <option value="">--Select Filter--</option>
            <option value="mattList">Matt's Fav's</option>
            <option value="quickBites">Quick Bites</option>
            <option value="hasDrinks">Doreen's Fav's</option>
       </select>
       <ul>
      {  
        this.props.restaurantList.map(listItem => {
        return <li className="restaurant-list-item" key={listItem.restaurantKey} onClick={() => triggerInfoWindow(listItem)}>{listItem.restaurantName} </li>
      })}
      </ul>
    </div>
      );
    }
  }

    let triggerInfoWindow = (listItem) => {    
    window.google.maps.event.trigger(listItem.restaurantMarker, 'click')
    listItem.restaurantMarker.setAnimation(window.google.maps.Animation.BOUNCE)
    }

  export default SideBar;