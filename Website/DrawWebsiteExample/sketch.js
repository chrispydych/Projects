// Keep track of our socket connection
var socket;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(15);

    socket = io.connect('http://localhost:8080');

    socket.on('mouse',
        // When we receive data
        function (data) {
            console.log("Got: " + data.x + " " + data.y);
            // Draw a blue circle
            fill(0, 0, 255);
            noStroke();
            ellipse(data.x, data.y, 80, 80);
        }
    );
}

function draw() {

}

function mouseDragged() {
    // Draw white circles
    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 80, 80);
    // Send the mouse coordinates
    sendmouse(mouseX, mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
    // We are sending!
    console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with  and y
    var data = {
        x: xpos,
        y: ypos
    };

    // Send that object to the socket
    socket.emit('mouse', data);
}
