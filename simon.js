var rsound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var bsound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var ysound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var gsound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

var game = 0; // 0 - game off 1- comp turn 2- user turn
var points = 0;
var arr = [];
var level = 0;
var expected = 0;
colors = ["c-red", "c-blue", "c-yellow", "c-green"];

function play(){
  document.getElementById("playbtn").style.visibility = "hidden";
  document.getElementById("playbtn").style.opacity= "0";
  document.getElementById("congrats").style.visibility = "hidden";
  game = 1;
  level++;
  document.getElementById("point").innerHTML = level;
  // add new to arr
  let newOne = Math.floor(Math.random() * 4);
  arr.push(colors[newOne]);
  run(arr);
}

function run(a){
  (function theLoop (i) {
    setTimeout(function () {
      colorclick(a[a.length-i], 0);
      if (--i) {
        theLoop(i);
      }
    }, 700);
  })(a.length);

  setTimeout(function(){
    userrun(a);
  }, (a.length +1)*700);
}

function userrun(a){
  game = 2;
}

function colorclick(id, who){ // 0- computer 1- user
  if(game == 0)
    light(id);
  else if(game == 1 && who == 0)
    light(id);
  else if(game == 2 && who == 1){
    if(arr[expected] != id){
      document.getElementById("congrats").style.visibility = "visible";
      document.getElementById("congrats").innerHTML = "You got " + points + " point(s).";
      rsound.play();
      bsound.play();
      finish();
    }else {
      light(id);
      expected++;
      points += 10;
      if(expected == arr.length){
        setTimeout(function(){
          play();
          expected = 0;
        }, 500);
      }
    }
  }
}

function finish(){
    game = 0;
    arr = [];
    level = 0;
    expected = 0;
    points = 0;
    document.getElementById("playbtn").style.visibility = "visible";
    document.getElementById("playbtn").style.opacity= "1";
    document.getElementById("playbtn").innerHTML = "Play Again";
}

function light(id){
  if(id == "c-red"){
    document.getElementById(id).style.background = "red";
    rsound.play();
    setTimeout(function(){
      document.getElementById(id).style.background = "crimson";
    }, 500);
  }
  if(id == "c-blue"){
    document.getElementById(id).style.background = "DeepSkyBlue";
    setTimeout(function(){
      document.getElementById(id).style.background = "blue";
    }, 500);
    bsound.play();
  }
  if(id == "c-yellow"){
    document.getElementById(id).style.background = "yellow";
    setTimeout(function(){
      document.getElementById(id).style.background = "gold";
    }, 500);
    ysound.play();
  }
  if(id == "c-green"){
    document.getElementById(id).style.background = "lime";
    setTimeout(function(){
      document.getElementById(id).style.background = "LimeGreen";
    }, 500);
    gsound.play();
  }
}
