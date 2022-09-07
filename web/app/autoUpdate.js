window.setInterval('autoUpdate()',10000);

console.log("Testing Fora...")

function autoUpdate(){

    console.log("Testing Dentro...")

    let idClient = sessionStorage.getItem('cliente_id');

    console.log("Updating...")

    if(idClient){
        getBalanceAccount();
        getFaturaCreditCard();
    }
}