import "./images/svg/icon";
import "./assets/styles/main.scss";

if (document.querySelector(".input")) {
  import("./components/input/input").then(({ initInput }) => {
    initInput();
  });
}

if (document.querySelector(".select")) {
  import("./components/select/select").then(({ initSelects }) => {
    initSelects();
  });
}

if (document.querySelector(".radio")) {
  import("./components/radio/radio").then(({ initRadio }) => {
    initRadio();
  });
}

if (document.querySelector(".button")) {
  import("./components/button/button").then(({ initButton }) => {
    initButton();
  });
}

window.addEventListener("load", () => {
  const body = document.querySelector(".main");
  if (localStorage.getItem("theme") === "light") body.classList.add("theme_light");
  if (localStorage.getItem("theme") === "dark") body.classList.add("theme_dark");
});
