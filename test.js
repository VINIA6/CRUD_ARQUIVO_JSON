const {deepEqual, ok} = require('assert')
const Database = require('./database')

const DEFAULT_ITEM_CADASTRAR={
    id:"1",
    nome:'Flash',
    poder:'Speed'
}

const DEFAULT_ITEM_UPDATE={
    nome:'Lanterna Verde',
    poder:'Energia do anel',
    id:2
}

describe('Suite de manipulação de herois',()=>{
    before(async () =>{
        await Database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await Database.cadastrar(DEFAULT_ITEM_UPDATE)
    })

    it('Deve PESQUISAR um heroi, usando arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const [result] = await Database.listar(expected.id)
        deepEqual(result,expected)
    })

    it('Deve CADASTRAR um heroi, usando arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const result = await Database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await Database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual,expected)
    })

    it('Deve DELETAR um heroi, usando arquivos', async()=>{
        const expected = true
        const result = await Database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(result,expected)
    })

    it('Deve ATUALIZAR um heroi, usando arquivos', async()=>{
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            nome:'Batman',
            poder:'Dinehiro'
        }
        const novoDado ={
            nome:'Batman',
            poder:'Dinehiro'
        }
        await Database.atualizar(DEFAULT_ITEM_UPDATE.id,novoDado)
        const [result] = await Database.listar(DEFAULT_ITEM_UPDATE.id)
        deepEqual(result,expected)
    })
})