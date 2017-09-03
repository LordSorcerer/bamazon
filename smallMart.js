var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "c0wb3ar",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) console.log(error);
    console.log('connected as id ' + connection.threadId);
    var customerRequest = new bamazonCustomer();
    customerRequest.runCommandLine();
});

//USE ? to add the user's input to the query.  Why?  It stops malicious code from being injected!

function bamazonCustomer() {
    var base = this;

    this.runCommandLine = function() {
        inquirer.prompt([{
                name: "item_id",
                message: "Enter product id#: "
            },
            {
                name: "requested_quantity",
                message: "Enter quantity to purchase: "
            },
        ]).then(function(input) {
            base.runPurchase(input.item_id, input.requested_quantity);
        });
    };

    this.runPurchase = function(item_id, requested_quantity) {
        //USE ? to add the user's input to the query.  Why?  It stops the user from gaining control over the query and injecting malicious code!
        connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: item_id }, function(error, result) {
            if (error) console.log(error);
            var newQuantity = result[0].stock_quantity - requested_quantity;
            newQuantity >= 0 ? base.processRequest(item_id, newQuantity) : base.denyRequest();
        });
    };

    this.processRequest = function(item_id, newQuantity) {
        connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { item_id: item_id }], function(error, result) {
            if (error) console.log(error);
            console.log(result);
        });
        base.endConnection();
    }

    this.denyRequest = function(newQuantity) {
        console.log("Insufficient stock to honor request.");
        base.endConnection();
    }



    this.endConnection = function() {
        connection.end(function(err) {
            // The connection is terminated now 
        });
    }
};



/*function runQuery() {
    connection.query("SELECT top5000.artist, topAlbums.artist FROM top5000 INNER JOIN topAlbums ON top5000.id=topAlbums.id", function(error, result) {
        if (error) console.log(error);
        result.forEach(function(key, index) {
            console.log(key);
        });
});*/