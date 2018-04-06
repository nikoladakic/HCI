package uns.ac.rs.service;

import com.opencsv.CSVReader;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import org.springframework.stereotype.Service;
import uns.ac.rs.model.Stock;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

/**
 * Created by daka on 4/6/18.
 */

@Service
public class StockService {


    public List<Stock> readStocksFromCSV()throws IOException {

        CSVReader csvReader = new CSVReader(new FileReader("src/main/java/uns/ac/rs/files/company_list.csv"),',','\'', 1);

        ColumnPositionMappingStrategy strat = new ColumnPositionMappingStrategy<>();
        strat.setType(Stock.class);

        String [] columns = new String[] {"Symbol", "Name"};

        strat.setColumnMapping(columns);

        CsvToBean csvToBean = new CsvToBean();

        List<Stock> stocks = csvToBean.parse(strat, csvReader);

        return stocks;

    }



}
