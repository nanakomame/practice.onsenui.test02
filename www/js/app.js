(function(){
  // controller
  //////////////////////////////////////////
  // app
  //////////////////////////////////////////
  'use strict';
  var module = angular.module('app', ['onsen']);
  // controller
  module.controller('AppController', function($scope) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
  });
  //////////////////////////////////////////
  // day
  //////////////////////////////////////////
  module.controller('CalendarControllerD', function($scope, $dataDays) {
    $scope.day = $dataDays.data.selectedDay;
  });
  //////////////////////////////////////////
  // month
  //////////////////////////////////////////
  module.controller('CalendarControllerM', function($scope, $dataDays) {
    $scope.days = $dataDays.data.days;
    $scope.showDay = function(index) {
        setTimeout(function(){
          var selectedDay = $dataDays.data.days[index];
          $dataDays.data.selectedDay = selectedDay;
          $scope.navi.pushPage('day.html', {title : selectedDay.title});
      });
    };
  });
  //////////////////////////////////////////
  // year
  //////////////////////////////////////////
  module.controller('CalendarControllerY', function($scope, $dataYM, $dataDays) {
    $scope.months = $dataYM.months;
    $scope.showMonth = function(index) {
        setTimeout(function(){
          var selectedYM = $dataYM.months[index];
          $dataYM.selectedYM = selectedYM;
          $dataDays.data.days = $dataDays.getData(selectedYM);
          $scope.navi.pushPage('month.html');
        });
    };
  });
  
  // data
  //////////////////////////////////////////
  // List days
  // data:{days:[{}...],selectedDay:{}}
  //////////////////////////////////////////
  module.factory('$dataDays', function() {
    var service = {
      data : {},
      getData : function(selectedYM) {
        var days = [
            { 
                date    : new Date(2015,2,17,0,0,0,0),
                food    : [{date:new Date(2015,2,16,9,0,0,0),amount:'たくさん',memo:''},
                           {date:new Date(2015,2,16,18,0,0,0),amount:'ふつう',memo:'おやつ少しとかメモってみたり。おやつ枠は別に作ったがいいかなあ。'}],
                medicine: [{date:new Date(2015,2,16,9,0,0,0),amount:'2',memo:'調子が悪かったのでお薬大目。'},
                           {date:new Date(2015,2,16,18,0,0,0),amount:'1',memo:'予防接種。'}],
                excreta : [{date:new Date(2015,2,16,08,0,0,0),amount:'ふつう',memo:''}],
                memo    : 'あいうえお。メモ欄です。'
            },
            { 
                date    : new Date(2015,2,16),
                food    : [],
                medicine: [],
                excreta : [],
                memo    : 'かきくけこ。メモ欄です。'
            },
            { 
                date    : new Date(2015,2,15),
                food    : [],
                medicine: [],
                excreta : [],
                memo    : 'さしすせそ。メモ欄です。'
            },
            { 
                date    : new Date(2015,2,14),
                food    : [],
                medicine: [],
                excreta : [],
                memo    : 'たちつてと。メモ欄です。'
            }
        ];
        return days;
      }
    };
    return service;
  });
  

  //////////////////////////////////////////
  // List Year,Month(order by date desc)
  // {months:[{year:,month:}...],selectedYM:{}}
  //////////////////////////////////////////
  module.value('$baseDate',new Date());  // 当日先未来が必要になったら改修すること
  module.factory('$dataYM', ['$baseDate', function($baseDate) {
      var dataYM = {};
      var periodY = 20;
      
      // 基準日と範囲
      var today = $baseDate;
      var fromYear = today.getFullYear() - periodY;
      var toYear = today.getFullYear();
      var currentYear = toYear;
      
      // 収集する値
      var months = [];
      var years =[];
      
      // ひと月ずつ加算
      while(currentYear >= fromYear){
        // 12か月を追加
        for(var currentMonth =  11; currentMonth >= 0; currentMonth-- ){
          // 基準年月より先日付は読み飛ばす
          if ( currentYear === today.getFullYear() &&  currentMonth > today.getMonth()) {
              continue;
          }
          months.push({ year : currentYear, month: currentMonth + 1});
        }
        years.push(currentYear);
        // カウントダウン
        currentYear--;
      }
      
      // 整形
      dataYM = {
          years : years,
          today : today,
          months : months
      };
      return dataYM;
      
  }]);
  
})();