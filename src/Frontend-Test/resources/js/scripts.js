//  Automatically change to the Modelos or Marcas tab if we reloaded the page in it
var reloading = sessionStorage.getItem("reloadingModelos");
if (reloading) {
    sessionStorage.removeItem("reloadingModelos");
    menuModelos();
}
reloading = sessionStorage.getItem("reloadingMarcas");
if (reloading) {
    sessionStorage.removeItem("reloadingMarcas");
    menuMarcas();
}

//  Test connection and fetch required data
window.addEventListener("load", (event) => {
    try {
        connect();
    }
    catch(e) {
        alertNoConnection();
    }
});

//  Fetch required data
function connect() {
    reloadRotuleiras();
    reloadModelos();
    reloadMarcas();
    reloadRotuleiraOptions(true);
}

//  Wait 3 seconds and retry connecting
function retryConnection() {
    alertLoading();

    setTimeout(function (){
        connect();
    }, 3000);
}

//  Change to the Rotuleiras menu
function menuRotuleiras() {    
    document.getElementById("rotuleirasMenu").style.display = "block";
    document.getElementById("modelosMenu").style.display = "none";
    document.getElementById("marcasMenu").style.display = "none";

    document.getElementById("rotulBtn").classList.remove("blueBtn");
    document.getElementById("modelosBtn").classList.remove("redBtn");
    document.getElementById("marcasBtn").classList.remove("redBtn");
    document.getElementById("rotulBtn").classList.add("redBtn");
    document.getElementById("modelosBtn").classList.add("blueBtn");
    document.getElementById("marcasBtn").classList.add("blueBtn");

    document.getElementsByClassName("bgBox")[0].style.left = "15%";
}

//  Change to the Modelos menu
function menuModelos() {    
    document.getElementById("rotuleirasMenu").style.display = "none";
    document.getElementById("modelosMenu").style.display = "block";
    document.getElementById("marcasMenu").style.display = "none";

    document.getElementById("rotulBtn").classList.remove("redBtn");
    document.getElementById("modelosBtn").classList.remove("blueBtn");
    document.getElementById("marcasBtn").classList.remove("redBtn");
    document.getElementById("rotulBtn").classList.add("blueBtn");
    document.getElementById("modelosBtn").classList.add("redBtn");
    document.getElementById("marcasBtn").classList.add("blueBtn");

    document.getElementsByClassName("bgBox")[0].style.left = "25%";
}

//  Change to the Marcas menu
function menuMarcas() {    
    document.getElementById("rotuleirasMenu").style.display = "none";
    document.getElementById("modelosMenu").style.display = "none";
    document.getElementById("marcasMenu").style.display = "block";

    document.getElementById("rotulBtn").classList.remove("redBtn");
    document.getElementById("modelosBtn").classList.remove("redBtn");
    document.getElementById("marcasBtn").classList.remove("blueBtn");
    document.getElementById("rotulBtn").classList.add("blueBtn");
    document.getElementById("modelosBtn").classList.add("blueBtn");
    document.getElementById("marcasBtn").classList.add("redBtn");

    document.getElementsByClassName("bgBox")[0].style.left = "25%";
}
    
//  Clear the rows of an html table
function clearTableRows(tablename) {    
    var tableEntries = document.getElementById(tablename);

    //  Clear table before update
    var tableHeaderRowCount = 0;
    var rowCount = tableEntries.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tableEntries.deleteRow(tableHeaderRowCount);
    }
}

//  Alerts
function alertLoading(){
    document.getElementById("alertLoading").style.display = 'block';
    document.getElementById("alertSuccess").style.display = 'none';
    document.getElementById("alertError").style.display = 'none';
    document.getElementById("alertNoConnection").style.display = 'none';
    document.getElementById("fullBodyAlert").style.display = 'block';
}

function alertLoadingNoBG(){
    document.getElementById("alertLoading").style.display = 'block';
    document.getElementById("alertSuccess").style.display = 'none';
    document.getElementById("alertError").style.display = 'none';
    document.getElementById("alertNoConnection").style.display = 'none';
    document.getElementById("fullBodyAlert").style.display = 'block';
    document.getElementById("fullBodyAlert").style.backgroundColor = '#0000';
}

function alertSuccess(){
    document.getElementById("alertLoading").style.display = 'none';
    document.getElementById("alertSuccess").style.display = 'block';
    document.getElementById("alertError").style.display = 'none';
    document.getElementById("alertNoConnection").style.display = 'none';
    document.getElementById("fullBodyAlert").style.display = 'block';
}

function alertError(errorCode, errorText){
    document.getElementById("errorCode").innerHTML = errorCode;
    document.getElementById("errorText").innerHTML = errorText;

    document.getElementById("alertLoading").style.display = 'none';
    document.getElementById("alertSuccess").style.display = 'none';
    document.getElementById("alertError").style.display = 'block';
    document.getElementById("alertNoConnection").style.display = 'none';
    document.getElementById("fullBodyAlert").style.display = 'block';
}

function alertNoConnection(){
    document.getElementById("alertLoading").style.display = 'none';
    document.getElementById("alertSuccess").style.display = 'none';
    document.getElementById("alertError").style.display = 'none';
    document.getElementById("alertNoConnection").style.display = 'block';
    document.getElementById("fullBodyAlert").style.display = 'block';
}

function closeAlert(){
    document.getElementById("alertLoading").style.display = 'none';
    document.getElementById("alertSuccess").style.display = 'none';
    document.getElementById("alertError").style.display = 'none';
    document.getElementById("alertNoConnection").style.display = 'none';
    document.getElementById("fullBodyAlert").style.display = 'none';
    document.getElementById("fullBodyAlert").style.backgroundColor = 'rgba(0,0,0,0.4)';
}

//  Get the data for the Rotuleiras
function reloadRotuleiras() {     
    var tableEntries = document.getElementById("rotuleiras");

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/list";

    //  Open a connection
    xhr.open("GET", url, true);

    //  Set the request header
    xhr.setRequestHeader("Content-Type", "application/json");

    //  Set an event listener for the request
    xhr.addEventListener("readystatechange", function() {
        //  Response recieved
        if (xhr.readyState == 4) {
            //  Code 200 (OK)
            if (xhr.status == 200) {

                returnedData = xhr.responseText;
                var returnedDictionary = JSON.parse(returnedData);
                var outHTML = "";

                //  Fill the table with the recieved data for each object (row)
                for(var i = 0; i < returnedDictionary.length; i++) {
                    outHTML += "<tr>";
                    outHTML += "<td> " + returnedDictionary[i].id + " </td>";
                    outHTML += "<td> " + returnedDictionary[i].abreviatura + " </td>";
                    if (returnedDictionary[i].designacao) {
                        outHTML += "<td> " + returnedDictionary[i].designacao + " </td>";
                    }
                    else {
                        outHTML += "<td> ----- </td>";
                    }
                    outHTML += "<td> " + returnedDictionary[i].cadastro_CTT + " </td>";
                    outHTML += "<td> " + returnedDictionary[i].estacao + " </td>";
                    outHTML += "<td>  <button class='editBtn blueBtn' id='viewRtlaBtn' onclick='viewRotuleira(" + returnedDictionary[i].id + ")'> Ver <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i> </button> </td>";
                    outHTML += "<td>  <button class='editBtn redBtn' id='editRtlaBtn' onclick='openEditRtla("+ 
                                returnedDictionary[i].id + ',"' + returnedDictionary[i].abreviatura + '","' + returnedDictionary[i].estacao 
                                + "\")'> Editar <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> </button>  </button> </td>";
                    outHTML += "</tr>";
                }

                clearTableRows("rotuleiras");
                tableEntries.innerHTML += outHTML;
            }
            //  No response
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            //  Error message from the server
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    });

    xhr.send();    
    return;
}

function reloadModelos() {     
    var tableEntries = document.getElementById("modelos");

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/modelo/list";

    //  Open a connection
    xhr.open("GET", url, true);

    //  Set the request header
    xhr.setRequestHeader("Content-Type", "application/json");

    //  Set an event listener for the request
    xhr.addEventListener("readystatechange", function() {
        //  Response recieved
        if (xhr.readyState == 4) {
            //  Code 200 (OK)
            if (xhr.status == 200) {
                returnedData = xhr.responseText;
                var returnedDictionary = JSON.parse(returnedData);
                var outHTML = "";
                var i;
                for(i = 0; i < returnedDictionary.length; i++) {
                    outHTML += "<tr>";
                    outHTML += "<td> " + returnedDictionary[i].id + " </td>";
                    outHTML += "<td> " + returnedDictionary[i].nome + " </td>";
                    outHTML += "<td> " + returnedDictionary[i].marca + " </td>";
                    outHTML += "<td>  <button class='editBtn redBtn' id='removeModeloBtn' onclick='openRmvModelo("+returnedDictionary[i].id+")'> Acabar <i class=\"fa fa-trash\" aria-hidden=\"true\"></i> </button> </button> </td>";
                    outHTML += "</tr>";
                }

                clearTableRows("modelos");
                tableEntries.innerHTML += outHTML;
            }
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    });

    //  Send the request
    xhr.send();
    return;
}

function reloadMarcas() {     
    var tableEntries = document.getElementById("marcas");
    var marcaEntries = document.getElementById("marcaModelo");

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/marca/list";

    //  Open a connection
    xhr.open("GET", url, true);

    //  Set the request header
    xhr.setRequestHeader("Content-Type", "application/json");

    //  Set an event listener for the request
    xhr.addEventListener("readystatechange", function() {
        //  Response recieved
        if (xhr.readyState == 4) {
            //  Code 200 (OK)
            if (xhr.status == 200) {

                returnedData = xhr.responseText;
                var returnedDictionary = JSON.parse(returnedData);
                var outHTML = "", outMarcaHTML = "";

                //  Fill the table with the recieved data for each object (row)
                for(var i = 0; i < returnedDictionary.length; i++) {
                    outHTML += "<tr>";
                    outHTML += "<td> " + returnedDictionary[i].id + " </td>";
                    outHTML += "<td> " + returnedDictionary[i].nome + " </td>";
                    outHTML += "<td>  <button class='editBtn redBtn' id='removeMarcaBtn' onclick='openRmvMarca("+returnedDictionary[i].id+")'> Acabar <i class=\"fa fa-trash\" aria-hidden=\"true\"></i> </button> </button> </td>";
                    outHTML += "</tr>";

                    outMarcaHTML += "<option value=\"" + returnedDictionary[i].id + "\">" + returnedDictionary[i].nome + "</option>";
                }

                clearTableRows("marcas");
                tableEntries.innerHTML += outHTML;
                marcaEntries.innerHTML = outMarcaHTML;
            }
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    });

    //  Send the request
    xhr.send();
    return;
}

//  Same as above but instead the form options
function reloadRotuleiraOptions(closeAlertBoolean) {      
    var estacaoEntriesAdd = document.getElementById("estacao");
    var estacaoEntriesEdit = document.getElementById("estacaoEdit");
    var modeloEntries = document.getElementById("modelo");

    // Creating a XHR object
    let xhrEstacao = new XMLHttpRequest();
    let url = "http://localhost:8080/estacao/list";

    //  Open a connection
    xhrEstacao.open("GET", url, true); 
    //  Set the request header i.e. which type of content you are sending
    xhrEstacao.setRequestHeader("Content-Type", "application/json");
        
    xhrEstacao.addEventListener("readystatechange", function() {
        if (xhrEstacao.readyState == 4) {
            if (xhrEstacao.status == 200) {
                returnedData = xhrEstacao.responseText;
                var returnedDictionary = JSON.parse(returnedData);
                var outHTML = "";
                var i;
                for(i = 0; i < returnedDictionary.length; i++) {
                    outHTML += "<option value=\"" + returnedDictionary[i].id + "\">" + returnedDictionary[i].cadastro_CTT + "</option>";
                }
                estacaoEntriesAdd.innerHTML = outHTML;
                estacaoEntriesEdit.innerHTML = outHTML;

                if (closeAlertBoolean) {
                    closeAlert();
                }
            }
            else if (xhrEstacao.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhrEstacao.responseText);
                alertError(xhrEstacao.status, jsonResponse["message"]);
            }
        }
    });
    xhrEstacao.send();

    // Creating a XHR object
    let xhrModelos = new XMLHttpRequest();
    url = "http://localhost:8080/rotuleira/modelo/list";

    //  Open a connection
    xhrModelos.open("GET", url, true); 
    //  Set the request header i.e. which type of content you are sending
    xhrModelos.setRequestHeader("Content-Type", "application/json");
        
    xhrModelos.addEventListener("readystatechange", function() {
        if (xhrModelos.readyState == 4) {
            if (xhrModelos.status == 200) {
                returnedData = xhrModelos.responseText;
                var returnedDictionary = JSON.parse(returnedData);
                var outHTML = "";
                var i;
                for(i = 0; i < returnedDictionary.length; i++) {
                    outHTML += "<option value=\"" + returnedDictionary[i].id + "\">" + returnedDictionary[i].nome + "</option>";
                }
                modeloEntries.innerHTML = outHTML;

                if (closeAlertBoolean) {
                    closeAlert();
                }
            }
            else if (xhrModelos.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhrModelos.responseText);
                alertError(xhrModelos.status, jsonResponse["message"]);
            }
        }
    });
    xhrModelos.send();

    return;
}

//  Get the given form values and add a Estacao
function addRotuleira() {      
    var abreviatura = document.getElementById("abreviatura").value;
    var cadastro    = document.getElementById("cadastro").value;
    var modelo      = document.getElementById("modelo").value;
    var ip          = document.getElementById("ip").value;
    var estacao     = document.getElementById("estacao").value;
    var designacao  = document.getElementById("designacao").value;

    let formErrors = [];

    //  Warn the user if any required value is empty
    if (!abreviatura || abreviatura == "") {
        document.getElementById("abreviaturaLbl").style.color = "#de0024";
        formErrors.push("Abreviatura")
    }
    else {
        document.getElementById("abreviaturaLbl").style.color = "#38444d";
    }
    if (!estacao || estacao == "") {
        document.getElementById("estacaoLbl").style.color = "#de0024";
        formErrors.push("Estação")
    }
    else {
        document.getElementById("estacaoLbl").style.color = "#38444d";
    }
    if (!cadastro || cadastro == "") {
        document.getElementById("cadastroLbl").style.color = "#de0024";
        formErrors.push("Cadastro")
    }
    else {
        document.getElementById("cadastroLbl").style.color = "#38444d";
    }
    if (!ip || ip == "") {
        document.getElementById("ipLbl").style.color = "#de0024";
        formErrors.push("IP")
    }
    else {
        document.getElementById("ipLbl").style.color = "#38444d";
    }

    if (formErrors.length > 0) {
        alertError("Por favor verifique os dados inseridos!", "Valores com problemas:<br><br> <h3 class=\"errorTextValues\"> \u27F6  "+formErrors.join('</h3><h3 class="errorTextValues">    \u27F6  ')+"</h3>");
        return;
    }

    //  Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/add";       
    var params = "?modelo="+modelo+"&cadastro="+cadastro+"&abreviatura="+abreviatura+"&designacao="+designacao+"&ip="+ip+"&id_estacao="+estacao;

    //  Open a connection
    xhr.open("POST", url+params, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                reloadRotuleiras();
                alertSuccess();
            }
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    };

    //  Sending the request
    xhr.send(params);
    document.getElementById("addRtlaModal").style.display = "none";
    return;
}

//  Same as above but for editing a Estacao
function editRotuleira() {      
    var id     = document.getElementById("rtlaIdEdit").value;
    var abreviatura = document.getElementById("abreviaturaEdit").value;
    var estacao     = document.getElementById("estacaoEdit").value;

    let formErrors = [];

    if (!abreviatura || abreviatura == "") {
        document.getElementById("abreviaturaEditLbl").style.color = "#de0024";
        formErrors.push("Abreviatura")
    }
    else {
        document.getElementById("abreviaturaEditLbl").style.color = "#38444d";
    }

    if (formErrors.length > 0) {
        alertError("Por favor verifique os dados inseridos!", "Valores com problemas:<br><br> <h3 class=\"errorTextValues\"> \u27F6  "+formErrors.join('</h3><h3 class="errorTextValues">    \u27F6  ')+"</h3>");
        return;
    }

    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/update";       

    if (!estacao || estacao == "") {
        var params = "?id="+id+"&abreviatura="+abreviatura;
    }
    else {
        var params = "?id="+id+"&abreviatura="+abreviatura+"&estacao="+estacao;
    }

    xhr.open("POST", url+params, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                reloadRotuleiras();
                alertSuccess();
                }
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    };

    xhr.send(params);
    document.getElementById("editRtlaModal").style.display = "none";
    return;
}

//  Ask the user if he really wants to end the specified Estacao
function endRotuleira() {      
    const response = confirm("Are you sure you want to end this Rotuleira?");

    if (response) {
        var id     = document.getElementById("rtlaIdEdit").value;
                    
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080/rotuleira/end";       
        var params = "?id="+id;
        xhr.open("POST", url+params, true);
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    reloadRotuleiras();
                    alertSuccess();
                }
                else if (xhr.status == 0) {
                    alertNoConnection();
                }
                else {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    alertError(xhr.status, jsonResponse["message"]);
                }
            }
        };
    
        xhr.send(params);
    } 
    document.getElementById("editRtlaModal").style.display = "none";
    return;
}

function addModelo() {      
    var nome  = document.getElementById("nomeModelo").value;
    var marca = document.getElementById("marcaModelo").value;
                
    if (!nome || nome == "") {
        document.getElementById("nomeModeloLbl").style.color = "#de0024";
        alertError("Por favor verifique os dados inseridos!", "Valores com problemas:<br><br> <h3 class=\"errorTextValues\"> \u27F6  Nome </h3>");
        return;
    }
    else {
        document.getElementById("nomeModeloLbl").style.color = "#de0024";
    }

    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/modelo/add";       
    var params = "?nome="+nome+"&marca="+marca;
    xhr.open("POST", url+params, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                sessionStorage.setItem("reloadingModelos", "true");
                reloadModelos();
                reloadRotuleiraOptions(false);
                alertSuccess();
            }
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    };

    xhr.send(params);
    document.getElementById("addModeloModal").style.display = "none";
    return;
}

function addMarca() {      
    var nome = document.getElementById("nomeMarca").value;
                
    if (!nome || nome == "") {
        document.getElementById("nomeMarcaLbl").style.color = "#de0024";
        alertError("Por favor verifique os dados inseridos!", "Valores com problemas:<br><br> <h3 class=\"errorTextValues\"> \u27F6  Nome </h3>");
        return;
    }
    else {
        document.getElementById("nomeMarcaLbl").style.color = "#de0024";
    }
                
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/marca/add";       
    var params = "?nome="+nome;
    xhr.open("POST", url+params, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                sessionStorage.setItem("reloadingMarcas", "true");
                reloadMarcas();
                reloadRotuleiraOptions(false);
                alertSuccess();
            }
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    };

    xhr.send(params);
    document.getElementById("addMarcaModal").style.display = "none";
    return;
}

//  Functions to open the modals
function openAddRtla() {
    // Get the modal, open button and close button
    var modal = document.getElementById("addRtlaModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function openEditRtla(rtlaID, abrev, estacao) {
    // Get the modal, open button and close button
    var modal = document.getElementById("editRtlaModal");
    var span = document.getElementsByClassName("close")[1];
    document.getElementById("rtlaIdEdit").value = rtlaID;
    document.getElementById("abreviaturaEdit").value = abrev;
    document.getElementById("estacaoEdit").value = estacao;

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("rtlaIdEdit").value = -1;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("rtlaIdEdit").value = -1;
        }
    }
}

function openAddModelo() {
    // Get the modal, open button and close button
    var modal = document.getElementById("addModeloModal");
    var span = document.getElementsByClassName("close")[2];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function openRmvModelo(modeloID) {      
    const response = confirm("Are you sure you want to remove this Modelo?");

    if (response) {                    
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080/rotuleira/modelo/delete";       
        var params = "?id="+modeloID;
        xhr.open("POST", url+params, true);
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                reloadModelos();
                reloadRotuleiraOptions(false);
                alertSuccess();
            }
        };
    
        xhr.send(params);
    }
    return;
}

function openAddMarca() {
    // Get the modal, open button and close button
    var modal = document.getElementById("addMarcaModal");
    var span = document.getElementsByClassName("close")[3];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function openRmvMarca(marcaID) {      
    const response = confirm("Are you sure you want to remove this Marca?");

    if (response) {                    
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080/rotuleira/marca/delete";       
        var params = "?id="+marcaID;
        xhr.open("POST", url+params, true);
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                reloadMarcas();
                reloadRotuleiraOptions(false);
                alertSuccess();
            }
        };
    
        xhr.send(params);
    }
    return;
}

//  Get and load the requested Rotuleira's info
function viewRotuleira(rotuleiraID) {

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/rotuleira/view";  
    var params = "?id="+rotuleiraID;
    // open a connection
    xhr.open("GET", url+params, true);

    // Set the request header i.e. which type of content you are sending
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json");
        
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                returnedData = xhr.responseText;
                var returnedDictionary = JSON.parse(returnedData);
                document.getElementById("infoID").textContent = returnedDictionary.id;
                document.getElementById("infoAbrev").textContent = returnedDictionary.abreviatura;
                if (returnedDictionary.designacao) {
                    document.getElementById("infoDesig").textContent = returnedDictionary.designacao;
                }
                else {
                    document.getElementById("infoDesig").textContent = "-----";
                }
                document.getElementById("infoCadast").textContent = returnedDictionary.cadastro_CTT;
                document.getElementById("infoIP").textContent = returnedDictionary.ip;
                document.getElementById("infoModelo").textContent = returnedDictionary.modelo.nome;
                document.getElementById("infoMarca").textContent = returnedDictionary.modelo.marca.nome;
                document.getElementById("infoEstacao").textContent = returnedDictionary.id_Estacao.areaEstacao;
                document.getElementById("infoArea").textContent = returnedDictionary.id_Estacao.centroEstacao.nome;
                document.getElementById("infoData_Inicio").textContent = returnedDictionary.data_Inicio;
                closeAlert();
            }
            else if (xhr.status == 0) {
                alertNoConnection();
            }
            else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alertError(xhr.status, jsonResponse["message"]);
            }
        }
    });
    xhr.send();
    return;
}