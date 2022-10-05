const utils = require('./utils');
require('should');

describe('Teste do clean', () => {
    beforeEach(()=>utils.clean());
    it('Caso limpeza de dados', async() => {
        await utils.createPerson('11111111111', 'Joao');
        await utils.createPerson('22222222222', 'Maria');

        await utils.createRelationship('11111111111', '22222222222');

        const response = await utils.clean();
        response.data.people.should.be.eql({});
        response.data.relation.should.be.eql({});
    })
})