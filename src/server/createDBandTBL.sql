CREATE DATABASE Decompiler_DB;

USE Decompiler_DB;

CREATE TABLE Contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    creator VARCHAR(255) NOT NULL,
    creationDate DATE NOT NULL,
);

CREATE TABLE Users (
    acc TEXT UNIQUE,
    pwd TEXT NOT NULL,
    postID TEXT,
    creationDate DATE NOT NULL
);