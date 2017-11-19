import React,{ Component } from 'react'
import $ from 'jquery'
import _ from 'underscore'
export default class Txt extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sameAppData:[],
      hosts:[],
      allCount: null
    }
  }

  getAppid(row,nday,selectData,hourCheck) {
    let appid = row.application_id;
    let hosts = [];
    let url = `http://dashboard.oneapm.net/line.do?topic=apm_bi_data_cnt&nday=${nday}`;
    let sameAppData = [];
    var i=0, j=0, allCount=0;
        url += hourCheck == true ? `&pt=${row.pt}` : ''
    $.ajax({
      url:url,
      success: data => {_.sortBy(data, item => -parseInt(item.cnt))
        .map((item)=> {
          appid == item.application_id ? (sameAppData[i++] = item,allCount += parseInt(item.cnt)): null
        })
        this.setState({
          sameAppData: sameAppData,
          allCount: allCount
        })
      }
    })
    selectData.map(item =>{
      appid == item.application_id ?
       hosts[j++] = {
        host: item.host,
        cnt: item.cnt,
        application_id: item.application_id
      } : null
    })
    this.setState({
      hosts:hosts
    })
  }
  render(){
    const {selectData, nday, hourCheck} = this.props;
    const  {sameAppData, hosts, allCount}  = this.state;
    var daysCount = 0;
    selectData.map(item => {
      item.cnt == null ? null : daysCount += parseInt(item.cnt)
    })
    console.log(daysCount);
    return(
      <div>
      <div className={'textMain'}>
        <div className={'wth-50'}>
          <table>
            <thead>
              <tr>
                <th>URL个数总和:</th>
                <td>{daysCount}</td>
              </tr>
              <tr>
                <th>域名</th>
                <th>URL个数</th>
                <th>时间(日)</th>
                <th>时间(小时)</th>
                <th>application_id</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                selectData.map((row, rowIndex)=> {
                  return (
                    <tr key={rowIndex}>
                      <td>{row.host}</td>
                      <td>{row.cnt}</td>
                      <td>{row.date}</td>
                      <td>{row.pt}</td>
                      <td>{row.application_id}</td>
                      <td><button onClick={this.getAppid.bind(this,row,nday,selectData,hourCheck)}>查看</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className={'wth-50'}>
          <table>
            <thead>
              <tr>
                <th>请求次数总和</th>
                <th>请求次数</th>
                <th>时间(小时)</th>
                <th>时间(日)</th>
                <th>application_id</th>
                <th>数据类型</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{verticalAlign:'top'}} rowSpan={++sameAppData.length}>{allCount}</td></tr>
              {
                sameAppData.map((item, index)=> {
                  return (
                    <tr key={index}>
                      <td>{ item.cnt }</td>
                      <td>{ item.pt }</td>
                      <td>{ item.date }</td>
                      <td>{ item.application_id }</td>
                      <td>{ item.data_type }</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>域名</th>
                <th>URL个数</th>
                <th>application_id</th>
              </tr>
            </thead>
            <tbody>
              {
                hosts.map((item, index)=> {
                  return (
                    <tr key={index}>
                      <td>{ item.host }</td>
                      <td>{ item.cnt }</td>
                      <td>{ item.application_id }</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>


    </div>
    )
  }
}
