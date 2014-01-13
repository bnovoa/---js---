define(function(require, exports, module) {
  var $ = require("jquery"),
    Events = require("../../utils/EventBus"),
    me = null;

  var SportLineChartView = function(el) {
    me = this;
    me.el = $(el);
    //me.el.on('click', '$sports-trends-container .day', me._handleClick);
  };
  SportLineChartView.prototype.render = function(data) {
    //利用chartjs引擎渲染
  }

  SportLineChartView.prototype.flotChartRender = function(nodeId, data, dateType) {
    seajs.use("flot", function() {
      seajs.use("flot.time", function() {
        switch (dateType) {
          case "hour":
            $.plot(nodeId, [data], {
              xaxis: {
                mode: "time",
                minTickSize: [1, 'hour'],
                timeformat: "%H"
              },
              series: {
                lines: {
                  show: true
                },
                points: {
                  show: true
                }
              }
            });
            break;
          case "day":
            $.plot("#sports-trends", [data], {
              xaxis: {
                mode: "time",
                minTickSize: [1, 'day'],
                timeformat: "%Y/%m/%d"
              },
              series: {
                lines: {
                  show: true
                },
                points: {
                  show: true
                }
              }
            });
            break;
          case "month":
            $.plot("#sports-trends", [data], {
              xaxis: {
                mode: "time",
                minTickSize: [1, 'day'],
                timeformat: "%Y/%m/%d"
              },
              series: {
                lines: {
                  show: true
                },
                points: {
                  show: true
                }
              }
            });
            break;
        };
      });
    });
  };

  SportLineChartView.prototype._handleClick = function(event) {
    event.preventDefault();
    /* Act on the event */
    alert("1111");
  }

  module.exports = SportLineChartView;
});