define(function(require, exports, module) {
    var $ = require("jquery");
    var SportStore = function() {
      me = this;
    };

    SportStore.prototype.fechByIndex = function(index){
      return $.getJson("/getSportDataByIndex").then(function(data){
        if(data.ret == 1){
          /*var sport = require("models/Sport");
          if(data.sportDatas.length>0){
            for (var i = 0; i < data.sportDatas.length; i++) {
              sport.setSportData(data.sportDatas[i]);
              allData.sportDatas.push(sport.getSportData);
            };
          } 
          if(data.sleepDatas.length>0){
            for (var i = 0; i < data.sleepDatas.length; i++) {
              sport.setSleepData(data.sleepDatas[i]);
              allData.sleepDatas.push(sport.getSleepData);
            };
          }*/
          //FIXME ?sleepDatas
          return this.getTransData(data.sportDatas);
        }else{
            return data.msg;
        }
      });
    }
    SportStore.prototype._getjsonData = function() {
      return jsonData['sportDatas'];
    };

    SportStore.prototype._getData = function(baseData,dataId) {
      var iData = new Array();
      var myArry = new Array();
      for (var i = baseData.length - 1; i >= 0; i--) {
        iData = [];
        iData.push(baseData[i]['time'], baseData[i][dataId]);
        myArry.push(iData);
      };
      return myArry;
    };

    SportStore.prototype.getTransData = function(data) {
      var allData = {};
      var sleepData = new Array(), stepsData = new Array(), distanceData = new Array(), calorieData = new Array();
      sleepData = this._getData('sleepHours');
      stepsData = this._getData('steps');
      distanceData = this._getData('distance');
      calorieData = this._getData('calorie');
      allData["sleepData"] = sleepData;
      allData['stepsData'] = stepsData;
      allData['distanceData'] = distanceData;
      allData['calorieData'] = calorieData;
      return allData;
    };

    module.exports = SportStore;
  });












