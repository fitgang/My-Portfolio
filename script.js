// setting the observer
const observer = new IntersectionObserver(entries =>
    entries.forEach(entry => {

        // elements to be observed
        let sections = {
            "home": 'view-home',
            "about-me": 'view-about',
            "portfolio": 'view-portfolio'
        };

        // respective classnames to be added
        let className = sections[entry.target.id];
        if (entry.isIntersecting) {
            entry.target.classList.add(className);
            observer.unobserve(entry.target)
        }
    }), { threshold: 0.2 });

// intersection observer entries
['#home', '#about-me', '#portfolio'].forEach(s => observer.observe(document.querySelector(s)));

//
// SHOW NAV BUTTON ON SLIDE UP AND NAV MENU ON NAV BUTTON CLICK

const navBtn = document.querySelector(".nav-btn");
let sp1 = 0; // initial scrolltop value when the users scrolls

function showNavBtn() {
    if (sp1 && document.documentElement.scrollTop - sp1 < -20 && !navBtn.classList.contains("show-nav")) {
        navBtn.classList.add("show-nav");
        setTimeout(() => {
            navBtn.classList.remove("show-nav");
            sp1 = 0;
        }, 6000);
    } else sp1 = document.documentElement.scrollTop;
}

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
        console.log(document.querySelector(event.target.hash));
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

// EVENT listener
document.addEventListener("scroll", showNavBtn);
navBtn.addEventListener("click", showHeader);

//
// INTERACTIVITY WITH THE CUBE  

// DOM elements and stats
const secP = document.getElementById("portfolio");
let grab = false;

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
}

// EVENT LISTENERS
secP.addEventListener("mousemove", rotate);
const nums = document.querySelectorAll(".serial-num");
nums.forEach((n, i) => {
    n.addEventListener("click", () => alignCube(i));
    n.addEventListener("keypress", (event) => { if (event.key == "Enter") alignCube(i) })
});