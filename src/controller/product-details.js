// Fetch product data from JSON file
fetch('../src/controller/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(productData => {
        // Get the slug from the URL
        const params = new URLSearchParams(window.location.search);
        const productSlug = params.get("slug"); // Extract the 'slug' parameter from the URL

        // Find the product based on the slug
        const product = productData.find(item => item.slug === productSlug);

        if (product) {
            // Populate the details page with product data
            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-image").alt = product.title;
            document.getElementById("product-description").textContent = product.description;

            const specsList = document.getElementById("product-specs");
            specsList.innerHTML = ""; // Clear any existing specs
            product.specs.forEach(spec => {
                const li = document.createElement("li");
                li.textContent = spec;
                specsList.appendChild(li);
            });
        } else {
            // Handle case where the product is not found
            const container = document.querySelector("#product-details .container");
            container.innerHTML = `
                <p>Product not found. <a href="index.html#products">Back to Products</a></p>
            `;
        }
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
        const container = document.querySelector("#product-details .container");
        container.innerHTML = `
            <p>Failed to load product data. Please try again later. <a href="index.html#products">Back to Products</a></p>
        `;
    });
