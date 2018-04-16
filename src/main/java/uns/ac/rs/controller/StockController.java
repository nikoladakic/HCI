package uns.ac.rs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uns.ac.rs.model.Stock;
import uns.ac.rs.service.StockService;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by daka on 4/6/18.
 */

@RestController
@RequestMapping("/api")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping(value = "/stock")
    public List<Stock> getAll() throws Exception{

        return stockService.readStocksFromCSV();

    }

    @GetMapping(value = "/stock_10")
    public List<Stock> get_100() throws Exception{

        List<Stock> all_stocks = stockService.readStocksFromCSV();
        List<Stock> first_10 = new ArrayList<>();

        int count = 0;

        for(Stock stock: all_stocks){
            if(count < 10){
                first_10.add(stock);
                count++;
            }
        }

        return first_10;

    }

    @GetMapping(value = "/currency")
    public List<Stock> getDigitalAll() throws Exception{

        return stockService.readCurrencyFromCSV();

    }


}
