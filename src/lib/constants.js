export const PASSWORD_MAX_CHARACTERS = 16
export const PASSWORD_MIN_CHARACTERS = 8
export const LIMITE_DE_PONTOS_DA_ETAPA = 100
export const LIMITE_NUMERO_DE_ETAPAS = 5

export const COLORS = {
	primaria_1: "#123181",
	primaria_2: "#51ACDF",
	fundo: "#FFFFFF",
	secundaria_1: "#5F45FF",
	secundaria_2: "#DAC039",
	secundaria_3: "#76D280",

	text_1: "#FFFFFF",
};

export const DB_INFO = {
	tables: {
		auth: "usuario",
		instituicao: "instituicao",
		turma: "turma",
		atividade: "atividade",
		item_atividade: "item_atividade",
		tag: "tag",
		criterio: "criterio",
		estudante_turma: "estudante_turma",
		estudante: "estudante",
		usuario: "usuario",
		entrega: "entrega",
		comentario: "comentario"
	}
}

export const ROLES = {
	estudante: "ESTUDANTE",
	professor: "PROFESSOR",
	admin: "ADMIN"
}

export const ATRIBUICAO = {
	media_simples: 0,
	media_ponderada: 1
}

export const REALIZACAO = {
	individual: 0,
	grupos: 1
}

export const STATUS_ITEM_ATIVIDADE_PROFESSOR = {
	0: "Sem data para lançamento",
	1: "Agendado",
	2: "Lançado",
	3: "Aguardando Correção",
	4: "Corrigido",
}

export const TIPO_ARQUIVO = {
	PDF: "pdf",
	TXT: "txt",
}

export const TIPO_COMENTARIO = {
	entrega: 1
}
