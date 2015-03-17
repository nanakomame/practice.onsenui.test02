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
                title: 'Item 1 Title' + selectedYM.year + selectedYM.month,
                label: '4h',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Another Item Title',
                label: '6h',
                desc: 'Ut enim ad minim veniam.'
            },
            { 
                title: 'Yet Another Item Title',
                label: '1day ago',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            },
            { 
                title: 'Yet Another Item Title',
                label: '1day ago',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }
        ];
        return days;
      }
    };
    return service;
  });
  

  //////////////////////////////////////////
  // List Year,Month
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