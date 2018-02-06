import React,{ Component } from 'react'
import { Route, BrowserRouter as Router, Link, HashRouter } from 'react-router-dom'
import SelectionTime from './selectionTime'
import Nday from './nday'
import { NavTab } from 'one-ui'
import _ from 'lodash';

const perfix = `/#/`,
      PATH = ['index' , 'nday'];

export default class Allpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    }
  }
  getActiveIndex(){
    const path = location.hash.split('/')[1],
          index = _.findIndex(PATH,(v) => v === path);
    return index === -1 ? this.state.active : index
  }
  render() {
    return (
      <div className='flex-col-1'>
        <NavTab theme="line" active={ this.getActiveIndex() } className='b-b-1' >
          <NavTab.Panel key={1} title={__('首页')} href={`${perfix}`}/>
          <NavTab.Panel key={2} title={__('最近n天')} href={`${perfix}nday`}/>
        </NavTab>
        <HashRouter >
          <div className="flex-col-1">
            <Route exact path='/' component={SelectionTime} />
            <Route path='/nday' component={Nday}/>
          </div>
        </HashRouter>
      </div>
    )
  }
}
