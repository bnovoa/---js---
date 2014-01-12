define(function(require, exports, module) {
    var $ = require("jquery");
    var jsonData = {
      "ret": 1,
      "msg": "success",
      "sportDatas": [{
        "time": 1389065200000,
        "sleepHours": 0,
        "steps": 100,
        "distance": 100,
        "calorie": 200
      }, {
        "time": 1389075200000,
        "sleepHours": 0,
        "steps": 500,
        "distance": 650,
        "calorie": 400
      }, {
        "time": 1389085200000,
        "sleepHours": 0,
        "steps": 1500,
        "distance": 2000,
        "calorie": 1000
      }, {
        "time": 1389095200000,
        "sleepHours": 0,
        "steps": 500,
        "distance": 600,
        "calorie": 800
      }, {
        "time": 1389105200000,
        "sleepHours": 2,
        "steps": 10,
        "distance": 200,
        "calorie": 200
      }]
    };

    var UserData = function() {
      me = this;
    };


    UserData.prototype._getjsonData = function() {
      return jsonData['sportDatas'];
    };

    UserData.prototype._getData = function(arrayId, dataId) {
      var baseData = me._getjsonData();
      var iData = new Array();
      for (var i = baseData.length - 1; i >= 0; i--) {
        iData = [];
        iData.push(baseData[i]['time'], baseData[i][dataId]);
        arrayId.push(iData);
      };

      return arrayId;
    };

    UserData.prototype.setData = function() {
      sleepData = new Array(), stepsData = new Array(), distanceData = new Array(), calorieData = new Array();
      sleepData = me._getData(sleepData, 'sleepHours');
      stepsData = me._getData(stepsData, 'steps');
      distanceData = me._getData(distanceData, 'distance');
      calorieData = me._getData(calorieData, 'calorie');
      var allData = new Array();
      allData["sleepData"] = "fdshfhjdskhfjksdhk";
      allData['stepsData'] = stepsData;
      allData['distanceData'] = distanceData;
      allData['calorieData'] = calorieData;
      return allData;
    };

    module.exports = UserData;

  })