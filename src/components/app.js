import React, { Component } from 'react';
import SelectBar from './select_bar';
import SimpleMapExample from './google_maps';


export default class App extends Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <div>
        <SimpleMapExample />
        <SelectBar />    
      </div>     
    );
  }
}
