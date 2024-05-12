function renderProducts(data) {
    //? I want to convert intto HTML code

    const html = data.map(
        (item) => {
            const discountedPrice = Math.ceil(item.price - (item.price * (item.discountPercentage) / 100)) ;
            const ceilDiscountedPrice = Math.ceil(item.discountPercentage)
            return `
            <div class="col">
                <div class="card h-100 pointer">
                    <img src="${item.images[0]}" class="card-img-top h-50" alt="${item.title}">
                    <div class="card-body">
                        <hr>
                        <h5 class="card-title text-center">${item.title}</h5>
                        <hr>
                        <p class="card-text">${item.description}</p>
                    </div>
                    <div class="card-footer text-center">
                        <div class="price-details">
                            <span class="original-price">$${item.price}</span>
                            <span class="discounted-price">$${discountedPrice}</span>
                            <span class="discount-percentage">${ceilDiscountedPrice}% OFF</span>
                        </div>

                    </div>
                </div>
            </div>`
        });
    const container = document.getElementById('product-container');
    container.innerHTML = html.join("")
}



renderProducts(products);

const categories = document.getElementById('categories');
const btnH1 = document.querySelector('.btnH1');

categories.addEventListener('click', (e) => {
    const cat = e.target.id;
    const btnText = e.target.textContent.toUpperCase()
    if (e.target.matches('.filter-btn')) {
        if (cat === 'all') {
            renderProducts(products);
            // btnH1.textContent = 'All Products'
        } else {
            const temp = products.filter((item) => item.category === cat);
            renderProducts(temp);
        }
        btnH1.innerHTML = `<u>${btnText}</u>`
    }

});