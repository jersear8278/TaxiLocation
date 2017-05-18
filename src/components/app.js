import React, { Component } from 'react';
import SelectBar from './select_bar';
import GoogleMap from './google_map';
import Directions from './directions';

export default class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <SelectBar />    
        <GoogleMap />
      </div>     
    );
  }
}
