define(function(require, exports, module) {
    var $ = require("jquery");
    var domain = require("domain");

    var SportStore = function() { me = this;};

    SportStore.prototype.fetchByIndex = function(index,startTime,endTime,num){
      return $.ajax(domain+"getSportDataByIndex",{data:{"index":index,"startTime":startTime,"endTime":endTime,"num":num},dataType:"json"}).then(function(data){
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
          return me.getTransData(data.sportDatas);
        }else{
            return data.msg;
        }
      });
    };
    //summary data 
    SportStore.prototype.fetchAllData = function() {
      return $.getJSON(domain+"getSportData").then(function(data){
        if(data.ret == 1){
          return data;
        }else{
            return data.msg;
        }
      });
    };
    // check bracelet
    SportStore.prototype.checkBracelet = function() {
      return $.getJSON(domain+"haveBracelet").then(function(data){
          return data;
      });
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
      sleepData = this._getData(data,'sleepHours');
      stepsData = this._getData(data,'steps');
      distanceData = this._getData(data,'distance');
      calorieData = this._getData(data,'calorie');
      allData["sleepData"] = sleepData;
      allData['stepsData'] = stepsData;
      allData['distanceData'] = distanceData;
      allData['calorieData'] = calorieData;
      return allData;
    };

    module.exports = SportStore;
  });












