-- CREATE DATABASE gameclass;

CREATE TABLE instituicao (
	"id" BIGSERIAL UNIQUE,
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
	"acumulo_pontos" INT NOT NULL,
	"nivel" INT NOT NULL,
	"dt_nasc" DATE NOT NULL,-- TODO: Rename dt_nasc -> data_nascimento 
	"data_criacao" DATE NOT NULL,
	"ultimo_acesso" TIMESTAMP NOT NULL, 
	"cor" varchar(6) NOT NULL, 
	PRIMARY KEY ("id")
);

CREATE TABLE estudante (
	"id" BIGSERIAL UNIQUE,
	"matricula" VARCHAR(30) NOT NULL,
	"data_criacao" TIMESTAMP NOT NULL DEFAULT NOW(),
	"acumulo_pontos" BIGINT NOT NULL DEFAULT 0,
	"nivel" INT NOT NULL DEFAULT 0,
	"id_usuario" BIGINT REFERENCES usuario(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE turma (
    "id" BIGSERIAL UNIQUE,
	"cor" VARCHAR(6) NOT NULL,
	"disciplina" VARCHAR(100) NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
    "ano" SMALLINT NOT NULL,
    "periodo" SMALLINT NOT NULL,
	"descricao" VARCHAR(255),
	"local" VARCHAR(255) NULL,
	"numero_alunos" SMALLINT NOT NULL,
	"data_criacao" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_instituicao" BIGINT REFERENCES instituicao(id),
	"id_professor" BIGINT REFERENCES usuario(id),
	PRIMARY KEY ("nome", "id_instituicao")
);

CREATE TABLE estudante_turma (
    "id" BIGSERIAL UNIQUE,
    "pontos" int NOT NULL DEFAULT 0,
	"id_estudante" BIGINT REFERENCES estudante(id) NOT NULL,
	"id_turma" BIGINT REFERENCES turma(id) NOT NULL,
	PRIMARY KEY ("id_estudante", "id_turma")
);

CREATE TABLE atividade (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"descricao" TEXT,
	"prazo" TIMESTAMP NOT NULL,
	"arquivado" BOOLEAN NOT NULL DEFAULT FALSE,
	"id_turma" BIGINT REFERENCES turma(id) NOT NULL,
	PRIMARY KEY ("titulo", "id_turma")
);

CREATE TABLE item_atividade (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"descricao" VARCHAR(5000) NOT NULL,
	"nota_max" FLOAT NOT NULL,
	"data_entrega_inicial" TIMESTAMP NOT NULL,
	"data_entrega_final" TIMESTAMP NOT NULL,
	"tipo_atribuicao_nota" SMALLINT NOT NULL,
	"tipo_avaliacao_nota" SMALLINT NOT NULL,
	"em_grupos" BOOLEAN NOT NULL, -- TODO: Mudar nome no diagrama MER
	"receber_apos_prazo" BOOLEAN NOT NULL,
	"tipo_formacao_grupo" SMALLINT NULL,
	"arquivado" BOOLEAN NOT NULL DEFAULT FALSE,
	"id_atividade" BIGINT REFERENCES atividade(id) NOT NULL,
	PRIMARY KEY ("titulo", "id_atividade")
);

CREATE TABLE tag (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"cor" varchar(6) NOT NULL,
	"id_professor" BIGINT REFERENCES usuario(id) NOT NULL,
	PRIMARY KEY ("titulo", "id_professor")
);

CREATE TABLE criterio (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"descricao" VARCHAR(255) NOT NULL,
	"pontuacao_max" FLOAT NOT NULL,
	"peso" FLOAT ,
	"copias" INT DEFAULT 0,
	"id_item_atividade" BIGINT REFERENCES item_atividade(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE grupo_de_alunos (
	"id" BIGSERIAL UNIQUE,
	"nome" VARCHAR(100) NOT NULL,
	"data_criacao" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_item_atividade" BIGINT REFERENCES item_atividade(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE entrega (
	"id" BIGSERIAL UNIQUE,
	"data_entrega" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_grupo_de_alunos" BIGINT REFERENCES grupo_de_alunos(id) NULL,
	"id_estudante" BIGINT REFERENCES estudante(id) NULL,
	"id_item_atividade" BIGINT REFERENCES item_atividade(id),
	PRIMARY KEY ("id")
);

CREATE TABLE realizar_avaliacao (
	"id" BIGSERIAL UNIQUE,
	"data_avaliacao" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_entrega" BIGINT REFERENCES entrega(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE avaliacao_criterio (
	"id" BIGSERIAL UNIQUE,
	"nota_atribuida" FLOAT NOT NULL,
	"id_realizar_avaliacao" BIGINT REFERENCES realizar_avaliacao(id) NOT NULL,
	"id_criterio" BIGINT REFERENCES criterio(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE avaliacao_integrante_criterio (
	"id" BIGSERIAL UNIQUE,
	"nota_atribuida" FLOAT NOT NULL,
	"id_realizar_avaliacao" BIGINT REFERENCES realizar_avaliacao(id) NOT NULL,
	"id_estudante" BIGINT REFERENCES estudante(id) NOT NULL,
	"id_criterio" BIGINT REFERENCES criterio(id) NOT NULL,
	PRIMARY KEY ("id"),
    UNIQUE ("id_realizar_avaliacao", "id_estudante", "id_criterio") 
);

CREATE TABLE integrante_grupo_de_alunos (
	"id" BIGSERIAL UNIQUE,
	"id_estudante" BIGINT REFERENCES estudante(id) NOT NULL,
	"id_grupo_de_alunos" BIGINT REFERENCES grupo_de_alunos(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE publicacao_mural (
	"id" BIGSERIAL UNIQUE,
	"conteudo" TEXT NOT NULL,
	"data_publicacao" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_turma" BIGINT REFERENCES turma(id) NOT NULL,
	"id_usuario" BIGINT REFERENCES usuario(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE anexo (
	"id" BIGSERIAL UNIQUE,
	"titulo" VARCHAR(255) NOT NULL,
	"conteudo_texto" TEXT, -- Coluna para armazenar arquivos de texto
	"conteudo_binario" BYTEA, -- Coluna para armazenar arquivos binários
	"data_upload" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_entrega" BIGINT REFERENCES entrega(id),
	"id_publicacao_mural" BIGINT REFERENCES publicacao_mural(id),
	CHECK (
        id_entrega IS NOT NULL 
        OR id_publicacao_mural IS NOT NULL 
    ),
	PRIMARY KEY ("id")
);

CREATE TABLE comentario (
	"id" BIGSERIAL UNIQUE,
	"texto" VARCHAR(255) NOT NULL,
	"data_criacao" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"id_realizar_avaliacao" BIGINT REFERENCES realizar_avaliacao(id),
	"id_item_atividade" BIGINT REFERENCES item_atividade(id) ,
	"id_entrega" BIGINT REFERENCES entrega(id) ,
	"id_publicacao_mural" BIGINT REFERENCES publicacao_mural(id) ,
	"id_usuario" BIGINT REFERENCES usuario(id) NOT NULL,
	CHECK (
        id_realizar_avaliacao IS NOT NULL 
        OR id_item_atividade IS NOT NULL 
        OR id_entrega IS NOT NULL 
        OR id_publicacao_mural IS NOT NULL
    ),
	PRIMARY KEY ("id")
);

CREATE TABLE formacao_grupo (
	"id" BIGSERIAL UNIQUE,
	"numero_grupos" INT NOT NULL DEFAULT 0,
	"numero_alunos" INT NOT NULL DEFAULT 0,
	"data_definicao" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_item_atividade" BIGINT REFERENCES item_atividade(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE pontuacao (
	"id" BIGSERIAL UNIQUE,
	"pontos_turma" BIGINT NOT NULL DEFAULT 0,
	"pontos_experiencia" BIGINT NOT NULL DEFAULT 0,
	"data_recebimento" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_estudante" BIGINT REFERENCES estudante(id) NOT NULL,
	"id_turma" BIGINT REFERENCES turma(id) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE conquista (
	"id" BIGSERIAL UNIQUE,
	"nome" VARCHAR(100) NOT NULL UNIQUE,
	"descricao" TEXT NOT NULL,
	"emblema_url" VARCHAR(255) NOT NULL,
	"pontos_xp" INT NOT NULL DEFAULT 0,
	PRIMARY KEY ("id")
);

CREATE TABLE conquista_estudante (
	"id" BIGSERIAL UNIQUE,
	"data_conquista" TIMESTAMP NOT NULL DEFAULT NOW(),
	"id_estudante" BIGINT REFERENCES estudante(id) NOT NULL,
	"id_conquista" BIGINT REFERENCES conquista(id) NOT NULL,
	"id_turma" BIGINT REFERENCES turma(id),
	CONSTRAINT uq_estudante_conquista_turma UNIQUE (id_estudante, id_conquista, id_turma),
	PRIMARY KEY ("id")
);

CREATE TABLE config (
	"chave" VARCHAR(255) NOT NULL,
	"valor" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("chave")
);

