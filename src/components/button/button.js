export class Button {
  constructor(el) {
    this.block = el;
    this.parentClassName = "button";
    this.button = document.querySelectorAll(".button__self-button");
    this.body = document.querySelector(".main");
  }

  init() {
    this.themeToggle();
  }

  themeToggle() {
    this.button.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.block.classList.remove("button_active");
        event.target.parentElement.classList.add("button_active");

        if (localStorage.getItem("radioValue") === "light") {
          localStorage.setItem("theme", "light");
          this.body.classList.remove("theme_dark");
          this.body.classList.add("theme_light");
        }
        if (localStorage.getItem("radioValue") === "dark") {
          localStorage.setItem("theme", "dark");
          this.body.classList.remove("theme_light");
          this.body.classList.add("theme_dark");
        }
        if (event.target.parentElement.classList.contains("button_default")) {
          localStorage.removeItem("radioValue");
          localStorage.removeItem("data_inputs");
          localStorage.removeItem("theme");
          localStorage.removeItem("radio");

          this.body.classList.remove("theme_dark");
          this.body.classList.add("theme_light");
        }
      });
    });
  }
}

export const initButton = () => {
  const elements = document.querySelectorAll(".button");

  if (elements.length) {
    elements.forEach((el) => new Button(el).init());
  }
};
