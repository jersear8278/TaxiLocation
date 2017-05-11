import React, { Component } from 'react';
import SelectBar from './select_bar';
import SimpleMapExample from './google_maps';


export default class App extends Component {
  render() {
    return (
      <div>
        <SimpleMapExample />
        <SelectBar />
      </div>     
    );
  }
}
