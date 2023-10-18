//  Test connection and fetch required data
window.addEventListener("load", (event) => {
    loadProductList();
});

//  Get the data for the Rotuleiras
function loadProductList() {     
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/product/list";

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

                outHTML += "<div class='productBox' style='border-top:4px solid #38444d;'><div class='productRow'>";
                

                //  Fill the table with the recieved data for each object (row)
                for(var i = 0; i < returnedDictionary.length; i++) {
                    if (i != 0 && i % 3 == 0) {
                        outHTML += "</div></div>";
                        //  Ignora esta merda
                        outHTML += "<div class='productBox' style='top:-" + i*4 + "px;'><div class='productRow'>";
                    }
                    outHTML += "<div class='productEntry' id='prodNum_" + returnedDictionary[i].id + "'>";
                    outHTML += "<div class='productImage'><img src='" + returnedDictionary[i].img + "'></div>";
                    outHTML += "<div class='productDescription'><h3>" + returnedDictionary[i].name + "<h3>";
                    outHTML += "<h5> Categoria: " + returnedDictionary[i].category + "<h4>";
                    outHTML += "<h5> Preço: " + returnedDictionary[i].price + "€<h4>";
                    outHTML += "<h5> In Stock: " + returnedDictionary[i].in_stock + "<h4></div></div>";

                }

                document.getElementById("productList").innerHTML = outHTML;
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