// Wedding date: 29 January 2027 at midnight in the visitor's local time zone.
const countDownDate = new Date(2027, 0, 29, 0, 0, 0).getTime();

// Add/remove filenames here to match the photos in your images folder.
// The first photo is displayed when the page loads.
const backgroundPhotos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg"
];

let currentPhotoIndex = 0;

const backgroundPhoto = document.getElementById("background-photo");
const photoButton = document.getElementById("toggle-btn");
const musicButton = document.getElementById("music-btn");
const musicLabel = document.getElementById("music-label");
const musicIcon = document.getElementById("music-icon");
const weddingMusic = document.getElementById("wedding-music");

// Set the initial photo and change to the next photo instantly on each click.
function showPhoto(index) {
  const photoPath = backgroundPhotos[index];
  backgroundPhoto.style.backgroundImage = `url("${photoPath}")`;
  photoButton.setAttribute(
    "aria-label",
    `Change background photo. Current photo ${index + 1} of ${backgroundPhotos.length}`
  );
}

photoButton.addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex + 1) % backgroundPhotos.length;
  showPhoto(currentPhotoIndex);
});

showPhoto(currentPhotoIndex);

// Countdown
const pad2 = (value) => String(value).padStart(2, "0");

function updateCountdown() {
  const distance = countDownDate - Date.now();
  const message = document.getElementById("message");

  if (distance <= 0) {
    document.getElementById("days").textContent = "000";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    message.textContent = "Today, our forever begins! ♥";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = pad2(hours);
  document.getElementById("minutes").textContent = pad2(minutes);
  document.getElementById("seconds").textContent = pad2(seconds);
  message.textContent = "";
}

updateCountdown();
const countdownInterval = setInterval(() => {
  updateCountdown();

  // Stop polling once the wedding date has arrived.
  if (Date.now() >= countDownDate) {
    clearInterval(countdownInterval);
  }
}, 1000);

// Optional user-controlled music. Add audio/romantic-song.mp3 to your project.
// Browsers only allow playback after a user gesture.
musicButton.addEventListener("click", async () => {
  if (weddingMusic.paused) {
    try {
      await weddingMusic.play();
      musicLabel.textContent = "Pause Music";
      musicIcon.textContent = "Ⅱ";
      musicButton.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicLabel.textContent = "Music unavailable";
      musicIcon.textContent = "♫";
      musicButton.setAttribute("aria-pressed", "false");
      console.error(
        "Could not play music. Check that audio/romantic-song.mp3 exists and is a supported audio file.",
        error
      );
    }
  } else {
    weddingMusic.pause();
    musicLabel.textContent = "Play Music";
    musicIcon.textContent = "♫";
    musicButton.setAttribute("aria-pressed", "false");
  }
});

weddingMusic.addEventListener("ended", () => {
  musicLabel.textContent = "Play Music";
  musicIcon.textContent = "♫";
  musicButton.setAttribute("aria-pressed", "false");
});

weddingMusic.addEventListener("error", () => {
  // Keep the optional music control non-blocking if no audio file is installed.
  musicLabel.textContent = "Play Music";
  musicIcon.textContent = "♫";
  musicButton.setAttribute("aria-pressed", "false");
});
