document.addEventListener("DOMContentLoaded", retrieveData);

function submitTask(){

}

function retrieveData(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./retrieveData.php", true);

    xhr.onload = function(){
        if(this.status === 200){
            const tasks = JSON.parse(this.responseText);
            let output = "";

            tasks.forEach(task => {
                output += `<li>
                    ${task.task}
                    <div>
                        <button>✅</button>
                        <button>🗑️</button>
                    </div>
                </li>`;
            });
            document.getElementById("taskContianer").innerHTML = output;
        }
    }
    xhr.send();
}