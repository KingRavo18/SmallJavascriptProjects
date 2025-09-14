fetch("../Assets/sidebar/sidebar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data; 
    })