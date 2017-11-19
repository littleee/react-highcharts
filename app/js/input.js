import React,{ Component } from 'react'
import $ from 'jquery'
import Txt from './text'
export default class Input extends Component {
  render(){
    return(
      <div>
        <input type="text" value={this.props.value} onChange={this.props.handleChange}/>
   
      </div>)
  }
}
