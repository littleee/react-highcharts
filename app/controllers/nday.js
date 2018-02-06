import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Card, Table, Dropdown } from 'one-ui';
import $ from 'jquery';
import TimeSeriesChart from '../publicComponents/TimeSeriesChart';
import abc from '../actionsBi/dataTransfer'

const ndayArr = [1, 3, 7 ,10 ,15, 30,]
let url = 'http://dashboard.oneapm.net/line.do?topic=apm_bi_data_cnt_bytype&nday='
export default class Nday extends Component{
  constructor (props){
    super(props);
    this.state = {
      nday: 10,
      getdata:[],
      anchor: [],
      detail: [],
      error: [],
      rum: [],
      selectData:[]
    }
  }
  componentDidMount(){
    fetch(url+this.state.nday,{

      mothod: 'GET'
    }).then(response => {
      return response.json();

    }).then(data => {
      this.dataset(data);
      this.getData(data);

    })
  }
    getData(data){
        let selectData = [];
        data.map((item,index) =>{
            var selData = eval('(' + item.data + ')');

            selectData.push([selData.data[3].rum,selData.data[2].error,selData.data[1].detail,selData.data[0].anchor,selData.date]);
            console.log(selData)
        })
        this.setState({
            selectData:selectData
        })
    }
    dataset (data){
      var anchor=[]; var detail=[]; var error=[]; var rum=[];
      data = data.map((item, index)=>{
         var data = eval('('+ item.data+')')
        //  console.log(data);
         var startTime = (date) =>{
           var time = new Date();
            time.setFullYear(parseInt(date.substring(0,4)));
            time.setMonth(parseInt(date.substring(4,6))-1);
            time.setDate(parseInt(date.substring(6,8)));
            time.setHours(0);
            time.setMinutes(0);
            time.setSeconds(0)
            time.getTime();
            return time.getTime()
         }
        startTime(item.date)
        var anchorData = Object.assign({},{
          startTime: startTime(item.date),
          callCount: data.data[0].anchor,
          endTime:startTime(item.date),
          color: 'rgb(255, 147, 38)',
          name: 'anchor'
        }),
         detailData = Object.assign({},{
           startTime: startTime(item.date),
           callCount: data.data[1].detail,
           endTime:startTime(item.date),
           name: 'detail'
         }),
         errorData = Object.assign({},{
          startTime: startTime(item.date),
          callCount: data.data[2].error,
          endTime:startTime(item.date),
          color: 'rgb(255, 147, 38)',
          name: 'error'
        }),
         rumData = Object.assign({},{
           startTime: startTime(item.date),
           callCount: data.data[3].rum,
           endTime:startTime(item.date),
           name: 'rum'
         });
        anchor[index] = anchorData;
        detail[index] = detailData;
        error[index] = errorData;
        rum[index] = rumData;
        // console.log(rum);
      })
      this.setState({
        rum: abc.parseToChart({data: JSON.parse(JSON.stringify(rum))}, {viewKey: 'singleLine'}),
        error: abc.parseToChart({data: JSON.parse(JSON.stringify(error))}, {viewKey: 'singleLine'}),
        detail: abc.parseToChart({data: JSON.parse(JSON.stringify(detail))}, {viewKey: 'singleLine'}),
        anchor: abc.parseToChart({data: JSON.parse(JSON.stringify(anchor))}, {viewKey: 'singleLine'}),
      })
    }
   setDay(item){
     this.setState({
       nday: item
     },()=>{
       fetch(url+this.state.nday,{
         mothod: 'GET'
       }).then(response => {
         return response.json();
       }).then(data => {
         this.dataset(data);
         this.getData(data);
       })
     })
   }
  render(){
    const { nday, anchor, detail, error, rum,selectData } = this.state;



    var __appCol = [];
    __appCol=[
      {
        key:0,
        sortable: false,
        title: 'rum',
        width:20
      },

      {
        key:1,
        sortable: false,
        title: 'error',
        width:20
      },
      {
        key:2,
        sortable: false,
        title: 'detail',
        width:20
      },
      {
        key:3,
        sortable: false,
        title: 'anchor',
        width:20
      },
      {
        key:4,
        sortable: false,
        title: '时间（日）',
        width:20
      }
    ]

    return(
         <div className= 'flex-row-1'>
           <div className = 'flex-col-1 card-bg'>
               <Table
                 className={'flex-col-1 card-board'}
                 columns={__appCol }
                 showCols={true}
                 data={selectData}

               />
           </div>
           <div className = 'flex-col-1 card-bg'>
             <div className ="">
               <div className="pull-right">
                 <Dropdown
                   autoHide={true}
                   pullRight={true}
                   label={
                     `${__('最近')}${nday}${__('天')}`
                   }>
                   <ul>
                     {
                       ndayArr.map((item,index)=>{
                         return(<li className='item' key={index}
                                onClick = {this.setDay.bind(this, item)} ><a href='javascript:;'>{`${item} ${__('天')}`}</a></li>)
                               })
                     }
                   </ul>
                 </Dropdown>
               </div>
             </div>
             <Card className = 'flex-col-1' title={`${__('最近')}${nday}${__('天每个接口数据量')}`}>
               {
                 rum.length == 0 ? null :
                 (<TimeSeriesChart
                   data = {rum}
                   plotOptions={{
                     line:{
                       lineWidth:3,
                     },
                   }}
                 />)
               }
             </Card>
             <Card className = 'flex-col-1' title={__('')}>
               {
                 error.length == 0 ? null :
                 (<TimeSeriesChart
                   data = {error}
                   plotOptions={{
                     line:{
                       lineWidth:3,
                     },
                   }}
                 />)
               }
             </Card>
             <Card className = 'flex-col-1'  title={__('')}>
               {
                 detail.length == 0 ? null :
                 (<TimeSeriesChart
                   data = {detail}
                   plotOptions={{
                     line:{
                       lineWidth:3,
                     },
                   }}
                 />)
               }
             </Card>
             <Card className = 'flex-col-1' title={__('')}>
               {
                 anchor.length == 0 ? null :
                 (<TimeSeriesChart
                   data = {anchor}
                   plotOptions={{
                     line:{
                       lineWidth:3,
                     },
                   }}
                 />)
               }
             </Card>


           </div>
        </div>
      )
  }
}
