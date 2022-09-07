const btn = document.querySelector("#btn-fatura");

function pagarFatura(saldo){
    console.log("Pagando Fatura... Com Saldo -> " + saldo);
    let idClient = sessionStorage.getItem('cliente_id');
    if(idClient){

    }
}

function getCliente(){
    if(idClient) {
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost:3000/titular/${idClient}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {
                console.log(request.response)
                let responseData = JSON.parse(request.response);
                sessionStorage.setItem('titular_cod_conta', responseData.titular_cod_conta);
            } 
        };
    }
}

function getCartao(){

}