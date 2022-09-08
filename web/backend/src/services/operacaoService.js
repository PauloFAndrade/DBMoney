const DbConnection = require('../database/connection')

class OperacaoService{
    async insertOperacao(operacaoReceived){
        try {
            const database = await DbConnection();
            operacaoReceived.codigo = await this.randomNumber();
            console.log("The Random Code Operation is -> " + operacaoReceived.codigo);
            const values = [operacaoReceived.codigo,''+((new Date().getFullYear()))+'-'+new Date().getMonth()+'-'+new Date().getDay(),operacaoReceived.valor];
            let idOperacao = await database.query('insert into Operacao (operacao_codigo,operacao_data,operacao_valor) values (?,?,?)',values);
            console.log("IdOperacao -> " + idOperacao[0].insertId);
            return idOperacao[0].insertId;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async randomNumber(){
        try{
            const database = await DbConnection();
            let codOperation = 0;
            let disponivel = false;
            while(disponivel == false){
                codOperation = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
                let [cods] = await database.query('select operacao_codigo from Operacao where operacao_codigo = ?',codOperation);
                if(cods.length == 0){
                    disponivel = true;
                }
            }
            return codOperation;
        } catch (error){
            console.log(error);
            throw new Error("Erro Gerar Número de Código da Operação : " + error);
        }
        
    }
}

module.exports = new OperacaoService();
