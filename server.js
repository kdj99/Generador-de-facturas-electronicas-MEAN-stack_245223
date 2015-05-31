var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('efactura', ['efactura']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/efactura', function (req, res) {
  console.log('Recibi la peticion get');

  db.efactura.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/efactura', function (req, res){
	console.log(req.body);
	db.efactura.insert(req.body, function (err, doc){
		res.json(doc);	
	})
});

app.delete('/efactura/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.efactura.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);

	});
});	
app.get('/efactura/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.efactura.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});	
app.put('/efactura/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.efactura.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {nombre: req.body.nombre, direccion: req.body.direccion,
     telefono: req.body.telefono, email: req.body.email, rfc: req.body.rfc}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.listen(3000);
console.log("servidor efactura corriendo en el puerto 3000");