const key = document.createElement('button');
key.id = 'space-key';
key.type = 'button';
key.textContent = 'SPACE';
key.setAttribute('aria-label', 'Space key');
key.title = 'Space';
document.body.append(key);

const launch = document.querySelector('#launch');
let launchWasVisible = false;
if (launch) {
  const observer = new MutationObserver(() => {
    if (!launch.hidden) launchWasVisible = true;
    else if (launchWasVisible) {
      document.body.classList.add('project-started');
      observer.disconnect();
    }
  });
  observer.observe(launch, { attributes: true, attributeFilter: ['hidden'] });
}

let pressed = false;
function send(type) {
  document.dispatchEvent(new KeyboardEvent(type, {
    key: ' ', code: 'Space', keyCode: 32, which: 32,
    bubbles: true, cancelable: true
  }));
}
function press() {
  if (pressed) return;
  pressed = true;
  key.classList.add('is-pressed');
  send('keydown');
}
function release() {
  if (!pressed) return;
  pressed = false;
  key.classList.remove('is-pressed');
  send('keyup');
}
key.addEventListener('pointerdown', event => {
  event.preventDefault();
  key.setPointerCapture(event.pointerId);
  press();
});
key.addEventListener('pointerup', release);
key.addEventListener('pointercancel', release);
key.addEventListener('lostpointercapture', release);
key.addEventListener('keydown', event => {
  if (event.code === 'Space') event.preventDefault();
});
key.addEventListener('keyup', event => {
  if (event.code === 'Space') event.preventDefault();
});
window.addEventListener('blur', release);
