const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;


outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

let minutes = Math.floor(fakeDuration / 60);
let seconds = Math.floor(fakeDuration % 60);

minutes = minutes < 10 ? minutes + "0" : minutes;
seconds = seconds < 10 ? seconds + "0" : seconds;

timeDisplay.textContent = minutes + ":" + seconds;

// timeDisplay.textContent = `${(Math.floor(fakeDuration / 60))}:${Math.floor(
//   fakeDuration % 60
// )}`;

sounds.forEach(sound => {
    sound.addEventListener("click", function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
    });
});

play.addEventListener("click", function () {
    checkPlaying(song);
});

replay.addEventListener("click", function () {
    timeDisplay.style.display = "block"
    replay.style.display = "none"
    restartSong(song);
});


const restartSong = song => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
    checkPlaying(song)
}

timeSelect.forEach(option => {
    option.addEventListener("click", function () {
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
    });
});

const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
};

replay.style.display = "none"

song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;


    if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
        replay.style.display = "block";
        timeDisplay.style.display = "none";
    }
};