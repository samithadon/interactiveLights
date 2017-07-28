function CanvasManager(canvas_id, colorpicker_id) {
    // thanks to https://gist.github.com/rjrodger/1011032

    ///////////////////////////////////////////////////
    // INITIALIZATION ////////////////////////////////
    /////////////////////////////////////////////////
    
    // prevent touch event from scrolling, touch event events will draw instead
    document.ontouchmove = function(e){ e.preventDefault(); }

    // create the canvas
    var canvas  = document.getElementById(canvas_id);
    var context = canvas.getContext("2d");

    // settings
    context.strokeStyle = "#000000";
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    // empty drawing for now, will create it later in 'clear' function
    var drawing = null;

    /////////////////////////////////////////////////////////////////
    // EVENT HANDLERS //////////////////////////////////////////////
    // draw dots and record animation in response to user touch ///
    //////////////////////////////////////////////////////////////

    function touch_handler(ev) {
        ev.preventDefault();                 
        var x = ev.touches[0].clientX - canvas.offsetLeft;
        var y = ev.touches[0].clientY - canvas.offsetTop;
        var color = $('#' + colorpicker_id).val();
        var gridpoints = drawing.record_point(x, y, color);
        dot(gridpoints.x, gridpoints.y, color);
    };

    function mouse_handler(ev) {
        if (ev.which != 1) return;
        var x = ev.clientX - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetTop;
        var color = $('#' + colorpicker_id).val();
        var gridpoints = drawing.record_point(x, y, color);
        dot(gridpoints.x, gridpoints.y, color);
    };

    canvas.ontouchstart = touch_handler;
    canvas.ontouchmove = touch_handler;
    canvas.onmousedown = mouse_handler;
    canvas.onmousemove = mouse_handler;

    /////////////////////////////////////////////
    // HELPER FUNCTIONS ////////////////////////
    // actually drawing stuff to the canvas ///
    //////////////////////////////////////////

    function dot(x,y,color) {
        context.beginPath();
        context.fillStyle = '#'+color;
        context.strokeStyle = '#'+color;
        context.arc(x,y,1,0,Math.PI*2,true);
        context.fill();
        context.stroke();
        context.closePath();
    }

    function clear() {
        console.log('CanvasManager clear');

        drawing = animation(canvas.width, canvas.height);

        context.fillStyle = "#ffffff";
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        var grid = drawing.get_grid();
        _.each(grid, function(p) {
            dot(p.x, p.y, '606060');
        });
    }

    /////////////////////////////
    // DRAW EMPTY CANVAS ///////
    ///////////////////////////
    
    clear();

    return {
        dot: dot,
        clear: clear,
        get_csv: drawing.get_csv,
    };
}

function animation(canvas_width, canvas_height) {

    /////////////////////////////////////////////
    // SETTINGS ////////////////////////////////
    // how finely we pixelate the grid ////////
    //////////////////////////////////////////
    var r = 4;
    var xsp = 2;
    var ysp = 4;
    var padding = 4;

    var dt = 20; // we only care about things at the granularity of 20ms

    var headers = ['x','y','i','j'];
   
    ///////////////////////////////////////////// 
    // HELPER FUNCTIONS ////////////////////////
    // grid locations, indices, etc ///////////
    //////////////////////////////////////////

    // convert x,y to i,j
    function grid_ij(x,y) {
        x = Math.max(x - padding, 0);
        y = Math.max(y - padding, 0);
        var j = Math.floor(y / (ysp + 2*r));
        var i = j%2 ? Math.floor((x-xsp/2-r)/(xsp+2*r)) : Math.floor(x/(xsp+2*r));
        return [i,j];
    }
    var min_ij = grid_ij(0,0);
    var max_ij = grid_ij(canvas_width, canvas_height);
    console.log('max i', max_ij[0], 'max j', max_ij[1]);

    // convert i,j to x,y
    function grid_xy(i,j) {
        var x = i*(xsp + 2*r) + (j%2)*(xsp/2+r);
        var y = j*(ysp + 2*r);
        x += padding;
        y += padding;
        return [x,y];
    }

    // the index in __a__ where the point (x,y,i,j) is stored
    function a_index(i,j) {
        return i*(max_ij[1] + 1) + j;
    }

    // get all the times we have frames for
    function get_all_frame_times() {
        var times_as_strings = _.keys(a.frames);
        var times_as_numbers = _.map(times_as_strings, function(t) {
            return JSON.parse(t);
        });
        var times_sorted = _.sortBy(times_as_numbers, function(t) {
            return t;
        });
        return times_sorted;
    }

    ////////////////////////////////////////////////////////////////
    // INITIALIZATION /////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    // __a__ stores the animation as the user creates it
    // we also add a first 'frame' at t='0' where it is all 0's
    // (leave headers off for now)
    // format of __a__
    // a.x = [x1, x2, x3, ... ] x coords of all grid points
    // a.y = [y1, y2, y3, ... ] y coords of all grid points
    // a.i = [i1, i2, i3, ... ] i indices of all grid points
    // a.j = [j1, j2, j3, ... ] j indices of all grid points
    // a.frames = {
    //      JSON.stringify(t1) : [ 0 or the color hexcode for each grid point ],
    //      JSON.stringify(t2) : [ 0 or the color hexcode for each grid point ],
    //      ...
    // }
    var T = 0; // times for a.frames
    var a = {};
    console.log('animation init');
    a = {};
    _.each(headers, function(h) {
        a[h] = [];
    });
    a.frames = {};
    a.frames[JSON.stringify(T)] = [];
    for (var i = min_ij[0]; i <= max_ij[0]; i++) {
        for (var j = min_ij[1]; j <= max_ij[1]; j++) {
            var xy = grid_xy(i,j);            
            a.x.push(xy[0]);
            a.y.push(xy[1]);
            a.i.push(i);
            a.j.push(j);
            a.frames[JSON.stringify(T)].push(0);
        }
    }
    console.log('initialized a', a);

    ////////////////////////////////////////////////////////////////////////
    // UPDATING ANIMATION AS USERS DRAW ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    // as people draw on canvas, immediately add points to queue
    // this queue will periodically get added to the animation frames
    var points_to_add = [];
    function record_point(x, y, color) {
        // x,y are the x,y from the canvas event. not aligned to grid yet
        // get the closest i,j grid point for x,y
        var ij = grid_ij(x,y);

        points_to_add.push({
            i: ij[0],
            j: ij[1],
            color: color    
        });

        var xy = grid_xy(ij[0],ij[1]);

        return {x: xy[0], y: xy[1]};
    }

    // every __dt__ ms, add the points in queue to an animatio frame
    setInterval(function() {
        var points = points_to_add;
        points_to_add = [];

        // create a new frame for the incoming points
        T += dt;
        a.frames[JSON.stringify(T)] = _.clone(a.frames[JSON.stringify(T-dt)]);

        // add the points to the new frame
        _.each(points, function(p) {
            var i = p.i;
            var j = p.j;
            a.frames[JSON.stringify(T)][a_index(i,j)] = p.color;
        });
    }, dt);

    ///////////////////////////////////////////////////////////////////////
    // CLEANING UP THE FRAMES BEFORE SENDING OUT THE CSV /////////////////
    /////////////////////////////////////////////////////////////////////

    function remove_empty_frames_from_beginning_and_end() {
        var times = get_all_frame_times();

        // a helper function for use below
        // if the frame is empty (all 0's) returns true and sets the frame to null, else returns false
        function is_empty_also_nullify_if_empty(ti) {
            var t = JSON.stringify(times[ti]);
            if (_.max(a.frames[t]) == 0) {
                a.frames[t] = null;
                return true;
            } else {
                return false;
            }
        }

        // from the beginning, set each frame to null if it contains all 0's
        for (var ti = 0; ti < times.length; ti++) {
            if(!is_empty_also_nullify_if_empty(times[ti])) {
                break; // stop when we reach a nonempty frame
            }
        }

        // from the end, set each frame to null if it contains all 0's
        for (var ti = times.length-1; ti >= 0; ti--) {
            if(!is_empty_also_nullify_if_empty(times[ti])) {
                break; // stop when we reach a nonempty frame
            }
        }

        // just keep the nonempty frames, starting time at 0 again
        var frames_copy = a.frames;
        a.frames = {};
        var t = 0;
        _.each(frames_copy, function(frame) {
            if (frame) {
                a.frames[JSON.stringify(t)] = frame;
                t += dt;
            }
        });
    }

    ///////////////////////////////////////////////////////////////
    // EXTERNAL FACING FUNCTIONS /////////////////////////////////
    /////////////////////////////////////////////////////////////

    // get the animation csv which is sent to processing
    function get_csv() {
        remove_empty_frames_from_beginning_and_end();

        var csv = '';
        var row = [];

        // first row of csv is the grid points x,y,i,j, then the times
        row = row.concat(headers);
        row = row.concat(get_all_frame_times());
        csv += row.join(',');

        // for each grid point
        console.log('getting csv for a', a);
        _.each(a.x, function(x, index) {
            row = [];

            // record its x,y,i,j coordinates
            _.each(headers, function(h) {
                row.push(a[h][index]);
            });

            // record its changes over time
            _.each(a.frames, function(frame) {
                row.push(frame[index]);
            });

            // add this as a row to the csv
            csv += '\n' + row.join(',');
        });

        return csv;
    }

    // get all the points on the grid x, y, i, j
    function get_grid() {
        // makes an array of each point in the grid, for each point
        return _.map(a.x, function(x, index) {
            // store the headers x,y,i,j for that point in an object
            var p = {};
            _.each(headers, function(h) {
                p[h] = a[h][index];
            });
            return p;
        });
    }

    return {
        record_point: record_point,
        get_csv: get_csv,
        get_grid: get_grid,
    };
}

window.onload = function() {
    var socket = io('/draw');
    console.log('socket', socket);

    var canvMgr = CanvasManager('main', 'colorpicker');

    var messageInput = document.getElementById('message');
   
    // HOOK UP EVENT LISTENERS

    // when the user taps the clear button
    (new Hammer(document.getElementById('clear'))).on('tap', function() {
        //canvMgr.clear();
        location.reload();
        // TODO canvMgr.clear() for some reason does not really clear out the animation.... not sure why!! do not want to spend any more time debugging it given the current project timeline. so just reloading the whole page as a workaround... 
    });

    // when the user taps the submit-drawing button
    (new Hammer(document.getElementById('submit-drawing'))).on('tap', function() {
        var csv = canvMgr.get_csv();
        var data = { message: 'empty message', csv:csv };
        console.log('socket emitting csvAnm with data', data);
        socket.emit("csvAnm",data, function(d) {
            console.log('got socket reply back', d);
        });
        $('#drawing-page').addClass('hide');
        $('#feedback-page').removeClass('hide');
    });

    // when the user taps the submit-feedback button
    (new Hammer(document.getElementById('submit-feedback'))).on('tap', function () {
        var user_description = $('#feedback-describe').val();
        var user_location = $('#feedback-location').val();
        var data = {description: user_description, place: user_location};
        console.log('socket emitting feedback event with data', data);
        socket.emit("feedback", data, function(d) {
            console.log('got socket reply back', d);
        });
    });
}

