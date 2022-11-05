class Tabs {
  constructor(el) {
    this.block = el;
    this.parentClassName = "tabs";
    this.tabs = this.block.querySelectorAll(`.${this.parentClassName}__tab`);
  }

  init() {
    this.handleTabClick();
  }

  handleTabClick() {
    this.tabs.forEach((tab, indx) => {
      tab.addEventListener(
        "click",
        (e) => {
          const tabId = tab.id;
          this.changeActiveTab(tab, this.tabs, tabId);
          const activeTab = document.querySelector(`#${tabId}-block.js-active`);
          let innerFilters = null;
          if (activeTab) {
            innerFilters = activeTab.querySelectorAll("[data-filter-filtration-first]");
          }
        },
        true
      );
    });
  }

  changeActiveTab(tab, tabsList, tabId) {
    const tabsMainPartOfId = this.getMainPartOfId(tabId);

    tabsList.forEach((_tab) => {
      _tab.classList.remove("js-active");
    });

    tab.classList.add("js-active");
    const activeItemForThisTabs = document.querySelector(
      `[id*="${tabsMainPartOfId}"].tabs-block.js-active`
    );
    const activatedTab = document.querySelector(`#${tabId}-block`);

    if (activeItemForThisTabs) activeItemForThisTabs.classList.remove("js-active");
    if (activatedTab) activatedTab.classList.add("js-active");
  }

  getMainPartOfId(tabId) {
    const tabsIdList = tabId.split("-");
    tabsIdList.pop();
    return tabsIdList.join("-");
  }
}

export const initTabs = (el = document.querySelectorAll(".tabs")) => {
  el.forEach((item) => {
    if (item) {
      const _ = new Tabs(item);
      _.init();
    }
  });
};
