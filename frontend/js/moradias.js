document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // CONFIGURAÇÕES
    // =========================================================

    const STORAGE_CIDADE = "cidadeMoradiaMeuFuturo";
    const STORAGE_FAVORITOS = "moradiasFavoritasMeuFuturo";
    const STORAGE_MORADIA = "moradiaSelecionadaMeuFuturo";


    // =========================================================
    // CIDADES
    // =========================================================

    const cidades = {

        "Goiânia, GO": {
            estado: "GO",
            descricao: "Capital de Goiás",
            emoji: "🌴",
            referenciaM2: 41.60
        },

        "São Paulo, SP": {
            estado: "SP",
            descricao: "Capital de São Paulo",
            emoji: "🏙️",
            referenciaM2: 62.96
        },

        "Brasília, DF": {
            estado: "DF",
            descricao: "Distrito Federal",
            emoji: "🏛️",
            referenciaM2: 51.16
        },

        "Curitiba, PR": {
            estado: "PR",
            descricao: "Capital do Paraná",
            emoji: "🌳",
            referenciaM2: 46.82
        },

        "Belo Horizonte, MG": {
            estado: "MG",
            descricao: "Capital de Minas Gerais",
            emoji: "⛰️",
            referenciaM2: 48.18
        },

        "Uberlândia, MG": {
            estado: "MG",
            descricao: "Triângulo Mineiro",
            emoji: "🌆",
            referenciaM2: 30.00
        }

    };


    // =========================================================
    // IMAGENS DE REFERÊNCIA
    // =========================================================
    //
    // IMPORTANTE:
    // Estas imagens são referências visuais.
    // Elas não representam necessariamente o imóvel específico
    // descrito no cadastro.
    //
    // Você poderá posteriormente substituir pelas fotos reais
    // dos imóveis cadastrados.
    // =========================================================

    const imagensMoradias = [

        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",

        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",

        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=85",

        "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=85",

        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",

        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",

        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",

        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"

    ];


    // =========================================================
    // MORADIAS
    // =========================================================

    const moradiasPorCidade = {

        "Goiânia, GO": [

            {
                id: 1,
                tipo: "Apartamento",
                titulo: "Apartamento compacto universitário",
                regiao: "Setor Universitário",
                preco: 1450,
                condominio: 320,
                iptu: 65,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 35,
                mobiliado: true,
                distancia: "800 m de referência",
                transporte: "Ônibus próximo",
                comercio: "Mercados, farmácias e restaurantes",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: true,
                destaque: "Ideal para estudantes",
                imagem: imagensMoradias[0],
                emoji: "🏢",
                tag: "Universitário"
            },

            {
                id: 2,
                tipo: "República",
                titulo: "República estudantil compartilhada",
                regiao: "Setor Leste Universitário",
                preco: 750,
                condominio: 0,
                iptu: 0,
                internet: 60,
                quartos: 1,
                banheiros: 2,
                area: 70,
                mobiliado: true,
                distancia: "600 m de referência",
                transporte: "Várias linhas de ônibus",
                comercio: "Mercados e restaurantes próximos",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Custo compartilhado",
                imagem: imagensMoradias[1],
                emoji: "🏠",
                tag: "Econômica"
            },

            {
                id: 3,
                tipo: "Kitnet",
                titulo: "Kitnet compacta no centro",
                regiao: "Centro",
                preco: 950,
                condominio: 180,
                iptu: 45,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 28,
                mobiliado: false,
                distancia: "1,8 km de referência",
                transporte: "Terminal e ônibus",
                comercio: "Comércio intenso",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Prática para uma pessoa",
                imagem: imagensMoradias[2],
                emoji: "🏘️",
                tag: "Prática"
            },

            {
                id: 4,
                tipo: "Apartamento",
                titulo: "Apartamento de dois quartos",
                regiao: "Setor Bueno",
                preco: 2100,
                condominio: 480,
                iptu: 90,
                internet: 110,
                quartos: 2,
                banheiros: 2,
                area: 67,
                mobiliado: true,
                distancia: "2,1 km de referência",
                transporte: "Ônibus e aplicativos",
                comercio: "Excelente estrutura comercial",
                seguranca: "Consultar condições da região",
                vaga: true,
                pet: true,
                destaque: "Mais espaço",
                imagem: imagensMoradias[3],
                emoji: "🏙️",
                tag: "Confortável"
            },

            {
                id: 5,
                tipo: "Casa",
                titulo: "Casa pequena para estudantes",
                regiao: "Setor Pedro Ludovico",
                preco: 1750,
                condominio: 0,
                iptu: 80,
                internet: 100,
                quartos: 2,
                banheiros: 1,
                area: 75,
                mobiliado: false,
                distancia: "2,5 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Comércio local",
                seguranca: "Consultar condições da região",
                vaga: true,
                pet: true,
                destaque: "Possibilidade de dividir",
                imagem: imagensMoradias[4],
                emoji: "🏡",
                tag: "Casa"
            },

            {
                id: 6,
                tipo: "Studio",
                titulo: "Studio moderno mobiliado",
                regiao: "Setor Oeste",
                preco: 1850,
                condominio: 360,
                iptu: 70,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 34,
                mobiliado: true,
                distancia: "2 km de referência",
                transporte: "Várias linhas",
                comercio: "Restaurantes e serviços",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Compacto e moderno",
                imagem: imagensMoradias[5],
                emoji: "🏢",
                tag: "Moderno"
            },

            {
                id: 7,
                tipo: "República",
                titulo: "República com área de estudos",
                regiao: "Campinas",
                preco: 820,
                condominio: 0,
                iptu: 0,
                internet: 60,
                quartos: 1,
                banheiros: 2,
                area: 85,
                mobiliado: true,
                distancia: "3 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Boa estrutura comercial",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Ambiente estudantil",
                imagem: imagensMoradias[6],
                emoji: "🏠",
                tag: "Estudantes"
            },

            {
                id: 8,
                tipo: "Apartamento",
                titulo: "Apartamento próximo ao transporte",
                regiao: "Centro",
                preco: 1250,
                condominio: 280,
                iptu: 55,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 42,
                mobiliado: false,
                distancia: "1,5 km de referência",
                transporte: "Terminal próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: true,
                destaque: "Boa mobilidade",
                imagem: imagensMoradias[0],
                emoji: "🏢",
                tag: "Transporte"
            },

            {
                id: 9,
                tipo: "Casa",
                titulo: "Casa compartilhada",
                regiao: "Jardim América",
                preco: 1500,
                condominio: 0,
                iptu: 75,
                internet: 100,
                quartos: 3,
                banheiros: 2,
                area: 100,
                mobiliado: true,
                distancia: "3,2 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Mercados e serviços",
                seguranca: "Consultar condições da região",
                vaga: true,
                pet: true,
                destaque: "Boa para dividir",
                imagem: imagensMoradias[4],
                emoji: "🏡",
                tag: "Compartilhada"
            },

            {
                id: 10,
                tipo: "Kitnet",
                titulo: "Kitnet econômica",
                regiao: "Vila Nova",
                preco: 850,
                condominio: 150,
                iptu: 40,
                internet: 90,
                quartos: 1,
                banheiros: 1,
                area: 27,
                mobiliado: false,
                distancia: "2,8 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Comércio local",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Menor espaço",
                imagem: imagensMoradias[2],
                emoji: "🏘️",
                tag: "Econômica"
            },

            {
                id: 11,
                tipo: "Apartamento",
                titulo: "Apartamento novo com varanda",
                regiao: "Jardim Goiás",
                preco: 2600,
                condominio: 550,
                iptu: 110,
                internet: 110,
                quartos: 2,
                banheiros: 2,
                area: 72,
                mobiliado: true,
                distancia: "3 km de referência",
                transporte: "Ônibus e aplicativos",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: true,
                pet: true,
                destaque: "Maior conforto",
                imagem: imagensMoradias[7],
                emoji: "🏙️",
                tag: "Premium"
            },

            {
                id: 12,
                tipo: "República",
                titulo: "República econômica central",
                regiao: "Setor Central",
                preco: 650,
                condominio: 0,
                iptu: 0,
                internet: 60,
                quartos: 1,
                banheiros: 2,
                area: 90,
                mobiliado: true,
                distancia: "2 km de referência",
                transporte: "Terminal próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Divisão de despesas",
                imagem: imagensMoradias[1],
                emoji: "🏠",
                tag: "Super econômica"
            }

        ],


        // =====================================================
        // SÃO PAULO
        // =====================================================

        "São Paulo, SP": [

            {
                id: 101,
                tipo: "Kitnet",
                titulo: "Kitnet próxima ao metrô",
                regiao: "Vila Mariana",
                preco: 1800,
                condominio: 400,
                iptu: 80,
                internet: 110,
                quartos: 1,
                banheiros: 1,
                area: 28,
                mobiliado: true,
                distancia: "700 m do metrô",
                transporte: "Metrô e ônibus",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Mobilidade",
                imagem: imagensMoradias[2],
                emoji: "🏢",
                tag: "Metrô"
            },

            {
                id: 102,
                tipo: "Apartamento",
                titulo: "Apartamento compacto",
                regiao: "Tatuapé",
                preco: 2300,
                condominio: 500,
                iptu: 100,
                internet: 110,
                quartos: 1,
                banheiros: 1,
                area: 40,
                mobiliado: true,
                distancia: "1 km do metrô",
                transporte: "Metrô e ônibus",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: true,
                destaque: "Boa localização",
                imagem: imagensMoradias[0],
                emoji: "🏙️",
                tag: "Prático"
            },

            {
                id: 103,
                tipo: "República",
                titulo: "República para universitários",
                regiao: "Butantã",
                preco: 1200,
                condominio: 0,
                iptu: 0,
                internet: 70,
                quartos: 1,
                banheiros: 2,
                area: 80,
                mobiliado: true,
                distancia: "900 m da referência",
                transporte: "Metrô e ônibus",
                comercio: "Boa",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Compartilhada",
                imagem: imagensMoradias[1],
                emoji: "🏠",
                tag: "Universitária"
            },

            {
                id: 104,
                tipo: "Studio",
                titulo: "Studio compacto perto do metrô",
                regiao: "Paraíso",
                preco: 2400,
                condominio: 450,
                iptu: 90,
                internet: 110,
                quartos: 1,
                banheiros: 1,
                area: 30,
                mobiliado: true,
                distancia: "500 m do metrô",
                transporte: "Metrô",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Mobilidade urbana",
                imagem: imagensMoradias[5],
                emoji: "🏢",
                tag: "Mobilidade"
            }

        ],


        // =====================================================
        // BRASÍLIA
        // =====================================================

        "Brasília, DF": [

            {
                id: 201,
                tipo: "Apartamento",
                titulo: "Apartamento compacto universitário",
                regiao: "Asa Norte",
                preco: 2200,
                condominio: 480,
                iptu: 90,
                internet: 110,
                quartos: 1,
                banheiros: 1,
                area: 45,
                mobiliado: true,
                distancia: "1 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: true,
                destaque: "Boa localização",
                imagem: imagensMoradias[0],
                emoji: "🏢",
                tag: "Universitário"
            },

            {
                id: 202,
                tipo: "Kitnet",
                titulo: "Kitnet econômica",
                regiao: "Asa Sul",
                preco: 1700,
                condominio: 350,
                iptu: 75,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 30,
                mobiliado: false,
                distancia: "1,5 km de referência",
                transporte: "Ônibus e metrô",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Compacta",
                imagem: imagensMoradias[2],
                emoji: "🏘️",
                tag: "Econômica"
            },

            {
                id: 203,
                tipo: "República",
                titulo: "República estudantil",
                regiao: "Plano Piloto",
                preco: 1100,
                condominio: 0,
                iptu: 0,
                internet: 70,
                quartos: 1,
                banheiros: 2,
                area: 75,
                mobiliado: true,
                distancia: "1,2 km de referência",
                transporte: "Ônibus e metrô",
                comercio: "Boa",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Divisão de custos",
                imagem: imagensMoradias[1],
                emoji: "🏠",
                tag: "Estudantes"
            }

        ],


        // =====================================================
        // CURITIBA
        // =====================================================

        "Curitiba, PR": [

            {
                id: 301,
                tipo: "Apartamento",
                titulo: "Apartamento perto da universidade",
                regiao: "Centro",
                preco: 1700,
                condominio: 380,
                iptu: 70,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 40,
                mobiliado: true,
                distancia: "1 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: true,
                destaque: "Estudantil",
                imagem: imagensMoradias[0],
                emoji: "🏢",
                tag: "Estudantes"
            },

            {
                id: 302,
                tipo: "República",
                titulo: "República compartilhada",
                regiao: "Rebouças",
                preco: 950,
                condominio: 0,
                iptu: 0,
                internet: 70,
                quartos: 1,
                banheiros: 2,
                area: 75,
                mobiliado: true,
                distancia: "1,4 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Boa",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Econômica",
                imagem: imagensMoradias[1],
                emoji: "🏠",
                tag: "Econômica"
            },

            {
                id: 303,
                tipo: "Kitnet",
                titulo: "Kitnet compacta",
                regiao: "Centro",
                preco: 1250,
                condominio: 250,
                iptu: 55,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 30,
                mobiliado: false,
                distancia: "1,8 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Compacta",
                imagem: imagensMoradias[2],
                emoji: "🏘️",
                tag: "Prática"
            }

        ],


        // =====================================================
        // BELO HORIZONTE
        // =====================================================

        "Belo Horizonte, MG": [

            {
                id: 401,
                tipo: "Apartamento",
                titulo: "Apartamento estudantil",
                regiao: "Pampulha",
                preco: 1450,
                condominio: 300,
                iptu: 60,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 42,
                mobiliado: true,
                distancia: "900 m de referência",
                transporte: "Ônibus próximo",
                comercio: "Boa",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: true,
                destaque: "Universitário",
                imagem: imagensMoradias[0],
                emoji: "🏢",
                tag: "Universitário"
            },

            {
                id: 402,
                tipo: "Kitnet",
                titulo: "Kitnet perto da faculdade",
                regiao: "Centro",
                preco: 1050,
                condominio: 180,
                iptu: 45,
                internet: 90,
                quartos: 1,
                banheiros: 1,
                area: 29,
                mobiliado: false,
                distancia: "1,2 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Prática",
                imagem: imagensMoradias[2],
                emoji: "🏘️",
                tag: "Prática"
            },

            {
                id: 403,
                tipo: "República",
                titulo: "República universitária",
                regiao: "São Pedro",
                preco: 850,
                condominio: 0,
                iptu: 0,
                internet: 70,
                quartos: 1,
                banheiros: 2,
                area: 80,
                mobiliado: true,
                distancia: "1,5 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Boa",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Compartilhada",
                imagem: imagensMoradias[1],
                emoji: "🏠",
                tag: "Econômica"
            }

        ],


        // =====================================================
        // UBERLÂNDIA
        // =====================================================

        "Uberlândia, MG": [

            {
                id: 501,
                tipo: "Apartamento",
                titulo: "Apartamento universitário",
                regiao: "Santa Mônica",
                preco: 1350,
                condominio: 280,
                iptu: 50,
                internet: 100,
                quartos: 1,
                banheiros: 1,
                area: 43,
                mobiliado: true,
                distancia: "800 m de referência",
                transporte: "Ônibus próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: true,
                destaque: "Universitário",
                imagem: imagensMoradias[0],
                emoji: "🏢",
                tag: "Universitário"
            },

            {
                id: 502,
                tipo: "República",
                titulo: "República para estudantes",
                regiao: "Tibery",
                preco: 750,
                condominio: 0,
                iptu: 0,
                internet: 60,
                quartos: 1,
                banheiros: 2,
                area: 80,
                mobiliado: true,
                distancia: "1,5 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Boa",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Econômica",
                imagem: imagensMoradias[1],
                emoji: "🏠",
                tag: "Econômica"
            },

            {
                id: 503,
                tipo: "Kitnet",
                titulo: "Kitnet para uma pessoa",
                regiao: "Centro",
                preco: 900,
                condominio: 180,
                iptu: 40,
                internet: 90,
                quartos: 1,
                banheiros: 1,
                area: 28,
                mobiliado: false,
                distancia: "2 km de referência",
                transporte: "Ônibus próximo",
                comercio: "Excelente",
                seguranca: "Consultar condições da região",
                vaga: false,
                pet: false,
                destaque: "Compacta",
                imagem: imagensMoradias[2],
                emoji: "🏘️",
                tag: "Prática"
            }

        ]

    };


    // =========================================================
    // ELEMENTOS
    // =========================================================

    const cidadeSelecionada =
        document.getElementById("cidadeSelecionada");

    const cidadeResumo =
        document.getElementById("cidadeResumo");

    const listaMoradias =
        document.getElementById("listaMoradias");

    const contadorMoradias =
        document.getElementById("contadorMoradias");

    const semResultados =
        document.getElementById("semResultados");

    const totalMoradias =
        document.getElementById("totalMoradias");

    const menorPreco =
        document.getElementById("menorPreco");

    const totalFavoritos =
        document.getElementById("totalFavoritos");

    const buscaMoradia =
        document.getElementById("buscaMoradia");

    const filtroTipo =
        document.getElementById("filtroTipo");

    const filtroPreco =
        document.getElementById("filtroPreco");

    const filtroQuartos =
        document.getElementById("filtroQuartos");

    const filtroMobilia =
        document.getElementById("filtroMobilia");

    const modalCidade =
        document.getElementById("modalCidade");

    const modalMoradia =
        document.getElementById("modalMoradia");

    const listaCidades =
        document.getElementById("listaCidades");

    const detalhesMoradia =
        document.getElementById("detalhesMoradia");


    // =========================================================
    // ESTADO
    // =========================================================

    let cidadeAtual =
        localStorage.getItem(STORAGE_CIDADE) ||
        "Goiânia, GO";

    let favoritos = [];

    try {

        favoritos = JSON.parse(
            localStorage.getItem(STORAGE_FAVORITOS) || "[]"
        );

        if (!Array.isArray(favoritos)) {
            favoritos = [];
        }

    } catch {

        favoritos = [];

    }


    // =========================================================
    // UTILITÁRIOS
    // =========================================================

    function moeda(valor) {

        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0
        });

    }


    function escaparHTML(texto) {

        return String(texto ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function custoMensal(moradia) {

        return (
            Number(moradia.preco || 0) +
            Number(moradia.condominio || 0) +
            Number(moradia.iptu || 0) +
            Number(moradia.internet || 0)
        );

    }


    // =========================================================
    // SELECIONAR MORADIA PARA A PÁGINA DE CUSTOS
    // =========================================================

    function selecionarMoradiaParaCustos(moradia) {

        localStorage.setItem(
            STORAGE_MORADIA,
            JSON.stringify(moradia)
        );

        window.location.href = "custos.html";

    }


    window.selecionarMoradiaParaCustos =
        selecionarMoradiaParaCustos;


    // =========================================================
    // CIDADE
    // =========================================================

    function atualizarCidade() {

        const dados = cidades[cidadeAtual];

        if (!dados) {

            cidadeAtual = "Goiânia, GO";

            localStorage.setItem(
                STORAGE_CIDADE,
                cidadeAtual
            );

        }

        cidadeSelecionada.textContent =
            cidadeAtual;

        const cidade =
            cidades[cidadeAtual];

        cidadeResumo.textContent =
            cidade
                ? cidade.estado
                : "GO";

    }


    // =========================================================
    // MODAL CIDADES
    // =========================================================

    function abrirModalCidade() {

        listaCidades.innerHTML = "";

        Object.entries(cidades).forEach(
            ([cidade, dados]) => {

                const botao =
                    document.createElement("button");

                botao.type = "button";

                botao.className =
                    "cidade-opcao";

                botao.innerHTML = `

                    <strong>
                        ${escaparHTML(dados.emoji)}
                        ${escaparHTML(cidade)}
                    </strong>

                    <span>
                        ${escaparHTML(dados.descricao)}
                    </span>

                    <small>
                        Referência:
                        ${moeda(dados.referenciaM2)}/m²
                    </small>

                `;

                botao.addEventListener(
                    "click",
                    () => {

                        cidadeAtual =
                            cidade;

                        localStorage.setItem(
                            STORAGE_CIDADE,
                            cidadeAtual
                        );

                        fecharModalCidade();

                        atualizarCidade();

                        limparFiltros(false);

                        renderizar();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }
                );

                listaCidades.appendChild(
                    botao
                );

            }
        );

        modalCidade.classList.add(
            "ativo"
        );

    }


    function fecharModalCidade() {

        modalCidade.classList.remove(
            "ativo"
        );

    }


    // =========================================================
    // CARD
    // =========================================================

    function criarCard(moradia, indice) {

        const favoritoAtivo =
            favoritos.includes(
                moradia.id
            );

        const custoTotal =
            custoMensal(moradia);

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "moradia";

        card.style.animationDelay =
            `${indice * 0.06}s`;

        card.innerHTML = `

            <div class="moradia-topo">

                <span class="tag">
                    ${escaparHTML(moradia.tag)}
                </span>

                <button
                    type="button"
                    class="favorito ${favoritoAtivo ? "ativo" : ""}"
                    data-id="${moradia.id}"
                    title="Favoritar moradia"
                    aria-label="Favoritar moradia"
                >
                    ${favoritoAtivo ? "♥" : "♡"}
                </button>

                <div class="moradia-imagem">

                    <img
                        src="${escaparHTML(moradia.imagem || imagensMoradias[0])}"
                        alt="Imagem de referência de ${escaparHTML(moradia.tipo)}"
                        loading="lazy"
                        onerror="this.src='${imagensMoradias[0]}'"
                    >

                </div>

            </div>


            <div class="moradia-corpo">

                <div class="moradia-tipo">
                    ${escaparHTML(moradia.tipo)}
                </div>

                <div class="moradia-titulo">
                    ${escaparHTML(moradia.titulo)}
                </div>

                <div class="moradia-regiao">
                    📍 ${escaparHTML(moradia.regiao)}
                </div>

                <div class="preco">
                    ${moeda(moradia.preco)}
                    <span>/ mês</span>
                </div>


                <div class="detalhes">

                    <span class="detalhe">
                        🛏️ ${moradia.quartos}
                        ${moradia.quartos > 1
                            ? "quartos"
                            : "quarto"}
                    </span>

                    <span class="detalhe">
                        📐 ${moradia.area} m²
                    </span>

                    <span class="detalhe">
                        🛋️
                        ${moradia.mobiliado
                            ? "Mobiliado"
                            : "Sem mobília"}
                    </span>

                    <span class="detalhe">
                        🚿 ${moradia.banheiros}
                        ${moradia.banheiros > 1
                            ? "banheiros"
                            : "banheiro"}
                    </span>

                </div>


                <div class="custo-estimado">

                    <span>
                        💰 Estimativa mensal da moradia
                    </span>

                    <strong>
                        ${moeda(custoTotal)}
                    </strong>

                </div>


                <div class="moradia-acoes">

                    <button
                        type="button"
                        class="btn-detalhes"
                        data-detalhes="${moradia.id}"
                    >
                        Ver detalhes
                    </button>

                    <button
                        type="button"
                        class="btn-custos"
                        data-custos="${moradia.id}"
                    >
                        💰 Calcular custo completo
                    </button>

                    <button
                        type="button"
                        class="btn-mapa"
                        title="Ver informações de localização"
                        data-mapa="${moradia.id}"
                    >
                        📍 Localização
                    </button>

                </div>

            </div>

        `;


        // =====================================================
        // FAVORITO
        // =====================================================

        card
            .querySelector(".favorito")
            .addEventListener(
                "click",
                () => {

                    alternarFavorito(
                        moradia.id
                    );

                }
            );


        // =====================================================
        // DETALHES
        // =====================================================

        card
            .querySelector("[data-detalhes]")
            .addEventListener(
                "click",
                () => {

                    abrirDetalhes(
                        moradia
                    );

                }
            );


        // =====================================================
        // CUSTOS
        // =====================================================

        card
            .querySelector("[data-custos]")
            .addEventListener(
                "click",
                () => {

                    selecionarMoradiaParaCustos(
                        moradia
                    );

                }
            );


        // =====================================================
        // LOCALIZAÇÃO
        // =====================================================

        card
            .querySelector("[data-mapa]")
            .addEventListener(
                "click",
                () => {

                    abrirLocalizacao(
                        moradia
                    );

                }
            );


        return card;

    }


    // =========================================================
    // LOCALIZAÇÃO
    // =========================================================

    function abrirLocalizacao(moradia) {

        detalhesMoradia.innerHTML = `

            <div class="detalhes-hero">

                <div class="emoji">
                    📍
                </div>

                <h3>
                    ${escaparHTML(moradia.regiao)}
                </h3>

                <p>
                    ${escaparHTML(cidadeAtual)}
                </p>

            </div>


            <div class="grade-detalhes">

                <div class="info-detalhe">

                    <small>
                        Transporte
                    </small>

                    <strong>
                        ${escaparHTML(moradia.transporte)}
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Distância de referência
                    </small>

                    <strong>
                        ${escaparHTML(moradia.distancia)}
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Comércio e serviços
                    </small>

                    <strong>
                        ${escaparHTML(moradia.comercio)}
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Segurança
                    </small>

                    <strong>
                        ${escaparHTML(moradia.seguranca)}
                    </strong>

                </div>

            </div>


            <div class="aviso-informacao">

                <strong>
                    📌 Atenção
                </strong>

                <p>
                    A localização apresentada é uma referência
                    de região. Antes de alugar, confira o endereço,
                    transporte, infraestrutura e condições reais
                    do imóvel.
                </p>

            </div>

        `;

        modalMoradia.classList.add(
            "ativo"
        );

    }


    // =========================================================
    // RENDERIZAÇÃO
    // =========================================================

    function renderizar() {

        const moradias =
            moradiasPorCidade[
                cidadeAtual
            ] || [];

        atualizarCidade();

        aplicarFiltros(
            moradias
        );

        atualizarEstatisticas(
            moradias
        );

    }


    // =========================================================
    // FILTROS
    // =========================================================

    function aplicarFiltros(
        moradias
    ) {

        const busca =
            buscaMoradia.value
                .trim()
                .toLowerCase();

        const tipo =
            filtroTipo.value;

        const precoMax =
            Number(
                filtroPreco.value || 0
            );

        const quartosMin =
            Number(
                filtroQuartos.value || 0
            );

        const mobilia =
            filtroMobilia.value;


        const filtradas =
            moradias.filter(
                moradia => {

                    const texto = `

                        ${moradia.titulo}
                        ${moradia.regiao}
                        ${moradia.tipo}
                        ${moradia.destaque}
                        ${moradia.transporte}
                        ${moradia.comercio}

                    `.toLowerCase();


                    const passouBusca =
                        !busca ||
                        texto.includes(
                            busca
                        );


                    const passouTipo =
                        !tipo ||
                        moradia.tipo === tipo;


                    const passouPreco =
                        !precoMax ||
                        moradia.preco <=
                        precoMax;


                    const passouQuartos =
                        !quartosMin ||
                        moradia.quartos >=
                        quartosMin;


                    const passouMobilia =
                        !mobilia ||
                        (
                            mobilia === "sim" &&
                            moradia.mobiliado
                        ) ||
                        (
                            mobilia === "nao" &&
                            !moradia.mobiliado
                        );


                    return (
                        passouBusca &&
                        passouTipo &&
                        passouPreco &&
                        passouQuartos &&
                        passouMobilia
                    );

                }
            );


        listaMoradias.innerHTML =
            "";


        contadorMoradias.textContent =
            `${filtradas.length} ${
                filtradas.length === 1
                    ? "opção"
                    : "opções"
            }`;


        if (!filtradas.length) {

            semResultados.classList.add(
                "ativo"
            );

        } else {

            semResultados.classList.remove(
                "ativo"
            );

            filtradas.forEach(
                (
                    moradia,
                    indice
                ) => {

                    listaMoradias.appendChild(
                        criarCard(
                            moradia,
                            indice
                        )
                    );

                }
            );

        }

    }


    // =========================================================
    // ESTATÍSTICAS
    // =========================================================

    function atualizarEstatisticas(
        moradias
    ) {

        totalMoradias.textContent =
            moradias.length;


        if (moradias.length) {

            const menor =
                Math.min(
                    ...moradias.map(
                        moradia =>
                            moradia.preco
                    )
                );

            menorPreco.textContent =
                moeda(menor);

        } else {

            menorPreco.textContent =
                "R$ 0";

        }


        atualizarFavoritos();

    }


    // =========================================================
    // FAVORITOS
    // =========================================================

    function atualizarFavoritos() {

        totalFavoritos.textContent =
            favoritos.length;

        localStorage.setItem(
            STORAGE_FAVORITOS,
            JSON.stringify(
                favoritos
            )
        );

    }


    function alternarFavorito(id) {

        if (
            favoritos.includes(id)
        ) {

            favoritos =
                favoritos.filter(
                    favorito =>
                        favorito !== id
                );

        } else {

            favoritos.push(id);

        }

        atualizarFavoritos();

        renderizar();

    }


    // =========================================================
    // MODAL DE DETALHES
    // =========================================================

    function abrirDetalhes(
        moradia
    ) {

        const custo =
            custoMensal(
                moradia
            );


        const aluguel =
            Number(
                moradia.preco || 0
            );

        const condominio =
            Number(
                moradia.condominio || 0
            );

        const iptu =
            Number(
                moradia.iptu || 0
            );

        const internet =
            Number(
                moradia.internet || 0
            );


        detalhesMoradia.innerHTML = `

            <div class="detalhes-imagem">

                <img
                    src="${escaparHTML(moradia.imagem || imagensMoradias[0])}"
                    alt="Imagem de referência"
                    onerror="this.src='${imagensMoradias[0]}'"
                >

            </div>


            <div class="detalhes-hero">

                <div class="emoji">
                    ${escaparHTML(moradia.emoji)}
                </div>

                <div class="moradia-tipo">
                    ${escaparHTML(moradia.tipo)}
                </div>

                <h3>
                    ${escaparHTML(moradia.titulo)}
                </h3>

                <p>
                    📍 ${escaparHTML(moradia.regiao)},
                    ${escaparHTML(cidadeAtual)}
                </p>

            </div>


            <div class="custo-detalhado">

                <div class="custo-titulo">
                    💰 Estimativa mensal da moradia
                </div>

                <div class="custo-total">
                    ${moeda(custo)}
                </div>

                <div class="custo-observacao">

                    Inclui aluguel, condomínio,
                    IPTU e internet quando informados.

                </div>

            </div>


            <div class="grade-detalhes">

                <div class="info-detalhe">

                    <small>
                        Aluguel
                    </small>

                    <strong>
                        ${moeda(aluguel)}
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Condomínio
                    </small>

                    <strong>
                        ${
                            condominio
                                ? moeda(condominio)
                                : "Não informado"
                        }
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        IPTU
                    </small>

                    <strong>
                        ${
                            iptu
                                ? moeda(iptu)
                                : "Não informado"
                        }
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Internet estimada
                    </small>

                    <strong>
                        ${
                            internet
                                ? moeda(internet)
                                : "Não informado"
                        }
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Quartos
                    </small>

                    <strong>
                        ${moradia.quartos}
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Banheiros
                    </small>

                    <strong>
                        ${moradia.banheiros}
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Área
                    </small>

                    <strong>
                        ${moradia.area} m²
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Mobília
                    </small>

                    <strong>
                        ${
                            moradia.mobiliado
                                ? "Mobiliado"
                                : "Sem mobília"
                        }
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Vaga
                    </small>

                    <strong>
                        ${
                            moradia.vaga
                                ? "Possui"
                                : "Não informada"
                        }
                    </strong>

                </div>


                <div class="info-detalhe">

                    <small>
                        Aceita pets
                    </small>

                    <strong>
                        ${
                            moradia.pet
                                ? "Possibilidade"
                                : "Não informado"
                        }
                    </strong>

                </div>

            </div>


            <div class="informacoes-extra">

                <div>

                    <span>
                        🚍 Transporte
                    </span>

                    <strong>
                        ${escaparHTML(
                            moradia.transporte
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        🛒 Comércio
                    </span>

                    <strong>
                        ${escaparHTML(
                            moradia.comercio
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        📍 Distância
                    </span>

                    <strong>
                        ${escaparHTML(
                            moradia.distancia
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        ✨ Destaque
                    </span>

                    <strong>
                        ${escaparHTML(
                            moradia.destaque
                        )}
                    </strong>

                </div>

            </div>


            <button
                type="button"
                class="btn-custos-modal"
                onclick="selecionarMoradiaParaCustosPorId(${moradia.id})"
            >
                💰 Calcular custo completo desta moradia
                <span>→</span>
            </button>


            <div class="aviso-informacao">

                <strong>
                    ⚠️ Sobre os valores
                </strong>

                <p>

                    Os valores exibidos são referências para
                    planejamento financeiro. O preço real pode
                    variar conforme imóvel, bairro, tamanho,
                    conservação, contrato, condomínio, IPTU
                    e outras condições.

                </p>

            </div>

        `;


        modalMoradia.classList.add(
            "ativo"
        );

    }


    // =========================================================
    // SELECIONAR PELO ID
    // =========================================================

    function selecionarMoradiaParaCustosPorId(
        id
    ) {

        const moradias =
            moradiasPorCidade[
                cidadeAtual
            ] || [];

        const moradia =
            moradias.find(
                item =>
                    item.id === id
            );

        if (!moradia) {
            return;
        }

        selecionarMoradiaParaCustos(
            moradia
        );

    }


    window.selecionarMoradiaParaCustosPorId =
        selecionarMoradiaParaCustosPorId;


    function fecharModalMoradia() {

        modalMoradia.classList.remove(
            "ativo"
        );

    }


    // =========================================================
    // LIMPAR FILTROS
    // =========================================================

    function limparFiltros(
        renderizarAgora = true
    ) {

        buscaMoradia.value = "";

        filtroTipo.value = "";

        filtroPreco.value = "";

        filtroQuartos.value = "";

        filtroMobilia.value = "";


        if (renderizarAgora) {
            renderizar();
        }

    }


    // =========================================================
    // EVENTOS
    // =========================================================

    document
        .getElementById(
            "btnAlterarCidade"
        )
        .addEventListener(
            "click",
            abrirModalCidade
        );


    document
        .getElementById(
            "btnLimpar"
        )
        .addEventListener(
            "click",
            () => limparFiltros()
        );


    buscaMoradia.addEventListener(
        "input",
        renderizar
    );


    filtroTipo.addEventListener(
        "change",
        renderizar
    );


    filtroPreco.addEventListener(
        "change",
        renderizar
    );


    filtroQuartos.addEventListener(
        "change",
        renderizar
    );


    filtroMobilia.addEventListener(
        "change",
        renderizar
    );


    // =========================================================
    // FECHAR MODAIS
    // =========================================================

    modalCidade.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modalCidade
            ) {

                fecharModalCidade();

            }

        }
    );


    modalMoradia.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modalMoradia
            ) {

                fecharModalMoradia();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                fecharModalCidade();

                fecharModalMoradia();

            }

        }
    );


    // =========================================================
    // DASHBOARD
    // =========================================================

    window.voltarDashboard =
        function () {

            window.location.href =
                "dashboard.html";

        };


    // =========================================================
    // FUNÇÕES GLOBAIS
    // =========================================================

    window.fecharModalCidade =
        fecharModalCidade;

    window.fecharModalMoradia =
        fecharModalMoradia;


    // =========================================================
    // INICIALIZAÇÃO
    // =========================================================

    atualizarCidade();

    atualizarFavoritos();

    renderizar();


    console.log(
        "✅ Moradias Meu Futuro carregado."
    );

});