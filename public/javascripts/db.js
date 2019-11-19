var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'vxpgn3sb_kabir',
    password: 'kabir29',
    database: 'vxpgn3sb_hotelBook'
});
connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected..!');
    }
});

module.exports = connection;