import React, { Component } from 'react';
import './App.css';
import SideBar from './Components/SideBar';
import axios from 'axios'

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

class App extends Component {
  constructor(){
    super()
    this.state = {
      restaurants: [],
      restaurantList: [],
      filteredRestaurants: [],
      mattsList: "",
      doreensList: "",
      currentList: ""
    } 
    this.setCurrentList = this.setCurrentList.bind(this);
    this.updateFilteredRestaurants = this.updateFilteredRestaurants.bind(this);
}

componentDidMount() {
  this.getVenues()
}
  createMap = () => {
    scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyDyJ4DkX9g-x6blTKDjDdf9EI2_mGKRTPM&callback=initMap")
    window.initMap = this.initializeMap
  }
  
setCurrentList(value) {
  this.setState({currentList: value})
}

updateFilteredRestaurants(value) {
this.setState( {filteredRestaurants: value} )
}

  initializeMap = () => {
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.9291, lng: -87.70698786584065},
    zoom: 17,
    styles: mapStyle 
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
    //set to grub hub error page if it doesnt exist.
    deliveryLink= "https://www.grubhub.com/green.jsp"
  } else {
    deliveryLink = restaurants.venue.delivery.url
  }

    let contentString = '<div id="content">'+restaurants.venue.name+
    '</div><a href='+ deliveryLink +' target="_blank">GrubHub Delivery</a>'
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
  return map
});
//set state equal to restaurant marker
this.setState({restaurantList: restaurantList})
this.updateFilteredRestaurants(restaurantList)
this.setState({mattsList: [
  restaurantList[0],
  restaurantList[6],
  restaurantList[2],
  restaurantList[14],
]})
this.setState({doreensList: [
  restaurantList[3],
  restaurantList[4],
  restaurantList[7],
  restaurantList[10],
]})

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
      alert("Sorry User! Gracefully informing you there was an error! (: " + error)
    }) 
  }


  render() {
    return (
      <div className="App">
      <SideBar setCurrentList = {this.setCurrentList} currentList={this.state.currentList} restaurantList={this.state.restaurantList} filteredRestaurants={this.state.filteredRestaurants} mattsList={this.state.mattsList} doreensList={this.state.doreensList} updateFilteredRestaurants={this.updateFilteredRestaurants}/>
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
