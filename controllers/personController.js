global.people = global.people ?? {};
global.relation = global.relation ?? {};
global.recommendation = global.recommendation ?? {};

let people = global.people; 
let relation = global.relation;
let recommendation = global.recommendation;

const createPerson = async(req, res) => {
    const{cpf} = req.body;
    if (cpf.length == 11 && !people[cpf]){
        people[cpf] = req.body;
        res.status(200).send(people[cpf]);
    }
    else {
        res.status(400).send('Não foi possível realizar o cadastro!');
    }
};

const getPerson = async(req, res) => {
    const{cpf} = req.params;
    const person = people[cpf];
    if (person){
        res.send(person);
    }
    else {
        res.status(404).send('Usuário não cadastrado!')
    }
};

const clean = async(req, res) => {
    people = {};
    relation = {};
    res.send({
        people: people,
        relation: relation
    });
}

const createRelationship = async(req, res) => {
    const{cpf1, cpf2} = req.body;
    if (people[cpf1] && people[cpf2]){
        if (!relation[cpf1]){
            relation[cpf1] = [];
        }
        if (!relation[cpf2]){
            relation[cpf2] = [];
        }
    
        if (!relation[cpf1].includes(cpf2)){
            relation[cpf1].push(cpf2);
        }
        if (!relation[cpf2].includes(cpf1)){
            relation[cpf2].push(cpf1);
        }

        res.status(200).send(relation);
    }
    else {
        res.status(404).send('Não foi possível criar a relação!');
    }
}

const getRecommendations = async(req, res) => {
    const{cpf} = req.params;
    if(cpf.length != 11){
        res.status(400).send('CPF não possui 11 dígitos!');
    }
    else if(!people[cpf]){
        res.status(404).send('Usuário não existe!');
    }
    else{
        recommendation[cpf] = [];
        let cont = {};
        for(let i = 0; i <= relation[cpf].length - 1; i++){
            friend = relation[cpf][i];
            for(let j = 0; j <= relation[friend].length - 1; j++){
                friendOf = relation[friend][j];
                if(!relation[cpf].includes(friendOf) && friendOf != cpf){
                    if(!recommendation[cpf].includes(friendOf)){
                        recommendation[cpf].push(friendOf);
                        cont[friendOf] = 1;
                    }
                    else{
                        cont[friendOf]++;
                        let pos = recommendation[cpf].indexOf(friendOf);
                        recommendation[cpf].splice(pos, 1);
                        let k = 0;
                        while(cont[friendOf] <= cont[recommendation[cpf][k]]){
                            k++;
                        }
                        recommendation[cpf].splice(k, 0, friendOf);
                    }
                }
            }
        }
        res.send(recommendation[cpf]);
    }
}

module.exports = {createPerson, getPerson, clean, createRelationship, getRecommendations};