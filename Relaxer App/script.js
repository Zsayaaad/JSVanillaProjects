const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2; // 3000
const holdTime = totalTime / 5; // 1500

function breathHandling() {
  text.innerHTML = 'Breath In!';

  container.className = 'container grow';

  setTimeout(() => {
    text.innerHTML = 'Hold';

    setTimeout(() => {
      text.innerHTML = 'Breath Out!';

      container.className = 'container shrink';
    }, holdTime);
  }, breathTime);
}
breathHandling();

setInterval(breathHandling, totalTime);
