import React, { Component } from 'react';
import SelectBar from './select_bar';
import SimpleMapExample from './google_maps';
import A from './geolocation';

export default class App extends Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <div>

        <SelectBar />    
        <A />
      </div>     
    );
  }
}
