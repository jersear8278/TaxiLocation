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
    center={props.center}
  >
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}

    
          <Marker
        key={props.marker}
        position={props.marker}
        onClick={() => props.onMarkerClick(marker)}
      >
      </Marker>

  </GoogleMap>
));


class GeolocationExample extends Component {


  state = {
    center: null,
    content: null,
    radius: 6000,

  };



  isUnmounted = false;

 
  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 200) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Your location`,

      });

      raf(tick);
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${reason}).`,

      });
    });


  }

  componentWillUnmount() {
    this.isUnmounted = true;
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
        radius={this.state.radius}
        marker={this.props.marker}
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

