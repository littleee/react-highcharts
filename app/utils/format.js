import moment from 'moment';
import _ from 'lodash';

const format = {
  stampToTime: function(value){
    const v = value || 0;
    const num=v.toString().length;

    var millios;
    if(num<=10){
      millios=1000
    }else if(num>10&&num<16){
      millios=1
    }else{
      millios=0.001
    }

    return moment(v * millios).format('YYYY-MM-DD HH:mm');
  },
  withStampToTime: function(value){
    const v = value || 0;
    var millios = (v.toString().length > 10 ? 1 : 1000);
    return moment(v * millios).format('MM/DD HH:mm');
  },
  rate: function(value){
    var v = parseFloat(value);
    if(isNaN(v) || !v){
      return '0.00%';
    }
    return `${(v * 100).toFixed(2)}%`;
  },
  numberic: function(v){
    var med,
      tmp_value,
      out_value = parseFloat(v);
    if (isNaN(out_value) || out_value === 0) {
      return '0.00';
    }
    med = 0;
    do{
      med += 2;
      tmp_value = out_value.toFixed(med);
    }while(parseFloat(tmp_value) === 0 && med < 6);
    out_value = tmp_value;
    return out_value.toString().replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, '$1,');
  },
  numbericThree: function(v){
    var med,
      tmp_value,
      out_value = parseFloat(v);
    if (isNaN(out_value) || out_value === 0) {
      return '0.000';
    }
    med = 0;
    do{
      med += 3;
      tmp_value = out_value.toFixed(med);
    }while(parseFloat(tmp_value) === 0 && med < 6);
    out_value = tmp_value;
    return out_value.toString().replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, '$1,');
  },
  integer: function(v){
    var out_value = parseInt(v);
    if (isNaN(out_value)) {
      return '0';
    }
    return out_value.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  },
  sDuration: function(v, d){
    return moment.duration((d || (new Date()).getTime()) - v).humanize();
  },
  duration: function(v, d){
    return moment.duration((d || (new Date()).getTime()) - v).humanize() + __('之前');
  },
  qDuration: function(v, d){
    return Math.ceil(moment.duration((d || (new Date()).getTime()) - v).asSeconds()) + __('秒之前');
  },
  dataSize: function(v){
    var str = v.toString();
    var bits;
    if(str.search(/[e]/) !== -1){
      bits = parseInt(str.split('+' || '-').pop()) + str.split('e').shift().replace(/\.\d+/, '').length;
    }else{
      bits = (v).toString().replace(/\.\d+/, '').length;
    }
    var units = ['B', 'KB', 'MB', 'GB', 'TB'];
    var i;
    for(i = units.length - 1;i + 1;i--){
      if(bits > i * 3){
        return `${format.numberic(v / Math.pow(1024, i))  } ${units[i]}`;
      }
    }
    return `${format.numberic(v)  } b`;
  },
  kSize: function(v){
    var str = v.toString();
    var bits;
    if(str.search(/[e]/) !== -1){
      bits = parseInt(str.split('+' || '-').pop()) + str.split('e').shift().replace(/\.\d+/, '').length;
    }else{
      bits = (v).toString().replace(/\.\d+/, '').length;
    }
    var units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    var i;
    for(i = units.length - 1;i + 1;i--){
      if(bits > i * 3){
        return `${format.numberic(v / Math.pow(10, i * 3))  } ${units[i]}`;
      }
    }
    return `${format.numberic(v)  } b`;
  },
  numSecond: function(v){
    if(v >= 1){
      return `${format.numberic(v) } s`;
    }else{
      return `${format.numberic(v * 1000)} ms`;
    }
  },
  numMinSecond: function(v){
    if(v >= 1000){
      return `${format.numberic(v / 1000) } s`;
    }else{
      return `${format.numberic(v)} ms`;
    }
  },
  threeSecond:function(v){
     return `${format.numbericThree(v / 1000) } s`;
  },
  numSecondOnlyNoUnit: function(v){
    return format.numberic(v * 1000);
  },
  round: function(item) {
    if (isNaN(item)) {
      return 0;
    }else{
      return Math.round(item);
    }
  },
  shortTitle: function(title, num) {
    if(_.isUndefined(title) ||  _.isNull(title) || num < 0){
      return title;
    }

    if(title.length > num){
      return `${title .substring(0, num)}...`;
    }else{
      return title;
    }
  },
  numSecs: function(v) {
    //Math.round
    if (v < 1000) {
      return `${format.round(v)  } ms`;

    } else if (v >= 1000 && v < 1000 * 60) {
      return `${format.numberic(v / 1000)  } s`;
    } else {
      return `${format.numberic(v / (1000 * 60))  } min`;
    }
  },
  //时间秒数格式化
  secondFormat: function(s) {
    var t;
    if(s > -1){
      var hour = Math.floor(s / 3600);
      var min = Math.floor(s / 60) % 60;
      var sec = s % 60;
      var day = parseInt(hour / 24);
      if (day > 0) {
        hour = hour - 24 * day;
        t = `${day  }day ${  hour  }:`;
      }      else { t = `${hour < 10 ? `0${  hour}` : hour  }:`; }
      if(min < 10){ t += '0'; }
      t += `${min  }:`;
      if(sec < 10){ t += '0'; }
      t += sec;
    }
    return t;
  },
  clockForDay: function(hour, minute, second, whic, choice) {
    let _hour, _minute, _second;
    if(whic === 'hour'){
      if(choice === 2){
        _hour = hour - 1;
        if(_hour < 0) { _hour = 23; }
      }else{
        _hour += 1;
        if(_hour > 23) { _hour = 0; }
      }
    }else if(whic === 'minute'){
      if(choice === 2){
        _minute = minute - 1;
        if(_minute < 0){
          _minute = 59;
        }
      }else{
        _minute = minute + 1;
        if(_minute > 59){
          _minute = 0;
        }
      }
    }else {
      if(choice === 2){
        _second = second - 1;
        if(_second < 0) { _second = 59; }
      }else{
        _second = second + 1;
        if(_second > 59){
          _second = 0;
        }
      }
    }
    return {
      _hour,
      _minute,
      _second,
    };
  },
};
export default format;
