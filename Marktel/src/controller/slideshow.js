let productData = []; // Global variable to store product data
let currentSlide = 0; // Tracks the current slide index
let slideshowInterval; // Interval for slideshow

// Fetch product data from JSON and initialize slideshow
document.addEventListener("DOMContentLoaded", () => {
    fetch('../src/controller/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        productData = data;
        populateSlides(productData);
        initializeSlideshow();
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
        //alert('Failed to load product data. Check the console for more details.');
    });
});

// Populate slides dynamically based on product data
function populateSlides(products) {
    const slideshowContainer = document.querySelector(".slideshow");
    slideshowContainer.innerHTML = ""; // Clear existing slides

    products.forEach((product, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (index === 0) slide.classList.add("active");
        slide.setAttribute("data-name", product.title);

        slide.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p>${product.title}</p>
            <a href="product-details.html?slug=${product.slug}">Learn More</a>
        `;

        slideshowContainer.appendChild(slide);
    });

    // Reinitialize slideshow
    initializeSlideshow();
}

// Slideshow functionality
function initializeSlideshow() {
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length; // Ensure index wraps around
        slides.forEach((slide, i) => {
            slide.style.display = i === currentSlide ? "block" : "none";
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
        resetSlideshowTimer(); // Reset the timer when manually changing slides
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
        resetSlideshowTimer(); // Reset the timer when manually changing slides
    }

    let slideshowInterval;

    function startSlideshow() {
        // Clear any existing interval to ensure only one interval is active
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(() => {
            showSlide(currentSlide + 1); // Automatically move to the next slide
        }, 5000); // Change slide every 5 seconds
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval); // Stop the interval
    }

    function resetSlideshowTimer() {
        stopSlideshow(); // Stop the current timer
        startSlideshow(); // Start a new timer
    }

    // Attach event listeners to the navigation buttons
    document.querySelector(".prev").addEventListener("click", prevSlide);
    document.querySelector(".next").addEventListener("click", nextSlide);

    // Show the initial slide and start the slideshow
    showSlide(currentSlide);
    startSlideshow();
}

// Search functionality
function handleSearchInput() {
    const searchInput = document.getElementById("product-search-input").value.toLowerCase();
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = ""; // Clear previous results

    if (searchInput.length === 0) {
        searchResults.style.display = "none";
        return;
    }

    const filteredProducts = productData.filter(product =>
        product.title.toLowerCase().includes(searchInput)
    );

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = `product-details.html?slug=${product.slug}`;
            link.textContent = product.title;
            li.appendChild(link);
            searchResults.appendChild(li);
        });
        searchResults.style.display = "block";
    } else {
        searchResults.style.display = "none";
    }
}

// Add event listener for search input
document.getElementById("product-search-input").addEventListener("input", handleSearchInput);

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    const searchResults = document.getElementById("search-results");
    const searchInput = document.getElementById("product-search-input");
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = "none";
    }
});
