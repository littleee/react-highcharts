import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import Footer from './footer'
import Txt from './text'
import Input from './input'
import $ from 'jquery'
import '../style/style.css'
import _ from 'underscore'

const displayDaysPerMonth = (year) => {


 let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
 if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  daysInMonth[1] = 29
 }

 let daysInPreviousMonth = [].concat(daysInMonth);
 daysInPreviousMonth.unshift(daysInPreviousMonth.pop());

 let addDaysFromPreMonth = new Array(12)
   .fill(null)
   .map((item, index)=> {
     let day = new Date(year, index, 1).getDay()
       return day
   })


 return new Array(12)
   .fill([])
   .map((month, monthIndex)=> {
     let addDays = addDaysFromPreMonth[monthIndex],
       daysCount = daysInMonth[monthIndex],
       daysCountPrevious = daysInPreviousMonth[monthIndex],
       monthData = []
     for (; addDays > 0; addDays--) {
       monthData.unshift(daysCountPrevious--)
     }

     for (let i = 0; i < daysCount;) {
       monthData.push(++i)
     }

     for (let i = 42 - monthData.length, j = 0; j < i;) {
       monthData.push(++j)
     }
     return monthData
   })
}


export default class SelectionTime extends Component{
  constructor (props) {
    super(props);
    let now = new Date();
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate()-1,
      hour: now.getHours(),
      value: '',//application_id
      selectData: [],
      listShow: false,
      display: 'block',
      hourCheck: false
    }
  }

  //开关
  datePickerToggle() {
    this.setState({
      display: 'block'
    })
     this.refs.head.style.height = this.refs.head.style.height=='250px'? '0':'250px';
  }
  hourListToggle() {
    this.setState({
      listShow: !this.state.listShow
    })
  }
  hourCheck() {
    this.setState({
      hourCheck: !this.state.hourCheck
    })
  }
  datePick(day) {
    this.setState({
      day: day,
      display: 'none'
    })
  }
  componentWillMount(){
    this.pick()
  }
  pick(pt,nday) {
//  http://dashboard.oneapm.net/line.do?topic=apm_bi_url_hostcnt&nday=1&pt=2017092505
//  条件在后面的 &pt=2017092505     --时间戳  pt 是 年月日小时
// 也可以按照application_id 来筛选    --应用id
console.log('- -')
function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    var h = "0"+date.getHours()
    return y+""+m.substring(m.length-2,m.length)+""+d.substring(d.length-2,d.length)+""+h.substring(h.length-2,h.length);
}
  if(pt==undefined){
   pt=fmtDate(new Date())
   nday=1
  }
  this.setState({
    nday: nday
  })
  var id=this.state.value||''
  var url=`http://dashboard.oneapm.net/line.do?topic=apm_bi_url_hostcnt&nday=${nday}`;
      url += this.state.hourCheck == true ? `&pt=${pt}` : ''
  if(id!=''){
    url+=`&application_id=${id}`
  }

    $.ajax({
      url:url,
      success: function (data){
        let selectData = [],k=0;
        if(data.length==undefined){
          data=[]
        }
        data=_.sortBy(data,function(item){
          return -parseInt(item.cnt)

        })
          data.map((item,index)=>{
            // if(item.application_id == this.state.value){
              selectData[k] =item;
              k++;
            // }
          })
          this.setState({
            selectData: selectData
          })
      }.bind(this)
    })
  }
  picked() {
    const { year, month, day, hour } = this.state;
    var today=new Date()
    var tnum= today.getDate();
    console.log(tnum);
    //如果是月份不一样
    //还需要计算月份查了多少天

    let monthstr = this.state.month;
    monthstr +=1;
    var pt = year.toString()+(monthstr<10?'0'+monthstr.toString():monthstr.toString())+(day<10?'0'+day.toString():day.toString())+(hour<10?'0'+hour.toString():hour.toString());
    this.pick(pt,tnum-day);

    // this.props = Object.assign({}, this.props, { pt: pt })
    // $.ajax({
    //   url:'./json/aaa.json',
    //   success: function (data){
    //     let selectData = [],k=0;
    //       data.map((item,index)=>{
    //         if(item.pt == this.props.pt){
    //           selectData[k] =item;
    //           k++;
    //         }
    //       })
    //       this.setState({
    //         selectData: selectData
    //       })
    //   }.bind(this)
    // })
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }

    nextMonth() {
      if (this.state.month === 11) {
        this.setState({
          year: ++this.state.year,
          month: 0
        })
      } else {
        this.setState({
          month: ++this.state.month
        })
      }
    }

    prevMonth() {
      if (this.state.month === 0) {
        this.setState({
          year: --this.state.year,
          month: 11
        })
      } else {
        this.setState({
          month: --this.state.month
        })
      }
    }

    handleDatePick(index, styleName) {
      switch (styleName) {
        case 'thisMonth':
          let month = displayDaysPerMonth(this.state.year)[this.state.month];
          this.datePick(month[index]);
          break
        case 'prevMonth':
          this.prevMonth()
          break
        case 'nextMonth':
          this.nextMonth()
          break
      }
    }

    selectHours(item,index) {
      let hour = index;
      this.setState({
        hour: hour,
        listShow: !this.state.listShow
      })
    }
  render(){
    let listToggle =(()=>{
      return this.state.listShow == true ? 'show' :  'hide';
     })()
    let rowsInMonth = [];
    let month = displayDaysPerMonth(this.state.year)[this.state.month];
      let i = 0;
      let k = 0;
    let styleOfDays = (()=> {
        var i = month.indexOf(1),
          j = month.indexOf(1, i + 1),
          arr = new Array(42)
        arr.fill('prevMonth', 0, i)
        arr.fill('thisMonth', i, j)
        arr.fill('nextMonth', j)
        return arr
      })()
    month.forEach((day, index)=> {
      if (index % 7 === 0) {
        rowsInMonth.push(month.slice(index, index + 7))
      }
    })
    let list = new Array(24).fill([]);

    return(
      <div>
        <div>
          <span className="datePicked"
                onClick={::this.datePickerToggle}
                >
               { `${this.state.year}年${this.state.month+1}月${this.state.day}日` }
          </span>
          <Footer
              year={this.state.year}
              month={this.state.month}
              day={this.state.day}
              hour={this.state.hour}
              picked={::this.picked}
            />
          <div style={{display:'inline-block',position:'relative'}}>
                  <from><input type="checkbox" name="checkboxbutton" value=""
                                onClick={::this.hourCheck}/>
                        <span className="hour"
                              onClick={::this.hourListToggle}
                              > {`${this.state.hour}`}
                        </span>{`时`}
                  </from>
            <ul className={`${listToggle} hourList`}>
              {
                list.map((item,index)=>{
                  return(<li key={k++}
                             onClick={ this.selectHours.bind(this, item, index) }>{index}</li>)
                })
              }
            </ul>
          </div>

        </div>

        <div ref="head" style={{backgroundColor:'#eee',width:'250px',height:'0px',overflow:'hidden',display:this.state.display,position:'absolute'}}>
          <div className="dateMonthPick">
            <span className="prev"
                  onClick={::this.prevMonth}>
              《
            </span>
            <span className="dateInfo">
              {this.state.year}年{this.state.month + 1}月
            </span>
            <span className="next"
                  onClick={::this.nextMonth}>
              》
            </span>
          </div>
          <table className="calendarMain">
            <thead>
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
            </thead>
            <tbody>
            {
              rowsInMonth.map((row, rowIndex)=> {
                return (
                  <tr key={rowIndex}>
                    {
                      row.map((day)=> {
                        return (
                          <td className={styleOfDays[i]}
                              onClick={ this.handleDatePick.bind(this, i, styleOfDays[i]) }
                              key={i++}>
                            {day}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <Input pick={::this.pick}
               handleChange={::this.handleChange}/>
        <Txt selectData={this.state.selectData}
             nday={this.state.nday}
             hourCheck={this.state.hourCheck}/>
      </div>
    )
  }
}
