import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const inputEl = document.getElementById('datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
let selectedDate;
let timerId;
btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (Number(new Date()) > Number(selectedDate)) {
      iziToast.warning({
        title: 'Caution',
        message: 'You forgot important data',
      });
      updateTimerDisp(null);
      return;
    }
    btnEl.disabled = false;
    clearInterval(timerId);
    chekDate(selectedDate);

    console.log(selectedDates[0]);
  },
};
flatpickr(inputEl, options);
btnEl.addEventListener('click', () => {
  timerId = setInterval(() => {
    chekDate(selectedDate);
  }, 1000);
  btnEl.disabled = true;
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function updateTimerDisp(userSelectedDate) {
  if (
    !userSelectedDate ||
    isNaN(userSelectedDate) ||
    userSelectedDate == null
  ) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
  } else {
    const { days, hours, minutes, seconds } = convertMs(userSelectedDate);
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }
}
function chekDate(userSelectedDate) {
  const currentDate = new Date();
  if (
    !userSelectedDate ||
    isNaN(userSelectedDate) ||
    userSelectedDate == null
  ) {
    clearInterval(timerId);
    updateTimerDisp(null);
    btnEl.disabled = true;
  } else {
    const res = Number(userSelectedDate) - Number(currentDate);
    updateTimerDisp(res);
  }
}
