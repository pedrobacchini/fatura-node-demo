const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema de definicao do modelo de fatura
let FaturaSchema = new Schema({
    idusuario: {type: Schema.Types.ObjectId, required: true},
    nome_empresa: {type: String, required: true, min:3, max: 255},
    valor: { type: Number, required: true, min: 0.1},
    data_vencimento: {type: Date, required: true},
    pagou: {type: Boolean, required: true}
});

module.exports = mongoose.model('Fatura', FaturaSchema);