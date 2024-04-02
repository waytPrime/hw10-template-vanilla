import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const btnEl = document.querySelector("button[data-start]");
let userSelectedDate = null;
const calendarEl = document.querySelector("input#datetime-picker");
const refs = {
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (Date.now() > userSelectedDate) {
      btnEl.disabled = true;
      // window.alert("Please choose a date in the future");
      return;
    }
    btnEl.disabled = false;
  },
};

flatpickr(calendarEl, options);

function onDateClick() {
  if (userSelectedDate === null) {
    return;
  }
  const intervalID = setInterval(() => {
    let time = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(time);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
    if (seconds < 0) {
      clearInterval(intervalID);
    }
  }, 1000);
}

btnEl.addEventListener("click", onDateClick);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));

  const hours = pad(Math.floor((ms % day) / hour));

  const minutes = pad(Math.floor(((ms % day) % hour) / minute));

  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function pad(str) {
  return String(str).padStart(2, 0);
}
