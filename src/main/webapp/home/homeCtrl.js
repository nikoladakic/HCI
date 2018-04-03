/**
 * Created by daka on 3/30/18.
 */

(function (angular) {
    angular.module('HCIApp')
        .controller('homeCtrl', function($scope, $http){
            var vm = this;

            //$scope.items = [0];

            var loadData = function () {
                var promise = $http.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=0P5MHVJ1YM8H62BG&outputsize=compact");
                promise.then(function (response) {

                    $scope.items = response.data["Time Series (Daily)"];

                    $scope.dates = [];
                    $scope.opens = [];
                    $scope.highs = [];
                    $scope.lows = [];

                    $scope.sadrzaj = [];

                    var count = 0;

                    for(var date in response.data["Time Series (Daily)"]){

                        if(count < 50){

                            $scope.dates.push(date);

                            for(var info in response.data["Time Series (Daily)"][date]){

                                if(info == "1. open"){
                                    $scope.opens.push(response.data["Time Series (Daily)"][date][info]);

                                    var podatak = {

                                        x: date,
                                        y: response.data["Time Series (Daily)"][date][info]

                                    };

                                    $scope.sadrzaj.push(podatak);

                                };
                                if(info == "2. high"){
                                    $scope.highs.push(response.data["Time Series (Daily)"][date][info]);
                                };
                                if(info == "3. low"){
                                    $scope.lows.push(response.data["Time Series (Daily)"][date][info]);
                                };
                            };

                        };

                        count++;
                    };
                                     
                    
                    $scope.podaci2 = [
                    	 
                        $scope.opens,
                        $scope.highs,
                        $scope.lows,
                    	
                    ];
                    
                    $scope.series5 = ['Opens', 'Highs', 'Lows'];


                    //donut chart
                    
                    $scope.labelsDonut = ["Average Opens", "Average Highs", "Average Lows"];
                    
                    var sum1 = 0;
                    for(var i in $scope.opens){
                    	sum1 += Number($scope.opens[i]); 
                    }
                    
                    var sum2 = 0;
                    for(var j in $scope.highs){
                    	sum2 += Number($scope.highs[j]); 
                    }
                    
                    var sum3 = 0;
                    for(var k in $scope.lows){
                    	sum3 += Number($scope.lows[k]); 
                    }
                    
                    
                    var opensAvr = sum1/$scope.opens.length;
                    
                    var highsAvr = sum2/$scope.highs.length;
                    var lowsAvr = sum3/$scope.lows.length;
                    
                    $scope.dataDonut = [opensAvr.toFixed(3), highsAvr.toFixed(3), lowsAvr.toFixed(3)];
                    
                });
            };
            
            
            console.log($scope.dates);

            loadData();


            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Series A', 'Series B'];

            $scope.data = [
                [65, 59, 80, 81, 211, 55, 40],
                [28, 48, 40, 19, 86, 27, 210]
            ];

            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };

           

            $scope.labels3 =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

            $scope.data3 = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ];

        });
}(angular));