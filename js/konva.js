var width = 1150;
var height = 540;
var LastPcClicked = 0;

var arrPcs = [
    { width: 50, height: 50, state: 'free', index: "01", x: 1000, y: 440 }, //Primera fila
    { width: 50, height: 50, state: 'busy', index: "02", x: 1000, y: 390 },
    { width: 50, height: 50, state: 'busy', index: "03", x: 1000, y: 340 },
    { width: 50, height: 50, state: 'free', index: "04", x: 1000, y: 290 },
    { width: 50, height: 50, state: 'busy', index: "05", x: 1000, y: 240 },
    { width: 50, height: 50, state: 'busy', index: "06", x: 1000, y: 190 },
    { width: 50, height: 50, state: 'busy', index: "07", x: 1000, y: 140 },
    { width: 50, height: 50, state: 'busy', index: "08", x: 1000, y: 90 },  //Fin primera fila
    { width: 50, height: 50, state: 'busy', index: "09", x: 920, y: 440 },  //Segunda fila
    { width: 50, height: 50, state: 'busy', index: "10", x: 920, y: 390 },
    { width: 50, height: 50, state: 'busy', index: "11", x: 920, y: 340 },
    { width: 50, height: 50, state: 'busy', index: "12", x: 920, y: 290 },
    { width: 50, height: 50, state: 'free', index: "13", x: 920, y: 240 },
    { width: 50, height: 50, state: 'busy', index: "14", x: 920, y: 190 },
    { width: 50, height: 50, state: 'free', index: "15", x: 920, y: 140 },
    { width: 50, height: 50, state: 'busy', index: "16", x: 920, y: 90 },   //Fin segunda fila
    { width: 40, height: 40, state: 'busy', index: "17", x: 300, y: 440 },   //Tercer fila
    { width: 40, height: 40, state: 'free', index: "18", x: 300, y: 400 },
    { width: 40, height: 40, state: 'busy', index: "19", x: 300, y: 360 },
    { width: 40, height: 40, state: 'busy', index: "20", x: 300, y: 320 },
    { width: 40, height: 40, state: 'busy', index: "21", x: 300, y: 280 },
    { width: 40, height: 40, state: 'busy', index: "22", x: 300, y: 240 },
    { width: 40, height: 40, state: 'free', index: "23", x: 300, y: 200 },
    { width: 40, height: 40, state: 'busy', index: "24", x: 300, y: 160 },
    { width: 40, height: 40, state: 'busy', index: "25", x: 300, y: 120 },
    { width: 40, height: 40, state: 'busy', index: "26", x: 300, y: 80 },
    { width: 40, height: 40, state: 'free', index: "27", x: 300, y: 40 },   //Fin tercer fila
    { width: 40, height: 40, state: 'busy', index: "28", x: 220, y: 40 },   //Cuarta fila
    { width: 40, height: 40, state: 'busy', index: "29", x: 220, y: 440 },
    { width: 40, height: 40, state: 'busy', index: "30", x: 220, y: 400 },
    { width: 40, height: 40, state: 'busy', index: "31", x: 220, y: 360 },
    { width: 40, height: 40, state: 'busy', index: "32", x: 220, y: 320 },
    { width: 40, height: 40, state: 'busy', index: "33", x: 220, y: 280 },
    { width: 40, height: 40, state: 'busy', index: "34", x: 220, y: 240 },
    { width: 40, height: 40, state: 'free', index: "35", x: 220, y: 200 },
    { width: 40, height: 40, state: 'busy', index: "36", x: 220, y: 160 },
    { width: 40, height: 40, state: 'busy', index: "37", x: 220, y: 120 },
    { width: 40, height: 40, state: 'free', index: "38", x: 220, y: 80 },
    { width: 40, height: 40, state: 'free', index: "39", x: 220, y: 40 },   //Fin cuarta fila
    { width: 502, height: 400, state: 'mapa', index: "100", x: 380, y: 40 },   //Mapa
    { width: 68, height: 99.8, state: 'here', index: "101", x: 600, y: 430 }    //Here
];

var sources = {
    free: '../Img/monitor_free.png',
    busy: '../Img/monitor_busy.png',
    selected: '../Img/monitor_selected.png',
    mapa: '../Img/mapa_pc_entrada.png',
    here: '../Img/here.png'
};


function loadImages(pcs, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = pcs.length;
    for (var _pc of pcs) {
        const route = sources[_pc.state];
        images[_pc.index] = new Image();
        images[_pc.index].onload = function () {
            loadedImages++;
            if (loadedImages >= numImages) {
                callback(images);
            }
        };
        images[_pc.index].src = route;
        images[_pc.index].index = _pc.index;
        images[_pc.index].posX = _pc.x;
        images[_pc.index].posY = _pc.y;
        images[_pc.index].MyW = _pc.width;
        images[_pc.index].MyH = _pc.height;
        images[_pc.index].State = _pc.state;
    }
}

function buildStage(images) {
    for (var key of Object.keys(images)) {
        var objImg = images[key];
        let image = null;
        image = new Konva.Image({
            image: objImg,
            x: objImg.posX,
            y: objImg.posY,
            width: objImg.MyW,
            height: objImg.MyH,
            id: objImg.index
        });

        layer.add(image);
    }

    stage.add(layer);
    layer.on('mousedown', function (e) {
        const target = e.target;
        document.getElementById("container").style.cursor = 'url("../Img/Cursor.png"), auto';
        console.log(target);
        if (target.attrs.image.State == 'busy' || target.attrs.image.State == 'mapa' || target.attrs.image.State == 'here') {
            console.log("Click en un computador ocupado");
        } else {
            console.log("antes: " + LastPcClicked);
            document.getElementById("BIBLIO").innerHTML = "BIBLIO NUMERO " + target.attrs.id;
            target.attrs.image.src = sources['selected'];
            if (LastPcClicked != target.attrs.id) {
                //Deselecciona el último pc;
            }
            LastPcClicked = target.attrs.id;
            console.log("despues: " + LastPcClicked);
        }
    });
    layer.on('mouseover', function (e) {
        const target = e.target;
        document.getElementById("container").style.cursor = 'url("../Img/Cursor.png"), auto';
    });
    layer.on('mouseout', function (e) {
        document.getElementById("container").style.cursor = 'url("../Img/Cursor_Pointer.png"), auto';
    });
}

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();


loadImages(arrPcs, buildStage);