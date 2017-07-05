// thanks to https://gist.github.com/rjrodger/1011032
window.onload = function() {

    // INITIALIZE CANVAS

    document.ontouchmove = function(e){ e.preventDefault(); }

    var canvas  = document.getElementById('main');
    var canvastop = canvas.offsetTop
    var context = canvas.getContext("2d");

    var lastx;
    var lasty;

    context.strokeStyle = "#000000";
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    // WE WANT TO RECORD THEIR DRAWING TO SEND TO DISPLAY

    var drawing = [];

    // FIND THE UI ELEMENTS

    var clearButton = document.getElementById('clear');
    var submitButton = document.getElementById('submit');
    var messageInput = document.getElementById('message');
    var body = document.getElementsByTagName('body')[0];

    // FUNCTIONS 

    function drawing_add_point(x, y) {
        drawing.push({x: x, y: y, t: Date.now()});
    }

    function dot(x,y) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(x,y,1,0,Math.PI*2,true);
        context.fill();
        context.stroke();
        context.closePath();
    }

    function line(fromx,fromy, tox,toy) {
        context.beginPath();
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.stroke();
        context.closePath();
    }

    canvas.ontouchstart = function(event){                   
        event.preventDefault();                 

        lastx = event.touches[0].clientX;
        lasty = event.touches[0].clientY - canvastop;

        dot(lastx,lasty);
        drawing_add_point(lastx,lasty);
    }

    canvas.ontouchmove = function(event){                   
        event.preventDefault();                 

        var newx = event.touches[0].clientX;
        var newy = event.touches[0].clientY - canvastop;

        line(lastx,lasty, newx,newy);
        drawing_add_point(newx,newy);

        lastx = newx;
        lasty = newy;
    }

    function clear() {
        context.fillStyle = "#ffffff";
        context.rect(0, 0, 300, 300);
        context.fill();

        messageInput.value = "";

        drawing = [];
    }

    function submit() {
        console.log('message:', messageInput.value);
        console.log('drawing:', drawing);
        body.append(messageInput.value);
        body.append(JSON.stringify(drawing));
        clear();
    }   

    // HOOK UP EVENT LISTENERS

    clearButton.onclick = clear;
    clear();

    //submitButton.onclick = submit;
    submitButton.onclick = submit;

}
