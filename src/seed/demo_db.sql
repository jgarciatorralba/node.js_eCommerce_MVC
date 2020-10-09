-- Delete database if already existing and create a new one;
DROP SCHEMA IF EXISTS eCommerce;
CREATE SCHEMA eCommerce;
USE eCommerce;

-- Create tables;
CREATE TABLE users(
  id SMALLINT AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255) DEFAULT "https://ibb.co/r2Gbw6d",
CONSTRAINT PK_USER PRIMARY KEY(id),
CONSTRAINT CHECK_ROLE CHECK(role IN('admin', 'employee'))
);

CREATE TABLE customers(
  id SMALLINT AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  zipCode VARCHAR(255),
  country VARCHAR(255),
  phone VARCHAR(255),
CONSTRAINT PK_CUSTOMER PRIMARY KEY(id)
);

CREATE TABLE products(
  id SMALLINT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price REAL NOT NULL,
  stock SMALLINT NOT NULL,
CONSTRAINT PK_PRODUCT PRIMARY KEY(id)
);

CREATE TABLE images(
  id SMALLINT AUTO_INCREMENT,
  product_id SMALLINT NOT NULL,
  path VARCHAR(255) NOT NULL,
CONSTRAINT PK_IMAGE PRIMARY KEY(id),
CONSTRAINT FK_PRODUCT FOREIGN KEY(product_id) REFERENCES PRODUCTS(id) ON DELETE CASCADE
);

-- Insert data;
-- Users;
INSERT INTO USERS VALUES(1, "Jorge García", "123456", "jorgar@mail.com", "admin", "https://ibb.co/r2Gbw6d");
INSERT INTO USERS VALUES(2, "John Doe", "123456", "johndoe@mail.com", "employee", "https://ibb.co/r2Gbw6d");

-- Products;
INSERT INTO PRODUCTS VALUES(1, "4ever Gold", "A ring which is actually 4!", 29.95, 100);
INSERT INTO PRODUCTS VALUES(2, "Midi ring", "Elegant and easy to combine", 14.95, 100);
INSERT INTO PRODUCTS VALUES(3, "Silver wave", "The spirit of the Sea and the beauty of the waves merge on this ring", 29.95, 100);
INSERT INTO PRODUCTS VALUES(4, "World necklace", "For the wanderers and those who love to travel", 29.95, 100);
INSERT INTO PRODUCTS VALUES(5, "Sister necklace", "Two golden rings which once joined their forces to make the sum of all", 29.95, 100);
INSERT INTO PRODUCTS VALUES(6, "Pearl necklace", "This necklace gives a special touch as every pearl is unique", 39.95, 100);
INSERT INTO PRODUCTS VALUES(7, "Bungavilla earrings", "Fill your ears with airs of spring and flowers", 39.95, 100);
INSERT INTO PRODUCTS VALUES(8, "Obbo earrings", "Organic lines play with symmetry creating the perfect shape to decorate your ears", 35.95, 100);

-- Images;
INSERT INTO IMAGES VALUES(1, 1, "https://i.ibb.co/ChtcCkQ/prod-1-1.jpg");
INSERT INTO IMAGES VALUES(2, 1, "https://i.ibb.co/MNG7Z2G/prod-1-2.jpg");
INSERT INTO IMAGES VALUES(3, 1, "https://i.ibb.co/LRrN4kv/prod-1-3.jpg");
INSERT INTO IMAGES VALUES(4, 2, "https://i.ibb.co/KhtxtSF/prod-2-1.jpg");
INSERT INTO IMAGES VALUES(5, 2, "https://i.ibb.co/0MbnP7H/prod-2-2.jpg");
INSERT INTO IMAGES VALUES(6, 2, "https://i.ibb.co/HTqnfZR/prod-2-3.jpg");
INSERT INTO IMAGES VALUES(7, 3, "https://i.ibb.co/4VvdKr5/prod-3-1.jpg");
INSERT INTO IMAGES VALUES(8, 3, "https://i.ibb.co/XFwCWQ4/prod-3-2.jpg");
INSERT INTO IMAGES VALUES(9, 3, "https://i.ibb.co/883wVz1/prod-3-3.jpg");
INSERT INTO IMAGES VALUES(10, 4, "https://i.ibb.co/YRm40qZ/prod-4-1.jpg");
INSERT INTO IMAGES VALUES(11, 4, "https://i.ibb.co/QvJcK5M/prod-4-2.jpg");
INSERT INTO IMAGES VALUES(12, 5, "https://i.ibb.co/D8ByQ2x/prod-5-1.jpg");
INSERT INTO IMAGES VALUES(13, 5, "https://i.ibb.co/JnH5yGv/prod-5-2.jpg");
INSERT INTO IMAGES VALUES(14, 5, "https://i.ibb.co/BKXKf0w/prod-5-3.jpg");
INSERT INTO IMAGES VALUES(15, 6, "https://i.ibb.co/MZjxfYC/prod-6-1.jpg");
INSERT INTO IMAGES VALUES(16, 6, "https://i.ibb.co/j3gDV76/prod-6-2.jpg");
INSERT INTO IMAGES VALUES(17, 6, "https://i.ibb.co/WxmSbFM/prod-6-3.jpg");
INSERT INTO IMAGES VALUES(18, 7, "https://i.ibb.co/VMXSPG6/prod-7-1.jpg");
INSERT INTO IMAGES VALUES(19, 7, "https://i.ibb.co/pKpD9JP/prod-7-2.jpg");
INSERT INTO IMAGES VALUES(20, 8, "https://i.ibb.co/jw2HRTX/prod-8-1.jpg");
INSERT INTO IMAGES VALUES(21, 8, "https://i.ibb.co/164mwMc/prod-8-2.jpg");