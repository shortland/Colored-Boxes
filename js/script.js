/*
* Ilan Kleiman
* December 5th 2016
* Colored Boxes - script.js
* http://ilankleiman.com
*/

//http://stackoverflow.com/a/1484514/2751668
// - "Note that this has a bias towards quite dark and unsaturated colors"

// Better Colors will solve this
// Color generation:
// http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
// Conversion:
// http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately

// purpose of Better Colors is to create nicer brighter colors through HSL then converting them to rgb format.

$(window).ready(function() {
    var max_per_line = 41;
    var max = max_per_line * ($(window).height()/($(window).width()/max_per_line));
    max = Math.floor(max);
    var rem = max % max_per_line;
    max = max + (max_per_line - rem);

    beginContentWriter(0, max);

    function beginContentWriter(num, maxy) {
        $("#content").append("<span class='newItems' id='newItem_" + num + "'></span>");

        if((num + 1) % ($(window).width()/($(window).width()/max_per_line)) == 0) {
            $("#content").append("<br/>\n");
        }

        var rgbColor = randColor();
        $("#newItem_" + num).css({"background-color" : "rgb(" + rgbColor + ")"});

        // now merged
        $("#newItem_" + num).css({"width" : $(window).width()/max_per_line, "height" : $(window).width()/max_per_line});
        $("#newItem_" + num).css({"left" : (num % max_per_line)*($(window).width()/max_per_line)});
        $("#newItem_" + num).css({"top" : Math.floor(num/max_per_line)*($(window).width()/max_per_line)});

        num++;
        
        if(num == maxy) {
            (function switchz() {
                var rgbColor = randColor();
                var t = Math.floor(Math.random() * maxy);
                $("#newItem_" + t).animate({"background-color" : "rgb(" + rgbColor + ")"}, 100);
                setTimeout(switchz, 0);
            })();
        }
        else {
            (function switchx() {
                var rgbColor = randColor();
                var t = Math.floor(Math.random() * maxy);
                $("#newItem_" + t).animate({"background-color" : "rgb(" + rgbColor + ")"}, 100);
            })();
            setTimeout(function(){beginContentWriter(num, maxy);}, 0);
        }
    }

    function randColor() {
        // use golden ratio
        var golden_ratio_conjugate = 0.618033988749895;
        var h = Math.random(); // use random start value
        h += golden_ratio_conjugate;
        h %= 1;
        return HSVtoRGB(h, 0.35, 0.995);
    }

    function HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255);
    }
});
