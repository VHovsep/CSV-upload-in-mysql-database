function readf(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let a = this.responseText;
            alert(a);
        }
    };

    xhttp.open('POST', '/okay',true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}
