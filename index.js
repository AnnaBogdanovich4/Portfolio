// Translate ru-en
const enLang = document.getElementById('lang-en');
const ruLang = document.getElementById('lang-ru');

const getTranslate = (lang) => {
    const strsTranslate = document.querySelectorAll('[data-i18]');
    strsTranslate.forEach((el) => {
        el.textContent = i180bj[lang][el.dataset.i18]
    });
};

ruLang.addEventListener('click', () => getTranslate('ru'));
enLang.addEventListener('click', () => getTranslate('en'));

//LocalStorage

// ruLang.addEventListener('click', () => localStorage.setItem('lang', ruLang.textContent));
// enLang.addEventListener('click', () => localStorage.setItem('lang', enLang.textContent));

function setLocalStorage() {
    localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslate(lang);
    }
}
window.addEventListener('load', getLocalStorage)

// hamburger open adaptive menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('#menu');

function toggleMenu() {
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
}

hamburger.addEventListener('click', toggleMenu);

// animation button
const bubblyButtons = document.querySelectorAll('.bubbly-button');

function animateButton(e) {
    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function() {
        e.target.classList.remove('animate');
    }, 50);
}

for (let i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}

//Change picture
const portfolioBtnAutumn = document.getElementById('button-autumn');
const portfolioBtnSummer = document.getElementById('button-summer')
const portfolioBtnWinter = document.getElementById('button-winter');
const portfolioBtnSpring = document.getElementById('button-spring');
const portfolioImage1 = document.querySelector('.portfolio-image1');
const portfolioImage2 = document.querySelector('.portfolio-image2');
const portfolioImage3 = document.querySelector('.portfolio-image3');
const portfolioImage4 = document.querySelector('.portfolio-image4');
const portfolioImage5 = document.querySelector('.portfolio-image5');
const portfolioImage6 = document.querySelector('.portfolio-image6');

portfolioBtnAutumn.addEventListener('click', () => {
    portfolioImage1.src = "./assets/img/Autumn/1.jpg";
    portfolioImage2.src = "./assets/img/Autumn/2.jpg";
    portfolioImage3.src = "./assets/img/Autumn/3.jpg";
    portfolioImage4.src = "./assets/img/Autumn/4.jpg";
    portfolioImage5.src = "./assets/img/Autumn/5.jpg";
    portfolioImage6.src = "./assets/img/Autumn/6.jpg";
    portfolioBtnAutumn.classList.add('active');
});
portfolioBtnSummer.addEventListener('click', () => {
    portfolioImage1.src = "./assets/img/Summer/1.jpg";
    portfolioImage2.src = "./assets/img/Summer/2.jpg";
    portfolioImage3.src = "./assets/img/Summer/3.jpg";
    portfolioImage4.src = "./assets/img/Summer/4.jpg";
    portfolioImage5.src = "./assets/img/Summer/5.jpg";
    portfolioImage6.src = "./assets/img/Summer/6.jpg";
    portfolioBtnSummer.classList.add('active');
});
portfolioBtnWinter.addEventListener('click', () => {
    portfolioImage1.src = "./assets/img/Winter/1.jpg";
    portfolioImage2.src = "./assets/img/Winter/2.jpg";
    portfolioImage3.src = "./assets/img/Winter/3.jpg";
    portfolioImage4.src = "./assets/img/Winter/4.jpg";
    portfolioImage5.src = "./assets/img/Winter/5.jpg";
    portfolioImage6.src = "./assets/img/Winter/6.jpg";
    portfolioBtnWinter.classList.add('active');
});
portfolioBtnSpring.addEventListener('click', () => {
    portfolioImage1.src = "./assets/img/Spring/1.jpg";
    portfolioImage2.src = "./assets/img/Spring/2.jpg";
    portfolioImage3.src = "./assets/img/Spring/3.jpg";
    portfolioImage4.src = "./assets/img/Spring/4.jpg";
    portfolioImage5.src = "./assets/img/Spring/5.jpg";
    portfolioImage6.src = "./assets/img/Spring/6.jpg";
    portfolioBtnSpring.classList.add('active');
});

//Add video-player
const allPlayer = document.querySelector('.player');
const playerVideo = document.querySelector('.player-video');
const playerHover = document.querySelector('.play-hover');

// controls
const controlPlay = document.querySelector('.svg-play');
const controlVolume = document.querySelector('.svg-volume');
const controlVolumeSlider = document.querySelector('.volume');
const controlRate = document.querySelector('.playbackRate');
const controlSkip = document.querySelectorAll('.player-button[data-skip]');
const controlFullScreen = document.querySelector('.player-fullscreen');
const controlProgress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-filled');
const colorPlay = document.querySelectorAll('[type=range]');

// events
let drag;
let grap;
let vol;

playerHover.addEventListener('click', toggleVideo);
controlPlay.addEventListener('click', toggleVideo);

controlSkip.forEach(control => control.addEventListener('click', forward));

controlVolume.addEventListener('click', changeVolume);

controlVolumeSlider.addEventListener('change', (e) => {
    playerVideo.volume = e.target.value, false;
});

controlRate.addEventListener('change', (e) => {
    playerVideo.playbackRate = e.target.value
});

colorPlay.forEach(colorPlay => colorPlay.addEventListener('input', getColorProgress));

controlFullScreen.addEventListener('click', (e) => {
    console.dir(playerVideo);
    if (playerVideo.webkitSupportsFullscreen) {
        playerVideo.webkitEnterFullScreen()
    }
});

controlProgress.addEventListener('mouseover', function() { drag = true });
controlProgress.addEventListener('mouseout', function() {
    drag = false;
    grap = false
});
controlProgress.addEventListener('mousedown', function() { grap = drag });
controlProgress.addEventListener('mouseup', function() { grap = false });

controlProgress.addEventListener('click', updateCurrentPos);

controlProgress.addEventListener('mousemove', function(e) { if (drag && grap) { updateCurrentPos(e) } });

let progression;

// functions

function changeVolume() {
    if (playerVideo.muted) {
        playerVideo.muted = false;
        controlVolumeSlider.value = 0.5;
        controlVolume.style.backgroundImage = "url('./assets/svg/video-volume.svg')";
    } else  {
        playerVideo.muted = true;
        controlVolumeSlider.value = 0;
        controlVolume.style.backgroundImage = "url('./assets/svg/video-mute.svg')";
    }
}

function toggleVideo() {
    if (playerVideo.paused) {
        playerHover.classList.add('hide');
        playerVideo.play();
        controlPlay.style.backgroundImage = "url('./assets/svg/video-pause.svg')";
        progression = window.setInterval(updateProgress, 200);
    } else {
        playerHover.classList.remove('hide');
        playerVideo.pause();
        controlPlay.style.backgroundImage = "url('./assets/svg/video-play.svg')";
        clearInterval(progression);
    }
}

function forward() {
    const value = Number(this.dataset.skip);
    playerVideo.currentTime = playerVideo.currentTime + value;
}

function updateProgress() {
    const percentage = (playerVideo.currentTime / playerVideo.duration) * 100;
    progressBar.style.flexBasis = `${percentage}` + '%';
}

function updateCurrentPos(e) {
    // offset of the progress bar / video wrapper width
    const newProgress = ((e.clientX - allPlayer.offsetLeft) / allPlayer.clientWidth) * playerVideo.duration;
    playerVideo.currentTime = newProgress;
}

function getColorProgress() {
    value = this.value;
    this.style.background = `linear-gradient(to right, var(--gold-color) 0%, var(--gold-color) ${value}%, var(--gold-color) ${value}%, var(--white-color) 100%)`;
}