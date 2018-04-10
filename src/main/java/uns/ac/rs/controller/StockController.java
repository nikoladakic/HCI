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
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping(value = "/all")
    public List<Stock> getAll() throws Exception{

        return stockService.readStocksFromCSV();

    }

    @GetMapping(value = "/digital_all")
    public List<Stock> getDigitalAll() throws Exception{

        return stockService.readDigitalStocksFromCSV();

    }


}
