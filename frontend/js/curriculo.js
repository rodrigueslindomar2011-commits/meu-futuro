"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const $ = (id) => document.getElementById(id);

    const API_IA_CHAT = "/api/ia/chat";
    const API_IA_STATUS = "/api/ia/status";

    let modeloAtual =
        localStorage.getItem("meu_futuro_modelo_curriculo") ||
        "estudante";

    let zoomAtual = 1;
    let enviandoIA = false;
    let historicoIA = [];

    let curriculo = {
        nome: "",
        titulo: "",
        email: "",
        telefone: "",
        cidade: "",
        site: "",
        foto: "",
        objetivo: "",
        sobre: "",
        habilidades: "",
        formacoes: [],
        experiencias: [],
        cursos: [],
        idiomas: [],
        projetos: []
    };

    iniciar();


    /* =========================================================
       INICIALIZAÇÃO
    ========================================================= */

    function iniciar() {

        carregarCurriculo();
        carregarHistoricoIA();
        configurarCampos();
        configurarModelos();
        configurarTabs();
        configurarAparencia();
        configurarBotoes();
        configurarFoto();
        configurarListas();
        configurarIA();
        aplicarConfiguracoesSalvas();
        atualizarPreview();
        atualizarProgresso();
        verificarIA();

    }


    /* =========================================================
       JWT
    ========================================================= */

    function obterToken() {

        return localStorage.getItem("token");

    }


    /* =========================================================
       CURRÍCULO
    ========================================================= */

    function carregarCurriculo() {

        try {

            const salvo =
                localStorage.getItem(
                    "meu_futuro_curriculo"
                );

            if (!salvo) return;

            const dados =
                JSON.parse(salvo);

            curriculo = {

                ...curriculo,

                ...dados,

                formacoes:
                    Array.isArray(dados.formacoes)
                        ? dados.formacoes
                        : [],

                experiencias:
                    Array.isArray(dados.experiencias)
                        ? dados.experiencias
                        : [],

                cursos:
                    Array.isArray(dados.cursos)
                        ? dados.cursos
                        : [],

                idiomas:
                    Array.isArray(dados.idiomas)
                        ? dados.idiomas
                        : [],

                projetos:
                    Array.isArray(dados.projetos)
                        ? dados.projetos
                        : []

            };

        } catch (erro) {

            console.error(
                "Erro ao carregar currículo:",
                erro
            );

        }

    }


    function salvarAutomaticamente() {

        try {

            localStorage.setItem(
                "meu_futuro_curriculo",
                JSON.stringify(curriculo)
            );

        } catch (erro) {

            console.error(
                "Erro ao salvar currículo:",
                erro
            );

        }

    }


    function salvarCurriculo() {

        try {

            localStorage.setItem(
                "meu_futuro_curriculo",
                JSON.stringify(curriculo)
            );

            localStorage.setItem(
                "meu_futuro_modelo_curriculo",
                modeloAtual
            );

            const status =
                $("saveStatus");

            if (status) {

                status.textContent =
                    "Currículo salvo";

            }

            const botao =
                $("saveButton");

            if (botao) {

                botao.innerHTML =
                    "✓ Salvo";

                setTimeout(() => {

                    botao.innerHTML =
                        "✓ Salvar currículo";

                }, 1500);

            }

            mostrarToast(
                "Currículo salvo com sucesso."
            );

        } catch (erro) {

            console.error(
                "Erro ao salvar:",
                erro
            );

            mostrarToast(
                "Não foi possível salvar o currículo."
            );

        }

    }


    function configurarCampos() {

        const campos = [
            "nome",
            "titulo",
            "email",
            "telefone",
            "cidade",
            "site",
            "objetivo",
            "sobre",
            "habilidades"
        ];

        campos.forEach((id) => {

            const campo = $(id);

            if (!campo) return;

            campo.value =
                curriculo[id] || "";

            campo.addEventListener(
                "input",
                () => {

                    curriculo[id] =
                        campo.value;

                    salvarAutomaticamente();
                    atualizarPreview();
                    atualizarProgresso();

                }
            );

        });

    }


    /* =========================================================
       MODELOS
    ========================================================= */

    function configurarModelos() {

        document
            .querySelectorAll(".model")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        modeloAtual =
                            botao.dataset.model ||
                            "estudante";

                        localStorage.setItem(
                            "meu_futuro_modelo_curriculo",
                            modeloAtual
                        );

                        document
                            .querySelectorAll(".model")
                            .forEach((item) => {

                                item.classList.remove(
                                    "active"
                                );

                            });

                        botao.classList.add(
                            "active"
                        );

                        aplicarModelo();

                    }
                );

            });

    }


    function aplicarModelo() {

        const resume =
            $("resume");

        if (!resume) return;

        resume.className =
            "resume template-" +
            modeloAtual +
            " model-changing";

        setTimeout(() => {

            resume.classList.remove(
                "model-changing"
            );

        }, 400);

    }


    /* =========================================================
       ABAS
    ========================================================= */

    function configurarTabs() {

        document
            .querySelectorAll(".tab")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        const nomeTab =
                            botao.dataset.tab;

                        document
                            .querySelectorAll(".tab")
                            .forEach((item) => {

                                item.classList.remove(
                                    "active"
                                );

                            });

                        document
                            .querySelectorAll(".tab-content")
                            .forEach((item) => {

                                item.classList.remove(
                                    "active"
                                );

                            });

                        botao.classList.add(
                            "active"
                        );

                        const conteudo =
                            $("tab-" + nomeTab);

                        if (conteudo) {

                            conteudo.classList.add(
                                "active"
                            );

                        }

                    }
                );

            });

    }


    /* =========================================================
       APARÊNCIA
    ========================================================= */

    function configurarAparencia() {

        const botao =
            $("themeButton");

        if (!botao) return;

        botao.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark"
                );

                const tema =
                    document.body.classList.contains(
                        "dark"
                    )
                        ? "dark"
                        : "light";

                localStorage.setItem(
                    "meu_futuro_tema_curriculo",
                    tema
                );

                botao.textContent =
                    tema === "dark"
                        ? "☾"
                        : "☼";

            }
        );

    }


    function aplicarConfiguracoesSalvas() {

        const tema =
            localStorage.getItem(
                "meu_futuro_tema_curriculo"
            );

        if (tema === "dark") {

            document.body.classList.add(
                "dark"
            );

            if ($("themeButton")) {

                $("themeButton").textContent =
                    "☾";

            }

        }

        document
            .querySelectorAll(".model")
            .forEach((item) => {

                item.classList.toggle(
                    "active",
                    item.dataset.model ===
                        modeloAtual
                );

            });

        aplicarModelo();

    }


    /* =========================================================
       BOTÕES
    ========================================================= */

    function configurarBotoes() {

        const saveButton =
            $("saveButton");

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                salvarCurriculo
            );

        }


        const zoomIn =
            $("zoomIn");

        if (zoomIn) {

            zoomIn.addEventListener(
                "click",
                () => {

                    zoomAtual =
                        Math.min(
                            1.25,
                            zoomAtual + 0.05
                        );

                    aplicarZoom();

                }
            );

        }


        const zoomOut =
            $("zoomOut");

        if (zoomOut) {

            zoomOut.addEventListener(
                "click",
                () => {

                    zoomAtual =
                        Math.max(
                            0.7,
                            zoomAtual - 0.05
                        );

                    aplicarZoom();

                }
            );

        }


        const printButton =
            $("printButton");

        if (printButton) {

            printButton.addEventListener(
                "click",
                () => {

                    window.print();

                }
            );

        }


        const pdfButton =
            $("pdfButton");

        if (pdfButton) {

            pdfButton.addEventListener(
                "click",
                () => {

                    mostrarToast(
                        "Na janela de impressão, escolha Salvar como PDF."
                    );

                    setTimeout(() => {

                        window.print();

                    }, 500);

                }
            );

        }

    }


    function aplicarZoom() {

        const resume =
            $("resume");

        if (!resume) return;

        resume.style.transform =
            "scale(" + zoomAtual + ")";

        const zoomValue =
            $("zoomValue");

        if (zoomValue) {

            zoomValue.textContent =
                Math.round(
                    zoomAtual * 100
                ) + "%";

        }

    }


    /* =========================================================
       FOTO
    ========================================================= */

    function configurarFoto() {

        const input =
            $("photoInput");

        if (!input) return;

        input.addEventListener(
            "change",
            () => {

                const arquivo =
                    input.files[0];

                if (!arquivo) return;

                const leitor =
                    new FileReader();

                leitor.onload =
                    (evento) => {

                        curriculo.foto =
                            evento.target.result;

                        salvarAutomaticamente();
                        atualizarFoto();
                        atualizarPreview();

                    };

                leitor.readAsDataURL(
                    arquivo
                );

            }
        );


        const removePhoto =
            $("removePhoto");

        if (removePhoto) {

            removePhoto.addEventListener(
                "click",
                () => {

                    curriculo.foto = "";
                    input.value = "";

                    salvarAutomaticamente();
                    atualizarFoto();
                    atualizarPreview();

                }
            );

        }

        atualizarFoto();

    }


    function atualizarFoto() {

        const imagens = [
            $("photoPreview"),
            $("resumePhoto")
        ];

        imagens.forEach((imagem) => {

            if (!imagem) return;

            if (curriculo.foto) {

                imagem.src =
                    curriculo.foto;

                imagem.classList.add(
                    "visible"
                );

            } else {

                imagem.removeAttribute(
                    "src"
                );

                imagem.classList.remove(
                    "visible"
                );

            }

        });


        const photoPlaceholder =
            $("photoPlaceholder");

        if (photoPlaceholder) {

            photoPlaceholder.style.display =
                curriculo.foto
                    ? "none"
                    : "block";

        }


        const resumePhotoPlaceholder =
            $("resumePhotoPlaceholder");

        if (resumePhotoPlaceholder) {

            resumePhotoPlaceholder.style.display =
                curriculo.foto
                    ? "none"
                    : "block";

        }

    }


    /* =========================================================
       LISTAS DINÂMICAS
    ========================================================= */

    function configurarListas() {

        configurarLista(
            "addFormacao",
            "formacoesList",
            "formacoes"
        );

        configurarLista(
            "addExperiencia",
            "experienciasList",
            "experiencias"
        );

        configurarLista(
            "addCurso",
            "cursosList",
            "cursos"
        );

        configurarLista(
            "addIdioma",
            "idiomasList",
            "idiomas"
        );

        configurarLista(
            "addProjeto",
            "projetosList",
            "projetos"
        );

        renderizarTodasAsListas();

    }


    function configurarLista(
        botaoId,
        listaId,
        tipo
    ) {

        const botao =
            $(botaoId);

        if (!botao) return;

        botao.addEventListener(
            "click",
            () => {

                const novo =
                    criarItemVazio(tipo);

                curriculo[tipo].push(
                    novo
                );

                salvarAutomaticamente();

                renderizarLista(
                    listaId,
                    tipo
                );

                atualizarPreview();
                atualizarProgresso();

            }
        );

    }


    function criarItemVazio(tipo) {

        if (tipo === "formacoes") {

            return {
                curso: "",
                instituicao: "",
                inicio: "",
                fim: "",
                descricao: ""
            };

        }

        if (tipo === "experiencias") {

            return {
                cargo: "",
                empresa: "",
                inicio: "",
                fim: "",
                descricao: ""
            };

        }

        if (tipo === "cursos") {

            return {
                nome: "",
                instituicao: "",
                ano: ""
            };

        }

        if (tipo === "idiomas") {

            return {
                idioma: "",
                nivel: ""
            };

        }

        return {
            nome: "",
            descricao: ""
        };

    }


    function renderizarTodasAsListas() {

        renderizarLista(
            "formacoesList",
            "formacoes"
        );

        renderizarLista(
            "experienciasList",
            "experiencias"
        );

        renderizarLista(
            "cursosList",
            "cursos"
        );

        renderizarLista(
            "idiomasList",
            "idiomas"
        );

        renderizarLista(
            "projetosList",
            "projetos"
        );

    }


    function renderizarLista(
        listaId,
        tipo
    ) {

        const lista =
            $(listaId);

        if (!lista) return;

        lista.innerHTML = "";

        curriculo[tipo].forEach(
            (item, index) => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "dynamic-item";


                if (tipo === "formacoes") {

                    div.innerHTML = `
                        <div class="dynamic-item-grid">

                            ${campoDinamico(
                                "Curso / formação",
                                item.curso,
                                "curso"
                            )}

                            ${campoDinamico(
                                "Instituição",
                                item.instituicao,
                                "instituicao"
                            )}

                            ${campoDinamico(
                                "Início",
                                item.inicio,
                                "inicio"
                            )}

                            ${campoDinamico(
                                "Conclusão",
                                item.fim,
                                "fim"
                            )}

                        </div>

                        ${textareaDinamico(
                            "Descrição",
                            item.descricao,
                            "descricao"
                        )}

                        <button
                            class="remove-item"
                            type="button"
                        >
                            Remover formação
                        </button>
                    `;

                }


                if (tipo === "experiencias") {

                    div.innerHTML = `
                        <div class="dynamic-item-grid">

                            ${campoDinamico(
                                "Cargo",
                                item.cargo,
                                "cargo"
                            )}

                            ${campoDinamico(
                                "Empresa",
                                item.empresa,
                                "empresa"
                            )}

                            ${campoDinamico(
                                "Início",
                                item.inicio,
                                "inicio"
                            )}

                            ${campoDinamico(
                                "Fim",
                                item.fim,
                                "fim"
                            )}

                        </div>

                        ${textareaDinamico(
                            "Descrição",
                            item.descricao,
                            "descricao"
                        )}

                        <button
                            class="remove-item"
                            type="button"
                        >
                            Remover experiência
                        </button>
                    `;

                }


                if (tipo === "cursos") {

                    div.innerHTML = `
                        <div class="dynamic-item-grid">

                            ${campoDinamico(
                                "Nome do curso",
                                item.nome,
                                "nome"
                            )}

                            ${campoDinamico(
                                "Instituição",
                                item.instituicao,
                                "instituicao"
                            )}

                            ${campoDinamico(
                                "Ano",
                                item.ano,
                                "ano"
                            )}

                        </div>

                        <button
                            class="remove-item"
                            type="button"
                        >
                            Remover curso
                        </button>
                    `;

                }


                if (tipo === "idiomas") {

                    div.innerHTML = `
                        <div class="dynamic-item-grid">

                            ${campoDinamico(
                                "Idioma",
                                item.idioma,
                                "idioma"
                            )}

                            ${campoDinamico(
                                "Nível",
                                item.nivel,
                                "nivel"
                            )}

                        </div>

                        <button
                            class="remove-item"
                            type="button"
                        >
                            Remover idioma
                        </button>
                    `;

                }


                if (tipo === "projetos") {

                    div.innerHTML = `
                        ${campoDinamico(
                            "Nome do projeto",
                            item.nome,
                            "nome"
                        )}

                        ${textareaDinamico(
                            "Descrição",
                            item.descricao,
                            "descricao"
                        )}

                        <button
                            class="remove-item"
                            type="button"
                        >
                            Remover projeto
                        </button>
                    `;

                }


                div.querySelectorAll(
                    "input, textarea"
                ).forEach((campo) => {

                    campo.addEventListener(
                        "input",
                        () => {

                            const nomeCampo =
                                campo.dataset.campo;

                            curriculo[tipo][index][
                                nomeCampo
                            ] = campo.value;

                            salvarAutomaticamente();
                            atualizarPreview();
                            atualizarProgresso();

                        }
                    );

                });


                const remover =
                    div.querySelector(
                        ".remove-item"
                    );

                if (remover) {

                    remover.addEventListener(
                        "click",
                        () => {

                            curriculo[tipo].splice(
                                index,
                                1
                            );

                            salvarAutomaticamente();

                            renderizarLista(
                                listaId,
                                tipo
                            );

                            atualizarPreview();
                            atualizarProgresso();

                        }
                    );

                }


                lista.appendChild(div);

            }
        );

    }


    function campoDinamico(
        label,
        valor,
        campo
    ) {

        return `
            <div class="field">

                <label>
                    ${escapeHTML(label)}
                </label>

                <input
                    type="text"
                    value="${escapeAttribute(
                        valor || ""
                    )}"
                    data-campo="${campo}"
                >

            </div>
        `;

    }


    function textareaDinamico(
        label,
        valor,
        campo
    ) {

        return `
            <div class="field">

                <label>
                    ${escapeHTML(label)}
                </label>

                <textarea
                    data-campo="${campo}"
                >${escapeHTML(
                    valor || ""
                )}</textarea>

            </div>
        `;

    }


    /* =========================================================
       PREVIEW
    ========================================================= */

    function atualizarPreview() {

        setText(
            "previewNome",
            curriculo.nome ||
                "Seu Nome"
        );

        setText(
            "previewTitulo",
            curriculo.titulo ||
                "Estudante"
        );

        setText(
            "previewEmail",
            curriculo.email ||
                "seuemail@email.com"
        );

        setText(
            "previewTelefone",
            curriculo.telefone ||
                "(00) 00000-0000"
        );

        setText(
            "previewCidade",
            curriculo.cidade ||
                "Sua cidade"
        );

        setText(
            "previewSite",
            curriculo.site ||
                "Seu portfólio"
        );

        setText(
            "previewObjetivo",
            curriculo.objetivo ||
                "Seu objetivo profissional aparecerá aqui."
        );

        setText(
            "previewSobre",
            curriculo.sobre ||
                "Apresente brevemente quem você é."
        );

        atualizarHabilidades();
        atualizarFormacoes();
        atualizarExperiencias();
        atualizarCursos();
        atualizarIdiomas();
        atualizarProjetos();
        atualizarFoto();

    }


    function atualizarHabilidades() {

        const container =
            $("previewHabilidades");

        if (!container) return;

        const habilidades =
            (curriculo.habilidades || "")
                .split(",")
                .map((item) =>
                    item.trim()
                )
                .filter(Boolean);

        container.innerHTML = "";

        if (!habilidades.length) {

            container.innerHTML = `
                <span class="skill-placeholder">
                    Suas habilidades aparecerão aqui.
                </span>
            `;

            mostrarSecao(
                "previewHabilidadesSection",
                true
            );

            return;

        }

        habilidades.forEach(
            (habilidade) => {

                const span =
                    document.createElement(
                        "span"
                    );

                span.className =
                    "skill";

                span.textContent =
                    habilidade;

                container.appendChild(
                    span
                );

            }
        );

        mostrarSecao(
            "previewHabilidadesSection",
            true
        );

    }


    function atualizarFormacoes() {

        const container =
            $("previewFormacoes");

        if (!container) return;

        container.innerHTML = "";

        curriculo.formacoes.forEach(
            (item) => {

                if (
                    !item.curso &&
                    !item.instituicao &&
                    !item.descricao
                ) {
                    return;
                }

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "resume-item";

                div.innerHTML = `
                    <div class="resume-item-title">
                        ${escapeHTML(
                            item.curso ||
                                "Formação"
                        )}
                    </div>

                    <div class="resume-item-subtitle">

                        ${escapeHTML(
                            item.instituicao ||
                                ""
                        )}

                        ${
                            item.inicio ||
                            item.fim
                                ? " • " +
                                  escapeHTML(
                                      item.inicio ||
                                          ""
                                  ) +
                                  " - " +
                                  escapeHTML(
                                      item.fim ||
                                          ""
                                  )
                                : ""
                        }

                    </div>

                    ${
                        item.descricao
                            ? `
                                <div class="resume-item-description">
                                    ${escapeHTML(
                                        item.descricao
                                    )}
                                </div>
                            `
                            : ""
                    }
                `;

                container.appendChild(
                    div
                );

            }
        );

        mostrarSecao(
            "previewFormacoesSection",
            container.children.length > 0
        );

    }


    function atualizarExperiencias() {

        const container =
            $("previewExperiencias");

        if (!container) return;

        container.innerHTML = "";

        curriculo.experiencias.forEach(
            (item) => {

                if (
                    !item.cargo &&
                    !item.empresa &&
                    !item.descricao
                ) {
                    return;
                }

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "resume-item";

                div.innerHTML = `
                    <div class="resume-item-title">
                        ${escapeHTML(
                            item.cargo ||
                                "Experiência"
                        )}
                    </div>

                    <div class="resume-item-subtitle">

                        ${escapeHTML(
                            item.empresa ||
                                ""
                        )}

                        ${
                            item.inicio ||
                            item.fim
                                ? " • " +
                                  escapeHTML(
                                      item.inicio ||
                                          ""
                                  ) +
                                  " - " +
                                  escapeHTML(
                                      item.fim ||
                                          ""
                                  )
                                : ""
                        }

                    </div>

                    ${
                        item.descricao
                            ? `
                                <div class="resume-item-description">
                                    ${escapeHTML(
                                        item.descricao
                                    )}
                                </div>
                            `
                            : ""
                    }
                `;

                container.appendChild(
                    div
                );

            }
        );

        mostrarSecao(
            "previewExperienciasSection",
            container.children.length > 0
        );

    }


    function atualizarCursos() {

        const container =
            $("previewCursos");

        if (!container) return;

        container.innerHTML = "";

        curriculo.cursos.forEach(
            (item) => {

                if (
                    !item.nome &&
                    !item.instituicao
                ) {
                    return;
                }

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "resume-item";

                div.innerHTML = `
                    <div class="resume-item-title">
                        ${escapeHTML(
                            item.nome ||
                                "Curso"
                        )}
                    </div>

                    <div class="resume-item-subtitle">

                        ${escapeHTML(
                            item.instituicao ||
                                ""
                        )}

                        ${
                            item.ano
                                ? " • " +
                                  escapeHTML(
                                      item.ano
                                  )
                                : ""
                        }

                    </div>
                `;

                container.appendChild(
                    div
                );

            }
        );

        mostrarSecao(
            "previewCursosSection",
            container.children.length > 0
        );

    }


    function atualizarIdiomas() {

        const container =
            $("previewIdiomas");

        if (!container) return;

        container.innerHTML = "";

        curriculo.idiomas.forEach(
            (item) => {

                if (!item.idioma) return;

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "resume-item";

                div.innerHTML = `
                    <div class="resume-item-title">
                        ${escapeHTML(
                            item.idioma
                        )}
                    </div>

                    <div class="resume-item-subtitle">
                        ${escapeHTML(
                            item.nivel ||
                                ""
                        )}
                    </div>
                `;

                container.appendChild(
                    div
                );

            }
        );

        mostrarSecao(
            "previewIdiomasSection",
            container.children.length > 0
        );

    }


    function atualizarProjetos() {

        const container =
            $("previewProjetos");

        if (!container) return;

        container.innerHTML = "";

        curriculo.projetos.forEach(
            (item) => {

                if (
                    !item.nome &&
                    !item.descricao
                ) {
                    return;
                }

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "resume-item";

                div.innerHTML = `
                    <div class="resume-item-title">
                        ${escapeHTML(
                            item.nome ||
                                "Projeto"
                        )}
                    </div>

                    ${
                        item.descricao
                            ? `
                                <div class="resume-item-description">
                                    ${escapeHTML(
                                        item.descricao
                                    )}
                                </div>
                            `
                            : ""
                    }
                `;

                container.appendChild(
                    div
                );

            }
        );

        mostrarSecao(
            "previewProjetosSection",
            container.children.length > 0
        );

    }


    function mostrarSecao(
        id,
        mostrar
    ) {

        const secao =
            $(id);

        if (!secao) return;

        secao.classList.toggle(
            "is-empty",
            !mostrar
        );

    }


    function setText(
        id,
        texto
    ) {

        const elemento =
            $(id);

        if (!elemento) return;

        elemento.textContent =
            texto;

    }


    /* =========================================================
       PROGRESSO
    ========================================================= */

    function atualizarProgresso() {

        let pontos = 0;

        const total = 14;

        const campos = [
            "nome",
            "titulo",
            "email",
            "telefone",
            "cidade",
            "site",
            "objetivo",
            "sobre",
            "habilidades"
        ];

        campos.forEach((id) => {

            const campo =
                document.getElementById(
                    id
                );

            if (!campo) return;

            if (
                campo.value &&
                campo.value.trim() !== ""
            ) {

                pontos++;

            }

        });


        const listas = [
            curriculo.formacoes,
            curriculo.experiencias,
            curriculo.cursos,
            curriculo.idiomas,
            curriculo.projetos
        ];


        listas.forEach((lista) => {

            if (
                Array.isArray(lista) &&
                lista.some((item) =>
                    Object.values(item).some(
                        (valor) =>
                            String(
                                valor || ""
                            ).trim() !== ""
                    )
                )
            ) {

                pontos++;

            }

        });


        const percentual =
            Math.min(
                100,
                Math.round(
                    (pontos / total) *
                        100
                )
            );


        const progressText =
            $("progressText");

        if (progressText) {

            progressText.textContent =
                percentual +
                "% preenchido";

        }


        const editorCounter =
            $("editorCounter");

        if (editorCounter) {

            editorCounter.textContent =
                percentual +
                "%";

        }


        const progressBar =
            $("progressBar");

        if (progressBar) {

            progressBar.style.width =
                percentual +
                "%";

        }

    }


    /* =========================================================
       IA — CONFIGURAÇÃO
    ========================================================= */

    function configurarIA() {

        const enviar = () => {

            const campo =
                $("aiInput");

            if (!campo) return;

            const mensagem =
                campo.value.trim();

            if (!mensagem) return;

            enviarMensagemIA(
                mensagem
            );

            campo.value = "";

            autoResizeAIInput();

        };


        const aiSend =
            $("aiSend");

        if (aiSend) {

            aiSend.addEventListener(
                "click",
                enviar
            );

        }


        const aiInput =
            $("aiInput");

        if (aiInput) {

            aiInput.addEventListener(
                "keydown",
                (evento) => {

                    if (
                        evento.key ===
                            "Enter" &&
                        !evento.shiftKey
                    ) {

                        evento.preventDefault();

                        enviar();

                    }

                }
            );


            aiInput.addEventListener(
                "input",
                autoResizeAIInput
            );

        }


        document
            .querySelectorAll(
                ".ai-suggestion"
            )
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        const mensagem =
                            botao.dataset
                                .aiMessage;

                        if (!mensagem) return;

                        enviarMensagemIA(
                            mensagem
                        );

                    }
                );

            });


        setTimeout(() => {

            autoResizeAIInput();

        }, 100);

    }


    /* =========================================================
       IA — TAMANHO DO CAMPO
    ========================================================= */

    function autoResizeAIInput() {

        const input =
            $("aiInput");

        if (!input) return;

        input.style.height =
            "auto";

        input.style.height =
            Math.min(
                input.scrollHeight,
                160
            ) + "px";

    }


    /* =========================================================
       IA — STATUS
    ========================================================= */

    async function verificarIA() {

        const status =
            $("aiStatus");

        const statusContainer =
            document.querySelector(
                ".ai-status"
            );


        try {

            const token =
                obterToken();

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
                    API_IA_STATUS,
                    {
                        method: "GET",
                        headers: headers
                    }
                );


            if (!resposta.ok) {

                throw new Error(
                    "Servidor retornou " +
                        resposta.status
                );

            }


            const dados =
                await resposta.json();


            if (!status) return;


            if (
                dados.ia ===
                "online"
            ) {

                status.textContent =
                    "Online";

                status.classList.remove(
                    "offline"
                );

                if (statusContainer) {

                    statusContainer.classList.add(
                        "online"
                    );

                }

            } else {

                status.textContent =
                    "IA não configurada";

                status.classList.add(
                    "offline"
                );

                if (statusContainer) {

                    statusContainer.classList.remove(
                        "online"
                    );

                }

            }


        } catch (erro) {

            console.error(
                "Erro ao verificar IA:",
                erro
            );

            if (status) {

                status.textContent =
                    "Servidor offline";

                status.classList.add(
                    "offline"
                );

            }

            if (statusContainer) {

                statusContainer.classList.remove(
                    "online"
                );

            }

        }

    }


    /* =========================================================
       IA — ENVIO DA MENSAGEM
    ========================================================= */

    async function enviarMensagemIA(
        mensagem
    ) {

        if (enviandoIA) return;


        adicionaMensagem(
            "user",
            mensagem
        );


        mostrarDigitando();

        enviandoIA = true;


        const status =
            $("aiStatus");

        const botao =
            $("aiSend");

        const input =
            $("aiInput");


        if (status) {

            status.textContent =
                "Pensando...";

            status.classList.remove(
                "offline"
            );

        }


        if (botao) {

            botao.disabled = true;

            botao.classList.add(
                "loading"
            );

        }


        if (input) {

            input.disabled = true;

        }


        try {

            /* =================================================
               TOKEN JWT
            ================================================= */

            const token =
                obterToken();


            if (!token) {

                throw new Error(
                    "Sessão não encontrada. Faça login novamente."
                );

            }


            /* =================================================
               REQUISIÇÃO PARA A IA
            ================================================= */

            const resposta =
                await fetch(
                    API_IA_CHAT,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify({

                                mensagem:
                                    mensagem,

                                curriculo:
                                    curriculo,

                                historico:
                                    historicoIA

                            })

                    }
                );


            const textoBruto =
                await resposta.text();


            if (!resposta.ok) {

                throw new Error(
                    "Servidor respondeu " +
                        resposta.status +
                        ": " +
                        textoBruto
                );

            }


            let dados;


            try {

                dados =
                    JSON.parse(
                        textoBruto
                    );

            } catch (erro) {

                throw new Error(
                    "O servidor não retornou JSON válido."
                );

            }


            if (
                dados.sucesso ===
                false
            ) {

                throw new Error(
                    dados.erro ||
                        dados.mensagem ||
                        "Erro retornado pelo servidor."
                );

            }


            const texto =
                dados.resposta ||
                dados.mensagem ||
                dados.message ||
                dados.texto ||
                dados.output ||
                "";


            if (!texto) {

                throw new Error(
                    "A IA não retornou nenhum texto."
                );

            }


            removerDigitando();


            adicionaMensagem(
                "assistant",
                texto
            );


            historicoIA.push({

                role: "user",

                content:
                    mensagem

            });


            historicoIA.push({

                role: "assistant",

                content:
                    texto

            });


            historicoIA =
                historicoIA.slice(
                    -20
                );


            localStorage.setItem(
                "meu_futuro_ia_curriculo",
                JSON.stringify(
                    historicoIA
                )
            );


            if (status) {

                status.textContent =
                    "Online";

                status.classList.remove(
                    "offline"
                );

            }


        } catch (erro) {

            console.error(
                "ERRO COMPLETO DA IA:",
                erro
            );


            removerDigitando();


            adicionaMensagem(
                "assistant",
                "Não consegui conectar com a IA agora. Verifique se o servidor está aberto e tente novamente."
            );


            if (status) {

                status.textContent =
                    "Erro de conexão";

                status.classList.add(
                    "offline"
                );

            }


        } finally {

            enviandoIA = false;


            if (botao) {

                botao.disabled =
                    false;

                botao.classList.remove(
                    "loading"
                );

            }


            if (input) {

                input.disabled =
                    false;

                input.focus();

            }

        }

    }


    /* =========================================================
       IA — HISTÓRICO
    ========================================================= */

    function carregarHistoricoIA() {

        try {

            const salvo =
                localStorage.getItem(
                    "meu_futuro_ia_curriculo"
                );

            if (!salvo) return;


            const dados =
                JSON.parse(
                    salvo
                );


            historicoIA =
                Array.isArray(dados)
                    ? dados
                    : [];


        } catch (erro) {

            console.error(
                "Erro ao carregar histórico da IA:",
                erro
            );

            historicoIA = [];

        }

    }


    /* =========================================================
       IA — DIGITANDO
    ========================================================= */

    function mostrarDigitando() {

        removerDigitando();


        const container =
            $("aiMessages");

        if (!container) return;


        const div =
            document.createElement(
                "div"
            );


        div.className =
            "ai-message assistant ai-typing-message";


        div.id =
            "aiTyping";


        div.innerHTML = `
            <div class="message-avatar ai-avatar-mini">
                <span>✦</span>
            </div>

            <div class="message-content">

                <div class="message-name">
                    Meu Futuro IA
                </div>

                <div class="message-bubble typing-bubble">

                    <div class="typing-indicator">

                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                </div>

            </div>
        `;


        container.appendChild(
            div
        );


        requestAnimationFrame(
            () => {

                div.classList.add(
                    "message-visible"
                );

            }
        );


        container.scrollTo({

            top:
                container.scrollHeight,

            behavior:
                "smooth"

        });

    }


    function removerDigitando() {

        const typing =
            $("aiTyping");

        if (typing) {

            typing.remove();

        }

    }


    /* =========================================================
       IA — MENSAGENS
    ========================================================= */

    function adicionaMensagem(
        tipo,
        texto
    ) {

        const container =
            $("aiMessages");

        if (!container) return;


        const div =
            document.createElement(
                "div"
            );


        div.className =
            "ai-message " +
            (
                tipo === "user"
                    ? "user"
                    : "assistant"
            );


        const avatar =
            tipo === "user"
                ? "Você"
                : "✦";


        const nome =
            tipo === "user"
                ? "Você"
                : "Meu Futuro IA";


        div.innerHTML = `
            <div class="message-avatar">
                ${escapeHTML(avatar)}
            </div>

            <div class="message-content">

                <div class="message-name">
                    ${escapeHTML(nome)}
                </div>

                <div class="message-bubble">
                    ${formatarRespostaIA(
                        texto
                    )}
                </div>

                <div class="message-time">
                    ${horarioAtual()}
                </div>

            </div>
        `;


        container.appendChild(
            div
        );


        requestAnimationFrame(
            () => {

                div.classList.add(
                    "message-visible"
                );

            }
        );


        container.scrollTo({

            top:
                container.scrollHeight,

            behavior:
                "smooth"

        });

    }


    /* =========================================================
       IA — FORMATADOR PROFISSIONAL
    ========================================================= */

    function formatarRespostaIA(
        texto
    ) {

        let seguro =
            escapeHTML(
                String(
                    texto || ""
                )
            );


        /*
         * Negrito:
         * **texto**
         */

        seguro =
            seguro.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
            );


        /*
         * Títulos:
         * # Título
         * ## Título
         */

        seguro =
            seguro.replace(
                /^#{1,6}\s+(.+)$/gm,
                '<div class="ai-topic">$1</div>'
            );


        /*
         * Listas com hífen ou bolinha
         */

        seguro =
            seguro.replace(
                /^[-•]\s+(.+)$/gm,
                '<div class="ai-list-item"><span>•</span><p>$1</p></div>'
            );


        /*
         * Listas numeradas
         */

        seguro =
            seguro.replace(
                /^(\d+)[.)]\s+(.+)$/gm,
                '<div class="ai-list-item numbered"><span>$1</span><p>$2</p></div>'
            );


        /*
         * Espaços entre blocos
         */

        seguro =
            seguro.replace(
                /\n{2,}/g,
                '<div class="ai-space"></div>'
            );


        /*
         * Quebras de linha
         */

        seguro =
            seguro.replace(
                /\n/g,
                "<br>"
            );


        return seguro;

    }


    /* =========================================================
       IA — HORÁRIO
    ========================================================= */

    function horarioAtual() {

        return new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* =========================================================
       TOAST
    ========================================================= */

    function mostrarToast(
        mensagem
    ) {

        const toast =
            $("toast");

        if (!toast) return;


        const toastMessage =
            $("toastMessage");


        if (toastMessage) {

            toastMessage.textContent =
                mensagem;

        }


        toast.classList.add(
            "show"
        );


        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

    }


    /* =========================================================
       SEGURANÇA HTML
    ========================================================= */

    function escapeHTML(
        valor
    ) {

        return String(valor)

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


    function escapeAttribute(
        valor
    ) {

        return escapeHTML(
            valor
        );

    }


    /* =========================================================
       LOGS
    ========================================================= */

    console.log(
        "curriculo.js carregado corretamente!"
    );

    console.log(
        "Meu Futuro Currículo iniciado!"
    );

    console.log(
        "Sistema de progresso ativado!"
    );

    console.log(
        "Meu Futuro IA — interface profissional ativada!"
    );

});