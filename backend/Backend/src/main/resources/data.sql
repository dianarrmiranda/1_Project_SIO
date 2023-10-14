INSERT INTO category (ID, NAME, DESCRIPTION) VALUES ('1', 'Portateis', 'Computadores portáveis para chess.com');
INSERT INTO category (ID, NAME, DESCRIPTION) VALUES ('2', 'Canecas', 'Canecas Comemoratívas DETI lifestyle');
INSERT INTO category (ID, NAME, DESCRIPTION) VALUES ('3', 'T-Shirts', 'T-Shirts feitas de tecido 17% natural estampadas com caras de professores');

INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('1', 'Portatil Mastro', 'Portatil Mega gaming extreme grande', 'src/assets/prod_images/1.webp', '7', '0', 'Portugal', '542.46', '1', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('2', 'Gaming Laptop Pro', 'Gaming powerhouse for ultimate performance', 'src/assets/prod_images/2.webp', '12', '1', 'USA', '1299.99', '1', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('3', 'Office Laptop Elite', 'Efficiency and style for your workspace', 'src/assets/prod_images/3.png', '23', '0', 'Canada', '899.95', '1', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('4', 'Designer Mug Set','Luxurious designer mugs for coffee lovers','src/assets/prod_images/4.webp', '15', '0','Italy', '49.99', '2', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('5', 'High-End PC Setup', 'Complete PC setup for gamers and professionals', 'src/assets/prod_images/5.webp', '8', '0', 'Germany', '2499.99', '1', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('6', 'Travel Mug Duo', 'Set of two stylish travel mugs for on-the-go', 'src/assets/prod_images/6.webp', '30', '1', 'France', '19.99', '2', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('7', 'Compact Laptop Pro', 'Powerful laptop for professionals on the move', 'src/assets/prod_images/7.webp', '10', '0', 'UK', '1199.95', '1', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('8', 'Artistic Mug Collection', 'Unique artistic mugs for your morning coffee', 'src/assets/prod_images/8.webp', '20', '1', 'Spain', '34.99', '2', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('9', 'Gaming Desktop Beast', 'Ultimate gaming desktop for hardcore gamers', 'src/assets/prod_images/9.png', '5', '0', 'USA', '2999.99', '1', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('10', 'Ceramic Mug Set', 'Durable ceramic mugs for tea and hot beverages', 'src/assets/prod_images/10.webp', '18', '0', 'China', '29.99', '2', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE, AVERAGE_STARS) VALUES ('11', 'Graphic Tee', 'Stylish graphic print t-shirt', 'src/assets/prod_images/11.jpg', '15', '1', 'USA', '29.99', '3', '11-10-2023', '4.0');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('12', 'Classic Logo Shirt', 'Iconic brand logo on a comfortable tee', 'src/assets/prod_images/12.jpg', '20', '0', 'Canada', '24.95', '3', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('13', 'V-Neck Fashion Tee', 'Trendy v-neck t-shirt for fashion-conscious', 'src/assets/prod_images/13.png', '10', '0', 'UK', '19.99', '3', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('14', 'Striped Polo Shirt', 'Casual striped polo shirt for any occasion', 'src/assets/prod_images/14.png', '25', '0', 'France', '34.99', '3', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('15', 'Sports Jersey', 'Authentic sports jersey for sports enthusiasts', 'src/assets/prod_images/15.png', '5', '1', 'Germany', '49.99', '3', '11-10-2023');
INSERT INTO product (ID, NAME, DESCRIPTION, IMG_SOURCE, IN_STOCK, IS_HOT_DEAL, ORIGIN, PRICE, CATEGORYID, DATE) VALUES ('16', 'Tux Plush Toy', 'Adorable penguin plush toy for programmers', 'src/assets/prod_images/16.jpg', '30', '1', 'Antarctica', '15.99', '3', '11-10-2023');

INSERT INTO APP_USER (ID, NAME, EMAIL, PASSWORD, IMAGE, ROLE, CREDIT_CARD) VALUES ('0', 'Admin', 'admin@deti_store.com', 'adminPass', 'src/assets/prod_images/2.jpg', 'admin', '000000000');
INSERT INTO APP_USER (ID, NAME, EMAIL, PASSWORD, IMAGE, ROLE, CREDIT_CARD) VALUES ('1', 'Josefino Calças', 'jose@fino.com', '123', 'src/assets/prod_images/11.jpg', 'user', '123123123123');
INSERT INTO APP_USER (ID, NAME, EMAIL, PASSWORD, IMAGE, ROLE, CREDIT_CARD) VALUES ('2', 'Alice Johnson', 'alice@example.com', 'password123', 'src/assets/prod_images/2.jpg', 'user', '456456456456');
INSERT INTO APP_USER (ID, NAME, EMAIL, PASSWORD, IMAGE, ROLE, CREDIT_CARD) VALUES ('3', 'John Smith', 'john@example.com', 'securepassword', 'src/assets/prod_images/3.jpg', 'user', '789789789789');
INSERT INTO APP_USER (ID, NAME, EMAIL, PASSWORD, IMAGE, ROLE, CREDIT_CARD) VALUES ('4', 'Emily Davis', 'emily@example.com', 'mysecretpass', 'src/assets/prod_images/4.jpg', 'user', '9876543210');
INSERT INTO APP_USER (ID, NAME, EMAIL, PASSWORD, IMAGE, ROLE, CREDIT_CARD) VALUES ('5', 'David Wilson', 'david@example.com', 'strongpassword', 'src/assets/prod_images/5.jpg', 'user', '1029384756');