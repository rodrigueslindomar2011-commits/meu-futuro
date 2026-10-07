/* ============================================================
   MEU FUTURO
   PROFISSÕES.JS
   VERSÃO DINÂMICA — TESTE VOCACIONAL + RIASEC
============================================================ */

/* ============================================================
   CONFIGURAÇÃO
============================================================ */

const API_URL = "/api";


/* ============================================================
   CATÁLOGO DE PROFISSÕES
   Cada profissão possui um perfil RIASEC de referência.
============================================================ */

const PROFISSOES = [

    {
        nome: "Desenvolvedor de Software",
        area: "Tecnologia",
        icone: "💻",
        descricao:
            "Cria, testa e mantém sistemas, sites, aplicativos e outras soluções digitais.",
        perfil: {
            R: 55,
            I: 90,
            A: 65,
            S: 30,
            E: 55,
            C: 75
        }
    },

    {
        nome: "Engenheiro de Software",
        area: "Tecnologia",
        icone: "🖥️",
        descricao:
            "Projeta e desenvolve sistemas de software, trabalhando com problemas técnicos e soluções digitais.",
        perfil: {
            R: 65,
            I: 90,
            A: 45,
            S: 25,
            E: 55,
            C: 80
        }
    },

    {
        nome: "Analista de Dados",
        area: "Tecnologia",
        icone: "📊",
        descricao:
            "Analisa dados para encontrar padrões, informações e possibilidades que ajudam na tomada de decisões.",
        perfil: {
            R: 35,
            I: 95,
            A: 35,
            S: 35,
            E: 60,
            C: 90
        }
    },

    {
        nome: "Cientista de Dados",
        area: "Tecnologia",
        icone: "🧠",
        descricao:
            "Utiliza estatística, programação e análise de dados para investigar problemas e criar modelos.",
        perfil: {
            R: 35,
            I: 100,
            A: 40,
            S: 25,
            E: 50,
            C: 80
        }
    },

    {
        nome: "Designer Gráfico",
        area: "Criatividade",
        icone: "🎨",
        descricao:
            "Cria soluções visuais para comunicação, marcas, produtos, campanhas e projetos.",
        perfil: {
            R: 25,
            I: 35,
            A: 100,
            S: 45,
            E: 55,
            C: 40
        }
    },

    {
        nome: "Designer de UX/UI",
        area: "Tecnologia",
        icone: "🎨",
        descricao:
            "Projeta experiências e interfaces digitais pensando nas necessidades das pessoas.",
        perfil: {
            R: 25,
            I: 65,
            A: 95,
            S: 75,
            E: 45,
            C: 45
        }
    },

    {
        nome: "Psicólogo",
        area: "Saúde e Pessoas",
        icone: "🧠",
        descricao:
            "Estuda o comportamento humano e atua em diferentes contextos relacionados à saúde e ao desenvolvimento.",
        perfil: {
            R: 20,
            I: 65,
            A: 45,
            S: 100,
            E: 35,
            C: 40
        }
    },

    {
        nome: "Professor",
        area: "Educação",
        icone: "📚",
        descricao:
            "Atua no ensino e ajuda estudantes a desenvolver conhecimentos e habilidades.",
        perfil: {
            R: 20,
            I: 60,
            A: 40,
            S: 100,
            E: 55,
            C: 65
        }
    },

    {
        nome: "Médico",
        area: "Saúde",
        icone: "🩺",
        descricao:
            "Atua na prevenção, investigação, diagnóstico e tratamento de condições de saúde.",
        perfil: {
            R: 55,
            I: 100,
            A: 35,
            S: 80,
            E: 40,
            C: 65
        }
    },

    {
        nome: "Enfermeiro",
        area: "Saúde",
        icone: "🏥",
        descricao:
            "Atua diretamente no cuidado e acompanhamento de pessoas em diferentes contextos de saúde.",
        perfil: {
            R: 55,
            I: 65,
            A: 30,
            S: 100,
            E: 35,
            C: 70
        }
    },

    {
        nome: "Administrador",
        area: "Negócios",
        icone: "📋",
        descricao:
            "Organiza recursos, processos e atividades para apoiar o funcionamento de organizações.",
        perfil: {
            R: 30,
            I: 55,
            A: 25,
            S: 50,
            E: 90,
            C: 100
        }
    },

    {
        nome: "Contador",
        area: "Negócios",
        icone: "🧮",
        descricao:
            "Trabalha com informações contábeis, financeiras e tributárias de organizações.",
        perfil: {
            R: 25,
            I: 65,
            A: 20,
            S: 30,
            E: 55,
            C: 100
        }
    },

    {
        nome: "Advogado",
        area: "Direito",
        icone: "⚖️",
        descricao:
            "Atua com questões jurídicas, interpretação de normas e defesa de interesses.",
        perfil: {
            R: 25,
            I: 65,
            A: 45,
            S: 50,
            E: 100,
            C: 75
        }
    },

    {
        nome: "Jornalista",
        area: "Comunicação",
        icone: "📰",
        descricao:
            "Pesquisa, apura e produz conteúdos informativos para diferentes meios de comunicação.",
        perfil: {
            R: 25,
            I: 70,
            A: 90,
            S: 60,
            E: 80,
            C: 35
        }
    },

    {
        nome: "Marketing",
        area: "Comunicação",
        icone: "📢",
        descricao:
            "Trabalha com comunicação, marcas, comportamento de público e estratégias de mercado.",
        perfil: {
            R: 20,
            I: 55,
            A: 85,
            S: 65,
            E: 100,
            C: 45
        }
    },

    {
        nome: "Arquiteto",
        area: "Engenharia e Design",
        icone: "🏛️",
        descricao:
            "Planeja espaços e projetos considerando aspectos funcionais, técnicos e estéticos.",
        perfil: {
            R: 65,
            I: 60,
            A: 100,
            S: 30,
            E: 55,
            C: 65
        }
    },

    {
        nome: "Engenheiro Civil",
        area: "Engenharia",
        icone: "🏗️",
        descricao:
            "Planeja, desenvolve e acompanha projetos relacionados à construção e infraestrutura.",
        perfil: {
            R: 90,
            I: 80,
            A: 35,
            S: 25,
            E: 55,
            C: 85
        }
    },

    {
        nome: "Engenheiro Mecânico",
        area: "Engenharia",
        icone: "⚙️",
        descricao:
            "Trabalha com máquinas, sistemas mecânicos, projetos e soluções de engenharia.",
        perfil: {
            R: 100,
            I: 90,
            A: 30,
            S: 20,
            E: 45,
            C: 70
        }
    },

    {
        nome: "Veterinário",
        area: "Saúde e Animais",
        icone: "🐾",
        descricao:
            "Atua na saúde, prevenção e tratamento de animais.",
        perfil: {
            R: 75,
            I: 85,
            A: 35,
            S: 75,
            E: 30,
            C: 55
        }
    },

    {
        nome: "Biólogo",
        area: "Ciências",
        icone: "🔬",
        descricao:
            "Estuda seres vivos, processos biológicos e diferentes aspectos do meio ambiente.",
        perfil: {
            R: 55,
            I: 100,
            A: 40,
            S: 45,
            E: 30,
            C: 65
        }
    },

    {
        nome: "Pesquisador Científico",
        area: "Ciências",
        icone: "🧪",
        descricao:
            "Investiga perguntas e problemas utilizando métodos científicos e análise de evidências.",
        perfil: {
            R: 40,
            I: 100,
            A: 40,
            S: 30,
            E: 35,
            C: 75
        }
    },

    {
        nome: "Empreendedor",
        area: "Negócios",
        icone: "🚀",
        descricao:
            "Desenvolve ideias, projetos ou negócios e busca soluções para necessidades do mercado.",
        perfil: {
            R: 35,
            I: 55,
            A: 65,
            S: 55,
            E: 100,
            C: 50
        }
    }

];


/* ============================================================
   ESTADO
============================================================ */

let alunoAtual = null;
let resultadoVocacional = null;
let profissoesCalculadas = [];
let carregandoPerfil = false;


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        carregarAluno();

        configurarPesquisa();

        await carregarPerfil();

    }
);


/* ============================================================
   PEGAR ALUNO DO STORAGE
============================================================ */

function obterAlunoStorage() {

    const fontes = [

        localStorage.getItem("aluno"),

        sessionStorage.getItem("aluno"),

        localStorage.getItem("usuario"),

        sessionStorage.getItem("usuario")

    ];

    for (const item of fontes) {

        if (!item) {
            continue;
        }

        try {

            const aluno = JSON.parse(item);

            if (
                aluno &&
                typeof aluno === "object"
            ) {
                return aluno;
            }

        } catch (erro) {

            console.warn(
                "Não foi possível ler aluno do storage."
            );

        }

    }

    return null;
}


/* ============================================================
   CARREGAR ALUNO
============================================================ */

function carregarAluno() {

    alunoAtual = obterAlunoStorage();

    if (!alunoAtual) {

        console.warn(
            "Nenhum aluno encontrado no navegador."
        );

        return;
    }

    const nome =
        alunoAtual.nome ||
        "Aluno";

    const primeiroNome =
        String(nome)
            .trim()
            .split(" ")[0] ||
        "Aluno";

    const nomeAluno =
        document.getElementById(
            "nomeAluno"
        );

    const avatar =
        document.getElementById(
            "avatar"
        );

    if (nomeAluno) {

        nomeAluno.textContent =
            primeiroNome;

    }

    if (avatar) {

        avatar.textContent =
            primeiroNome
                .charAt(0)
                .toUpperCase();

    }

}


/* ============================================================
   PEGAR ID DO ALUNO
============================================================ */

function obterAlunoId() {

    if (!alunoAtual) {

        alunoAtual =
            obterAlunoStorage();

    }

    if (!alunoAtual) {
        return null;
    }

    const possiveisIds = [

        alunoAtual.id,

        alunoAtual.aluno_id,

        alunoAtual.alunoId,

        alunoAtual.usuario_id

    ];

    for (const id of possiveisIds) {

        const numero =
            Number(id);

        if (
            Number.isInteger(numero) &&
            numero > 0
        ) {

            return numero;

        }

    }

    return null;
}


/* ============================================================
   CARREGAR PERFIL REAL DO BANCO
============================================================ */

async function carregarPerfil() {

    if (carregandoPerfil) {
        return;
    }

    carregandoPerfil = true;

    const alunoId = obterAlunoId();

    if (!alunoId) {

        mostrarPerfilSemResultado();

        renderizarProfissoes();

        carregandoPerfil = false;

        return;
    }

    try {

        const resposta =
            await fetch(
                `${API_URL}/profissoes/${alunoId}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    },
                    cache: "no-store"
                }
            );

        if (!resposta.ok) {

            throw new Error(
                `Erro HTTP ${resposta.status}`
            );

        }

        const dados =
            await resposta.json();

        console.log(
            "📥 Dados recebidos do servidor:",
            dados
        );

        if (
            !dados ||
            dados.sucesso === false
        ) {

            throw new Error(
                dados?.erro ||
                "Não foi possível carregar o resultado vocacional."
            );

        }

        /*
         * Guarda o resultado REAL
         * vindo do banco de dados.
         */
        resultadoVocacional =
            dados.resultado || null;


        /*
         * Caso o aluno ainda não tenha
         * feito o teste vocacional.
         */
        if (
            !dados.possuiResultado ||
            !resultadoVocacional
        ) {

            console.warn(
                "⚠️ O aluno ainda não possui resultado vocacional."
            );

            mostrarPerfilSemResultado();

            profissoesCalculadas = [];

            renderizarProfissoes();

            atualizarContador();

            return;

        }


        /*
         * PRIMEIRO calculamos as profissões
         * usando o resultado real do banco.
         */
        calcularProfissoes();


        /*
         * DEPOIS atualizamos as informações
         * do perfil na página.
         */
        atualizarInformacoesPerfil(
            resultadoVocacional
        );


        /*
         * Renderiza as profissões calculadas
         * pelo resultado RIASEC.
         */
        renderizarProfissoes();


        /*
         * Atualiza o contador.
         */
        atualizarContador();


        /*
         * Carrega os favoritos salvos.
         */
        carregarFavoritos();


        console.log(
            "🎯 Resultado vocacional encontrado:",
            resultadoVocacional
        );

        console.log(
            "💼 Profissões calculadas:",
            profissoesCalculadas
        );

    } catch (erro) {

        console.error(
            "❌ Erro ao carregar resultado vocacional:",
            erro
        );

        mostrarErroPerfil();

        /*
         * Mantém a página funcionando mesmo
         * quando não conseguir carregar o resultado.
         */
        profissoesCalculadas =
            PROFISSOES.map(
                profissao => ({
                    ...profissao,
                    compatibilidade: 0
                })
            );

        renderizarProfissoes();

        atualizarContador();

    } finally {

        carregandoPerfil = false;

    }

}

/* ============================================================
   NORMALIZAR PONTUAÇÕES RIASEC
============================================================ */

function normalizarPontuacoes(
    pontuacoes
) {

    const resultado = {

        R: 0,
        I: 0,
        A: 0,
        S: 0,
        E: 0,
        C: 0

    };

    if (
        !pontuacoes ||
        typeof pontuacoes !== "object"
    ) {

        return resultado;

    }

    const mapa = {

        R: "R",
        I: "I",
        A: "A",
        S: "S",
        E: "E",
        C: "C",

        realista: "R",
        realista_score: "R",

        investigativo: "I",
        investigador: "I",
        investigativo_score: "I",

        artistico: "A",
        artístico: "A",
        artistico_score: "A",

        social: "S",
        social_score: "S",

        empreendedor: "E",
        empreendedor_score: "E",

        convencional: "C",
        convencional_score: "C"

    };

    Object.entries(
        pontuacoes
    ).forEach(
        ([chave, valor]) => {

            const chaveNormalizada =
                String(chave)
                    .trim()
                    .toLowerCase()
                    .replace(
                        /[\s-]+/g,
                        "_"
                    );

            const letra =
                mapa[chaveNormalizada] ||
                mapa[
                    String(chave)
                        .trim()
                        .toUpperCase()
                ];

            if (!letra) {
                return;
            }

            const numero =
                Number(valor);

            if (
                Number.isFinite(numero)
            ) {

                resultado[letra] =
                    Math.max(
                        resultado[letra],
                        numero
                    );

            }

        }
    );

    return resultado;
}


/* ============================================================
   PEGAR PERFIL RIASEC PELO CÓDIGO
============================================================ */

function pontuacoesPeloCodigo(
    codigo
) {

    const resultado = {

        R: 0,
        I: 0,
        A: 0,
        S: 0,
        E: 0,
        C: 0

    };

    const texto =
        String(codigo || "")
            .toUpperCase()
            .replace(
                /[^RIASEC]/g,
                ""
            );

    if (!texto) {
        return resultado;
    }

    texto
        .split("")
        .forEach(
            (letra, indice) => {

                resultado[letra] =
                    Math.max(
                        resultado[letra],
                        100 - (indice * 12)
                    );

            }
        );

    return resultado;
}


/* ============================================================
   PERFIL FINAL DO ALUNO
============================================================ */

function obterPontuacoesAluno() {

    if (!resultadoVocacional) {

        return {

            R: 0,
            I: 0,
            A: 0,
            S: 0,
            E: 0,
            C: 0

        };

    }

    const pontuacoes =
        normalizarPontuacoes(
            resultadoVocacional.pontuacoes
        );

    const possuiPontuacao =
        Object.values(
            pontuacoes
        ).some(
            valor => valor > 0
        );

    if (possuiPontuacao) {

        return pontuacoes;

    }

    return pontuacoesPeloCodigo(
        resultadoVocacional.codigo
    );
}


/* ============================================================
   COMPATIBILIDADE RIASEC
============================================================ */

function calcularCompatibilidade(
    aluno,
    profissao
) {

    const letras = [
        "R",
        "I",
        "A",
        "S",
        "E",
        "C"
    ];

    let produto = 0;

    let normaAluno = 0;

    let normaProfissao = 0;

    letras.forEach(
        letra => {

            const valorAluno =
                Number(
                    aluno[letra] || 0
                );

            const valorProfissao =
                Number(
                    profissao.perfil[letra] || 0
                );

            produto +=
                valorAluno *
                valorProfissao;

            normaAluno +=
                valorAluno *
                valorAluno;

            normaProfissao +=
                valorProfissao *
                valorProfissao;

        }
    );

    if (
        normaAluno === 0 ||
        normaProfissao === 0
    ) {

        return 0;

    }

    const similaridade =
        produto /
        (
            Math.sqrt(normaAluno) *
            Math.sqrt(normaProfissao)
        );

    return Math.max(
        0,
        Math.min(
            100,
            Math.round(
                similaridade * 100
            )
        )
    );
}


/* ============================================================
   CALCULAR TODAS AS PROFISSÕES
============================================================ */

function calcularProfissoes() {

    const pontuacoes =
        obterPontuacoesAluno();

    profissoesCalculadas =
        PROFISSOES
            .map(
                profissao => {

                    return {

                        ...profissao,

                        compatibilidade:
                            calcularCompatibilidade(
                                pontuacoes,
                                profissao
                            )

                    };

                }
            )
            .sort(
                (a, b) =>
                    b.compatibilidade -
                    a.compatibilidade
            );

}


/* ============================================================
   ATUALIZAR PERFIL NA INTERFACE
============================================================ */

function atualizarInformacoesPerfil(
    perfil
) {

    const elementoPerfil =
        document.getElementById(
            "perfilVocacional"
        );

    const elementoCompatibilidade =
        document.getElementById(
            "compatibilidadeGeral"
        );

    if (!perfil) {

        mostrarPerfilSemResultado();

        return;

    }

    /*
     * Nomes completos dos perfis RIASEC.
     */
    const nomesPerfis = {

        R: "Realista",

        I: "Investigativo",

        A: "Artístico",

        S: "Social",

        E: "Empreendedor",

        C: "Convencional"

    };

    /*
     * O servidor pode retornar o código
     * em perfil_principal, perfil ou codigo.
     *
     * Exemplo:
     *
     * perfil_principal: "A"
     *
     * será mostrado como:
     *
     * Artístico
     */
    const valorRecebido =
        String(
            perfil.perfil_principal ||
            perfil.perfil ||
            perfil.codigo ||
            ""
        )
            .trim()
            .toUpperCase();

    /*
     * Se receber uma letra RIASEC,
     * transforma no nome completo.
     */
    let nomePerfil =
        nomesPerfis[valorRecebido];

    /*
     * Se não for uma letra RIASEC,
     * mantém o texto original.
     */
    if (!nomePerfil) {

        nomePerfil =
            perfil.perfil_principal ||
            perfil.perfil ||
            perfil.codigo ||
            "Perfil vocacional";

    }

    if (elementoPerfil) {

        elementoPerfil.textContent =
            nomePerfil;

    }

    /*
     * Calcula a compatibilidade geral
     * usando as profissões calculadas.
     */
    const melhores =
        profissoesCalculadas
            .slice(0, 3);

    let geral = 0;

    if (melhores.length) {

        geral =
            Math.round(
                melhores.reduce(
                    (
                        total,
                        profissao
                    ) =>
                        total +
                        profissao.compatibilidade,
                    0
                ) /
                melhores.length
            );

    }

    if (elementoCompatibilidade) {

        elementoCompatibilidade.textContent =
            `${geral}%`;

    }

}


/* ============================================================
   PERFIL SEM RESULTADO
============================================================ */

function mostrarPerfilSemResultado() {

    const elementoPerfil =
        document.getElementById(
            "perfilVocacional"
        );

    const elementoCompatibilidade =
        document.getElementById(
            "compatibilidadeGeral"
        );

    if (elementoPerfil) {

        elementoPerfil.textContent =
            "Faça o teste vocacional";

    }

    if (elementoCompatibilidade) {

        elementoCompatibilidade.textContent =
            "—";

    }

}


/* ============================================================
   ERRO DE CARREGAMENTO
============================================================ */

function mostrarErroPerfil() {

    const elementoPerfil =
        document.getElementById(
            "perfilVocacional"
        );

    const elementoCompatibilidade =
        document.getElementById(
            "compatibilidadeGeral"
        );

    if (elementoPerfil) {

        elementoPerfil.textContent =
            "Não foi possível carregar";

    }

    if (elementoCompatibilidade) {

        elementoCompatibilidade.textContent =
            "—";

    }

}


/* ============================================================
   LOCALIZAR GRID DE PROFISSÕES
============================================================ */

function obterContainerProfissoes() {

    const seletores = [

        ".profissoes-grid",

        ".profissoes-lista",

        ".cards-profissoes",

        ".profissoes-cards",

        "#listaProfissoes",

        "#profissoesGrid"

    ];

    for (
        const seletor of seletores
    ) {

        const elemento =
            document.querySelector(
                seletor
            );

        if (elemento) {

            return elemento;

        }

    }

    const primeiroCard =
        document.querySelector(
            ".profissao-card"
        );

    if (
        primeiroCard &&
        primeiroCard.parentElement
    ) {

        return primeiroCard.parentElement;

    }

    return null;
}


/* ============================================================
   RENDERIZAR PROFISSÕES
============================================================ */

function renderizarProfissoes() {

    const container =
        obterContainerProfissoes();

    if (!container) {

        console.warn(
            "Container das profissões não encontrado."
        );

        return;

    }

    container.innerHTML = "";

    profissoesCalculadas.forEach(
        profissao => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "profissao-card";

            card.dataset.profissao =
                profissao.nome;

            card.dataset.area =
                profissao.area;

            card.dataset.compatibilidade =
                profissao.compatibilidade;

            card.innerHTML = `

                <div class="profissao-card-top">

                    <div class="profissao-icon">
                        ${profissao.icone}
                    </div>

                    <button
                        class="btn-favorito"
                        type="button"
                        aria-label="Favoritar profissão"
                    >
                        ♡
                    </button>

                </div>


                <div class="profissao-info">

                    <span class="profissao-area">
                        ${escaparHtml(profissao.area)}
                    </span>

                    <h3 class="profissao-nome">
                        ${escaparHtml(profissao.nome)}
                    </h3>

                    <p class="profissao-descricao">
                        ${escaparHtml(profissao.descricao)}
                    </p>

                </div>


                <div class="profissao-compatibilidade">

                    <div class="compatibilidade-info">

                        <span>
                            Compatibilidade
                        </span>

                        <strong>
                            ${profissao.compatibilidade}%
                        </strong>

                    </div>

                    <div class="compatibilidade-barra">

                        <span
                            style="width:${profissao.compatibilidade}%"
                        ></span>

                    </div>

                </div>


                <button
                    class="btn-ver-profissao"
                    type="button"
                >
                    Ver profissão
                </button>

            `;

            const botaoFavorito =
                card.querySelector(
                    ".btn-favorito"
                );

            if (botaoFavorito) {

                botaoFavorito.addEventListener(
                    "click",
                    () => {
                        favoritar(
                            botaoFavorito
                        );
                    }
                );

            }

            const botaoProfissao =
                card.querySelector(
                    ".btn-ver-profissao"
                );

            if (botaoProfissao) {

                botaoProfissao.addEventListener(
                    "click",
                    () => {
                        abrirProfissao(
                            profissao.nome
                        );
                    }
                );

            }

            container.appendChild(
                card
            );

        }
    );

    carregarFavoritos();

    atualizarContador();

}


/* ============================================================
   ESCAPAR HTML
============================================================ */

function escaparHtml(
    texto
) {

    return String(texto ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* ============================================================
   PESQUISA E FILTROS
============================================================ */

function configurarPesquisa() {

    const pesquisa =
        document.getElementById(
            "pesquisaProfissao"
        );

    const filtroArea =
        document.getElementById(
            "filtroArea"
        );

    const filtroCompatibilidade =
        document.getElementById(
            "filtroCompatibilidade"
        );

    if (pesquisa) {

        pesquisa.addEventListener(
            "input",
            filtrarProfissoes
        );

    }

    if (filtroArea) {

        prepararFiltroAreas(
            filtroArea
        );

        filtroArea.addEventListener(
            "change",
            filtrarProfissoes
        );

    }

    if (filtroCompatibilidade) {

        filtroCompatibilidade.addEventListener(
            "change",
            filtrarProfissoes
        );

    }

}


/* ============================================================
   PREPARAR FILTRO DE ÁREAS
============================================================ */

function prepararFiltroAreas(
    select
) {

    const areas =
        [
            ...new Set(
                PROFISSOES.map(
                    profissao =>
                        profissao.area
                )
            )
        ]
            .sort(
                (a, b) =>
                    a.localeCompare(
                        b,
                        "pt-BR"
                    )
            );

    const valorAtual =
        select.value ||
        "todas";

    select.innerHTML = `

        <option value="todas">
            Todas as áreas
        </option>

        ${areas
            .map(
                area =>
                    `
                    <option value="${escaparAtributo(area)}">
                        ${escaparHtml(area)}
                    </option>
                    `
            )
            .join("")}

    `;

    if (
        areas.includes(
            valorAtual
        )
    ) {

        select.value =
            valorAtual;

    } else {

        select.value =
            "todas";

    }

}


/* ============================================================
   ESCAPAR ATRIBUTO
============================================================ */

function escaparAtributo(
    texto
) {

    return String(texto ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}


/* ============================================================
   FILTRAR PROFISSÕES
============================================================ */

function filtrarProfissoes() {

    const pesquisaElemento =
        document.getElementById(
            "pesquisaProfissao"
        );

    const areaElemento =
        document.getElementById(
            "filtroArea"
        );

    const compatibilidadeElemento =
        document.getElementById(
            "filtroCompatibilidade"
        );

    const pesquisa =
        (
            pesquisaElemento?.value ||
            ""
        )
            .toLowerCase()
            .trim();

    const area =
        areaElemento?.value ||
        "todas";

    const compatibilidade =
        compatibilidadeElemento?.value ||
        "todas";

    const cards =
        document.querySelectorAll(
            ".profissao-card"
        );

    let encontrados = 0;

    cards.forEach(
        card => {

            const nome =
                String(
                    card.dataset.profissao ||
                    ""
                )
                    .toLowerCase();

            const areaCard =
                card.dataset.area ||
                "";

            const valor =
                Number(
                    card.dataset.compatibilidade ||
                    0
                );

            const correspondePesquisa =
                nome.includes(
                    pesquisa
                );

            const correspondeArea =
                area === "todas" ||
                area === "" ||
                areaCard === area;

            let correspondeCompatibilidade =
                true;

            if (
                compatibilidade === "alta"
            ) {

                correspondeCompatibilidade =
                    valor >= 80;

            } else if (
                compatibilidade === "media"
            ) {

                correspondeCompatibilidade =
                    valor >= 60 &&
                    valor < 80;

            } else if (
                compatibilidade === "baixa"
            ) {

                correspondeCompatibilidade =
                    valor < 60;

            }

            const mostrar =
                correspondePesquisa &&
                correspondeArea &&
                correspondeCompatibilidade;

            card.style.display =
                mostrar
                    ? ""
                    : "none";

            if (mostrar) {

                encontrados++;

            }

        }
    );

    const semResultados =
        document.getElementById(
            "semResultados"
        );

    if (semResultados) {

        semResultados.style.display =
            encontrados === 0
                ? "block"
                : "none";

    }

    atualizarContador(
        encontrados
    );

}


/* ============================================================
   CONTADOR
============================================================ */

function atualizarContador(
    quantidade = null
) {

    const contador =
        document.getElementById(
            "contadorProfissoes"
        );

    if (!contador) {
        return;
    }

    if (
        quantidade === null
    ) {

        quantidade =
            document.querySelectorAll(
                ".profissao-card"
            ).length;

    }

    contador.textContent =
        `${quantidade} ${
            quantidade === 1
                ? "profissão"
                : "profissões"
        }`;

}


/* ============================================================
   FAVORITOS
============================================================ */

function obterChaveFavoritos() {

    const alunoId =
        obterAlunoId();

    if (alunoId) {

        return `profissoesFavoritas_${alunoId}`;

    }

    return "profissoesFavoritas";

}


/* ============================================================
   FAVORITAR
============================================================ */

function favoritar(
    botao
) {

    if (!botao) {
        return;
    }

    botao.classList.toggle(
        "favoritado"
    );

    botao.textContent =
        botao.classList.contains(
            "favoritado"
        )
            ? "♥"
            : "♡";

    salvarFavoritos();

}


/* ============================================================
   SALVAR FAVORITOS
============================================================ */

function salvarFavoritos() {

    const favoritos = [];

    document
        .querySelectorAll(
            ".btn-favorito.favoritado"
        )
        .forEach(
            botao => {

                const card =
                    botao.closest(
                        ".profissao-card"
                    );

                if (!card) {
                    return;
                }

                const nome =
                    card.dataset.profissao;

                if (nome) {

                    favoritos.push(
                        nome
                    );

                }

            }
        );

    localStorage.setItem(
        obterChaveFavoritos(),
        JSON.stringify(
            favoritos
        )
    );

}


/* ============================================================
   CARREGAR FAVORITOS
============================================================ */

function carregarFavoritos() {

    let favoritos = [];

    try {

        favoritos =
            JSON.parse(
                localStorage.getItem(
                    obterChaveFavoritos()
                )
            ) || [];

    } catch (erro) {

        favoritos = [];

    }

    document
        .querySelectorAll(
            ".profissao-card"
        )
        .forEach(
            card => {

                const nome =
                    card.dataset.profissao;

                const botao =
                    card.querySelector(
                        ".btn-favorito"
                    );

                if (!botao) {
                    return;
                }

                if (
                    favoritos.includes(
                        nome
                    )
                ) {

                    botao.classList.add(
                        "favoritado"
                    );

                    botao.textContent =
                        "♥";

                } else {

                    botao.classList.remove(
                        "favoritado"
                    );

                    botao.textContent =
                        "♡";

                }

            }
        );

}


/* ============================================================
   ABRIR PROFISSÃO
============================================================ */

function abrirProfissao(
    profissao
) {

    const dados =
        profissoesCalculadas.find(
            item =>
                item.nome ===
                profissao
        );

    if (!dados) {
        return;
    }

    localStorage.setItem(
        "profissaoSelecionada",
        JSON.stringify(
            dados
        )
    );

    const caminho =
        "profissao-detalhes.html";

    fetch(
        caminho,
        {
            method: "HEAD"
        }
    )
        .then(
            resposta => {

                if (resposta.ok) {

                    window.location.href =
                        `${caminho}?profissao=${encodeURIComponent(
                            dados.nome
                        )}`;

                } else {

                    mostrarDetalhesProfissao(
                        dados
                    );

                }

            }
        )
        .catch(
            () => {

                mostrarDetalhesProfissao(
                    dados
                );

            }
        );

}


/* ============================================================
   MODAL DE DETALHES
============================================================ */

function mostrarDetalhesProfissao(
    profissao
) {

    let modal =
        document.getElementById(
            "modalProfissao"
        );

    if (!modal) {

        modal =
            document.createElement(
                "div"
            );

        modal.id =
            "modalProfissao";

        modal.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: rgba(20, 12, 40, .65);
            backdrop-filter: blur(8px);
        `;

        document.body.appendChild(
            modal
        );

    }

    modal.innerHTML = `

        <div
            style="
                width: min(680px, 100%);
                max-height: 85vh;
                overflow-y: auto;
                background: #fff;
                border-radius: 24px;
                padding: 30px;
                box-shadow: 0 25px 80px rgba(0,0,0,.25);
            "
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:flex-start;
                    gap:20px;
                "
            >

                <div>

                    <div
                        style="
                            font-size:42px;
                            margin-bottom:10px;
                        "
                    >
                        ${profissao.icone}
                    </div>

                    <span
                        style="
                            color:#7c3aed;
                            font-weight:700;
                            font-size:13px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                        "
                    >
                        ${escaparHtml(profissao.area)}
                    </span>

                    <h2
                        style="
                            margin:8px 0;
                            font-size:28px;
                            color:#17132b;
                        "
                    >
                        ${escaparHtml(profissao.nome)}
                    </h2>

                </div>

                <button
                    type="button"
                    onclick="fecharModalProfissao()"
                    style="
                        border:0;
                        background:#f3f1f8;
                        border-radius:50%;
                        width:40px;
                        height:40px;
                        cursor:pointer;
                        font-size:20px;
                    "
                >
                    ×
                </button>

            </div>


            <p
                style="
                    color:#666;
                    line-height:1.7;
                    margin-top:20px;
                "
            >
                ${escaparHtml(profissao.descricao)}
            </p>


            <div
                style="
                    margin-top:25px;
                    padding:20px;
                    border-radius:18px;
                    background:#f7f4ff;
                "
            >

                <strong>
                    Compatibilidade com seu perfil
                </strong>

                <div
                    style="
                        display:flex;
                        align-items:center;
                        gap:15px;
                        margin-top:12px;
                    "
                >

                    <strong
                        style="
                            font-size:30px;
                            color:#7c3aed;
                        "
                    >
                        ${profissao.compatibilidade}%
                    </strong>

                    <div
                        style="
                            flex:1;
                            height:10px;
                            background:#e8e2f4;
                            border-radius:10px;
                            overflow:hidden;
                        "
                    >

                        <div
                            style="
                                width:${profissao.compatibilidade}%;
                                height:100%;
                                background:#7c3aed;
                                border-radius:10px;
                            "
                        ></div>

                    </div>

                </div>

            </div>


            <div
                style="
                    margin-top:22px;
                    color:#555;
                    line-height:1.7;
                "
            >

                <strong>
                    Importante
                </strong>

                <p>
                    Essa compatibilidade é uma indicação baseada
                    nas respostas do seu teste vocacional.
                    Ela não determina qual profissão você deve escolher.
                </p>

            </div>

        </div>

    `;

    modal.style.display =
        "flex";

}


/* ============================================================
   FECHAR MODAL
============================================================ */

function fecharModalProfissao() {

    const modal =
        document.getElementById(
            "modalProfissao"
        );

    if (modal) {

        modal.remove();

    }

}


/* ============================================================
   VOLTAR PARA O DASHBOARD
============================================================ */

function voltarDashboard() {

    window.location.href =
        "dashboard.html";

}


/* ============================================================
   IR PARA RESULTADOS
============================================================ */

function verResultados() {

    window.location.href =
        "resultados.html";

}


/* ============================================================
   EXPOR FUNÇÕES
============================================================ */

window.voltarDashboard =
    voltarDashboard;

window.verResultados =
    verResultados;

window.favoritar =
    favoritar;

window.abrirProfissao =
    abrirProfissao;

window.fecharModalProfissao =
    fecharModalProfissao;