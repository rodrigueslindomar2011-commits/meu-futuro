/* =====================================================
   MEU FUTURO
   TESTE VOCACIONAL
===================================================== */


/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const API_URL = "/api";


/* =====================================================
   ELEMENTOS
===================================================== */

const introScreen =
    document.getElementById("introScreen");

const questionScreen =
    document.getElementById("questionScreen");

const loadingScreen =
    document.getElementById("loadingScreen");

const resultScreen =
    document.getElementById("resultScreen");

const startButton =
    document.getElementById("startButton");

const nextButton =
    document.getElementById("nextButton");

const backButton =
    document.getElementById("backButton");

const restartButton =
    document.getElementById("restartButton");

const dashboardButton =
    document.getElementById("dashboardButton");

const possibilitiesButton =
    document.getElementById("possibilitiesButton");

const questionText =
    document.getElementById("questionText");

const questionNumber =
    document.getElementById("questionNumber");

const questionCounter =
    document.getElementById("questionCounter");

const progressPercent =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

const answersContainer =
    document.getElementById("answersContainer");


/* =====================================================
   ESTADO
===================================================== */

let perguntas = [];

let perguntaAtual = 0;

let respostas = {};

let alternativaSelecionada = null;

let ultimoResultado = null;


/* =====================================================
   PERFIS
===================================================== */

const nomesPerfis = {

    R: "Realista",

    I: "Investigativo",

    A: "Artístico",

    S: "Social",

    E: "Empreendedor",

    C: "Convencional"

};


const iconesPerfis = {

    R: "🔧",

    I: "🔬",

    A: "🎨",

    S: "🤝",

    E: "🚀",

    C: "📋"

};


const descricoesPerfis = {

    R:
        "Você demonstra interesse por atividades práticas, construção, tecnologia, ferramentas e pela resolução de problemas de forma concreta.",

    I:
        "Você demonstra curiosidade, gosta de investigar, compreender problemas, pesquisar informações e descobrir como as coisas funcionam.",

    A:
        "Você demonstra criatividade, imaginação e interesse por expressão, criação, comunicação visual e novas ideias.",

    S:
        "Você demonstra interesse por pessoas, colaboração, comunicação, ensino, orientação e atividades que geram impacto positivo.",

    E:
        "Você demonstra iniciativa, liderança, capacidade de decisão, comunicação e interesse por negócios e novos projetos.",

    C:
        "Você demonstra organização, atenção aos detalhes, planejamento e interesse por processos, informações e estrutura."

};


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ---------------------------------------------
           BOTÃO INICIAR
        --------------------------------------------- */

        if (startButton) {

            startButton.addEventListener(
                "click",
                iniciarTeste
            );

        }


        /* ---------------------------------------------
           BOTÃO PRÓXIMA
        --------------------------------------------- */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                avancarPergunta
            );

        }


        /* ---------------------------------------------
           BOTÃO VOLTAR
        --------------------------------------------- */

        if (backButton) {

            backButton.addEventListener(
                "click",
                voltarPergunta
            );

        }


        /* ---------------------------------------------
           BOTÃO REFAZER
        --------------------------------------------- */

        if (restartButton) {

            restartButton.addEventListener(
                "click",
                refazerTeste
            );

        }


        /* ---------------------------------------------
           BOTÃO DASHBOARD
        --------------------------------------------- */

        if (dashboardButton) {

            dashboardButton.addEventListener(
                "click",
                irParaDashboard
            );

        }


        /* ---------------------------------------------
           BOTÃO POSSIBILIDADES
        --------------------------------------------- */

        if (possibilitiesButton) {

            possibilitiesButton.addEventListener(
                "click",
                irParaPossibilidades
            );

        }


        /* ---------------------------------------------
           RECUPERAR RESULTADO
        --------------------------------------------- */

        const resultadoSalvo =
            obterResultadoSalvo();

        if (resultadoSalvo) {

            ultimoResultado =
                resultadoSalvo;

        }

    }
);


/* =====================================================
   INICIAR TESTE
===================================================== */

async function iniciarTeste() {

    try {

        if (!startButton) {
            return;
        }


        startButton.disabled = true;


        startButton.innerHTML =
            "Preparando teste...";


        await carregarPerguntas();


        perguntaAtual = 0;

        respostas = {};

        alternativaSelecionada = null;


        mostrarTela(
            questionScreen
        );


        mostrarPergunta();


    } catch (erro) {

        console.error(
            "Erro ao iniciar teste:",
            erro
        );


        alert(
            "Não foi possível carregar o teste. Verifique se o servidor está funcionando."
        );


        startButton.disabled = false;


        startButton.innerHTML =
            'Começar descoberta <span>→</span>';

    }

}


/* =====================================================
   CARREGAR PERGUNTAS
===================================================== */

async function carregarPerguntas() {

    const resposta =
        await fetch(
            `${API_URL}/teste-vocacional/perguntas`
        );


    if (!resposta.ok) {

        throw new Error(
            "Erro ao carregar perguntas."
        );

    }


    const dados =
        await resposta.json();


    perguntas =
        Array.isArray(
            dados.perguntas
        )
            ? dados.perguntas
            : [];


    if (perguntas.length === 0) {

        throw new Error(
            "Nenhuma pergunta encontrada."
        );

    }

}


/* =====================================================
   MOSTRAR PERGUNTA
===================================================== */

function mostrarPergunta() {

    const pergunta =
        perguntas[
            perguntaAtual
        ];


    if (!pergunta) {
        return;
    }


    /* ---------------------------------------------
       Recupera resposta anterior
    --------------------------------------------- */

    alternativaSelecionada =
        respostas[
            pergunta.id
        ] || null;


    /* ---------------------------------------------
       Número da pergunta
    --------------------------------------------- */

    if (questionNumber) {

        questionNumber.textContent =
            String(
                perguntaAtual + 1
            ).padStart(
                2,
                "0"
            );

    }


    /* ---------------------------------------------
       Contador
    --------------------------------------------- */

    if (questionCounter) {

        questionCounter.textContent =
            `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    }


    /* ---------------------------------------------
       Pergunta
    --------------------------------------------- */

    if (questionText) {

        questionText.textContent =
            pergunta.pergunta;

    }


    /* ---------------------------------------------
       Progresso
    --------------------------------------------- */

    const porcentagem =
        Math.round(
            (
                (
                    perguntaAtual + 1
                ) /
                perguntas.length
            ) * 100
        );


    if (progressPercent) {

        progressPercent.textContent =
            `${porcentagem}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${porcentagem}%`;

    }


    /* ---------------------------------------------
       Alternativas
    --------------------------------------------- */

    renderizarAlternativas(
        pergunta
    );


    /* ---------------------------------------------
       Botões
    --------------------------------------------- */

    atualizarBotoes();

}


/* =====================================================
   RENDERIZAR ALTERNATIVAS
===================================================== */

function renderizarAlternativas(
    pergunta
) {

    if (!answersContainer) {
        return;
    }


    answersContainer.innerHTML =
        "";


    const alternativas =
        Array.isArray(
            pergunta.alternativas
        )
            ? pergunta.alternativas
            : [];


    alternativas.forEach(
        alternativa => {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "answer-card";


            /* -----------------------------------------
               Seleção anterior
            ----------------------------------------- */

            if (
                alternativa.letra ===
                alternativaSelecionada
            ) {

                card.classList.add(
                    "selected"
                );

            }


            /* -----------------------------------------
               LETRA
            ----------------------------------------- */

            const letra =
                document.createElement(
                    "span"
                );


            letra.className =
                "answer-letter";


            letra.textContent =
                alternativa.letra || "";


            /* -----------------------------------------
               TÍTULO
            ----------------------------------------- */

            const titulo =
                document.createElement(
                    "span"
                );


            titulo.className =
                "answer-title";


            titulo.textContent =
                alternativa.titulo || "";


            /* -----------------------------------------
               DESCRIÇÃO
            ----------------------------------------- */

            const descricao =
                document.createElement(
                    "span"
                );


            descricao.className =
                "answer-description";


            descricao.textContent =
                alternativa.descricao || "";


            /* -----------------------------------------
               MONTA CARD
            ----------------------------------------- */

            card.appendChild(
                letra
            );


            card.appendChild(
                titulo
            );


            card.appendChild(
                descricao
            );


            /* -----------------------------------------
               CLIQUE
            ----------------------------------------- */

            card.addEventListener(
                "click",
                () => {

                    selecionarAlternativa(
                        alternativa.letra
                    );

                }
            );


            answersContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   SELECIONAR ALTERNATIVA
===================================================== */

function selecionarAlternativa(
    letra
) {

    alternativaSelecionada =
        letra;


    const pergunta =
        perguntas[
            perguntaAtual
        ];


    if (!pergunta) {
        return;
    }


    respostas[
        pergunta.id
    ] = letra;


    /* ---------------------------------------------
       Remove seleção
    --------------------------------------------- */

    document
        .querySelectorAll(
            ".answer-card"
        )
        .forEach(
            card => {

                card.classList.remove(
                    "selected"
                );

            }
        );


    /* ---------------------------------------------
       Adiciona seleção
    --------------------------------------------- */

    const cards =
        document.querySelectorAll(
            ".answer-card"
        );


    cards.forEach(
        card => {

            const letraCard =
                card
                    .querySelector(
                        ".answer-letter"
                    )
                    ?.textContent
                    ?.trim();


            if (
                letraCard ===
                letra
            ) {

                card.classList.add(
                    "selected"
                );

            }

        }
    );


    atualizarBotoes();

}


/* =====================================================
   ATUALIZAR BOTÕES
===================================================== */

function atualizarBotoes() {

    /* ---------------------------------------------
       PRÓXIMA
    --------------------------------------------- */

    if (nextButton) {

        nextButton.disabled =
            !alternativaSelecionada;


        nextButton.classList.toggle(
            "disabled",
            !alternativaSelecionada
        );


        if (
            perguntaAtual ===
            perguntas.length - 1
        ) {

            nextButton.innerHTML =
                'Finalizar descoberta <span>✦</span>';

        } else {

            nextButton.innerHTML =
                'Próxima <span>→</span>';

        }

    }


    /* ---------------------------------------------
       VOLTAR
    --------------------------------------------- */

    if (backButton) {

        if (
            perguntaAtual === 0
        ) {

            backButton.disabled =
                true;

            backButton.style.opacity =
                "0.45";

        } else {

            backButton.disabled =
                false;

            backButton.style.opacity =
                "1";

        }

    }

}


/* =====================================================
   AVANÇAR PERGUNTA
===================================================== */

async function avancarPergunta() {

    if (!alternativaSelecionada) {
        return;
    }


    /* ---------------------------------------------
       Ainda existem perguntas
    --------------------------------------------- */

    if (
        perguntaAtual <
        perguntas.length - 1
    ) {

        perguntaAtual++;


        alternativaSelecionada =
            respostas[
                perguntas[
                    perguntaAtual
                ].id
            ] || null;


        mostrarPergunta();


        return;
    }


    /* ---------------------------------------------
       Última pergunta
    --------------------------------------------- */

    await finalizarTeste();

}


/* =====================================================
   VOLTAR PERGUNTA
===================================================== */

function voltarPergunta() {

    if (
        perguntaAtual <= 0
    ) {

        return;
    }


    perguntaAtual--;


    alternativaSelecionada =
        respostas[
            perguntas[
                perguntaAtual
            ].id
        ] || null;


    mostrarPergunta();

}


/* =====================================================
   FINALIZAR TESTE
===================================================== */

async function finalizarTeste() {

    mostrarTela(
        loadingScreen
    );


    /* ---------------------------------------------
       Progresso 100%
    --------------------------------------------- */

    if (progressPercent) {

        progressPercent.textContent =
            "100%";

    }


    if (progressFill) {

        progressFill.style.width =
            "100%";

    }


    /* ---------------------------------------------
       Mensagens
    --------------------------------------------- */

    const mensagens = [

        "Analisando suas respostas...",

        "Identificando seus interesses...",

        "Comparando seus padrões...",

        "Montando seu perfil...",

        "Preparando suas possibilidades..."

    ];


    let indice = 0;


    const loadingText =
        document.getElementById(
            "loadingText"
        );


    if (loadingText) {

        loadingText.textContent =
            mensagens[0];

    }


    const intervalo =
        setInterval(
            () => {

                indice++;


                if (
                    indice <
                    mensagens.length
                ) {

                    if (loadingText) {

                        loadingText.textContent =
                            mensagens[indice];

                    }

                }

            },
            650
        );


    try {

        /* ---------------------------------------------
           ALUNO LOGADO
        --------------------------------------------- */

        const alunoId =
            obterAlunoId();


        if (!alunoId) {

            throw new Error(
                "Aluno não encontrado. Faça login novamente."
            );

        }


        /* ---------------------------------------------
           PREPARA RESPOSTAS
        --------------------------------------------- */

        const respostasParaEnviar =
            perguntas.map(
                pergunta => ({

                    pergunta_id:
                        pergunta.id,

                    resposta:
                        respostas[
                            pergunta.id
                        ]

                })
            );


        /* ---------------------------------------------
           ENVIA PARA API
        --------------------------------------------- */

        const resposta =
            await fetch(
                `${API_URL}/teste-vocacional`,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            aluno_id:
                                alunoId,

                            respostas:
                                respostasParaEnviar

                        })

                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                "Erro ao salvar teste."
            );

        }


        clearInterval(
            intervalo
        );


        /* ---------------------------------------------
           VERIFICA RESULTADO
        --------------------------------------------- */

        if (
            !dados.resultado
        ) {

            throw new Error(
                "A API não retornou o resultado do teste."
            );

        }


        /* ---------------------------------------------
           GUARDA RESULTADO
        --------------------------------------------- */

        ultimoResultado =
            dados.resultado;


        /* ---------------------------------------------
           SALVA RESULTADO
        --------------------------------------------- */

        salvarResultadoParaPossibilidades(
            dados.resultado
        );


        /* ---------------------------------------------
           MOSTRA RESULTADO
        --------------------------------------------- */

        setTimeout(
            () => {

                mostrarResultado(
                    dados.resultado
                );

            },
            800
        );


    } catch (erro) {

        clearInterval(
            intervalo
        );


        console.error(
            "Erro ao finalizar teste:",
            erro
        );


        alert(
            erro.message ||
            "Não foi possível salvar seu teste."
        );


        mostrarTela(
            questionScreen
        );


        atualizarBotoes();

    }

}


/* =====================================================
   SALVAR RESULTADO
   PARA POSSIBILIDADES.HTML
===================================================== */

function salvarResultadoParaPossibilidades(
    resultado
) {

    if (!resultado) {
        return;
    }


    try {

        const resultadoJSON =
            JSON.stringify(
                resultado
            );


        /* ---------------------------------------------
           SESSION STORAGE
        --------------------------------------------- */

        sessionStorage.setItem(
            "resultadoTeste",
            resultadoJSON
        );


        /* ---------------------------------------------
           LOCAL STORAGE
        --------------------------------------------- */

        localStorage.setItem(
            "resultadoTeste",
            resultadoJSON
        );


    } catch (erro) {

        console.error(
            "Erro ao salvar resultado:",
            erro
        );

    }

}


/* =====================================================
   OBTER RESULTADO SALVO
===================================================== */

function obterResultadoSalvo() {

    try {

        /* ---------------------------------------------
           PRIMEIRO SESSION STORAGE
        --------------------------------------------- */

        const resultadoSessao =
            sessionStorage.getItem(
                "resultadoTeste"
            );


        if (
            resultadoSessao
        ) {

            return JSON.parse(
                resultadoSessao
            );

        }


        /* ---------------------------------------------
           DEPOIS LOCAL STORAGE
        --------------------------------------------- */

        const resultadoLocal =
            localStorage.getItem(
                "resultadoTeste"
            );


        if (
            resultadoLocal
        ) {

            return JSON.parse(
                resultadoLocal
            );

        }

    } catch (erro) {

        console.error(
            "Erro ao recuperar resultado:",
            erro
        );

    }


    return null;

}


/* =====================================================
   OBTER ALUNO LOGADO
===================================================== */

function obterAlunoId() {

    /* ---------------------------------------------
       1. alunoId
    --------------------------------------------- */

    const alunoId =
        localStorage.getItem(
            "alunoId"
        );


    if (
        alunoId &&
        !Number.isNaN(
            Number(alunoId)
        )
    ) {

        return Number(
            alunoId
        );

    }


    /* ---------------------------------------------
       2. aluno
    --------------------------------------------- */

    const usuario =
        localStorage.getItem(
            "aluno"
        );


    if (usuario) {

        try {

            const aluno =
                JSON.parse(
                    usuario
                );


            if (
                aluno?.id
            ) {

                return Number(
                    aluno.id
                );

            }

        } catch (erro) {

            console.warn(
                "Não foi possível ler aluno."
            );

        }

    }


    /* ---------------------------------------------
       3. usuario
    --------------------------------------------- */

    const usuarioLogado =
        localStorage.getItem(
            "usuario"
        );


    if (usuarioLogado) {

        try {

            const aluno =
                JSON.parse(
                    usuarioLogado
                );


            if (
                aluno?.id
            ) {

                return Number(
                    aluno.id
                );

            }

        } catch (erro) {

            console.warn(
                "Não foi possível ler usuario."
            );

        }

    }


    return null;

}


/* =====================================================
   MOSTRAR RESULTADO
===================================================== */

function mostrarResultado(
    resultado
) {

    if (!resultado) {

        alert(
            "Resultado não encontrado."
        );

        return;
    }


    /* ---------------------------------------------
       Guarda resultado atual
    --------------------------------------------- */

    ultimoResultado =
        resultado;


    /* ---------------------------------------------
       Salva novamente
    --------------------------------------------- */

    salvarResultadoParaPossibilidades(
        resultado
    );


    /* ---------------------------------------------
       Mostra tela
    --------------------------------------------- */

    mostrarTela(
        resultScreen
    );


    /* ---------------------------------------------
       PERFIL
    --------------------------------------------- */

    const perfil =
        resultado.perfil_principal;


    /* ---------------------------------------------
       ÍCONE
    --------------------------------------------- */

    const resultIcon =
        document.getElementById(
            "resultIcon"
        );


    if (resultIcon) {

        resultIcon.textContent =
            iconesPerfis[
                perfil
            ] || "✦";

    }


    /* ---------------------------------------------
       TÍTULO
    --------------------------------------------- */

    const resultTitle =
        document.getElementById(
            "resultTitle"
        );


    if (resultTitle) {

        resultTitle.textContent =
            nomesPerfis[
                perfil
            ] ||
            perfil ||
            "Seu perfil";

    }


    /* ---------------------------------------------
       CÓDIGO
    --------------------------------------------- */

    const resultCode =
        document.getElementById(
            "resultCode"
        );


    if (resultCode) {

        resultCode.textContent =
            resultado.codigo ||
            "—";

    }


    /* ---------------------------------------------
       DESCRIÇÃO
    --------------------------------------------- */

    const resultDescription =
        document.getElementById(
            "resultDescription"
        );


    if (resultDescription) {

        resultDescription.textContent =
            descricoesPerfis[
                perfil
            ] ||
            resultado.descricao ||
            "Seu resultado mostra uma combinação única de interesses e características.";

    }


    /* ---------------------------------------------
       PONTUAÇÕES
    --------------------------------------------- */

    const pontuacoes =
        resultado.pontuacoes ||
        {};


    preencherPontuacao(
        "R",
        pontuacoes.R
    );


    preencherPontuacao(
        "I",
        pontuacoes.I
    );


    preencherPontuacao(
        "A",
        pontuacoes.A
    );


    preencherPontuacao(
        "S",
        pontuacoes.S
    );


    preencherPontuacao(
        "E",
        pontuacoes.E
    );


    preencherPontuacao(
        "C",
        pontuacoes.C
    );

}


/* =====================================================
   PREENCHER PONTUAÇÃO
===================================================== */

function preencherPontuacao(
    perfil,
    valor
) {

    let porcentagem =
        Number(valor) || 0;


    /* ---------------------------------------------
       Garante 0 até 100
    --------------------------------------------- */

    porcentagem =
        Math.max(
            0,
            Math.min(
                100,
                porcentagem
            )
        );


    /* ---------------------------------------------
       NÚMERO
    --------------------------------------------- */

    const numero =
        document.getElementById(
            `score${perfil}`
        );


    /* ---------------------------------------------
       BARRA
    --------------------------------------------- */

    const barra =
        document.getElementById(
            `bar${perfil}`
        );


    if (numero) {

        numero.textContent =
            `${porcentagem}%`;

    }


    if (barra) {

        barra.style.width =
            "0%";


        setTimeout(
            () => {

                barra.style.width =
                    `${porcentagem}%`;

            },
            150
        );

    }

}


/* =====================================================
   TROCAR TELA
===================================================== */

function mostrarTela(
    tela
) {

    if (!tela) {
        return;
    }


    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );

            }
        );


    tela.classList.add(
        "active"
    );


    /* ---------------------------------------------
       Volta visualmente para o topo
    --------------------------------------------- */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   REFAZER TESTE
===================================================== */

function refazerTeste() {

    /* ---------------------------------------------
       Limpa estado
    --------------------------------------------- */

    perguntaAtual = 0;

    respostas = {};

    alternativaSelecionada = null;

    ultimoResultado = null;


    /* ---------------------------------------------
       Remove resultado anterior
    --------------------------------------------- */

    sessionStorage.removeItem(
        "resultadoTeste"
    );


    localStorage.removeItem(
        "resultadoTeste"
    );


    /* ---------------------------------------------
       Limpa alternativas
    --------------------------------------------- */

    if (answersContainer) {

        answersContainer.innerHTML =
            "";

    }


    /* ---------------------------------------------
       Volta para introdução
    --------------------------------------------- */

    mostrarTela(
        introScreen
    );


    /* ---------------------------------------------
       Reinicia progresso
    --------------------------------------------- */

    if (progressPercent) {

        progressPercent.textContent =
            "0%";

    }


    if (progressFill) {

        progressFill.style.width =
            "0%";

    }


    /* ---------------------------------------------
       Reativa botão iniciar
    --------------------------------------------- */

    if (startButton) {

        startButton.disabled =
            false;


        startButton.innerHTML =
            'Começar descoberta <span>→</span>';

    }

}


/* =====================================================
   DASHBOARD
===================================================== */

function irParaDashboard() {

    window.location.href =
        "dashboard.html";

}


/* =====================================================
   POSSIBILIDADES
===================================================== */

function irParaPossibilidades() {

    /* ---------------------------------------------
       Se temos resultado atual, salva
    --------------------------------------------- */

    if (
        ultimoResultado
    ) {

        salvarResultadoParaPossibilidades(
            ultimoResultado
        );

    }


    /* ---------------------------------------------
       Confirma que existe resultado
    --------------------------------------------- */

    const resultado =
        obterResultadoSalvo();


    if (!resultado) {

        alert(
            "Você ainda não possui um resultado. Faça o teste vocacional primeiro."
        );

        return;
    }


    /* ---------------------------------------------
       Salva novamente antes de sair
    --------------------------------------------- */

    salvarResultadoParaPossibilidades(
        resultado
    );


    /* ---------------------------------------------
       Vai para possibilidades
    --------------------------------------------- */

    window.location.href =
        "possibilidades.html";

}


/* =====================================================
   FUNÇÕES GLOBAIS
===================================================== */

window.MeuFuturoQuiz = {

    iniciarTeste,

    mostrarResultado,

    obterResultadoSalvo,

    salvarResultadoParaPossibilidades,

    obterAlunoId,

    refazerTeste,

    irParaDashboard,

    irParaPossibilidades

};