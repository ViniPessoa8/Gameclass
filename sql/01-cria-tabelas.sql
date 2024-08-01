-- CREATE DATABASE gameclass;

CREATE TABLE usuario (
    "id" SERIAL,
		"nome" VARCHAR(100) NOT NULL,
    "login" VARCHAR(100) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL
);

CREATE TABLE instituicao (
	"id" SERIAL,
	"nome" VARCHAR(255) NOT NULL,
);

INSERT INTO instituicao("nome") VALUES('UEA');
INSERT INTO instituicao("nome") VALUES('UFAM');
INSERT INTO instituicao("nome") VALUES('IFAM');
INSERT INTO instituicao("nome") VALUES('MIT');
