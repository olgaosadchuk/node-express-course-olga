document.getElementById('fetchProductsBtn').addEventListener('click', () => {
    fetch('/api/v1/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const productsContainer = document.getElementById('productsContainer');
            productsContainer.innerHTML = ''; // Clear previous data

            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}" style="width:200px;">
                    <p>Price: $${product.price}</p>
                    <p>Description: ${product.desc}</p>
                `;
                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});