export class Radio {
  constructor(el) {
    this.block = el;
    this.parentClassName = "radio";
    this.radio = document.querySelectorAll(".radio__input");
  }

  init() {
    this.setThemeValue();
    this.isChecked();
  }

  radioHandler() {}

  setThemeValue() {
    this.radio.forEach((radio) => {
      radio.addEventListener("click", (event) => {
        event.stopPropagation();
        if (event.target.value == 1) {
          localStorage.setItem("radioValue", "light");
        }
        if (event.target.value == 2) {
          localStorage.setItem("radioValue", "dark");
        }
        return event.target.value;
      });
    });
  }

  isChecked() {
    let radio = localStorage.getItem("radio");
    for (var i = 0; i < this.radio.length; i++) {
      this.radio[i].addEventListener("click", (event) => {
        localStorage.setItem("radio", event.target.value);
      });
    }
    if (radio) {
      let input = document.querySelector('input[name="theme"][value="' + radio + '"]');
      if (input) {
        input.checked = true;
      }
    }
  }
}

export const initRadio = () => {
  const elements = document.querySelectorAll(".radio");

  if (elements.length) {
    elements.forEach((el) => new Radio(el).init());
  }
};
