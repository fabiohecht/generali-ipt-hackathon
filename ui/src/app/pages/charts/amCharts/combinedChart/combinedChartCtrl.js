/**
 * @author a.demeshko
 * created on 22.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.charts.amCharts')
        .controller('combinedChartCtrl', combinedChartCtrl);

    /** @ngInject */
    function combinedChartCtrl($element, baConfig, layoutPaths) {
        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');
        var chart = AmCharts.makeChart(id, {
            "type": "serial",
            "theme": "none",
            "color": layoutColors.defaultText,
            "dataDateFormat": "YYYY-MM-DD",
            "precision": 2,
            "valueAxes": [{
                color: layoutColors.defaultText,
                axisColor: layoutColors.defaultText,
                gridColor: layoutColors.defaultText,
                "id": "v1",
                "title": "Driving Score",
                "position": "left",
                "autoGridCount": false
            }, {
                color: layoutColors.defaultText,
                axisColor: layoutColors.defaultText,
                gridColor: layoutColors.defaultText,
                "id": "v2",
                "title": "Percentage Discount",
                "gridAlpha": 0,
                "position": "right",
                "autoGridCount": false,
                "labelFunction": function (value) {
                    return value * 100 + "%";
                }
            }],
            "graphs": [{
                "id": "g1",
                "valueAxis": "v1",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": layoutColors.defaultText,
                color: layoutColors.defaultText,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": layoutColors.warning,
                "type": "smoothedLine",
                "title": "Driving Score",
                "useLineColorForBulletBorder": true,
                "valueField": "drivingScore",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
            }, {
                "id": "g2",
                "valueAxis": "v2",
                color: layoutColors.defaultText,
                "lineColor": "#dc3248",
                "fillColors": "#dc3248",
                "fillAlphas": 0.9,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": layoutColors.defaultText,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "type": "column",
                "title": "Percentage Discount",
                "useLineColorForBulletBorder": true,
                "valueField": "discount",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
            }],
            "chartScrollbar": {
                "graph": "g1",
                "oppositeAxis": false,
                "offset": 30,
                gridAlpha: 0,
                color: layoutColors.defaultText,
                scrollbarHeight: 50,
                backgroundAlpha: 0,
                selectedBackgroundAlpha: 0.05,
                selectedBackgroundColor: layoutColors.defaultText,
                graphFillAlpha: 0,
                autoGridCount: true,
                selectedGraphFillAlpha: 0,
                graphLineAlpha: 0.2,
                selectedGraphLineColor: layoutColors.defaultText,
                selectedGraphLineAlpha: 1
            },
            "chartCursor": {
                "pan": true,
                "cursorColor": layoutColors.danger,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2
            },
            "categoryField": "date",
            "categoryAxis": {
                "axisColor": layoutColors.defaultText,
                "color": layoutColors.defaultText,
                "gridColor": layoutColors.defaultText,
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "legend": {
                "useGraphSettings": true,
                "position": "top",
                "color": layoutColors.defaultText
            },
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "export": {
                "enabled": true
            },
            "dataProvider": [{
                "date": "2018-06-09",
                "drivingScore": 7153,
                "discount": .002
            }, {
                "date": "2018-06-10",
                "drivingScore": 7482,
                "discount": .005
            }, {
                "date": "2018-06-11",
                "drivingScore": 8026,
                "discount": .003
            }, {
                "date": "2018-06-12",
                "drivingScore": 8510,
                "discount": .01
            }, {
                "date": "2018-06-13",
                "drivingScore": 8205,
                "discount": 0
            }, {
                "date": "2018-06-14",
                "drivingScore": 8392,
                "discount": 0
            }, {
                "date": "2018-06-15",
                "drivingScore": 8801,
                "discount": .02
            }, {
                "date": "2018-06-16",
                "drivingScore": 8557,
                "discount": 0
            }, {
                "date": "2018-06-17",
                "drivingScore": 8583,
                "discount": 0
            }, {
                "date": "2018-06-18",
                "drivingScore": 8025,
                "discount": 0
            }, {
                "date": "2018-06-19",
                "drivingScore": 8740,
                "discount": .013
            }, {
                "date": "2018-06-20",
                "drivingScore": 8406,
                "discount": 0
            }, {
                "date": "2018-06-21",
                "drivingScore": 8312,
                "discount": 0
            }, {
                "date": "2018-06-22",
                "drivingScore": 8480,
                "discount": 0
            }, {
                "date": "2018-06-23",
                "drivingScore": 8117,
                "discount": 0

            }],
            pathToImages: layoutPaths.images.amChart
        });
    }

})();
