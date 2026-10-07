/* =========================================================
   MEU FUTURO
   METAS.JS
   Sistema de metas pessoais
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formMeta");
    const listaMetas = document.getElementById("listaMetas");

    const totalMetas = document.getElementById("totalMetas");
    const metasConcluidas = document.getElementById("metasConcluidas");
    const metasAndamento = document.getElementById("metasAndamento");
    const progressoGeral = document.getElementById("progressoGeral");
    const barraProgresso = document.getElementById("barraProgresso");

    let metas = JSON.parse(localStorage.getItem("meuFuturoMetas")) || [];

    /* =====================================================
       FORMATAR MOEDA
    ===================================================== */

    function formatarMoeda(valor) {

        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }


    /* =====================================================
       SALVAR METAS
    ===================================================== */

    function salvarMetas() {

        localStorage.setItem(
            "meuFuturoMetas",
            JSON.stringify(metas)
        );

    }


    /* =====================================================
       RENDERIZAR METAS
    ===================================================== */

    function renderizarMetas() {

        if (!listaMetas) return;

        listaMetas.innerHTML = "";

        if (metas.length === 0) {

            listaMetas.innerHTML = `
                <div class="estado-vazio">

                    <div class="estado-icon">
                        🎯
                    </div>

                    <h3>
                        Você ainda não possui metas
                    </h3>

                    <p>
                        Comece adicionando uma meta para
                        construir o seu futuro.
                    </p>

                </div>
            `;

            atualizarResumo();

            return;
        }


        metas.forEach(meta => {

            const percentual = Math.min(
                Math.max(Number(meta.progresso) || 0, 0),
                100
            );


            let classeStatus = "andamento";
            let textoStatus = "Em andamento";

            if (percentual >= 100) {

                classeStatus = "concluida";
                textoStatus = "Concluída";

            }
            else if (percentual === 0) {

                classeStatus = "pendente";
                textoStatus = "Não iniciada";

            }


            const artigo = document.createElement("article");

            artigo.className = "meta-card";

            artigo.dataset.id = meta.id;


            artigo.innerHTML = `

                <div class="meta-topo">

                    <div class="meta-categoria">

                        ${obterIcone(meta.categoria)}

                        ${obterNomeCategoria(meta.categoria)}

                    </div>

                    <button
                        type="button"
                        class="btn-excluir-meta"
                        data-acao="excluir"
                        data-id="${meta.id}"
                        title="Excluir meta"
                    >
                        🗑️
                    </button>

                </div>


                <h3>
                    ${escaparHTML(meta.titulo)}
                </h3>


                <p class="meta-descricao">
                    ${escaparHTML(
                        meta.descricao || "Sem descrição."
                    )}
                </p>


                <div class="meta-info">

                    <div>

                        <span>
                            PRAZO
                        </span>

                        <strong>
                            ${meta.prazo || "Sem prazo"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            VALOR
                        </span>

                        <strong>
                            ${formatarMoeda(meta.valor)}
                        </strong>

                    </div>

                </div>


                <div class="meta-progresso">

                    <div class="progresso-topo">

                        <span>
                            Progresso
                        </span>

                        <strong>
                            ${percentual}%
                        </strong>

                    </div>


                    <div class="progresso-barra">

                        <div
                            class="progresso-preenchimento"
                            style="width: ${percentual}%"
                        ></div>

                    </div>

                </div>


                <div class="meta-acoes">

                    <button
                        type="button"
                        class="btn-progresso"
                        data-acao="diminuir"
                        data-id="${meta.id}"
                    >
                        −
                    </button>


                    <button
                        type="button"
                        class="btn-progresso"
                        data-acao="aumentar"
                        data-id="${meta.id}"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="btn-concluir"
                        data-acao="concluir"
                        data-id="${meta.id}"
                    >
                        ${
                            percentual >= 100
                                ? "↩ Reabrir"
                                : "✓ Concluir"
                        }
                    </button>

                </div>


                <div class="meta-status ${classeStatus}">

                    ${
                        percentual >= 100
                            ? "✓"
                            : "◐"
                    }

                    ${textoStatus}

                </div>

            `;


            listaMetas.appendChild(artigo);

        });


        atualizarResumo();

    }


    /* =====================================================
       ÍCONE DA CATEGORIA
    ===================================================== */

    function obterIcone(categoria) {

        const icones = {

            educacao: "🎓",
            carreira: "💼",
            financeiro: "💰",
            moradia: "🏠",
            pessoal: "❤️",
            viagem: "✈️",
            saude: "💪",
            sonho: "🚀",
            outros: "⭐"

        };

        return icones[categoria] || "🎯";

    }


    /* =====================================================
       NOME DA CATEGORIA
    ===================================================== */

    function obterNomeCategoria(categoria) {

        const nomes = {

            educacao: "Educação",
            carreira: "Carreira",
            financeiro: "Finanças",
            moradia: "Moradia",
            pessoal: "Vida pessoal",
            viagem: "Viagens",
            saude: "Saúde",
            sonho: "Sonhos",
            outros: "Outros"

        };

        return nomes[categoria] || "Outros";

    }


    /* =====================================================
       ESCAPAR HTML
    ===================================================== */

    function escaparHTML(texto) {

        const div = document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;

    }


    /* =====================================================
       ATUALIZAR RESUMO
    ===================================================== */

    function atualizarResumo() {

        const total = metas.length;

        const concluidas = metas.filter(
            meta => Number(meta.progresso) >= 100
        ).length;

        const andamento = metas.filter(
            meta =>
                Number(meta.progresso) > 0 &&
                Number(meta.progresso) < 100
        ).length;


        let progresso = 0;

        if (total > 0) {

            progresso =
                metas.reduce(
                    (soma, meta) =>
                        soma + Number(meta.progresso || 0),
                    0
                ) / total;

        }


        progresso = Math.round(progresso);


        if (totalMetas) {

            totalMetas.textContent = total;

        }


        if (metasConcluidas) {

            metasConcluidas.textContent = concluidas;

        }


        if (metasAndamento) {

            metasAndamento.textContent = andamento;

        }


        if (progressoGeral) {

            progressoGeral.textContent =
                progresso + "%";

        }


        if (barraProgresso) {

            barraProgresso.style.width =
                progresso + "%";

        }

    }


    /* =====================================================
       ADICIONAR META
    ===================================================== */

    function adicionarMeta(event) {

        event.preventDefault();


        const titulo =
            document.getElementById("tituloMeta")?.value.trim();

        const categoria =
            document.getElementById("categoriaMeta")?.value;

        const prazo =
            document.getElementById("prazoMeta")?.value;

        const valor =
            document.getElementById("valorMeta")?.value;

        const descricao =
            document.getElementById("descricaoMeta")?.value.trim();


        if (!titulo) {

            mostrarMensagem(
                "Digite um nome para sua meta."
            );

            return;

        }


        const novaMeta = {

            id: Date.now(),

            titulo: titulo,

            categoria: categoria || "outros",

            prazo: prazo || "",

            valor: Number(valor) || 0,

            descricao: descricao || "",

            progresso: 0,

            criadaEm: new Date().toISOString()

        };


        metas.push(novaMeta);

        salvarMetas();

        renderizarMetas();


        form.reset();


        fecharModal();


        mostrarMensagem(
            "Meta adicionada com sucesso! 🎯"
        );

    }


    /* =====================================================
       AUMENTAR PROGRESSO
    ===================================================== */

    function aumentarProgresso(id) {

        const meta = metas.find(
            item => item.id === id
        );

        if (!meta) return;


        meta.progresso =
            Math.min(
                Number(meta.progresso || 0) + 10,
                100
            );


        salvarMetas();

        renderizarMetas();

    }


    /* =====================================================
       DIMINUIR PROGRESSO
    ===================================================== */

    function diminuirProgresso(id) {

        const meta = metas.find(
            item => item.id === id
        );

        if (!meta) return;


        meta.progresso =
            Math.max(
                Number(meta.progresso || 0) - 10,
                0
            );


        salvarMetas();

        renderizarMetas();

    }


    /* =====================================================
       CONCLUIR META
    ===================================================== */

    function concluirMeta(id) {

        const meta = metas.find(
            item => item.id === id
        );

        if (!meta) return;


        if (Number(meta.progresso) >= 100) {

            meta.progresso = 0;

            mostrarMensagem(
                "Meta reaberta."
            );

        }
        else {

            meta.progresso = 100;

            mostrarMensagem(
                "Parabéns! Meta concluída! 🎉"
            );

        }


        salvarMetas();

        renderizarMetas();

    }


    /* =====================================================
       EXCLUIR META
    ===================================================== */

    function excluirMeta(id) {

        const meta = metas.find(
            item => item.id === id
        );

        if (!meta) return;


        const confirmar =
            confirm(
                `Deseja excluir a meta "${meta.titulo}"?`
            );


        if (!confirmar) return;


        metas = metas.filter(
            item => item.id !== id
        );


        salvarMetas();

        renderizarMetas();


        mostrarMensagem(
            "Meta excluída."
        );

    }


    /* =====================================================
       EVENTOS DOS BOTÕES
    ===================================================== */

    if (listaMetas) {

        listaMetas.addEventListener(
            "click",
            event => {

                const botao =
                    event.target.closest("button");

                if (!botao) return;


                const acao =
                    botao.dataset.acao;

                const id =
                    Number(botao.dataset.id);


                if (!acao || !id) return;


                if (acao === "aumentar") {

                    aumentarProgresso(id);

                }


                if (acao === "diminuir") {

                    diminuirProgresso(id);

                }


                if (acao === "concluir") {

                    concluirMeta(id);

                }


                if (acao === "excluir") {

                    excluirMeta(id);

                }

            }
        );

    }


    /* =====================================================
       MODAL
    ===================================================== */

    window.abrirModal = function () {

        const modal =
            document.getElementById("modalMeta");

        if (!modal) return;

        modal.classList.add("ativo");

        document.body.classList.add(
            "modal-aberto"
        );

    };


    window.fecharModal = function () {

        const modal =
            document.getElementById("modalMeta");

        if (!modal) return;

        modal.classList.remove("ativo");

        document.body.classList.remove(
            "modal-aberto"
        );

    };


    /* =====================================================
       FECHAR MODAL COM ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                fecharModal();

            }

        }
    );


    /* =====================================================
       BOTÃO DASHBOARD
    ===================================================== */

    window.voltarDashboard = function () {

        window.location.href =
            "dashboard.html";

    };


    /* =====================================================
       MENSAGEM
    ===================================================== */

    function mostrarMensagem(texto) {

        let mensagem =
            document.getElementById(
                "mensagemSistema"
            );


        if (!mensagem) {

            mensagem =
                document.createElement("div");

            mensagem.id =
                "mensagemSistema";

            mensagem.className =
                "mensagem-sistema";

            document.body.appendChild(
                mensagem
            );

        }


        mensagem.textContent = texto;

        mensagem.classList.add("mostrar");


        setTimeout(() => {

            mensagem.classList.remove(
                "mostrar"
            );

        }, 3000);

    }


    /* =====================================================
       FORMULÁRIO
    ===================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            adicionarMeta
        );

    }


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    renderizarMetas();

});