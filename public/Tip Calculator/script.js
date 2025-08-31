function calculateTotal(){
    const cashAmount = Number(document.getElementById("cashAmount").value.trim()),
          tipPercentage = Number(document.getElementById("tipPercentage").value.trim()),
          result = document.getElementById("total");

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

    document.getElementById("tip").textContent = "$" + (cashAmount / 100 * tipPercentage).toFixed(2);
    result.textContent = "$" + (cashAmount + (cashAmount / 100 * tipPercentage)).toFixed(2);
}