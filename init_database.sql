DROP TABLE IF EXISTS Contact;
DROP TABLE IF EXISTS Account;

CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL
);

CREATE TABLE Contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    type ENUM("phone" , "email" , "address") NOT NULL,
    contact VARCHAR(100) NOT NULL,
    primary_contact BOOLEAN NOT NULL,
    FOREIGN KEY (account_id) REFERENCES Account(id) ON DELETE CASCADE
);