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

    const elementos =
        document.querySelectorAll(".reveal");

    elementos.forEach(function (elemento, index) {

        elemento.style.animationDelay =
            `${index * 0.08}s`;

    });

}


/* ============================================================
   VOLTAR PARA O DASHBOARD
============================================================ */

function voltarDashboard() {

    window.location.href =
        "dashboard.html";

}


/* ============================================================
   IR PARA POSSIBILIDADES
============================================================ */

function verPossibilidades() {

    window.location.href =
        "possibilidades.html";

}


/* ============================================================
   CARREGAR ALUNO
============================================================ */

function carregarAluno() {

    let aluno = null;


    const alunoLocal =
        localStorage.getItem("aluno");

    const alunoSession =
        sessionStorage.getItem("aluno");


    try {

        if (alunoLocal) {

            aluno =
                JSON.parse(alunoLocal);

        } else if (alunoSession) {

            aluno =
                JSON.parse(alunoSession);

        }

    } catch (erro) {

        console.error(
            "Erro ao interpretar dados do aluno:",
            erro
        );

    }


    if (!aluno) {

        console.log(
            "Nenhum aluno encontrado. Usando dados demonstrativos."
        );

        return;

    }


    const nome =
        aluno.nome || "Aluno";


    const primeiroNome =
        nome.split(" ")[0];


    const perfilNome =
        document.getElementById(
            "perfilNome"
        );


    if (
        perfilNome &&
        aluno.perfil
    ) {

        perfilNome.textContent =
            aluno.perfil;

    }


    const areaPrincipal =
        document.getElementById(
            "areaPrincipal"
        );


    if (
        areaPrincipal &&
        aluno.area_interesse
    ) {

        areaPrincipal.textContent =
            aluno.area_interesse;

    }


    console.log(
        "Aluno carregado:",
        primeiroNome
    );

}


/* ============================================================
   CARREGAR RESULTADOS
============================================================ */

function carregarResultados() {

    try {

        const resultado = {

            perfil:
                "Explorador",

            descricao:
                "Você demonstra curiosidade, interesse em aprender e vontade de descobrir novas possibilidades para o seu futuro.",

            areaPrincipal:
                "Tecnologia",

            melhorResultado:
                62

        };


        const perfilNome =
            document.getElementById(
                "perfilNome"
            );


        const perfilDescricao =
            document.getElementById(
                "perfilDescricao"
            );


        if (perfilNome) {

            perfilNome.textContent =
                resultado.perfil;

        }


        if (perfilDescricao) {

            perfilDescricao.textContent =
                resultado.descricao;

        }


        const areaPrincipal =
            document.getElementById(
                "areaPrincipal"
            );


        if (areaPrincipal) {

            areaPrincipal.textContent =
                resultado.areaPrincipal;

        }


        const melhorResultado =
            document.getElementById(
                "melhorResultado"
            );


        if (melhorResultado) {

            melhorResultado.textContent =
                resultado.melhorResultado + "%";

        }


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
   ATUALIZAR EVOLUÇÃO
============================================================ */

function atualizarEvolucao() {

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
       PERCENTUAL
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
        Math.max(
            ...evolucao.valores
        );


    const melhorResultado =
        document.getElementById(
            "melhorResultado"
        );


    if (melhorResultado) {

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


    if (
        typeof Chart ===
        "undefined"
    ) {

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

                            displayColors:
                                false,

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

    localStorage.removeItem(
        "aluno"
    );


    sessionStorage.removeItem(
        "aluno"
    );


    window.location.href =
        "login.html";

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