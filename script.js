const body = document.body;
const screen = document.getElementById("screen");
const clock = document.getElementById("clock");
const startButton = document.getElementById("startButton");
const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");
const menus = document.querySelectorAll(".menu");
const menuButtons = document.querySelectorAll("[data-menu-button]");

const copy = {
  en: {
    about: "About me",
    language: "Language",
    chapter: "Chapter",
    start: "-Click anywhere to start-",
    loading: "Sandbox loading...",
    aboutTitle: "About me",
    aboutBody:
      "Hello, and welcome.\n\nI am Sheliaster, the creator and guide of this world you are about to witness.\n\nPerhaps you have heard of me before, or perhaps this is our very first meeting. Either way, thank you for choosing to step into the universe I have created. I sincerely hope you will come to love this story and enjoy the journey that lies ahead. Your presence here is, to me, a tremendous honor.\n\nAnd finally-\nMay the glory of the stars forever guide your way.",
    mortal: "The Mortal Realm",
    bygone: "The Bygone Age",
    mortalTitle: "The Martyr's Final Testament",
    bygoneTitle: "The Worldbreaker's Endgame",
  },
  zh: {
    about: "About me",
    language: "Language",
    chapter: "Chapter",
    start: "-Click anywhere to start-",
    loading: "Sandbox loading...",
    aboutTitle: "About me",
    aboutBody:
      "欢迎您，观测者。\n\n我是譞譞，也可以称呼我为Sheliaster，如你所见，是本场世界观测的主导人。\n\n也许您曾了解过我，也许没有，但不论如何，感谢您愿意造访我笔下的世界，希望您能够喜爱这个故事，享受这段旅程，这于我而言是莫大的荣幸。\n\n最后的最后--愿群星的荣光常伴您左右。",
    mortal: "现世",
    bygone: "前尘",
    mortalTitle: "殉道者的终言",
    bygoneTitle: "颠世者的残局",
  },
};

function updateClock() {
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

function setLanguage(lang) {
  body.dataset.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key === "chapterTitle") return;
    node.textContent = copy[lang][key];
  });

  setChapter(body.dataset.chapter);
}

function setChapter(chapter) {
  const lang = body.dataset.lang;
  body.dataset.chapter = chapter;

  const title = document.querySelector("[data-i18n='chapterTitle']");
  title.textContent = chapter === "mortal" ? copy[lang].mortalTitle : copy[lang].bygoneTitle;
}

function closeMenus(exceptMenu) {
  menus.forEach((menu) => {
    if (menu === exceptMenu) return;
    menu.classList.remove("is-open");
    const button = menu.querySelector("[data-menu-button]");
    button?.setAttribute("aria-expanded", "false");
  });
}

function toggleMenu(button) {
  const menu = button.closest(".menu");
  const shouldOpen = !menu.classList.contains("is-open");

  closeMenus(menu);
  menu.classList.toggle("is-open", shouldOpen);
  button.setAttribute("aria-expanded", String(shouldOpen));
}

function enterSite(event) {
  if (
    event.target.closest(".nav") ||
    event.target.closest(".about-modal") ||
    event.target.closest("#aboutButton")
  ) {
    return;
  }

  body.classList.add("has-entered");
}

document.querySelectorAll("[data-lang-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.langChoice);
    closeMenus();
  });
});

document.querySelectorAll("[data-chapter-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    setChapter(button.dataset.chapterChoice);
    closeMenus();
  });
});

aboutButton.addEventListener("click", () => {
  closeMenus();
  if (typeof aboutModal.showModal === "function") {
    aboutModal.showModal();
  }
});

menuButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu(button);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu")) {
    closeMenus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenus();
  }
});

closeAbout.addEventListener("click", () => aboutModal.close());
startButton.addEventListener("click", enterSite);
screen.addEventListener("click", enterSite);

updateClock();
setInterval(updateClock, 1000);
setLanguage("en");
