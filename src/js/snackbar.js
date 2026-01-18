import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', createPopUpMasseg);

function createPopUpMasseg(e) {
  e.preventDefault();
  const form = formEl.elements;
  const input = form.delay.value;
  const radios = form.state;
  const chosenbtn = [...radios].find(el => {
    return el.checked;
  }).value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (chosenbtn == 'fulfilled') {
        return resolve(`✅ Fulfilled promise in ${input}ms`);
      } else {
        reject(`❌ Rejected promise in ${input}ms`);
      }
    }, input);
  });
  promise
    .then(value =>
      iziToast.success({
        title: 'OK',
        message: value,
      })
    )
    .catch(error =>
      iziToast.error({
        title: 'Error',
        message: error,
      })
    )
    .finally(() => {
      formEl.reset();
    });
}
