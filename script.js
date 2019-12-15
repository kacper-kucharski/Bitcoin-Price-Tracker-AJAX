var btn = document.querySelector("#refresh");
var currency = document.querySelectorAll(".currency");
var span = document.querySelector("#price");
var time = document.querySelector("#time");
var loadingBar = document.querySelector("hr");
var pressedCurrency;
const reloadTime = 5000;

window.onload = (event) => {
    checkPrice("USD");
}; 

btn.addEventListener("click", function(){
    checkPrice(pressedCurrency);
    resetLoadingBarAnim();
})

currency.forEach(function(elem) {
    elem.addEventListener("click", function(e) {
        e.preventDefault;
        pressedCurrency = elem.innerHTML;
        checkPrice(elem.innerHTML);
        resetLoadingBarAnim();
    });
});

setInterval(() => {
    checkPrice(pressedCurrency);
    resetLoadingBarAnim();
}, reloadTime);

function resetLoadingBarAnim() {
    loadingBar.classList.remove("loadingAnimation");
    void loadingBar.offsetWidth;
    loadingBar.classList.add("loadingAnimation");
}

function checkPrice(currency) {
    // Make the request
    console.log(currency)
    var XHR = new XMLHttpRequest();
    if (currency == "GBP") {
        XHR.onreadystatechange = function() {
            if(XHR.readyState == 4 && XHR.status == 200) {
                var updated = JSON.parse(XHR.responseText).time.updated;
                var price = JSON.parse(XHR.responseText).bpi.GBP.rate;
                var code = JSON.parse(XHR.responseText).bpi.GBP.code;
                span.innerHTML = price + ' ' + code;
                time.innerHTML = updated;
            }
        }
    }
    else if (currency == "USD") {
        XHR.onreadystatechange = function() {
            if(XHR.readyState == 4 && XHR.status == 200) {
                var updated = JSON.parse(XHR.responseText).time.updated;
                var price = JSON.parse(XHR.responseText).bpi.USD.rate;
                var code = JSON.parse(XHR.responseText).bpi.USD.code;
                span.innerHTML = price + ' ' + code;
                time.innerHTML = updated;
            }
        }
    }
    else {
        XHR.onreadystatechange = function() {
            if(XHR.readyState == 4 && XHR.status == 200) {
                var updated = JSON.parse(XHR.responseText).time.updated;
                var price = JSON.parse(XHR.responseText).bpi.EUR.rate;
                var code = JSON.parse(XHR.responseText).bpi.EUR.code;
                span.innerHTML = price + ' ' + code;
                time.innerHTML = updated;
            }
        }
    }

    XHR.open("GET","https://api.coindesk.com/v1/bpi/currentprice.json");
    XHR.send();
            
}