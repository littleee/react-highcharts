import React,{ Component } from 'react'

export default class Txt extends Component {
  render(){
    const {selectData} = this.props;
    return(
      <table>
        <thead>
          <tr>
            <th>域名</th>
            <th>请求次数</th>
            <th>时间</th>
            
            <th>application_id</th>
          </tr>
        </thead>
        <tbody>
          {
            selectData.map((row, rowIndex)=> {
              return (
                <tr key={rowIndex}>
                  <td>{row.host}</td>
                  <td>{row.cnt}</td>
                  <td>{row.pt}</td>
                  
                  <td>{row.application_id}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}
