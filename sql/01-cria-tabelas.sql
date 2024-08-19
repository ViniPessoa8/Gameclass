-- CREATE DATABASE gameclass;

CREATE TABLE instituicao (
	"id" SERIAL primary key,
	"nome" VARCHAR(255) NOT NULL
);

CREATE TABLE usuario (
    "id" SERIAL primary key,
	"nome" VARCHAR(100) NOT NULL,
    "login" VARCHAR(100) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL,
	"dt_nasc" DATE NOT NULL,
	"id_instituicao" SERIAL references instituicao(id)
);


