function pagarFatura(saldo){
    let saldoFormatado = convert(saldo);
    //console.log("Pagando Fatura... Com Saldo -> " + saldoFormatado);
    let idClient = sessionStorage.getItem('cliente_id');
    if(idClient){
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost:3000/cartaoCredito/pagarFatura/${idClient}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {
                //let responseData = JSON.parse(request.response);
                let balance_content = document.querySelector('.fatura-content');
                balance_content.innerHTML = formatPrice(0);
                getBalanceAccount();
            }else if(this.status == 400){
                let responseData = JSON.parse(request.response);
                alert(responseData.error);
            }
        };
    }
}

function convert(currency){
    var k, temp;
    // Loop to make substring
    for(var i = 0; i < currency.length; i++){
          
        // Getting Unicode value
        k = currency.charCodeAt(i);

        if(k > 47 && k < 58){
            temp = currency.substring(i);
            break;
        }
    }

    for(var i = 0; i < temp.length; i++){
        var j = temp.charCodeAt(i);
        if(j == 46){
            temp = setCharAt(temp,i,'');
        }
    }

    temp = temp.replace(/,/, '.');

    return parseFloat(temp);          
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

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function getCartao(){

}