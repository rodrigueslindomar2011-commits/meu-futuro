/* ============================================================
   MEU FUTURO
   RESULTADOS.JS
============================================================ */

/* ============================================================
   VARIÁVEL DO GRÁFICO
============================================================ */

let graficoEvolucao = null;


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Página de resultados iniciada.");

    carregarAluno();

    carregarResultados();

    atualizarEvolucao();

    iniciarAnimacoes();

});


/* ============================================================
   ANIMAÇÕES DOS ELEMENTOS
============================================================ */

function iniciarAnimacoes() {

    const elementos = document.querySelectorAll(".reveal");

    elementos.forEach(function (elemento, index) {

        elemento.style.animationDelay = `${index * 0.08}s`;

    });

}


/* ============================================================
   VOLTAR PARA O DASHBOARD
============================================================ */

function voltarDashboard() {

    window.location.href = "dashboard.html";

}


/* ============================================================
   IR PARA POSSIBILIDADES
============================================================ */

function verPossibilidades() {

    window.location.href = "possibilidades.html";

}


/* ============================================================
   CARREGAR ALUNO
============================================================ */

function carregarAluno() {

    let aluno = null;

    const alunoLocal = localStorage.getItem("aluno");

    const alunoSession = sessionStorage.getItem("aluno");


    try {

        if (alunoLocal) {

            aluno = JSON.parse(alunoLocal);

        } else if (alunoSession) {

            aluno = JSON.parse(alunoSession);

        }

    } catch (erro) {

        console.error(
            "Erro ao interpretar dados do aluno:",
            erro
        );

    }


    if (!aluno) {

        console.log("Nenhum aluno encontrado.");

        return;

    }


    const nome = aluno.nome || "Aluno";

    const primeiroNome = nome.split(" ")[0];


    const perfilNome = document.getElementById("perfilNome");

    if (perfilNome && aluno.perfil) {

        perfilNome.textContent = aluno.perfil;

    }


    const areaPrincipal = document.getElementById("areaPrincipal");

    if (areaPrincipal && aluno.area_interesse) {

        areaPrincipal.textContent = aluno.area_interesse;

    }


    console.log("Aluno carregado:", primeiroNome);

}


/* ============================================================
   CARREGAR RESULTADOS REAIS DO TESTE VOCACIONAL
============================================================ */

async function carregarResultados() {

    try {

        const alunoId = obterAlunoId();


        if (!alunoId) {

            console.warn(
                "ID do aluno não encontrado."
            );

            return;

        }


        /* ====================================================
           JWT
        ==================================================== */

        const token = localStorage.getItem("token");


        if (!token) {

            console.warn(
                "Token de autenticação não encontrado."
            );

            return;

        }


        /* ====================================================
           BUSCAR RESULTADO REAL NO BACKEND
        ==================================================== */

        const resposta = await fetch(
            `/api/teste-vocacional/resultado/${alunoId}`,
            {
                method: "GET",

                headers: {

                    Accept: "application/json",

                    Authorization: `Bearer ${token}`

                }
            }
        );


        const dados = await resposta.json();


        /* ====================================================
           VERIFICAR RESPOSTA
        ==================================================== */

        if (!resposta.ok) {

            console.error(
                "Erro ao carregar resultado:",
                dados
            );

            return;

        }


        console.log(
            "Resultado recebido:",
            dados
        );


        /* ====================================================
           RESULTADO
        ==================================================== */

        const resultado =
            dados.resultado || dados;


        /* ====================================================
           PERFIL
        ==================================================== */

        const perfil =
            resultado.perfil ||
            resultado.tipo_perfil ||
            resultado.perfil_nome ||
            "Não definido";


        /* ====================================================
           DESCRIÇÃO
        ==================================================== */

        const descricao =
            resultado.descricao ||
            resultado.descricao_perfil ||
            "Seu resultado será apresentado de acordo com suas respostas no teste vocacional.";


        /* ====================================================
           ÁREA PRINCIPAL
        ==================================================== */

        const areaPrincipal =
            resultado.areaPrincipal ||
            resultado.area_principal ||
            resultado.area_interesse ||
            "Não definida";


        /* ====================================================
           MELHOR RESULTADO
        ==================================================== */

        const melhorResultado =
            Number(
                resultado.melhorResultado ??
                resultado.melhor_resultado ??
                resultado.percentual ??
                resultado.pontuacao ??
                0
            );


        /* ====================================================
           ATUALIZAR PERFIL
        ==================================================== */

        const perfilNome =
            document.getElementById("perfilNome");


        if (perfilNome) {

            perfilNome.textContent = perfil;

        }


        /* ====================================================
           ATUALIZAR DESCRIÇÃO
        ==================================================== */

        const perfilDescricao =
            document.getElementById("perfilDescricao");


        if (perfilDescricao) {

            perfilDescricao.textContent = descricao;

        }


        /* ====================================================
           ATUALIZAR ÁREA PRINCIPAL
        ==================================================== */

        const elementoArea =
            document.getElementById("areaPrincipal");


        if (elementoArea) {

            elementoArea.textContent = areaPrincipal;

        }


        /* ====================================================
           ATUALIZAR MELHOR RESULTADO REAL
        ==================================================== */

        const elementoMelhor =
            document.getElementById("melhorResultado");


        if (elementoMelhor) {

            elementoMelhor.textContent =
                melhorResultado + "%";

        }


        /*
           Guardamos o resultado real para que a parte
           da evolução não sobrescreva o valor vindo do banco.
        */

        window.resultadoVocacionalReal = {

            perfil: perfil,

            descricao: descricao,

            areaPrincipal: areaPrincipal,

            melhorResultado: melhorResultado

        };


        console.log(
            "Resultados carregados com sucesso."
        );


    } catch (erro) {

        console.error(
            "Erro ao carregar resultados:",
            erro
        );

    }

}


/* ============================================================
   OBTER ID DO ALUNO
============================================================ */

function obterAlunoId() {

    const alunoLocal =
        localStorage.getItem("aluno");


    if (alunoLocal) {

        try {

            const aluno =
                JSON.parse(alunoLocal);


            if (aluno && aluno.id) {

                return aluno.id;

            }

        } catch (erro) {

            console.error(
                "Erro ao interpretar aluno:",
                erro
            );

        }

    }


    const alunoSession =
        sessionStorage.getItem("aluno");


    if (alunoSession) {

        try {

            const aluno =
                JSON.parse(alunoSession);


            if (aluno && aluno.id) {

                return aluno.id;

            }

        } catch (erro) {

            console.error(
                "Erro ao interpretar aluno da sessão:",
                erro
            );

        }

    }


    const chaves = [

        "aluno_id",

        "alunoId",

        "usuario_id",

        "usuarioId"

    ];


    for (const chave of chaves) {

        const valor =
            localStorage.getItem(chave);


        if (valor) {

            return valor;

        }

    }


    return null;

}


/* ============================================================
   ATUALIZAR EVOLUÇÃO
============================================================ */

function atualizarEvolucao() {

    /*
       Estes valores representam a evolução visual.
       Eles continuam sendo usados pelo gráfico,
       mas NÃO sobrescrevem o resultado real do teste.
    */

    const evolucao = {

        meses: [

            "Jun",

            "Jul",

            "Ago",

            "Set",

            "Out",

            "Nov"

        ],

        valores: [

            8,

            13,

            24,

            35,

            49,

            62

        ]

    };


    const ultimoValor =
        evolucao.valores[
            evolucao.valores.length - 1
        ];


    /* ========================================================
       PERCENTUAL DE EVOLUÇÃO
    ======================================================== */

    const percentual =
        document.getElementById(
            "percentualEvolucao"
        );


    if (percentual) {

        animarNumero(

            percentual,

            0,

            ultimoValor,

            1000,

            "%"

        );

    }


    /* ========================================================
       TOTAL DE QUESTIONÁRIOS
    ======================================================== */

    const totalQuestionarios =
        document.getElementById(
            "totalQuestionarios"
        );


    if (totalQuestionarios) {

        animarNumero(

            totalQuestionarios,

            0,

            evolucao.valores.length,

            700,

            ""

        );

    }


    /* ========================================================
       MELHOR RESULTADO
    ======================================================== */

    const melhor =
        Math.max(...evolucao.valores);


    const melhorResultado =
        document.getElementById(
            "melhorResultado"
        );


    /*
       Só usamos o valor da evolução como fallback.

       Se o backend já carregou o resultado real,
       ele NÃO será substituído.
    */

    if (
        melhorResultado &&
        !window.resultadoVocacionalReal
    ) {

        animarNumero(

            melhorResultado,

            0,

            melhor,

            1000,

            "%"

        );

    }


    /* ========================================================
       CRIAR GRÁFICO
    ======================================================== */

    criarGraficoEvolucao(

        evolucao.meses,

        evolucao.valores

    );

}


/* ============================================================
   NÚMERO ANIMADO
============================================================ */

function animarNumero(

    elemento,

    inicio,

    fim,

    duracao,

    simbolo

) {

    const inicioTempo =
        performance.now();


    function atualizar(tempoAtual) {

        const progresso =
            Math.min(

                (tempoAtual - inicioTempo) /
                duracao,

                1

            );


        const valor =
            Math.floor(

                inicio +
                (fim - inicio) *
                progresso

            );


        elemento.textContent =
            valor + simbolo;


        if (progresso < 1) {

            requestAnimationFrame(
                atualizar
            );

        }

    }


    requestAnimationFrame(
        atualizar
    );

}


/* ============================================================
   CRIAR GRÁFICO
============================================================ */

function criarGraficoEvolucao(

    meses,

    valores

) {

    const canvas =
        document.getElementById(
            "graficoEvolucao"
        );


    if (!canvas) {

        console.error(
            "Canvas #graficoEvolucao não encontrado."
        );

        return;

    }


    if (typeof Chart === "undefined") {

        console.error(
            "Chart.js não foi carregado."
        );

        return;

    }


    if (graficoEvolucao) {

        graficoEvolucao.destroy();

    }


    graficoEvolucao =
        new Chart(

            canvas,

            {

                type: "line",


                data: {

                    labels: meses,


                    datasets: [

                        {

                            label:
                                "Minha evolução",


                            data:
                                valores,


                            borderWidth: 3,


                            tension: 0.4,


                            fill: true,


                            backgroundColor:
                                "rgba(39, 168, 102, 0.10)",


                            borderColor:
                                "#27a866",


                            pointBackgroundColor:
                                "#ffffff",


                            pointBorderColor:
                                "#27a866",


                            pointBorderWidth: 2,


                            pointRadius: 5,


                            pointHoverRadius: 8

                        }

                    ]

                },


                options: {

                    responsive: true,


                    maintainAspectRatio: false,


                    animation: {

                        duration: 1800,

                        easing: "easeOutQuart"

                    },


                    interaction: {

                        intersect: false,

                        mode: "index"

                    },


                    plugins: {

                        legend: {

                            display: false

                        },


                        tooltip: {

                            backgroundColor:
                                "#173f2a",


                            titleColor:
                                "#ffffff",


                            bodyColor:
                                "#ffffff",


                            padding: 12,


                            displayColors: false,


                            cornerRadius: 10,


                            callbacks: {

                                label:
                                    function (contexto) {

                                        return (
                                            " Evolução: " +
                                            contexto.parsed.y +
                                            "%"
                                        );

                                    }

                            }

                        }

                    },


                    scales: {

                        y: {

                            beginAtZero: true,


                            max: 100,


                            grid: {

                                color:
                                    "#edf1ee"

                            },


                            ticks: {

                                color:
                                    "#718078",


                                font: {

                                    size: 11

                                },


                                callback:
                                    function (valor) {

                                        return valor + "%";

                                    }

                            }

                        },


                        x: {

                            grid: {

                                display: false

                            },


                            ticks: {

                                color:
                                    "#718078",


                                font: {

                                    size: 11

                                }

                            }

                        }

                    }

                }

            }

        );

}


/* ============================================================
   SAIR
============================================================ */

function sair() {

    localStorage.removeItem("aluno");

    localStorage.removeItem("token");

    sessionStorage.removeItem("aluno");


    window.location.href = "login.html";

}


/* ============================================================
   DISPONIBILIZAR FUNÇÕES
============================================================ */

window.voltarDashboard =
    voltarDashboard;


window.verPossibilidades =
    verPossibilidades;


window.sair =
    sair;