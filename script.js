const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const slides = entry.target.querySelectorAll('.slides');
        slides.forEach(slide => {
            if (entry.isIntersecting) {
                slide.classList.add('slide-in-view');
                return; // if we added the class, exit the function
            }

            // We're not intersecting, so remove the class!
            slide.classList.remove('slide-in-view');
        });
    });
});

document.querySelectorAll('.slide-wrapper').forEach(e => observer.observe(e));