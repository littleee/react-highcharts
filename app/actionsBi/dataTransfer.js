import _ from 'lodash';
import format from '../utils/format';
import RankColor from '../components/colors/Rank';

const propConfig = {
  singleLine: {
    label: 'single',
    format: format.integer,
    getTiele: function(n, oneitem, groupBy) {
      return oneitem[0].name;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;
      item.customData = {
        y: {
          label: item.name,
          fmtVal: format.integer(item.callCount),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;
    },
  },
  pageCallcount: {
    label: '页面访问量',
    format: format.integer,
    getTiele: function  () {
      return '页面访问量';
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;
      item.customData = {
        y: {
          label: '页面访问量',
          fmtVal: format.integer(item.callCount),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;
    },
  },
  sessions: {
    label: '用户会话数',
    format: format.integer,
    getTiele: function  () {
      return '用户会话数';
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;
      item.customData = {
        y: {
          label: '用户会话数',
          fmtVal: format.integer(item.callCount),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;
    },
  },
  hotevents: {
    label: '热门事件',
    format: format.integer,
    getTiele: function  () {
      return '热门事件';
    },
    pointParse: function(item) {
      item.y = item.callCount;
      item.customData = {
        y: {
          label: `${item.metricName}事件`,
          fmtVal: format.integer(item.callCount),
        },
      };
      return  item;
    },
  },
  conversions: {
    label: '业务转化率',
    format: format.integer,
    getTiele: function  () {
      return '业务转化率';
    },
    pointParse: function(item) {
      item.y = item.rate;
      item.customData = {
        y: {
          label: `${item.dimensionName}业务`,
          fmtVal: format.integer(item.rate),
        },
      };
      return  item;
    },
  },
  pageLoadPerformance: {
    order: '1',
    label: '页面加载时间', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {
      var name = title.toLowerCase();
      if(name === 'domloadingtime'){
        return '白屏时间';
      }else if(name === 'feeltime'){
        return '首屏时间';
      }else if(name === 'dom') {
        return '页面加载时间';
      }else if(name === 'page'){
        return '资源加载时间';
      }
      return title;
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;
      item.customData = {
        y: {
          label: '平均加载时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
  },
  pageLoadTimeStat: {
    order: '1',
    label: '页面加载时间', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {
      var name = title.toLowerCase();
      /*if(name=='queuetime'){
        return '请求排队'
      }else*/ if(name === 'webtime'){
        return 'web应用程序';
      }else if(name === 'networktime'){
        return '网络';
      }else if(name === 'domtime') {
        return '网页加载';
      }else if(name === 'pagetime'){
        return '资源下载';
      }
      return title;
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;
      item.customData = {
        y: {
          label: '平均加载时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
    sortBy: function(item) {
      var name = item.name;
      if(name === '请求排队'){
        return 1;
      }else if(name === 'web应用程序'){
        return 2;
      }else if(name === '网络'){
        return 3;
      }else if(name === '网页加载') {
        return 4;
      }else{
        return 5;
      }

    },
  },
  pageLoadTimeStatRt: { // 适用于：组合分析——页面访问量&性能趋势
    order: '1',
    label: '页面加载时间', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {
      var name = title.toLowerCase();
      if(name === 'queuetime'){
        return '请求排队';
      }else if(name === 'webtime'){
        return 'web应用程序';
      }else if(name === 'networktime'){
        return '网络';
      }else if(name === 'domtime') {
        return '网页加载';
      }else{
        return '资源下载';
      }
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.allTimeRt;
      item.customData = {
        y: {
          label: '平均加载时间',
          fmtVal: format.numSecs(item.allTimeRt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
    sortBy: function(item) {
      var name = item.name;
      if(name === '请求排队'){
        return 1;
      }else if(name === 'web应用程序'){
        return 2;
      }else if(name === '网络'){
        return 3;
      }else if(name === '网页加载') {
        return 4;
      }else{
        return 5;
      }

    },
  },
  pageLoadnNetType: {
    order: '1',
    label: '页面加载时间', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {
      var name = title.toLowerCase();

      return title;
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;
      item.customData = {
        y: {
          label: '平均加载时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
    sortBy: function(item) {
      var name = item.name;
      return 1;

    },
  },
  pageLoadnNetTypePPM: {
    order: '1',
    label: '吞吐量', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      var name = title.toLowerCase();

      return title;
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.cpm;
      item.customData = {
        y: {
          label: '吞吐量',
          fmtVal: `${format.numberic(item.cpm)  }ppm`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
    sortBy: function(item) {
      var name = item.name;
      return 1;

    },
  },
  browserLoadTimePPM: {
    order: '1',
    label: '吞吐量', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.cpm;
      item.customData = {
        y: {
          label: '吞吐量',
          fmtVal: `${item.cpm  }ppm`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
    sortBy: function(item) {
      var name = item.name.toLowerCase();
      if(name === 'queuetime'){
        return 1;
      }else if(name === 'webtime'){
        return 2;
      }else if(name === 'networktime'){
        return 3;
      }else if(name === 'domtime') {
        return 4;
      }else{
        return 5;
      }

    },
  },
  browserLoadTimeTime: {
    order: '1',
    label: '平均加载时间', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;
      item.customData = {
        y: {
          label: '平均加载时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
    sortBy: function(item) {
      var name = item.name.toLowerCase();
      if(name === 'queuetime'){
        return 1;
      }else if(name === 'webtime'){
        return 2;
      }else if(name === 'networktime'){
        return 3;
      }else if(name === 'domtime') {
        return 4;
      }else{
        return 5;
      }

    },
  },
  BrowserNum: {
    order: '1',
    label: '发生次数', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;
      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '次数',
          fmtVal: `${format.numberic(item.callCount)  }次`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  AJAXTimeStat: {
    order: '1',
    label: 'ajax响应时间', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;
      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: 'ajax响应时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return item;


    },
  },
  h5time: {
    order: '1',
    label: '加载时间', //FIXME

    format: format.numSecs,
    getTiele: function  (title, item, groupBy) {


      if(groupBy === 'metricId'){
        return item[0].metricName;
      }else{
        return item[0].hostName;
      }
    },
    pointParse: function(item, order, groupBy) {
      item.x = (item.startTime + item.endTime) / 2;
      if(item.callCount != 0){
        item.y = item[order] / (order != 'allTime' ? 1 : item.callCount);
      }else{
        item.y = 0;
      }

      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {

          label: '加载时间',
          fmtVal: format.numSecs(item.y),

        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
  },
  h5ppm: {
    order: '1',
    label: '吞吐量', //FIXME
    format: format.numberic,
    getTiele: function  (title, item, groupBy) {
      if(groupBy === 'metricId'){
        return item[0].metricName;
      }else{
        return item[0].hostName;
      }
    },
    pointParse: function(item, order) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item[order];

      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '吞吐量',
          fmtVal: `${format.numberic(item[order])  }ppm`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
  },
  rumtime: {
    order: '1',
    label: '加载时间', //FIXME

    format: format.numSecs,
    getTiele: function  (title, item, groupBy) {


      if(groupBy === 'metricId'){
        return item.metricName;
      }else{
        return item.hostName;
      }
    },
    pointParse: function(item, order, groupBy) {
      item.x = (item.startTime + item.endTime) / 2;
      if(item.callCount != 0){
        item.y = item[order] / (order != 'allTime' ? 1 : item.callCount);
      }else{
        item.y = 0;
      }

      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {

          label: '加载时间',
          fmtVal: format.numSecs(item.y),

        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
  },
  rumppm: {
    order: '1',
    label: '吞吐量', //FIXME
    format: format.numberic,
    getTiele: function  (title, item, groupBy) {
      if(groupBy === 'metricId'){
        return item.metricName;
      }else{
        return item.hostName;
      }
    },
    pointParse: function(item, order) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item[order];

      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '吞吐量',
          fmtVal: `${format.numberic(item[order])  }ppm`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
  },
  AJAXData: {
    order: '1',
    label: '数据量', //FIXME
    format: format.dataSize,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;
      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '数据量',
          fmtVal: format. dataSize(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  AJAXState: {
    order: '1',
    label: 'http状态', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;


      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '吞吐量',
          fmtVal: `${item.callCount  }次`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  telecomPPM: {
    order: '1',
    label: '访问量', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      if(title === 'allTime'){
        return '访问量';
      }else{
        return title;
      }

    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;


      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '访问量',
          fmtVal: item.callCount,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  telecomTime: {
    order: '1',
    label: '吞吐量', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {

      if(title === 'allTime'){
        return '-';
      }else{
        return title;
      }

    },
    pointParse: function(item) {

      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;


      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '平均时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  rumPPMNew: {
    order: '1',
    label: '访问量', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      if(title === 'allTime'){
        return '访问量';
      }else{
        return title;
      }

    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;


      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '访问量',
          fmtVal: item.callCount,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  rumTimeNew: {
    order: '1',
    label: '吞吐量', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {

      if(title === 'allTime'){
        return '-';
      }else{
        return title;
      }

    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.responseTime;


      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '平均时间',
          fmtVal: format.numSecs(item.responseTime),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  ajaxPPMNew: {
    order: '1',
    label: '访问量', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      if(title === 'allTime'){
        return '访问量';
      }else{
        return title;
      }

    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.ajaxCallCount;


      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '访问量',
          fmtVal: item.ajaxCallCount,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  ajaxTimeNew: {
    order: '1',
    label: '吞吐量', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {

      if(title === 'allTime'){
        return '-';
      }else{
        return title;
      }

    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.ajaxResponseTime;


      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '平均时间',
          fmtVal: format.numSecs(item.ajaxResponseTime),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  errorTimeStat: {
    order: '1',
    label: '出错次数', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;
      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '出错次数',
          fmtVal: `${format.numberic(item.callCount)  }次`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  eventTimeStat: {
    order: '1',
    label: '发生次数', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;
      item.customData = {
        y: {
          label: '发生次数',
          fmtVal: `${format.numberic(item.callCount)  }次`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;
    },
  },
  'ppm': {


    format: format.numberic,
    getTiele: function  (title, item) {
      return '页面吞吐量 ';
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.cpm;
      item.customData = {
        y: {
          label: '页面吞吐量',
          fmtVal: `${format.numberic(item.cpm)  }ppm`,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  'ajaxppm': {


    format: format.numberic,
    getTiele: function  (title, item) {
      return ' AJAX调用次数';
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.callCount;
      item.customData = {
        y: {
          label: 'AJAX调用次数',
          fmtVal: item.callCount,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;


    },
  },
  'ajaxppmtimeSpend': {


    format: format.numSecs,
    getTiele: function  (title, item) {
      return ' AJAX响应时间';
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;
      item.customData = {
        y: {
          label: 'AJAX响应时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  ajaxCbtime: {


    format: format.numMinSecond,
    getTiele: function  (title, item) {
      return ' AJAX回调函数耗时';
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.cbTime;
      item.customData = {
        y: {
          label: ' AJAX回调函数耗时',
          fmtVal: format.numMinSecond(item.cbTime),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;



    },
  },
  apdexStat: {
    order: '1',
    label: 'Apdex', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.apdex;


      item.customData = {
        apdex1: {
          label: '满意次数',
          fmtVal: item.apdexSat,
        },
        apdex2: {
          label: '可容忍次数',
          fmtVal: item.apdexTol,
        },
        apdex3: {
          label: '不满意次数',
          fmtVal: item.apdexFru,
        },

        y: {
          label: 'Apdex',
          fmtVal: item.apdex,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;

    },
    sortBy: function(item) {
      return 1;
    },
  },
  apdexStatInner: {
    order: '1',
    label: 'Apdex', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.apdex;


      item.customData = {
        apdex1: {
          label: '满意次数',
          fmtVal: item.apdexSat,
        },
        apdex2: {
          label: '可容忍次数',
          fmtVal: item.apdexTol,
        },
        apdex3: {
          label: '不满意次数',
          fmtVal: item.apdexFru,
        },

        y: {
          label: 'Apdex',
          fmtVal: item.apdex,
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;

    },
    sortBy: function(item) {
      return 1;
    },
  },
  traceStat: {
    name: 'displayName',
    fmtVal: 'rt',
    getValueKey: function (orderby) {
      if(orderby === 'timeRate'){
        this.fmtVal = 'allTime';
      }else if(orderby === 'ppm'){
        this.fmtVal = 'cpm';
      }else{
        this.fmtVal = 'rt';
      }
      return this.fmtVal;

    },
    getTrace: function(traces) {

      if(traces){
        traces = traces.slice(0, 10);
        return traces.map(function(item) {
          return{
            routeUrl: (function() {
              return `/trace/${  item.traceId  }/start/${  item.startTime}`;
               // var url='#/trace/'+rowData.traceId+'/start/'+rowData.startTime
            })(),
            fmtVal: (function() {
              return format.numSecs(item.allTime);
            })(),
            data: item,
          };
        });
      }else{
        return [];
      }
    },
    getValue: function (orderby, value, allTime) {
      if(orderby === 'timeRate'){
        return format. rate(value / allTime);
      }else if(orderby === 'ppm'){
        return value;
      }else{
        return format.numSecs(value);
      }
    },

    getTiele: function  (title, item) {
      return title;
    },
    routeUrl: function(item, orderby) {
      return `/transactions/${  item.metricId  }/${  orderby  }/${  encodeURIComponent(item.displayName)}`;
    },
    getId: function(item) {
      return item.metricId;
    },
  },
  pageTopNList: {
    name: 'displayName',
    fmtVal: 'rt',
    getValueKey: function (orderby) {
      if(orderby === 'timeRate'){
        this.fmtVal = 'allTime';
      }else if(orderby === 'ppm'){
        this.fmtVal = 'callCount';
      }else{
        this.fmtVal = 'rt';
      }
      return this.fmtVal;

    },
    getValue: function (orderby, value, allTime) {
      if(orderby === 'timeRate'){
        return format. rate(value / allTime);
      }else if(orderby === 'ppm'){
        return value;
      }else{
        return format.numSecs(value);
      }
    },
    getTiele: function  (title, item) {
      return title;
    },
    routeUrl: function(item, orderby, timeType, groupBy, jsonData) {

      var url = `/transactions/${  item.metricId  }/${  orderby  }/${  encodeURIComponent(item.displayName)  }/`;
      if(jsonData != undefined){
        url += encodeURIComponent(JSON.stringify(jsonData));
      }
      return url;
    },
    getId: function(item) {
      return item.metricId;
    },
  },
  pageTopNListH5: {
    name: 'displayName',
    fmtVal: 'rt',
    getValueKey: function (orderby, timeType) {



      if(orderby === 'timeRate'){
        this.fmtVal = 'allTime';
      }else if(orderby === 'ppm'){
        this.fmtVal = 'callCount';
      }else{
        this.fmtVal = timeType;
      }
      return this.fmtVal;

    },
    getValue: function (orderby, value, allTime, allcount, feelcount, timeType) {

      if(orderby === 'timeRate'){
        return format. rate(value / allTime);
      }else if(orderby === 'ppm'){
        return value;
      }else{

        return format.numSecs(value);
      }
    },
    getTiele: function  (title, item) {
      return title;
    },

    routeUrl: function(item, orderby, timeType, groupBy, jsonData) {
      this.groupBy = groupBy;
      var url = '';
      url += '/transactions/' ;
      if(this.groupBy === 'hostId'){
        this.name = 'hostName';
        url +=  `${item.hostId  }/${  encodeURIComponent(item.hostName)  }/`;
      }else{
        this.name = 'displayName';
        url +=  `${item.metricId  }/${  encodeURIComponent(item.displayName)  }/`;
      }
      if(jsonData != undefined){
        url += encodeURIComponent(JSON.stringify(jsonData));
      }
      return  url;
    },
    getId: function(item) {
      if(this.groupBy === 'hostId'){
        return item.hostId;

      }else{
        return item.metricId;
      }

    },
  },
  remoteTopNList: {
    name: 'displayName',
    fmtVal: 'rt',
    getValueKey: function (orderby) {
      if(orderby === 'timeRate'){
        this.fmtVal = 'allTime';
      }else if(orderby === 'ppm'){
        this.fmtVal = 'callCount';
      }else{
        this.fmtVal = 'rt';
      }
      return this.fmtVal;

    },
    getValue: function (orderby, value, allTime) {
      if(orderby === 'timeRate'){
        return format. rate(value / allTime);
      }else if(orderby === 'ppm'){
        return value;
      }else{
        return format.numSecs(value);
      }
    },
    getTiele: function  (title, item) {
      return title;
    },
    routeUrl: function(item, order) {

      if(isNaN(item.metricId)){

        return `/geo/${  item.metricId}/country/${encodeURIComponent(item.displayName)}` ;
      }else{
        return `/geo/${  item.metricId}/region/${encodeURIComponent(item.displayName)}` ;

      }

    },
    getId: function(item) {
      return item.metricId;
    },
  },
  telecomTopNList: {
    name: 'displayName',
    fmtVal: 'rt',
    getValueKey: function (orderby) {
      if(orderby === 'timeRate'){
        this.fmtVal = 'allTime';
      }else if(orderby === 'ppm'){
        this.fmtVal = 'callCount';
      }else{
        this.fmtVal = 'rt';
      }
      return this.fmtVal;

    },
    getValue: function (orderby, value, allTime) {
      if(orderby === 'timeRate'){
        return format. rate(value / allTime);
      }else if(orderby === 'ppm'){
        return value;
      }else{
        return format.numSecs(value);
      }
    },
    getTiele: function  (title, item) {
      return title;
    },
    routeUrl: function(item) {

      return `/transactions/${  item.metricId}/${encodeURIComponent(item.displayName)}` ;
    },
    getId: function(item) {
      return item.metricId;
    },
  },
  ajaxTopNList: {
    name: 'displayName',
    fmtVal: 'rt',
    getValueKey: function (orderby) {
      if(orderby === 'timeRate'){
        this.fmtVal = 'allTime';
      }else if(orderby === 'ppm'){
        this.fmtVal = 'callCount';
      }else{
        this.fmtVal = 'rt';
      }
      return this.fmtVal;

    },
    getValue: function (orderby, value, allTime) {
      if(orderby === 'timeRate'){
        return format. rate(value / allTime);
      }else if(orderby === 'ppm'){
        return value;
      }else{
        return format.numSecs(value);
      }
    },
    getTiele: function  (title, item) {
      return title;
    },
    routeUrl: function(item, order) {

      return `/xhr/${  item.metricId  }/${  encodeURIComponent(item.metricName)  }/${   encodeURIComponent(order)}`;
    },
    getId: function(item) {
      return item.metricId;
    },
  },
  errorTopNList: {
    name: 'displayName',
    fmtVal: 'callCount',
    getValueKey: function (orderby) {

      return 'callCount';

    },
    getValue: function (orderby, value, allTime) {
      return value;
    },
    getTiele: function  (title, item) {
      return title;
    },
    routeUrl: function(item, order) {

      return `/trace/${  item.metricId  }/${  encodeURIComponent(item.metricName)  }/${  order}`;
    },
    getId: function(item) {
      return item.metricId;
    },
  },
  browserTopNList: {
    name: 'displayName',
    fmtVal: 'rt',
    getValueKey: function(orderby) {
      if (orderby === 'timeRate') {
        this.fmtVal = 'allTime';
      } else if (orderby === 'ppm') {
        this.fmtVal = 'callCount';
      }else{
        this.fmtVal = 'rt';
      }
      return this.fmtVal;

    },
    getValue: function(orderby, value, allTime) {
      if (orderby === 'timeRate') {
        return format.rate(value / allTime);
      } else if (orderby === 'ppm') {
        return value;
      } else {
        return format.numSecs(value);
      }
    },
    getTiele: function(title, item) {
      return title;
    },
    routeUrl: function(item) {

      return `/metricname/${  encodeURIComponent(item.metricName)}`;
    },
    getId: function(item) {
      return item.metricName;
    },
  },

  sesionTracepipe: {
    order: '1',
    label: 'Apdex', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return item[0].name;
    },
    pointParse: function(item) {
      item.x = 0;
      item.y = item.y;
      item.customData = {
        y: {
          label: item.name,
          fmtVal: `${item.y}次`,
        },
      };
      return  item;
    },
    sortBy: function(item) {
      return 1;
    },
  },
  sesionTracepipeDome: {
    order: '1',
    label: 'Apdex', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      return item[0].name;
    },
    pointParse: function(item) {
      item.x = 0;
      item.y = item.y;
      item.customData = {
        y: {
          label: item.name,
          fmtVal: `${item.y}次`,
        },
      };
      return  item;
    },
    sortBy: function(item) {
      return 1;
    },
  },
  'Dimensions': {
    order: '1',
    label: '时间片', //FIXME
    format: format.numberic,
    getTiele: function  (title, item) {
      var titleStr = item[0].name;
      var dateType = item[0].dateType;
      if(dateType === 'metricId'){
        return getShortTitle(titleStr, 20);
      }else{
        return titleStr;
      }




    },
    pointParse: function(item) {

      item.x = 0;
      item.y = item.y;
      // item.timeType='alltime',
      // item.timeGrade=0,
      var dateType = item.dateType;
      var titleStr = item.name;
      if(dateType === 'metricId'){
        titleStr = getShortTitle(titleStr, 30);
      }else{
        titleStr = '';
      }
      item.customData = {
        y: {
          label: `${titleStr}用户<br/>访问次数`,
          fmtVal: `${item.y}次`,
        },
        startTime: item.startTime,
        endTime: item.endTime,



      };
      return  item;
    },
    sortBy: function(item) {
      return 1;
    },
  },

  pageloadTopNtime: {
    order: '1',
    label: '平均加载时间', //FIXME
    format: format.numSecs,
    getTiele: function  (title, item) {
      return title;
    },
    pointParse: function(item) {
      item.x = (item.startTime + item.endTime) / 2;
      item.y = item.rt;

      item.customData = {
        // rt:{
        //   label:'平均加载时间',
        //   fmtVal:item.rt
        // },

        y: {
          label: '平均加载时间',
          fmtVal: format.numSecs(item.rt),
        },
        startTime: item.startTime,
        endTime: item.endTime,
      };
      return  item;
    },
  },
};



const getDataForMapComCdn = function(data, type) {
  return _.chain(data).map(function(v) {
    if (v['callCount']) {
      if(typeof v['metricId'] === 'string'){
        v['metricId'] = v['metricId'].toLowerCase();
      }
      return {
        label: '平均时间',
        name: v['metricName'],
        'hc-key': v['metricId'],
        'cn-code': v['metricId'],
        value: v['totalTime'],
        fmtVal: format.numSecs(v['totalTime']),
        startTime: v['startTime'],
        endTime: v['endTime'],
        fmtValSub: v['callCount'],
        labelSub: '访问量',
        typeMap: type,

      };
         // {
         //    value:p.value,
         //    fmtVal:p.fmtVal,
         //    name:p.name,
         //    label:p.label,
         //    startTime:p.startTime,
         //    endTime:p.endTime,
         //    'hc-key':p.name
         //  }

    }
  }).filter(function(v) {
    return v;
  }).value();
};

const getDataForMapShengfen = function(data) {
  return _.chain(data).map(function(v) {



    return {
      label: '平均加载时间',
      name: v['cityName'],
      'id': String(v['regionId'] / 100),
      value: v['rt'],
      fmtVal: format.numSecs(v['rt']),
      startTime: v['startTime'],
      endTime: v['endTime'],
      fmtValSub: `${v['cpm']}ppm`,
      labelSub: '吞吐量',
    };
         // {
         //    value:p.value,
         //    fmtVal:p.fmtVal,
         //    name:p.name,
         //    label:p.label,
         //    startTime:p.startTime,
         //    endTime:p.endTime,
         //    'hc-key':p.name
         //  }

  }).filter(function(v) {
    return v;
  }).value();
};

const getDataForMapShengfenCdn = function(data) {
  return _.chain(data).map(function(v) {



    return {
      label: '平均加载时间',
      name: v['metricName'],
      'id': `${v['metricId'] / 100}`,
      value: v['rt'],
      fmtVal: format.numSecs(v['rt']),
      startTime: v['startTime'],
      endTime: v['endTime'],
      fmtValSub: `${v['cpm']}ppm`,
      labelSub: '吞吐量',
    };
         // {
         //    value:p.value,
         //    fmtVal:p.fmtVal,
         //    name:p.name,
         //    label:p.label,
         //    startTime:p.startTime,
         //    endTime:p.endTime,
         //    'hc-key':p.name
         //  }

  }).filter(function(v) {
    return v;
  }).value();
};


//    var BlueWare = {
//   urlPrefix:'/browser',
//   appId:parseInt('1'),
//   staticPath:'',
// }



const parseToChartDataForAJAX = function(data) {
  if(data && data.datas === undefined){
    return [];
  }
  var result = {};
  _.each(data.datas, function(item, key) {
    result[item.displayName] = item.datas;
  });

  return result;

};
const parseToChartForH5 = function(data, groupBy) {
  if(data && data.datas === undefined){
    return [];
  }
  var result = {};
  _.each(data.datas, function(item, key) {

    if(groupBy === 'metricId'){
      result[item.metricName] = item.datas;
    }else{

      result[item.hostName] = item.datas;
    }
  });

  return result;

};
const getDataForMap = function(data) {
  return _.chain(data).map(function(v) {
    if (v['callCount']) {
      if(typeof v['metricId'] === 'string'){
        v['metricId'] = v['metricId'].toLowerCase();
      }
      return {
        label: '平均加载时间',
        name: v['metricName'],
        'hc-key': v['metricId'],
        value: v['rt'],
        fmtVal: format.numSecs(v['rt']),
        startTime: v['startTime'],
        endTime: v['endTime'],
        fmtValSub: `${v['cpm']}ppm`,
        labelSub: '吞吐量',
      };
         // {
         //    value:p.value,
         //    fmtVal:p.fmtVal,
         //    name:p.name,
         //    label:p.label,
         //    startTime:p.startTime,
         //    endTime:p.endTime,
         //    'hc-key':p.name
         //  }

    }
  }).filter(function(v) {
    return v;
  }).value();
};

const parseToChart = function(data, params, options) {
  var viewKey = params.viewKey;

  var groupBy = params.groupBy;

  function colorByType (detailName) {
    if(detailName === 'script'){
      return '#FEC584';
    }else if(detailName === 'img'){
      return '#C49AE8';
    }else if(detailName === 'link'){
      return '#B2EA94';
    }else if(detailName === 'xmlhttprequest'){
      return '#82B5FC';
    } else if(detailName === 'css'){
      return '#6AE0E0';
    } else if(detailName === 'iframe'){
      return '#E08F81';
    } else {
      return '#C4C4C4';
    }
  }

  return {
    yAxis: {
      labels: {
        formatter: function() {
          return propConfig[viewKey].format(this.value);
        },
      },
      maxPadding: 0,
    },
    series: _.chain(data).map(function(oneitem, n) {

      if( (oneitem instanceof Array) === false ){
        oneitem = [];
      }

      var serie = {
        name: propConfig[viewKey].getTiele(n, oneitem, groupBy),
        data: _.chain(oneitem).map(function(item, index) {
          return propConfig[viewKey].pointParse(item, params.order, groupBy);
        }).sortBy(function(v) {
          return (v != undefined && v.x != undefined) ? v.x : undefined;
        }).value(),
      };

      if (viewKey === 'sessions') {
        serie.color = 'rgb(255, 147, 38)';
      } else if(viewKey === 'apdexStat') {
        serie.color = 'rgb(8, 115, 185)';
      } else if(viewKey === 'sesionTracepipe') {
        serie.color = colorByType(serie.name);
      } else if (viewKey === 'pageCallcount') {
        serie.color = 'rgb(84, 141, 252)';
      } else if (viewKey === 'singleLine') {
        serie.color = oneitem[0].color || 'rgb(84, 141, 252)'
      }

      return serie;
    }).filter(function(item, key) {
      if(viewKey === 'pageLoadTimeStat' && item.name === 'queueTime'){
        return false;
      }

      if (item.data instanceof Array && item.data.length > 0 && item.data[0] != undefined && typeof item.data[0] === 'object') {
        return true;
      }

      return false;
    }).sortBy(propConfig[viewKey].sortBy).value(),
  };
};

const parseToTopBar = function(data, params, options) {
  var viewKey = params.viewKey;
  var orderKey = params.order;
  var timeType = params.timeType;
  var groupBy = params.groupBy;
  var jsonData = params.jsonData;

  if (!data.length) {
    return [];
  }
  if(groupBy != undefined && timeType === 'allTime' && orderKey === 'timeSpend'){
    data = _.each(data, function(item) {
      item.allTime = parseInt(item.allTime / item.callCount);
    });
  }
  var totalTime = _.chain(data)
    .pluck(propConfig[viewKey].getValueKey(orderKey, timeType))
    .reduce(function(a, b) {
      return a + b;
    }).value();
  return _(data).sortBy(function(v){
    return v[propConfig[viewKey].fmtVal] * (-1);


  }).map(function(v) {
    v['ratio'] = v[propConfig[viewKey].fmtVal] / totalTime;

    v['fmtVal'] = propConfig[viewKey].getValue(orderKey, v[propConfig[viewKey].fmtVal], totalTime, v.callCount, v.feelTimeCount, timeType);
    v['routeUrl'] = propConfig[viewKey].routeUrl(v, orderKey, timeType, groupBy, jsonData);
    v['name'] = v[propConfig[viewKey].name];
    v['id'] = propConfig[viewKey].getId(v);
    if(v['traces']){
      v['traces'] = propConfig[viewKey].getTrace(v['traces']);
    }
    return v;
  });


};


const percentage = function(objdata, baseName){
  var title = {
    'responseTime': __('页面加载时间'),
    'domReadyTime': __('DOM构建时间'),
    'firstByteTime': __('首字节时间'),
  };

  var sort = {
    'responseTime': 3,
    'domReadyTime': 2,
    'firstByteTime': 1,
  };
  var baseNum = objdata[baseName];
  return _.chain(objdata)
  .map(function(value, key){
    return {
      value: value,
      pet: baseNum != 0 ? format.rate(value / baseNum) : format.rate(0),
      name: title[key],
      key: key,
      time: format.numSecs(value),
      sortkey: sort[key],
    };
  })
  .sortBy(function(item){ return -item.sortkey; })
  .value();

};

export default {
  percentage,
  parseToTopBar,
  parseToChart,
  getDataForMap,
  getDataForMapComCdn,
  getDataForMapShengfen,
  getDataForMapShengfenCdn,
  parseToChartDataForAJAX,
  parseToChartForH5,
  propConfig,
};
