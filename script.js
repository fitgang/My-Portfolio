const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    let query, className;
    switch (entry.target.id) {
        case "portfolio":
            query = '#get-in-touch';
            className = 'vibrate';
            break;
        case "slide-wrapper":
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

observer.observe(document.querySelector('#portfolio'));
observer.observe(document.querySelector('#slide-wrapper'));