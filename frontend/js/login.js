async function login() {

    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    if (!email || !senha) {
        alert("Digite seu e-mail e sua senha.");
        return;
    }

    if (!emailInput.checkValidity()) {
        alert("Digite um e-mail válido.");
        emailInput.focus();
        return;
    }

    try {

        const resposta = await fetch("/api/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(
                resultado.erro ||
                "E-mail ou senha incorretos."
            );
            return;
        }

        if (resultado.aluno) {
            localStorage.setItem(
                "aluno",
                JSON.stringify(resultado.aluno)
            );
        }

        window.location.href = "aluno/dashboard.html";

    } catch (erro) {

        console.error("Erro no login:", erro);

        alert(
            "Não foi possível conectar com o servidor. " +
            "Verifique se o servidor está funcionando."
        );
    }
}