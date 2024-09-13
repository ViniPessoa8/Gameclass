-- CREATE DATABASE gameclass;

CREATE TABLE instituicao (
	"id" SERIAL UNIQUE,
	"nome" VARCHAR(255) NOT NULL,
	"endereco" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE usuario (
    "id" BIGSERIAL UNIQUE,
	"nome" VARCHAR(100) NOT NULL,
    "login" VARCHAR(100) NOT NULL, -- TODO: Rename login -> nickname 
    "hash" VARCHAR(255) NOT NULL,-- TODO: Rename hash -> senha_hash 
    "salt" VARCHAR(255) NOT NULL,
	"bio" VARCHAR(100),
	"email" VARCHAR(100) NOT NULL,
	"acumulo_xp" INT NOT NULL,
	"nivel" INT NOT NULL,
	"matricula_aluno" VARCHAR(12) NOT NULL,-- TODO: Renomear no diagrama
	"dt_nasc" DATE NOT NULL,-- TODO: Rename dt_nasc -> data_nascimento 
	"data_criacao" DATE NOT NULL,
	"ultimo_acesso" TIMESTAMP NOT NULL, 
	"id_instituicao" BIGINT REFERENCES instituicao(id),
	PRIMARY KEY ("id")
);

CREATE TABLE turma (
    "id" BIGSERIAL UNIQUE,
	"codigo" VARCHAR(12) NOT NULL,
	"cor" VARCHAR(6) NOT NULL,
	"disciplina" VARCHAR(100) NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
    "ano" SMALLINT NOT NULL,
    "periodo" SMALLINT NOT NULL,
	"descricao" VARCHAR(255),
	"local" VARCHAR(255),
	"numero_alunos" SMALLINT NOT NULL,
	"id_instituicao" SERIAL REFERENCES instituicao(id),
	"id_professor" SERIAL REFERENCES usuario(id),
	PRIMARY KEY ("codigo", "id_instituicao")
);

CREATE TABLE atividade (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"descricao" TEXT,
	"prazo" TIMESTAMP NOT NULL,
	"id_turma" SERIAL REFERENCES turma(id) NOT NULL,
	PRIMARY KEY ("titulo", "id_turma")
);

CREATE TABLE item_atividade (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"nota_max" FLOAT NOT NULL,
	"data_entrega_inicial" TIMESTAMP NOT NULL,
	"data_entrega_final" TIMESTAMP NOT NULL,
	"tipo_atribuicao_nota" SMALLINT NOT NULL,
	"tipo_realizacao" SMALLINT NOT NULL,
	"receber_apos_prazo" BOOLEAN NOT NULL,
	"n_integrantes_grupo" SMALLINT NOT NULL,
	"n_max_grupos" SMALLINT NOT NULL,
	"id_atividade" SERIAL REFERENCES turma(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE tag (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"cor" varchar(6) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE Criterio (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"pontuacao_max" FLOAT NOT NULL,
	"peso" FLOAT NOT NULL,
	"id_atividade" SERIAL REFERENCES atividade(id) NOT NULL,
	PRIMARY KEY ("id")
)
