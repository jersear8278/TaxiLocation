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

import Geolocation from './geolocation';


const SimpleMapExampleGoogleMap = withGoogleMap(props => (

  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.center}>

      <Marker
        key={props.center}
        position={props.center}
        onClick={() => props.onMarkerClick(marker)}
      >
      </Marker>
    

    </GoogleMap>
));


 class SimpleMapExample extends Component {
   constructor(props){
     super(props)
   }

  render() {
    console.log(this.props.center)

            if(!this.props.center){
            return <div>Select a book to get started.</div>;
            //定位
        }
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ height: 500 }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
        center={this.props.center} 
      />
    );
  }
}


function mapStateToProps (state){
  return {
    center:state.center,
  };
}


export default connect (mapStateToProps)(SimpleMapExample);

