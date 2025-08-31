function calculateTotal(){
    const cashAmount = Number(document.getElementById("cashAmount").value.trim()),
          tipPercentage = Number(document.getElementById("tipPercentage").value.trim()),
          result = document.getElementById("total");

        if(cashAmount <= 0 || tipPercentage < 0 || isNaN(cashAmount) || isNaN(tipPercentage)){
            return window.alert(cashAmount === 0 ? "Please enter a valid cash amount" : "Both inputs must contain positive values");
        }
        
    document.getElementById("tip").textContent = "$" + (cashAmount / 100 * tipPercentage).toFixed(2);
    result.textContent = "$" + (cashAmount + (cashAmount / 100 * tipPercentage)).toFixed(2);
}