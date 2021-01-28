function fazGet() {
    let request = new XMLHttpRequest()
    request.open("GET", `https://gateway.marvel.com:443/v1/public/characters?limit=10&ts=1&apikey=9a4af59b888c9462199bc265a06f7d47&hash=a861437781f0ac43374a0161fee2b5ae`, false)
    request.send()
    return request.response
}

function listaDados() {
    let data = fazGet();
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

function criaPaginacao() {
    lista = document.createElement("li");
    lista.setAttribute("class", "page-item");

    link = document.createElement("a");
    link.setAttribute("href", "1");
    link.setAttribute("class", "page-link");

    lista.appendChild(link);
    return lista;
}

function paginar(){
    let OFFSET = 0;
    listaDados();

    let paginas;
    paginas = (catalogoData['total'] / 10);
    let listaPaginas = new Array();
    let listaLinks = new Array();

    for(i=0; i < paginas; i++) {
        listaPaginas.push(i);
        OFFSET = OFFSET + 10;
        listaLinks.push(`https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=${OFFSET}&ts=1&apikey=9a4af59b888c9462199bc265a06f7d47&hash=a861437781f0ac43374a0161fee2b5ae`);
    }

    listaPaginas.forEach(element => {
        criaPaginacao();
        paginacao.appendChild(lista);
    });
}

function main() {
    listaDados();
    let personagens = catalogoData['results'];

    personagens.forEach(element => {
        let coluna = criaCard(element);
        tabela.appendChild(coluna);
    });

    paginar();
}

main();