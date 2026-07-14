const modal = document.querySelector('.video-modal');
const player = document.querySelector('.video-modal__player');
const closeButton = document.querySelector('.video-modal__close');
const music = document.querySelector('#background-music');
const musicButton = document.querySelector('.music-button');

function closeVideo() {
  player.pause();
  player.removeAttribute('src');
  player.load();
  modal.hidden = true;
}

document.querySelectorAll('[data-video]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!music.paused) {
      music.pause();
      musicButton.textContent = 'Musik an';
      musicButton.setAttribute('aria-pressed', 'false');
    }

    player.src = button.dataset.video;
    modal.hidden = false;
    player.play().catch(() => {
      player.controls = true;
    });
  });
});

musicButton.addEventListener('click', () => {
  if (music.paused) {
    music.volume = 0.42;
    music.play().then(() => {
      musicButton.textContent = 'Musik aus';
      musicButton.setAttribute('aria-pressed', 'true');
    }).catch(() => {
      musicButton.textContent = 'Tippen für Musik';
    });
    return;
  }

  music.pause();
  musicButton.textContent = 'Musik an';
  musicButton.setAttribute('aria-pressed', 'false');
});

closeButton.addEventListener('click', closeVideo);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeVideo();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) {
    closeVideo();
  }
});
