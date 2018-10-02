import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {

    componentDidUpdate() {

    }

    handleSubmit = (event) => {
        console.log('submitted')
        event.preventDefault();
    }
    handleChange = (event) => {
        console.log(event.target.value)
    }
    render() {
      return (
    <div className="side-bar-box">
    <form onSubmit={this.handleSubmit} >
      <label>
          Choose a filter
        <select id="filter select" onChange={this.handleChange}>
            <option defaultValue="">--Select Filter--</option>
            <option value="mattList">Matt's Fav's</option>
            <option value="quickBites">Quick Bites</option>
            <option value="doreensList">Doreen's Fav's</option>
       </select>
      </label> 
      <input type="submit" value="Submit" />  
    </form>
       <ul>
      {  
        this.props.restaurantList.map(listItem => {
        return <li className="restaurant-list-item" key={listItem.restaurantKey} onClick={() => triggerInfoWindow(listItem)}>{listItem.restaurantName} </li>
      })}
      </ul>
      <h4 className="foursquare-attribution">Powered By Foursquare</h4>
    </div>
      );
    }
  }

    let triggerInfoWindow = (listItem) => {    
    window.google.maps.event.trigger(listItem.restaurantMarker, 'click')
    listItem.restaurantMarker.setAnimation(window.google.maps.Animation.BOUNCE)
    }

  export default SideBar;