 DROP DATABASE IF EXISTS bamazon;
 CREATE DATABASE bamazon;
 
 USE bamazon;

 CREATE TABLE products(
 	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(11, 2) NOT NULL,
    stock_quantity INTEGER(4),
     PRIMARY KEY(item_id)
 );

 load data local infile 'smallMart.csv' into TABLE products
 fields terminated by ','
 enclosed by '"'
 lines terminated by '\n'
 (item_id,product_name,department_name,price,stock_quantity);

 SELECT * FROM products;


