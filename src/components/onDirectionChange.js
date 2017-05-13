import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps/lib";

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));



export default class DirectionsExample extends Component {
  state = {
    origin: new google.maps.LatLng(this.props.centerLat,this.props.centerLng),
    destination: new google.maps.LatLng(this.props.lat,this.props.lng),
    directions: null,
  }


  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }


  render() {
    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div style={{ height: 500 }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.origin}
        directions={this.state.directions}
      />
    );
  }
}