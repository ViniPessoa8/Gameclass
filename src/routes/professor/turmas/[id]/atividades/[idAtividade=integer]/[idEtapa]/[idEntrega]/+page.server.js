import AtividadeController from "$lib/server/controllers/atividade";
import ItemAtividadeController from "$lib/server/controllers/itemAtividade";
import EntregaController from "$lib/server/controllers/entrega";
import AvaliacaoController from '$lib/server/controllers/avaliacao';
import GrupoController from '$lib/server/controllers/grupo';
import ComentarioController from '$lib/server/controllers/comentario';
import AnexoController from '$lib/server/controllers/anexo';
import EstudanteController from '$lib/server/controllers/estudante';
import UsuarioController from '$lib/server/controllers/usuario';
import CriterioController from '$lib/server/controllers/criterio';
import { AVALIACAO, STATUS_ENTREGA, ATRIBUICAO } from "$lib/constants";

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const entregaController = new EntregaController()
const avaliacaoController = new AvaliacaoController()
const grupoController = new GrupoController()
const comentarioController = new ComentarioController()
const anexoController = new AnexoController()
const estudanteController = new EstudanteController()
const usuarioController = new UsuarioController()
const criterioController = new CriterioController()

export async function load({ cookies, params }) {
	const session_raw = cookies.get("session");
	const data = JSON.parse(session_raw);
	data["perfil"] = cookies.get("perfil")

	const idEntrega = params.idEntrega
	const idEtapa = params.idEtapa

	const usuario = await usuarioController.buscaPorLogin(data.login)
	const etapa = (await itemAtividadeController.buscaPorId(idEtapa)).toObject()
	const atividade = (await atividadeController.buscaPorId(etapa.id_atividade)).toObject()
	const entrega = (await entregaController.buscaPorId(idEntrega)).toObject()
	const comentarios_entrega = await comentarioController.listaPorIdEntrega(parseInt(entrega.id))
	const anexos = (await anexoController.listaPorIdEntrega(idEntrega)).map((e) => e.toObject())
	const criterios = (await criterioController.listaPorIdItemAtividade(idEtapa))

	let estudante, grupo, entregaAvaliada = false;

	if (etapa.em_grupos) {
		grupo = await grupoController.buscaPorId(parseInt(entrega.id_grupo_de_alunos))
		grupo.integrantes = await estudanteController.buscaPorIdGrupo(parseInt(entrega.id_grupo_de_alunos))
		etapa.grupo = grupo

		// Etapa em grupos - Avaliação Individual
		if (etapa.tipo_avaliacao_nota == AVALIACAO.individual) {
			const avaliacoesIntegrantes = await avaliacaoController.buscaAvaliacaoIntegrantes(entrega.id)
			const nAvaliacoes = avaliacoesIntegrantes.map((value) => value.id_estudante).filter((value, index, _arr) => _arr.indexOf(value) == index).length; // Mapeia os valores por id_estudante único, para contar quantos estudantes foram avaliados.

			if (nAvaliacoes == etapa.grupo.integrantes.length) {
				entregaAvaliada = true
			} else {
				entregaAvaliada = false
			}

			// Etapa em grupos - Avaliação em grupos
		} else {
			const avaliacao = await avaliacaoController.buscaPorIdEntrega(entrega.id)
			if (avaliacao) {
				entregaAvaliada = true
			}

		}

		// Etapa Individual
	} else {
		estudante = await estudanteController.buscaPorId(parseInt(entrega.id_estudante))
		const avaliacao = await avaliacaoController.buscaPorIdEntrega(entrega.id)
		if (avaliacao) {
			entregaAvaliada = true
		}
	}

	let notaMaximaItemAtividade = 0;
	if (etapa.tipo_atribuicao_nota == ATRIBUICAO.media_simples) {
		let soma = 0;

		criterios.forEach((c) => {
			soma += c.pontuacao_max;
		});

		notaMaximaItemAtividade = soma;
	} else {
		let somaPesos = 0;
		let somaPonderada = 0;

		criterios.forEach((c) => {
			somaPesos += c.peso;
			somaPonderada += c.pontuacao_max * c.peso;
		});

		notaMaximaItemAtividade = somaPonderada / somaPesos;
	}

	const notas = await entregaController.listaNotasObtidasDeCriterios(idEntrega)

	entrega.criterios = criterios
	entrega.notas = notas
	entrega["comentarios"] = comentarios_entrega
	entrega["anexos"] = anexos
	entrega["avaliada"] = entregaAvaliada ? true : false
	calculaStatus(entrega)
	usuario["cor"] = usuario.cor

	let toast = ''
	const message = cookies.get("toast");

	if (message !== '') {
		cookies.set("toast", "", { path: '/' });
		toast = message
	}

	let returnData = {
		"usuario": data,
		"entrega": entrega,
		"atividade": atividade,
		"etapa": etapa,
		"nome": etapa.em_grupos ? grupo.nome : estudante.nome,
		"toast": toast,
		"nota_max": notaMaximaItemAtividade
	}

	return returnData
}

function calculaStatus(entrega) {
	let statusId
	if (!entrega.avaliada) {
		statusId = 1;
		entrega.corStatus = 'var(--cor-secundaria-2)';
	} else {
		statusId = 4;
		entrega.corStatus = 'var(--cor-secundaria-4)';
	}
	entrega.status = STATUS_ENTREGA.professor[statusId];

}
