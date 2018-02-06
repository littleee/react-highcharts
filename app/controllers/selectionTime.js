import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import $ from 'jquery'
import '../styles/style.css'
import _ from 'underscore'
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { DatePicker,Dropdown, Card, Table } from 'one-ui'

export default class SelectionTime extends Component{
  constructor (props) {
    super(props);
    let now = new Date(new Date()-24*60*60*1000);
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      hour: null,
      value: '',//
      selectData: [],
      hourCheck: false,
      date: now,
      sameAppData: [],
      pathDate: []
    }
  }

  componentWillMount(){
    this.pick()
  }

  hourCheck() {
    this.setState({
      hourCheck: !this.state.hourCheck
    })
  }

  pick(pt,date,nday) {
//  http://dashboard.oneapm.net/line.do?topic=apm_bi_url_hostcnt&nday=1&pt=2017092505
//  条件在后面的 &pt=2017092505     --时间戳  pt 是 年月日小时
// 也可以按照application_id 来筛选    --应用id
    console.log('- -')
    function fmtDate(obj){
        var date =  new Date(obj);
        var y = date.getFullYear();

        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        var h = "0"+date.getHours()
        return y+""+m.substring(m.length-2,m.length)+""+d.substring(d.length-2,d.length)+""+h.substring(h.length-2,h.length);
        // console.log(y,m,d,h);
    }
    if(pt==undefined && date==undefined){
      pt=fmtDate(new Date())
      date = fmtDate(new Date()).substring(0,8)-1;

      nday = 1;
    }else if(pt==undefined){
       pt=fmtDate(new Date())
     }else if(date == undefined){
        date = fmtDate(new Date()).substring(0,8)-1
      }
    this.setState({
      nday: nday
    })
    var id=this.state.value||''
    var url = this.state.hourCheck == true ? `http://dashboard.oneapm.net/line.do?topic=apm_bi_url_hostcnt&nday=${nday}&pt=${pt}` : `http://dashboard.oneapm.net/line.do?topic=apm_bi_url_hostcnt_day&nday=${nday}&date=${date}`
    if(id!=''){
      url+=`&application_id=${id}`
    }
    $.ajax({
      url:url,
      success: function (data){
        let selectData = [];
        if(data.length==undefined){
          data=[]
        }
        data=_.sortBy(data,function(item){
          return -parseInt(item.cnt)
        })

          data.map((item,index)=>{
              selectData.push([item.host,item.cnt,item.date,item.pt,item.application_id]);
          })
          this.setState({
            selectData: selectData
          })
      }.bind(this)
    })
  }

  picked() {
    const { year, month, day, hour, selectData } = this.state;
    var today=new Date()
    var tnum= today.getDate();
    //如果是月份不一样
    //还需要计算月份查了多少天
    let monthstr = this.state.month;

    monthstr +=1;
    var pt ;
    var m = "0"+monthstr;
    var d = "0"+day;
    var h = "0"+hour;
    hour ?  pt = year.toString()+m.substring(m.length-2,m.length)+d.substring(d.length-2,d.length)+h.substring(h.length-2,h.length) : null
    var date = year.toString()+m.substring(m.length-2,m.length)+d.substring(d.length-2,d.length);
    this.pick(pt,date,tnum-day);
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  selectHours(item,index) {
    let hour = index;
    this.setState({
      hour: hour
    })
  }

  getAppid(fmtVal,hourCheck,nday,rowData,rows) {
    let  appid =fmtVal
    let pathDate = [];
    var sameAppData = [];
      let  url = hourCheck == true ? `http://dashboard.oneapm.net/line.do?topic=apm_bi_data_cnt&nday=${nday}&pt=${rowData[3]}` : `http://dashboard.oneapm.net/line.do?topic=apm_bi_data_cnt_day&nday=${nday}&date=${rowData[2]}`
    $.ajax({
      url:url,
      success: data => {_.sortBy(data, item => -parseInt(item.cnt))
        .map((item)=> {
          appid == item.application_id ? (sameAppData.push([item.cnt,item.date,item.pt,item.application_id,item.data_type])): null
        });
        this.setState({
          sameAppData: sameAppData
        })
      }
    })
    rows.map(item =>{
       appid == item[4] ? pathDate.push([item[0],item[1],item[4]]):null
     })
     this.setState({
       pathDate: pathDate
     })
  }
  render(){
    const {nday, selectData, hourCheck, allCount,pathDate,sameAppData} = this.state;
    let list = new Array(24).fill([]);
    var __columns=[];
    var __appCol =[];
    var __pathCol =[];
    __columns=[
      {
        key: 0,
        sortable: false,
        title: '域名',
        width: 30
      },
      {
        key: 1,
        sortable: false,
        title: 'URL个数',
        width: 15
      },
      {
        key: 2,
        sortable: false,
        title: '时间（日）',
        width: 15
      },
      {
        key: 3,
        sortable: false,
        title: '时间（小时）',
        width: 20
      },
      {
        key: 4,
        sortable: false,
        title: 'application_id',
        width: 20,
        render:(fmtVal,rowData,rowInd,colInd,rows)=>{
          return (<a href='javascript:;' onClick={this.getAppid.bind(this,fmtVal,hourCheck,nday,rowData,rows)}>{fmtVal}</a>)
        }
      },
    ]
    __appCol=[
      {
        key:0,
        sortable: false,
        title: '请求次数',
        width:20
      },
      {
        key:1,
        sortable: false,
        title: '时间(日)',
        width:20
      },
      {
        key:2,
        sortable: false,
        title: '时间(小时)',
        width:20
      },
      {
        key:3,
        sortable: false,
        title: 'application_id',
        width:20
      },
      {
        key:4,
        sortable: false,
        title: '数据类型',
        width:20
      },
    ]
     __pathCol=[{
      key:0,
      sortable: false,
      title: '域名',
      width:40
    },
    {
      key:1,
      sortable: false,
      title: 'URL个数',
      width:30
    },
    {
      key:2,
      sortable: false,
      title: 'application_id',
      width:30
    }]
    return(
      <div className="flex-col-1">
        <div className="flex-col">
          <div className="flex-row card-bg">
            <div className="m-r-40">
            <Dropdown
              className="m-r-30"
              pullRight={ false }
              autoHide={ true }
              label={
                <span className="datePicked"
                      >
                     { `${this.state.year}年${this.state.month+1}月${this.state.day}日` }
                </span>
               }
               >
                {
                  <DatePicker
                    withTime={ false }
                    defaultValue={this.state.date}
                    onChange={(date) => {
                      this.setState({
                        day: new Date(date).getDate(),
                        date: new Date(date)
                      })
                    }}>
                  </DatePicker>
                }
              </Dropdown>
              <button className="btn btn-primary" type="button" onClick={::this.picked}>{__('确定')}</button>
              </div>
              <div>
                <div className='flex flex-items-middle'>
                  <div className='label label-big m-r-10'>
                    {__('小时:')}
                  </div>
                  <input className="m-r-10" type='checkbox' onClick={::this.hourCheck}/>
                  <Dropdown
                    autoHide={true}
                    pullRight={true}
                    label={
                      this.state.hour || this.state.hour == '0' ? this.state.hour : __('请选择')
                    }>
                    <ul>
                      {
                        list.map((item,index)=>{
                          return(<li className='item' key={index}
                                  onClick={ this.selectHours.bind(this, item, index) }><a href='javascript:;'>{index}</a></li>)
                                })
                      }
                    </ul>
                  </Dropdown>
                  <span>{__('时')}</span>
                </div>
              </div>
            </div>
          <input  className="form-control" type="text" placeholder={__('application_id筛选')}  value={this.state.value} onChange={::this.handleChange} />
        </div>
        <div className="flex-row-4 flex-repair">
          <div className="flex-item">
            <Card className='flex-col-1 card-bg' title={__('URL个数总和:')+
              (()=>{
                let urlCount = 0;
                selectData.map((item,index)=>{
                  urlCount+=(item[1]==undefined? 0: item[1]-0)
                  })
             return urlCount})()}>
             <Table
               className={'flex-col-1 card-board pan-l'}
               columns={ __columns }
               showCols={true}
               data={this.state.selectData}
             />
           </Card>
         </div>
         <div className="flex-item">
           <div className="flex-col-1 flex-repair">
             <Card className='flex-col-1  card-bg ' title={__('请求次数总和:')+
               (()=>{
                 var count = 0;
                 sameAppData.map((item,index)=>{
                   count+=(item[0]==undefined? 0: item[0]-0)
                 })
                 return count})()
               }>
               <Table
                 className={'flex-col-1 card-board'}
                 columns={ __appCol }
                 showCols={true}
                 data={this.state.sameAppData}
               />
             </Card>
             <Card className='flex-col-1  card-bg ' title={__('域名')}>
               <Table
                 className={'flex-col-1 card-board'}
                 columns={ __pathCol }
                 showCols={true}
                 data={this.state.pathDate}
               />
             </Card>
           </div>
         </div>
       </div>
     </div>
   )
 }
}
