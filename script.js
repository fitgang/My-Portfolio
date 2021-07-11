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

// aligns the cube to show the required element
function alignCube(index) {
    const cube = document.querySelector(".projects-cube"); // the cube
    const className = `project-${index}`; // css class to align the cube
    if (cube.classList.contains(className)) return;
    const projects = document.querySelectorAll(".projects");

    // removing useless classes
    for (let i = 0; i < projects.length; i++) {
        if (cube.classList.contains(`project-${i}`)) cube.classList.remove(`project-${i}`);
    }

    // adding the required class to the cube
    cube.classList.add(className);
}

const nums = document.querySelectorAll(".serial-num");
nums.forEach((n, i) => {
    n.addEventListener("click", () => alignCube(i));
});