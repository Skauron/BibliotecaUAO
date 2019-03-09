var width = 1150;
var height = 400;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function buildStage(images) {
    var pc = new Konva.Image({
        image: images.free,
        x: 60,
        y: 60,
        width: 60,
        height: 60,
        id: '01'
    });

    pc.on('mouseover', function () {
        console.log("Entre");
        document.getElementById("container").style.cursor = 'url("../Img/Cursor.png"), auto';
        document.getElementById("BIBLIO").innerHTML = "BIBLIO NUMERO "+pc.id();
    });

    pc.on('mouseout', function () {
        console.log("Sali");
        document.getElementById("container").style.cursor = 'url("../Img/Cursor_Pointer.png"), auto';
        
    });

    layer.add(pc);
    stage.add(layer);
}

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();

var sources = {
    free: '../img/monitor_free.png',
    busy: '../img/monitor_busy.png'
};

loadImages(sources, buildStage);