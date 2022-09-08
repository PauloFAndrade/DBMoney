const RecargaService = require('../../services/recargaService')
const OperacaoService = require('../../services/operacaoService')

class RecargaController {

    async createRecarga(request,response){
        try {
            const recargaReceived = request.body
            let idOperacao = await OperacaoService.insertOperacao(recargaReceived);
            recargaReceived.operacao_id = idOperacao;
            await RecargaService.insertRecarga(recargaReceived);
            return response.status(200).json({
                msg: 'Recarga adicionada com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new RecargaController() 
