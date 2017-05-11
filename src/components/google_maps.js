import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
} from "react-google-maps/lib";


const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat:24.778289, lng:120.988108 }}
  />
));


 class SimpleMapExample extends Component {

  render() {
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ height: 500 }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
      />
    );
  }
}

export default SimpleMapExample;

