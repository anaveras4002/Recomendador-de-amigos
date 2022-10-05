const axios = require('axios');

const createPerson = (cpf, name) => axios({
    method: 'post',
    url: 'http://localhost:3000/person',
    data: {
      cpf,
      name
    },
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    }
})

const getPerson = (cpf) => axios({
    method: 'get',
    url: `http://localhost:3000/person/${cpf}`,
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    }
})

const createRelationship = (cpf1, cpf2) => axios({
    method: 'post',
    url: 'http://localhost:3000/relationship',
    data: {
      cpf1,
      cpf2
    },
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    }  
});

const getRecommendations = (cpf) => axios({
    method: 'get',
    url: `http://localhost:3000/recommendations/${cpf}`,
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    }
});

const clean = () => axios({
  method: 'delete',
  url: 'http://localhost:3000/clean'
});

module.exports = {createPerson, getPerson, createRelationship, getRecommendations, clean};