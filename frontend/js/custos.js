/* =========================================================
   MEU FUTURO
   CUSTOS.JS
   Planejador financeiro estudantil
========================================================= */


/* =========================================================
   FUNÇÃO DE MOEDA
========================================================= */

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================================================
   PEGAR VALOR DOS INPUTS
========================================================= */

function pegarValor(id) {
    const elemento = document.getElementById(id);

    if (!elemento) {
        return 0;
    }

    const valor = Number(elemento.value);

    return Number.isFinite(valor) ? valor : 0;
}


/* =========================================================
   CALCULAR TODOS OS CUSTOS
========================================================= */

function calcularCustos() {

    const faculdade = pegarValor("faculdade");
    const moradia = pegarValor("moradia");
    const alimentacao = pegarValor("alimentacao");
    const transporte = pegarValor("transporte");
    const contas = pegarValor("contas");
    const outros = pegarValor("outros");

    const totalMensal =
        faculdade +
        moradia +
        alimentacao +
        transporte +
        contas +
        outros;

    const totalAnual = totalMensal * 12;


    /* -----------------------------------------------------
       RESUMO PRINCIPAL
    ----------------------------------------------------- */

    const custoTotal = document.getElementById("custoTotal");
    const custoAnual = document.getElementById("custoAnual");

    if (custoTotal) {
        custoTotal.textContent = formatarMoeda(totalMensal);
    }

    if (custoAnual) {
        custoAnual.textContent = formatarMoeda(totalAnual);
    }


    /* -----------------------------------------------------
       RESULTADOS
    ----------------------------------------------------- */

    const resultadoMensal =
        document.getElementById("resultadoMensal");

    const resultadoAnual =
        document.getElementById("resultadoAnual");

    const resultadoFaculdade =
        document.getElementById("resultadoFaculdade");

    const resultadoMoradia =
        document.getElementById("resultadoMoradia");


    if (resultadoMensal) {
        resultadoMensal.textContent =
            formatarMoeda(totalMensal);
    }

    if (resultadoAnual) {
        resultadoAnual.textContent =
            formatarMoeda(totalAnual);
    }

    if (resultadoFaculdade) {
        resultadoFaculdade.textContent =
            formatarMoeda(faculdade);
    }

    if (resultadoMoradia) {
        resultadoMoradia.textContent =
            formatarMoeda(moradia);
    }


    /* -----------------------------------------------------
       DISTRIBUIÇÃO DOS GASTOS
    ----------------------------------------------------- */

    atualizarDistribuicao(
        faculdade,
        moradia,
        alimentacao,
        transporte,
        contas,
        outros,
        totalMensal
    );


    /* -----------------------------------------------------
       ORÇAMENTO
    ----------------------------------------------------- */

    atualizarOrcamento();


    /* -----------------------------------------------------
       BOLSA
    ----------------------------------------------------- */

    calcularBolsa();


    /* -----------------------------------------------------
       SALVAR DADOS
    ----------------------------------------------------- */

    salvarSimulacao();
}


/* =========================================================
   DISTRIBUIÇÃO DOS GASTOS
========================================================= */

function atualizarDistribuicao(
    faculdade,
    moradia,
    alimentacao,
    transporte,
    contas,
    outros,
    total
) {

    const categorias = [
        {
            valor: faculdade,
            id: "barraFaculdade"
        },
        {
            valor: moradia,
            id: "barraMoradia"
        },
        {
            valor: alimentacao,
            id: "barraAlimentacao"
        },
        {
            valor: transporte,
            id: "barraTransporte"
        },
        {
            valor: contas,
            id: "barraContas"
        },
        {
            valor: outros,
            id: "barraOutros"
        }
    ];


    categorias.forEach(categoria => {

        const barra =
            document.getElementById(categoria.id);

        if (!barra) {
            return;
        }

        let porcentagem = 0;

        if (total > 0) {
            porcentagem =
                (categoria.valor / total) * 100;
        }

        barra.style.width =
            porcentagem + "%";
    });
}


/* =========================================================
   ATUALIZAR ORÇAMENTO
========================================================= */

function atualizarOrcamento() {

    const orcamentoInput =
        document.getElementById("orcamento");

    const valorOrcamento =
        document.getElementById("valorOrcamento");

    const situacao =
        document.getElementById("situacaoOrcamento");


    if (!orcamentoInput) {
        return;
    }


    const orcamento =
        Number(orcamentoInput.value) || 0;


    const faculdade =
        pegarValor("faculdade");

    const moradia =
        pegarValor("moradia");

    const alimentacao =
        pegarValor("alimentacao");

    const transporte =
        pegarValor("transporte");

    const contas =
        pegarValor("contas");

    const outros =
        pegarValor("outros");


    const total =
        faculdade +
        moradia +
        alimentacao +
        transporte +
        contas +
        outros;


    /* -----------------------------------------------------
       MOSTRAR VALOR DO ORÇAMENTO
    ----------------------------------------------------- */

    if (valorOrcamento) {
        valorOrcamento.textContent =
            formatarMoeda(orcamento);
    }


    /* -----------------------------------------------------
       SITUAÇÃO
    ----------------------------------------------------- */

    if (!situacao) {
        return;
    }


    const diferenca =
        orcamento - total;


    if (diferenca > 0) {

        situacao.innerHTML = `
            <strong>✅ Seu orçamento consegue cobrir os custos.</strong>
            <span>
                Você ainda teria
                <b>${formatarMoeda(diferenca)}</b>
                disponíveis por mês.
            </span>
        `;

    } else if (diferenca === 0) {

        situacao.innerHTML = `
            <strong>🎯 Seu orçamento está exatamente no limite.</strong>
            <span>
                O valor disponível cobre exatamente
                os custos estimados.
            </span>
        `;

    } else {

        situacao.innerHTML = `
            <strong>⚠️ Seu orçamento não é suficiente.</strong>
            <span>
                Faltariam
                <b>${formatarMoeda(Math.abs(diferenca))}</b>
                por mês para cobrir os custos.
            </span>
        `;
    }
}


/* =========================================================
   SIMULAÇÃO DE BOLSA
========================================================= */

function calcularBolsa() {

    const descontoElemento =
        document.getElementById("descontoBolsa");

    if (!descontoElemento) {
        return;
    }


    const desconto =
        Number(descontoElemento.value) || 0;


    const faculdade =
        pegarValor("faculdade");

    const moradia =
        pegarValor("moradia");

    const alimentacao =
        pegarValor("alimentacao");

    const transporte =
        pegarValor("transporte");

    const contas =
        pegarValor("contas");

    const outros =
        pegarValor("outros");


    const totalAtual =
        faculdade +
        moradia +
        alimentacao +
        transporte +
        contas +
        outros;


    /* -----------------------------------------------------
       DESCONTO SOMENTE NA FACULDADE
    ----------------------------------------------------- */

    const valorDesconto =
        faculdade * (desconto / 100);


    const novaFaculdade =
        faculdade - valorDesconto;


    const novoTotal =
        novaFaculdade +
        moradia +
        alimentacao +
        transporte +
        contas +
        outros;


    const custoAtual =
        document.getElementById("custoAtualBolsa");

    const custoComBolsa =
        document.getElementById("custoComBolsa");

    const economia =
        document.getElementById("economiaBolsa");


    if (custoAtual) {
        custoAtual.textContent =
            formatarMoeda(totalAtual);
    }

    if (custoComBolsa) {
        custoComBolsa.textContent =
            formatarMoeda(novoTotal);
    }

    if (economia) {
        economia.textContent =
            formatarMoeda(valorDesconto);
    }
}


/* =========================================================
   SALVAR SIMULAÇÃO
========================================================= */

function salvarSimulacao() {

    const dados = {

        faculdade:
            document.getElementById("faculdade")?.value || 0,

        moradia:
            document.getElementById("moradia")?.value || 0,

        alimentacao:
            document.getElementById("alimentacao")?.value || 0,

        transporte:
            document.getElementById("transporte")?.value || 0,

        contas:
            document.getElementById("contas")?.value || 0,

        outros:
            document.getElementById("outros")?.value || 0,

        orcamento:
            document.getElementById("orcamento")?.value || 2500,

        descontoBolsa:
            document.getElementById("descontoBolsa")?.value || 0
    };


    localStorage.setItem(
        "meuFuturoCustos",
        JSON.stringify(dados)
    );
}


/* =========================================================
   CARREGAR SIMULAÇÃO
========================================================= */

function carregarSimulacao() {

    const dadosSalvos =
        localStorage.getItem("meuFuturoCustos");


    if (!dadosSalvos) {

        calcularCustos();

        return;
    }


    try {

        const dados =
            JSON.parse(dadosSalvos);


        const campos = [
            "faculdade",
            "moradia",
            "alimentacao",
            "transporte",
            "contas",
            "outros",
            "orcamento",
            "descontoBolsa"
        ];


        campos.forEach(id => {

            const elemento =
                document.getElementById(id);

            if (
                elemento &&
                dados[id] !== undefined
            ) {

                elemento.value =
                    dados[id];
            }
        });


        calcularCustos();


    } catch (erro) {

        console.error(
            "Erro ao carregar simulação:",
            erro
        );

        calcularCustos();
    }
}


/* =========================================================
   VOLTAR PARA DASHBOARD
========================================================= */

function voltarDashboard() {

    window.location.href =
        "dashboard.html";
}


/* =========================================================
   IR PARA MORADIAS
========================================================= */

function irParaMoradias() {

    window.location.href =
        "moradias.html";
}


/* =========================================================
   IR PARA FACULDADES
========================================================= */

function irParaFaculdades() {

    window.location.href =
        "faculdades.html";
}


/* =========================================================
   IR PARA BOLSAS
========================================================= */

function irParaBolsas() {

    window.location.href =
        "bolsas.html";
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ---------------------------------------------
           CALCULAR AO ABRIR A PÁGINA
        --------------------------------------------- */

        carregarSimulacao();


        /* ---------------------------------------------
           ATUALIZAR ENQUANTO DIGITA
        --------------------------------------------- */

        const campos =
            document.querySelectorAll(
                'input[type="number"]'
            );


        campos.forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    calcularCustos();

                }
            );
        });


        /* ---------------------------------------------
           ATUALIZAR BOLSA
        --------------------------------------------- */

        const bolsa =
            document.getElementById("descontoBolsa");


        if (bolsa) {

            bolsa.addEventListener(
                "change",
                calcularBolsa
            );
        }
    }
);