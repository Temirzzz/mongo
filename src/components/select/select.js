export class Select {
  constructor(el) {
    this.block = el;
    this.parentClassName = "select";
    this.input = this.block.querySelector(`.${this.parentClassName}__input`);
    this.placeholder = this.block.querySelector(`.${this.parentClassName}__placeholder`);
    this.options = this.block.querySelectorAll(`.${this.parentClassName}__option`);
    this.trigger = this.block.querySelector(`.${this.parentClassName}__trigger`);

    this.error = this.block.querySelector(`.${this.parentClassName}__error`);
  }

  init() {
    this.selectCLickHandler();
    this.optionClickHandler();
    this.initCloseHandler();
    this.block.__select__ = this;
  }

  selectCLickHandler() {
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.block.classList.contains("js-active")) {
        this.block.classList.remove("js-active");
      } else {
        this.block.classList.add("js-active");
      }
    });
  }

  optionClickHandler() {
    this.options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.input.value !== option.dataset.value) {
          this.input.value = option.dataset.value;
          this.input.dispatchEvent(new Event("input"));
          this.placeholder.textContent = option.textContent;
          this.options.forEach((_option) => {
            _option.classList.remove("js-chosen");
          });
          option.classList.add("js-chosen");
        }
        this.collapseList();
      });
      if (this.input.dataset.value) {
        if (this.input.dataset.value === option.dataset.value) {
          this.input.value = option.dataset.value;
          if (!this.input.dataset.calcSelect) {
            this.input.dispatchEvent(new Event("input"));
          }
          this.placeholder.textContent = option.textContent;
          this.options.forEach((_option) => {
            _option.classList.remove("js-chosen");
          });
          option.classList.add("js-chosen");
        }
      }
    });
  }

  initCloseHandler() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(`.${this.parentClassName}`)) {
        this.collapseList();
      }
    });
  }

  collapseList() {
    this.block.classList.remove("js-active");
  }

  cleanSelect() {
    this.placeholder.textContent = "";
    const chosenEls = this.block.querySelector(".js-chosen");
    if (chosenEls) chosenEls.classList.remove("js-chosen");
    this.input.value = "";
    this.input.dispatchEvent(new Event("input"));
  }
}

export const initSelects = () => {
  const elements = document.querySelectorAll(".select");

  if (elements.length) {
    elements.forEach((el) => new Select(el).init());
  }
};
