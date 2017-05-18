import React,{Component} from 'react';
import {connect} from 'react-redux';
import {selectLocation} from '../actions/index';
import {bindActionCreators} from 'redux';

class SelectBar extends Component{

    constructor(props){
        super(props);

        this.state = {location:'0'};
    }

  onSelectChange(location){
     this.setState({ location: location });
     this.props.selectLocation(location);
     //this.props.selectLocation(this.state.location); >>延遲
  }

    render() {      
      return(
        <form  className="input-select">
          <select className="form-control" value={this.state.location} onChange={event => this.onSelectChange(event.target.value)}>
          <option value="0">請選擇</option>                               
          <option value="台北101">台北101</option>
          <option value="台北火車站">台北火車站</option>
          <option value="台北科技大學">台北科技大學</option>
          </select>
        </form> 
      );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({selectLocation}, dispatch);
}

export default connect (null,mapDispatchToProps)(SelectBar);

