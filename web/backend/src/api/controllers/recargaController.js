const RecargaService = require('../../services/recargaService')
const OperacaoService = require('../../services/operacaoService')
const ContaService = require('../../services/contaService')

class RecargaController {

    async createRecarga(request,response){
        try {
            const recargaReceived = request.body
            console.log("Valor da Recarga -> " + recargaReceived.valor);
            if(recargaReceived.metodo == "ppix"){
                console.log("Método de Pagamento -> Pix");
                console.log("CodConta -> " + recargaReceived.codConta);
                let saldo = await ContaService.getSaldo(recargaReceived.codConta);
                console.log("Saldo -> " + saldo);
                if(saldo < recargaReceived.valor){
                    throw "Saldo Insuficiente";
                }else{
                    await ContaService.removeSaldo(recargaReceived.codConta,recargaReceived.valor);
                }
            }
            let dataOperation = await OperacaoService.insertOperacao(recargaReceived);
            recargaReceived.operacao_id = dataOperation.idOperacao;
            await RecargaService.insertRecarga(recargaReceived);

            return response.status(200).json({
                msg: 'Recarga adicionada com sucesso'
            })
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new RecargaController() 
