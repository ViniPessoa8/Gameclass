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
		comentario: "comentario",
		anexo: "anexo",
		realizar_avaliacao: "realizar_avaliacao",
		avaliacao_criterio: "avaliacao_criterio",
		mural: "publicacao_mural"
	}
}

export const ROLES = {
	estudante: "ESTUDANTE",
	professor: "PROFESSOR",
	admin: "ADMIN"
}

export const ATRIBUICAO = {
	media_simples: 1,
	media_ponderada: 2
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

export const STATUS_ENTREGA = {
	0: "Sem Resposta",
	1: "Aguardando Correção",
	2: "Corrigido",
}

export const TIPO_ARQUIVO = {
	PDF: "pdf",
	TXT: "txt",
}

export const TIPO_COMENTARIO = {
	entrega: 1
}

export const CORES_PERFIL = [
	"#3D71A3", // Azul
	"#6C943D", // Verde
	"#C75B5B", // Vermelho
	"#6A4CA3", // Roxo
	"#D7854F", // Laranja
	"#2E5D89", // Azul mais escuro
	"#5B7F34", // Verde musgo
	"#AD4D4D", // Bordô
	"#7D63C2", // Lavanda escuro
	"#E09560", // Laranja queimado
	"#789BC0", // Azul acinzentado
	"#A8C66E", // Verde amarelado
	"#DA6E6E", // Coral
	"#937BD9", // Roxo suave
	"#F0A878", // Pêssego
	"#568EC9", // Azul médio
	"#8CAF58", // Verde folha
	"#E07C7C", // Rosa queimado
	"#5B3E89", // Roxo intenso
	"#BF713D"  // Marrom alaranjado
];


