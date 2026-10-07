// ============================================================
// MEU FUTURO
// PERFIL
// ============================================================

const API_URL = window.location.origin;

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    carregarPerfil();
});

// ============================================================
// LOCALIZAR ALUNO NO LOCALSTORAGE
// ============================================================

function obterAlunoLocal() {

    const possiveisChaves = [
        "aluno",
        "usuario",
        "usuarioLogado",
        "alunoLogado",
        "meuFuturoAluno"
    ];

    for (const chave of possiveisChaves) {

        const valor = localStorage.getItem(chave);

        if (!valor) {
            continue;
        }

        try {

            const objeto = JSON.parse(valor);

            if (objeto && typeof objeto === "object") {

                if (objeto.id) {
                    return objeto;
                }

                if (
                    objeto.aluno &&
                    objeto.aluno.id
                ) {
                    return objeto.aluno;
                }
            }

        } catch (erro) {

            console.warn(
                `Não foi possível interpretar ${chave}.`
            );

        }
    }

    return null;
}

// ============================================================
// OBTER ID DO ALUNO
// ============================================================

function obterAlunoId() {

    const aluno = obterAlunoLocal();

    if (aluno && aluno.id) {
        return Number(aluno.id);
    }

    const possiveisIds = [
        "aluno_id",
        "alunoId",
        "usuario_id",
        "usuarioId"
    ];

    for (const chave of possiveisIds) {

        const valor = localStorage.getItem(chave);

        if (!valor) {
            continue;
        }

        const id = Number(valor);

        if (
            !Number.isNaN(id) &&
            id > 0
        ) {
            return id;
        }
    }

    return null;
}

// ============================================================
// CARREGAR PERFIL
// ============================================================

async function carregarPerfil() {

    const alunoLocal = obterAlunoLocal();
    const alunoId = obterAlunoId();

    // --------------------------------------------------------
    // Mostrar dados locais imediatamente
    // --------------------------------------------------------

    if (alunoLocal) {
        preencherDadosAluno(alunoLocal);
    }

    // --------------------------------------------------------
    // Verificar se existe aluno
    // --------------------------------------------------------

    if (!alunoId) {

        console.warn(
            "Nenhum aluno encontrado no localStorage."
        );

        mostrarEstadoSemLogin();

        return;
    }

    // --------------------------------------------------------
    // Buscar dados atualizados do aluno
    // --------------------------------------------------------

    try {

        // ====================================================
        // JWT
        // ====================================================

        const token = localStorage.getItem("token");

        const resposta = await fetch(
            `${API_URL}/api/aluno/${alunoId}`,
            {
                method: "GET",

                headers: {
                    Accept: "application/json",

                    ...(token
                        ? {
                            Authorization:
                                `Bearer ${token}`
                        }
                        : {})
                }
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                "Não foi possível carregar o aluno."
            );
        }

        if (dados.aluno) {
            preencherDadosAluno(dados.aluno);
        }

    } catch (erro) {

        console.error(
            "Erro carregando perfil:",
            erro
        );
    }

    // --------------------------------------------------------
    // Buscar resultado do questionário
    // --------------------------------------------------------

    await carregarResultado(alunoId);
}

// ============================================================
// PREENCHER DADOS DO ALUNO
// ============================================================

function preencherDadosAluno(aluno) {

    if (!aluno) {
        return;
    }

    const nome =
        aluno.nome ||
        "Aluno";

    const email =
        aluno.email ||
        "Não informado";

    // --------------------------------------------------------
    // NOME
    // --------------------------------------------------------

    const nomeUsuario =
        document.getElementById("nomeUsuario");

    const nomePerfil =
        document.getElementById("nomePerfil");

    if (nomeUsuario) {
        nomeUsuario.textContent = nome;
    }

    if (nomePerfil) {
        nomePerfil.textContent = nome;
    }

    // --------------------------------------------------------
    // E-MAIL
    // --------------------------------------------------------

    const emailPerfil =
        document.getElementById("emailPerfil");

    const emailInfo =
        document.getElementById("emailInfo");

    if (emailPerfil) {
        emailPerfil.textContent = email;
    }

    if (emailInfo) {
        emailInfo.textContent = email;
    }

    // --------------------------------------------------------
    // AVATAR
    // --------------------------------------------------------

    const primeiraLetra =
        nome
            .trim()
            .charAt(0)
            .toUpperCase() || "A";

    const avatar =
        document.getElementById("avatar");

    const avatarGrande =
        document.getElementById("avatarGrande");

    if (avatar) {
        avatar.textContent = primeiraLetra;
    }

    if (avatarGrande) {
        avatarGrande.textContent = primeiraLetra;
    }

    // --------------------------------------------------------
    // DATA DE CADASTRO
    // --------------------------------------------------------

    const dataCadastro =
        document.getElementById("dataCadastro");

    const data =
        aluno.created_at ||
        aluno.createdAt ||
        aluno.data_cadastro ||
        aluno.dataCadastro;

    if (dataCadastro && data) {

        dataCadastro.textContent =
            formatarData(data);
    }
}

// ============================================================
// FORMATAR DATA
// ============================================================

function formatarData(data) {

    if (!data) {
        return "Não informado";
    }

    const dataObj = new Date(data);

    if (
        Number.isNaN(
            dataObj.getTime()
        )
    ) {

        return "Não informado";
    }

    return dataObj.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );
}

// ============================================================
// CARREGAR RESULTADO VOCACIONAL
// ============================================================

async function carregarResultado(alunoId) {

    try {

        // ====================================================
        // JWT
        // ====================================================

        const token = localStorage.getItem("token");

        const resposta = await fetch(
            `${API_URL}/api/teste-vocacional/resultado/${alunoId}`,
            {
                method: "GET",

                headers: {
                    Accept: "application/json",

                    ...(token
                        ? {
                            Authorization:
                                `Bearer ${token}`
                        }
                        : {})
                }
            }
        );

        let dados = {};

        try {

            dados = await resposta.json();

        } catch (erro) {

            dados = {};
        }

        // ----------------------------------------------------
        // ALUNO AINDA NÃO RESPONDEU
        // ----------------------------------------------------

        if (resposta.status === 404) {

            console.log(
                "Aluno ainda não possui resultado vocacional."
            );

            mostrarSemResultado();

            return;
        }

        // ----------------------------------------------------
        // OUTRO ERRO
        // ----------------------------------------------------

        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                "Erro ao buscar resultado vocacional."
            );
        }

        // ----------------------------------------------------
        // RESULTADO ENCONTRADO
        // ----------------------------------------------------

        const resultado =
            dados.resultado ||
            dados;

        if (resultado) {

            console.log(
                "Resultado vocacional recebido:",
                resultado
            );

            mostrarResultado(resultado);
        }

    } catch (erro) {

        console.error(
            "Erro carregando resultado:",
            erro
        );
    }
}

// ============================================================
// MOSTRAR ESTADO SEM RESULTADO
// ============================================================

function mostrarSemResultado() {

    const status =
        document.getElementById("statusPerfil");

    if (status) {

        status.textContent =
            "Ainda não descoberto";

        status.style.background =
            "#f2f3f7";

        status.style.color =
            "#85899c";
    }

    const codigo =
        document.getElementById("codigoPerfil");

    if (codigo) {
        codigo.textContent = "—";
    }
}

// ============================================================
// MOSTRAR RESULTADO
// ============================================================

function mostrarResultado(resultado) {

    if (!resultado) {
        return;
    }

    // --------------------------------------------------------
    // PERFIL PRINCIPAL
    // --------------------------------------------------------

    const perfil =
        String(
            resultado.perfil_principal ||
            resultado.perfilPrincipal ||
            resultado.perfil ||
            resultado.codigo ||
            "I"
        )
            .trim()
            .charAt(0)
            .toUpperCase();

    // --------------------------------------------------------
    // CÓDIGO
    // --------------------------------------------------------

    const codigo =
        resultado.codigo ||
        resultado.codigo_perfil ||
        resultado.codigoPerfil ||
        perfil;

    // --------------------------------------------------------
    // PONTUAÇÕES
    // --------------------------------------------------------

    const pontuacoes =
        normalizarPontuacoes(
            resultado.pontuacoes ||
            resultado.pontuacoes_perfil ||
            resultado.pontuacoesPerfil ||
            resultado.scores ||
            {}
        );

    // --------------------------------------------------------
    // DEFINIÇÃO DOS PERFIS
    // --------------------------------------------------------

    const perfis = {

        R: {
            nome: "Realista",

            descricao:
                "Você demonstra interesse por atividades práticas, tecnologia, ferramentas e resolução de problemas."
        },

        I: {
            nome: "Investigativo",

            descricao:
                "Você demonstra interesse por pesquisa, análise, ciência, lógica e descoberta."
        },

        A: {
            nome: "Artístico",

            descricao:
                "Você demonstra interesse por criatividade, expressão, design, comunicação e novas ideias."
        },

        S: {
            nome: "Social",

            descricao:
                "Você demonstra interesse por pessoas, educação, orientação, colaboração e ajuda."
        },

        E: {
            nome: "Empreendedor",

            descricao:
                "Você demonstra interesse por liderança, decisões, negócios, projetos e iniciativa."
        },

        C: {
            nome: "Convencional",

            descricao:
                "Você demonstra interesse por organização, planejamento, processos e informações."
        }
    };

    const perfilInfo =
        perfis[perfil] ||
        perfis.I;

    // --------------------------------------------------------
    // STATUS
    // --------------------------------------------------------

    const status =
        document.getElementById(
            "statusPerfil"
        );

    if (status) {

        status.textContent =
            "Perfil descoberto";

        status.style.background =
            "#eee9ff";

        status.style.color =
            "#7352e8";
    }

    // --------------------------------------------------------
    // CÓDIGO DO PERFIL
    // --------------------------------------------------------

    const codigoElemento =
        document.getElementById(
            "codigoPerfil"
        );

    if (codigoElemento) {

        codigoElemento.textContent =
            codigo;
    }

    // --------------------------------------------------------
    // CONTEÚDO PRINCIPAL
    // --------------------------------------------------------

    const content =
        document.getElementById(
            "vocationContent"
        );

    if (content) {

        content.innerHTML = `
            <div class="vocation-result">

                <div class="result-main">

                    <div class="result-symbol">
                        ${escapeHTML(String(codigo))}
                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(perfilInfo.nome)}
                        </h3>

                        <p>
                            Seu principal perfil
                            vocacional.
                        </p>

                    </div>

                </div>

                <div class="result-description">
                    ${escapeHTML(perfilInfo.descricao)}
                </div>

            </div>
        `;
    }

    // --------------------------------------------------------
    // SOBRE SEU PERFIL
    // --------------------------------------------------------

    const aboutTitle =
        document.getElementById(
            "aboutTitle"
        );

    const aboutText =
        document.getElementById(
            "aboutText"
        );

    if (aboutTitle) {

        aboutTitle.textContent =
            `Seu perfil principal é ${perfilInfo.nome}`;
    }

    if (aboutText) {

        aboutText.textContent =
            `${perfilInfo.descricao} Explore as profissões e possibilidades relacionadas para descobrir caminhos que façam sentido para você.`;
    }

    // --------------------------------------------------------
    // ATUALIZAR PONTUAÇÕES
    // --------------------------------------------------------

    atualizarPontuacoes(
        pontuacoes
    );
}

// ============================================================
// NORMALIZAR PONTUAÇÕES
// ============================================================

function normalizarPontuacoes(pontuacoes) {

    if (!pontuacoes) {
        return {};
    }

    // --------------------------------------------------------
    // Se vier como texto JSON do banco
    // --------------------------------------------------------

    if (typeof pontuacoes === "string") {

        try {

            return JSON.parse(
                pontuacoes
            );

        } catch (erro) {

            console.warn(
                "Não foi possível interpretar as pontuações:",
                pontuacoes
            );

            return {};
        }
    }

    // --------------------------------------------------------
    // Se já for objeto
    // --------------------------------------------------------

    if (
        typeof pontuacoes === "object" &&
        !Array.isArray(pontuacoes)
    ) {

        return pontuacoes;
    }

    return {};
}

// ============================================================
// ATUALIZAR PONTUAÇÕES DOS 6 PERFIS
// ============================================================

function atualizarPontuacoes(pontuacoes) {

    const cards =
        document.querySelectorAll(
            ".interest-card"
        );

    cards.forEach(card => {

        const letraElemento =
            card.querySelector(
                ".interest-letter"
            );

        const scoreElemento =
            card.querySelector(
                ".interest-score"
            );

        if (
            !letraElemento ||
            !scoreElemento
        ) {

            return;
        }

        const letra =
            letraElemento.textContent
                .trim()
                .toUpperCase();

        let valor =
            buscarPontuacao(
                pontuacoes,
                letra
            );

        // ----------------------------------------------------
        // Se encontrou pontuação
        // ----------------------------------------------------

        if (
            valor !== undefined &&
            valor !== null &&
            valor !== ""
        ) {

            const numero =
                Number(valor);

            if (!Number.isNaN(numero)) {

                scoreElemento.textContent =
                    `${numero}%`;

            } else {

                scoreElemento.textContent =
                    String(valor);
            }

        } else {

            scoreElemento.textContent =
                "0%";
        }
    });
}

// ============================================================
// BUSCAR PONTUAÇÃO
// ============================================================

function buscarPontuacao(pontuacoes, letra) {

    if (!pontuacoes) {
        return undefined;
    }

    // Exemplo:
    // { R: 80, I: 70, A: 50 }

    if (
        pontuacoes[letra] !== undefined
    ) {

        return pontuacoes[letra];
    }

    // Exemplo:
    // { realista: 80, investigativo: 70 }

    const nomes = {

        R: [
            "realista",
            "R"
        ],

        I: [
            "investigativo",
            "I"
        ],

        A: [
            "artistico",
            "artístico",
            "A"
        ],

        S: [
            "social",
            "S"
        ],

        E: [
            "empreendedor",
            "E"
        ],

        C: [
            "convencional",
            "C"
        ]
    };

    const possibilidades =
        nomes[letra] || [];

    for (
        const nome of possibilidades
    ) {

        if (
            pontuacoes[nome] !== undefined
        ) {

            return pontuacoes[nome];
        }
    }

    return undefined;
}

// ============================================================
// PROTEGER TEXTO INSERIDO NO HTML
// ============================================================

function escapeHTML(valor) {

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ============================================================
// ESTADO SEM LOGIN
// ============================================================

function mostrarEstadoSemLogin() {

    const nomeUsuario =
        document.getElementById(
            "nomeUsuario"
        );

    const nomePerfil =
        document.getElementById(
            "nomePerfil"
        );

    const emailPerfil =
        document.getElementById(
            "emailPerfil"
        );

    const emailInfo =
        document.getElementById(
            "emailInfo"
        );

    if (nomeUsuario) {
        nomeUsuario.textContent =
            "Aluno";
    }

    if (nomePerfil) {
        nomePerfil.textContent =
            "Aluno";
    }

    if (emailPerfil) {
        emailPerfil.textContent =
            "Não informado";
    }

    if (emailInfo) {
        emailInfo.textContent =
            "Não informado";
    }

    mostrarSemResultado();
}

// ============================================================
// SAIR
// ============================================================

function sair() {

    localStorage.removeItem("aluno");
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("alunoLogado");
    localStorage.removeItem("meuFuturoAluno");

    localStorage.removeItem("aluno_id");
    localStorage.removeItem("alunoId");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("usuarioId");

    // ========================================================
    // REMOVER JWT
    // ========================================================

    localStorage.removeItem("token");

    window.location.href =
        "login.html";
}