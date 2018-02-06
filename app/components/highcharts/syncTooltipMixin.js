import Highcharts from 'local-highcharts-baseline';
import _ from 'lodash';

function syncTooltip(container, point_position, hide) {
  Highcharts.charts.forEach(function(chart) {
    if (chart && container.id !== chart.container.id && chart.series.length) {
      if (hide === false) {
        chart.tooltip.hide();

        chart.series.forEach((s) => {
          if (s.halo) {
            s.halo.destroy();
            s.halo = null;
          }
          if (s.__marker) {
            s.__marker.destroy();
            s.__marker = null;
          }
        });
      } else {
        var target_serie = chart.series[point_position.index] ? chart.series[point_position.index] : _(chart.series).find(function(s) {
          return s.data.length > 0;
        });
        if (target_serie) {
          var c_p = _.find(target_serie.data, function(p) {
            return p.x === point_position.x;
          });
          if (c_p) {
            chart.tooltip.refresh(c_p);

            if (target_serie.halo) {
              target_serie.halo.destroy();
            }
            if (target_serie.__marker) {
              target_serie.__marker.destroy();
            }
            target_serie.halo = chart.renderer.path()
              .add(chart.seriesGroup);
            target_serie.halo.attr({
              'fill': c_p.color || target_serie.color,
              'fill-opacity': 0.25,
              'zIndex': -1,
            })['animate']({
              d: c_p.haloPath(10),
            });

            target_serie.__marker = chart.renderer.path()
              .add(chart.seriesGroup);
            target_serie.__marker.attr({
              'fill': '#0873b9',
              'zIndex': -1,
              'stroke': '#FFFFFF',
              'stroke-width': 2,
              'visibility': 'visible',
            })['animate']({
              d: c_p.haloPath(2),
            });
          }
        }

      }
    }
  });
}

// plotOptions
module.exports = {
  series: {
    point: {
      events: {
        mouseOver: function() {
          syncTooltip(this.series.chart.container, {
            x: this.x,
            index: this.series.index,
          });
        },
        mouseOut: function() {
          syncTooltip(this.series.chart.container, {
            x: this.x,
            index: this.series.index,
          }, false);
        },
      },
    },
  },
};
