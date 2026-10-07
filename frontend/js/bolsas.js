// =====================================================
// BOLSAS.JS
// Página de bolsas - Meu Futuro
// =====================================================


// =====================================================
// DADOS DAS BOLSAS
// Por enquanto são dados de demonstração.
// Depois vamos substituir por dados reais da API/banco.
// =====================================================

const bolsas = [
    {
        nome: "Bolsa Tecnologia do Futuro",
        instituicao: "Instituição Parceira",
        descricao: "Oportunidade para estudantes interessados em tecnologia, programação e inovação.",
        categoria: "Tecnologia",
        modalidade: "Graduação",
        local: "Brasil",
        beneficio: "Até 100%",
        compatibilidade: 100,
        status: "Disponível"
    },

    {
        nome: "Bolsa Ciência e Inovação",
        instituicao: "Programa Educacional",
        descricao: "Bolsa voltada para estudantes interessados em pesquisa, ciência e desenvolvimento.",
        categoria: "Ciências",
        modalidade: "Graduação",
        local: "Brasil",
        beneficio: "Até 85%",
        compatibilidade: 85,
        status: "Disponível"
    },

    {
        nome: "Bolsa Design Criativo",
        instituicao: "Programa Criativo",
        descricao: "Programa para estudantes que desejam desenvolver habilidades em design e criatividade.",
        categoria: "Artes e Design",
        modalidade: "Graduação",
        local: "Brasil",
        beneficio: "Até 78%",
        compatibilidade: 78,
        status: "Disponível"
    },

    {
        nome: "Bolsa Engenharia",
        instituicao: "Instituição de Ensino",
        descricao: "Oportunidade para estudantes interessados em engenharia, tecnologia e resolução de problemas.",
        categoria: "Engenharia",
        modalidade: "Graduação",
        local: "Brasil",
        beneficio: "Até 72%",
        compatibilidade: 72,
        status: "Disponível"
    },

    {
        nome: "Bolsa Saúde e Futuro",
        instituicao: "Programa Nacional",
        descricao: "Oportunidade para estudantes interessados na área da saúde.",
        categoria: "Saúde",
        modalidade: "Graduação",
        local: "Brasil",
        beneficio: "Até 90%",
        compatibilidade: 90,
        status: "Disponível"
    },

    {
        nome: "Bolsa Administração",
        instituicao: "Instituição Parceira",
        descricao: "Programa para estudantes interessados em negócios, gestão e empreendedorismo.",
        categoria: "Administração",
        modalidade: "Graduação",
        local: "Brasil",
        beneficio: "Até 70%",
        compatibilidade: 70,
        status: "Disponível"
    }
];


// =====================================================
// QUANDO A PÁGINA CARREGAR
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Página de bolsas carregada.");

    atualizarResumo();

    configurarBusca();

});


// =====================================================
// ATUALIZAR NÚMEROS DO RESUMO
// =====================================================

function atualizarResumo() {

    const totalBolsas = document.getElementById("totalBolsas");
    const maiorDesconto = document.getElementById("maiorDesconto");
    const bolsasCompativeis = document.getElementById("bolsasCompativeis");
    const inscricoesAbertas = document.getElementById("inscricoesAbertas");


    if (totalBolsas) {
        totalBolsas.textContent = bolsas.length;
    }


    if (maiorDesconto) {

        const descontos = bolsas.map(bolsa => {

            return parseInt(
                bolsa.beneficio.replace(/\D/g, "")
            );

        });

        const maior = Math.max(...descontos);

        maiorDesconto.textContent = `${maior}%`;
    }


    if (bolsasCompativeis) {

        const compativeis = bolsas.filter(
            bolsa => bolsa.compatibilidade >= 80
        );

        bolsasCompativeis.textContent = compativeis.length;
    }


    if (inscricoesAbertas) {

        inscricoesAbertas.textContent = bolsas.length;
    }
}


// =====================================================
// CONFIGURAR CAMPO DE BUSCA
// =====================================================

function configurarBusca() {

    const campo = document.getElementById("campoBusca");

    if (!campo) return;


    campo.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            buscarBolsas();

        }

    });

}


// =====================================================
// BUSCAR BOLSAS
// =====================================================

function buscarBolsas() {

    const campo = document.getElementById("campoBusca");

    if (!campo) return;


    const pesquisa = campo.value
        .toLowerCase()
        .trim();


    if (pesquisa === "") {

        mostrarBolsas(bolsas);

        return;

    }


    const resultados = bolsas.filter(bolsa => {

        return (

            bolsa.nome.toLowerCase().includes(pesquisa) ||

            bolsa.instituicao.toLowerCase().includes(pesquisa) ||

            bolsa.descricao.toLowerCase().includes(pesquisa) ||

            bolsa.categoria.toLowerCase().includes(pesquisa) ||

            bolsa.local.toLowerCase().includes(pesquisa)

        );

    });


    mostrarBolsas(resultados);

}


// =====================================================
// FILTRAR BOLSAS
// =====================================================

function filtrarBolsas(filtro) {

    const botoes = document.querySelectorAll(".filtro");


    botoes.forEach(botao => {

        botao.classList.remove("ativo");

    });


    const botaoSelecionado = document.querySelector(
        `[data-filtro="${filtro}"]`
    );


    if (botaoSelecionado) {

        botaoSelecionado.classList.add("ativo");

    }


    if (filtro === "todas") {

        mostrarBolsas(bolsas);

        return;

    }


    let resultados = [];


    if (filtro === "tecnologia") {

        resultados = bolsas.filter(
            bolsa =>
                bolsa.categoria.toLowerCase().includes("tecnologia")
        );

    }


    else if (filtro === "engenharia") {

        resultados = bolsas.filter(
            bolsa =>
                bolsa.categoria.toLowerCase().includes("engenharia")
        );

    }


    else if (filtro === "abertas") {

        resultados = bolsas.filter(
            bolsa =>
                bolsa.status.toLowerCase().includes("disponível")
        );

    }


    else if (filtro === "publica") {

        resultados = bolsas.filter(
            bolsa =>
                bolsa.instituicao.toLowerCase().includes("nacional")
        );

    }


    else if (filtro === "privada") {

        resultados = bolsas.filter(
            bolsa =>
                !bolsa.instituicao.toLowerCase().includes("nacional")
        );

    }


    mostrarBolsas(resultados);

}


// =====================================================
// MOSTRAR RESULTADOS
// =====================================================

function mostrarBolsas(lista) {

    const container = document.getElementById("bolsasContainer");

    if (!container) return;


    container.innerHTML = "";


    if (lista.length === 0) {

        container.innerHTML = `

            <div class="sem-resultados">

                <div class="sem-resultados-icon">
                    🔎
                </div>

                <h3>
                    Nenhuma oportunidade encontrada
                </h3>

                <p>
                    Tente pesquisar outro curso,
                    instituição ou área.
                </p>

            </div>

        `;

        return;

    }


    lista.forEach(bolsa => {

        const card = document.createElement("article");

        card.className = "bolsa-card";


        card.innerHTML = `

            <div class="bolsa-top">

                <div class="bolsa-logo">
                    🎓
                </div>

                <span class="status aberta">
                    ● ${bolsa.status}
                </span>

            </div>


            <h3>
                ${bolsa.nome}
            </h3>


            <p class="instituicao">
                ${bolsa.instituicao}
            </p>


            <p>
                ${bolsa.descricao}
            </p>


            <div class="bolsa-info">

                <span>
                    📚 ${bolsa.categoria}
                </span>

                <span>
                    🎓 ${bolsa.modalidade}
                </span>

                <span>
                    📍 ${bolsa.local}
                </span>

            </div>


            <div class="bolsa-desconto">

                <strong>
                    ${bolsa.beneficio}
                </strong>

                <span>
                    de bolsa
                </span>

            </div>


            <div class="compatibilidade-barra">

                <div class="barra-header">

                    <span>
                        Compatibilidade com você
                    </span>

                    <strong>
                        ${bolsa.compatibilidade}%
                    </strong>

                </div>


                <div class="barra">

                    <div
                        class="barra-progresso"
                        style="width: ${bolsa.compatibilidade}%"
                    ></div>

                </div>

            </div>


            <div class="bolsa-footer">

                <span>
                    📅 Inscrições disponíveis
                </span>

                <button
                    type="button"
                    onclick="verBolsa('${bolsa.nome}')"
                >
                    Ver detalhes →
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// =====================================================
// VER DETALHES DA BOLSA
// =====================================================

function verBolsa(nome) {

    const bolsa = bolsas.find(
        item => item.nome === nome
    );


    if (!bolsa) {

        alert("Bolsa não encontrada.");

        return;

    }


    alert(

        `🎓 ${bolsa.nome}\n\n` +

        `Instituição: ${bolsa.instituicao}\n` +

        `Categoria: ${bolsa.categoria}\n` +

        `Modalidade: ${bolsa.modalidade}\n` +

        `Local: ${bolsa.local}\n` +

        `Benefício: ${bolsa.beneficio}\n\n` +

        `Compatibilidade: ${bolsa.compatibilidade}%`

    );

}


// =====================================================
// BOLSAS SALVAS
// =====================================================

function mostrarSalvas() {

    const salvas = JSON.parse(
        localStorage.getItem("bolsasSalvas")
    ) || [];


    if (salvas.length === 0) {

        alert(
            "❤️ Você ainda não salvou nenhuma bolsa."
        );

        return;

    }


    alert(
        "❤️ Suas bolsas salvas:\n\n" +
        salvas.join("\n")
    );

}


// =====================================================
// VOLTAR PARA DASHBOARD
// =====================================================

function voltarDashboard() {

    window.location.href = "dashboard.html";

}


// =====================================================
// IR PARA FACULDADES
// =====================================================

function irParaFaculdades() {

    window.location.href = "faculdades.html";

}