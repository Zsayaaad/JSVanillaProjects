const time = document.getElementById('time');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const year = document.getElementById('year');
const loading = document.getElementById('loading');
const countdown = document.getElementById('countdown');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`Jan 01, ${currentYear + 1} 00:00:00`);

// console.log(newYearTime);

year.innerHTML = currentYear;

function updateTime() {
  const dateNow = new Date(); // The time now

  // console.log(dateNow / (1000 * 60 * 60 * 24 * 364)); // Num of years from the beginning of history until now

  const dateDiffernce = newYearTime - dateNow;
  // console.log(dateDiffernce / (1000 * 60 * 60 * 24)); // The time now to beginning of the year(باقي القسمة هو عدد الساعات)

  const d = Math.floor(dateDiffernce / (1000 * 60 * 60 * 24));

  // باقي قسمة الايام => hours
  const h = Math.floor(
    (dateDiffernce % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  // باقي قسمة الساعات => minutes
  const m = Math.floor((dateDiffernce % (1000 * 60 * 60)) / (1000 * 60));

  // باقي قسمة الدقايق => seconds
  const s = Math.floor((dateDiffernce % (1000 * 60)) / 1000);

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? `0${h}` : h;
  minutes.innerHTML = m < 10 ? `0${m}` : m;
  seconds.innerHTML = s < 10 ? `0${s}` : s;
}

setInterval(updateTime, 1000);

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);
