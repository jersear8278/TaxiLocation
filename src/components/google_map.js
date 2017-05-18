import canUseDOM from "can-use-dom";

import {connect} from 'react-redux';

import raf from "raf";

import React,{Component} from "react";

import {
  GoogleMapLoader,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow, 
  Marker,
  DirectionsRenderer,
} from "react-google-maps/lib";

import Direction from './directions';

import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

import DriverMarkers from './driver_markers';


const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation : 
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const GDMGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.center}
    onZoomChanged={props.onZoomChanged}
    ref={props.onMapMounted}
  >

      {props.center && (
        <InfoWindow position={props.center}>
          <div>{props.content}</div>
        </InfoWindow>
      )}

      <Marker
        key={props.center}
        position={props.center}
      >       
      </Marker>

      <DriverMarkers Zoom={props.Zoom}/>

      {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
));

class GeolocationExample extends Component {
    constructor(props){
        super(props);

        this.state = {
          center: null,
          content: null,
          origin:null,
          directions: null,
          exMarker:null,
          Zoom:12
         };

      this.handleMapMounted = this.handleMapMounted.bind(this);
      this.handleZoomChanged = this.handleZoomChanged.bind(this);
    }

 
  componentDidMount() {
    geolocation.getCurrentPosition((position) => {

      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Your location`,
      });
    });
  }

  componentDidUpdate(){
    var DirectionsService = new google.maps.DirectionsService();

    if(this.props.marker&&this.state.exMarker!=this.props.marker){
        DirectionsService.route({
          origin: new google.maps.LatLng(this.state.center.lat,this.state.center.lng),
          destination: new google.maps.LatLng(this.props.marker.lat,this.props.marker.lng),
          travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              exMarker:this.props.marker
            });
          } 
        });
    }
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleZoomChanged() {
    const nextZoom = this._map.getZoom();
      this.setState({
        Zoom: nextZoom,
      });
  }
  
  render() {
    return (
      <div>
      <GDMGoogleMap
        containerElement={
          <div style={{ height: 500 }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        content={this.state.content}
        marker={this.state.driverdetails}
        lat={this.state.lat}
        lng={this.state.lng}
        directions={this.state.directions}
        driverdetails={this.state.A}
        onMapMounted={this.handleMapMounted}
        onZoomChanged={this.handleZoomChanged}
        Zoom={this.state.Zoom}
      />
      </div>
    );
  }
}

function mapStateToProps (state){
  return {
    marker:state.center,
    driverdetails:state.driverdetails,
  };
}

export default connect (mapStateToProps)(GeolocationExample);

