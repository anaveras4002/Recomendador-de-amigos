const utils = require('./utils');
require('should');

describe('Teste do createRelationship', () => {
    beforeEach(()=>utils.clean());
    it('Caso usuarios existem', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');

        const response = await utils.createRelationship('11111111111', '22222222222');
        response.status.should.be.eql(200);
        response.data['11111111111'].should.be.eql(['22222222222']);
        response.data['22222222222'].should.be.eql(['11111111111']);
    })
    it('Caso criando mais de um relacionamento', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');
        await utils.createPerson('33333333333', 'Jose');

        await utils.createRelationship('11111111111', '22222222222');
        const response = await utils.createRelationship('11111111111', '33333333333');
        response.status.should.be.eql(200);
        response.data['11111111111'].should.be.eql(['22222222222', '33333333333']);
        response.data['22222222222'].should.be.eql(['11111111111']);
        response.data['33333333333'].should.be.eql(['11111111111']);
    })
    it('Caso um usuario não existe', async() => {
        await utils.createPerson('11111111111', 'Joao');
        
        const response = await utils.createRelationship('11111111111', '22222222222');
        response.status.should.be.eql(404);
        response.data.should.be.eql('Não foi possível criar a relação!');
    })
    it('Caso os dois usuários não existem', async() => {
        const response = await utils.createRelationship('11111111111', '22222222222');
        response.status.should.be.eql(404);
        response.data.should.be.eql('Não foi possível criar a relação!');
    })
})