const commander = require('commander')
const DataBase = require('./database')
async function main(){
    commander 
        .version('v1')
        .option('-n, --nome [value]',"Nome do heroi:")
        .option('-p, --poder [value]',"Poder do heroi:")
        .option('-c, --cadastrar',"Cadastrar heroi")
        .parse(process.argv)

    try {
        if(commander.cadastrar){
            // const result = await DataBase.cadastrar()
        }
    } catch (error) {
        console.error('DEU RUIM',error)
    }
}

main()