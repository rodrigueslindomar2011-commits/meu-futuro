// ============================================================
// MEU FUTURO
// DASHBOARD DO ALUNO - COMPLETO E FUNCIONAL
// ============================================================

const API_BASE =
    window.location.protocol === "file:"
        ? "http://localhost:3000"
        : "";

let evolutionChartInstance = null;

const dashboardState = {
    aluno: null,
    perfil: null,
    resultados: [],
    profissoes: [],
    curriculo: null
};


// ============================================================
// INÍCIO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    carregarDashboard();
});



function obterAlunoStorage() {

    const fontes = [
        localStorage.getItem("aluno"),
        sessionStorage.getItem("aluno")
    ];

    for (const valor of fontes) {

        if (!valor) continue;

        try {

            const aluno = JSON.parse(valor);

            if (aluno && aluno.id) {
                return aluno;
            }

        } catch (erro) {

            console.error(
                "Erro ao ler aluno:",
                erro
            );

        }
    }

    return null;
}


// ============================================================
// API
// ============================================================

async function buscarJSON(
    url,
    nome = "API"
) {

    try {

        const token =
            localStorage.getItem("token");

        const headers = {
            Accept:
                "application/json"
        };

        if (token) {

            headers.Authorization =
                `Bearer ${token}`;

        }

        const resposta =
            await fetch(
                url,
                {
                    method: "GET",

                    headers: headers
                }
            );

        const texto =
            await resposta.text();

        let dados = null;

        if (texto) {

            try {

                dados =
                    JSON.parse(texto);

            } catch {

                dados = null;

            }

        }

        if (!resposta.ok) {

            console.warn(
                `${nome}: HTTP ${resposta.status}`,
                dados
            );

            return null;

        }

        return dados;

    } catch (erro) {

        console.error(
            `${nome}:`,
            erro
        );

        return null;

    }

}


// ============================================================
// CARREGAMENTO PRINCIPAL
// ============================================================

async function carregarDashboard() {

    console.log(
        "🚀 Carregando dashboard..."
    );


    const alunoStorage =
        obterAlunoStorage();


    if (!alunoStorage) {

        mostrarEstadoSemAluno();

        criarGrafico([]);

        return;
    }


    const alunoId =
        Number(
            alunoStorage.id
        );


    if (
        !Number.isInteger(alunoId) ||
        alunoId <= 0
    ) {

        console.error(
            "ID do aluno inválido."
        );

        mostrarEstadoSemAluno();

        return;
    }


    atualizarNome(
        alunoStorage
    );


    // ========================================================
    // BUSCAR DADOS REAIS
    // ========================================================

    const [
        dadosAluno,
        dadosPerfil,
        dadosResultados,
        dadosCurriculo
    ] = await Promise.all([

        buscarJSON(
            `${API_BASE}/api/aluno/${alunoId}`,
            "API do aluno"
        ),

        buscarJSON(
            `${API_BASE}/api/perfil/${alunoId}`,
            "API do perfil"
        ),

        buscarJSON(
            `${API_BASE}/api/resultados/${alunoId}`,
            "API dos resultados"
        ),

        buscarJSON(
            `${API_BASE}/api/curriculo/progresso/${alunoId}`,
            "API do currículo"
        )

    ]);


    // ========================================================
    // ALUNO
    // ========================================================

    const aluno =
        dadosAluno?.aluno ||
        dadosAluno ||
        alunoStorage;


    // ========================================================
    // RESULTADO DO TESTE VOCACIONAL
    //
    // IMPORTANTE:
    // O backend retorna:
    //
    // {
    //    sucesso: true,
    //    aluno: {...},
    //    resultado: {
    //       perfil_principal,
    //       codigo,
    //       pontuacoes
    //    },
    //    respostas: [...]
    // }
    //
    // Portanto precisamos pegar dadosPerfil.resultado.
    // ========================================================

   // ========================================================
// RESULTADO REAL DO TESTE VOCACIONAL
// ========================================================

const resultadosReais =
    Array.isArray(dadosResultados?.resultados)
        ? dadosResultados.resultados
        : [];

const ultimoResultado =
    resultadosReais.length > 0
        ? resultadosReais[0]
        : null;

const perfil =
    dadosPerfil?.resultado ||
    dadosPerfil?.perfil ||
    ultimoResultado ||
    null;


    // ========================================================
    // HISTÓRICO
    // ========================================================

    const resultados =
        extrairResultados(
            dadosResultados
        );


    // ========================================================
    // CURRÍCULO
    // ========================================================

    const curriculo =
        dadosCurriculo?.sucesso === false
            ? null
            : dadosCurriculo;


    // ========================================================
    // PROFISSÕES
    // ========================================================

    const profissoes =
        gerarProfissoesDoPerfil(
            perfil
        );


    // ========================================================
    // SALVAR ESTADO
    // ========================================================

    dashboardState.aluno =
        aluno;

    dashboardState.perfil =
        perfil;

    dashboardState.resultados =
        resultados;

    dashboardState.profissoes =
        profissoes;

    dashboardState.curriculo =
        curriculo;


    // ========================================================
    // ATUALIZAR STORAGE
    // ========================================================

    if (aluno) {

        localStorage.setItem(
            "aluno",
            JSON.stringify(aluno)
        );

    }


    // ========================================================
    // ATUALIZAR DASHBOARD
    // ========================================================

    atualizarNome(
        aluno
    );


    atualizarPerfil(
        aluno,
        perfil
    );


    atualizarProgresso(
        aluno,
        perfil,
        curriculo,
        profissoes
    );


    atualizarProximoPasso(
        aluno,
        perfil,
        curriculo,
        profissoes
    );


    atualizarMetas(
        aluno,
        perfil,
        curriculo,
        profissoes
    );


    atualizarListaCarreiras(
        profissoes
    );


    atualizarGrafico(
        resultados
    );


    console.log(
        "✅ Dashboard carregada.",
        dashboardState
    );
}


// ============================================================
// HISTÓRICO DE RESULTADOS
// ============================================================

function extrairResultados(
    dados
) {

    if (!dados) {
        return [];
    }


    if (Array.isArray(dados)) {
        return dados;
    }


    if (
        Array.isArray(
            dados.resultados
        )
    ) {

        return dados.resultados;

    }


    if (
        Array.isArray(
            dados.historico
        )
    ) {

        return dados.historico;

    }


    // Caso o backend retorne apenas
    // um resultado individual.

    if (dados.resultado) {

        return [
            dados.resultado
        ];

    }


    return [];
}


// ============================================================
// NOME
// ============================================================

function atualizarNome(
    aluno
) {

    const nomeCompleto =
        String(
            aluno?.nome ||
            "Aluno"
        ).trim();


    const primeiroNome =
        nomeCompleto
            .split(/\s+/)[0] ||
        "Aluno";


    const nomeUsuario =
        document.getElementById(
            "nomeUsuario"
        );


    const nomeHero =
        document.getElementById(
            "nomeHero"
        );


    const avatar =
        document.getElementById(
            "avatar"
        );


    if (nomeUsuario) {

        nomeUsuario.textContent =
            primeiroNome;

    }


    if (nomeHero) {

        nomeHero.textContent =
            primeiroNome;

    }


    if (avatar) {

        avatar.textContent =
            primeiroNome
                .charAt(0)
                .toUpperCase();

    }
}


// ============================================================
// PONTUAÇÕES DO TESTE
// ============================================================

function obterPontuacoes(
    perfil
) {

    if (!perfil) {
        return {};
    }


    let pontuacoes =
        perfil.pontuacoes ||
        perfil.scores ||
        {};


    if (
        typeof pontuacoes ===
        "string"
    ) {

        try {

            pontuacoes =
                JSON.parse(
                    pontuacoes
                );

        } catch {

            pontuacoes = {};

        }
    }


    if (
        !pontuacoes ||
        typeof pontuacoes !==
        "object"
    ) {

        return {};

    }


    const resultado = {};


    Object.keys(
        pontuacoes
    ).forEach(
        chave => {

            const valor =
                Number(
                    pontuacoes[chave]
                );


            if (
                Number.isFinite(
                    valor
                )
            ) {

                resultado[
                    String(chave)
                        .trim()
                        .toUpperCase()
                ] = valor;

            }

        }
    );


    return resultado;
}


// ============================================================
// PERFIL DESCOBERTO
// ============================================================

function atualizarPerfil(
    aluno,
    perfil
) {

    const area =
        document.getElementById(
            "areaInteresse"
        );


    if (!area) {
        return;
    }


    // Primeiro usamos o resultado real
    // do teste vocacional.

    const perfilPrincipal =
        perfil?.perfil_principal ||
        perfil?.perfil ||
        perfil?.codigo ||
        "";


    const areaAluno =
        aluno?.area_interesse ||
        "";


   const nomesPerfis = {
    R: "Realista",
    I: "Investigativo",
    A: "Artístico",
    S: "Social",
    E: "Empreendedor",
    C: "Convencional"
};

const codigo =
    String(
        perfilPrincipal ||
        areaAluno ||
        ""
    )
        .trim()
        .toUpperCase();

const nomePerfil =
    nomesPerfis[codigo] ||
    formatarTexto(codigo) ||
    "Ainda não definido";

area.textContent =
    nomePerfil;
}


// ============================================================
// CATÁLOGO DE PROFISSÕES
// ============================================================

const catalogoProfissoes = [

    {
        nome:
            "Desenvolvimento de software",

        descricao:
            "Tecnologia • Programação • Soluções",

        icone:
            "💻",

        perfis:
            ["R", "I"]
    },

    {
        nome:
            "Engenharia",

        descricao:
            "Projetos • Tecnologia • Resolução de problemas",

        icone:
            "🚀",

        perfis:
            ["R", "I"]
    },

    {
        nome:
            "Análise de dados",

        descricao:
            "Dados • Pesquisa • Tecnologia",

        icone:
            "📊",

        perfis:
            ["I", "C"]
    },

    {
        nome:
            "Psicologia",

        descricao:
            "Pessoas • Comportamento • Desenvolvimento",

        icone:
            "🧠",

        perfis:
            ["S", "I"]
    },

    {
        nome:
            "Professor",

        descricao:
            "Educação • Pessoas • Comunicação",

        icone:
            "📚",

        perfis:
            ["S", "A"]
    },

    {
        nome:
            "Designer",

        descricao:
            "Criatividade • Design • Comunicação",

        icone:
            "🎨",

        perfis:
            ["A", "R"]
    },

    {
        nome:
            "Publicidade",

        descricao:
            "Comunicação • Criatividade • Marketing",

        icone:
            "📣",

        perfis:
            ["A", "E"]
    },

    {
        nome:
            "Administração",

        descricao:
            "Negócios • Organização • Gestão",

        icone:
            "💼",

        perfis:
            ["E", "C"]
    },

    {
        nome:
            "Empreendedorismo",

        descricao:
            "Negócios • Liderança • Estratégia",

        icone:
            "🚀",

        perfis:
            ["E", "A"]
    },

    {
        nome:
            "Contabilidade",

        descricao:
            "Finanças • Organização • Gestão",

        icone:
            "🧮",

        perfis:
            ["C", "E"]
    },

    {
        nome:
            "Pesquisa científica",

        descricao:
            "Ciência • Pesquisa • Descobertas",

        icone:
            "🔬",

        perfis:
            ["I", "C"]
    },

    {
        nome:
            "Enfermagem",

        descricao:
            "Saúde • Pessoas • Cuidado",

        icone:
            "🩺",

        perfis:
            ["S", "I"]
    }

];


// ============================================================
// GERAR PROFISSÕES
// ============================================================

function gerarProfissoesDoPerfil(
    perfil
) {

    const pontuacoes =
        obterPontuacoes(
            perfil
        );


    const codigos = [
        "R",
        "I",
        "A",
        "S",
        "E",
        "C"
    ];


    const possuiResultado =
        codigos.some(
            codigo =>
                Number.isFinite(
                    pontuacoes[codigo]
                )
        );


    if (!possuiResultado) {
        return [];
    }


    const valoresTotais =
        codigos.map(
            codigo =>
                Number(
                    pontuacoes[codigo] ||
                    0
                )
        );


    const maiorPontuacao =
        Math.max(
            ...valoresTotais
        );


    if (
        !Number.isFinite(
            maiorPontuacao
        ) ||
        maiorPontuacao <= 0
    ) {

        return [];

    }


    return catalogoProfissoes

        .map(
            profissao => {

                const valores =
                    profissao.perfis.map(
                        codigo =>
                            Number(
                                pontuacoes[
                                    codigo
                                ] || 0
                            )
                    );


                const media =
                    valores.reduce(
                        (
                            total,
                            valor
                        ) =>
                            total + valor,
                        0
                    ) /
                    valores.length;


                const compatibilidade =
                    Math.round(
                        (
                            media /
                            maiorPontuacao
                        ) * 100
                    );


                return {

                    ...profissao,

                    compatibilidade:
                        Math.max(
                            0,
                            Math.min(
                                100,
                                compatibilidade
                            )
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


// ============================================================
// QUANTIDADE DE CARREIRAS
// ============================================================

function atualizarQuantidadeCarreiras(
    profissoes
) {

    const elemento =
        document.getElementById(
            "quantidadeCarreiras"
        );


    if (!elemento) {
        return;
    }


    elemento.textContent =
        profissoes.length;
}


// ============================================================
// LISTA DE CARREIRAS
// ============================================================

function atualizarListaCarreiras(
    profissoes
) {

    const lista =
        document.getElementById(
            "careerList"
        );


    if (!lista) {
        return;
    }


    atualizarQuantidadeCarreiras(
        profissoes
    );


    if (
        !Array.isArray(
            profissoes
        ) ||
        profissoes.length === 0
    ) {

        lista.innerHTML = `
            <div class="data-empty">
                Faça o teste vocacional para descobrir suas possibilidades de carreira.
            </div>
        `;

        return;
    }


    const principais =
        profissoes.slice(
            0,
            4
        );


    lista.innerHTML = "";


    principais.forEach(
        profissao => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "career";


            div.innerHTML = `

                <div class="career-icon">
                    ${profissao.icone}
                </div>

                <div class="career-info">

                    <strong>
                        ${escaparHTML(
                            profissao.nome
                        )}
                    </strong>

                    <span>
                        ${escaparHTML(
                            profissao.descricao
                        )}
                    </span>

                </div>

                <div class="match">

                    <strong>
                        ${profissao.compatibilidade}%
                    </strong>

                    <small>
                        compatibilidade
                    </small>

                </div>

            `;


            lista.appendChild(
                div
            );

        }
    );
}


// ============================================================
// ESTADO DA JORNADA
// ============================================================

function calcularEstadoJornada(
    aluno,
    perfil,
    curriculo,
    profissoes
) {

    const perfilConcluido =
        Boolean(
            aluno?.id
        );


    const pontuacoes =
        obterPontuacoes(
            perfil
        );


    const possuiPontuacoes =
        Object.keys(
            pontuacoes
        ).length > 0;


    const testeConcluido =
        Boolean(
            perfil?.id ||
            perfil?.perfil_principal ||
            perfil?.codigo ||
            possuiPontuacoes
        );


    const progressoCurriculo =
        Number(
            curriculo?.progresso ||
            0
        );


    const curriculoConcluido =
        progressoCurriculo >=
        100;


    const carreirasDisponiveis =
        Array.isArray(
            profissoes
        ) &&
        profissoes.length > 0;


    const etapas = [

        {
            id:
                "perfil",

            nome:
                "Criar perfil",

            concluida:
                perfilConcluido,

            descricao:
                perfilConcluido
                    ? "Cadastro encontrado."
                    : "Complete seu cadastro."
        },

        {
            id:
                "teste",

            nome:
                "Descobrir interesses",

            concluida:
                testeConcluido,

            descricao:
                testeConcluido
                    ? "Resultado vocacional encontrado."
                    : "Faça o teste vocacional."
        },

        {
            id:
                "curriculo",

            nome:
                "Construir currículo",

            concluida:
                curriculoConcluido,

            descricao:
                curriculoConcluido
                    ? "Currículo completo."
                    : progressoCurriculo > 0
                        ? `Currículo ${Math.round(
                            progressoCurriculo
                        )}% preenchido.`
                        : "Comece seu currículo."
        },

        {
            id:
                "carreiras",

            nome:
                "Explorar profissões",

            concluida:
                carreirasDisponiveis,

            descricao:
                carreirasDisponiveis
                    ? `${profissoes.length} possibilidades encontradas.`
                    : "Faça o teste para receber possibilidades."
        }

    ];


    const etapasConcluidas =
        etapas.filter(
            etapa =>
                etapa.concluida
        ).length;


    const progresso =
        Math.round(

            (
                (perfilConcluido
                    ? 25
                    : 0)

                +

                (testeConcluido
                    ? 25
                    : 0)

                +

                Math.min(
                    25,
                    progressoCurriculo *
                    0.25
                )

                +

                (carreirasDisponiveis
                    ? 25
                    : 0)
            )

        );


    return {

        etapas,

        etapasConcluidas,

        progresso,

        progressoCurriculo

    };
}


// ============================================================
// ATUALIZAR PROGRESSO
// ============================================================

function atualizarProgresso(
    aluno,
    perfil,
    curriculo,
    profissoes
) {

    const dados =
        calcularEstadoJornada(
            aluno,
            perfil,
            curriculo,
            profissoes
        );


    const progresso =
        Math.max(
            0,
            Math.min(
                100,
                dados.progresso
            )
        );


    const elemento =
        document.getElementById(
            "progressoJornada"
        );


    const barra =
        document.getElementById(
            "barraProgressoJornada"
        );


    const etapas =
        document.getElementById(
            "etapasConcluidas"
        );


    const textoEtapas =
        document.getElementById(
            "progressoEtapas"
        );


    if (elemento) {

        elemento.textContent =
            `${progresso}%`;

    }


    if (barra) {

        barra.style.width =
            `${progresso}%`;

    }


    if (etapas) {

        etapas.textContent =
            `${dados.etapasConcluidas} de ${dados.etapas.length}`;

    }


    if (textoEtapas) {

        textoEtapas.textContent =
            dados.etapasConcluidas ===
            dados.etapas.length

                ? "Jornada principal concluída"

                : `${dados.etapasConcluidas} etapa(s) concluída(s)`;

    }
}


// ============================================================
// PRÓXIMO PASSO
// ============================================================

function atualizarProximoPasso(
    aluno,
    perfil,
    curriculo,
    profissoes
) {

    const dados =
        calcularEstadoJornada(
            aluno,
            perfil,
            curriculo,
            profissoes
        );


    const proxima =
        dados.etapas.find(
            etapa =>
                !etapa.concluida
        );


    const titulo =
        document.getElementById(
            "nextTitle"
        );


    const descricao =
        document.getElementById(
            "nextDescription"
        );


    const link =
        document.getElementById(
            "nextLink"
        );


    const numero =
        document.getElementById(
            "nextNumber"
        );


    const tag =
        document.getElementById(
            "nextTag"
        );


    if (!proxima) {

        if (numero) {

            numero.textContent =
                "✓";

        }


        if (tag) {

            tag.textContent =
                "JORNADA";

        }


        if (titulo) {

            titulo.textContent =
                "Continue explorando seu futuro";

        }


        if (descricao) {

            descricao.textContent =
                "As etapas principais foram concluídas. Você pode continuar explorando profissões, faculdades e oportunidades.";

        }


        if (link) {

            link.href =
                "profissões.html";

            link.textContent =
                "Explorar profissões →";

        }


        atualizarSteps(
            dados.etapas
        );


        return;
    }


    const indice =
        dados.etapas.indexOf(
            proxima
        );


    if (numero) {

        numero.textContent =
            String(
                indice + 1
            ).padStart(
                2,
                "0"
            );

    }


    if (tag) {

        tag.textContent =
            "RECOMENDADO";

    }


    if (titulo) {

        titulo.textContent =
            proxima.nome;

    }


    if (descricao) {

        descricao.textContent =
            proxima.descricao;

    }


    const links = {

        perfil:
            "perfil.html",

        teste:
            "questionarios.html",

        curriculo:
            "curriculo.html",

        carreiras:
            "profissões.html"

    };


    const textos = {

        perfil:
            "Completar perfil →",

        teste:
            "Fazer questionário →",

        curriculo:
            "Abrir currículo →",

        carreiras:
            "Explorar profissões →"

    };


    if (link) {

        link.href =
            links[
                proxima.id
            ] ||
            "planejamento.html";


        link.textContent =
            textos[
                proxima.id
            ] ||
            "Continuar →";

    }


    atualizarSteps(
        dados.etapas
    );
}


// ============================================================
// ETAPAS VISUAIS
// ============================================================

function atualizarSteps(
    etapas
) {

    const container =
        document.getElementById(
            "journeySteps"
        );


    if (!container) {
        return;
    }


    const steps =
        container.querySelectorAll(
            ".step"
        );


    steps.forEach(
        (
            step,
            index
        ) => {

            const etapa =
                etapas[index];


            if (!etapa) {
                return;
            }


            step.classList.remove(
                "completed",
                "active-step"
            );


            const span =
                step.querySelector(
                    "span"
                );


            if (
                etapa.concluida
            ) {

                step.classList.add(
                    "completed"
                );


                if (span) {

                    span.textContent =
                        "✓";

                }


                return;
            }


            const existePendenteAntes =
                etapas
                    .slice(
                        0,
                        index
                    )
                    .some(
                        item =>
                            !item.concluida
                    );


            if (
                !existePendenteAntes
            ) {

                step.classList.add(
                    "active-step"
                );

            }


            if (span) {

                span.textContent =
                    String(
                        index + 1
                    );

            }

        }
    );
}


// ============================================================
// METAS
// ============================================================

function atualizarMetas(
    aluno,
    perfil,
    curriculo,
    profissoes
) {

    const lista =
        document.getElementById(
            "goalsList"
        );


    if (!lista) {
        return;
    }


    const dados =
        calcularEstadoJornada(
            aluno,
            perfil,
            curriculo,
            profissoes
        );


    lista.innerHTML =
        "";


    dados.etapas.forEach(
        (
            etapa,
            index
        ) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "goal";


            const primeiraPendente =
                !etapa.concluida &&

                !dados.etapas
                    .slice(
                        0,
                        index
                    )
                    .some(
                        item =>
                            !item.concluida
                    );


            if (
                primeiraPendente
            ) {

                div.classList.add(
                    "is-next"
                );

            }


            const check =
                document.createElement(
                    "div"
                );


            check.className =
                "goal-check";


            if (
                etapa.concluida
            ) {

                check.classList.add(
                    "done"
                );


                check.textContent =
                    "✓";

            } else {

                check.textContent =
                    String(
                        index + 1
                    );


                if (
                    primeiraPendente
                ) {

                    check.classList.add(
                        "is-next"
                    );

                }

            }


            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "goal-content";


            const strong =
                document.createElement(
                    "strong"
                );


            strong.textContent =
                etapa.nome;


            const small =
                document.createElement(
                    "small"
                );


            small.textContent =
                etapa.concluida
                    ? "Concluído"
                    : etapa.descricao;


            content.appendChild(
                strong
            );


            content.appendChild(
                small
            );


            div.appendChild(
                check
            );


            div.appendChild(
                content
            );


            lista.appendChild(
                div
            );

        }
    );
}


// ============================================================
// GRÁFICO
// ============================================================

function atualizarGrafico(
    resultados
) {

    criarGrafico(
        Array.isArray(
            resultados
        )
            ? resultados
            : []
    );
}


// ============================================================
// PONTUAÇÃO PRINCIPAL DO GRÁFICO
// ============================================================

function obterPontuacaoPrincipal(
    resultado
) {

    if (!resultado) {
        return null;
    }


    let pontuacoes =
        resultado.pontuacoes ||
        {};


    if (
        typeof pontuacoes ===
        "string"
    ) {

        try {

            pontuacoes =
                JSON.parse(
                    pontuacoes
                );

        } catch {

            pontuacoes = {};

        }

    }


    const perfil =
        String(
            resultado.perfil_principal ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        perfil &&
        Number.isFinite(
            Number(
                pontuacoes[
                    perfil
                ]
            )
        )
    ) {

        return Number(
            pontuacoes[
                perfil
            ]
        );

    }


    const valores =
        Object.values(
            pontuacoes
        )
            .map(
                Number
            )
            .filter(
                valor =>
                    Number.isFinite(
                        valor
                    )
            );


    if (
        !valores.length
    ) {

        return null;

    }


    return Math.max(
        ...valores
    );
}


// ============================================================
// CRIAR GRÁFICO
// ============================================================

function criarGrafico(
    resultados = []
) {

    const canvas =
        document.getElementById(
            "evolutionChart"
        );


    if (!canvas) {
        return;
    }


    if (
        typeof Chart ===
        "undefined"
    ) {

        console.error(
            "Chart.js não foi carregado."
        );

        return;
    }


    if (
        evolutionChartInstance
    ) {

        evolutionChartInstance.destroy();

        evolutionChartInstance =
            null;

    }


    const historico =
        resultados
            .slice()
            .sort(
                (
                    a,
                    b
                ) =>

                    new Date(
                        a.created_at ||
                        0
                    ) -

                    new Date(
                        b.created_at ||
                        0
                    )
            );


    const labels = [];
    const valores = [];


    historico.forEach(
        (
            resultado,
            index
        ) => {

            const valor =
                obterPontuacaoPrincipal(
                    resultado
                );


            if (
                !Number.isFinite(
                    valor
                )
            ) {

                return;

            }


            const data =
                resultado.created_at
                    ? new Date(
                        resultado.created_at
                    )
                    : null;


            const label =
                data &&
                !Number.isNaN(
                    data.getTime()
                )

                    ? data.toLocaleDateString(
                        "pt-BR",
                        {
                            day:
                                "2-digit",

                            month:
                                "2-digit"
                        }
                    )

                    : `Resultado ${index + 1}`;


            labels.push(
                label
            );


            valores.push(
                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(
                            valor
                        )
                    )
                )
            );

        }
    );


    if (
        !valores.length
    ) {

        labels.push(
            "Sem resultado"
        );

        valores.push(
            0
        );

    }


    evolutionChartInstance =
        new Chart(
            canvas,
            {

                type:
                    "line",

                data: {

                    labels:

                        labels,

                    datasets: [

                        {

                            label:
                                "Pontuação",

                            data:
                                valores,

                            borderWidth:
                                3,

                            tension:
                                0.4,

                            fill:
                                true,

                            backgroundColor:
                                "rgba(108, 92, 231, 0.08)",

                            borderColor:
                                "#6c5ce7",

                            pointBackgroundColor:
                                "#ffffff",

                            pointBorderColor:
                                "#6c5ce7",

                            pointBorderWidth:
                                2,

                            pointRadius:
                                4

                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    plugins: {

                        legend: {

                            display:
                                false

                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    contexto =>
                                        ` ${contexto.parsed.y}%`

                            }

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero:
                                true,

                            max:
                                100,

                            grid: {

                                color:
                                    "#f0f1f5"

                            },

                            ticks: {

                                color:
                                    "#a0a4b2",

                                font: {

                                    size:
                                        9

                                },

                                callback:
                                    valor =>
                                        `${valor}%`

                            }

                        },

                        x: {

                            grid: {

                                display:
                                    false

                            },

                            ticks: {

                                color:
                                    "#a0a4b2",

                                font: {

                                    size:
                                        9

                                }

                            }

                        }

                    }

                }

            }
        );
}


// ============================================================
// CURRÍCULO
// ============================================================

function abrirCurriculo() {

    window.location.href =
        "curriculo.html";
}


function prepararCurriculo() {

    const aluno =
        dashboardState.aluno ||
        obterAlunoStorage();


    if (!aluno) {

        abrirCurriculo();

        return;
    }


    const dadosCurriculo = {

        nome:
            aluno.nome || "",

        email:
            aluno.email || "",

        idade:
            aluno.idade || "",

        escola:
            aluno.escola || "",

        cidade:
            aluno.cidade || "",

        area_interesse:
            aluno.area_interesse || "",

        profissao_desejada:
            aluno.profissao_desejada || "",

        objetivo:
            aluno.objetivo || "",

        perfil:
            aluno.perfil ||
            dashboardState
                .perfil
                ?.perfil_principal ||
            ""

    };


    localStorage.setItem(
        "dadosCurriculo",
        JSON.stringify(
            dadosCurriculo
        )
    );


    abrirCurriculo();
}


window.abrirCurriculo =
    abrirCurriculo;


window.prepararCurriculo =
    prepararCurriculo;


// ============================================================
// SAIR
// ============================================================

function sair() {

    localStorage.removeItem(
        "aluno"
    );


    sessionStorage.removeItem(
        "aluno"
    );


    localStorage.removeItem(
        "dadosCurriculo"
    );


    window.location.href =
        "../login.html";
}


window.sair =
    sair;


// ============================================================
// SEM ALUNO
// ============================================================

function mostrarEstadoSemAluno() {

    atualizarNome({
        nome:
            "Aluno"
    });


    const careerList =
        document.getElementById(
            "careerList"
        );


    if (careerList) {

        careerList.innerHTML = `
            <div class="dashboard-error">
                Nenhum aluno conectado. Faça login novamente.
            </div>
        `;

    }


    const goalsList =
        document.getElementById(
            "goalsList"
        );


    if (goalsList) {

        goalsList.innerHTML = `
            <div class="dashboard-error">
                Nenhum aluno conectado. Faça login novamente.
            </div>
        `;

    }


    const progresso =
        document.getElementById(
            "progressoJornada"
        );


    const barra =
        document.getElementById(
            "barraProgressoJornada"
        );


    const etapas =
        document.getElementById(
            "etapasConcluidas"
        );


    const quantidade =
        document.getElementById(
            "quantidadeCarreiras"
        );


    if (progresso) {

        progresso.textContent =
            "0%";

    }


    if (barra) {

        barra.style.width =
            "0%";

    }


    if (etapas) {

        etapas.textContent =
            "0 de 4";

    }


    if (quantidade) {

        quantidade.textContent =
            "0";

    }


    const area =
        document.getElementById(
            "areaInteresse"
        );


    if (area) {

        area.textContent =
            "Ainda não definido";

    }
}


// ============================================================
// FORMATAR TEXTO
// ============================================================

function formatarTexto(
    valor
) {

    if (!valor) {
        return "Ainda não definido";
    }


    return String(
        valor
    )
        .replaceAll(
            "_",
            " "
        )
        .replace(
            /\b\w/g,
            letra =>
                letra.toUpperCase()
        );
}


// ============================================================
// SEGURANÇA HTML
// ============================================================

function escaparHTML(
    valor
) {

    return String(
        valor ?? ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}



/* MENU LATERAL PARA CELULAR */
document.addEventListener("DOMContentLoaded", () => {
    const botaoAbrir = document.getElementById("menuToggle");
    const botaoFechar = document.getElementById("sidebarClose");
    const overlay = document.getElementById("sidebarOverlay");
    const sidebar = document.getElementById("sidebar");

    if (!botaoAbrir || !botaoFechar || !overlay || !sidebar) {
        return;
    }

    function abrirMenu() {
        document.body.classList.add("menu-open");
        botaoAbrir.setAttribute("aria-expanded", "true");
        botaoAbrir.setAttribute("aria-label", "Fechar menu");
    }

    function fecharMenu() {
        document.body.classList.remove("menu-open");
        botaoAbrir.setAttribute("aria-expanded", "false");
        botaoAbrir.setAttribute("aria-label", "Abrir menu");
    }

    botaoAbrir.addEventListener("click", () => {
        if (document.body.classList.contains("menu-open")) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });

    botaoFechar.addEventListener("click", fecharMenu);
    overlay.addEventListener("click", fecharMenu);

    sidebar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            fecharMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            fecharMenu();
        }
    });
});

// ============================================================
// DEBUG
// ============================================================

window.dashboardState =
    dashboardState;


console.log(
    "✅ dashboard.js carregado corretamente."
);