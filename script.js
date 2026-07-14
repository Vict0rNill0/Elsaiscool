const modal = document.querySelector('.video-modal');
const player = document.querySelector('.video-modal__player');
const closeButton = document.querySelector('.video-modal__close');
const music = document.querySelector('#background-music');
const musicButton = document.querySelector('.music-button');
const musicInvite = 'Mach das Volumen hoch und drück hier. Du wirst es verstehen.';

function setMusicButtonLabel() {
  const isCompact = window.scrollY > 160;
  musicButton.classList.toggle('is-compact', isCompact);

  if (isCompact) {
    musicButton.textContent = music.paused ? '🔇' : '🔊';
    musicButton.setAttribute('aria-label', music.paused ? 'Hintergrundmusik starten' : 'Hintergrundmusik stoppen');
    return;
  }

  musicButton.textContent = music.paused ? musicInvite : 'Das läuft jetzt. Laut genug?';
  musicButton.setAttribute('aria-label', music.paused ? 'Hintergrundmusik starten' : 'Hintergrundmusik stoppen');
}

function closeVideo() {
  player.pause();
  player.removeAttribute('src');
  player.load();
  modal.hidden = true;
}

document.querySelectorAll('[data-video]').forEach((button) => {
  button.addEventListener('click', () => {
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
      musicButton.setAttribute('aria-pressed', 'true');
      setMusicButtonLabel();
    }).catch(() => {
      musicButton.textContent = 'Noch einmal tippen';
    });
    return;
  }

  music.pause();
  musicButton.setAttribute('aria-pressed', 'false');
  setMusicButtonLabel();
});

window.addEventListener('scroll', setMusicButtonLabel, { passive: true });
setMusicButtonLabel();

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
