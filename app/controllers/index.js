import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import AllPage from './router'
import 'one-ui/build/one-ui.css';
import 'apm-icon/iconfont.css';

import { NavTab } from 'one-ui';

ReactDOM.render(
  <div className="flex-col-1">
    <div>那个作业每天在[ 8,11,13,15,18 ]点执行，只查这个月数据 接口说明 http://wiki.oneapm.me/pages/viewpage.action?pageId=20129093</div>
    <AllPage />
  </div>,
    document.getElementById('example')
);
