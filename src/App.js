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

  

  //loop through api call values
  this.state.restaurants.map(restaurants => {
    let contentString = '<div id="content">'+restaurants.venue.name+
    '</div>';
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
    infowindow.open(map, marker)
  })

  marker.setMap(map)
  return console.log('markers complete')
});
console.log(this.state.restaurants)
}

//getVenues is doing work. sets up axios endpoint and sets the state to the grouping. after the state is set we can populate the map with markers so we call create map.
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
      <SideBar />
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
