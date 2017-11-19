import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import SelectionTime from './selectionTime'


ReactDOM.render(
  <div>
    <div>那个作业每天在[ 8,11,13,15,18 ]点执行，只查这个月数据 接口说明 http://wiki.oneapm.me/pages/viewpage.action?pageId=20129093</div>
    <SelectionTime />
  </div>,
    document.getElementById('example')
);
