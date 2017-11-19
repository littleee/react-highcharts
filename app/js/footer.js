import React,{ Component } from 'react'
import $ from 'jquery'
import Txt from './text'
export default class Footer extends Component {

  render() {
    return (
      <div className="calendarFooter">
        <button onClick={this.props.picked}>确定</button>
      </div>
    )
  }
}
