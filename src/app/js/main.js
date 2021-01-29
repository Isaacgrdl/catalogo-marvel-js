function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.response
}

function listaDados(url) {
    let data = fazGet(url);
    let catalogo = JSON.parse(data);
    return catalogoData = catalogo['data'];
}

function criaCard(personagem) {
    coluna = document.createElement("div");
    coluna.setAttribute("class", "col");

    card = document.createElement("div");
    card.setAttribute('class', "card");

    cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    pNome = document.createElement("p");
    pNome.setAttribute("class", "card-text");
    pNome.innerHTML = personagem.name;

    imagem = document.createElement("img");
    imagem.setAttribute('src', personagem.thumbnail['path'] + ".jpg");
    imagem.setAttribute('class', "card-img-top");
    imagem.setAttribute("height", "216px");
    
    coluna.appendChild(card);
    card.appendChild(imagem);
    card.appendChild(cardBody);
    cardBody.appendChild(pNome);

    return card;
}

function next(state) {
    state.pagina++

    if(state.pagina > state.totalPaginas) {
        state.pagina--
    }
}

function prev(state) {
    state.pagina--

    if(state.pagina < 1) {
        state.pagina++
    }
}

function goTo(state, pagina) {
    if (pagina < 1){
        state.pagina = 1;
    }

    state.pagina = pagina;

    if (pagina > state.totalPaginas){
        state.pagina = state.totalPaginas
    }
}

function criarPagina(element) {
    let lista = document.createElement("li");
    lista.setAttribute("class", "page-item");

    link = document.createElement("a");
    link.innerHTML = element.index;
    link.setAttribute("href", `#${element.index}`);
    link.setAttribute("class", "page-link");

    link.onclick = function (){
        let personagensDaPagina = listaDados(element.link)['results'];
        removeDaTela();
        populaTela(personagensDaPagina);
    }

    lista.appendChild(link);
    return lista;
}

function paginar() {
    let lista = [];
    let limit = 10;

    const state = {
        limit,
        offset: 0,
        pagina: 2,
        totalPaginas: Math.ceil(catalogoData['total']/limit)
    };

    for(i=state.offset; i <= state.totalPaginas; i++){
        lista.push({
            index: i,
            offset: (i * limit),
            link: `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${(i * limit)}&ts=1&apikey=9a4af59b888c9462199bc265a06f7d47&hash=a861437781f0ac43374a0161fee2b5ae`
        });
    }

    lista.forEach(element => {
        let pagina = criarPagina(element);
        paginacao.appendChild(pagina);
    });    


}


function populaTela(personagens){
    personagens.forEach(element => {
        let coluna = criaCard(element);
        tabela.appendChild(coluna);
    });
}

function removeDaTela(){
    var tabela = document.getElementById("tabela");
    while (tabela.firstChild) {
    tabela.removeChild(tabela.firstChild);
    }
}

function main() {
    listaDados(`https://gateway.marvel.com:443/v1/public/characters?limit=10&ts=1&apikey=9a4af59b888c9462199bc265a06f7d47&hash=a861437781f0ac43374a0161fee2b5ae`);
    let personagens = catalogoData['results'];

    populaTela(personagens);

    paginar();
}

main();