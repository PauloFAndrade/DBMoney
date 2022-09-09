const DbConnection = require('../database/connection')

class RecargaService{
    async insertRecarga(recargaReceived){
        try {
            console.log("Entrei no insertRecarga()");
            const database = await DbConnection();
            const values = [recargaReceived.operacao_id,recargaReceived.operadora,recargaReceived.num_telefone];
            await database.query('insert into Recarga (recarga_operacao_id,recarga_operadora,recarga_num_telefone)'
            +' values (?,?,?)',values);
            console.log("Fiz a Recarga com Sucesso");
        } catch (error) {
            console.log(error);
            //return error;
            throw new Error("Erro ao Inserir Recarga\n"+error);
        }
    }
}

module.exports = new RecargaService();
