package uns.ac.rs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uns.ac.rs.model.Stock;
import uns.ac.rs.service.StockService;

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

    @GetMapping(value = "/currency")
    public List<Stock> getDigitalAll() throws Exception{

        return stockService.readCurrencyFromCSV();

    }


}
