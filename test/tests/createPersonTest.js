const utils = require('./utils');
require('should');

describe('Teste do createPerson', () => {
    beforeEach(()=>utils.clean());
    it('Caso cadastro realizado', async() => {
        const response = await utils.createPerson('12345678909', 'Joao');
        response.status.should.be.eql(200);
        response.data.cpf.should.be.eql('12345678909');
        response.data.name.should.be.eql('Joao');
    })
    it('Caso usuário já existente', async() => {
        await utils.createPerson('12345678909', 'Joao');
        const response = await utils.createPerson('12345678909', 'Joao');
        response.status.should.be.eql(400);
        response.data.should.be.eql('Não foi possível realizar o cadastro!');
    })
    it('Caso cpf com mais de 11 dígitos', async() => {
        const response = await utils.createPerson('123456789099', 'Joao');
        response.status.should.be.eql(400);
        response.data.should.be.eql('Não foi possível realizar o cadastro!');
    })
    it('Caso cpf com menos de 11 dígitos', async() => {
        const response = await utils.createPerson('1234567890', 'Joao');
        response.status.should.be.eql(400);
        response.data.should.be.eql('Não foi possível realizar o cadastro!');
    })
})