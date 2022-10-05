const utils = require('./utils');
require('should');

describe('Teste do getRecommendations', () => {
    beforeEach(()=>utils.clean());
    it('Caso nenhuma recomendação', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');

        await utils.createRelationship('11111111111', '22222222222');

        const response = await utils.getRecommendations('11111111111');
        response.data.should.be.eql([]);
    })
    it('Caso uma recomendação', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');
        await utils.createPerson('33333333333', 'Jose');

        await utils.createRelationship('11111111111', '22222222222');
        await utils.createRelationship('22222222222', '33333333333');

        const response = await utils.getRecommendations('11111111111');
        response.data.should.be.eql(['33333333333']);
    })
    it('Caso duas recomendações', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');
        await utils.createPerson('33333333333', 'Jose');
        await utils.createPerson('44444444444', 'Ana');
        await utils.createPerson('55555555555', 'Hugo');

        await utils.createRelationship('11111111111', '22222222222');
        await utils.createRelationship('11111111111', '33333333333');
        await utils.createRelationship('22222222222', '44444444444');
        await utils.createRelationship('33333333333', '55555555555');

        const response = await utils.getRecommendations('11111111111');
        response.data.should.be.eql(['44444444444', '55555555555']);
    })
    it('Caso duas recomendações com prioridade', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');
        await utils.createPerson('33333333333', 'Jose');
        await utils.createPerson('44444444444', 'Ana');
        await utils.createPerson('55555555555', 'Hugo');

        await utils.createRelationship('11111111111', '22222222222');
        await utils.createRelationship('11111111111', '33333333333');
        await utils.createRelationship('22222222222', '44444444444');
        await utils.createRelationship('22222222222', '55555555555');
        await utils.createRelationship('33333333333', '55555555555');
        
        const response = await utils.getRecommendations('11111111111');
        response.data.should.be.eql(['55555555555', '44444444444']);
    })
    it('Caso duas recomendações de um amigo', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');
        await utils.createPerson('33333333333', 'Jose');
        await utils.createPerson('44444444444', 'Ana');
        await utils.createPerson('55555555555', 'Hugo');

        await utils.createRelationship('11111111111', '22222222222');
        await utils.createRelationship('11111111111', '33333333333');
        await utils.createRelationship('22222222222', '44444444444');
        await utils.createRelationship('22222222222', '55555555555');

        const response = await utils.getRecommendations('11111111111');
        response.data.should.be.eql(['44444444444', '55555555555']);
    })
    it('Caso muitas recomendações com prioridade', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');
        await utils.createPerson('33333333333', 'Jose');
        await utils.createPerson('44444444444', 'Ana');
        await utils.createPerson('55555555555', 'Hugo');
        await utils.createPerson('66666666666', 'Edu');
        await utils.createPerson('77777777777', 'Lucca');

        await utils.createRelationship('11111111111', '22222222222');
        await utils.createRelationship('11111111111', '33333333333');
        await utils.createRelationship('11111111111', '44444444444');
        await utils.createRelationship('22222222222', '55555555555');
        await utils.createRelationship('22222222222', '66666666666');
        await utils.createRelationship('33333333333', '66666666666');
        await utils.createRelationship('44444444444', '66666666666');
        await utils.createRelationship('44444444444', '55555555555');
        await utils.createRelationship('44444444444', '77777777777');

        const response = await utils.getRecommendations('11111111111');
        response.data.should.be.eql(['66666666666', '55555555555', '77777777777']);
    })
    it('Caso de amigo do amigo ser amigo', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');
        await utils.createPerson('33333333333', 'Jose');
        await utils.createPerson('44444444444', 'Ana');
        await utils.createPerson('55555555555', 'Hugo');

        await utils.createRelationship('11111111111', '22222222222');
        await utils.createRelationship('11111111111', '33333333333');
        await utils.createRelationship('22222222222', '44444444444');
        await utils.createRelationship('22222222222', '55555555555');
        await utils.createRelationship('33333333333', '55555555555');
        await utils.createRelationship('33333333333', '22222222222');

        const response = await utils.getRecommendations('11111111111');
        response.data.should.be.eql(['55555555555', '44444444444']);
    })
    it('Caso usuário não existe', async() => {
        const response = await utils.getRecommendations('11111111111');
        response.status.should.be.eql(404);
        response.data.should.be.eql('Usuário não existe!');
    })
    it('Caso cpf com mais de 11 dígitos', async() => {
        const response = await utils.getRecommendations('111111111111');
        response.status.should.be.eql(400);
        response.data.should.be.eql('CPF não possui 11 dígitos!');
    })
    it('Caso cpf com menos de 11 dígitos', async() => {
        const response = await utils.getRecommendations('1111111111');
        response.status.should.be.eql(400);
        response.data.should.be.eql('CPF não possui 11 dígitos!');
    })
})