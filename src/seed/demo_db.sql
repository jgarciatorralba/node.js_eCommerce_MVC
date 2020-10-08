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
INSERT INTO IMAGES VALUES(1, 1, "https://ibb.co/zG5M9yZ");
INSERT INTO IMAGES VALUES(2, 1, "https://ibb.co/9YVWc8V");
INSERT INTO IMAGES VALUES(3, 1, "https://ibb.co/V9xwXj3");
INSERT INTO IMAGES VALUES(4, 2, "https://ibb.co/g90Z0hz");
INSERT INTO IMAGES VALUES(5, 2, "https://ibb.co/swYgLf8");
INSERT INTO IMAGES VALUES(6, 2, "https://ibb.co/PGgwvkJ");
INSERT INTO IMAGES VALUES(7, 3, "https://ibb.co/rw8sFr1");
INSERT INTO IMAGES VALUES(8, 3, "https://ibb.co/ssBVgfP");
INSERT INTO IMAGES VALUES(9, 3, "https://ibb.co/f0RW78j");
INSERT INTO IMAGES VALUES(10, 4, "https://ibb.co/yftm4bS");
INSERT INTO IMAGES VALUES(11, 4, "https://ibb.co/3mTsCJc");
INSERT INTO IMAGES VALUES(12, 5, "https://ibb.co/dLNqDYd");
INSERT INTO IMAGES VALUES(13, 5, "https://ibb.co/H7qnxbt");
INSERT INTO IMAGES VALUES(14, 5, "https://ibb.co/rfCfQDv");
INSERT INTO IMAGES VALUES(15, 6, "https://ibb.co/dj3wtd5");
INSERT INTO IMAGES VALUES(16, 6, "https://ibb.co/L9n1Q4k");
INSERT INTO IMAGES VALUES(17, 6, "https://ibb.co/j6n7cGQ");
INSERT INTO IMAGES VALUES(18, 7, "https://ibb.co/GCg2bDm");
INSERT INTO IMAGES VALUES(19, 7, "https://ibb.co/7pFc62z");
INSERT INTO IMAGES VALUES(20, 8, "https://ibb.co/bvZ7JP9");
INSERT INTO IMAGES VALUES(21, 8, "https://ibb.co/WtR2Y0C");