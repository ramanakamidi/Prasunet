let display= document.getElementById("display");
let startTime;
let elapsedTime=0;
let timerInterval;
let running=false;
let startStopBtn =document.getElementById("start-Stop");
let resetBtn=document.getElementById("reset-btn");
let lap =document.getElementById("lap");
let laps=[];
let showLaps=document.querySelector(".show");



function toggleTime(){
    if(!running){
        running = true;
        startStopBtn.innerHTML="Stop";
        startStopBtn.style.color="red"
        


        startTime = Date.now ()- elapsedTime;
        timerInterval= setInterval(()=>{
            elapsedTime= Date.now()-startTime;
            
            display.innerHTML= updateDisplay(elapsedTime);

        },1000)
    }
    else {

        running = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.style.color="black";
        clearInterval(timerInterval);
} 
}
  function resetTimer(){
    elapsedTime=0;
    running=false;
    startTime=0;
    clearInterval(timerInterval);
    startStopBtn.innerHTML="Start";
    startStopBtn.style.color="white";
    laps=[];
    showLaps.innerHTML="";
    display.innerHTML=updateDisplay(elapsedTime);
    

}

function updateDisplay(elapsedTime){
    
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

}

function lapRecord(){
laps.push(elapsedTime);
if(running){
    displayLaps();
}



}
function displayLaps(){
    showLaps.innerHTML="";
    laps.map((lap,index)=>{
        let itemLap=document.createElement("li");
        itemLap.innerHTML=`Lap ${index + 1}:${ updateDisplay(lap)}`;
        showLaps.appendChild(itemLap);
    })
}



startStopBtn.addEventListener("click",toggleTime);
resetBtn.addEventListener("click",resetTimer);
lap.addEventListener("click",lapRecord);