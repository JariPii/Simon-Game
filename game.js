const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// $(document).keypress(function () {
//   if (!started) {
//     $('#level-title').text('Level ' + level);
//     nextSequence();
//     started = true;
//   }
// });
$('h1').on('click', function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () {
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
    // .fadeIn(100)
    .fadeOut(0.4)
    .fadeIn();

  playsound(randomChosenColor);
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
};
