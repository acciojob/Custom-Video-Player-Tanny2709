// Select elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* --- FUNCTIONS --- */

// Play/Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub timeline
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Handle volume & playback speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

/* --- EVENT LISTENERS --- */

// Play / pause clicking
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update progress
video.addEventListener('timeupdate', handleProgress);

// Sliders (volume + speed)
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

// Skip controls
skipButtons.forEach(btn => btn.addEventListener('click', skip));

// Scrub progress bar
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
