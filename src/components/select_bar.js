import React,{Component} from 'react';
import GoogleMap from './google_maps';


class SelectBar extends Component{

    constructor(props){
        super(props);

        this.state = {location:'台北101'};
    }



    render() {
              console.log(this.state.location);
              
        return(
        <form>
          <select className="form-group" onChange={event => this.onSelectChange(event.target.value)}>         
　          <option value="台北101">台北101</option>
　          <option value="台北火車站">台北火車站</option>
　          <option value="台北科技大學">台北科技大學</option>
          </select>
        </form>  

        );
    }
    
    onSelectChange(location){
    this.setState({location:location});
    }


}

export default SelectBar;