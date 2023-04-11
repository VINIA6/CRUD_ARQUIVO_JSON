const {readFile, writeFile, writeFileSync} = require('fs')
const {promisify} = require('util')

const readFileAsync = promisify(readFile)
// const writeFileAsync = promisify(writeFile)
class Database {

    constructor (){
        this.NOME_ARQUIVO =  'herois.json'
    }

    async obterDadosArquivo(){
        const arquvio = await readFileAsync(this.NOME_ARQUIVO,'utf8')
        return JSON.parse(arquvio.toString())
    }

    async escreverArquivo(dados){
        await writeFileSync(this.NOME_ARQUIVO,JSON.stringify(dados))
        return true 
    }

    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item =>(id ? (item.id === id): true))
        return dadosFiltrados
    }

    async cadastrar(heroi){
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id: Date.now()
        const heroiComId = {
            id,
            ...heroi
        }
        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const result = await this.escreverArquivo(dadosFinal)

        return result
    }

    async remover(id){

        if(!id){
            return await this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivo()
        

        const indice = dados.findIndex((item) => item.id === parseInt(id))

        if(!indice === -1 ){
            throw Error('VINIA6 -> O usuário não existe')
        }

        dados.splice(indice,1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id,data){
        
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item=>item.id===parseInt(id))
        
        if(indice===-1){
            throw Error('O heroi informado ainda não existe')
        }

        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...data
        }

        dados.splice(indice,1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])

    }
}

module.exports = new Database()