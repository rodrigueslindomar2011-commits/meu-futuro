/* =========================================================
   MEU FUTURO
   PLANEJAMENTO.JS
   Linha do Futuro
========================================================= */

"use strict";

/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const STORAGE_KEY = "meuFuturoPlanejamento";


/* =========================================================
   OBJETIVOS PADRÃO
========================================================= */

const objetivosPadrao = [
    {
        id: 1,
        ano: "HOJE",
        titulo: "Concluir o Ensino Médio",
        descricao:
            "Finalizar essa etapa e me preparar para o próximo passo da minha jornada.",
        categoria: "educacao",
        icone: "🎯",
        categoriaTexto: "🎓 Educação",
        status: "andamento",
        statusTexto: "◐ Em andamento"
    },

    {
        id: 2,
        ano: "2027",
        titulo: "Entrar na Faculdade",
        descricao:
            "Encontrar um curso e uma instituição que estejam alinhados com meus objetivos.",
        categoria: "educacao",
        icone: "🎓",
        categoriaTexto: "🎓 Educação",
        status: "andamento",
        statusTexto: "◐ Planejado"
    },

    {
        id: 3,
        ano: "2028",
        titulo: "Conseguir meu primeiro estágio",
        descricao:
            "Adquirir experiência profissional enquanto continuo meus estudos.",
        categoria: "carreira",
        icone: "💼",
        categoriaTexto: "💼 Carreira",
        status: "andamento",
        statusTexto: "◐ Planejado"
    },

    {
        id: 4,
        ano: "2030",
        titulo: "Concluir minha graduação",
        descricao:
            "Finalizar minha formação e estar preparado para o mercado de trabalho.",
        categoria: "educacao",
        icone: "🎓",
        categoriaTexto: "🎓 Educação",
        status: "andamento",
        statusTexto: "◐ Planejado"
    },

    {
        id: 5,
        ano: "2031",
        titulo: "Conseguir meu primeiro emprego",
        descricao:
            "Começar minha carreira profissional na área que escolhi.",
        categoria: "carreira",
        icone: "💼",
        categoriaTexto: "💼 Carreira",
        status: "andamento",
        statusTexto: "◐ Planejado"
    },

    {
        id: 6,
        ano: "2033",
        titulo: "Morar sozinho",
        descricao:
            "Conquistar minha independência e ter meu próprio espaço.",
        categoria: "moradia",
        icone: "🏠",
        categoriaTexto: "🏠 Moradia",
        status: "andamento",
        statusTexto: "◐ Planejado"
    },

    {
        id: 7,
        ano: "2035",
        titulo: "Alcançar minha independência financeira",
        descricao:
            "Ter estabilidade financeira e liberdade para construir novos sonhos.",
        categoria: "financeiro",
        icone: "🏆",
        categoriaTexto: "💰 Finanças",
        status: "andamento",
        statusTexto: "◐ Meta futura"
    }
];


/* =========================================================
   OBJETIVOS
========================================================= */

let objetivos = [];


/* =========================================================
   INICIAR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    carregarObjetivos();

    renderizarObjetivos();

    atualizarResumo();

    configurarFormulario();

});


/* =========================================================
   CARREGAR OBJETIVOS
========================================================= */

function carregarObjetivos() {

    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados) {

        objetivos = [...objetivosPadrao];

        salvarObjetivos();

        return;
    }

    try {

        const dadosConvertidos = JSON.parse(dados);

        if (Array.isArray(dadosConvertidos)) {

            objetivos = dadosConvertidos;

        } else {

            objetivos = [...objetivosPadrao];

        }

    } catch (erro) {

        console.error(
            "Erro ao carregar objetivos:",
            erro
        );

        objetivos = [...objetivosPadrao];
    }
}


/* =========================================================
   SALVAR OBJETIVOS
========================================================= */

function salvarObjetivos() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(objetivos)
    );
}


/* =========================================================
   RENDERIZAR LINHA DO TEMPO
========================================================= */

function renderizarObjetivos() {

    const linha = document.getElementById("linhaDoTempo");

    if (!linha) {
        return;
    }

    linha.innerHTML = "";


    /* Ordenar por ano */

    const listaOrdenada = [...objetivos].sort(function (a, b) {

        if (a.ano === "HOJE") {
            return -1;
        }

        if (b.ano === "HOJE") {
            return 1;
        }

        return Number(a.ano) - Number(b.ano);

    });


    listaOrdenada.forEach(function (objetivo) {

        const etapa = document.createElement("article");

        etapa.className = "etapa";

        etapa.dataset.id = objetivo.id;


        etapa.innerHTML = `

            <div class="etapa-ano">
                ${escapeHTML(objetivo.ano)}
            </div>

            <div class="etapa-ponto">
                ${objetivo.icone || "🎯"}
            </div>

            <div class="etapa-conteudo">

                <div class="etapa-topo">

                    <span class="categoria ${escapeHTML(objetivo.categoria)}">
                        ${escapeHTML(objetivo.categoriaTexto)}
                    </span>

                    <button
                        class="menu-etapa"
                        type="button"
                        onclick="removerObjetivo(${objetivo.id})"
                        title="Remover objetivo"
                    >
                        ⋮
                    </button>

                </div>

                <h3>
                    ${escapeHTML(objetivo.titulo)}
                </h3>

                <p>
                    ${escapeHTML(objetivo.descricao || "Objetivo da minha jornada.")}
                </p>

                <div class="etapa-status ${escapeHTML(objetivo.status)}">
                    ${escapeHTML(objetivo.statusTexto)}
                </div>

            </div>

        `;

        linha.appendChild(etapa);

    });


    /* Adiciona o final da linha */

    const fim = document.createElement("div");

    fim.className = "fim-linha";

    fim.innerHTML = `

        <div class="fim-icon">
            🚀
        </div>

        <h3>
            Seu futuro começa agora.
        </h3>

        <p>
            Continue adicionando novos objetivos
            e construa a história que você quer viver.
        </p>

    `;

    linha.appendChild(fim);
}


/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirModal() {

    const modal = document.getElementById("modalObjetivo");

    if (!modal) {

        console.error(
            "Modal #modalObjetivo não encontrado."
        );

        return;
    }


    modal.classList.add("ativo");

    modal.style.display = "flex";

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-aberto"
    );


    setTimeout(function () {

        const titulo =
            document.getElementById("tituloObjetivo");

        if (titulo) {
            titulo.focus();
        }

    }, 100);

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModal() {

    const modal =
        document.getElementById("modalObjetivo");

    if (!modal) {
        return;
    }


    modal.classList.remove("ativo");

    modal.style.display = "none";

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-aberto"
    );

}


/* =========================================================
   FORMULÁRIO
========================================================= */

function configurarFormulario() {

    const formulario =
        document.getElementById("formObjetivo");

    if (!formulario) {

        console.error(
            "Formulário #formObjetivo não encontrado."
        );

        return;
    }


    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            criarObjetivo();

        }
    );

}


/* =========================================================
   CRIAR OBJETIVO
========================================================= */

function criarObjetivo() {

    const tituloInput =
        document.getElementById("tituloObjetivo");

    const anoInput =
        document.getElementById("anoObjetivo");

    const categoriaInput =
        document.getElementById("categoriaObjetivo");

    const descricaoInput =
        document.getElementById("descricaoObjetivo");


    if (!tituloInput || !anoInput || !categoriaInput) {

        alert(
            "Não foi possível encontrar os campos do formulário."
        );

        return;
    }


    const titulo =
        tituloInput.value.trim();

    const ano =
        anoInput.value.trim();

    const categoria =
        categoriaInput.value;

    const descricao =
        descricaoInput
            ? descricaoInput.value.trim()
            : "";


    /* Validação */

    if (!titulo) {

        alert(
            "Digite o nome do objetivo."
        );

        tituloInput.focus();

        return;
    }


    if (!ano) {

        alert(
            "Informe o ano do objetivo."
        );

        anoInput.focus();

        return;
    }


    /* Dados da categoria */

    const categorias = {

        educacao: {
            icone: "🎓",
            texto: "🎓 Educação"
        },

        carreira: {
            icone: "💼",
            texto: "💼 Carreira"
        },

        financeiro: {
            icone: "💰",
            texto: "💰 Finanças"
        },

        moradia: {
            icone: "🏠",
            texto: "🏠 Moradia"
        },

        pessoal: {
            icone: "❤️",
            texto: "❤️ Vida pessoal"
        },

        viagem: {
            icone: "✈️",
            texto: "✈️ Viagens"
        },

        sonho: {
            icone: "🚀",
            texto: "🚀 Sonhos"
        },

        outros: {
            icone: "⭐",
            texto: "⭐ Outros"
        }

    };


    const dadosCategoria =
        categorias[categoria] || categorias.outros;


    /* Novo ID */

    let novoId = Date.now();


    /* Criar objetivo */

    const novoObjetivo = {

        id: novoId,

        ano: ano,

        titulo: titulo,

        descricao:
            descricao ||
            "Um novo objetivo da minha jornada.",

        categoria: categoria,

        icone: dadosCategoria.icone,

        categoriaTexto:
            dadosCategoria.texto,

        status: "andamento",

        statusTexto: "◐ Planejado"

    };


    objetivos.push(novoObjetivo);


    /* Salvar */

    salvarObjetivos();


    /* Atualizar tela */

    renderizarObjetivos();

    atualizarResumo();


    /* Fechar */

    fecharModal();


    /* Limpar formulário */

    const formulario =
        document.getElementById("formObjetivo");

    if (formulario) {
        formulario.reset();
    }


    /* Mensagem */

    mostrarMensagem(
        "🚀 Objetivo adicionado com sucesso!"
    );

}


/* =========================================================
   REMOVER OBJETIVO
========================================================= */

function removerObjetivo(id) {

    const objetivo =
        objetivos.find(function (item) {

            return Number(item.id) === Number(id);

        });


    if (!objetivo) {

        console.error(
            "Objetivo não encontrado:",
            id
        );

        return;
    }


    const confirmar = confirm(
        `Deseja remover o objetivo "${objetivo.titulo}"?`
    );


    if (!confirmar) {
        return;
    }


    objetivos =
        objetivos.filter(function (item) {

            return Number(item.id) !== Number(id);

        });


    salvarObjetivos();

    renderizarObjetivos();

    atualizarResumo();


    mostrarMensagem(
        "Objetivo removido."
    );

}


/* =========================================================
   ATUALIZAR RESUMO
========================================================= */

function atualizarResumo() {

    const total =
        objetivos.length;


    const concluidos =
        objetivos.filter(function (objetivo) {

            return objetivo.status === "concluido";

        }).length;


    const andamento =
        objetivos.filter(function (objetivo) {

            return objetivo.status !== "concluido";

        }).length;


    let percentual = 0;


    if (total > 0) {

        percentual =
            Math.round(
                (concluidos / total) * 100
            );

    }


    const totalElemento =
        document.getElementById("totalObjetivos");

    const concluidosElemento =
        document.getElementById("objetivosConcluidos");

    const andamentoElemento =
        document.getElementById("objetivosAndamento");

    const percentualElemento =
        document.getElementById("percentualProgresso");

    const barraElemento =
        document.getElementById("barraProgresso");


    if (totalElemento) {

        totalElemento.textContent =
            total;

    }


    if (concluidosElemento) {

        concluidosElemento.textContent =
            concluidos;

    }


    if (andamentoElemento) {

        andamentoElemento.textContent =
            andamento;

    }


    if (percentualElemento) {

        percentualElemento.textContent =
            percentual + "%";

    }


    if (barraElemento) {

        barraElemento.style.width =
            percentual + "%";

    }

}


/* =========================================================
   MENSAGEM
========================================================= */

function mostrarMensagem(texto) {

    const mensagem =
        document.getElementById("mensagemSistema");


    if (!mensagem) {

        alert(texto);

        return;
    }


    mensagem.textContent =
        texto;


    mensagem.classList.add(
        "mostrar"
    );


    setTimeout(function () {

        mensagem.classList.remove(
            "mostrar"
        );

    }, 3000);

}


/* =========================================================
   VOLTAR AO DASHBOARD
========================================================= */

function voltarDashboard() {

    window.location.href =
        "dashboard.html";

}


/* =========================================================
   ESC PARA FECHAR MODAL
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            fecharModal();

        }

    }
);


/* =========================================================
   PROTEÇÃO CONTRA HTML INJETADO
========================================================= */

function escapeHTML(valor) {

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   FUNÇÕES GLOBAIS
   Necessárias para onclick="" do HTML
========================================================= */

window.abrirModal = abrirModal;

window.fecharModal = fecharModal;

window.criarObjetivo = criarObjetivo;

window.removerObjetivo = removerObjetivo;

window.voltarDashboard = voltarDashboard;

window.mostrarMensagem = mostrarMensagem;