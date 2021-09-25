const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".player__fullscreen");

function togglePlay() {
	video.paused ? video.play() : video.pause();
}

function updateButton() {
	toggle.textContent = this.paused ? "►" : "❚❚";
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function handleFullscreen() {
	if (!isFull) {
		fullScreen.textContent = "esc";
		if (player.requestFullscreen) {
			player.requestFullscreen();
		}
	} else if (isFull) {
		fullScreen.textContent = "ff";
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
	isFull = !isFull;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRange));
ranges.forEach((range) => range.addEventListener("mousemove", handleRange));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

let isFull = false;
fullScreen.addEventListener("click", handleFullscreen);
