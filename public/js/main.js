var socket = io("http://localhost:3000");

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('YOUR API KEY');

}

function search(query) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query

    });

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    socket.emit("youtube", JSON.stringify(response, '', 2));
}

socket.on("connect", function() {
    setTitle("Connected");
});

socket.on("message", function(message) {
    printMessage(message);
});

document.forms[0].onsubmit = function() {
    var input = document.getElementById("message");
    printMessage(input.value);
    search(input.value);
    socket.emit("chat", input.value);
    input.value = '';
};

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement("p");
    p.innerText = message;
    document.querySelector("div.messages").appendChild(p);
}
