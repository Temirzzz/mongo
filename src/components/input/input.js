export default class Input {
  constructor() {
    this.buildCache();
    this.bindEvents();
    this.objForLocalStorage = {};
    this.inputs = document.querySelectorAll(".input-for-storage");
  }

  init() {
    this.saveLocalStorage();
  }

  buildCache() {}

  bindEvents() {}

  saveLocalStorage() {
    this.inputs.forEach((item) => {
      item.addEventListener("input", (event) => {
        this.objForLocalStorage[item.getAttribute("name")] = event.target.value;
        localStorage.setItem("data_inputs", JSON.stringify(this.objForLocalStorage));
      });
    });

    if (localStorage.data_inputs) {
      let obj = JSON.parse(localStorage.data_inputs);
      for (let key in obj) {
        document.querySelector(`input[name="${key}"]`).value = obj[key];
        if (document.querySelector(`input[name="${key}"]`).hasAttribute("data-value-key")) {
          document.querySelector(
            `input[name="${key}"]`
          ).parentNode.nextSibling.firstChild.firstChild.innerText = obj[key];
        }
      }
    }
  }
}

export const initInput = (el = document.querySelectorAll(".input")) => {
  el.forEach((item) => {
    if (item) {
      const _ = new Input(item);
      _.init();
    }
  });
};
