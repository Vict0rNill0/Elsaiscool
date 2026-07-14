const modal = document.querySelector('.video-modal');
const player = document.querySelector('.video-modal__player');
const closeButton = document.querySelector('.video-modal__close');

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
