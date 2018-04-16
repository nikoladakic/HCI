/**
 * Created by daka on 4/16/18.
 */

(function (angular) {
    angular.module('HCIApp')
        .controller('customViewCtrl', function($scope, $log, AuthenticationService, $http, $state, Alertify, $timeout, $location, $interval){
            var vm = this;


            vm.loadStocks1 = loadStocks1;
            vm.loadStocks2 = loadStocks2;
            vm.loadStocks3 = loadStocks3;
            vm.loadStocks4 = loadStocks4;


            $scope.timeSeries1 = {
                model: 'TIME_SERIES_MONTHLY',
                availableOptions: [
                    {id: 'TIME_SERIES_DAILY', name: 'Daily'},
                    {id: 'TIME_SERIES_WEEKLY', name: 'Weekly'},
                    {id: 'TIME_SERIES_MONTHLY', name: 'Monthly'}
                ]
            };

            $scope.timeSeries2 = {
                model: 'TIME_SERIES_MONTHLY',
                availableOptions: [
                    {id: 'TIME_SERIES_DAILY', name: 'Daily'},
                    {id: 'TIME_SERIES_WEEKLY', name: 'Weekly'},
                    {id: 'TIME_SERIES_MONTHLY', name: 'Monthly'}
                ]
            };

            $scope.timeSeries3 = {
                model: 'TIME_SERIES_MONTHLY',
                availableOptions: [
                    {id: 'TIME_SERIES_DAILY', name: 'Daily'},
                    {id: 'TIME_SERIES_WEEKLY', name: 'Weekly'},
                    {id: 'TIME_SERIES_MONTHLY', name: 'Monthly'}
                ]
            };

            $scope.timeSeries4 = {
                model: 'TIME_SERIES_MONTHLY',
                availableOptions: [
                    {id: 'TIME_SERIES_DAILY', name: 'Daily'},
                    {id: 'TIME_SERIES_WEEKLY', name: 'Weekly'},
                    {id: 'TIME_SERIES_MONTHLY', name: 'Monthly'}
                ]
            };

            $scope.category1 = {
                current: "currency",
                stock : "stock",
                currency : "currency"
            };



            function loadStocks1() {

                var category = "";

                if($scope.category1.current == "stock"){
                    category = 'stock_10';
                    $scope.selected1 = "NVDA";
                }

                if($scope.category1.current == "currency"){
                    category = 'currency';
                    $scope.selected1 = "BTC";
                }

                var promise = $http.get("/api/" + category);
                promise.then(function (response) {
                    $scope.category_options1 = response.data;
                });
            };

            loadStocks1();

            $scope.dates1 = [];
            $scope.opens1 = [];
            $scope.highs1 = [];
            $scope.lows1 = [];
            $scope.close1 = [];
            $scope.volume1 = [];


            $scope.loadData1 = function () {

                    $scope.dates1.length = 0;
                    $scope.opens1.length = 0;
                    $scope.highs1.length = 0;
                    $scope.lows1.length = 0;
                    $scope.close1.length = 0;
                    $scope.volume1.length = 0;

                    var promise;
                    var stock_key = "";
                    var currency_key = "";

                    if ($scope.timeSeries1.model == "TIME_SERIES_DAILY") {
                        stock_key = "Time Series (Daily)";
                        currency_key = "Time Series (Digital Currency Daily)";
                    }
                    ;

                    if ($scope.timeSeries1.model == "TIME_SERIES_WEEKLY") {
                        stock_key = "Weekly Time Series";
                        currency_key = "Time Series (Digital Currency Weekly)";
                    }
                    ;

                    if ($scope.timeSeries1.model == "TIME_SERIES_MONTHLY") {
                        stock_key = "Monthly Time Series";
                        currency_key = "Time Series (Digital Currency Monthly)";
                    }
                    ;

                    if ($scope.category1.current == "currency") {

                        // razlikuju se Stock vremenski parametri ( $scope.timeSeries.availableOptions ) od Currency vremenski parametara, pa ih treba izmeniti

                        var currencyTimeSeries = "";

                        if (stock_key == "Time Series (Daily)") {
                            currencyTimeSeries = "DIGITAL_CURRENCY_DAILY";
                        }
                        ;

                        if (stock_key == "Weekly Time Series") {
                            currencyTimeSeries = "DIGITAL_CURRENCY_WEEKLY";
                        }
                        ;

                        if (stock_key == "Monthly Time Series") {
                            currencyTimeSeries = "DIGITAL_CURRENCY_MONTHLY";
                        }
                        ;


                        promise = $http.get("https://www.alphavantage.co/query?function=" + currencyTimeSeries + "&symbol=" + $scope.selected1 + "&market=USD&apikey=0P5MHVJ1YM8H62BG");

                        promise.then(function (response) {

                            if(response.data["Information"]){
                                Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Thank you.");
                            };

                            if(response.data["Error Message"]){
                                Alertify.error("We don't have information about this currency. Please choose another one. Thank you.");
                            };

                            $scope.dates1.length = 0;
                            $scope.opens1.length = 0;
                            $scope.highs1.length = 0;
                            $scope.lows1.length = 0;
                            $scope.close1.length = 0;
                            $scope.volume1.length = 0;

                            var count = 0;

                            for (var date in response.data[currency_key]) {

                                if (count < 30) {
                                    $scope.dates1.push(date);

                                    for (var info in response.data[currency_key][date]) {

                                        if (info == "1a. open (USD)") {
                                            $scope.opens1.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "2a. high (USD)") {
                                            $scope.highs1.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "3a. low (USD)") {
                                            $scope.lows1.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "4a. close (USD)") {
                                            $scope.close1.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "5a. volume (USD)") {
                                            $scope.volume1.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                        };
                                    };
                                    count++;
                                };
                            };

                        });

                    }

                    else {

                        promise = $http.get("https://www.alphavantage.co/query?function=" + $scope.timeSeries1.model + "&symbol=" + $scope.selected1 + "&apikey=0P5MHVJ1YM8H62BG&outputsize=compact");
                        promise.then(function (response) {


                            if(response.data["Information"]){
                                Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Please wait several seconds before click on stock/currency. Thank you.");
                            };

                            if(response.data["Error Message"]){
                                Alertify.error("We don't have information about this stock. Please choose another one.");
                            };

                            var count = 0;

                            for (var date in response.data[stock_key]) {

                                if (count < 30) {
                                    $scope.dates1.push(date);

                                    for (var info in response.data[stock_key][date]) {

                                        if (info == "1. open") {
                                            $scope.opens1.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "2. high") {
                                            $scope.highs1.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "3. low") {
                                            $scope.lows1.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "4. close") {
                                            $scope.close1.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                        if (info == "5. volume") {
                                            $scope.volume1.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                        }
                                        ;
                                    }
                                    ;
                                    count++;
                                }
                                ;
                            }
                            ;

                        });

                    }
                    ;

                    $scope.podaci1 = [

                        $scope.opens1,
                        $scope.highs1,
                        $scope.lows1,
                        $scope.close1
                    ];

                    $scope.series = ['Opens', 'Highs', 'Lows', 'Close'];


            };

            $scope.loadData1();



            // ===========================

            $scope.category2 = {
                current: "currency",
                stock : "stock",
                currency : "currency"
            };


            function loadStocks2() {

                var category = "";

                if($scope.category2.current == "stock"){
                    category = 'stock_10';
                    $scope.selected2 = "TSLA";
                }

                if($scope.category2.current == "currency"){
                    category = 'currency';
                    $scope.selected2 = "ETH";
                }

                var promise = $http.get("/api/" + category);
                promise.then(function (response) {
                    $scope.category_options2 = response.data;
                });
            };

            loadStocks2();

            $scope.dates2 = [];
            $scope.opens2 = [];
            $scope.highs2 = [];
            $scope.lows2 = [];
            $scope.close2 = [];
            $scope.volume2 = [];


            $scope.loadData2 = function () {


                $scope.dates2.length = 0;
                $scope.opens2.length = 0;
                $scope.highs2.length = 0;
                $scope.lows2.length = 0;
                $scope.close2.length = 0;
                $scope.volume2.length = 0;

                var promise;
                var stock_key = "";
                var currency_key = "";

                if ($scope.timeSeries2.model == "TIME_SERIES_DAILY") {
                    stock_key = "Time Series (Daily)";
                    currency_key = "Time Series (Digital Currency Daily)";
                }
                ;

                if ($scope.timeSeries2.model == "TIME_SERIES_WEEKLY") {
                    stock_key = "Weekly Time Series";
                    currency_key = "Time Series (Digital Currency Weekly)";
                }
                ;

                if ($scope.timeSeries2.model == "TIME_SERIES_MONTHLY") {
                    stock_key = "Monthly Time Series";
                    currency_key = "Time Series (Digital Currency Monthly)";
                }
                ;

                if ($scope.category2.current == "currency") {

                    // razlikuju se Stock vremenski parametri ( $scope.timeSeries.availableOptions ) od Currency vremenski parametara, pa ih treba izmeniti

                    var currencyTimeSeries = "";

                    if (stock_key == "Time Series (Daily)") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_DAILY";
                    }
                    ;

                    if (stock_key == "Weekly Time Series") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_WEEKLY";
                    }
                    ;

                    if (stock_key == "Monthly Time Series") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_MONTHLY";
                    }
                    ;


                    promise = $http.get("https://www.alphavantage.co/query?function=" + currencyTimeSeries + "&symbol=" + $scope.selected2 + "&market=USD&apikey=0P5MHVJ1YM8H62BG");

                    promise.then(function (response) {

                        if(response.data["Information"]){
                            Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Thank you.");
                        };

                        if(response.data["Error Message"]){
                            Alertify.error("We don't have information about this currency. Please choose another one. Thank you.");
                        };

                        $scope.dates2.length = 0;
                        $scope.opens2.length = 0;
                        $scope.highs2.length = 0;
                        $scope.lows2.length = 0;
                        $scope.close2.length = 0;
                        $scope.volume2.length = 0;

                        var count = 0;

                        for (var date in response.data[currency_key]) {

                            if (count < 30) {
                                $scope.dates2.push(date);

                                for (var info in response.data[currency_key][date]) {

                                    if (info == "1a. open (USD)") {
                                        $scope.opens2.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "2a. high (USD)") {
                                        $scope.highs2.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "3a. low (USD)") {
                                        $scope.lows2.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "4a. close (USD)") {
                                        $scope.close2.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "5a. volume (USD)") {
                                        $scope.volume2.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    };
                                };
                                count++;
                            };
                        };

                    });

                }

                else {

                    promise = $http.get("https://www.alphavantage.co/query?function=" + $scope.timeSeries2.model + "&symbol=" + $scope.selected2 + "&apikey=0P5MHVJ1YM8H62BG&outputsize=compact");
                    promise.then(function (response) {


                        if(response.data["Information"]){
                            Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Please wait several seconds before click on stock/currency. Thank you.");
                        };

                        if(response.data["Error Message"]){
                            Alertify.error("We don't have information about this stock. Please choose another one.");
                        };

                        var count = 0;

                        for (var date in response.data[stock_key]) {

                            if (count < 30) {
                                $scope.dates2.push(date);

                                for (var info in response.data[stock_key][date]) {

                                    if (info == "1. open") {
                                        $scope.opens2.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "2. high") {
                                        $scope.highs2.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "3. low") {
                                        $scope.lows2.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "4. close") {
                                        $scope.close2.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "5. volume") {
                                        $scope.volume2.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                }
                                ;
                                count++;
                            }
                            ;
                        }
                        ;

                    });

                }
                ;

                $scope.podaci2 = [

                    $scope.opens2,
                    $scope.highs2,
                    $scope.lows2,
                    $scope.close2
                ];

                $scope.series = ['Opens', 'Highs', 'Lows', 'Close'];


            };

            $interval($scope.loadData2, 1000, 1);


            // =================================


            $scope.category3 = {
                current: "currency",
                stock : "stock",
                currency : "currency"
            };


            function loadStocks3() {

                var category = "";

                if($scope.category3.current == "stock"){
                    category = 'stock_10';
                    $scope.selected3 = "AAPL";
                }

                if($scope.category3.current == "currency"){
                    category = 'currency';
                    $scope.selected3 = "DASH";
                }

                var promise = $http.get("/api/" + category);
                promise.then(function (response) {
                    $scope.category_options3 = response.data;
                });
            };

            loadStocks3();

            $scope.dates3 = [];
            $scope.opens3 = [];
            $scope.highs3 = [];
            $scope.lows3 = [];
            $scope.close3 = [];
            $scope.volume3 = [];


            $scope.loadData3 = function () {


                $scope.dates3.length = 0;
                $scope.opens3.length = 0;
                $scope.highs3.length = 0;
                $scope.lows3.length = 0;
                $scope.close3.length = 0;
                $scope.volume3.length = 0;

                var promise;
                var stock_key = "";
                var currency_key = "";

                if ($scope.timeSeries3.model == "TIME_SERIES_DAILY") {
                    stock_key = "Time Series (Daily)";
                    currency_key = "Time Series (Digital Currency Daily)";
                }
                ;

                if ($scope.timeSeries3.model == "TIME_SERIES_WEEKLY") {
                    stock_key = "Weekly Time Series";
                    currency_key = "Time Series (Digital Currency Weekly)";
                }
                ;

                if ($scope.timeSeries3.model == "TIME_SERIES_MONTHLY") {
                    stock_key = "Monthly Time Series";
                    currency_key = "Time Series (Digital Currency Monthly)";
                }
                ;

                if ($scope.category3.current == "currency") {

                    // razlikuju se Stock vremenski parametri ( $scope.timeSeries.availableOptions ) od Currency vremenski parametara, pa ih treba izmeniti

                    var currencyTimeSeries = "";

                    if (stock_key == "Time Series (Daily)") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_DAILY";
                    }
                    ;

                    if (stock_key == "Weekly Time Series") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_WEEKLY";
                    }
                    ;

                    if (stock_key == "Monthly Time Series") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_MONTHLY";
                    }
                    ;


                    promise = $http.get("https://www.alphavantage.co/query?function=" + currencyTimeSeries + "&symbol=" + $scope.selected3 + "&market=USD&apikey=0P5MHVJ1YM8H62BG");

                    promise.then(function (response) {

                        if(response.data["Information"]){
                            Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Thank you.");
                        };

                        if(response.data["Error Message"]){
                            Alertify.error("We don't have information about this currency. Please choose another one. Thank you.");
                        };

                        $scope.dates3.length = 0;
                        $scope.opens3.length = 0;
                        $scope.highs3.length = 0;
                        $scope.lows3.length = 0;
                        $scope.close3.length = 0;
                        $scope.volume3.length = 0;

                        var count = 0;

                        for (var date in response.data[currency_key]) {

                            if (count < 30) {
                                $scope.dates3.push(date);

                                for (var info in response.data[currency_key][date]) {

                                    if (info == "1a. open (USD)") {
                                        $scope.opens3.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "2a. high (USD)") {
                                        $scope.highs3.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "3a. low (USD)") {
                                        $scope.lows3.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "4a. close (USD)") {
                                        $scope.close3.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "5a. volume (USD)") {
                                        $scope.volume3.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    };
                                };
                                count++;
                            };
                        };

                    });

                }

                else {

                    promise = $http.get("https://www.alphavantage.co/query?function=" + $scope.timeSeries3.model + "&symbol=" + $scope.selected3 + "&apikey=0P5MHVJ1YM8H62BG&outputsize=compact");
                    promise.then(function (response) {


                        if(response.data["Information"]){
                            Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Please wait several seconds before click on stock/currency. Thank you.");
                        };

                        if(response.data["Error Message"]){
                            Alertify.error("We don't have information about this stock. Please choose another one.");
                        };

                        var count = 0;

                        for (var date in response.data[stock_key]) {

                            if (count < 30) {
                                $scope.dates3.push(date);

                                for (var info in response.data[stock_key][date]) {

                                    if (info == "1. open") {
                                        $scope.opens3.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "2. high") {
                                        $scope.highs3.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "3. low") {
                                        $scope.lows3.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "4. close") {
                                        $scope.close3.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "5. volume") {
                                        $scope.volume3.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                }
                                ;
                                count++;
                            }
                            ;
                        }
                        ;

                    });

                }
                ;

                $scope.podaci3 = [

                    $scope.opens3,
                    $scope.highs3,
                    $scope.lows3,
                    $scope.close3
                ];

                $scope.series = ['Opens', 'Highs', 'Lows', 'Close'];


            };

            $interval($scope.loadData3, 2000, 1);


            // ======================================


            $scope.category4 = {
                current: "currency",
                stock : "stock",
                currency : "currency"
            };


            function loadStocks4() {

                var category = "";

                if($scope.category4.current == "stock"){
                    category = 'stock_10';
                    $scope.selected4 = "EBAY";
                }

                if($scope.category4.current == "currency"){
                    category = 'currency';
                    $scope.selected4 = "OMG";
                }

                var promise = $http.get("/api/" + category);
                promise.then(function (response) {
                    $scope.category_options4 = response.data;
                });
            };

            loadStocks4();

            $scope.dates4 = [];
            $scope.opens4 = [];
            $scope.highs4 = [];
            $scope.lows4 = [];
            $scope.close4 = [];
            $scope.volume4 = [];


            $scope.loadData4 = function () {


                $scope.dates4.length = 0;
                $scope.opens4.length = 0;
                $scope.highs4.length = 0;
                $scope.lows4.length = 0;
                $scope.close4.length = 0;
                $scope.volume4.length = 0;

                var promise;
                var stock_key = "";
                var currency_key = "";

                if ($scope.timeSeries4.model == "TIME_SERIES_DAILY") {
                    stock_key = "Time Series (Daily)";
                    currency_key = "Time Series (Digital Currency Daily)";
                }
                ;

                if ($scope.timeSeries4.model == "TIME_SERIES_WEEKLY") {
                    stock_key = "Weekly Time Series";
                    currency_key = "Time Series (Digital Currency Weekly)";
                }
                ;

                if ($scope.timeSeries4.model == "TIME_SERIES_MONTHLY") {
                    stock_key = "Monthly Time Series";
                    currency_key = "Time Series (Digital Currency Monthly)";
                }
                ;

                if ($scope.category4.current == "currency") {

                    // razlikuju se Stock vremenski parametri ( $scope.timeSeries.availableOptions ) od Currency vremenski parametara, pa ih treba izmeniti

                    var currencyTimeSeries = "";

                    if (stock_key == "Time Series (Daily)") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_DAILY";
                    }
                    ;

                    if (stock_key == "Weekly Time Series") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_WEEKLY";
                    }
                    ;

                    if (stock_key == "Monthly Time Series") {
                        currencyTimeSeries = "DIGITAL_CURRENCY_MONTHLY";
                    }
                    ;


                    promise = $http.get("https://www.alphavantage.co/query?function=" + currencyTimeSeries + "&symbol=" + $scope.selected4 + "&market=USD&apikey=0P5MHVJ1YM8H62BG");

                    promise.then(function (response) {

                        if(response.data["Information"]){
                            Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Thank you.");
                        };

                        if(response.data["Error Message"]){
                            Alertify.error("We don't have information about this currency. Please choose another one. Thank you.");
                        };

                        $scope.dates4.length = 0;
                        $scope.opens4.length = 0;
                        $scope.highs4.length = 0;
                        $scope.lows4.length = 0;
                        $scope.close4.length = 0;
                        $scope.volume4.length = 0;

                        var count = 0;

                        for (var date in response.data[currency_key]) {

                            if (count < 30) {
                                $scope.dates4.push(date);

                                for (var info in response.data[currency_key][date]) {

                                    if (info == "1a. open (USD)") {
                                        $scope.opens4.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "2a. high (USD)") {
                                        $scope.highs4.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "3a. low (USD)") {
                                        $scope.lows4.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "4a. close (USD)") {
                                        $scope.close4.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "5a. volume (USD)") {
                                        $scope.volume4.push(Math.round((response.data[currency_key][date][info]) * 1e2) / 1e2);
                                    };
                                };
                                count++;
                            };
                        };

                    });

                }

                else {

                    promise = $http.get("https://www.alphavantage.co/query?function=" + $scope.timeSeries4.model + "&symbol=" + $scope.selected4 + "&apikey=0P5MHVJ1YM8H62BG&outputsize=compact");
                    promise.then(function (response) {


                        if(response.data["Information"]){
                            Alertify.confirm("Please don't click on stock/currency so often. We use free API so we can get only several stock/currencies per minute. Please wait several seconds before click on stock/currency. Thank you.");
                        };

                        if(response.data["Error Message"]){
                            Alertify.error("We don't have information about this stock. Please choose another one.");
                        };

                        var count = 0;

                        for (var date in response.data[stock_key]) {

                            if (count < 30) {
                                $scope.dates4.push(date);

                                for (var info in response.data[stock_key][date]) {

                                    if (info == "1. open") {
                                        $scope.opens4.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "2. high") {
                                        $scope.highs4.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "3. low") {
                                        $scope.lows4.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "4. close") {
                                        $scope.close4.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                    if (info == "5. volume") {
                                        $scope.volume4.push(Math.round((response.data[stock_key][date][info]) * 1e2) / 1e2);
                                    }
                                    ;
                                }
                                ;
                                count++;
                            }
                            ;
                        }
                        ;

                    });

                }
                ;

                $scope.podaci4 = [

                    $scope.opens4,
                    $scope.highs4,
                    $scope.lows4,
                    $scope.close4
                ];

                $scope.series = ['Opens', 'Highs', 'Lows', 'Close'];


            };

            $interval($scope.loadData4, 3000, 1);




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