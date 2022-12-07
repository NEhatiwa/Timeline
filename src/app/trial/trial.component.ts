import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {

  constructor() {
    var space = 12;
  var startX=-100
  var hr=0;
  var min=0;
  var sec=0;
  var counter=0;
  var secRem;
  var document:Document;

   }

  ngOnInit(): void {
  }

  
function startAnimation(){
  currentTime();

  drawTimeLine();
  console.log("Checking")
}
function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = updateTime(date.getHours());
  var min = updateTime(date.getMinutes());
  var sec = updateTime(date.getSeconds());
  document.getElementById("digitalClock").innerHTML = hour + " : " + min + " : " + sec; /* adding time to the div */
  var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */

}
function updateTime(k: number) {
if (k < 10) {
  return "0" + k;
}
else {
  return k;
}
}
// var currentHrs=20;
var prevSecs=0;
function drawTimeLine(){
var ctx:any = <HTMLElement | null> document.getElementById('canvas').getContext('2d');   
ctx.clearRect(0, 0, 1200, 200);
 var date = new Date();
 var hr = date.getHours();
var min=date.getMinutes();
  //var hr=date.getHours() -3;
var secs=date.getSeconds();
var sec=(parseInt(secs/10)*10) -30;
var currentSec=secs%10;


/*if(startX<=-190){
  startX=-100;
  console.log("****** currectSecs : "+sec);
}	*/

if(sec<0)
{
  sec=60+sec;
  min--;
  if(min<0){
    min=59;
    hr--;
    if(hr<0){
      hr=24+hr;
    }
  }
}	
if((currentSec-prevSecs)>=0)
  startX= startX -((currentSec-prevSecs)*10);



  if(currentSec==0){
    startX=-100;
    console.log("****** startSec : "+sec);
  }

console.log(" Starts:"+sec + " currentsecs: " +secs+ "  prevSecs: " + prevSecs + "  startX: " + startX);


var x= startX ;

prevSecs =currentSec;

 drawFixedLine(ctx,200);
  for (var i = 0; i < 12; i++) {
  
  var  time =updateTime(hr)+ " : " + updateTime(min) + " : " + updateTime(sec);		
  sec=sec+10;
  if(sec==60){
    sec=0;
    min++;
    if(min==60){
      min=0;
      hr++;
      if(hr==24){
        hr=0;
      }
    }
  }
  
  ctx.font = "10px Arial";	
  ctx.fillText(time,x,25);
  
  
  //vertical big line
  drawLine(ctx,x,x,40,28)
  
  //horizontal line	
  drawLine(ctx,x,(x+space),40,40)				
  x=x+space;
  for (var j = 0; j < 9; j++) {
    if(j==4){
    //middle line
      drawLine(ctx,x,x,40,32)									
    }else{
    //vertical samll line
       drawLine(ctx,x,x,40,36)									
    }
    //horizontal line
    drawLine(ctx,x,(x+space),40,40)	
    x=x+space;
   }
              
}
// startX=startX-10;

 var tline = setTimeout(function(){ drawTimeLine() }, 1000);
}


function drawLine(conxt: any,startx: number,endx:number,starty:number,endy:number){
conxt.beginPath();
conxt.moveTo(startx, starty);
conxt.lineTo(endx, endy);
conxt.strokeStyle = "#000000";
conxt.stroke();
}

function drawFixedLine(conxt : any,fixedLineX: number){

conxt.beginPath();
conxt.moveTo(fixedLineX, 80);
conxt.lineTo(fixedLineX, 12);

conxt.strokeStyle = "#FF0000";
conxt.stroke();
}
}



 




