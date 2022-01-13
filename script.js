// DOM elements and stats
const navBtn = document.querySelector(".nav-btn"),
  secP = document.getElementById("portfolio"),
  nums = document.querySelectorAll(".serial-num");

let grab = false;

// EVENT listener
navBtn.addEventListener("click", showHeader);
secP.addEventListener("mousemove", rotate);
nums.forEach((n, i) => {
  n.addEventListener("click", () => alignCube(i));
  n.addEventListener("keypress", (event) => {
    if (event.key == "Enter") alignCube(i)
  })
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  let sections = {
    "home": 'view-home',
    "about-me": 'view-about',
    "portfolio": 'view-portfolio'
  };
  let className = sections[entry.target.id];
  if (entry.isIntersecting) {
    entry.target.classList.add(className);
    observer.unobserve(entry.target)
  }
}), {
  threshold: 0.2
});

['#home', '#about-me', '#portfolio'].forEach(s => observer.observe(document.querySelector(s)))

// SHOW HEADER ON NAV BUTTON CLICK
function removeHeader() {
  const menu = document.querySelector(".header");
  menu.classList.remove("show-header");
  const returnBtn = document.querySelector("#return");
  returnBtn.style.display = "none";
  const links = menu.lastElementChild.children;
  [returnBtn, ...links].forEach(el => el.removeEventListener("click", removeHeader));
  [...links].forEach(link => link.removeEventListener("keydown", setFocusAndRemoveHeader))
}

function setFocusAndRemoveHeader(event) {
  if (event.key == "Enter") {
    document.querySelector(event.target.hash).focus();
    removeHeader()
  }
}

function showHeader() {
  const menu = document.querySelector(".header");
  menu.classList.add("show-header");
  const returnBtn = document.querySelector("#return");
  setTimeout(() => returnBtn.style.display = "initial", 500);
  const links = menu.lastElementChild.children;
  [returnBtn, ...links].forEach(el => el.addEventListener("click", removeHeader));
  [...links].forEach(link => link.addEventListener("keydown", setFocusAndRemoveHeader))
}

// INTERACTIVITY WITH THE CUBE  

// set the value of transform property
function transformCube(x, y) {
  let z = 150;
  if (innerWidth < 700) z = 100;
  const cube = document.querySelector(".projects-cube"); // the cube
  cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) translateZ(${z}px)`;
}

// rotates the cube with the mouse
function rotate(event) {
  if (grab) return; // if the user is navigating through the given numbers return

  // gets position of cursor
  let x = event.clientX,
    y = event.clientY;

  // divide the area per degree
  const dx = Math.round(secP.clientWidth / 900 * 100) / 100,
    dy = Math.round(secP.clientHeight / 900 * 100) / 100;

  transformCube(y * dy, x * dx);
}

// sets the transition property on transform for the cube
function setTransition(value) {
  const cube = document.querySelector(".projects-cube");
  cube.style.transition = value;
}

// aligns the cube to show the required element
function alignCube(index) {
  const rp = document.querySelectorAll(".projects")[index].querySelector(".description"); // req <p> element

  if (rp.classList.contains("show-description")) return;
  grab = true;
  const degArray = [
    [-5, 175],
    [85, 0],
    [265, 0],
    [-5, -95],
    [175, -85],
    [175, 185]
  ];
  setTransition("transform 0.5s ease-in-out");
  transformCube(degArray[index][0], degArray[index][1]);
  setTimeout(() => setTransition(""), 510);

  // hide all the descriptions first
  const pArr = document.querySelectorAll(".description");
  pArr.forEach(p => {
    if (p.classList.contains("show-description")) p.classList.remove("show-description")
  });

  // show the req description
  rp.classList.add("show-description");

  const a = rp.querySelector(".project-links");
  if (a) a.focus()
}