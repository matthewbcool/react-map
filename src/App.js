import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
class App extends Component {
  constructor(){
    super()
    this.state = {
      restaurants: [],
    } 
}
componentDidMount() {
  this.getVenues()
  this.createMap()
}
  createMap = () => {
    scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyDyJ4DkX9g-x6blTKDjDdf9EI2_mGKRTPM&callback=initMap")
    window.initMap = this.initializeMap
  }
  

  initializeMap = () => {
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.9308, lng: -87.7099},
    zoom: 15
  });
}

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
        this.setState( {restaurants: response.data} )
      }
    ).catch(error => {
      console.log("err" + error)
    }) 
  }


  render() {
    return (
      <div className="App">
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
