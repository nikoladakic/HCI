/**
 * Created by daka on 3/30/18.
 */

(function (angular) {
    angular.module('HCIApp')
        .controller('homeCtrl', function($scope, $http){
            var vm = this;
            vm.loadStocks = loadStocks;

            $scope.timeSeries = {
                model: 'TIME_SERIES_MONTHLY',
                availableOptions: [
                    {id: 'TIME_SERIES_DAILY', name: 'Daily'},
                    {id: 'TIME_SERIES_WEEKLY', name: 'Weekly'},
                    {id: 'TIME_SERIES_MONTHLY', name: 'Monthly'}
                ]
            };

            $scope.stock_category = {

                current: "physical",
                option1 : "physical",
                option2 : "digital"

            };

            $scope.selected_stock = "MSFT";
            $scope.stock_view = 10;

            function loadStocks() {

                console.log("Symbols loaded");

                var category = "";

                if($scope.stock_category.current == "physical"){
                    category = 'all';
                }

                if($scope.stock_category.current == "digital"){
                    category = 'digital_all';
                }

                var promise = $http.get("/api/stock/" + category);
                promise.then(function (response) {
                    $scope.stocks = response.data;
                });
            };

            loadStocks();


            $scope.loadData = function () {

                $scope.dates = [];
                $scope.opens = [];
                $scope.highs = [];
                $scope.lows = [];

                var promise;
                var physical_time_key = "";
                var digital_time_key = "";

                if($scope.timeSeries.model == "TIME_SERIES_DAILY"){
                    physical_time_key = "Time Series (Daily)";
                    digital_time_key = "Time Series (Digital Currency Daily)";

                };

                if($scope.timeSeries.model == "TIME_SERIES_WEEKLY"){
                    physical_time_key = "Weekly Time Series";
                    digital_time_key = "Time Series (Digital Currency Weekly)";
                };

                if($scope.timeSeries.model == "TIME_SERIES_MONTHLY"){
                    physical_time_key = "Monthly Time Series";
                    digital_time_key = "Time Series (Digital Currency Monthly)";
                };

                if($scope.stock_category.current == "digital"){

                    console.log("Digital");


                    // razlikuju se vremenski parametri ( $scope.timeSeries.availableOptions ) od ficikih deonica, pa ih treba izmeniti

                    var digitalTimeSeries = "";

                    if(physical_time_key == "Time Series (Daily)"){digitalTimeSeries = "DIGITAL_CURRENCY_DAILY";};

                    if(physical_time_key == "Weekly Time Series"){digitalTimeSeries = "DIGITAL_CURRENCY_WEEKLY";};

                    if(physical_time_key == "Monthly Time Series"){digitalTimeSeries = "DIGITAL_CURRENCY_MONTHLY";};

                    promise = $http.get("https://www.alphavantage.co/query?function=" + digitalTimeSeries + "&symbol=" + $scope.selected_stock + "&market=USD&apikey=0P5MHVJ1YM8H62BG");

                    promise.then(function (response) {

                        var count = 0;

                        for (var date in response.data[digital_time_key]) {

                            if (count < 30) {
                                $scope.dates.push(date);

                                for (var info in response.data[digital_time_key][date]) {

                                    if (info == "1a. open (USD)") {
                                        $scope.opens.push(response.data[digital_time_key][date][info]);
                                    };
                                    if (info == "2a. high (USD)") {
                                        $scope.highs.push(response.data[digital_time_key][date][info]);
                                    };
                                    if (info == "3a. low (USD)") {
                                        $scope.lows.push(response.data[digital_time_key][date][info]);
                                    };
                                };
                                count++;
                            };
                        };
                    });

                }else{

                    console.log("Physical");

                    promise = $http.get("https://www.alphavantage.co/query?function=" + $scope.timeSeries.model + "&symbol=" + $scope.selected_stock + "&apikey=0P5MHVJ1YM8H62BG&outputsize=compact");
                    promise.then(function (response) {

                        var count = 0;

                        for (var date in response.data[physical_time_key]) {

                            if (count < 30) {
                                $scope.dates.push(date);

                                for (var info in response.data[physical_time_key][date]) {

                                    if (info == "1. open") {
                                        $scope.opens.push(response.data[physical_time_key][date][info]);
                                    };
                                    if (info == "2. high") {
                                        $scope.highs.push(response.data[physical_time_key][date][info]);
                                    };
                                    if (info == "3. low") {
                                        $scope.lows.push(response.data[physical_time_key][date][info]);
                                    };
                                };
                                count++;
                            };
                        };
                    });
                };

                $scope.podaci = [

                    $scope.opens,
                    $scope.highs,
                    $scope.lows

                ];

                $scope.series = ['Opens', 'Highs', 'Lows'];



                    //donut chart

                    // $scope.labelsDonut = ["Average Opens", "Average Highs", "Average Lows"];
                    //
                    // var sum1 = 0;
                    // for(var i in $scope.opens){
                    // 	sum1 += Number($scope.opens[i]);
                    // }
                    //
                    // var sum2 = 0;
                    // for(var j in $scope.highs){
                    // 	sum2 += Number($scope.highs[j]);
                    // }
                    //
                    // var sum3 = 0;
                    // for(var k in $scope.lows){
                    // 	sum3 += Number($scope.lows[k]);
                    // }
                    //
                    //
                    // var opensAvr = sum1/$scope.opens.length;
                    //
                    // var highsAvr = sum2/$scope.highs.length;
                    // var lowsAvr = sum3/$scope.lows.length;
                    //
                    // $scope.dataDonut = [opensAvr.toFixed(3), highsAvr.toFixed(3), lowsAvr.toFixed(3)];

                    console.log("Data loaded!");

            };



            $scope.loadData();


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

        });
}(angular));