function login() {
    var user = document.getElementById('InputUser').value;
    var pass = document.getElementById('InputPass').value;
    if (user == "" || pass == "") {
        alert("El usuario o la contraseña no han sido completados");
    } else if (user != "carlos.garzon@uao.edu.co" || pass != "123") {
        alert("El usuario o la contraseña son incorrectos");
    } else {
        location.href = 'html/pc.html';
    }

}

function redirect(site) {
    location.href = site;
}

function setTime(time, workTime, percent) {
    var timer = document.getElementById('number-time');
    var work = document.getElementById('work-time');
    if (time > 100) {
        document.getElementById('number-time-div').style.width = "190px";
    } else {
        document.getElementById('number-time-div').style.width = "145px";
    }
    if (time >= 15 && time <= 30) {
        work.style.fontSize = "1.4em";
        document.getElementById('description-time').style.width = "200px";
    } else if (time >= 75 && time <= 90) {
        work.style.fontSize = "1.8em";
        document.getElementById('description-time').style.width = "209px";
    } else {
        work.style.fontSize = "1.8em";
        document.getElementById('description-time').style.width = "195px";
    }
    $('.chart').data('easyPieChart').update(percent);
    timer.innerHTML = time;
    work.innerHTML = workTime;
}

var IsLastPage = false

var timer = new Promise(
    function (resolve, reject) {
        setTimeout(() => {
            if (IsLastPage) {
                var reset = redirect("../index.html");
                resolve(reset);
            } else {
                var reason = new Error('Is not last page');
                reject(reason);
            }
        }, 5000);
    }
);

var lastpage = function () {
    timer
        .then(function (fullfield) {
            console.log(fullfield);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

function End(){
    IsLastPage = true;
    lastpage();
}