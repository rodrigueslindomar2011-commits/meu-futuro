/* =========================================================
   MEU FUTURO
   POSSIBILIDADES

   Esta página utiliza o resultado salvo pelo
   questionarios.js em:

   sessionStorage:
       resultadoTeste

   localStorage:
       resultadoTeste
========================================================= */


/* =========================================================
   PERFIS RIASEC
========================================================= */

const PERFIS = {

    R: {
        nome: "Realista",

        icone: "🔧",

        area: "Tecnologia, engenharia e atividades práticas",

        descricao:
            "Você demonstra interesse por atividades práticas, construção, tecnologia, ferramentas e pela resolução de problemas de forma concreta."
    },

    I: {
        nome: "Investigativo",

        icone: "🔬",

        area: "Ciência, tecnologia, pesquisa e saúde",

        descricao:
            "Você demonstra curiosidade, gosta de investigar, compreender problemas, pesquisar informações e descobrir como as coisas funcionam."
    },

    A: {
        nome: "Artístico",

        icone: "🎨",

        area: "Criatividade, comunicação, design e cultura",

        descricao:
            "Você demonstra criatividade, imaginação e interesse por expressão, criação, comunicação visual e novas ideias."
    },

    S: {
        nome: "Social",

        icone: "🤝",

        area: "Pessoas, educação, saúde e comunicação",

        descricao:
            "Você demonstra interesse por pessoas, colaboração, comunicação, ensino, orientação e atividades que geram impacto positivo."
    },

    E: {
        nome: "Empreendedor",

        icone: "🚀",

        area: "Negócios, liderança, gestão e inovação",

        descricao:
            "Você demonstra iniciativa, liderança, capacidade de decisão, comunicação e interesse por negócios e novos projetos."
    },

    C: {
        nome: "Convencional",

        icone: "📋",

        area: "Organização, gestão, finanças e processos",

        descricao:
            "Você demonstra organização, atenção aos detalhes, planejamento e interesse por processos, informações e estrutura."
    }

};


/* =========================================================
   IMAGENS
   =========================================================

   As imagens abaixo são imagens ilustrativas de ambiente
   universitário. Elas não representam necessariamente o
   prédio da instituição indicada.
========================================================= */

const IMAGENS = {

    campus:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",

    study:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85",

    technology:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=85",

    science:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85",

    art:
        "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",

    business:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",

    health:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",

    architecture:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85"

};


/* =========================================================
   UNIVERSIDADES
========================================================= */

const UNIVERSIDADES = [

    {
        id: "ufg",

        nome:
            "Universidade Federal de Goiás",

        sigla: "UFG",

        tipo:
            "Universidade pública federal",

        cidade:
            "Goiânia e outros municípios de Goiás",

        descricao:
            "Uma das principais universidades públicas do estado, com ampla variedade de cursos de graduação e áreas de pesquisa.",

        site:
            "https://ufg.br/",

        imagem:
            IMAGENS.campus
    },


    {
        id: "ueg",

        nome:
            "Universidade Estadual de Goiás",

        sigla: "UEG",

        tipo:
            "Universidade pública estadual",

        cidade:
            "Diversos municípios de Goiás",

        descricao:
            "Universidade pública estadual com cursos distribuídos por diferentes cidades e áreas do conhecimento.",

        site:
            "https://www.ueg.br/",

        imagem:
            IMAGENS.study
    },


    {
        id: "puc",

        nome:
            "PUC Goiás",

        sigla: "PUC Goiás",

        tipo:
            "Universidade privada",

        cidade:
            "Goiânia - GO",

        descricao:
            "Instituição de ensino superior localizada em Goiânia, com diversas áreas de formação.",

        site:
            "https://www.pucgoias.edu.br/",

        imagem:
            IMAGENS.architecture
    },


    {
        id: "ifg",

        nome:
            "Instituto Federal de Goiás",

        sigla: "IFG",

        tipo:
            "Instituição pública federal",

        cidade:
            "Diversos municípios de Goiás",

        descricao:
            "Instituição federal com atuação em educação profissional, tecnológica e graduação em diferentes áreas.",

        site:
            "https://www.ifg.edu.br/",

        imagem:
            IMAGENS.technology
    },


    {
        id: "unirv",

        nome:
            "Universidade de Rio Verde",

        sigla: "UniRV",

        tipo:
            "Universidade",

        cidade:
            "Rio Verde e outros municípios",

        descricao:
            "Universidade goiana com cursos em áreas como saúde, engenharias, agrárias, negócios e tecnologia.",

        site:
            "https://www.unirv.edu.br/",

        imagem:
            IMAGENS.science
    },


    {
        id: "unialfa",

        nome:
            "UNIALFA",

        sigla: "UNIALFA",

        tipo:
            "Instituição de ensino superior",

        cidade:
            "Goiânia - GO",

        descricao:
            "Instituição localizada em Goiás com oferta de cursos em diferentes áreas profissionais.",

        site:
            "https://www.unialfa.com.br/",

        imagem:
            IMAGENS.business
    }

];


/* =========================================================
   CURSOS
=========================================================

   Os cursos são organizados por compatibilidade RIASEC.

   Um curso pode aparecer para mais de um perfil.
========================================================= */

const CURSOS = [

    /* =====================================================
       TECNOLOGIA / ENGENHARIA
    ====================================================== */

    {
        id: 1,
        curso: "Ciência da Computação",
        universidade: "ufg",
        area: "Tecnologia",
        perfis: ["R", "I"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.technology,
        descricao:
            "Área indicada para quem gosta de lógica, programação, tecnologia, resolução de problemas e investigação.",
        tags: [
            "Programação",
            "Tecnologia",
            "Lógica"
        ]
    },

    {
        id: 2,
        curso: "Sistemas de Informação",
        universidade: "ufg",
        area: "Tecnologia",
        perfis: ["R", "I", "E", "C"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.technology,
        descricao:
            "Combina tecnologia, sistemas, negócios e resolução de problemas organizacionais.",
        tags: [
            "Tecnologia",
            "Negócios",
            "Sistemas"
        ]
    },

    {
        id: 3,
        curso: "Engenharia Civil",
        universidade: "ueg",
        area: "Engenharia",
        perfis: ["R", "I"],
        local: "Anápolis - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.architecture,
        descricao:
            "Para quem gosta de construção, matemática, projetos, estruturas e solução prática de problemas.",
        tags: [
            "Construção",
            "Projetos",
            "Matemática"
        ]
    },

    {
        id: 4,
        curso: "Engenharia Agrícola",
        universidade: "ueg",
        area: "Engenharia",
        perfis: ["R", "I"],
        local: "Anápolis - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.campus,
        descricao:
            "Une engenharia, tecnologia, agricultura e solução de problemas relacionados ao campo.",
        tags: [
            "Engenharia",
            "Agronegócio",
            "Tecnologia"
        ]
    },

    {
        id: 5,
        curso: "Engenharia de Software",
        universidade: "unirv",
        area: "Tecnologia",
        perfis: ["R", "I", "C"],
        local: "Rio Verde - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.technology,
        descricao:
            "Focada no desenvolvimento de sistemas, programação, arquitetura de software e tecnologia.",
        tags: [
            "Software",
            "Programação",
            "Tecnologia"
        ]
    },


    /* =====================================================
       CIÊNCIA / SAÚDE
    ====================================================== */

    {
        id: 6,
        curso: "Medicina",
        universidade: "ufg",
        area: "Saúde",
        perfis: ["I", "S"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.health,
        descricao:
            "Área que combina investigação científica, conhecimento biológico, tomada de decisões e cuidado com pessoas.",
        tags: [
            "Saúde",
            "Ciência",
            "Pessoas"
        ]
    },

    {
        id: 7,
        curso: "Biomedicina",
        universidade: "ufg",
        area: "Saúde",
        perfis: ["I"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.science,
        descricao:
            "Possibilidade interessante para quem gosta de laboratório, pesquisa, biologia e investigação científica.",
        tags: [
            "Laboratório",
            "Pesquisa",
            "Biologia"
        ]
    },

    {
        id: 8,
        curso: "Ciências Biológicas",
        universidade: "ufg",
        area: "Ciências",
        perfis: ["I", "S"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.science,
        descricao:
            "Estudo dos seres vivos, biodiversidade, ambiente, pesquisa e educação.",
        tags: [
            "Biologia",
            "Pesquisa",
            "Meio ambiente"
        ]
    },

    {
        id: 9,
        curso: "Psicologia",
        universidade: "ufg",
        area: "Saúde e Pessoas",
        perfis: ["I", "S"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.health,
        descricao:
            "Para quem possui interesse pelo comportamento humano, investigação, escuta e relacionamento com pessoas.",
        tags: [
            "Pessoas",
            "Comportamento",
            "Saúde"
        ]
    },

    {
        id: 10,
        curso: "Enfermagem",
        universidade: "unirv",
        area: "Saúde",
        perfis: ["S", "I"],
        local: "Rio Verde - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.health,
        descricao:
            "Área voltada ao cuidado, saúde, atendimento e trabalho colaborativo.",
        tags: [
            "Saúde",
            "Cuidado",
            "Pessoas"
        ]
    },

    {
        id: 11,
        curso: "Medicina Veterinária",
        universidade: "unirv",
        area: "Saúde e Agrárias",
        perfis: ["I", "R", "S"],
        local: "Rio Verde - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.science,
        descricao:
            "Une ciência, saúde, animais, investigação e atividades práticas.",
        tags: [
            "Animais",
            "Saúde",
            "Ciência"
        ]
    },


    /* =====================================================
       NEGÓCIOS / GESTÃO
    ====================================================== */

    {
        id: 12,
        curso: "Administração",
        universidade: "ufg",
        area: "Negócios",
        perfis: ["E", "C", "S"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.business,
        descricao:
            "Possibilidade para quem gosta de organização, liderança, estratégia, negócios e tomada de decisões.",
        tags: [
            "Gestão",
            "Liderança",
            "Negócios"
        ]
    },

    {
        id: 13,
        curso: "Administração",
        universidade: "ueg",
        area: "Negócios",
        perfis: ["E", "C", "S"],
        local: "Goiás - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.business,
        descricao:
            "Curso ligado à gestão de organizações, planejamento, pessoas e negócios.",
        tags: [
            "Gestão",
            "Planejamento",
            "Negócios"
        ]
    },

    {
        id: 14,
        curso: "Ciências Contábeis",
        universidade: "ufg",
        area: "Negócios e Finanças",
        perfis: ["C", "E", "I"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.business,
        descricao:
            "Combina organização, números, análise de informações e tomada de decisões.",
        tags: [
            "Finanças",
            "Números",
            "Organização"
        ]
    },

    {
        id: 15,
        curso: "Direito",
        universidade: "unirv",
        area: "Humanas e Negócios",
        perfis: ["E", "S", "C"],
        local: "Rio Verde - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.business,
        descricao:
            "Área relacionada a argumentação, legislação, comunicação, negociação e resolução de conflitos.",
        tags: [
            "Argumentação",
            "Sociedade",
            "Comunicação"
        ]
    },


    /* =====================================================
       ARTÍSTICO / DESIGN
    ====================================================== */

    {
        id: 16,
        curso: "Arquitetura e Urbanismo",
        universidade: "ufg",
        area: "Arquitetura e Design",
        perfis: ["A", "R", "I"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.architecture,
        descricao:
            "Combina criatividade, desenho, tecnologia, planejamento de espaços e resolução de problemas.",
        tags: [
            "Criatividade",
            "Projetos",
            "Design"
        ]
    },

    {
        id: 17,
        curso: "Artes Visuais",
        universidade: "ufg",
        area: "Artes",
        perfis: ["A"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.art,
        descricao:
            "Para quem gosta de expressão visual, criação, experimentação e linguagem artística.",
        tags: [
            "Arte",
            "Criação",
            "Expressão"
        ]
    },

    {
        id: 18,
        curso: "Design de Moda",
        universidade: "ueg",
        area: "Design e Moda",
        perfis: ["A", "E"],
        local: "Goiás - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.art,
        descricao:
            "Área criativa que combina estética, criação, tendências, produção e mercado.",
        tags: [
            "Moda",
            "Criação",
            "Tendências"
        ]
    },

    {
        id: 19,
        curso: "Design Gráfico",
        universidade: "unirv",
        area: "Design",
        perfis: ["A"],
        local: "Rio Verde - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.art,
        descricao:
            "Voltado para comunicação visual, identidade, composição, criatividade e produção gráfica.",
        tags: [
            "Design",
            "Comunicação",
            "Criatividade"
        ]
    },


    /* =====================================================
       SOCIAL / EDUCAÇÃO
    ====================================================== */

    {
        id: 20,
        curso: "Pedagogia",
        universidade: "ufg",
        area: "Educação",
        perfis: ["S", "A"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.study,
        descricao:
            "Área indicada para quem gosta de ensinar, acompanhar pessoas e contribuir para processos de aprendizagem.",
        tags: [
            "Educação",
            "Ensino",
            "Pessoas"
        ]
    },

    {
        id: 21,
        curso: "Pedagogia",
        universidade: "ueg",
        area: "Educação",
        perfis: ["S", "A"],
        local: "Goiás - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.study,
        descricao:
            "Formação ligada à educação, ensino, aprendizagem e desenvolvimento humano.",
        tags: [
            "Educação",
            "Ensino",
            "Pessoas"
        ]
    },

    {
        id: 22,
        curso: "Educação Física",
        universidade: "ueg",
        area: "Saúde e Educação",
        perfis: ["S", "R"],
        local: "Goiânia - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.health,
        descricao:
            "Combina movimento, saúde, educação, esporte e relacionamento com pessoas.",
        tags: [
            "Esporte",
            "Saúde",
            "Pessoas"
        ]
    },

    {
        id: 23,
        curso: "Psicologia",
        universidade: "ueg",
        area: "Saúde e Pessoas",
        perfis: ["S", "I"],
        local: "Goiás - GO",
        modalidade: "Presencial",
        imagem: IMAGENS.health,
        descricao:
            "Para quem deseja compreender comportamento, relações humanas e processos psicológicos.",
        tags: [
            "Pessoas",
            "Comportamento",
            "Saúde"
        ]
    },


    /* =====================================================
       CONVENCIONAL
    ====================================================== */

    {
        id: 24,
        curso: "Logística",
        universidade: "ueg",
        area: "Gestão",
        perfis: ["C", "E", "R"],
        local: "Goiás - GO",
        modalidade: "Tecnológico",
        imagem: IMAGENS.business,
        descricao:
            "Área ligada à organização de processos, operações, estoque, transporte e planejamento.",
        tags: [
            "Organização",
            "Processos",
            "Gestão"
        ]
    },

    {
        id: 25,
        curso: "Gastronomia",
        universidade: "ueg",
        area: "Serviços e Criatividade",
        perfis: ["A", "S", "E"],
        local: "Goiás - GO",
        modalidade: "Tecnológico",
        imagem: IMAGENS.art,
        descricao:
            "Combina criatividade, produção, organização, atendimento e possibilidades empreendedoras.",
        tags: [
            "Criatividade",
            "Serviços",
            "Empreendedorismo"
        ]
    }

];


/* =========================================================
   ESTADO
========================================================= */

let resultado = null;

let perfilAtual = "I";

let cursosFiltrados = [];

let modalAberto = false;


/* =========================================================
   ELEMENTOS
========================================================= */

const elements = {

    profileIcon:
        document.getElementById(
            "profileIcon"
        ),

    profileName:
        document.getElementById(
            "profileName"
        ),

    profileCode:
        document.getElementById(
            "profileCode"
        ),

    heroCenterIcon:
        document.getElementById(
            "heroCenterIcon"
        ),

    largeProfileIcon:
        document.getElementById(
            "largeProfileIcon"
        ),

    profileArea:
        document.getElementById(
            "profileArea"
        ),

    profileTitle:
        document.getElementById(
            "profileTitle"
        ),

    profileDescription:
        document.getElementById(
            "profileDescription"
        ),

    profileScoreCode:
        document.getElementById(
            "profileScoreCode"
        ),

    courseCount:
        document.getElementById(
            "courseCount"
        ),

    coursesGrid:
        document.getElementById(
            "coursesGrid"
        ),

    universitiesGrid:
        document.getElementById(
            "universitiesGrid"
        ),

    courseSearch:
        document.getElementById(
            "courseSearch"
        ),

    universityFilter:
        document.getElementById(
            "universityFilter"
        ),

    areaFilter:
        document.getElementById(
            "areaFilter"
        ),

    clearFilters:
        document.getElementById(
            "clearFilters"
        ),

    emptyState:
        document.getElementById(
            "emptyState"
        ),

    emptyClearButton:
        document.getElementById(
            "emptyClearButton"
        ),

    courseModal:
        document.getElementById(
            "courseModal"
        ),

    modalOverlay:
        document.getElementById(
            "modalOverlay"
        ),

    modalClose:
        document.getElementById(
            "modalClose"
        ),

    modalCloseButton:
        document.getElementById(
            "modalCloseButton"
        ),

    modalImage:
        document.getElementById(
            "modalImage"
        ),

    modalUniversity:
        document.getElementById(
            "modalUniversity"
        ),

    modalArea:
        document.getElementById(
            "modalArea"
        ),

    modalTitle:
        document.getElementById(
            "modalTitle"
        ),

    modalDescription:
        document.getElementById(
            "modalDescription"
        ),

    modalInstitution:
        document.getElementById(
            "modalInstitution"
        ),

    modalLocation:
        document.getElementById(
            "modalLocation"
        ),

    modalModality:
        document.getElementById(
            "modalModality"
        ),

    modalOfficialLink:
        document.getElementById(
            "modalOfficialLink"
        )

};


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    iniciarPagina
);


function iniciarPagina() {

    resultado =
        carregarResultado();

    perfilAtual =
        descobrirPerfil(resultado);

    atualizarPerfilNaInterface();

    preencherFiltroUniversidades();

    preencherFiltroAreas();

    configurarEventos();

    renderizarCursos();

    renderizarUniversidades();

}


/* =========================================================
   CARREGAR RESULTADO
========================================================= */

function carregarResultado() {

    let dados = null;


    /* -----------------------------------------------------
       Primeiro tenta sessionStorage
    ----------------------------------------------------- */

    try {

        const session =
            sessionStorage.getItem(
                "resultadoTeste"
            );

        if (session) {

            dados =
                JSON.parse(session);

            if (dados) {
                return dados;
            }

        }

    } catch (erro) {

        console.warn(
            "Não foi possível ler sessionStorage.",
            erro
        );

    }


    /* -----------------------------------------------------
       Depois tenta localStorage
    ----------------------------------------------------- */

    try {

        const local =
            localStorage.getItem(
                "resultadoTeste"
            );

        if (local) {

            dados =
                JSON.parse(local);

            if (dados) {
                return dados;
            }

        }

    } catch (erro) {

        console.warn(
            "Não foi possível ler localStorage.",
            erro
        );

    }


    return null;

}


/* =========================================================
   DESCOBRIR PERFIL
========================================================= */

function descobrirPerfil(resultado) {

    if (
        resultado &&
        resultado.perfil_principal &&
        PERFIS[
            resultado.perfil_principal
        ]
    ) {

        return resultado.perfil_principal;

    }


    /*
        Caso a página seja aberta sem fazer
        o teste, usamos Investigativo como
        perfil padrão apenas para permitir
        que a página seja visualizada.
    */

    return "I";

}


/* =========================================================
   ATUALIZAR PERFIL
========================================================= */

function atualizarPerfilNaInterface() {

    const perfil =
        PERFIS[perfilAtual];


    if (!perfil) {
        return;
    }


    const codigo =
        resultado &&
        resultado.codigo
            ? resultado.codigo
            : perfilAtual;


    if (elements.profileIcon) {

        elements.profileIcon.textContent =
            perfil.icone;

    }


    if (elements.profileName) {

        elements.profileName.textContent =
            perfil.nome;

    }


    if (elements.profileCode) {

        elements.profileCode.textContent =
            `Código ${codigo}`;

    }


    if (elements.heroCenterIcon) {

        elements.heroCenterIcon.textContent =
            perfil.icone;

    }


    if (elements.largeProfileIcon) {

        elements.largeProfileIcon.textContent =
            perfil.icone;

    }


    if (elements.profileArea) {

        elements.profileArea.textContent =
            perfil.area;

    }


    if (elements.profileTitle) {

        elements.profileTitle.textContent =
            perfil.nome;

    }


    if (elements.profileDescription) {

        elements.profileDescription.textContent =
            perfil.descricao;

    }


    if (elements.profileScoreCode) {

        elements.profileScoreCode.textContent =
            codigo;

    }

}


/* =========================================================
   FILTRO DE UNIVERSIDADES
========================================================= */

function preencherFiltroUniversidades() {

    if (
        !elements.universityFilter
    ) {
        return;
    }


    UNIVERSIDADES
        .forEach(
            universidade => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    universidade.id;

                option.textContent =
                    `${universidade.sigla} — ${universidade.nome}`;

                elements
                    .universityFilter
                    .appendChild(
                        option
                    );

            }
        );

}


/* =========================================================
   FILTRO DE ÁREAS
========================================================= */

function preencherFiltroAreas() {

    if (!elements.areaFilter) {
        return;
    }


    const areas =
        [
            ...new Set(
                CURSOS.map(
                    curso =>
                        curso.area
                )
            )
        ]
        .sort(
            (a, b) =>
                a.localeCompare(
                    b,
                    "pt-BR"
                )
        );


    areas.forEach(
        area => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                normalizar(area);

            option.textContent =
                area;

            elements
                .areaFilter
                .appendChild(
                    option
                );

        }
    );

}


/* =========================================================
   EVENTOS
========================================================= */

function configurarEventos() {


    if (elements.courseSearch) {

        elements.courseSearch
            .addEventListener(
                "input",
                renderizarCursos
            );

    }


    if (
        elements.universityFilter
    ) {

        elements.universityFilter
            .addEventListener(
                "change",
                renderizarCursos
            );

    }


    if (elements.areaFilter) {

        elements.areaFilter
            .addEventListener(
                "change",
                renderizarCursos
            );

    }


    if (elements.clearFilters) {

        elements.clearFilters
            .addEventListener(
                "click",
                limparFiltros
            );

    }


    if (
        elements.emptyClearButton
    ) {

        elements.emptyClearButton
            .addEventListener(
                "click",
                limparFiltros
            );

    }


    if (elements.modalClose) {

        elements.modalClose
            .addEventListener(
                "click",
                fecharModal
            );

    }


    if (
        elements.modalCloseButton
    ) {

        elements.modalCloseButton
            .addEventListener(
                "click",
                fecharModal
            );

    }


    if (elements.modalOverlay) {

        elements.modalOverlay
            .addEventListener(
                "click",
                fecharModal
            );

    }


    document.addEventListener(
        "keydown",
        evento => {

            if (
                evento.key ===
                "Escape" &&
                modalAberto
            ) {

                fecharModal();

            }

        }
    );

}


/* =========================================================
   RENDERIZAR CURSOS
========================================================= */

function renderizarCursos() {

    if (!elements.coursesGrid) {
        return;
    }


    const busca =
        elements.courseSearch
            ? normalizar(
                elements
                    .courseSearch
                    .value
            )
            : "";


    const universidadeSelecionada =
        elements.universityFilter
            ? elements
                .universityFilter
                .value
            : "all";


    const areaSelecionada =
        elements.areaFilter
            ? elements
                .areaFilter
                .value
            : "all";


    /*
        Primeiro selecionamos os cursos
        compatíveis com o perfil.
    */

    let cursos =
        CURSOS.filter(
            curso =>
                curso.perfis.includes(
                    perfilAtual
                )
        );


    /*
        Pesquisa por nome,
        universidade,
        área ou tags.
    */

    if (busca) {

        cursos =
            cursos.filter(
                curso => {

                    const universidade =
                        encontrarUniversidade(
                            curso.universidade
                        );


                    const texto =
                        [
                            curso.curso,
                            curso.area,
                            curso.descricao,
                            universidade
                                ? universidade.nome
                                : "",
                            ...curso.tags
                        ]
                        .join(" ");


                    return normalizar(
                        texto
                    ).includes(
                        busca
                    );

                }
            );

    }


    /*
        Filtro universidade.
    */

    if (
        universidadeSelecionada !==
        "all"
    ) {

        cursos =
            cursos.filter(
                curso =>
                    curso.universidade ===
                    universidadeSelecionada
            );

    }


    /*
        Filtro área.
    */

    if (
        areaSelecionada !==
        "all"
    ) {

        cursos =
            cursos.filter(
                curso =>
                    normalizar(
                        curso.area
                    ) ===
                    areaSelecionada
            );

    }


    /*
        Ordenação:

        1. cursos cujo primeiro perfil
           é o perfil principal;
        2. nome.
    */

    cursos.sort(
        (a, b) => {

            const aPrincipal =
                a.perfis[0] ===
                perfilAtual
                    ? 0
                    : 1;

            const bPrincipal =
                b.perfis[0] ===
                perfilAtual
                    ? 0
                    : 1;


            if (
                aPrincipal !==
                bPrincipal
            ) {

                return (
                    aPrincipal -
                    bPrincipal
                );

            }


            return a.curso.localeCompare(
                b.curso,
                "pt-BR"
            );

        }
    );


    cursosFiltrados =
        cursos;


    if (elements.courseCount) {

        elements.courseCount.textContent =
            cursos.length;

    }


    elements.coursesGrid.innerHTML =
        "";


    if (cursos.length === 0) {

        elements.emptyState
            ?.classList
            .remove("hidden");

        return;

    }


    elements.emptyState
        ?.classList
        .add("hidden");


    cursos.forEach(
        curso => {

            elements.coursesGrid
                .appendChild(
                    criarCardCurso(
                        curso
                    )
                );

        }
    );

}


/* =========================================================
   CRIAR CARD DO CURSO
========================================================= */

function criarCardCurso(curso) {

    const universidade =
        encontrarUniversidade(
            curso.universidade
        );


    const card =
        document.createElement(
            "article"
        );

    card.className =
        "course-card";


    const imagem =
        curso.imagem ||
        IMAGENS.campus;


    const universidadeNome =
        universidade
            ? universidade.sigla
            : "Universidade";


    card.innerHTML = `

        <div class="course-image-wrapper">

            <img
                src="${imagem}"
                alt="Imagem ilustrativa relacionada ao curso ${escaparHTML(curso.curso)}"
                loading="lazy"
            >

            <div
                class="course-image-overlay"
            ></div>

            <span class="course-university">
                ${escaparHTML(universidadeNome)}
            </span>

        </div>


        <div class="course-card-body">

            <span class="course-area">
                ${escaparHTML(curso.area)}
            </span>

            <h3>
                ${escaparHTML(curso.curso)}
            </h3>

            <p class="course-description">
                ${escaparHTML(curso.descricao)}
            </p>

            <div class="course-tags">

                ${curso.tags
                    .map(
                        tag =>
                            `
                            <span class="course-tag">
                                ${escaparHTML(tag)}
                            </span>
                            `
                    )
                    .join("")}

            </div>


            <div class="course-card-actions">

                <button
                    type="button"
                    class="details-button"
                    data-course-id="${curso.id}"
                >
                    Ver detalhes
                </button>

                <button
                    type="button"
                    class="external-button"
                    data-university-id="${curso.universidade}"
                >
                    Site oficial ↗
                </button>

            </div>

        </div>
    `;


    const detailsButton =
        card.querySelector(
            ".details-button"
        );


    if (detailsButton) {

        detailsButton.addEventListener(
            "click",
            () => {

                abrirModalCurso(
                    curso.id
                );

            }
        );

    }


    const externalButton =
        card.querySelector(
            ".external-button"
        );


    if (externalButton) {

        externalButton.addEventListener(
            "click",
            () => {

                if (
                    universidade &&
                    universidade.site
                ) {

                    window.open(
                        universidade.site,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }

            }
        );

    }


    return card;

}


/* =========================================================
   RENDERIZAR UNIVERSIDADES
========================================================= */

function renderizarUniversidades() {

    if (!elements.universitiesGrid) {
        return;
    }


    elements.universitiesGrid.innerHTML =
        "";


    UNIVERSIDADES.forEach(
        universidade => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "university-card";


            card.innerHTML = `

                <div class="university-image">

                    <img
                        src="${universidade.imagem}"
                        alt="Imagem ilustrativa de ambiente universitário relacionado à ${escaparHTML(universidade.nome)}"
                        loading="lazy"
                    >

                </div>


                <div class="university-body">

                    <span class="university-type">
                        ${escaparHTML(universidade.tipo)}
                    </span>

                    <h3>
                        ${escaparHTML(universidade.sigla)}
                    </h3>

                    <p>
                        ${escaparHTML(universidade.descricao)}
                    </p>

                    <div class="university-location">
                        📍
                        ${escaparHTML(universidade.cidade)}
                    </div>

                    <a
                        class="university-link"
                        href="${universidade.site}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Conhecer instituição ↗
                    </a>

                </div>
            `;


            elements.universitiesGrid
                .appendChild(
                    card
                );

        }
    );

}


/* =========================================================
   MODAL DE CURSO
========================================================= */

function abrirModalCurso(courseId) {

    const curso =
        CURSOS.find(
            item =>
                item.id ===
                Number(courseId)
        );


    if (!curso) {
        return;
    }


    const universidade =
        encontrarUniversidade(
            curso.universidade
        );


    if (!universidade) {
        return;
    }


    if (elements.modalImage) {

        elements.modalImage.src =
            curso.imagem ||
            universidade.imagem;

        elements.modalImage.alt =
            `Imagem ilustrativa relacionada a ${curso.curso}`;

    }


    if (
        elements.modalUniversity
    ) {

        elements.modalUniversity.textContent =
            universidade.sigla;

    }


    if (elements.modalArea) {

        elements.modalArea.textContent =
            curso.area;

    }


    if (elements.modalTitle) {

        elements.modalTitle.textContent =
            curso.curso;

    }


    if (
        elements.modalDescription
    ) {

        elements.modalDescription
            .textContent =
            curso.descricao;

    }


    if (
        elements.modalInstitution
    ) {

        elements.modalInstitution
            .textContent =
            universidade.nome;

    }


    if (
        elements.modalLocation
    ) {

        elements.modalLocation
            .textContent =
            curso.local;

    }


    if (
        elements.modalModality
    ) {

        elements.modalModality
            .textContent =
            curso.modalidade;

    }


    if (
        elements.modalOfficialLink
    ) {

        elements.modalOfficialLink.href =
            universidade.site;

    }


    if (elements.courseModal) {

        elements.courseModal
            .classList
            .add("active");

        elements.courseModal
            .setAttribute(
                "aria-hidden",
                "false"
            );

        modalAberto =
            true;

        document.body.style.overflow =
            "hidden";

    }

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModal() {

    if (!elements.courseModal) {
        return;
    }


    elements.courseModal
        .classList
        .remove("active");


    elements.courseModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    modalAberto =
        false;


    document.body.style.overflow =
        "";

}


/* =========================================================
   LIMPAR FILTROS
========================================================= */

function limparFiltros() {

    if (elements.courseSearch) {

        elements.courseSearch.value =
            "";

    }


    if (
        elements.universityFilter
    ) {

        elements
            .universityFilter
            .value =
            "all";

    }


    if (elements.areaFilter) {

        elements.areaFilter.value =
            "all";

    }


    renderizarCursos();

}


/* =========================================================
   ENCONTRAR UNIVERSIDADE
========================================================= */

function encontrarUniversidade(id) {

    return UNIVERSIDADES.find(
        universidade =>
            universidade.id ===
            id
    );

}


/* =========================================================
   NORMALIZAR TEXTO
========================================================= */

function normalizar(valor) {

    return String(valor || "")
        .normalize(
            "NFD"
        )
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();

}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escaparHTML(valor) {

    return String(valor || "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   EXPOR DADOS PARA DEBUG
=========================================================

   Útil durante o desenvolvimento.

   No console do navegador você pode usar:

       window.meuFuturoPossibilidades

========================================================= */

window.meuFuturoPossibilidades = {

    resultado: () =>
        resultado,

    perfil: () =>
        perfilAtual,

    cursos: () =>
        cursosFiltrados,

    universidades:
        UNIVERSIDADES

};