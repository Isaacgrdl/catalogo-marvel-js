'use stricts'
const caminho = "D:/desenvolvimento/projetos/api-marvel/catalogo-marvel-js/src";

exports.index = async(req, res, next) => {
   res.sendFile(caminho + "/app/index.html");
}
