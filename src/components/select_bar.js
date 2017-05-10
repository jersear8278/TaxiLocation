import React,{Component} from 'react'

class SelectBar extends Component{

    constructor(props){
        super(props);

        this.state = {
            location:'',
        };
    }


    render(){
        return(
            <form>
<select name="YourLocation">
　<option value="Taipei">台北101</option>
　<option value="Taoyuan">台北火車站</option>
　<option value="Hsinchu">台北科技大學</option>
</select>
</form>
        );
    }
}

export default SelectBar;