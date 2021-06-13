const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const formatosAceitos = require('./Serializador').formatosAceitos

app.use(bodyParser.json());

app.use((req,res,proximo)=>{
  let formatoRequisitado = req.header('Accept')

  if (formatoRequisitado === '*/*'){
    formatoRequisitado = 'application/json';
  }
  
  if (formatosAceitos.indexOf(formatoRequisitado) === -1 ){
    res.status(406)
    res.end()
    return
  }

  res.setHeader('Content-Type',formatoRequisitado)

  proximo()
})

const pacientes = require("./rotas/pacientes");
app.use("/api/pacientes", pacientes);

const midias = require("./rotas/midias");
const DadosNaoFornecidos = require("./erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
app.use("/api/midias", midias);

app.use((erro, req, res, proximo) => {
  let status = 500;

  if (erro instanceof NaoEncontrado) {
    status = 404;
  }

  if (erro instanceof CampoInvalido) {
    status = 400;
  }

  if (erro instanceof DadosNaoFornecidos){
    status = 400;
  }
  
  if (erro instanceof ValorNaoSuportado){
    status = 406;
  }
  
  res.status(status);
  console.log(`id Erro: ${erro.idErro}`)
  res.send(JSON.stringify({ mensagem: erro.message, id: erro.idErro }));
});

app.listen(config.get("api.porta"), () => {
  console.log("A API Está Funcionando!!");
});
