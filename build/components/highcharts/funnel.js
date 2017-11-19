/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 451);
/******/ })
/************************************************************************/
/******/ ({

/***/ 41:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license 
 * Highcharts funnel module
 *
 * (c) 2010-2016 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
/* eslint indent:0 */
(function (factory) {
    if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
})(function (Highcharts) {

    // create shortcuts
    var defaultOptions = Highcharts.getOptions(),
        defaultPlotOptions = defaultOptions.plotOptions,
        seriesTypes = Highcharts.seriesTypes,
        merge = Highcharts.merge,
        noop = function noop() {},
        each = Highcharts.each;

    // set default options
    defaultPlotOptions.funnel = merge(defaultPlotOptions.pie, {
        animation: false,
        center: ['50%', '50%'],
        width: '90%',
        neckWidth: '30%',
        height: '100%',
        neckHeight: '25%',
        reversed: false,
        dataLabels: {
            //position: 'right',
            connectorWidth: 1,
            connectorColor: '#606060'
        },
        size: true, // to avoid adapting to data label size in Pie.drawDataLabels
        states: {
            select: {
                color: '#C0C0C0',
                borderColor: '#000000',
                shadow: false
            }
        }
    });

    seriesTypes.funnel = Highcharts.extendClass(seriesTypes.pie, {

        type: 'funnel',
        animate: noop,

        /**
         * Overrides the pie translate method
         */
        translate: function translate() {
            var
            // Get positions - either an integer or a percentage string must be given
            getLength = function getLength(length, relativeTo) {
                return (/%$/.test(length) ? relativeTo * parseInt(length, 10) / 100 : parseInt(length, 10)
                );
            },
                sum = 0,
                series = this,
                chart = series.chart,
                options = series.options,
                reversed = options.reversed,
                ignoreHiddenPoint = options.ignoreHiddenPoint,
                plotWidth = chart.plotWidth,
                plotHeight = chart.plotHeight,
                cumulative = 0,
                // start at top
            center = options.center,
                centerX = getLength(center[0], plotWidth),
                centerY = getLength(center[1], plotHeight),
                width = getLength(options.width, plotWidth),
                tempWidth,
                getWidthAt,
                height = getLength(options.height, plotHeight),
                neckWidth = getLength(options.neckWidth, plotWidth),
                neckHeight = getLength(options.neckHeight, plotHeight),
                neckY = centerY - height / 2 + height - neckHeight,
                data = series.data,
                path,
                fraction,
                half = options.dataLabels.position === 'left' ? 1 : 0,
                x1,
                y1,
                x2,
                x3,
                y3,
                x4,
                y5;

            // Return the width at a specific y coordinate
            series.getWidthAt = getWidthAt = function getWidthAt(y) {
                var top = centerY - height / 2;

                return y > neckY || height === neckHeight ? neckWidth : neckWidth + (width - neckWidth) * (1 - (y - top) / (height - neckHeight));
            };
            series.getX = function (y, half) {
                return centerX + (half ? -1 : 1) * (getWidthAt(reversed ? 2 * centerY - y : y) / 2 + options.dataLabels.distance);
            };

            // Expose
            series.center = [centerX, centerY, height];
            series.centerX = centerX;

            /*
             * Individual point coordinate naming:
             *
             * x1,y1 _________________ x2,y1
             *  \                         /
             *   \                       /
             *    \                     /
             *     \                   /
             *      \                 /
             *     x3,y3 _________ x4,y3
             *
             * Additional for the base of the neck:
             *
             *       |               |
             *       |               |
             *       |               |
             *     x3,y5 _________ x4,y5
             */

            // get the total sum
            each(data, function (point) {
                if (!ignoreHiddenPoint || point.visible !== false) {
                    sum += point.y;
                }
            });

            each(data, function (point) {
                // set start and end positions
                y5 = null;
                fraction = 1 / data.length;
                y1 = centerY - height / 2 + cumulative * height;
                y3 = y1 + fraction * height;
                //tempWidth = neckWidth + (width - neckWidth) * ((height - neckHeight - y1) / (height - neckHeight));
                tempWidth = getWidthAt(y1);
                x1 = centerX - tempWidth / 2;
                x2 = x1 + tempWidth;
                tempWidth = getWidthAt(y3);
                x3 = centerX - tempWidth / 2;
                x4 = x3 + tempWidth;

                // the entire point is within the neck
                if (y1 > neckY) {
                    x1 = x3 = centerX - neckWidth / 2;
                    x2 = x4 = centerX + neckWidth / 2;

                    // the base of the neck
                } else if (y3 > neckY) {
                    y5 = y3;

                    tempWidth = getWidthAt(neckY);
                    x3 = centerX - tempWidth / 2;
                    x4 = x3 + tempWidth;

                    y3 = neckY;
                }

                if (reversed) {
                    y1 = 2 * centerY - y1;
                    y3 = 2 * centerY - y3;
                    y5 = y5 ? 2 * centerY - y5 : null;
                }
                // save the path
                path = ['M', x1, y1, 'L', x2, y1, x4, y3];
                if (y5) {
                    path.push(x4, y5, x3, y5);
                }
                path.push(x3, y3, 'Z');

                // prepare for using shared dr
                point.shapeType = 'path';
                point.shapeArgs = { d: path };

                // for tooltips and data labels
                point.percentage = fraction * 100;
                point.plotX = centerX;
                point.plotY = (y1 + (y5 || y3)) / 2;

                // Placement of tooltips and data labels
                point.tooltipPos = [centerX, point.plotY];

                // Slice is a noop on funnel points
                point.slice = noop;

                // Mimicking pie data label placement logic
                point.half = half;

                if (!ignoreHiddenPoint || point.visible !== false) {
                    cumulative += fraction;
                }
            });
        },
        /**
         * Draw a single point (wedge)
         * @param {Object} point The point object
         * @param {Object} color The color of the point
         * @param {Number} brightness The brightness relative to the color
         */
        drawPoints: function drawPoints() {
            var series = this,
                chart = series.chart,
                renderer = chart.renderer,
                pointAttr,
                shapeArgs,
                graphic;

            each(series.data, function (point) {
                graphic = point.graphic;
                shapeArgs = point.shapeArgs;

                pointAttr = point.pointAttr[point.selected ? 'select' : ''];

                if (!graphic) {
                    // Create the shapes				
                    point.graphic = renderer.path(shapeArgs).attr(pointAttr).add(series.group);
                } else {
                    // Update the shapes
                    graphic.attr(pointAttr).animate(shapeArgs);
                }
            });
        },

        /**
         * Funnel items don't have angles (#2289)
         */
        sortByAngle: function sortByAngle(points) {
            points.sort(function (a, b) {
                return a.plotY - b.plotY;
            });
        },

        /**
         * Extend the pie data label method
         */
        drawDataLabels: function drawDataLabels() {
            var data = this.data,
                labelDistance = this.options.dataLabels.distance,
                leftSide,
                sign,
                point,
                i = data.length,
                x,
                y;

            // In the original pie label anticollision logic, the slots are distributed
            // from one labelDistance above to one labelDistance below the pie. In funnels
            // we don't want this.
            this.center[2] -= 2 * labelDistance;

            // Set the label position array for each point.
            while (i--) {
                point = data[i];
                leftSide = point.half;
                sign = leftSide ? 1 : -1;
                y = point.plotY;
                x = this.getX(y, leftSide);

                // set the anchor point for data labels
                point.labelPos = [0, // first break of connector
                y, // a/a
                x + (labelDistance - 5) * sign, // second break, right outside point shape
                y, // a/a
                x + labelDistance * sign, // landing point for connector
                y, // a/a
                leftSide ? 'right' : 'left', // alignment
                0];
            }

            seriesTypes.pie.prototype.drawDataLabels.call(this);
        }

    });

    /** 
     * Pyramid series type.
     * A pyramid series is a special type of funnel, without neck and reversed by default.
     */
    defaultOptions.plotOptions.pyramid = Highcharts.merge(defaultOptions.plotOptions.funnel, {
        neckWidth: '0%',
        neckHeight: '0%',
        reversed: true
    });
    Highcharts.seriesTypes.pyramid = Highcharts.extendClass(Highcharts.seriesTypes.funnel, {
        type: 'pyramid'
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)(module)))

/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(438);


/***/ })

/******/ });