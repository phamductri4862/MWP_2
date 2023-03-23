const search = document.querySelector("#search");
const qas = document.querySelectorAll("#qa");
const qasText = [];
const clearBtn = document.querySelector("#clear-btn");
qas.forEach((qa) => qasText.push(qa.innerText.toLowerCase()));

clearBtn.addEventListener("click", () => {
  search.value = "";
  qas.forEach((qa, i) => {
    qa.classList.remove("hidden");
  });
});

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const inpFunc = debounce((e) => {
  qas.forEach((qa, i) => {
    if (!qasText[i].includes(search.value.toLowerCase().trim())) {
      qa.classList.add("hidden");
    } else {
      qa.classList.remove("hidden");
    }
  });
});

search.addEventListener("input", inpFunc);
