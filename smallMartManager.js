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
    var managerRequest = new bamazonManager();
    managerRequest.runCommandLine();
});

//USE ? to add the user's input to the query.  Why?  It stops malicious code from being injected!

function bamazonManager() {
    var base = this;
    this.exit = false;

    this.runCommandLine = function() {
        inquirer.prompt([{
            type: "list",
            choices: ["View Products for Sale", new inquirer.Separator(), "View Low Inventory", new inquirer.Separator(), "Add to Inventory", new inquirer.Separator(), "Add New Product", new inquirer.Separator(), "Exit", new inquirer.Separator()],
            name: "action",
            message: "Choose action: "
        }, ]).then(function(input) {
            switch (input.action) {
                case "View Products for Sale":
                    base.queryViewProducts();
                    break;
                case "View Low Inventory":
                    base.queryLowInventory();
                    break;
                case "Add to Inventory":
                    base.queryAddInventory();
                    break;
                case "Add New Product":
                    base.queryAddNewItem();
                    break;
                case "Exit":
                default:
                    base.endConnection();
            };
        });

    };

    this.queryViewProducts = function() {
        connection.query("SELECT * FROM products", function(error, result) {
            base.displayQueryResult(error, result);
        });
    };


    this.queryLowInventory = function() {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(error, result) {
            base.displayQueryResult(error, result);
        });
    };


    this.queryAddInventory = function() {
        inquirer.prompt([{
                name: "item_id",
                message: "Enter item ID: "
            },
            {
                name: "quantityAdded",
                message: "Enter quantity to add: "
            },
        ]).then(function(input) {
            connection.query("UPDATE products SET stock_quantity = stock_quantity + " + input.quantityAdded + " WHERE ?", [{ item_id: input.item_id }], function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                	base.queryViewProducts();
                };
            });
        });
    };

    this.queryAddNewItem = function() {
        var valueList = "";
        inquirer.prompt([{
                name: "item_id",
                message: "Enter new item ID: "
            },
            {
                name: "product_name",
                message: "Enter product_name: "
            },
            {
                name: "department_name",
                message: "Enter department: "
            },
            {
                name: "price",
                message: "Enter price: "
            },
            {
                name: "stock_quantity",
                message: "Enter units in stock: "
            },
        ]).then(function(input) {
            valueList = input.item_id + ", '" + input.product_name + "', '" + input.department_name + "', " + input.price + ", " + input.stock_quantity;
            connection.query("INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES(" + valueList + ")", function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("\n\nNew product added...");
                    base.queryViewProducts();
                };
            });

        });
    };

    this.denyRequest = function() {
        console.log("Insufficient stock to honor request.");
    };


    this.displayQueryResult = function(error, result) {
        if (error) {
            console.log(error);
        } else {			 
            console.log("\n\nItem ID# / Product / Department / Price / Stock\n-----------------------------------------------");
            result.forEach(function(key) {
                console.log(key.item_id + " / " + key.product_name + " / " + key.department_name + " / " + key.price + " / " + key.stock_quantity);
            })
            console.log("\n");
        };
        base.runCommandLine();
    };

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