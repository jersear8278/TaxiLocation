import React, { Component } from 'react';
import SelectBar from './select_bar';
import A from './geolocation';
import Directions from './directions';
import B from './test';

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
