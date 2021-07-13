const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    let query, className;
    switch (entry.target.id) {
        case "portfolio":
            query = '#get-in-touch';
            className = 'vibrate';
            break;
        case "about-me":
            query = '.slides';
            className = 'slide-in-view';
            break;
    }
    const elem = entry.target.querySelectorAll(query);
    elem.forEach(e => {
        if (entry.isIntersecting) {
            e.classList.add(className);
        }

        // We're not intersecting, so remove the class!
        else e.classList.remove(className);
    });
});

// observer.observe(document.querySelector('#portfolio'));
observer.observe(document.querySelector('#about-me'));

// INTERACTIVITY WITH THE CUBE  

// DOM elements and stats
const area = document.getElementById("portfolio");
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
    const dx = Math.round(area.clientWidth / (360 * 2) * 100) / 100,
        dy = Math.round(area.clientHeight / 360 * 100) / 100;

    transformCube(y * dy, x * dx);
}


// aligns the cube to show the required element
function alignCube(index) {
    grab = true;
    const degArray = [
        [-5, 175],
        [85, 0],
        [265, 0],
        [-5, -95],
        [175, -85],
        [175, 185]
    ];
    transformCube(degArray[index][0], degArray[index][1]);

    // show the description
    const p = document.querySelectorAll(".projects")[index].querySelector(".description"); // <p> element
    p.classList.add("show-description");
}

// EVENT LISTENERS
area.addEventListener("mousemove", rotate);
const nums = document.querySelectorAll(".serial-num");
nums.forEach((n, i) => {
    n.addEventListener("click", () => alignCube(i));
});