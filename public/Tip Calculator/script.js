function calculateTotal(){
    const cashAmount = Number(document.getElementById("cashAmount").value.trim()),
          tipPercentage = Number(document.getElementById("tipPercentage").value.trim()),
          result = document.getElementById("total"),
          formatCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD"});

    try{
        if(cashAmount <= 0 || isNaN(cashAmount)){
            throw new Error("Please enter a valid cash amount");
        }
        if(tipPercentage < 0 || isNaN(tipPercentage)){
            throw new Error("Please enter a valid tip percentage");
        }
    }catch(error){
        return alert(error.message);
    }

    const tipAmount = cashAmount * tipPercentage / 100;
    document.getElementById("tip").textContent = formatCurrency.format(tipAmount);
    result.textContent = formatCurrency.format(cashAmount + tipAmount);
}