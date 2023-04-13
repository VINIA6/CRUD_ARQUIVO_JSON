const {program} = require('commander')
const DataBase = require('./database')
const Heroi = require('./heroi')

async function main(){

    program 
        .version('v1')
        .option('-n, --nome [value]',"Nome do heroi:")
        .option('-p, --poder [value]',"Poder do heroi:")
        .option('-i, --id [value]',"Poder do heroi:")


        .option('-c, --cadastrar',"Cadastrar heroi")
        .option('-l, --listar',"Listar heroi")
        .option('-r --remove',"Remove heroi")
        .option('-a --atualizar [value]',"Atualizar heroi")
        .parse(process.argv)
        
    const heroi = new Heroi(program)
    try {
        if(program.cadastrar){

            delete heroi.id

            const result = await DataBase.cadastrar(heroi)
            if(!result){
                console.error('Heroi não foi cadastrado')
                return;
            }
            console.log("Heroi foi cadastrado")
        }
        if(program.listar){
            const result =  await DataBase.listar()
            console.log(result)
            return;
        }
        if(program.remover){
            const result = await DataBase.remover(heroi.id)
            if(result === false){
                console.error('Não foi possivel remover')
                return;
            }
            console.log('Removido com sucesso')
        }
        if(program.atualizar){
            const idParaAtualizar = parseInt(program.atualizar)
            delete heroi.id
            const dado = JSON.stringify(heroi)  
            const heroiAtualizar = JSON.parse(dado)
            const result =  await DataBase.atualizar(idParaAtualizar,heroiAtualizar)
            if(!result){
                console.error("Não foi possivel atualizar")
                return;
            }
            console.log('Atualizado com sucesso')
        }
    } catch (error) {
        console.error('DEU RUIM',error)
    }

}

main()