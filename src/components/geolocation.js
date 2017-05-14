import canUseDOM from "can-use-dom";

import {connect} from 'react-redux';

import raf from "raf";

import React,{Component} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow, 
  Marker,
  DirectionsRenderer,
} from "react-google-maps/lib";

import Direction from './directions';


const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation : 
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={11}
    center={props.center}>

    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    
      <Marker
        key={props.center}
        position={props.center}
        onClick={() => props.onMarkerClick(marker)}
      >
      </Marker>

  </GoogleMap>
));


class GeolocationExample extends Component {

  state = {
    center: null,
    content: null,
  };

 
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



  render() {
      if(!this.props.marker){
    return (
      <GeolocationExampleGoogleMap
        containerElement={
          <div style={{ height: 500 }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        content={this.state.content}
        marker={this.props.marker}//Driver marker
      />
    );}

    return <Direction lat={this.props.marker.lat} lng={this.props.marker.lng}
                centerLat={this.state.center.lat} centerLng={this.state.center.lng}/>;

  }
}


function mapStateToProps (state){
  return {
    marker:state.center,
  };
}


export default connect (mapStateToProps)(GeolocationExample);

