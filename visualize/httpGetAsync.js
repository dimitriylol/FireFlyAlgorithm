function httpGetAsync (theUrl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', theUrl, true);
    xhr.onload = function() {
        // Get the data
        callback(this.responseText);
    };
    xhr.onerror = function() {
        alert('Fucked up :( ' + this.status);
    };
    xhr.send();
}
