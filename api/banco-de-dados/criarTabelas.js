const ModeloTabela = require("../rotas/pacientes/ModeloTabelaPacientes");
const ModeloTabelaMidia = require("../rotas/midias/ModeloTabelaMidias")

ModeloTabela.sync()
  .then(() => console.log("tabela criada com sucesso"))
  .catch(console.log);

ModeloTabelaMidia.sync()
  .then(()=> console.log("tabela Midias criada com sucesso"))
  .catch(console.log);