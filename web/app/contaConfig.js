window.addEventListener('load', getCardData());

function getCardData(){
    let idTitular = sessionStorage.getItem('cliente_id');
    if(idTitular){
        let request = new XMLHttpRequest();
        request.open('POST', `http://localhost:3000/cartao/get/${idTitular}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {
                let responseData = JSON.parse(request.response);
                //let balance_content = document.querySelector('.fatura-content');
                //balance_content.innerHTML = formatPrice(responseData);
            } 
        };
    }
}