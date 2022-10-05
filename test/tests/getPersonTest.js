const utils = require('./utils');
require('should');

describe('Teste do getPerson', () => {
    beforeEach(()=>utils.clean());
    it('Caso usuario encontrado', async() => {
        await utils.createPerson('12345678909', 'Joao');
        const response = await utils.getPerson('12345678909');
        response.data.cpf.should.be.eql('12345678909');
        response.data.name.should.be.eql('Joao');
    })
    it('Caso usuário não encontrado', async() => {
        const response = await utils.getPerson('12345678909');
        response.status.should.be.eql(404);
        response.data.should.be.eql('Usuário não cadastrado!');
    })
})
