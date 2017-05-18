import fetch from "isomorphic-fetch";

import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  InfoWindow, 
  Marker,
} from "react-google-maps/lib";

import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

import {connect} from 'react-redux';


 class MarkerClustererExample extends Component {
     constructor(props){
        super(props)

        this.state={A:this.props.driverdetails}

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMarkerClose = this.handleMarkerClose.bind(this);
     }

       
       A(){
        if(this.props.Zoom>13){         
        return this.state.A.map((marker, index) => {

        return(    
      <Marker
        key={index}
        icon={{url:'img/taxi.png',scaledSize: new google.maps.Size(31, 43)}}
        position={{lat:marker.lat,lng:marker.lng}}
        onClick={() => this.handleMarkerClick(marker)}       
      >
              {console.log(marker.DriverName)}
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => this.handleMarkerClose(marker)}>
            <div>{marker.DriverName}</div>
          </InfoWindow>
        )}
      </Marker>)
    
       })}
       return <div></div>
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
           <div>{this.A()}</div>      
    );
  }
}

function mapStateToProps (state){
  return {
    area:state.center,
    driverdetails:state.driverdetails
  };
}


export default connect (mapStateToProps)(MarkerClustererExample);




