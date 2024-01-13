const buttonColors = ['red', 'blue', 'green', 'yellow'];

const saveGameState = () => {
  localStorage.setItem('gamePattern', JSON.stringify(gamePattern));
  localStorage.setItem('level', level);
  localStorage.setItem('started', started);
};

const loadGameState = () => {
  const savedGamePattern = localStorage.getItem('gamePattern');
  const savedLevel = localStorage.getItem('level');
  const savedStarted = localStorage.getItem('started');

  if (savedGamePattern && savedLevel && savedStarted) {
    gamePattern = JSON.parse(savedGamePattern);
    level = parseInt(savedLevel);
    started = JSON.parse(savedStarted);
  }
};

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$('h1').after(
  '<h2>Remeber the pattern provided and press them in order after each blink</h2>'
);

$('.start-btn').on('click touchstart', function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').on('click touchstart', function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playsound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playsound('wrong');
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 500);

    startOver();
  }
};

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $('h1').text('Level ' + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playsound(randomChosenColor);
  saveGameState();
};

const playsound = (name) => {
  let sound = new Audio('sounds/' + name + '.mp3');
  //   let sound = new Audio(`sounds/${randomChosenColor}.mp3`);
  sound.play();
};

const animatePress = (currentColor) => {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
  saveGameState();
};

loadGameState();
