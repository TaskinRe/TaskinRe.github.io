gsap.registerPlugin(ScrollTrigger);
let speed = 100;

/*  SCENE 1 */
let scene1 = gsap.timeline();
ScrollTrigger.create({
    animation: scene1,
    trigger: ".scrollElement",
    start: "top top",
    end: "45% 100%",
    scrub: 3,
});

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Delay the visibility of the headline text
    setTimeout(function() {
        // Select the headline element
        const headline = document.getElementById('headline');
        // Change the opacity to make it visible
        headline.style.opacity = '1';
    }, 2000); // 2000 milliseconds = 2 seconds
    
    // Start storytelling after headline appears
    setTimeout(startStorytelling, 2000);
});


// hills animation 
scene1.to("#back1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0)
scene1.to("#back2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in" }, 0)
scene1.to("#sun", { y: -400 }, 0)
scene1.to("#people", { y: 5 * speed }, 0.03)
scene1.to("#girl", { y: 2 * speed }, 0.03)
scene1.to("#info", { y: 8 * speed }, 0)

/* reset scrollbar position after refresh */
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}

let fullscreen;
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
    e.preventDefault();
    if (!fullscreen) {
        fullscreen = true;
        document.documentElement.requestFullscreen();
        fsEnter.innerHTML = "Exit Fullscreen";
    }
    else {
        fullscreen = false;
        document.exitFullscreen();
        fsEnter.innerHTML = "Go Fullscreen";
    }
}); 


// Function to update the placeholder of the textarea with the current story
function updatePlaceholder(storyIndex) {
    document.getElementById('info').placeholder = stories[storyIndex];
}

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Delay the visibility of the headline text
    setTimeout(function() {
        // Select the headline element
        const headline = document.getElementById('headline');
        // Change the opacity to make it visible
        headline.style.opacity = '1';
    }, 2000); // 2000 milliseconds = 2 seconds

    // Set up ScrollTriggers for each image
    let images = document.querySelectorAll('.scrollElement');
    images.forEach((image, index) => {
        ScrollTrigger.create({
            trigger: image,
            start: "top center", // Adjust as needed
            end: "center center", // Adjust as needed
            onEnter: () => {
                // Update the placeholder with the current story
                updatePlaceholder(index % stories.length);
            },
            onLeaveBack: () => {
                // Update the placeholder with the previous story
                updatePlaceholder((index - 1 + stories.length) % stories.length);
            }
        });
    });
});

// Reset scrollbar position after refresh
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};
