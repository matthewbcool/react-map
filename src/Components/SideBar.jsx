import React, { Component } from 'react';
import '../App.css';

class SideBar extends Component {

    componentDidUpdate() {

    }
    handleChange = (event) => {
        this.props.setCurrentList(event.target.value)
    }
    handleSubmit = (event) => {
        this.props.restaurantList.map(listItem => {
            listItem.restaurantMarker.setVisible(false)
        })
        //populate markers with filteredRestaurants
        if(this.props.currentList === 'mattsList') {
        //if I had more filters I would need to delete this logic and come up with a way to pass the lists in-- probably just filter() the exsisting restaurant list.  
        this.props.updateFilteredRestaurants(this.props.mattsList)  
        this.props.mattsList.map(listItem => {
            listItem.restaurantMarker.setVisible(true)
    }) 
    } else {
        this.props.doreensList.map(listItem => {
          this.props.updateFilteredRestaurants(this.props.doreensList)
          listItem.restaurantMarker.setVisible(true)
    }) 
    } 
        event.preventDefault();
  }

    render() {
      return (
    <div className="side-bar-box">
    <form onSubmit={this.handleSubmit} >
      <label>
          Choose a filter
        <select id="filter select" onChange={this.handleChange}>
            <option defaultValue="">--Select Filter--</option>
            <option value="mattsList">Matt's Fav's</option>
            <option value="doreensList">Doreen's Fav's</option>
       </select>
      </label> 
      <input type="submit" value="Submit" />  
    </form>
       <ul>
      { this.props.filteredRestaurants.map(listItem => {
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