document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to collapse video on scroll
    window.addEventListener('scroll', function() {
        var videoSection = document.getElementById('video-section');
        if (window.scrollY > (videoSection.offsetHeight / 2)) {
            videoSection.classList.add('video-scrolled');
        } else {
            videoSection.classList.remove('video-scrolled');
        }
    });

    // Add photo carousel functionality
    var images = ['p1.jpeg', 'p2.jpeg', 'p3.jpeg', 'p0.jpeg.jpg','p4.jpg'];
    var photoCarousel = document.getElementById('photo-carousel');
    images.forEach(function(imagePath) {
        var img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Carousel Image';
        photoCarousel.appendChild(img);
    });

    // Add slider functionality
    var slider = document.getElementById('slider');
    var sliderInput = document.createElement('input');
    sliderInput.type = 'range';
    sliderInput.min = '0';
    sliderInput.max = '100';
    sliderInput.value = '50'; // Initial value
    var sliderLabel = document.createElement('label');
    sliderLabel.textContent = 'Adjust Opacity:';
    slider.appendChild(sliderLabel);
    slider.appendChild(sliderInput);

    sliderInput.addEventListener('input', function(event) {
        document.body.style.opacity = event.target.value / 100;
    });
});
