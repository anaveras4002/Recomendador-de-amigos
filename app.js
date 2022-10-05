const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const personController = require('./controllers/personController');

app.post('/person', personController.createPerson);
app.get('/person/:cpf', personController.getPerson);
app.delete('/clean', personController.clean);
app.post('/relationship', personController.createRelationship);
app.get('/recommendations/:cpf', personController.getRecommendations);

app.listen(3000, function() {
  console.log('App escutando na porta 3000...');
});
