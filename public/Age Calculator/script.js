function calculateAge(){
    const birthDateInput = document.getElementById("dateInput").value,
          result = document.getElementById("result"),
          currentDate = new Date(),
          birth = new Date(birthDateInput);

    if(!birthDateInput){
        return result.textContent = "Please enter your date of birth.";
    }
    if(currentDate < birth){
        return result.textContent = "Invalid date.";
    }

    let yearsOld = currentDate.getFullYear() - birth.getFullYear();
    if(currentDate.getMonth()< birth.getMonth()|| (currentDate.getMonth() === birth.getMonth() && currentDate.getDate() < birth.getDate())){
        yearsOld--;
    }

    const yearWord = yearsOld === 1 ? "year" : "years";

    result.textContent = `You are ${yearsOld} ${yearWord} old.`;
}