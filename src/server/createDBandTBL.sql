-- CREATE DATABASE Decompiler_DB;

USE Decompiler_DB

CREATE TABLE Contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    userID VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    acc VARCHAR(20) UNIQUE,
    pwd TEXT NOT NULL,
    postID TEXT,
    creationDate DATE NOT NULL
);

CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment TEXT,
    postID TEXT NOT NULL,
    creationDate DATE NOT NULL
);