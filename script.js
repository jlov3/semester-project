var gametf = false;
var round = 1;
var playing = false;
var userRolls = 0;
var userSc = 0;
var compSc = 0;
var turnSc = 0;

function dice() {
  /*https://www.w3schools.com/JS//js_random.asp*/
  var roll = Math.floor(Math.random() * 6);
  while (roll == 0) {
    roll = Math.floor(Math.random() * 6);
  }
  changeImg(roll);
  console.log("DICE ROLL: " + roll);
  return roll;
}

function changeImg(roll) {
  let diceEl = document.getElementById("dice");
  diceEl.src = "images/" + roll + ".svg";
  diceEl.alt = roll + "side of a die";
}

function game() {
  gametf = true;
  let start = document.getElementById("start");
  start.style.display = "none";
  let possShown = document.getElementById("again");
  possShown.style.display = "none";
  let show = document.getElementById("hideFirst");
  show.style.display = "inline-block";
  changeImg(1);
  playing = true;
  console.log("GAME STARTS");
  console.log("ROUND: 1");
}

function computer() {
  console.log("COMPUTER's turn begins.");
  document.getElementById("roll").innerText = "Roll";

  var behavior = Math.floor(Math.random() * 3);
  console.log("BEHAVIOR: " + behavior);
  if(behavior == 0) {
    var lim = 2;
  } else if(behavior == 1) {
    var lim = 4;
  } else if(behavior == 2) {
    var lim = 7;
  } else {
    var lim = 10;
  }
  console.log("LIM: " + lim);

  for (i=0; i<lim; i++) {
    var roll = dice();
    if(roll != 1) {
      console.log("COMPUTER rolls something other than 1");
      turnSc += roll;
      document.getElementById("turn").innerText = turnSc;
    } else {
      console.log("COMPUTER rolls a 1");
      turnSc = 0;
      document.getElementById("turn").innerText = turnSc;
      document.getElementById("compSc").innerText = compSc;
      playing = true;
      window.alert("Computer rolled a 1. Computer's rolls: " + (i+1) + ".");window.alert("User's turn.");
      console.log("Window alert: User's turn.");
      return;
    }
  }
  window.alert("Computer's turn score: " + turnSc + ". Computer's rolls: " + lim + ".");
  hold(1);
  console.log("COMPUTER's turn ends");
  return;
}


function user() {
  if(!playing) {
    window.alert("You cannot play when it is not your turn.");
    return;
  }
  console.log("USER's turn begins");
  var roll = dice();
  if(roll == 1) {
    window.alert("You rolled a 1. Your turn ends.");
    console.log("USER rolled a 1");
    document.getElementById("userSc").innerText = userSc;
    computer();
  } else {
    console.log("USER rolls something other than 1");
    turnSc += roll;
    document.getElementById("turn").innerText = turnSc;
    if(userRolls == 1) {
      document.getElementById("roll").innerText += " Again";
    }
  }
  if (userRolls == 10) {
    window.alert("You've used all of your userRolls for this round.");
    console.log("USER has reached MAX rolls for this round");
    hold(0);
    userRolls++;
    console.log("Num of USER rolls: " + userRolls);
    return;
  }
  userRolls++;
  console.log("Num of USER rolls: " + userRolls);
}

function hold(player) {
  console.log("HOLDING");
  console.log("TURN score: " + turnSc);
  if(player == 0) {
    if (!playing) {
      window.alert("You cannot play when it is not your turn.");
      return;
    }
    if(userRolls == 0) {
      window.alert("You cannot hold before rolling at least once.");
      return;
    }
    console.log("HOLDING from USER() [Successful rolls]");
    userSc += turnSc;
    console.log("USER score: " + userSc);
    console.log("USER's turn ends");
  } else {
    console.log("HOLDING from COMPUTER() [Successful rolls]");
    compSc += turnSc;
    console.log("COMPUTER score: " + compSc);
  }

  if(userSc >= 100 || compSc >= 100) {
    console.log("GAME ENDS");
    announce(player);
    return;
  }
  turnSc = 0;
  document.getElementById("turn").innerText = turnSc;
  document.getElementById("userSc").innerHTML = userSc;
  document.getElementById("compSc").innerHTML = compSc;
  if(!playing) {
    window.alert("User's turn.");
    console.log("Window alert: User's turn.");
    round++;
    console.log("ROUND: " + round);
    playing = true;
    return;
  } else if(playing){
    window.alert("Computer's turn.");
    console.log("Window alert: Computer's turn.");
    playing = false;
    userRolls = 0;
    computer();
  }
}


function announce(player) {
  gametf = false;
  /*Hide roll & hold buttons*/
  let shown = document.getElementById("hideFirst");
  shown.style.display = "none";

  /*Show winner announcement*/
  let show = document.getElementById("hideSecond");
  show.style.display = "inline-block";

  let win = document.getElementById("win");
  let pts = document.getElementById("pts");

  if(player == 0) {
    win.innerText = "User";
    pts.innerText = userSc;
  } else {
    win.innerText = "Computer";
    pts.innerText = compSc;
  }
}