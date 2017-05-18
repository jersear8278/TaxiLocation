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

import {connect} from 'react-redux';


class DriverMarkers extends Component {
     constructor(props){
        super(props)

        this.state={driverdetails:this.props.driverdetails}

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMarkerClose = this.handleMarkerClose.bind(this);
     }

       
  driverMarkers(){
    if(this.props.Zoom>13){         
      return this.state.driverdetails.map((marker, index) => {
        return(    
          <Marker
            key={index}
            icon={{url:'img/taxi.png',scaledSize: new google.maps.Size(31, 43)}}
            position={{lat:marker.lat,lng:marker.lng}}
            onClick={() => this.handleMarkerClick(marker)}       
          >

            {marker.showInfo && (
            <InfoWindow onCloseClick={() => this.handleMarkerClose(marker)}>
                <div>
                  司機姓名：{marker.DriverName}<br/>
                  司機編號：{marker.DriverId}<br/>  
                  車牌：{marker.License}  
                </div>
            </InfoWindow>
            )}

            </Marker>
        )    
        })
    }
        return <div></div>
  }  

  handleMarkerClick(targetMarker) {
    this.setState({
        driverdetails: this.state.driverdetails.map(marker => {
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
      driverdetails: this.state.driverdetails.map(marker => {
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
      <div>{this.driverMarkers()}</div>      
    );
  }

}

function mapStateToProps (state){
  return {
    driverdetails:state.driverdetails
  };
}

export default connect (mapStateToProps)(DriverMarkers);




