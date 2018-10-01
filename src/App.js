import React, { Component } from 'react';
import './App.css';

class App extends Component {

componentDidMount() {
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

  render() {
    return (
      <div className="App">
       <div id="map"> </div>
      </div>
    );
  }
}

function scriptLoader(url) {
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}

export default App;
