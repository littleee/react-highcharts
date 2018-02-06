import Highcharts from 'local-highcharts-baseline';

export const isBaseLineOfSerie = (serie) => {
  return serie.options.type === 'baseLine' || serie.options.type === 'baseLineArea';
};

export const baseLineStatus = 'baseLineStatus';

export const findBaseLineSeries = () => {
  const series = [];
  Highcharts.charts.forEach(function(chart){
    // Highcharts.chart方式获取的图表，其中一些为undefined，可能是单页面切换时chart被卸载造成的
    if(chart)
      chart.series.forEach(serie => {
        if(isBaseLineOfSerie(serie)){
          series.push(serie);
        }
      });
  });
  return series;
};
