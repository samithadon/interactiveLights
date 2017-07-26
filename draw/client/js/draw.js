var CanvasManager = function(id) {
    // thanks to https://gist.github.com/rjrodger/1011032

    document.ontouchmove = function(e){ e.preventDefault(); }

    var canvas  = document.getElementById(id);
    var canvastop = canvas.offsetTop
    var context = canvas.getContext("2d");

    context.strokeStyle = "#000000";
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    function dot(x,y,color) {
        context.beginPath();
        context.fillStyle = color;
        context.strokeStyle = color;
        context.arc(x,y,1,0,Math.PI*2,true);
        context.fill();
        context.stroke();
        context.closePath();
    }

    function clear() {
        console.log('CanvasManager clear');
        context.fillStyle = "#ffffff";
        context.rect(0, 0, 300, 300);
        context.fill();
    }
    clear();

    function touch_handler(ev) {
        ev.preventDefault();                 
        var x = ev.touches[0].clientX;
        var y = ev.touches[0].clientY - canvastop;
        if (drw) drw.add_point(x, y);
    };

    function mouse_handler(ev) {
        var x = ev.clientX;
        var y = ev.clientY - canvastop;
        if (drw && ev.which == 1) drw.add_point(x, y);
    };

    canvas.ontouchstart = touch_handler;
    canvas.ontouchmove = touch_handler;
    canvas.onmousedown = mouse_handler;
    canvas.onmousemove = mouse_handler;

    var drw = null;
    function link_to_animation(a) {
        drw = a;
    }

    return {
        dot: dot,
        clear: clear,
        link_to_animation: link_to_animation,
        width: canvas.width,
        height: canvas.height,
    };
}

var animation = function(canv) {

    /////////////////////////////////////////////
    // SETTINGS ////////////////////////////////
    // how finely we pixelate the grid ////////
    //////////////////////////////////////////
    var r = 5;
    var xsp = 5;
    var ysp = 5;
    var dt = 20; // we only care about things at the granularity of 20ms

    var headers = ['x','y','i','j'];
   
    ///////////////////////////////////////////// 
    // HELPER FUNCTIONS ////////////////////////
    // grid locations, indices, etc ///////////
    //////////////////////////////////////////

    // convert x,y to i,j
    function grid_ij(x,y) {
        var j = Math.floor(y / (ysp + 2*r));
        var i = j%2 ? Math.floor((x-xsp/2-r)/(xsp+2*r)) : Math.floor(x/(xsp+2*r));
        return [i,j];
    }
    var min_ij = grid_ij(0,0);
    var max_ij = grid_ij(canv.width, canv.height);

    // convert i,j to x,y
    function grid_xy(i,j) {
        var x = i*(xsp + 2*r) + (j%2)*(xsp/2+r);
        var y = j*(ysp + 2*r);
        return [x,y];
    }

    // the index in __a__ where the point (x,y,i,j) is stored
    function a_index(i,j) {
        return i*(max_ij[1] + 1) + j;
    }

    // INITIALIZE A FOR ALL GRID POINTS
    // and add a first 'frame' at t='0' where it is all 0's
    // __a__ stores the animation in the format
    // (leave headers off for now)
    // a.x = [x1, x2, x3, ... ] x coords of all grid points
    // a.y = [y1, y2, y3, ... ] y coords of all grid points
    // a.i = [i1, i2, i3, ... ] i indices of all grid points
    // a.j = [j1, j2, j3, ... ] j indices of all grid points
    // a.times = [t1, t2, ... ] for all the frames of the animation
    // a.frames = {
    //      JSON.stringify(t1) : [ 0 or 1 for each grid point ],
    //      JSON.stringify(t2) : [ 0 or 1 for each grid point ], 
    //      ...
    // }
    var a = {};
    function init() { // TODO i think something fishy is happening with scope here, overwriting a is not working
        console.log('animation init');
        a = {};
        _.each(headers, function(h) {
            a[h] = [];
        });
        a.times = [];
        a.frames = {};
        var t = 0;
        a.times.push(t);
        a.frames[JSON.stringify(t)] = [];
        for (var i = min_ij[0]; i <= max_ij[0]; i++) {
            // TODO i think j=min_ij[0] is a bug that just happens to work because the canvas is square, i think it should be j=min_ij[1]
            for (var j = min_ij[0]; j <= max_ij[0]; j++) {
                var xy = grid_xy(i,j);            
                a.x.push(xy[0]);
                a.y.push(xy[1]);
                a.i.push(i);
                a.j.push(j);
                canv.dot(xy[0],xy[1],"#606060");
                a.frames[JSON.stringify(t)].push(0);
            }
        }
        console.log('initialized a', a);
    }
    init();

    // as people draw on canvas, immediately add points to queue
    // this queue will periodically get added to the animation frames
    var points_to_add = [];
    function add_point(x,y) {
        // x,y are the x,y from the canvas event. not aligned to grid yet
        // get the closest i,j grid point for x,y
        var ij = grid_ij(x,y);
        points_to_add.push(ij);

        // draw on the grid
        var xy = grid_xy(ij[0],ij[1]);
        canv.dot(xy[0], xy[1], "#FF0000");
    }

    // every __dt__ ms, add the points in queue to an animatio frame
    setInterval(function() {
        var points = points_to_add;
        points_to_add = [];

        // create a new frame for the incoming points
        var t = _.last(a.times) + dt;
        a.times.push(t);
        a.frames[JSON.stringify(t)] = _.clone(a.frames[JSON.stringify(t-dt)]);

        // add the points to the new frame
        _.each(points, function(p) {
            var i = p[0];
            var j = p[1];
            a.frames[JSON.stringify(t)][a_index(i,j)] = 1;
        });
    }, dt);

    function get_csv() {
        var csv = '';
        var row = [];
        row = row.concat(headers);
        row = row.concat(a.times);
        csv += row.join(',');
        _.each(a.x, function(x, index) {
            row = [];
            _.each(headers, function(h) {
                row.push(a[h][index]);
            });
            _.each(a.times, function(t) {
                row.push(a.frames[JSON.stringify(t)][index]);
            });
            csv += '\n' + row.join(',');
        });
        return csv;
    }

    return {
        add_point: add_point,
        get_csv: get_csv,
        init: init,
        // TODO remove this later
        a: a,
    };
}

window.onload = function() {
    var socket = io('/draw');

    console.log('socket', socket);

    var canvMgr = CanvasManager('main');
    var drawing = animation(canvMgr);
    canvMgr.link_to_animation(drawing); // TODO kinda hacky

    var messageInput = document.getElementById('message');
    var localIPInput = document.getElementById('localIP');
   
    function clear() {
        canvMgr.clear();
        messageInput.value = '';
        drawing.init();
    }

    function submit() {
        var msg = messageInput.value;
        var localIP = localIPInput.value;
        var csv = drawing.get_csv();
        // need id, count of msgs sent, message is csv
        var data = { message: msg,csv:csv };
        // http://192.168.43.119/login
        console.log('socket emitting csvAnm with data', data);
        socket.emit("csvAnm",data, function(d) {
            console.log('got socket reply back', d);
        });




        // TODO send the animation to the display
        clear();
    }   

    // HOOK UP EVENT LISTENERS

    var h_clear = new Hammer(document.getElementById('clear'));
    h_clear.on('tap', clear);

    var h_submit = new Hammer(document.getElementById('submit'));
    h_submit.on('tap', submit);
   
}

