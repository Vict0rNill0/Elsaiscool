const modal = document.querySelector('.video-modal');
const player = document.querySelector('.video-modal__player');
const closeButton = document.querySelector('.video-modal__close');
const music = document.querySelector('#background-music');
const musicButton = document.querySelector('.music-button');
const musicGate = document.querySelector('.music-gate');
const musicStart = document.querySelector('.music-start');
const musicSkip = document.querySelector('.music-skip');
const passwordGate = document.querySelector('.password-gate');
const passwordForm = document.querySelector('.password-form');
const passwordInput = document.querySelector('#password-input');
const passwordToggle = document.querySelector('.password-toggle');
const passwordError = document.querySelector('.password-error');
const password = 'Elsaiscool';

function showMusicPrompt() {
  if (sessionStorage.getItem('elsaMusicPromptDone') === 'true') {
    document.body.classList.add('music-ready');
    return;
  }

  musicGate.hidden = false;
}

function unlockPage() {
  sessionStorage.setItem('elsaGiftUnlocked', 'true');
  document.body.classList.remove('is-locked');
  passwordGate.hidden = true;
  showMusicPrompt();
}

if (sessionStorage.getItem('elsaGiftUnlocked') === 'true') {
  unlockPage();
} else {
  document.body.classList.add('is-locked');
}

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (passwordInput.value.trim() === password) {
    unlockPage();
    return;
  }

  passwordError.hidden = false;
  passwordInput.select();
});

passwordToggle.addEventListener('click', () => {
  const isVisible = passwordInput.type === 'text';
  passwordInput.type = isVisible ? 'password' : 'text';
  passwordToggle.textContent = isVisible ? '👁' : '🙈';
  passwordToggle.setAttribute('aria-pressed', String(!isVisible));
  passwordToggle.setAttribute('aria-label', isVisible ? 'Passwort anzeigen' : 'Passwort verbergen');
  passwordInput.focus();
});

function setMusicButtonLabel() {
  musicButton.textContent = music.paused ? '🔇' : '🔊';
  musicButton.setAttribute('aria-label', music.paused ? 'Hintergrundmusik starten' : 'Hintergrundmusik stoppen');
}

function dismissMusicPrompt() {
  sessionStorage.setItem('elsaMusicPromptDone', 'true');
  document.body.classList.add('music-ready');
  musicGate.hidden = true;
  setMusicButtonLabel();
}

function startMusic() {
  music.volume = 0.42;
  music.play().then(() => {
    musicButton.setAttribute('aria-pressed', 'true');
    dismissMusicPrompt();
  }).catch(() => {
    musicStart.textContent = 'Noch einmal';
  });
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
    startMusic();
    return;
  }

  music.pause();
  musicButton.setAttribute('aria-pressed', 'false');
  setMusicButtonLabel();
});

musicStart.addEventListener('click', startMusic);

musicSkip.addEventListener('click', dismissMusicPrompt);

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
