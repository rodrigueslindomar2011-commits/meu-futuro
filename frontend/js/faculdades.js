document.addEventListener("DOMContentLoaded", () => {

    console.log("Página de Faculdades iniciada.");

    carregarAluno();

    configurarPesquisa();

    configurarFiltros();

    animarCards();

});


/* =========================================================
   CARREGAR ALUNO
========================================================= */

function carregarAluno() {

    let aluno = null;

    const local = localStorage.getItem("aluno");
    const session = sessionStorage.getItem("aluno");

    try {

        if (local) {

            aluno = JSON.parse(local);

        } else if (session) {

            aluno = JSON.parse(session);

        }

    } catch (erro) {

        console.error(
            "Erro ao carregar aluno:",
            erro
        );

    }


    if (!aluno) {

        console.log(
            "Nenhum aluno encontrado. Usando dados demonstrativos."
        );

        return;

    }


    const nome = aluno.nome || "Aluno";

    const primeiroNome =
        nome.split(" ")[0];


    const area =
        aluno.area_interesse ||
        aluno.area ||
        "Tecnologia";


    const nomeElemento =
        document.getElementById("nomeAluno");

    const areaElemento =
        document.getElementById("areaAluno");

    const jornadaArea =
        document.getElementById("jornadaArea");


    if (nomeElemento) {

        nomeElemento.textContent =
            `Olá, ${primeiroNome}!`;

    }


    if (areaElemento) {

        areaElemento.textContent =
            area;

    }


    if (jornadaArea) {

        jornadaArea.textContent =
            area;

    }


    console.log(
        "Aluno carregado:",
        aluno
    );

}


/* =========================================================
   PESQUISA
========================================================= */

function configurarPesquisa() {

    const input =
        document.getElementById("pesquisa");

    if (!input) return;


    input.addEventListener(
        "input",
        aplicarFiltros
    );

}


/* =========================================================
   FILTROS
========================================================= */

let filtroAtual = "todas";


function configurarFiltros() {

    const botoes =
        document.querySelectorAll(".filtro");


    botoes.forEach(botao => {

        botao.addEventListener(
            "click",
            () => {

                botoes.forEach(
                    b => b.classList.remove("ativo")
                );

                botao.classList.add("ativo");

                filtroAtual =
                    botao.dataset.filtro;

                aplicarFiltros();

            }
        );

    });

}


/* =========================================================
   APLICAR FILTROS
========================================================= */

function aplicarFiltros() {

    const pesquisa =
        document
            .getElementById("pesquisa")
            .value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".faculdade-card"
        );


    let encontrados = 0;


    cards.forEach(card => {

        const nome =
            card.dataset.nome.toLowerCase();

        const tipo =
            card.dataset.tipo;

        const area =
            card.dataset.area;


        const correspondePesquisa =
            nome.includes(pesquisa);


        let correspondeFiltro = true;


        if (filtroAtual === "publica") {

            correspondeFiltro =
                tipo === "publica";

        }

        else if (filtroAtual === "privada") {

            correspondeFiltro =
                tipo === "privada";

        }

        else if (
            filtroAtual === "tecnologia"
        ) {

            correspondeFiltro =
                area === "tecnologia";

        }

        else if (
            filtroAtual === "engenharia"
        ) {

            correspondeFiltro =
                area === "engenharia";

        }


        if (
            correspondePesquisa &&
            correspondeFiltro
        ) {

            card.style.display = "";

            encontrados++;

        } else {

            card.style.display = "none";

        }

    });


    atualizarContador(encontrados);


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

}


/* =========================================================
   CONTADOR
========================================================= */

function atualizarContador(total) {

    const contador =
        document.getElementById(
            "contador"
        );


    if (!contador) return;


    if (total === 1) {

        contador.textContent =
            "1 instituição encontrada";

    } else {

        contador.textContent =
            `${total} instituições encontradas`;

    }

}


/* =========================================================
   LIMPAR PESQUISA
========================================================= */

function limparPesquisa() {

    const input =
        document.getElementById(
            "pesquisa"
        );


    if (!input) return;


    input.value = "";

    filtroAtual = "todas";


    document
        .querySelectorAll(".filtro")
        .forEach(botao => {

            botao.classList.remove("ativo");

        });


    const primeiro =
        document.querySelector(
            '.filtro[data-filtro="todas"]'
        );


    if (primeiro) {

        primeiro.classList.add("ativo");

    }


    aplicarFiltros();

}


/* =========================================================
   FAVORITOS
========================================================= */

function favoritar(botao) {

    botao.classList.toggle("salvo");


    if (
        botao.classList.contains("salvo")
    ) {

        botao.textContent = "♥";

        botao.setAttribute(
            "title",
            "Remover dos favoritos"
        );

    } else {

        botao.textContent = "♡";

        botao.setAttribute(
            "title",
            "Adicionar aos favoritos"
        );

    }

}


/* =========================================================
   MOSTRAR FAVORITOS
========================================================= */

function mostrarFavoritos() {

    const cards =
        document.querySelectorAll(
            ".faculdade-card"
        );


    let favoritos = 0;


    cards.forEach(card => {

        const botao =
            card.querySelector(".favorito");


        if (
            botao &&
            botao.classList.contains("salvo")
        ) {

            card.style.display = "";

            favoritos++;

        } else {

            card.style.display = "none";

        }

    });


    atualizarContador(favoritos);


    const semResultados =
        document.getElementById(
            "semResultados"
        );


    if (semResultados) {

        semResultados.style.display =
            favoritos === 0
                ? "block"
                : "none";

    }

}


/* =========================================================
   MODAL
========================================================= */

function abrirDetalhes(nome) {

    const modal =
        document.getElementById("modal");

    const titulo =
        document.getElementById(
            "modalTitulo"
        );

    const descricao =
        document.getElementById(
            "modalDescricao"
        );


    if (!modal) return;


    titulo.textContent = nome;


    descricao.textContent =
        `Explore possibilidades acadêmicas, cursos e caminhos profissionais relacionados à ${nome}. Esta área poderá receber informações detalhadas da instituição conforme conectarmos os dados reais do projeto.`;


    modal.classList.add("aberto");


    document.body.style.overflow =
        "hidden";

}


function fecharModal(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {

        return;

    }


    const modal =
        document.getElementById("modal");


    if (!modal) return;


    modal.classList.remove("aberto");


    document.body.style.overflow =
        "";

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            fecharModal();

        }

    }
);


/* =========================================================
   ANIMAÇÃO DOS CARDS
========================================================= */

function animarCards() {

    const cards =
        document.querySelectorAll(
            ".faculdade-card"
        );


    cards.forEach(
        (card, index) => {

            card.style.animationDelay =
                `${index * 0.08}s`;

        }
    );

}


/* =========================================================
   VOLTAR
========================================================= */

function voltarResultados() {

    window.location.href =
        "resultados.html";

}


/* =========================================================
   DISPONIBILIZAR FUNÇÕES
========================================================= */

window.limparPesquisa =
    limparPesquisa;

window.favoritar =
    favoritar;

window.mostrarFavoritos =
    mostrarFavoritos;

window.abrirDetalhes =
    abrirDetalhes;

window.fecharModal =
    fecharModal;

window.voltarResultados =
    voltarResultados;