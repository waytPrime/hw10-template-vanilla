import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  inputEl: document.querySelector('[name="delay"]'),
  formEl: document.querySelector(".form"),
  inputFulfield: document.querySelector('[value="fulfilled"]'),
  inputReject: document.querySelector('[value="rejected"]'),
  button: document.querySelector('button [type="submit"]'),
};
const { formEl, inputFulfield, inputReject, inputEl, button } = refs;

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  CreatePromise(inputEl.value);
});
console.dir(refs.inputReject);

function checked() {
  return inputFulfield.checked;
}

function CreatePromise(time) {
  const check = checked();
  setTimeout(() => {
    if (check) {
      Promise.resolve(time).then((time) => {
        console.log(`✅ Fulfilled promise in ${time}ms`);
        iziToast.show({
          message: `✅ Fulfilled promise in ${time}ms`,
          position: "topRight",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          overlayColor: "rgba(0, 0, 200, 0.2)",
        });
      });
    } else {
      Promise.reject(time)
        .then()
        .catch((time) => {
          iziToast.show({
            message: `❌ Rejected promise in ${time}ms`,
            position: "topRight",
            backgroundColor: "rgb(255, 0, 0)",
            messageColor: "white",
          });
          console.log(`❌ Rejected promise in ${time}ms`);
        });
    }
  }, time);

  formEl.reset();
}
