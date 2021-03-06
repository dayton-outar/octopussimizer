const sql = require('mssql');
const xml2json = require('xml-js');

const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.MSSQLUSER,
    password: process.env.MSSQLPWD,
    server: process.env.O8DBHOST,
    port: parseInt(process.env.MSSQLPORT, 10),
    database: 'stocks',
    options: {
        enableArithAbort: true
    }
}

const O8Q = {
    updateStocks: async function ( tradings ) {
        let result = {
            success: false,
            message: 'Failed to update stocks',
            data: {}
        };

        try {

            if ( tradings.stocks.length === 0) {
                result.message = 'No data to update database';
                return result;
            }

            let pool = await sql.connect(config);

            let stocks = xml2json.json2xml(tradings, {
                compact: true,
                ignoreComment: true,
                spaces: 4
            });

            let dbr = await pool.request()
                .input('stocks', sql.Xml, stocks)
                .execute('UpdateStockTradings');
            
            console.log(dbr);

            result = {
                success: dbr.returnValue === 0,
                message: `Successfully updated ${tradings.stocks.length} stocks for ${tradings.stocks[0].date}`,
                data: {}
            };

        } catch(ex) {
            console.error( ex.message );
            result.message = ex.message;
        }

        return result;
    }
}

sql.on('error', err => {

    console.log('Database error occurred\n');
    console.error( err );

})

module.exports = O8Q;