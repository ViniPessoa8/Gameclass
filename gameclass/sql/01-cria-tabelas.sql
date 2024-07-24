-- CREATE DATABASE gameclass;


CREATE TABLE usuario (
    "id" SERIAL,
		"name" VARCHAR(100) NOT NULL,
    "login" VARCHAR(100) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL
);
