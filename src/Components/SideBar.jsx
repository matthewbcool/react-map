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
            listItem.restaurantMarker.setMap()
        })
        //populate markers with filteredRestaurants
        if(this.props.currentList === 'mattsList') {
        this.props.mattsList.map(listItem => {
            console.log(listItem.restaurantMarker)
            listItem.restaurantMarker.setMap()
    }) 
    } else {
        this.props.doreensList.map(listItem => {
            listItem.restaurantMarker.setMap(window.google.map.Map)
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
      { (this.props.fliteredRestaurants === undefined) ?  
        this.props.restaurantList.map(listItem => {
        return <li className="restaurant-list-item" key={listItem.restaurantKey} onClick={() => triggerInfoWindow(listItem)}>{listItem.restaurantName} </li>
      }):this.props.fliteredRestaurants.map(listItem => {
        return <li className="restaurant-list-item" key={listItem.restaurantKey} onClick={() => triggerInfoWindow(listItem)}>{listItem.restaurantName} </li>
      })
     }
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