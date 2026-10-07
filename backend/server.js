// ============================================================
// MEU FUTURO
// SERVIDOR PRINCIPAL
// ============================================================

const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const OpenAI = require("openai");
const JWT_SECRET = process.env.JWT_SECRET;

function autenticarToken(req, res, next) {

    const cabecalho = req.headers["authorization"];

    if (!cabecalho) {

        return res.status(401).json({
            sucesso: false,
            erro: "Token de autenticação não informado."
        });

    }

    const partes = cabecalho.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {

        return res.status(401).json({
            sucesso: false,
            erro: "Formato do token inválido."
        });

    }

    const token = partes[1];

    try {

        const usuario = jwt.verify(
            token,
            JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (erro) {

        console.error(
            "Token inválido ou expirado:",
            erro.message
        );

        return res.status(401).json({
            sucesso: false,
            erro: "Token inválido ou expirado."
        });

    }

}
// ============================================================
// CONFIGURAÇÃO
// ============================================================

const app = express();
const PORT = process.env.PORT || 3000;

// Frontend está uma pasta acima de backend
const FRONTEND_DIR = path.join(__dirname, "../frontend");

// Banco principal
const DB_PATH = path.join(__dirname, "database.db");

// ============================================================
// MIDDLEWARES
// ============================================================

app.use(cors());

app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// ============================================================
// CONFIGURAÇÃO DA INTELIGÊNCIA ARTIFICIAL
// ============================================================

let openai = null;

if (process.env.OPENROUTER_API_KEY) {

    openai = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1"
    });

    console.log(
        "✓ Inteligência artificial configurada via OpenRouter."
    );

} else {

    console.log(
        "⚠ OPENROUTER_API_KEY não encontrada."
    );

}

// ============================================================
// BANCO DE DADOS
// ============================================================

const db = new sqlite3.Database(DB_PATH, (erro) => {

    if (erro) {
        console.error("Erro ao abrir banco de dados:");
        console.error(erro.message);
        return;
    }

    console.log("Banco de dados conectado.");

    // Ativar foreign keys
    db.run("PRAGMA foreign_keys = ON", (erroPragma) => {

        if (erroPragma) {
            console.error(
                "Erro ao ativar foreign keys:",
                erroPragma.message
            );
        }

    });
    
    db.configure("busyTimeout", 10000);


});

// ============================================================
// CRIAÇÃO DAS TABELAS
// ============================================================

db.serialize(() => {

    // --------------------------------------------------------
    // ALUNOS
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS alunos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nome TEXT NOT NULL,

            email TEXT UNIQUE NOT NULL,

            senha TEXT NOT NULL,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela alunos:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // PERGUNTAS DO TESTE VOCACIONAL
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS perguntas (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            pergunta TEXT NOT NULL,

            alternativas TEXT NOT NULL

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela perguntas:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // RESULTADOS
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS resultados (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            aluno_id INTEGER NOT NULL,

            perfil_principal TEXT,

            codigo TEXT,

            pontuacoes TEXT,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (aluno_id)
                REFERENCES alunos(id)

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela resultados:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // RESPOSTAS
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS respostas_teste (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            aluno_id INTEGER NOT NULL,

            resultado_id INTEGER,

            pergunta_id INTEGER NOT NULL,

            resposta TEXT NOT NULL,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (aluno_id)
                REFERENCES alunos(id),

            FOREIGN KEY (resultado_id)
                REFERENCES resultados(id),

            FOREIGN KEY (pergunta_id)
                REFERENCES perguntas(id)

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela respostas_teste:",
                erro.message
            );

        }

    });

    // ========================================================
    // NOVO MÓDULO - CURRÍCULO
    // ========================================================

    // --------------------------------------------------------
    // CURRÍCULO PRINCIPAL
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS curriculos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            aluno_id INTEGER NOT NULL,

            titulo TEXT DEFAULT 'Meu Currículo',

            modelo TEXT DEFAULT 'moderno',

            cor TEXT DEFAULT '#2563eb',

            objetivo TEXT DEFAULT '',

            sobre_mim TEXT DEFAULT '',

            telefone TEXT DEFAULT '',

            cidade TEXT DEFAULT '',

            linkedin TEXT DEFAULT '',

            email TEXT DEFAULT '',

            foto TEXT DEFAULT '',

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (aluno_id)
                REFERENCES alunos(id)

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela curriculos:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // EXPERIÊNCIAS
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS curriculo_experiencias (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            curriculo_id INTEGER NOT NULL,

            cargo TEXT NOT NULL,

            empresa TEXT DEFAULT '',

            inicio TEXT DEFAULT '',

            fim TEXT DEFAULT '',

            descricao TEXT DEFAULT '',

            ordem INTEGER DEFAULT 0,

            FOREIGN KEY (curriculo_id)
                REFERENCES curriculos(id)
                ON DELETE CASCADE

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela curriculo_experiencias:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // FORMAÇÕES
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS curriculo_formacoes (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            curriculo_id INTEGER NOT NULL,

            curso TEXT NOT NULL,

            instituicao TEXT DEFAULT '',

            inicio TEXT DEFAULT '',

            fim TEXT DEFAULT '',

            descricao TEXT DEFAULT '',

            ordem INTEGER DEFAULT 0,

            FOREIGN KEY (curriculo_id)
                REFERENCES curriculos(id)
                ON DELETE CASCADE

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela curriculo_formacoes:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // CURSOS
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS curriculo_cursos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            curriculo_id INTEGER NOT NULL,

            nome TEXT NOT NULL,

            instituicao TEXT DEFAULT '',

            ano TEXT DEFAULT '',

            descricao TEXT DEFAULT '',

            ordem INTEGER DEFAULT 0,

            FOREIGN KEY (curriculo_id)
                REFERENCES curriculos(id)
                ON DELETE CASCADE

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela curriculo_cursos:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // HABILIDADES
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS curriculo_habilidades (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            curriculo_id INTEGER NOT NULL,

            nome TEXT NOT NULL,

            nivel INTEGER DEFAULT 3,

            ordem INTEGER DEFAULT 0,

            FOREIGN KEY (curriculo_id)
                REFERENCES curriculos(id)
                ON DELETE CASCADE

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela curriculo_habilidades:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // IDIOMAS
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS curriculo_idiomas (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            curriculo_id INTEGER NOT NULL,

            idioma TEXT NOT NULL,

            nivel TEXT DEFAULT '',

            ordem INTEGER DEFAULT 0,

            FOREIGN KEY (curriculo_id)
                REFERENCES curriculos(id)
                ON DELETE CASCADE

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela curriculo_idiomas:",
                erro.message
            );

        }

    });

    // --------------------------------------------------------
    // PROJETOS
    // --------------------------------------------------------

    db.run(`
        CREATE TABLE IF NOT EXISTS curriculo_projetos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            curriculo_id INTEGER NOT NULL,

            nome TEXT NOT NULL,

            descricao TEXT DEFAULT '',

            link TEXT DEFAULT '',

            ordem INTEGER DEFAULT 0,

            FOREIGN KEY (curriculo_id)
                REFERENCES curriculos(id)
                ON DELETE CASCADE

        )
    `, (erro) => {

        if (erro) {

            console.error(
                "Erro criando tabela curriculo_projetos:",
                erro.message
            );

        }

    });

    // Inserir perguntas padrão
    inserirPerguntasPadrao();

});

// ============================================================
// PERGUNTAS PADRÃO
// ============================================================

function inserirPerguntasPadrao() {

    db.get(
        `SELECT COUNT(*) AS total FROM perguntas`,
        [],
        (erro, resultado) => {

            if (erro) {

                console.error(
                    "Erro verificando perguntas:",
                    erro.message
                );

                return;
            }

            if (resultado.total > 0) {
                return;
            }

            const perguntas = [

                {
                    pergunta:
                        "Quando você pensa em uma profissão, qual atividade mais desperta seu interesse?",

                    alternativas: [

                        {
                            letra: "R",
                            titulo: "Construir e fazer",
                            descricao:
                                "Gosto de colocar a mão na massa, utilizar ferramentas e resolver problemas práticos."
                        },

                        {
                            letra: "I",
                            titulo: "Investigar e descobrir",
                            descricao:
                                "Gosto de pesquisar, analisar informações e descobrir como as coisas funcionam."
                        },

                        {
                            letra: "A",
                            titulo: "Criar e imaginar",
                            descricao:
                                "Gosto de criar ideias, imagens, projetos, histórias e soluções diferentes."
                        },

                        {
                            letra: "S",
                            titulo: "Ajudar e ensinar",
                            descricao:
                                "Gosto de trabalhar com pessoas, orientar, ensinar e ajudar."
                        },

                        {
                            letra: "E",
                            titulo: "Liderar e empreender",
                            descricao:
                                "Gosto de tomar decisões, liderar pessoas e desenvolver projetos."
                        },

                        {
                            letra: "C",
                            titulo: "Organizar e planejar",
                            descricao:
                                "Gosto de organizar informações, planejar tarefas e trabalhar com processos."
                        }

                    ]
                },

                {
                    pergunta:
                        "Qual dessas atividades você faria com mais prazer?",

                    alternativas: [

                        {
                            letra: "R",
                            titulo: "Montar ou consertar algo",
                            descricao:
                                "Resolver um problema utilizando ferramentas e materiais."
                        },

                        {
                            letra: "I",
                            titulo: "Pesquisar um assunto",
                            descricao:
                                "Investigar informações para encontrar uma resposta."
                        },

                        {
                            letra: "A",
                            titulo: "Criar algo novo",
                            descricao:
                                "Desenvolver uma ideia, desenho, vídeo ou projeto criativo."
                        },

                        {
                            letra: "S",
                            titulo: "Ajudar alguém",
                            descricao:
                                "Conversar, orientar ou ensinar uma pessoa."
                        },

                        {
                            letra: "E",
                            titulo: "Organizar um projeto",
                            descricao:
                                "Liderar uma equipe e buscar resultados."
                        },

                        {
                            letra: "C",
                            titulo: "Organizar documentos",
                            descricao:
                                "Colocar informações em ordem e manter tudo organizado."
                        }

                    ]
                },

                {
                    pergunta:
                        "Em um trabalho em grupo, qual papel combina mais com você?",

                    alternativas: [

                        {
                            letra: "R",
                            titulo: "Executar",
                            descricao:
                                "Prefiro transformar as ideias em algo concreto."
                        },

                        {
                            letra: "I",
                            titulo: "Analisar",
                            descricao:
                                "Prefiro pesquisar e encontrar a melhor solução."
                        },

                        {
                            letra: "A",
                            titulo: "Criar",
                            descricao:
                                "Prefiro contribuir com ideias criativas."
                        },

                        {
                            letra: "S",
                            titulo: "Ajudar",
                            descricao:
                                "Prefiro colaborar e ajudar os integrantes."
                        },

                        {
                            letra: "E",
                            titulo: "Liderar",
                            descricao:
                                "Prefiro organizar a equipe e tomar decisões."
                        },

                        {
                            letra: "C",
                            titulo: "Organizar",
                            descricao:
                                "Prefiro cuidar dos detalhes e do planejamento."
                        }

                    ]
                },

                {
                    pergunta:
                        "Qual ambiente de trabalho parece mais interessante?",

                    alternativas: [

                        {
                            letra: "R",
                            titulo: "Laboratório técnico ou oficina",
                            descricao:
                                "Um ambiente onde posso trabalhar com equipamentos e objetos."
                        },

                        {
                            letra: "I",
                            titulo: "Laboratório ou centro de pesquisa",
                            descricao:
                                "Um ambiente voltado para investigação e conhecimento."
                        },

                        {
                            letra: "A",
                            titulo: "Estúdio ou agência",
                            descricao:
                                "Um ambiente criativo para desenvolver ideias."
                        },

                        {
                            letra: "S",
                            titulo: "Escola ou espaço social",
                            descricao:
                                "Um ambiente onde posso interagir e ajudar pessoas."
                        },

                        {
                            letra: "E",
                            titulo: "Empresa ou startup",
                            descricao:
                                "Um ambiente dinâmico com desafios e oportunidades."
                        },

                        {
                            letra: "C",
                            titulo: "Escritório organizado",
                            descricao:
                                "Um ambiente estruturado e organizado."
                        }

                    ]
                },

                {
                    pergunta:
                        "Quando aparece um problema difícil, o que você costuma fazer?",

                    alternativas: [

                        {
                            letra: "R",
                            titulo: "Testar na prática",
                            descricao:
                                "Tento diferentes maneiras de resolver o problema."
                        },

                        {
                            letra: "I",
                            titulo: "Pesquisar",
                            descricao:
                                "Procuro informações para entender o problema."
                        },

                        {
                            letra: "A",
                            titulo: "Pensar em alternativas",
                            descricao:
                                "Busco uma solução diferente e criativa."
                        },

                        {
                            letra: "S",
                            titulo: "Conversar com alguém",
                            descricao:
                                "Procuro ouvir outras pessoas e construir uma solução."
                        },

                        {
                            letra: "E",
                            titulo: "Tomar iniciativa",
                            descricao:
                                "Assumo a responsabilidade e busco resolver."
                        },

                        {
                            letra: "C",
                            titulo: "Organizar as informações",
                            descricao:
                                "Divido o problema em etapas e sigo um planejamento."
                        }

                    ]
                },

                {
                    pergunta:
                        "Qual dessas áreas chama mais sua atenção?",

                    alternativas: [

                        {
                            letra: "R",
                            titulo: "Tecnologia e engenharia",
                            descricao:
                                "Computadores, máquinas, construção e tecnologia."
                        },

                        {
                            letra: "I",
                            titulo: "Ciência e pesquisa",
                            descricao:
                                "Ciência, saúde, investigação e descobertas."
                        },

                        {
                            letra: "A",
                            titulo: "Artes e comunicação",
                            descricao:
                                "Design, publicidade, audiovisual e criatividade."
                        },

                        {
                            letra: "S",
                            titulo: "Educação e pessoas",
                            descricao:
                                "Ensino, psicologia, assistência e relacionamento."
                        },

                        {
                            letra: "E",
                            titulo: "Negócios",
                            descricao:
                                "Empreendedorismo, administração e liderança."
                        },

                        {
                            letra: "C",
                            titulo: "Gestão e organização",
                            descricao:
                                "Finanças, administração, processos e planejamento."
                        }

                    ]
                }

            ];

            const stmt = db.prepare(`
                INSERT INTO perguntas
                (pergunta, alternativas)
                VALUES (?, ?)
            `);

            perguntas.forEach((item) => {

                stmt.run(
                    item.pergunta,
                    JSON.stringify(item.alternativas)
                );

            });

            stmt.finalize((erroFinalize) => {

                if (erroFinalize) {

                    console.error(
                        "Erro inserindo perguntas:",
                        erroFinalize.message
                    );

                    return;
                }

                console.log(
                    "Perguntas padrão inseridas no banco."
                );

            });

        }
    );

}

// ============================================================
// ROTA PRINCIPAL
// ============================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            FRONTEND_DIR,
            "index.html"
        )
    );

});

// ============================================================
// ARQUIVOS DO FRONTEND
// ============================================================

app.use(
    "/aluno",
    express.static(FRONTEND_DIR)
);

app.use(
    express.static(FRONTEND_DIR)
);

// ============================================================
// LOGIN
// ============================================================

app.post("/api/login", (req, res) => {

    const email = String(req.body.email || "")
        .trim()
        .toLowerCase();

    const senha = String(req.body.senha || "");

    if (!email || !senha) {

        return res.status(400).json({
            erro: "Informe email e senha."
        });

    }

    db.get(
        `
        SELECT
            id,
            nome,
            email,
            senha
        FROM alunos
        WHERE LOWER(email) = ?
        `,
        [email],
        async (erro, aluno) => {

            if (erro) {

                console.error(
                    "Erro no login:",
                    erro.message
                );

                return res.status(500).json({
                    erro: "Erro ao realizar login."
                });

            }

            if (!aluno) {

                return res.status(401).json({
                    erro: "Email ou senha incorretos."
                });

            }

            try {

                const senhaCorreta =
                    await bcrypt.compare(
                        senha,
                        aluno.senha
                    );

                if (!senhaCorreta) {

                    return res.status(401).json({
                        erro: "Email ou senha incorretos."
                    });

                }

                const token = jwt.sign(
                    {
                        id: aluno.id,
                        email: aluno.email
                    },
                    JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                );

                return res.json({

                    sucesso: true,

                    token,

                    aluno: {

                        id: aluno.id,

                        nome: aluno.nome,

                        email: aluno.email

                    }

                });

            } catch (erroSenha) {

                console.error(
                    "Erro verificando senha:",
                    erroSenha.message
                );

                return res.status(500).json({
                    erro: "Erro ao realizar login."
                });

            }

        }
    );

});

// ============================================================
// RECUPERAR SENHA
// ============================================================

app.post("/api/recuperar-senha", (req, res) => {

    const email = String(req.body.email || "")
        .trim()
        .toLowerCase();

    if (!email) {

        return res.status(400).json({
            erro: "Informe seu e-mail."
        });

    }

    db.get(
        `
        SELECT
            id,
            nome,
            email
        FROM alunos
        WHERE LOWER(email) = ?
        `,
        [email],
        (erro) => {

            if (erro) {

                console.error(
                    "Erro ao verificar e-mail:",
                    erro.message
                );

                return res.status(500).json({
                    erro: "Erro ao verificar o e-mail."
                });

            }

            return res.json({

                sucesso: true,

                mensagem:
                    "Se o e-mail estiver cadastrado, você receberá as instruções para recuperar sua senha."

            });

        }
    );

});

// ============================================================
// ALTERAR SENHA
// ============================================================

app.post("/api/alterar-senha", async (req, res) => {

    const email = String(req.body.email || "")
        .trim()
        .toLowerCase();

    const novaSenha = String(
        req.body.novaSenha || ""
    );

    if (!email || !novaSenha) {

        return res.status(400).json({
            erro:
                "Informe o e-mail e a nova senha."
        });

    }

    if (novaSenha.length < 6) {

        return res.status(400).json({
            erro:
                "A nova senha deve ter pelo menos 6 caracteres."
        });

    }

    try {

        const senhaHash =
            await bcrypt.hash(
                novaSenha,
                10
            );

        db.run(
            `
            UPDATE alunos
            SET senha = ?
            WHERE LOWER(email) = ?
            `,
            [
                senhaHash,
                email
            ],
            function (erro) {

                if (erro) {

                    console.error(
                        "Erro ao alterar senha:",
                        erro.message
                    );

                    return res.status(500).json({
                        erro:
                            "Não foi possível alterar a senha."
                    });

                }

                if (this.changes === 0) {

                    return res.status(404).json({
                        erro:
                            "E-mail não encontrado."
                    });

                }

                return res.json({

                    sucesso: true,

                    mensagem:
                        "Senha alterada com sucesso."

                });

            }
        );

    } catch (erro) {

        console.error(
            "Erro gerando senha:",
            erro.message
        );

        return res.status(500).json({
            erro:
                "Não foi possível alterar a senha."
        });

    }

});

// ============================================================
// CADASTRO
// ============================================================

app.post("/api/cadastro", async (req, res) => {

    const nome = String(req.body.nome || "")
        .trim();

    const email = String(req.body.email || "")
        .trim()
        .toLowerCase();

    const senha = String(req.body.senha || "");

    if (!nome || !email || !senha) {

        return res.status(400).json({
            erro:
                "Preencha todos os campos."
        });

    }

    if (senha.length < 6) {

        return res.status(400).json({
            erro:
                "A senha deve ter pelo menos 6 caracteres."
        });

    }

    db.get(
        `
        SELECT id
        FROM alunos
        WHERE LOWER(email) = ?
        `,
        [email],
        async (erro, existente) => {

            if (erro) {

                console.error(
                    "Erro verificando cadastro:",
                    erro.message
                );

                return res.status(500).json({
                    erro:
                        "Erro verificando cadastro."
                });

            }

            if (existente) {

                return res.status(409).json({
                    erro:
                        "Este email já está cadastrado."
                });

            }

            try {

                const senhaHash =
                    await bcrypt.hash(
                        senha,
                        10
                    );

                db.run(
                    `
                    INSERT INTO alunos
                    (nome, email, senha)
                    VALUES (?, ?, ?)
                    `,
                    [
                        nome,
                        email,
                        senhaHash
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro ao cadastrar:",
                                erro.message
                            );

                            if (
                                erro.message.includes(
                                    "UNIQUE constraint failed"
                                )
                            ) {

                                return res.status(409).json({
                                    erro:
                                        "Este email já está cadastrado."
                                });

                            }

                            return res.status(500).json({
                                erro:
                                    "Não foi possível cadastrar."
                            });

                        }

                        return res.status(201).json({

                            sucesso: true,

                            aluno: {

                                id: this.lastID,

                                nome,

                                email

                            }

                        });

                    }
                );

            } catch (erroSenha) {

                console.error(
                    "Erro gerando senha:",
                    erroSenha.message
                );

                return res.status(500).json({
                    erro:
                        "Não foi possível cadastrar."
                });

            }

        }
    );

});

// ============================================================
// TESTE VOCACIONAL
// PEGAR PERGUNTAS
// ============================================================

app.get(
    "/api/teste-vocacional/perguntas",
    (req, res) => {

        db.all(
            `
            SELECT
                id,
                pergunta,
                alternativas
            FROM perguntas
            ORDER BY id ASC
            `,
            [],
            (erro, perguntas) => {

                if (erro) {

                    console.error(
                        "Erro ao carregar perguntas:",
                        erro.message
                    );

                    return res.status(500).json({
                        erro:
                            "Erro ao carregar perguntas."
                    });

                }

                const resultado =
                    perguntas.map((item) => {

                        let alternativas = [];

                        try {

                            alternativas =
                                JSON.parse(
                                    item.alternativas
                                );

                        } catch (e) {

                            alternativas = [];

                        }

                        return {

                            id: item.id,

                            pergunta:
                                item.pergunta,

                            alternativas

                        };

                    });

                return res.json({
                    perguntas: resultado
                });

            }
        );

    }
);

// ============================================================
// PROCESSAR TESTE VOCACIONAL
// ============================================================

app.post(
    "/api/teste-vocacional",
    autenticarToken,
    (req, res) => {

        const alunoId = Number(
            req.body.aluno_id
        );

        const respostas =
            req.body.respostas;

        /*
        =====================================================
        VERIFICA SE O ALUNO DO TESTE É O USUÁRIO LOGADO
        =====================================================
        */

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                erro:
                    "Aluno não informado."
            });

        }

        if (
            alunoId !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para enviar o teste de outro aluno."
            });

        }

        /*
        =====================================================
        VALIDA RESPOSTAS
        =====================================================
        */

        if (
            !Array.isArray(respostas) ||
            respostas.length === 0
        ) {

            return res.status(400).json({
                erro:
                    "Nenhuma resposta foi enviada."
            });

        }

        /*
        =====================================================
        VERIFICA SE O ALUNO EXISTE
        =====================================================
        */

        db.get(
            `
            SELECT id
            FROM alunos
            WHERE id = ?
            `,
            [alunoId],
            (erroAluno, aluno) => {

                if (erroAluno) {

                    console.error(
                        "Erro verificando aluno:",
                        erroAluno.message
                    );

                    return res.status(500).json({
                        erro:
                            "Erro ao verificar aluno."
                    });

                }

                if (!aluno) {

                    return res.status(404).json({
                        erro:
                            "Aluno não encontrado."
                    });

                }

                /*
                =================================================
                NORMALIZA E VALIDA AS RESPOSTAS
                =================================================
                */

                const respostasValidas =
                    respostas
                        .map((item) => {

                            return {

                                pergunta_id:
                                    Number(
                                        item.pergunta_id
                                    ),

                                resposta:
                                    String(
                                        item.resposta || ""
                                    )
                                        .trim()
                                        .toUpperCase()

                            };

                        })
                        .filter((item) => {

                            return (

                                Number.isInteger(
                                    item.pergunta_id
                                ) &&

                                item.pergunta_id > 0 &&

                                [
                                    "R",
                                    "I",
                                    "A",
                                    "S",
                                    "E",
                                    "C"
                                ].includes(
                                    item.resposta
                                )

                            );

                        });

                if (
                    respostasValidas.length === 0
                ) {

                    return res.status(400).json({
                        erro:
                            "As respostas enviadas são inválidas."
                    });

                }

                /*
                =================================================
                CALCULA O RESULTADO
                =================================================
                */

                calcularResultado(
                    respostasValidas,
                    (erro, resultado) => {

                        if (erro) {

                            console.error(
                                erro.message || erro
                            );

                            return res.status(500).json({
                                erro:
                                    "Erro ao calcular resultado."
                            });

                        }

                        /*
                        =========================================
                        SALVA O RESULTADO
                        =========================================
                        */

                        db.run(
                            `
                            INSERT INTO resultados
                            (
                                aluno_id,
                                perfil_principal,
                                codigo,
                                pontuacoes
                            )
                            VALUES (?, ?, ?, ?)
                            `,
                            [
                                alunoId,

                                resultado.perfil_principal,

                                resultado.codigo,

                                JSON.stringify(
                                    resultado.pontuacoes
                                )

                            ],
                            function (erroResultado) {

                                if (erroResultado) {

                                    console.error(
                                        "Erro ao salvar resultado:",
                                        erroResultado.message
                                    );

                                    return res.status(500).json({
                                        erro:
                                            "Erro ao salvar resultado."
                                    });

                                }

                                const resultadoId =
                                    this.lastID;

                                /*
                                =================================
                                SALVA AS RESPOSTAS
                                =================================
                                */

                                salvarRespostas(
                                    alunoId,
                                    resultadoId,
                                    respostasValidas,
                                    (erroRespostas) => {

                                        if (erroRespostas) {

                                            console.error(
                                                "Erro ao salvar respostas:",
                                                erroRespostas.message ||
                                                erroRespostas
                                            );

                                            return res.status(500).json({
                                                erro:
                                                    "Resultado calculado, mas houve um erro ao salvar as respostas."
                                            });

                                        }

                                        return res.json({

                                            sucesso: true,

                                            resultado: {

                                                id:
                                                    resultadoId,

                                                ...resultado

                                            }

                                        });

                                    }
                                );

                            }
                        );

                    }
                );

            }
        );

    }
);

// ============================================================
// CALCULAR RESULTADO
// ============================================================

function calcularResultado(
    respostas,
    callback
) {

    const pontuacoes = {

        R: 0,
        I: 0,
        A: 0,
        S: 0,
        E: 0,
        C: 0

    };

    respostas.forEach((item) => {

        const resposta =
            String(
                item.resposta || ""
            )
                .trim()
                .toUpperCase();

        if (
            Object.prototype.hasOwnProperty.call(
                pontuacoes,
                resposta
            )
        ) {

            pontuacoes[resposta]++;

        }

    });

    const total =
        Object.values(pontuacoes)
            .reduce(
                (soma, valor) =>
                    soma + valor,
                0
            );

    if (total > 0) {

        Object.keys(pontuacoes)
            .forEach((perfil) => {

                pontuacoes[perfil] =
                    Math.round(
                        (
                            pontuacoes[perfil] /
                            total
                        ) * 100
                    );

            });

    }

    const perfis =
        Object.entries(pontuacoes)
            .sort((a, b) => {

                if (b[1] !== a[1]) {

                    return b[1] - a[1];

                }

                return a[0].localeCompare(
                    b[0]
                );

            });

    const principal =
        perfis[0]
            ? perfis[0][0]
            : "I";

    const codigo =
        perfis
            .slice(0, 3)
            .map(([perfil]) => perfil)
            .join("");

    callback(
        null,
        {

            perfil_principal:
                principal,

            codigo:
                codigo || principal,

            pontuacoes

        }
    );

}

// ============================================================
// SALVAR RESPOSTAS
// ============================================================

function salvarRespostas(
    alunoId,
    resultadoId,
    respostas,
    callback
) {

    db.serialize(() => {

        db.run(
            "BEGIN TRANSACTION",
            (erroInicio) => {

                if (erroInicio) {

                    return callback(
                        erroInicio
                    );

                }

                const stmt =
                    db.prepare(`
                        INSERT INTO respostas_teste
                        (
                            aluno_id,
                            resultado_id,
                            pergunta_id,
                            resposta
                        )
                        VALUES (?, ?, ?, ?)
                    `);

                let erroEncontrado =
                    null;

                respostas.forEach((item) => {

                    stmt.run(
                        [
                            alunoId,

                            resultadoId,

                            item.pergunta_id,

                            item.resposta

                        ],
                        (erro) => {

                            if (
                                erro &&
                                !erroEncontrado
                            ) {

                                erroEncontrado =
                                    erro;

                            }

                        }
                    );

                });

                stmt.finalize(
                    (erroFinalize) => {

                        if (
                            erroFinalize &&
                            !erroEncontrado
                        ) {

                            erroEncontrado =
                                erroFinalize;

                        }

                        if (erroEncontrado) {

                            return db.run(
                                "ROLLBACK",
                                () => {

                                    callback(
                                        erroEncontrado
                                    );

                                }
                            );

                        }

                        db.run(
                            "COMMIT",
                            (erroCommit) => {

                                callback(
                                    erroCommit ||
                                    null
                                );

                            }
                        );

                    }
                );

            }
        );

    });

}

// ============================================================
// PEGAR ÚLTIMO RESULTADO DO ALUNO
// ============================================================

app.get(
    "/api/teste-vocacional/resultado/:alunoId",
    autenticarToken,
    (req, res) => {

        const alunoId = Number(
            req.params.alunoId
        );

        /*
        =====================================================
        VALIDA O ID DO ALUNO
        =====================================================
        */

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                erro:
                    "Aluno inválido."
            });

        }

        /*
        =====================================================
        VERIFICA SE O ALUNO LOGADO É O DONO DO RESULTADO
        =====================================================
        */

        if (
            alunoId !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar este resultado."
            });

        }

        /*
        =====================================================
        BUSCA O ÚLTIMO RESULTADO
        =====================================================
        */

        db.get(
            `
            SELECT
                id,
                aluno_id,
                perfil_principal,
                codigo,
                pontuacoes
            FROM resultados
            WHERE aluno_id = ?
            ORDER BY id DESC
            LIMIT 1
            `,
            [alunoId],
            (erro, resultado) => {

                if (erro) {

                    console.error(
                        "Erro ao buscar resultado:",
                        erro.message
                    );

                    return res.status(500).json({
                        erro:
                            "Erro ao buscar resultado."
                    });

                }

                if (!resultado) {

                    return res.status(404).json({
                        erro:
                            "Nenhum resultado encontrado."
                    });

                }

                /*
                =================================================
                CONVERTE AS PONTUAÇÕES
                =================================================
                */

                let pontuacoes = {};

                try {

                    pontuacoes =
                        JSON.parse(
                            resultado.pontuacoes ||
                            "{}"
                        );

                } catch (e) {

                    pontuacoes = {};

                }

                /*
                =================================================
                RETORNA O RESULTADO
                =================================================
                */

                return res.json({

                    resultado: {

                        id:
                            resultado.id,

                        aluno_id:
                            resultado.aluno_id,

                        perfil_principal:
                            resultado.perfil_principal,

                        codigo:
                            resultado.codigo,

                        pontuacoes,

                        created_at:
                            resultado.created_at

                    }

                });

            }
        );

    }
);

// ============================================================
// DASHBOARD DO ALUNO
// ============================================================

app.get(
    "/api/aluno/:id",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.id) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar este perfil."
            });

        }

        const alunoId = Number(
            req.params.id
        );

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                erro:
                    "Aluno inválido."
            });

        }

        db.get(
            `
            SELECT
                id,
                nome,
                email,
                criado_em AS created_at
            FROM alunos
            WHERE id = ?
            `,
            [alunoId],
            (erro, aluno) => {

                if (erro) {

                    console.error(
                        "Erro ao buscar aluno:",
                        erro.message
                    );

                    return res.status(500).json({
                        erro:
                            "Erro ao buscar aluno."
                    });

                }

                if (!aluno) {

                    return res.status(404).json({
                        erro:
                            "Aluno não encontrado."
                    });

                }

                return res.json({
                    aluno
                });

            }
        );

    }
);
// ============================================================
// API DO PERFIL DO ALUNO
// ============================================================

app.get(
    "/api/perfil/:alunoId",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.alunoId) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar este perfil."
            });

        }



        const alunoId = Number(
            req.params.alunoId
        );

        // ==========================================
        // VALIDAR ID DO ALUNO
        // ==========================================

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                erro: "Aluno inválido."
            });
        }

        // ==========================================
        // VERIFICAR SE O ALUNO É O DONO DA CONTA
        // ==========================================

        if (
            Number(req.usuario.id) !== alunoId
        ) {

            return res.status(403).json({
                erro:
                    "Você não tem permissão para acessar este perfil."
            });
        }

        // ==========================================
        // BUSCAR DADOS DO ALUNO
        // ==========================================

        db.get(
            `
            SELECT
                id,
                nome,
                email,
                criado_em AS created_at
            FROM alunos
            WHERE id = ?
            `,
            [alunoId],
            (erro, aluno) => {

                if (erro) {

                    console.error(
                        "Erro ao buscar aluno:",
                        erro.message
                    );

                    return res.status(500).json({
                        erro:
                            "Erro ao buscar dados do aluno."
                    });
                }

                if (!aluno) {

                    return res.status(404).json({
                        erro:
                            "Aluno não encontrado."
                    });
                }

                // ==========================================
                // BUSCAR ÚLTIMO RESULTADO DO TESTE
                // ==========================================

                db.get(
                    `
                    SELECT
                        id,
                        aluno_id,
                        perfil_principal,
                        codigo,
                        pontuacoes,
                        created_at
                    FROM resultados
                    WHERE aluno_id = ?
                    ORDER BY id DESC
                    LIMIT 1
                    `,
                    [alunoId],
                    (erro, resultado) => {

                        if (erro) {

                            console.error(
                                "Erro ao buscar resultado:",
                                erro.message
                            );

                            return res.status(500).json({
                                erro:
                                    "Erro ao buscar resultado do perfil."
                            });
                        }

                        // ==========================================
                        // FORMATAR RESULTADO
                        // ==========================================

                        let resultadoFormatado =
                            null;

                        if (resultado) {

                            let pontuacoes = {};

                            try {

                                pontuacoes =
                                    JSON.parse(
                                        resultado.pontuacoes ||
                                        "{}"
                                    );

                            } catch (e) {

                                console.error(
                                    "Erro ao interpretar pontuações:",
                                    e.message
                                );

                                pontuacoes = {};
                            }

                            resultadoFormatado = {

                                id:
                                    resultado.id,

                                aluno_id:
                                    resultado.aluno_id,

                                perfil_principal:
                                    resultado.perfil_principal,

                                codigo:
                                    resultado.codigo,

                                pontuacoes,

                                created_at:
                                    resultado.created_at
                            };
                        }

                        // ==========================================
                        // BUSCAR RESPOSTAS DO TESTE
                        // ==========================================

                        let consultaRespostas = `

                            SELECT
                                rt.id,
                                rt.aluno_id,
                                rt.resultado_id,
                                rt.pergunta_id,
                                rt.resposta,
                                rt.created_at,
                                p.pergunta,
                                p.alternativas

                            FROM respostas_teste rt

                            INNER JOIN perguntas p
                                ON p.id = rt.pergunta_id

                            WHERE rt.aluno_id = ?

                        `;

                        const parametros = [
                            alunoId
                        ];

                        // ==========================================
                        // SE EXISTIR RESULTADO,
                        // FILTRAR AS RESPOSTAS POR ELE
                        // ==========================================

                        if (
                            resultadoFormatado
                        ) {

                            consultaRespostas += `

                                AND rt.resultado_id = ?

                            `;

                            parametros.push(
                                resultadoFormatado.id
                            );
                        }

                        consultaRespostas += `

                            ORDER BY rt.pergunta_id ASC

                        `;

                        // ==========================================
                        // EXECUTAR CONSULTA DAS RESPOSTAS
                        // ==========================================

                        db.all(
                            consultaRespostas,
                            parametros,
                            (
                                erro,
                                respostas
                            ) => {

                                if (erro) {

                                    console.error(
                                        "Erro ao buscar respostas:",
                                        erro.message
                                    );

                                    return res.status(500).json({
                                        erro:
                                            "Erro ao buscar respostas do questionário."
                                    });
                                }

                                // ==========================================
                                // FORMATAR RESPOSTAS
                                // ==========================================

                                const respostasFormatadas =
                                    respostas.map(
                                        (item) => {

                                            let alternativas =
                                                [];

                                            try {

                                                alternativas =
                                                    JSON.parse(
                                                        item.alternativas ||
                                                        "[]"
                                                    );

                                            } catch (e) {

                                                alternativas =
                                                    [];
                                            }

                                            const resposta =
                                                String(
                                                    item.resposta ||
                                                    ""
                                                )
                                                    .trim()
                                                    .toUpperCase();

                                            const alternativaEscolhida =
                                                alternativas.find(
                                                    (alternativa) =>
                                                        String(
                                                            alternativa.letra ||
                                                            ""
                                                        )
                                                            .trim()
                                                            .toUpperCase() ===
                                                        resposta
                                                );

                                            return {

                                                id:
                                                    item.id,

                                                aluno_id:
                                                    item.aluno_id,

                                                resultado_id:
                                                    item.resultado_id,

                                                pergunta_id:
                                                    item.pergunta_id,

                                                pergunta:
                                                    item.pergunta,

                                                resposta,

                                                alternativa:
                                                    alternativaEscolhida
                                                        ? {

                                                            letra:
                                                                alternativaEscolhida.letra,

                                                            titulo:
                                                                alternativaEscolhida.titulo,

                                                            descricao:
                                                                alternativaEscolhida.descricao

                                                        }
                                                        : null,

                                                created_at:
                                                    item.created_at
                                            };
                                        }
                                    );

                                // ==========================================
                                // RETORNAR DADOS
                                // ==========================================

                                return res.json({

                                    sucesso: true,

                                    aluno: {

                                        id:
                                            aluno.id,

                                        nome:
                                            aluno.nome,

                                        email:
                                            aluno.email,

                                        created_at:
                                            aluno.created_at
                                    },

                                    resultado:
                                        resultadoFormatado,

                                    respostas:
                                        respostasFormatadas
                                });
                            }
                        );
                    }
                );
            }
        );
    }
);
// ============================================================
// ÚLTIMOS RESULTADOS
// ============================================================

app.get(
    "/api/resultados/:alunoId",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.alunoId) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar estes resultados."
            });

        }

        const alunoId = Number(
            req.params.alunoId
        );

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                erro:
                    "Aluno inválido."
            });

        }

        db.all(
            `
            SELECT
                id,
                perfil_principal,
                codigo,
                pontuacoes,
                created_at
            FROM resultados
            WHERE aluno_id = ?
            ORDER BY id DESC
            `,
            [alunoId],
            (erro, resultados) => {

                if (erro) {

                    console.error(
                        "Erro ao buscar resultados:",
                        erro.message
                    );

                    return res.status(500).json({
                        erro:
                            "Erro ao buscar resultados."
                    });

                }

                const resultadosFormatados =
                    resultados.map(
                        (item) => {

                            let pontuacoes =
                                {};

                            try {

                                pontuacoes =
                                    JSON.parse(
                                        item.pontuacoes ||
                                        "{}"
                                    );

                            } catch (e) {

                                pontuacoes =
                                    {};

                            }

                            return {

                                ...item,

                                pontuacoes

                            };

                        }
                    );

                return res.json({

                    resultados:
                        resultadosFormatados

                });

            }
        );

    }
);

// ============================================================
// POSSIBILIDADES
// ============================================================

app.get(
    "/api/possibilidades",
    (req, res) => {

        return res.json({

            sucesso: true,

            mensagem:
                "Possibilidades disponíveis no frontend."

        });

    }
);

// ============================================================
// ============================================================
//                  MEU CURRÍCULO
// ============================================================
// ============================================================

// ============================================================
// FUNÇÃO AUXILIAR
// BUSCAR OU CRIAR CURRÍCULO
// ============================================================

function buscarOuCriarCurriculo(
    alunoId,
    callback
) {

    db.get(
        `
        SELECT *
        FROM curriculos
        WHERE aluno_id = ?
        ORDER BY id DESC
        LIMIT 1
        `,
        [alunoId],
        (erro, curriculo) => {

            if (erro) {
                return callback(erro);
            }

            if (curriculo) {
                return callback(null, curriculo);
            }

            db.run(
                `
                INSERT INTO curriculos
                (
                    aluno_id,
                    titulo,
                    modelo,
                    cor
                )
                VALUES (?, ?, ?, ?)
                `,
                [
                    alunoId,
                    "Meu Currículo",
                    "moderno",
                    "#2563eb"
                ],
                function (erroCriar) {

                    if (erroCriar) {
                        return callback(
                            erroCriar
                        );
                    }

                    db.get(
                        `
                        SELECT *
                        FROM curriculos
                        WHERE id = ?
                        `,
                        [this.lastID],
                        (erroBusca, novoCurriculo) => {

                            callback(
                                erroBusca,
                                novoCurriculo
                            );

                        }
                    );

                }
            );

        }
    );

}

// ============================================================
// BUSCAR CURRÍCULO COMPLETO
// ============================================================

app.get(
    "/api/curriculo/:alunoId",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.alunoId) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar este currículo."
            });

        }

        const alunoId =
            Number(req.params.alunoId);

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Aluno inválido."
            });

        }

        buscarOuCriarCurriculo(
            alunoId,
            (erro, curriculo) => {

                if (erro) {

                    console.error(
                        "Erro buscando currículo:",
                        erro.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao buscar currículo."
                    });

                }

                const curriculoId =
                    curriculo.id;

                const resultadoFinal = {

                    sucesso: true,

                    curriculo,

                    experiencias: [],

                    formacoes: [],

                    cursos: [],

                    habilidades: [],

                    idiomas: [],

                    projetos: []

                };

                db.all(
                    `
                    SELECT *
                    FROM curriculo_experiencias
                    WHERE curriculo_id = ?
                    ORDER BY ordem ASC, id ASC
                    `,
                    [curriculoId],
                    (erro, experiencias) => {

                        if (erro) {

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao buscar experiências."
                            });

                        }

                        resultadoFinal.experiencias =
                            experiencias;

                        db.all(
                            `
                            SELECT *
                            FROM curriculo_formacoes
                            WHERE curriculo_id = ?
                            ORDER BY ordem ASC, id ASC
                            `,
                            [curriculoId],
                            (erro, formacoes) => {

                                if (erro) {

                                    return res.status(500).json({
                                        sucesso: false,
                                        erro:
                                            "Erro ao buscar formações."
                                    });

                                }

                                resultadoFinal.formacoes =
                                    formacoes;

                                db.all(
                                    `
                                    SELECT *
                                    FROM curriculo_cursos
                                    WHERE curriculo_id = ?
                                    ORDER BY ordem ASC, id ASC
                                    `,
                                    [curriculoId],
                                    (erro, cursos) => {

                                        if (erro) {

                                            return res.status(500).json({
                                                sucesso: false,
                                                erro:
                                                    "Erro ao buscar cursos."
                                            });

                                        }

                                        resultadoFinal.cursos =
                                            cursos;

                                        db.all(
                                            `
                                            SELECT *
                                            FROM curriculo_habilidades
                                            WHERE curriculo_id = ?
                                            ORDER BY ordem ASC, id ASC
                                            `,
                                            [curriculoId],
                                            (erro, habilidades) => {

                                                if (erro) {

                                                    return res.status(500).json({
                                                        sucesso: false,
                                                        erro:
                                                            "Erro ao buscar habilidades."
                                                    });

                                                }

                                                resultadoFinal.habilidades =
                                                    habilidades;

                                                db.all(
                                                    `
                                                    SELECT *
                                                    FROM curriculo_idiomas
                                                    WHERE curriculo_id = ?
                                                    ORDER BY ordem ASC, id ASC
                                                    `,
                                                    [curriculoId],
                                                    (erro, idiomas) => {

                                                        if (erro) {

                                                            return res.status(500).json({
                                                                sucesso: false,
                                                                erro:
                                                                    "Erro ao buscar idiomas."
                                                            });

                                                        }

                                                        resultadoFinal.idiomas =
                                                            idiomas;

                                                        db.all(
                                                            `
                                                            SELECT *
                                                            FROM curriculo_projetos
                                                            WHERE curriculo_id = ?
                                                            ORDER BY ordem ASC, id ASC
                                                            `,
                                                            [curriculoId],
                                                            (erro, projetos) => {

                                                                if (erro) {

                                                                    return res.status(500).json({
                                                                        sucesso: false,
                                                                        erro:
                                                                            "Erro ao buscar projetos."
                                                                    });

                                                                }

                                                                resultadoFinal.projetos =
                                                                    projetos;

                                                                return res.json(
                                                                    resultadoFinal
                                                                );

                                                            }
                                                        );

                                                    }
                                                );

                                            }
                                        );

                                    }
                                );

                            }
                        );

                    }
                );

            }
        );

    }
);

// ============================================================
// SALVAR CURRÍCULO PRINCIPAL
// ============================================================

app.post(
    "/api/curriculo",
    (req, res) => {

        const alunoId =
            Number(req.body.aluno_id);

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Aluno não informado."
            });

        }

        const titulo =
            String(
                req.body.titulo ||
                "Meu Currículo"
            ).trim();

        const modelo =
            String(
                req.body.modelo ||
                "moderno"
            ).trim();

        const cor =
            String(
                req.body.cor ||
                "#2563eb"
            ).trim();

        const objetivo =
            String(
                req.body.objetivo ||
                ""
            ).trim();

        const sobreMim =
            String(
                req.body.sobre_mim ||
                ""
            ).trim();

        const telefone =
            String(
                req.body.telefone ||
                ""
            ).trim();

        const cidade =
            String(
                req.body.cidade ||
                ""
            ).trim();

        const linkedin =
            String(
                req.body.linkedin ||
                ""
            ).trim();

        const email =
            String(
                req.body.email ||
                ""
            ).trim();

        const foto =
            String(
                req.body.foto ||
                ""
            ).trim();

        db.get(
            `
            SELECT id
            FROM alunos
            WHERE id = ?
            `,
            [alunoId],
            (erroAluno, aluno) => {

                if (erroAluno) {

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar aluno."
                    });

                }

                if (!aluno) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Aluno não encontrado."
                    });

                }

                db.get(
                    `
                    SELECT id
                    FROM curriculos
                    WHERE aluno_id = ?
                    ORDER BY id DESC
                    LIMIT 1
                    `,
                    [alunoId],
                    (erroBusca, curriculo) => {

                        if (erroBusca) {

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao buscar currículo."
                            });

                        }

                        if (curriculo) {

                            db.run(
                                `
                                UPDATE curriculos
                                SET
                                    titulo = ?,
                                    modelo = ?,
                                    cor = ?,
                                    objetivo = ?,
                                    sobre_mim = ?,
                                    telefone = ?,
                                    cidade = ?,
                                    linkedin = ?,
                                    email = ?,
                                    foto = ?,
                                    updated_at = CURRENT_TIMESTAMP
                                WHERE id = ?
                                `,
                                [
                                    titulo,
                                    modelo,
                                    cor,
                                    objetivo,
                                    sobreMim,
                                    telefone,
                                    cidade,
                                    linkedin,
                                    email,
                                    foto,
                                    curriculo.id
                                ],
                                function (erroUpdate) {

                                    if (erroUpdate) {

                                        console.error(
                                            "Erro atualizando currículo:",
                                            erroUpdate.message
                                        );

                                        return res.status(500).json({
                                            sucesso: false,
                                            erro:
                                                "Erro ao atualizar currículo."
                                        });

                                    }

                                    return res.json({

                                        sucesso: true,

                                        mensagem:
                                            "Currículo salvo com sucesso.",

                                        id:
                                            curriculo.id

                                    });

                                }
                            );

                        } else {

                            db.run(
                                `
                                INSERT INTO curriculos
                                (
                                    aluno_id,
                                    titulo,
                                    modelo,
                                    cor,
                                    objetivo,
                                    sobre_mim,
                                    telefone,
                                    cidade,
                                    linkedin,
                                    email,
                                    foto
                                )
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                `,
                                [
                                    alunoId,
                                    titulo,
                                    modelo,
                                    cor,
                                    objetivo,
                                    sobreMim,
                                    telefone,
                                    cidade,
                                    linkedin,
                                    email,
                                    foto
                                ],
                                function (erroInsert) {

                                    if (erroInsert) {

                                        console.error(
                                            "Erro criando currículo:",
                                            erroInsert.message
                                        );

                                        return res.status(500).json({
                                            sucesso: false,
                                            erro:
                                                "Erro ao criar currículo."
                                        });

                                    }

                                    return res.status(201).json({

                                        sucesso: true,

                                        mensagem:
                                            "Currículo criado com sucesso.",

                                        id:
                                            this.lastID

                                    });

                                }
                            );

                        }

                    }
                );

            }
        );

    }
);

// ============================================================
// IMPORTAR DADOS DO PERFIL PARA O CURRÍCULO
// ============================================================

app.get(
    "/api/curriculo/perfil/:alunoId",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.alunoId) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar este perfil."
            });

        }

        const alunoId =
            Number(req.params.alunoId);

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Aluno inválido."
            });

        }

        db.get(
            `
            SELECT
                id,
                nome,
                email,
                created_at
            FROM alunos
            WHERE id = ?
            `,
            [alunoId],
            (erro, aluno) => {

                if (erro) {

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao buscar aluno."
                    });

                }

                if (!aluno) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Aluno não encontrado."
                    });

                }

                db.get(
                    `
                    SELECT
                        id,
                        aluno_id,
                        perfil_principal,
                        codigo,
                        pontuacoes,
                        created_at
                    FROM resultados
                    WHERE aluno_id = ?
                    ORDER BY id DESC
                    LIMIT 1
                    `,
                    [alunoId],
                    (erroResultado, resultado) => {

                        if (erroResultado) {

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao buscar perfil vocacional."
                            });

                        }

                        let perfil = null;

                        if (resultado) {

                            let pontuacoes = {};

                            try {

                                pontuacoes =
                                    JSON.parse(
                                        resultado.pontuacoes ||
                                        "{}"
                                    );

                            } catch (e) {

                                pontuacoes = {};

                            }

                            perfil = {

                                id:
                                    resultado.id,

                                perfil_principal:
                                    resultado.perfil_principal,

                                codigo:
                                    resultado.codigo,

                                pontuacoes

                            };

                        }

                        return res.json({

                            sucesso: true,

                            aluno,

                            perfil

                        });

                    }
                );

            }
        );

    }
);

// ============================================================
// SUGESTÕES AUTOMÁTICAS PARA O CURRÍCULO
// ============================================================

app.get(
    "/api/curriculo/sugestoes/:alunoId",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.alunoId) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar estas sugestões."
            });

        }

        const alunoId =
            Number(req.params.alunoId);

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Aluno inválido."
            });

        }

        db.get(
            `
            SELECT
                nome
            FROM alunos
            WHERE id = ?
            `,
            [alunoId],
            (erroAluno, aluno) => {

                if (erroAluno) {

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao buscar aluno."
                    });

                }

                if (!aluno) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Aluno não encontrado."
                    });

                }

                db.get(
                    `
                    SELECT
                        perfil_principal,
                        codigo,
                        pontuacoes
                    FROM resultados
                    WHERE aluno_id = ?
                    ORDER BY id DESC
                    LIMIT 1
                    `,
                    [alunoId],
                    (erroResultado, resultado) => {

                        if (erroResultado) {

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao buscar resultado."
                            });

                        }

                        let perfil =
                            resultado
                                ? resultado.perfil_principal
                                : null;

                        const sugestoes =
                            gerarSugestoesCurriculo(
                                perfil
                            );

                        return res.json({

                            sucesso: true,

                            aluno: aluno.nome,

                            perfil,

                            sugestoes

                        });

                    }
                );

            }
        );

    }
);
// ============================================================
// GERAR SUGESTÕES BASEADAS NO RIASEC
// ============================================================

function gerarSugestoesCurriculo(perfil) {

    const sugestoes = {

        objetivo: "",

        sobre_mim: "",

        habilidades: [],

        areas: []

    };

    switch (perfil) {

        case "R":

            sugestoes.objetivo =
                "Busco uma oportunidade para desenvolver minhas habilidades práticas, técnicas e de resolução de problemas, adquirindo experiência profissional.";

            sugestoes.sobre_mim =
                "Sou uma pessoa prática, curiosa e focada em encontrar soluções. Gosto de aprender fazendo e transformar ideias em resultados.";

            sugestoes.habilidades = [
                "Resolução de problemas",
                "Trabalho prático",
                "Organização",
                "Aprendizado técnico"
            ];

            sugestoes.areas = [
                "Tecnologia",
                "Engenharia",
                "Manutenção",
                "Área técnica"
            ];

            break;

        case "I":

            sugestoes.objetivo =
                "Busco uma oportunidade para aplicar meu interesse por pesquisa, análise e resolução de problemas, desenvolvendo experiência profissional.";

            sugestoes.sobre_mim =
                "Sou uma pessoa curiosa, analítica e interessada em compreender como as coisas funcionam. Tenho facilidade para pesquisar, aprender e buscar soluções.";

            sugestoes.habilidades = [
                "Pesquisa",
                "Análise",
                "Raciocínio lógico",
                "Aprendizado"
            ];

            sugestoes.areas = [
                "Ciência",
                "Tecnologia",
                "Pesquisa",
                "Saúde"
            ];

            break;

        case "A":

            sugestoes.objetivo =
                "Busco uma oportunidade para desenvolver minha criatividade, comunicação e capacidade de criar soluções e projetos inovadores.";

            sugestoes.sobre_mim =
                "Sou uma pessoa criativa, curiosa e interessada em transformar ideias em projetos. Gosto de experimentar novas possibilidades e desenvolver soluções diferentes.";

            sugestoes.habilidades = [
                "Criatividade",
                "Comunicação",
                "Design",
                "Criação de projetos"
            ];

            sugestoes.areas = [
                "Design",
                "Comunicação",
                "Marketing",
                "Audiovisual"
            ];

            break;

        case "S":

            sugestoes.objetivo =
                "Busco uma oportunidade para desenvolver minhas habilidades de comunicação, colaboração e relacionamento, contribuindo positivamente com a equipe.";

            sugestoes.sobre_mim =
                "Sou uma pessoa colaborativa, comunicativa e interessada em ajudar outras pessoas. Gosto de trabalhar em equipe e compartilhar conhecimentos.";

            sugestoes.habilidades = [
                "Comunicação",
                "Empatia",
                "Trabalho em equipe",
                "Colaboração"
            ];

            sugestoes.areas = [
                "Educação",
                "Psicologia",
                "Recursos Humanos",
                "Atendimento"
            ];

            break;

        case "E":

            sugestoes.objetivo =
                "Busco uma oportunidade para desenvolver minhas habilidades de liderança, comunicação, organização e iniciativa, adquirindo experiência profissional.";

            sugestoes.sobre_mim =
                "Sou uma pessoa comunicativa, determinada e interessada em desenvolver projetos. Gosto de tomar iniciativa, organizar atividades e buscar resultados.";

            sugestoes.habilidades = [
                "Liderança",
                "Comunicação",
                "Iniciativa",
                "Organização"
            ];

            sugestoes.areas = [
                "Administração",
                "Empreendedorismo",
                "Gestão",
                "Negócios"
            ];

            break;

        case "C":

            sugestoes.objetivo =
                "Busco uma oportunidade para desenvolver minhas habilidades de organização, planejamento e gestão, contribuindo com responsabilidade para a equipe.";

            sugestoes.sobre_mim =
                "Sou uma pessoa organizada, responsável e atenta aos detalhes. Gosto de planejar atividades, estruturar informações e acompanhar resultados.";

            sugestoes.habilidades = [
                "Organização",
                "Planejamento",
                "Atenção aos detalhes",
                "Gestão"
            ];

            sugestoes.areas = [
                "Administração",
                "Finanças",
                "Gestão",
                "Contabilidade"
            ];

            break;

        default:

            sugestoes.objetivo =
                "Busco uma oportunidade para desenvolver minhas habilidades, adquirir experiência e iniciar minha trajetória profissional.";

            sugestoes.sobre_mim =
                "Sou uma pessoa dedicada, curiosa e interessada em aprender. Estou buscando oportunidades para desenvolver minhas habilidades e construir minha trajetória profissional.";

            sugestoes.habilidades = [
                "Comunicação",
                "Organização",
                "Trabalho em equipe",
                "Aprendizado"
            ];

            sugestoes.areas = [
                "Tecnologia",
                "Administração",
                "Comunicação",
                "Educação"
            ];

            break;

    }

    return sugestoes;

}

// ============================================================
// ADICIONAR EXPERIÊNCIA
// ============================================================

app.post(
    "/api/curriculo/:curriculoId/experiencias",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Currículo inválido."
            });

        }

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                const cargo =
                    String(
                        req.body.cargo || ""
                    ).trim();

                if (!cargo) {

                    return res.status(400).json({
                        sucesso: false,
                        erro:
                            "Informe o cargo."
                    });

                }

                db.run(
                    `
                    INSERT INTO curriculo_experiencias
                    (
                        curriculo_id,
                        cargo,
                        empresa,
                        inicio,
                        fim,
                        descricao,
                        ordem
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    `,
                    [
                        curriculoId,
                        cargo,
                        String(
                            req.body.empresa || ""
                        ),
                        String(
                            req.body.inicio || ""
                        ),
                        String(
                            req.body.fim || ""
                        ),
                        String(
                            req.body.descricao || ""
                        ),
                        Number(
                            req.body.ordem || 0
                        )
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro adicionando experiência:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao adicionar experiência."
                            });

                        }

                        return res.status(201).json({

                            sucesso: true,

                            id:
                                this.lastID,

                            mensagem:
                                "Experiência adicionada."

                        });

                    }
                );

            }
        );

    }
);
// ============================================================
// ADICIONAR FORMAÇÃO
// ============================================================

app.post(
    "/api/curriculo/:curriculoId/formacoes",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Currículo inválido."
            });

        }

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                const curso =
                    String(
                        req.body.curso || ""
                    ).trim();

                if (!curso) {

                    return res.status(400).json({
                        sucesso: false,
                        erro:
                            "Informe o curso ou formação."
                    });

                }

                db.run(
                    `
                    INSERT INTO curriculo_formacoes
                    (
                        curriculo_id,
                        curso,
                        instituicao,
                        inicio,
                        fim,
                        descricao,
                        ordem
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    `,
                    [
                        curriculoId,
                        curso,
                        String(
                            req.body.instituicao || ""
                        ),
                        String(
                            req.body.inicio || ""
                        ),
                        String(
                            req.body.fim || ""
                        ),
                        String(
                            req.body.descricao || ""
                        ),
                        Number(
                            req.body.ordem || 0
                        )
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro ao adicionar formação:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao adicionar formação."
                            });

                        }

                        return res.status(201).json({

                            sucesso: true,

                            id:
                                this.lastID,

                            mensagem:
                                "Formação adicionada."

                        });

                    }
                );

            }
        );

    }
);

// ============================================================
// ADICIONAR CURSO
// ============================================================

app.post(
    "/api/curriculo/:curriculoId/cursos",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Currículo inválido."
            });

        }

        /*
        =====================================================
        VERIFICA SE O CURRÍCULO PERTENCE AO USUÁRIO LOGADO
        =====================================================
        */

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                /*
                =================================================
                DADOS DO CURSO
                =================================================
                */

                const nome =
                    String(
                        req.body.nome || ""
                    ).trim();

                if (!nome) {

                    return res.status(400).json({
                        sucesso: false,
                        erro:
                            "Informe o nome do curso."
                    });

                }

                /*
                =================================================
                INSERE O CURSO
                =================================================
                */

                db.run(
                    `
                    INSERT INTO curriculo_cursos
                    (
                        curriculo_id,
                        nome,
                        instituicao,
                        ano,
                        descricao,
                        ordem
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                    `,
                    [
                        curriculoId,

                        nome,

                        String(
                            req.body.instituicao || ""
                        ),

                        String(
                            req.body.ano || ""
                        ),

                        String(
                            req.body.descricao || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro ao adicionar curso:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao adicionar curso."
                            });

                        }

                        return res.status(201).json({

                            sucesso: true,

                            id:
                                this.lastID,

                            mensagem:
                                "Curso adicionado."

                        });

                    }
                );

            }
        );

    }
);
// ============================================================
// ADICIONAR HABILIDADE
// ============================================================

app.post(
    "/api/curriculo/:curriculoId/habilidades",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Currículo inválido."
            });

        }

        /*
        =====================================================
        VERIFICA SE O CURRÍCULO PERTENCE AO USUÁRIO LOGADO
        =====================================================
        */

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                /*
                =================================================
                DADOS DA HABILIDADE
                =================================================
                */

                const nome =
                    String(
                        req.body.nome || ""
                    ).trim();

                let nivel =
                    Number(
                        req.body.nivel || 3
                    );

                if (!nome) {

                    return res.status(400).json({
                        sucesso: false,
                        erro:
                            "Informe a habilidade."
                    });

                }

                /*
                =================================================
                GARANTE NÍVEL ENTRE 1 E 5
                =================================================
                */

                if (nivel < 1) nivel = 1;
                if (nivel > 5) nivel = 5;

                /*
                =================================================
                INSERE A HABILIDADE
                =================================================
                */

                db.run(
                    `
                    INSERT INTO curriculo_habilidades
                    (
                        curriculo_id,
                        nome,
                        nivel,
                        ordem
                    )
                    VALUES (?, ?, ?, ?)
                    `,
                    [
                        curriculoId,

                        nome,

                        nivel,

                        Number(
                            req.body.ordem || 0
                        )
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro ao adicionar habilidade:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao adicionar habilidade."
                            });

                        }

                        return res.status(201).json({

                            sucesso: true,

                            id:
                                this.lastID,

                            mensagem:
                                "Habilidade adicionada."

                        });

                    }
                );

            }
        );

    }
);
// ============================================================
// ADICIONAR IDIOMA
// ============================================================

app.post(
    "/api/curriculo/:curriculoId/idiomas",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Currículo inválido."
            });

        }

        /*
        =====================================================
        VERIFICA SE O CURRÍCULO PERTENCE AO USUÁRIO LOGADO
        =====================================================
        */

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                /*
                =================================================
                DADOS DO IDIOMA
                =================================================
                */

                const idioma =
                    String(
                        req.body.idioma || ""
                    ).trim();

                if (!idioma) {

                    return res.status(400).json({
                        sucesso: false,
                        erro:
                            "Informe o idioma."
                    });

                }

                /*
                =================================================
                INSERE O IDIOMA
                =================================================
                */

                db.run(
                    `
                    INSERT INTO curriculo_idiomas
                    (
                        curriculo_id,
                        idioma,
                        nivel,
                        ordem
                    )
                    VALUES (?, ?, ?, ?)
                    `,
                    [
                        curriculoId,

                        idioma,

                        String(
                            req.body.nivel || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro ao adicionar idioma:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao adicionar idioma."
                            });

                        }

                        return res.status(201).json({

                            sucesso: true,

                            id:
                                this.lastID,

                            mensagem:
                                "Idioma adicionado."

                        });

                    }
                );

            }
        );

    }
);
// ============================================================
// ADICIONAR PROJETO
// ============================================================

app.post(
    "/api/curriculo/:curriculoId/projetos",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Currículo inválido."
            });

        }

        /*
        =====================================================
        VERIFICA SE O CURRÍCULO PERTENCE AO USUÁRIO LOGADO
        =====================================================
        */

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                /*
                =================================================
                DADOS DO PROJETO
                =================================================
                */

                const nome =
                    String(
                        req.body.nome || ""
                    ).trim();

                if (!nome) {

                    return res.status(400).json({
                        sucesso: false,
                        erro:
                            "Informe o nome do projeto."
                    });

                }

                /*
                =================================================
                INSERE O PROJETO
                =================================================
                */

                db.run(
                    `
                    INSERT INTO curriculo_projetos
                    (
                        curriculo_id,
                        nome,
                        descricao,
                        link,
                        ordem
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        curriculoId,

                        nome,

                        String(
                            req.body.descricao || ""
                        ),

                        String(
                            req.body.link || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro ao adicionar projeto:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao adicionar projeto."
                            });

                        }

                        return res.status(201).json({

                            sucesso: true,

                            id:
                                this.lastID,

                            mensagem:
                                "Projeto adicionado."

                        });

                    }
                );

            }
        );

    }
);

// ============================================================
// EXCLUIR ITEM DO CURRÍCULO
// ============================================================

const tabelasCurriculo = {

    experiencias:
        "curriculo_experiencias",

    formacoes:
        "curriculo_formacoes",

    cursos:
        "curriculo_cursos",

    habilidades:
        "curriculo_habilidades",

    idiomas:
        "curriculo_idiomas",

    projetos:
        "curriculo_projetos"

};

app.delete(
    "/api/curriculo/:curriculoId/:tipo/:itemId",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        const itemId =
            Number(req.params.itemId);

        const tipo =
            req.params.tipo;

        const tabela =
            tabelasCurriculo[tipo];

        /*
        =====================================================
        VALIDAÇÃO DOS IDs
        =====================================================
        */

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0 ||
            !Number.isInteger(itemId) ||
            itemId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Dados inválidos."
            });

        }

        /*
        =====================================================
        VALIDAÇÃO DO TIPO
        =====================================================
        */

        if (!tabela) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Tipo de item inválido."
            });

        }

        /*
        =====================================================
        VERIFICA SE O CURRÍCULO PERTENCE AO USUÁRIO LOGADO
        =====================================================
        */

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                /*
                =================================================
                EXCLUI O ITEM
                =================================================
                */

                db.run(
                    `
                    DELETE FROM ${tabela}
                    WHERE id = ?
                    AND curriculo_id = ?
                    `,
                    [
                        itemId,
                        curriculoId
                    ],
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro excluindo item:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao excluir item."
                            });

                        }

                        return res.json({

                            sucesso: true,

                            removidos:
                                this.changes,

                            mensagem:
                                "Item removido."

                        });

                    }
                );

            }
        );

    }
);

// ============================================================
// ATUALIZAR ITEM DO CURRÍCULO
// ============================================================
app.put(
    "/api/curriculo/:curriculoId/:tipo/:itemId",
    autenticarToken,
    (req, res) => {

        const curriculoId =
            Number(req.params.curriculoId);

        const itemId =
            Number(req.params.itemId);

        const tipo =
            req.params.tipo;

        const tabela =
            tabelasCurriculo[tipo];

        /*
        =====================================================
        VALIDAÇÃO DOS IDs
        =====================================================
        */

        if (
            !Number.isInteger(curriculoId) ||
            curriculoId <= 0 ||
            !Number.isInteger(itemId) ||
            itemId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Dados inválidos."
            });

        }

        /*
        =====================================================
        VALIDAÇÃO DO TIPO
        =====================================================
        */

        if (!tabela) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Tipo de item inválido."
            });

        }

        /*
        =====================================================
        VERIFICA SE O CURRÍCULO PERTENCE AO USUÁRIO LOGADO
        =====================================================
        */

        db.get(
            `
            SELECT
                id,
                aluno_id
            FROM curriculos
            WHERE id = ?
            `,
            [curriculoId],
            (erroCurriculo, curriculo) => {

                if (erroCurriculo) {

                    console.error(
                        "Erro verificando currículo:",
                        erroCurriculo.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao verificar currículo."
                    });

                }

                if (!curriculo) {

                    return res.status(404).json({
                        sucesso: false,
                        erro:
                            "Currículo não encontrado."
                    });

                }

                if (
                    Number(curriculo.aluno_id) !==
                    Number(req.usuario.id)
                ) {

                    return res.status(403).json({
                        sucesso: false,
                        erro:
                            "Você não tem permissão para alterar este currículo."
                    });

                }

                /*
                =================================================
                CAMPOS QUE SERÃO ATUALIZADOS
                =================================================
                */

                let campos = [];
                let valores = [];

                if (tipo === "experiencias") {

                    campos = [
                        "cargo",
                        "empresa",
                        "inicio",
                        "fim",
                        "descricao",
                        "ordem"
                    ];

                    valores = [
                        String(
                            req.body.cargo || ""
                        ),

                        String(
                            req.body.empresa || ""
                        ),

                        String(
                            req.body.inicio || ""
                        ),

                        String(
                            req.body.fim || ""
                        ),

                        String(
                            req.body.descricao || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ];

                } else if (tipo === "formacoes") {

                    campos = [
                        "curso",
                        "instituicao",
                        "inicio",
                        "fim",
                        "descricao",
                        "ordem"
                    ];

                    valores = [
                        String(
                            req.body.curso || ""
                        ),

                        String(
                            req.body.instituicao || ""
                        ),

                        String(
                            req.body.inicio || ""
                        ),

                        String(
                            req.body.fim || ""
                        ),

                        String(
                            req.body.descricao || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ];

                } else if (tipo === "cursos") {

                    campos = [
                        "nome",
                        "instituicao",
                        "ano",
                        "descricao",
                        "ordem"
                    ];

                    valores = [
                        String(
                            req.body.nome || ""
                        ),

                        String(
                            req.body.instituicao || ""
                        ),

                        String(
                            req.body.ano || ""
                        ),

                        String(
                            req.body.descricao || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ];

                } else if (tipo === "habilidades") {

                    campos = [
                        "nome",
                        "nivel",
                        "ordem"
                    ];

                    valores = [
                        String(
                            req.body.nome || ""
                        ),

                        Number(
                            req.body.nivel || 3
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ];

                } else if (tipo === "idiomas") {

                    campos = [
                        "idioma",
                        "nivel",
                        "ordem"
                    ];

                    valores = [
                        String(
                            req.body.idioma || ""
                        ),

                        String(
                            req.body.nivel || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ];

                } else if (tipo === "projetos") {

                    campos = [
                        "nome",
                        "descricao",
                        "link",
                        "ordem"
                    ];

                    valores = [
                        String(
                            req.body.nome || ""
                        ),

                        String(
                            req.body.descricao || ""
                        ),

                        String(
                            req.body.link || ""
                        ),

                        Number(
                            req.body.ordem || 0
                        )
                    ];

                }

                /*
                =================================================
                MONTA O UPDATE
                =================================================
                */

                const partes =
                    campos.map(
                        (campo) =>
                            `${campo} = ?`
                    );

                valores.push(
                    itemId,
                    curriculoId
                );

                /*
                =================================================
                ATUALIZA O ITEM
                =================================================
                */

                db.run(
                    `
                    UPDATE ${tabela}
                    SET ${partes.join(", ")}
                    WHERE id = ?
                    AND curriculo_id = ?
                    `,
                    valores,
                    function (erro) {

                        if (erro) {

                            console.error(
                                "Erro atualizando item:",
                                erro.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao atualizar item."
                            });

                        }

                        return res.json({

                            sucesso: true,

                            alterados:
                                this.changes,

                            mensagem:
                                "Item atualizado."

                        });

                    }
                );

            }
        );

    }
);

// ============================================================
// PROGRESSO DO CURRÍCULO
// ============================================================

app.get(
    "/api/curriculo/progresso/:alunoId",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.alunoId) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar este progresso."
            });

        }

        const alunoId =
            Number(req.params.alunoId);

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro:
                    "Aluno inválido."
            });

        }

        buscarOuCriarCurriculo(
            alunoId,
            (erro, curriculo) => {

                if (erro) {

                    return res.status(500).json({
                        sucesso: false,
                        erro:
                            "Erro ao buscar currículo."
                    });

                }

                const id =
                    curriculo.id;

                db.get(
                    `
                    SELECT

                        (
                            SELECT COUNT(*)
                            FROM curriculo_experiencias
                            WHERE curriculo_id = ?
                        ) AS experiencias,

                        (
                            SELECT COUNT(*)
                            FROM curriculo_formacoes
                            WHERE curriculo_id = ?
                        ) AS formacoes,

                        (
                            SELECT COUNT(*)
                            FROM curriculo_cursos
                            WHERE curriculo_id = ?
                        ) AS cursos,

                        (
                            SELECT COUNT(*)
                            FROM curriculo_habilidades
                            WHERE curriculo_id = ?
                        ) AS habilidades,

                        (
                            SELECT COUNT(*)
                            FROM curriculo_idiomas
                            WHERE curriculo_id = ?
                        ) AS idiomas,

                        (
                            SELECT COUNT(*)
                            FROM curriculo_projetos
                            WHERE curriculo_id = ?
                        ) AS projetos
                    `,
                    [
                        id,
                        id,
                        id,
                        id,
                        id,
                        id
                    ],
                    (erro, dados) => {

                        if (erro) {

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro calculando progresso."
                            });

                        }

                        let pontos = 0;

                        if (
                            curriculo.objetivo &&
                            curriculo.objetivo.trim()
                        ) {
                            pontos++;
                        }

                        if (
                            curriculo.sobre_mim &&
                            curriculo.sobre_mim.trim()
                        ) {
                            pontos++;
                        }

                        if (
                            curriculo.telefone &&
                            curriculo.telefone.trim()
                        ) {
                            pontos++;
                        }

                        if (
                            curriculo.cidade &&
                            curriculo.cidade.trim()
                        ) {
                            pontos++;
                        }

                        if (
                            curriculo.linkedin &&
                            curriculo.linkedin.trim()
                        ) {
                            pontos++;
                        }

                        if (dados.formacoes > 0) {
                            pontos++;
                        }

                        if (dados.habilidades > 0) {
                            pontos++;
                        }

                        if (dados.cursos > 0) {
                            pontos++;
                        }

                        if (dados.experiencias > 0) {
                            pontos++;
                        }

                        if (dados.projetos > 0) {
                            pontos++;
                        }

                        if (dados.idiomas > 0) {
                            pontos++;
                        }

                        const total =
                            11;

                        const percentual =
                            Math.min(
                                100,
                                Math.round(
                                    (
                                        pontos /
                                        total
                                    ) * 100
                                )
                            );

                        return res.json({

                            sucesso: true,

                            progresso: percentual,

                            preenchidos: pontos,

                            total,

                            detalhes: dados

                        });

                    }
                );

            }
        );

    }
);

// ============================================================
// INTELIGÊNCIA ARTIFICIAL - ANALISAR CURRÍCULO
// ============================================================
// ============================================================
// MEU FUTURO IA - CHAT CONVERSACIONAL
// ============================================================


// ==========================================
// STATUS DA INTELIGÊNCIA ARTIFICIAL
// ==========================================

app.get("/api/ia/status", (req, res) => {

    return res.json({
        sucesso: true,
        configurada: Boolean(openai),
        mensagem: openai
            ? "Inteligência artificial configurada e disponível."
            : "Inteligência artificial não configurada."
    });

});

app.post(
    "/api/ia/chat",
    async (req, res) => {

        try {

            // ==========================================
            // VERIFICAR SE A IA ESTÁ CONFIGURADA
            // ==========================================

            if (!openai) {

                return res.status(503).json({
                    sucesso: false,
                    erro:
                        "A inteligência artificial não está configurada. Verifique a OPENAI_API_KEY no arquivo .env."
                });

            }


            // ==========================================
            // RECEBER DADOS DO FRONTEND
            // ==========================================

            const mensagem = String(
                req.body?.mensagem || ""
            ).trim();

            const historico =
                Array.isArray(req.body?.historico)
                    ? req.body.historico
                    : [];

            const curriculo =
                req.body?.curriculo || {};

            const contexto =
                req.body?.contexto || {};

            const perfil =
                req.body?.perfil || {};

            const testeVocacional =
                req.body?.testeVocacional || {};

            const questionarios =
                Array.isArray(req.body?.questionarios)
                    ? req.body.questionarios
                    : [];

            const metas =
                Array.isArray(req.body?.metas)
                    ? req.body.metas
                    : [];


            // ==========================================
            // VERIFICAR MENSAGEM
            // ==========================================

            if (!mensagem) {

                return res.status(400).json({
                    sucesso: false,
                    erro:
                        "Digite uma mensagem para conversar com a IA."
                });

            }


            // ==========================================
            // FUNÇÃO PARA REDUZIR TEXTOS
            // ==========================================

            function limitarTexto(valor, limite) {

                const texto = String(valor || "");

                if (texto.length <= limite) {
                    return texto;
                }

                return texto.substring(0, limite) + "...";

            }


            // ==========================================
            // REDUZIR HISTÓRICO
            // ==========================================

            const historicoResumido =
                historico
                    .slice(-6)
                    .map((item) => {

                        return {
                            role:
                                item?.role === "assistant"
                                    ? "assistant"
                                    : "user",

                            content:
                                limitarTexto(
                                    item?.content ||
                                    item?.mensagem ||
                                    "",
                                    1200
                                )
                        };

                    })
                    .filter(
                        (item) =>
                            item.content.trim() !== ""
                    );


            // ==========================================
            // REDUZIR CURRÍCULO
            // ==========================================

            const curriculoResumido = {

                objetivo:
                    limitarTexto(
                        curriculo?.objetivo,
                        500
                    ),

                sobre:
                    limitarTexto(
                        curriculo?.sobre,
                        700
                    ),

                habilidades:
                    Array.isArray(
                        curriculo?.habilidades
                    )
                        ? curriculo.habilidades
                            .slice(0, 8)
                            .map(
                                (item) =>
                                    limitarTexto(
                                        typeof item === "string"
                                            ? item
                                            : item?.nome,
                                        150
                                    )
                            )
                        : [],

                formacoes:
                    Array.isArray(
                        curriculo?.formacoes
                    )
                        ? curriculo.formacoes
                            .slice(0, 3)
                            .map((item) => ({
                                curso:
                                    limitarTexto(
                                        item?.curso,
                                        150
                                    ),

                                instituicao:
                                    limitarTexto(
                                        item?.instituicao,
                                        150
                                    )
                            }))
                        : [],

                experiencias:
                    Array.isArray(
                        curriculo?.experiencias
                    )
                        ? curriculo.experiencias
                            .slice(0, 3)
                            .map((item) => ({
                                cargo:
                                    limitarTexto(
                                        item?.cargo,
                                        150
                                    ),

                                empresa:
                                    limitarTexto(
                                        item?.empresa,
                                        150
                                    )
                            }))
                        : []

            };


            // ==========================================
            // REDUZIR PERFIL
            // ==========================================

            const perfilResumido = {

                perfil_principal:
                    limitarTexto(
                        perfil?.perfil_principal ||
                        perfil?.perfil ||
                        "",
                        300
                    ),

                codigo:
                    limitarTexto(
                        perfil?.codigo,
                        100
                    )

            };


            // ==========================================
            // REDUZIR TESTE VOCACIONAL
            // ==========================================

            const testeResumido = {

                perfil:
                    limitarTexto(
                        testeVocacional?.perfil ||
                        testeVocacional?.perfil_principal ||
                        "",
                        300
                    ),

                codigo:
                    limitarTexto(
                        testeVocacional?.codigo,
                        100
                    ),

                pontuacoes:
                    testeVocacional?.pontuacoes || {}

            };


            // ==========================================
            // REDUZIR QUESTIONÁRIOS
            // ==========================================

            const questionariosResumidos =
                questionarios
                    .slice(-3)
                    .map((item) => {

                        return {

                            titulo:
                                limitarTexto(
                                    item?.titulo ||
                                    item?.nome ||
                                    "",
                                    200
                                ),

                            resposta:
                                limitarTexto(
                                    item?.resposta ||
                                    item?.resultado ||
                                    "",
                                    500
                                )

                        };

                    });


            // ==========================================
            // REDUZIR METAS
            // ==========================================

            const metasResumidas =
                metas
                    .slice(-5)
                    .map((item) => {

                        return {

                            titulo:
                                limitarTexto(
                                    item?.titulo ||
                                    item?.nome ||
                                    "",
                                    200
                                ),

                            status:
                                limitarTexto(
                                    item?.status ||
                                    "",
                                    100
                                )

                        };

                    });


            // ==========================================
            // CONTEXTO DA PÁGINA
            // ==========================================

            const contextoResumido =
                limitarTexto(
                    typeof contexto === "string"
                        ? contexto
                        : JSON.stringify(contexto),
                    500
                );


            // ==========================================
            // LIMITAR MENSAGEM DO ESTUDANTE
            // ==========================================

            const mensagemUsuario =
                limitarTexto(
                    mensagem,
                    3000
                );


            // ==========================================
            // INSTRUÇÕES DO MEU FUTURO IA
            // ==========================================

            const instrucoes = `

Você é o Meu Futuro IA, assistente inteligente da plataforma Meu Futuro.

Você conversa com estudantes e ajuda em:

- estudos;
- profissões;
- currículo;
- primeiro emprego;
- jovem aprendiz;
- estágio;
- entrevistas;
- cursos;
- universidades;
- metas;
- planejamento de carreira.

Seu papel é orientar o estudante, explicar possibilidades e ajudá-lo a tomar suas próprias decisões.

Nunca escolha o futuro do estudante por ele.

REGRAS IMPORTANTES:

1. Responda em português brasileiro.

2. Seja amigável, simples, claro e natural.

3. Para perguntas simples, responda de forma curta.

4. Normalmente responda em aproximadamente 8 a 12 linhas.

5. Não faça respostas enormes.

6. Faça no máximo 3 perguntas por resposta.

7. Não repita informações que o estudante já forneceu.

8. Use listas curtas quando necessário.

9. Não invente informações sobre o estudante.

10. Nunca invente empregos, empresas, cursos, certificados, habilidades, projetos, prêmios, experiências, formação ou conquistas.

11. Se uma informação sobre o estudante não estiver disponível, pergunte.

12. Sugestões devem ser apresentadas como sugestões, nunca como fatos.

13. O teste vocacional é apenas uma indicação e não determina a profissão do estudante.

14. Se o estudante não souber qual profissão escolher, ajude-o a descobrir seus interesses antes de indicar possibilidades.

15. Se o estudante estiver procurando emprego, jovem aprendiz ou estágio, ajude com currículo, preparação, entrevista e próximos passos.

16. Se estiver falando de currículo, utilize somente informações verdadeiras fornecidas pelo estudante.

17. Ajude o estudante a explorar profissões sem dizer que existe uma profissão obrigatoriamente melhor para ele.

18. Use o histórico da conversa para manter continuidade.

19. Não transforme uma conversa simples em uma aula enorme.

20. Seja objetivo.

`;


            // ==========================================
            // CONTEXTO DO ESTUDANTE
            // ==========================================

            const contextoEstudante = `

INFORMAÇÕES DISPONÍVEIS DO ESTUDANTE:

PERFIL:
${JSON.stringify(
    perfilResumido,
    null,
    2
)}

TESTE VOCACIONAL:
${JSON.stringify(
    testeResumido,
    null,
    2
)}

CURRÍCULO:
${JSON.stringify(
    curriculoResumido,
    null,
    2
)}

QUESTIONÁRIOS:
${JSON.stringify(
    questionariosResumidos,
    null,
    2
)}

METAS:
${JSON.stringify(
    metasResumidas,
    null,
    2
)}

CONTEXTO DA PÁGINA:
${contextoResumido}

`;


            // ==========================================
            // PREPARAR HISTÓRICO
            // ==========================================

            const historicoTexto =
                historicoResumido
                    .map((item) => {

                        return `${item.role}: ${item.content}`;

                    })
                    .join("\n");


            // ==========================================
            // PREPARAR ENTRADA FINAL
            // ==========================================

            const entradaFinal = `

${contextoEstudante}

HISTÓRICO RECENTE:
${historicoTexto || "Nenhum histórico disponível."}

NOVA MENSAGEM DO ESTUDANTE:
${mensagemUsuario}

Responda diretamente ao estudante.
`;


            // ==========================================
            // ENVIAR PARA A OPENAI
            // ==========================================

            const resposta =
                await openai.responses.create({

                    model:
                        "gpt-5.6-luna",

                    instructions:
                        instrucoes,

                    input:
                        entradaFinal,

                    max_output_tokens:
                        1200

                });


            // ==========================================
            // PEGAR RESPOSTA
            // ==========================================

            const texto =
                resposta.output_text || "";


            // ==========================================
            // VERIFICAR RESPOSTA
            // ==========================================

            if (!texto.trim()) {

                return res.status(502).json({

                    sucesso: false,

                    erro:
                        "A inteligência artificial não retornou uma resposta."

                });

            }


            // ==========================================
            // DEVOLVER PARA O FRONTEND
            // ==========================================

            return res.json({

                sucesso: true,

                mensagem:
                    texto.trim()

            });


               } catch (erro) {

            console.error(
                "Erro no chat da inteligência artificial:",
                erro
            );

            if (
                erro?.status === 429 ||
                erro?.code === "rate_limit_exceeded"
            ) {

                return res.status(429).json({
                    sucesso: false,
                    erro:
                        "A inteligência artificial atingiu o limite temporário de uso. Aguarde alguns instantes e tente novamente.",
                    codigo:
                        "rate_limit_exceeded"
                });

            }

            if (
                erro?.status === 401 ||
                erro?.code === "invalid_api_key"
            ) {

                return res.status(401).json({
                    sucesso: false,
                    erro:
                        "A chave da API da inteligência artificial é inválida ou não foi configurada corretamente."
                });

            }

            return res.status(500).json({
                sucesso: false,
                erro:
                    "Não foi possível conversar com a inteligência artificial.",
                detalhes:
                    erro?.message || "Erro desconhecido."
            });

        }

    }

);
// ============================================================
// PROFISSÕES - RESULTADO VOCACIONAL DO ALUNO
// ============================================================

app.get(
    "/api/profissoes/:alunoId",
    autenticarToken,
    (req, res) => {

        if (
            Number(req.params.alunoId) !==
            Number(req.usuario.id)
        ) {

            return res.status(403).json({
                sucesso: false,
                erro:
                    "Você não tem permissão para acessar estas profissões."
            });

        }

        const alunoId = Number(
            req.params.alunoId
        );

        if (
            !Number.isInteger(alunoId) ||
            alunoId <= 0
        ) {

            return res.status(400).json({
                sucesso: false,
                erro: "Aluno inválido."
            });

        }

        db.get(
            `
            SELECT
                id,
                nome,
                email
            FROM alunos
            WHERE id = ?
            `,
            [alunoId],
            (erroAluno, aluno) => {

                if (erroAluno) {

                    console.error(
                        "Erro ao buscar aluno:",
                        erroAluno.message
                    );

                    return res.status(500).json({
                        sucesso: false,
                        erro: "Erro ao buscar aluno."
                    });

                }

                if (!aluno) {

                    return res.status(404).json({
                        sucesso: false,
                        erro: "Aluno não encontrado."
                    });

                }

                db.get(
                    `
                    SELECT
                        id,
                        aluno_id,
                        perfil_principal,
                        codigo,
                        pontuacoes,
                        created_at
                    FROM resultados
                    WHERE aluno_id = ?
                    ORDER BY id DESC
                    LIMIT 1
                    `,
                    [alunoId],
                    (erroResultado, resultado) => {

                        if (erroResultado) {

                            console.error(
                                "Erro ao buscar resultado vocacional:",
                                erroResultado.message
                            );

                            return res.status(500).json({
                                sucesso: false,
                                erro:
                                    "Erro ao buscar resultado vocacional."
                            });

                        }

                        if (!resultado) {

                            return res.json({
                                sucesso: true,
                                aluno,
                                possuiResultado: false,
                                resultado: null
                            });

                        }

                        let pontuacoes = {};

                        try {

                            pontuacoes = JSON.parse(
                                resultado.pontuacoes || "{}"
                            );

                        } catch (erroJSON) {

                            console.error(
                                "Erro lendo pontuações:",
                                erroJSON.message
                            );

                            pontuacoes = {};

                        }

                        return res.json({

                            sucesso: true,

                            possuiResultado: true,

                            aluno,

                            resultado: {

                                id:
                                    resultado.id,

                                aluno_id:
                                    resultado.aluno_id,

                                perfil_principal:
                                    resultado.perfil_principal,

                                codigo:
                                    resultado.codigo,

                                pontuacoes,

                                created_at:
                                    resultado.created_at

                            }

                        });

                    }
                );

            }
        );

    }
);


// ============================================================
// SERVIDOR
// ============================================================

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});