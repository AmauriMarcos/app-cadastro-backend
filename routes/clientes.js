const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cliente = require('../models/cliente');


router.get('/', (req, res) => {
    Cliente.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});

 router.post('/',  (req, res) => {
     const {nome, sobrenome, email, telefone,cnpj, cpf} = req.body.data;
     const cliente =  new Cliente({
        _id: new mongoose.Types.ObjectId(),
        nome: `${nome} ${sobrenome}`,
        email: email,
        telefone: telefone,
        cnpj: cnpj,
        cpf: cpf
    });
    cliente.save()
});


router.get('/:search', (req, res) =>{
    var regex = new RegExp(req.params.search, 'i');  // 'i' makes it case insensitive
    return Cliente.find({nome: regex}, function(err,q){
        return res.send(q);
    });
});

router.route('/edit/:id').get((req, res) => {
    Cliente.findById(req.params.id, (error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 });

router.patch('/:clienteId', (req, res) =>{
    const id = req.params.clienteId;
    const {nome, email, telefone, cpf, cnpj} = req.body.data
    Cliente.findByIdAndUpdate({_id: id}, {
        $set: {nome: nome, email: email, telefone: telefone, cpf: cpf, cnpj: cnpj}
    }, (error, data) =>{
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Cliente editado!')
        }
    })
})

router.delete("/:clienteId", (req, res) => {
    const id = req.params.clienteId;
    Cliente.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    }).catch(err => console.log(err));
});

module.exports = router;

