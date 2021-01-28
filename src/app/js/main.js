function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.response
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
    link.innerHTML = i;
    link.setAttribute("class", "page-link");

    lista.appendChild(link);
    return lista;
}

function main() {
    let data = fazGet("https://gateway.marvel.com:443/v1/public/characters?limit=10&ts=1&apikey=9a4af59b888c9462199bc265a06f7d47&hash=a861437781f0ac43374a0161fee2b5ae");
    let catalogo = JSON.parse(data);
    let catalogoData = catalogo['data'];
    let personagens = catalogoData['results'];

    personagens.forEach(element => {
        let coluna = criaCard(element);
        tabela.appendChild(coluna);
    });

    let paginas;
    paginas = (catalogoData['total'] / 10);
    let listaPaginas = new Array();

    for(i=0; i < paginas; i++) {
        listaPaginas.push(i);
    }

    listaPaginas.forEach(element => {
        let lista = criaPaginacao(element);
        paginacao.appendChild(lista);
    });
}

main()