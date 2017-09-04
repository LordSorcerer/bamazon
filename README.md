# bamazon store: smallMart

The bamazon manager program runs in node.js and utilizes the inquirer and mysql node packages.  When the program loads, the user has a choice of five options:

View Products for Sale - Lists all the items currently entered into the products table of the bamazon database.
View Low Inventory - Lists all items (if any) with a stock_quantity less than 5.
Add to Inventory - Allows the user to replenish inventory.  Requests an item_id and a quantity to add to the existing stock.
Add new Product - Allows the user to add a previously unlisted product to the database.  Requests an item_id, product_name, department_name, price and stock_quantity.
Exit - Terminate the program and close the mySQL connection.  Until this option is chosen, the main inquirer loop will continue, allowing the user to enter multiple commands.




Five screenshots were taken to demonstrate the flow of the program:

sshot1.png: Shows the initial state of the database once smallMart.sql is run in the mysql command line environment.

sshot2.png: Two of the manager program's functions are displayed here - View Products for Sale, which simply shows the contents of the bamazon database's 'products' table, and View Low Inventory, which lists only entries with a stock_quantity less than 5.

sshot3.png: Continues the flow by utilizing the manager program's Add to Inventory function.  This lets the manager choose an inventory item_id and add a chosen amount to the stock_quantity.  The function then runs the View Products for Sale option once more to show that the item has indeed been added to the database.

sshot4.png: The last command line screenshot displays a completely new item being added to the database: the Lazy Dude Recliner, item # 905.

sshot5.png: Finally, we see the results of the first four steps accurately recorded in the database in MySQL Workbench.
