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

            $scope.category = {
                current: "stock",
                stock : "stock",
                currency : "currency"
            };

            $scope.selected = "MSFT";
            $scope.view = 10;

            function loadStocks() {

                console.log("Symbols loaded");

                var category = "";

                if($scope.category.current == "stock"){
                    category = 'stock';
                }

                if($scope.category.current == "currency"){
                    category = 'currency';
                }

                var promise = $http.get("/api/" + category);
                promise.then(function (response) {
                    $scope.category_options = response.data;
                });
            };

            loadStocks();

            $scope.loadData = function () {

                $scope.dates = [];
                $scope.opens = [];
                $scope.highs = [];
                $scope.lows = [];
                $scope.close = [];
                $scope.volume = [];

                var promise;
                var stock_key = "";
                var currency_key = "";

                if($scope.timeSeries.model == "TIME_SERIES_DAILY"){
                    stock_key = "Time Series (Daily)";
                    currency_key = "Time Series (Digital Currency Daily)";
                };

                if($scope.timeSeries.model == "TIME_SERIES_WEEKLY"){
                    stock_key = "Weekly Time Series";
                    currency_key = "Time Series (Digital Currency Weekly)";
                };

                if($scope.timeSeries.model == "TIME_SERIES_MONTHLY"){
                    stock_key = "Monthly Time Series";
                    currency_key = "Time Series (Digital Currency Monthly)";
                };

                if($scope.category.current == "currency"){

                    console.log("Currency");

                    // razlikuju se Stock vremenski parametri ( $scope.timeSeries.availableOptions ) od Currency vremenski parametara, pa ih treba izmeniti

                    var currencyTimeSeries = "";

                    if(stock_key == "Time Series (Daily)"){currencyTimeSeries = "DIGITAL_CURRENCY_DAILY";};

                    if(stock_key == "Weekly Time Series"){currencyTimeSeries = "DIGITAL_CURRENCY_WEEKLY";};

                    if(stock_key == "Monthly Time Series"){currencyTimeSeries = "DIGITAL_CURRENCY_MONTHLY";};

                    promise = $http.get("https://www.alphavantage.co/query?function=" + currencyTimeSeries + "&symbol=" + $scope.selected + "&market=USD&apikey=0P5MHVJ1YM8H62BG");

                    promise.then(function (response) {

                        var count = 0;

                        for (var date in response.data[currency_key]) {

                            if (count < 30) {
                                $scope.dates.push(date);

                                for (var info in response.data[currency_key][date]) {

                                    if (info == "1a. open (USD)") {
                                        $scope.opens.push(Math.round( (response.data[currency_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "2a. high (USD)") {
                                        $scope.highs.push(Math.round( (response.data[currency_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "3a. low (USD)") {
                                        $scope.lows.push(Math.round( (response.data[currency_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "4a. close (USD)") {
                                        $scope.close.push(Math.round( (response.data[currency_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "5a. volume (USD)") {
                                        $scope.volume.push(Math.round( (response.data[currency_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                };
                                count++;
                            };
                        };
                    });

                }

                else{

                    console.log("Stocks");

                    promise = $http.get("https://www.alphavantage.co/query?function=" + $scope.timeSeries.model + "&symbol=" + $scope.selected + "&apikey=0P5MHVJ1YM8H62BG&outputsize=compact");
                    promise.then(function (response) {

                        var count = 0;

                        for (var date in response.data[stock_key]) {

                            if (count < 30) {
                                $scope.dates.push(date);

                                for (var info in response.data[stock_key][date]) {

                                    if (info == "1. open") {
                                        $scope.opens.push(Math.round((response.data[stock_key][date][info]) * 1e2 ) / 1e2);
                                        //console.log( Math.round( (response.data[stock_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "2. high") {
                                        $scope.highs.push(Math.round((response.data[stock_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "3. low") {
                                        $scope.lows.push(Math.round((response.data[stock_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "4. close") {
                                        $scope.close.push(Math.round((response.data[stock_key][date][info]) * 1e2 ) / 1e2);
                                    };
                                    if (info == "5. volume") {
                                        $scope.volume.push(Math.round((response.data[stock_key][date][info]) * 1e2 ) / 1e2);
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
                    $scope.lows,
                    $scope.close,
                ];

                $scope.series = ['Opens', 'Highs', 'Lows', 'Close'];





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



            // ============== COIN MARKET CAP =================

            function loadAllCurrencies() {

                var promise = $http.get("https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10");
                promise.then(function (response) {

                    $scope.allCurrencies = response.data;

                    $scope.currencySymbols = [];
                    $scope.volume24USD = [];

                    for(var currency in $scope.allCurrencies){

                        $scope.currencySymbols.push($scope.allCurrencies[currency]["symbol"]);
                        $scope.volume24USD.push($scope.allCurrencies[currency]["24h_volume_usd"]);

                    }
                });
            }

            loadAllCurrencies();

        });
}(angular));