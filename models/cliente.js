const mongoose = require('mongoose');
const {Schema} = mongoose

let clienteSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: String,
  email: String,
  telefone: String,
  cnpj: String,
  cpf: String
})

clienteSchema.index({
    nome: 'text'
})

const Cliente = mongoose.model('Cliente', clienteSchema)
module.exports = Cliente;