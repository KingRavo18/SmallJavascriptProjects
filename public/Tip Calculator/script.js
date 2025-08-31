function calculateTotal(){
    const cashAmount = document.getElementById("cashAmount"),
          tipPercentage = document.getElementById("tipPercentage"),
          result = document.getElementById("total");

        if(Number(cashAmount.value) === 0 || cashAmount.value < 0 || tipPercentage.value < 0){
            result.style.color = "red";
            result.style.fontSize = "100%";
            if(Number(cashAmount.value) === 0){
                result.textContent = "Please enter a cash amount";
            }else{
                result.textContent = "Both inputs must contain positive values";
            }
            return;
        }

    result.style.color = "black";
    result.style.fontSize = "150%";
    result.textContent = (Number(cashAmount.value) + (cashAmount.value / 100 * tipPercentage.value)).toFixed(2);
}