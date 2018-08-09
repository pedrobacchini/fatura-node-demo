var ObjectId = require('mongoose').Types.ObjectId;
const Fatura = require('../models/fatura.model');

const ID_INVALID = "O ID fornecido não e valido";
const NOT_FOUND_ID_MESSAGE = "A fatura com o ID fornecido não foi encontrada";

//Obtem todas as faturas
exports.all = function (req, res) {
    Fatura.find(function (err, faturas){
        if(err) 
            return res.status(500).send(err);
        
        res.send(faturas);
    });
}

//Obtem um fatura apartir do id
exports.details = function (req, res) {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(ID_INVALID);

    Fatura.findById(req.params.id, function (err, fatura) {
        if (err) 
            return res.status(500).send(err);

        if(!fatura) 
            return res.status(404).send(NOT_FOUND_ID_MESSAGE);

        res.send(fatura);
    })
};

//Cria uma nova fatura
exports.create = function (req, res) {
    const fatura = new Fatura (
        {
            idusuario: req.body.idusuario,
            nome_empresa: req.body.nome_empresa,
            valor: req.body.valor,
            data_vencimento: req.body.data_vencimento,
            pagou: req.body.pagou
        }
    );

    fatura.save(function (err) {
        if(err){
            if(err.name==="ValidationError")
                return res.status(400).send(err.errors);

            return res.status(500).send(err);
        }  
        res.status(201).send(fatura);
    })
};

//Atualiza um fatura apartir de um id
exports.update = function (req, res) {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(ID_INVALID);

    Fatura.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true, runValidators:true} ,function (err, fatura) {
        if(err){
            if(err.name==="CastError")
                return res.status(400).send(err.message);

            return res.status(500).send(err);
        }  

        if(!fatura) 
            return res.status(404).send(NOT_FOUND_ID_MESSAGE);

        res.send(fatura);
    });
};

//Deleta uma fatura apartir de um id
exports.delete = function (req, res) {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(ID_INVALID);

    Fatura.findByIdAndRemove(req.params.id, function (err, fatura) {
        if (err) 
            return res.status(500).send(err);

        if(!fatura) 
            return res.status(404).send(NOT_FOUND_ID_MESSAGE);
        
        res.send(fatura);
    })
};