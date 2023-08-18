const currentTime = document.getElementById("time");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const meridiemElem = document.getElementById("AM-PM");
const alarmList = document.getElementById("alarms-list"); 
const hour = document.getElementById("hour-hand"); 
const minute = document.getElementById("minute-hand"); 
const second = document.getElementById("second-hand"); 
let time = "";
let latestAlarmId = 0;

// function to set current time 
function setCurrTime(){
    let today = new Date();
    let hours = today.getHours() % 12 < 10? "0" + today.getHours() % 12: today.getHours() % 12;
    let minutes = today.getMinutes() < 10 ? "0"+ today.getMinutes() : today.getMinutes();
    let seconds = today.getSeconds() < 10 ? "0" + today.getSeconds(): today.getSeconds();
    let meridiem = today.getHours() >= 12 ? "PM" : "AM";
    hours = hours==="00"?"12":hours; // making hours display 12 instead of 00
    let currTime = hours + ":" + minutes + ":" + seconds + " " + meridiem;
    currentTime.innerHTML = currTime;
    time = currTime;
    requestAnimationFrame(setCurrTime);
}

setCurrTime();

// function for setting clock 
function setClock(){
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;
 
    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;

    requestAnimationFrame(setClock);
}

setClock();


// function to add alarm
function addAlarm(){
    let hour = hours.value < 10 ? "0" + hours.value%10 : hours.value;
    hour = hour === "00" ? "12" : hour;
    let minute = minutes.value < 10 ? "0" + minutes.value%10 : minutes.value;
    let second = seconds.value < 10 ? "0" + seconds.value%10 : seconds.value;
    if(hour>12 || minute>60 || second>60){
        alert("enter a valid Time");
        return;
    }
    let meridiem = meridiemElem.value;
    let newAlarm = hour + ":" + minute + ":" + second + " " + meridiem; 
    const listElem = document.createElement("li");
    listElem.className = "saved-alarms";
    listElem.setAttribute("id","alarm" + ++latestAlarmId)
    const content = 
    `
    <div class="alarm-time" id="alarm-${latestAlarmId}">${newAlarm}</div>
    <button class="delete-alarm" id="delete${latestAlarmId}" onclick="deleteAlarm(this.id)">Delete</button>
    `;
    listElem.innerHTML = content;
    alarmList.appendChild(listElem);
}



// function to delete an alarm
function deleteAlarm(id){
    const currId  = id.slice(6);
    const elem = document.getElementById("alarm"+ currId);
    elem.remove();
}


// alert on alarm time function
function alertOnTime(){
    let alarms = document.querySelectorAll(".alarm-time");
    for(let t of alarms){
        if(t.innerHTML === time){
            const elem = document.getElementById("alarm" + t.id.slice(6));
            alert("alarm");
            elem.remove();
        }
    }

    requestAnimationFrame(alertOnTime);
}

alertOnTime();

// function to change alarmList background

function setBackground(){
    if(alarmList.childElementCount == 0){
        alarmList.style.backgroundImage = "url(./clockbg.png)";
        alarmList.style.backgroundSize = "contain";
        alarmList.style.backgroundPosition = "center";
        alarmList.style.backgroundRepeat = "no-repeat";
        alarmList.style.opacity = "0.5";
    }else{
        alarmList.style.backgroundImage = "none";
        alarmList.style.opacity = "1";
    }

    requestAnimationFrame(setBackground);
}

setBackground();
