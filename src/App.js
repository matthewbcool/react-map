import React, { Component } from 'react';
import './App.css';
import SideBar from './Components/SideBar';
import axios from 'axios'
class App extends Component {
  constructor(){
    super()
    this.state = {
      restaurants: [],
      restaurantList: [],
      filteredRestaurants: []
    } 
}
componentDidMount() {
  this.getVenues()
}
  createMap = () => {
    scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyDyJ4DkX9g-x6blTKDjDdf9EI2_mGKRTPM&callback=initMap")
    window.initMap = this.initializeMap
  }
  


  initializeMap = () => {
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.9291, lng: -87.70698786584065},
    zoom: 17
  });
  let restaurantList = [];
  let restaurantListObject = {};
  //loop through api call values
  this.state.restaurants.map(restaurants => {
  //info window content
  //store info for delivery if applicable
  let deliveryLink;
  //check if deliveryLink is defined
  if(restaurants.venue.delivery === undefined) {
    //set to grub hub error page if it doesnt exist. not totally accurate, i suppose I should be informing the user it doesnt exist in foursquare api....
    deliveryLink= "https://www.grubhub.com/green.jsp"
  } else {
    deliveryLink = restaurants.venue.delivery.url
  }

    let contentString = '<div id="content">'+restaurants.venue.name+
    '</div>'+'<a href='+deliveryLink+' target="_blank">GrubHub Delivery</a>';
  //create info window
  let infowindow = new window.google.maps.InfoWindow({
    content: contentString,
  })  
  //create a marker
    let marker = new window.google.maps.Marker({
      position: {lat: restaurants.venue.location.lat, lng: restaurants.venue.location.lng},
      title:restaurants.venue.name,
  })
  //add event listener to marker
  marker.addListener('click', function() {
    marker.setAnimation(window.google.maps.Animation.DROP);
    infowindow.open(map, marker)
  })
  //save current info into an object
  restaurantListObject = {
    restaurantName: restaurants.venue.name,
    restaurantMarker: marker,
    restaurantKey: restaurants.venue.id,
  }
  //push object to array
  restaurantList.push(restaurantListObject)
  marker.setMap(map)
  return console.log('markers complete')
});
//set state equal to restaurant marker
this.setState({restaurantList: restaurantList})
}

//getVenues is doing work. sets up axios endpoint and sets the state to the grouping. after the state is set we call create map.
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: '0H1LM44LJGDK2FF0VXA21UKOQDC2VSCNV0OULKFEFTFZLRGP',
      client_secret: 'L4XBJ54FX5LPKNCA1ZNBORA2F00WZ5GHXK0OQ4BJIZRNP4AC',
      query: 'restaurant',
      near: 'Logan+Square',
      v: "20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters)).then(
      response => {
        this.setState( {restaurants: response.data.response.groups[0].items}, this.createMap() )
      }
    ).catch(error => {
      console.log("err" + error)
    }) 
  }


  render() {
    return (
      <div className="App">
      <SideBar restaurantList={this.state.restaurantList} />
       <div id="map"> </div>
      </div>
    );
  }
}
//0H1LM44LJGDK2FF0VXA21UKOQDC2VSCNV0OULKFEFTFZLRGP  L4XBJ54FX5LPKNCA1ZNBORA2F00WZ5GHXK0OQ4BJIZRNP4AC
function scriptLoader(url) {
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}

export default App;
