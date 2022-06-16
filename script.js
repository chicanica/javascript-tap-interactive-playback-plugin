//Ссылки на видео в порядке очереди
const videos = [];

//Список еще непросмотренных видео 
let currentVideos = videos.concat();

const video = document.querySelector('video');
video.addEventListener("ended", timerStart);

const button = document.querySelector('.buttonPlay');
const timerValue = document.querySelectorAll('.timerValue');
const duration = 100;

//Цвета для таймера
const defaultColor = "#ffffff";
const transitionColor = "#ff2a2a";

//Начало игры
function start(){
    playVideo();
    document.querySelector(".containerTimer").style.display = "block";
}

//Запуск следующего видео
function playVideo(){
    while (video.lastElementChild) {
        video.removeChild(video.lastElementChild);
    }
    let source = document.createElement('source');
    source.setAttribute('src', currentVideos[0]);
    source.setAttribute('type', 'video/mp4');
    video.appendChild(source);
    currentVideos.shift();
    document.querySelector(".containerControls").style.display = "none";
    video.load();
    video.play();
}

//Запуск таймера
function timerStart() {
    document.querySelector(".containerControls").style.display = "block";
    
    for(let i = 0; i < timerValue.length; i++){
        timerValue[i].innerHTML = duration;
        timerValue[i].style.color = defaultColor;
    }

    let timerID = setInterval(Timer, 1000);
    let timeoutID = setTimeout(()=>{
        clearInterval(intervalID);
        clearInterval(timerID);
        alert("Game is over");
        location.reload();
    }, duration*1000+150);
    
    let timeStart = Date.now();
    let intervalID = setInterval(()=>{
        let timeNow = Date.now();
        let timePassed = timeNow - timeStart;
        if (timePassed <= (duration * 1000) ){
            let progress = timePassed / (duration * 1000);
            let currAngle = progress * angle;
            clearLine();
            fillLine(currAngle);
        }
    }, 10);

    button.onclick = () => {
        clearInterval(intervalID);
        clearInterval(timerID);
        clearTimeout(timeoutID);
        playVideo(); 
    }
};

//Динамическое отображение времени таймера, перемещение кнопки play
function Timer(){ 
    for(let i = 0; i < timerValue.length; i++){
        timerValue[i].innerHTML = parseInt(timerValue[i].innerHTML) - 1;
        if (timerValue[i].innerHTML <= duration*0.3){
            timerValue[i].style.color = transitionColor;
        }    
    };
    
    button.style.left = randomIntFromInterval(25, 75) + "%";
    button.style.top = randomIntFromInterval(25, 75) + "%";
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Угол дуг таймера
const angle = 36;

//Параметры дуг таймера
const canvasSL = document.getElementById("canvasShadowLeft")
const ctxSL = canvasSL.getContext("2d")
ctxSL.strokeStyle = defaultColor;
ctxSL.lineWidth = 20;
ctxSL.globalAlpha = 0.4;

const canvasSR = document.getElementById("canvasShadowRight")
const ctxSR = canvasSR.getContext("2d")
ctxSR.strokeStyle = defaultColor;
ctxSR.lineWidth = 20;
ctxSR.globalAlpha = 0.4;

const canvasLL = document.getElementById("canvasLineLeft")
const ctxLL = canvasLL.getContext("2d")
ctxLL.strokeStyle = defaultColor;
ctxLL.lineWidth = 5;
ctxLL.globalAlpha = 1;

const canvasLR = document.getElementById("canvasLineRight")
const ctxLR = canvasLR.getContext("2d")
ctxLR.strokeStyle = defaultColor;
ctxLR.lineWidth = 5;
ctxLR.globalAlpha = 1;

//Прогресс дуг таймера
function fillLine(currAngle){
    ctxSL.strokeStyle = transitionColor;
    ctxSL.beginPath();
    ctxSL.arc(930, 250, 800, degreesToRadians(180 - currAngle / 2), degreesToRadians(180 + currAngle / 2));
    ctxSL.stroke();

    ctxLL.strokeStyle = transitionColor;
    ctxLL.beginPath();
    ctxLL.arc(915, 250, 800, degreesToRadians(180 - currAngle / 2 - (0.3 * currAngle / angle)), degreesToRadians(180 + currAngle / 2 + (0.3 * currAngle / angle)));
    ctxLL.stroke();
    
    ctxSR.strokeStyle = transitionColor;
    ctxSR.beginPath();
    ctxSR.arc(-630, 250, 800, degreesToRadians(360 - currAngle / 2), degreesToRadians(360 + currAngle / 2));
    ctxSR.stroke();

    ctxLR.strokeStyle = transitionColor;
    ctxLR.beginPath();
    ctxLR.arc(-615, 250, 800, degreesToRadians(360 - currAngle / 2 - (0.3 * currAngle / angle)), degreesToRadians(360 + currAngle / 2 + (0.3 * currAngle / angle)));
    ctxLR.stroke();
}

//Отрисовка дуг таймера
function clearLine(){
    ctxSL.clearRect(0, 0, canvasSL.width, canvasSL.height);
    ctxSL.strokeStyle = defaultColor;
    ctxSL.beginPath();
    ctxSL.arc(930, 250, 800, degreesToRadians(180 - angle / 2), degreesToRadians(180 + angle / 2));
    ctxSL.stroke();

    ctxLL.clearRect(0, 0, canvasLL.width, canvasLL.height);
    ctxLL.strokeStyle = defaultColor;
    ctxLL.beginPath();
    ctxLL.arc(915, 250, 800, degreesToRadians(180 - angle / 2 - 0.3), degreesToRadians(180 + angle / 2 + 0.3));
    ctxLL.stroke();

    ctxSR.clearRect(0, 0, canvasSR.width, canvasSR.height);
    ctxSR.strokeStyle = defaultColor;
    ctxSR.beginPath();
    ctxSR.arc(-630, 250, 800, degreesToRadians(360 - angle / 2), degreesToRadians(360 + angle / 2));
    ctxSR.stroke();

    ctxLR.clearRect(0, 0, canvasLR.width, canvasLR.height);
    ctxLR.strokeStyle = defaultColor;
    ctxLR.beginPath();
    ctxLR.arc(-615, 250, 800, degreesToRadians(360 - angle / 2 - 0.3), degreesToRadians(360 + angle / 2 + 0.3));
    ctxLR.stroke();
}

function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}
