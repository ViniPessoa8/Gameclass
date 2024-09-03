-- CREATE DATABASE gameclass;

CREATE TABLE instituicao (
	"id" SERIAL primary key,
	"nome" VARCHAR(255) NOT NULL,
	"endereco" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL
);

CREATE TABLE usuario (
    "id" SERIAL primary key,
	"nome" VARCHAR(100) NOT NULL,
    "login" VARCHAR(100) NOT NULL, -- TODO: Rename login -> nickname 
    "hash" VARCHAR(255) NOT NULL,-- TODO: Rename hash -> senha_hash 
    "salt" VARCHAR(255) NOT NULL,
	"bio" VARCHAR(100) ,
	"email" VARCHAR(100) NOT NULL,
	"acumulo_xp" INT NOT NULL,
	"nivel" INT NOT NULL,
	"matricula_aluno" VARCHAR(12) NOT NULL,-- TODO: Renomear no diagrama
	"dt_nasc" DATE NOT NULL,-- TODO: Rename dt_nasc -> data_nascimento 
	"data_criacao" DATE NOT NULL,
	"ultimo_acesso" TIMESTAMP NOT NULL, 
	"id_instituicao" SERIAL references instituicao(id)
);

CREATE TABLE turma (
    "id" SERIAL,
	"codigo" VARCHAR(12) NOT NULL,
	"disciplina" VARCHAR(100) NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
    "ano" SMALLINT NOT NULL,
    "periodo" SMALLINT NOT NULL,
	"descricao" VARCHAR(255),
	"local" VARCHAR(255),
	"numero_alunos" SMALLINT NOT NULL,
	"id_instituicao" SERIAL references instituicao(id),
	"id_professor" SERIAL references usuario(id),
	PRIMARY KEY ("codigo", "id_instituicao")
);

