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
    defaultZoom={12}
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

    {props.driverdetails.map((marker, index) => (
      <Marker
        key={index}
        icon={{url:'img/taxi.png',scaledSize: new google.maps.Size(31, 43)}}
        position={{lat:marker.lat,lng:marker.lng}}
        onClick={() => props.onMarkerClick(marker)}
      >
        {/*
          Show info window only if the 'showInfo' key of the marker is true.
          That is, when the Marker pin has been clicked and 'onCloseClick' has been
          Successfully fired.
        */}
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.DriverName}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}


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
          A:this.props.driverdetails,
          B:null
         };

          this.handleMarkerClick = this.handleMarkerClick.bind(this);
          this.handleMarkerClose = this.handleMarkerClose.bind(this);
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

    if(this.props.marker&&this.state.B!=this.props.marker){

        DirectionsService.route({
        origin: new google.maps.LatLng(this.state.center.lat,this.state.center.lng),
        destination: new google.maps.LatLng(this.props.marker.lat,this.props.marker.lng),
        travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
            directions: result,
            B:this.props.marker
            });
        } 
        });
    }
}

  handleMarkerClick(targetMarker) {
    this.setState({
      A: this.state.A.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      })
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      A: this.state.A.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }
  

  render() {
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
        marker={this.state.driverdetails}
        lat={this.state.lat}//Driver marker
        lng={this.state.lng}
        directions={this.state.directions}
        driverdetails={this.state.A}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
      />
    );
  }
}


function mapStateToProps (state){
  return {
    marker:state.center,
    driverdetails:state.driverdetails
  };
}


export default connect (mapStateToProps)(GeolocationExample);

