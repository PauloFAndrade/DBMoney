
let form = document.querySelector("form");

function handleSubmitForm(event) {
    event.preventDefault();
    let elements = form.elements;
    let payload = buildPayload(elements);
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/recarga');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload  = function() {
        if (this.status == 200) {
            let sucessMessage = "Recarga realizada com sucesso!";
            alert(sucessMessage);
            //document.location.href = 'recarga.html';
        } else {
            let responseData = JSON.parse(request.response);
            let message = "Recarga não foi realizada com sucesso." + 
                "\n Tente novamente!";
            if (message) {
                alert(message + " ["+responseData.error+"]");
            }
            form.reset();
        }
    };
    request.send(payload);
}

function buildPayload(elements) {
    let payload = {};
    for(let i = 0; i < elements.length; i++) {
        if(elements[i].type !== 'checkbox' && elements[i].type !== 'submit'
            && elements[i].name !== 'password') {
            payload[elements[i].name] = elements[i].value;
        }
    }
    let codConta = sessionStorage.getItem('titular_cod_conta')
    if(codConta){
        payload['codConta'] = codConta;
    }
    let payloadString = JSON.stringify(payload);
    console.log("Payload String -> " + payloadString);
    return payloadString;
}
form.addEventListener('submit', event => handleSubmitForm(event));

function validateForm() {
    
}