let etapaAtual = 1;


/* ============================================================
   NAVEGAÇÃO ENTRE ETAPAS
   ============================================================ */

function nextStep(etapa) {

    // Indo da etapa 1 para a etapa 2
    if (etapa === 2 && !validarEtapa1()) {
        return;
    }

    // Indo da etapa 2 para a etapa 3
    if (etapa === 3 && !validarEtapa2()) {
        return;
    }

    document.querySelectorAll(".step").forEach(step => {
        step.classList.remove("active");
    });

    const proximaEtapa = document.getElementById(`step${etapa}`);

    if (!proximaEtapa) {
        console.error(`A etapa ${etapa} não foi encontrada.`);
        return;
    }

    proximaEtapa.classList.add("active");

    etapaAtual = etapa;

    atualizarProgresso();

    // Volta o usuário para o topo do formulário
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ============================================================
   ATUALIZAR BARRA DE PROGRESSO
   ============================================================ */

function atualizarProgresso() {

    const porcentagem = (etapaAtual / 3) * 100;

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    if (progressBar) {
        progressBar.style.width = `${porcentagem}%`;
    }

    if (progressText) {
        progressText.textContent = `${etapaAtual} de 3`;
    }
}


/* ============================================================
   VALIDAR ETAPA 1
   ============================================================ */

function validarEtapa1() {

    const nome = document.getElementById("nome").value.trim();

    const data = document
        .getElementById("dataNascimento")
        .value;

    const email = document
        .getElementById("email")
        .value
        .trim();

    const senha = document
        .getElementById("senha")
        .value;

    const ano = document
        .getElementById("anoEscolar")
        .value;


    if (!nome || !data || !email || !senha || !ano) {

        alert(
            "Preencha todos os campos para continuar."
        );

        return false;
    }


    if (senha.length < 6) {

        alert(
            "A senha precisa ter pelo menos 6 caracteres."
        );

        return false;
    }


    // Verificação simples de e-mail
    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {

        alert(
            "Digite um e-mail válido."
        );

        return false;
    }


    return true;
}


/* ============================================================
   PEGAR TODAS AS OPÇÕES MARCADAS
   ============================================================ */

function obterRespostas(nome) {

    return Array.from(
        document.querySelectorAll(
            `input[name="${nome}"]:checked`
        )
    ).map(input => input.value);
}


/* ============================================================
   VALIDAR ETAPA 2
   ============================================================ */

function validarEtapa2() {

    const materias = obterRespostas("materia");

    const atividades = obterRespostas("atividade");


    if (materias.length === 0) {

        alert(
            "Selecione pelo menos uma matéria."
        );

        return false;
    }


    if (atividades.length === 0) {

        alert(
            "Selecione pelo menos uma atividade."
        );

        return false;
    }


    return true;
}


/* ============================================================
   FINALIZAR CADASTRO
   ============================================================ */

async function finalizarCadastro() {

    // Confirma novamente a etapa 2
    if (!validarEtapa2()) {
        nextStep(2);
        return;
    }


    const nome =
        document.getElementById("nome").value.trim();

    const dataNascimento =
        document.getElementById("dataNascimento").value;

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value;

    const anoEscolar =
        document.getElementById("anoEscolar").value;

    const materias =
        obterRespostas("materia");

    const atividades =
        obterRespostas("atividade");

    const areaInteresse =
        document.getElementById("areaInteresse").value;

    const profissao =
        document.getElementById("profissao").value.trim();

    const objetivo =
        document.getElementById("objetivo").value.trim();


    /* ========================================================
       DADOS QUE SERÃO ENVIADOS PARA O SERVIDOR
       ======================================================== */

    const dados = {

        nome: nome,

        dataNascimento: dataNascimento,

        email: email,

        senha: senha,

        anoEscolar: anoEscolar,

        // Agora são arrays
        materias: materias,

        atividades: atividades,

        areaInteresse: areaInteresse,

        profissao: profissao,

        objetivo: objetivo
    };


    console.log(
        "Dados enviados para o servidor:",
        dados
    );


    /* ========================================================
       BOTÃO
       ======================================================== */

    const botao =
        document.getElementById("btnFinalizar");

    const textoOriginal =
        botao ? botao.textContent : "";


    try {

        if (botao) {

            botao.disabled = true;

            botao.textContent =
                "Criando seu perfil...";
        }


        /* ====================================================
           ENVIO PARA API
           ==================================================== */

        const resposta = await fetch(
            "/api/cadastro",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(dados)
            }
        );


        /* ====================================================
           TENTAR LER RESPOSTA
           ==================================================== */

        let resultado;

        try {

            resultado = await resposta.json();

        } catch (erroJson) {

            console.error(
                "Resposta do servidor não é um JSON válido:",
                erroJson
            );

            alert(
                "O servidor respondeu de forma inesperada."
            );

            return;
        }


        /* ====================================================
           ERRO DA API
           ==================================================== */

        if (!resposta.ok) {

            alert(
                resultado.erro ||
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        /* ====================================================
           CADASTRO REALIZADO
           ==================================================== */

        alert(
            "Cadastro realizado com sucesso!\n\n" +
            "Seu primeiro perfil foi identificado como:\n" +
            `${resultado.perfil || "Perfil personalizado"}`
        );


        /* ====================================================
           IR PARA LOGIN
           ==================================================== */

        window.location.href =
            "login.html";


    } catch (erro) {

        console.error(
            "Erro ao conectar com o servidor:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor.\n\n" +
            "Verifique se o servidor está funcionando."
        );


    } finally {

        if (botao) {

            botao.disabled = false;

            botao.textContent =
                textoOriginal;
        }
    }
}


/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarProgresso();

    }
);