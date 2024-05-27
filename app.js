//! GET API
const getProduct = async () => {
    const API_KEY = "https://dummyjson.com/products"
    try {
        const res = await fetch(API_KEY)
        // console.log(res);

        if (!res.ok) {
            throw new Error(`Something went wrong: ${res.status}`)
        }

        const data = await res.json()
        // console.log(data);
        renderProducts(data.products)
        renderCategories(data.products)
        filterItems(data.products)
    } catch (error) {
        console.log(error);
    }
}

//! RENDER PRODUCTS
const renderProducts = (products, filteredProducts) => {
    const containerDiv = document.getElementById("product-container")
    // console.log(products);
    containerDiv.innerHTML = "";
    products.forEach(element => {
        // console.log(element);

        const { title, thumbnail, description, price, discountPercentage } = element
        const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);



        containerDiv.innerHTML += `
                    <div class="col">
                        <div class="card h-100 pointer">
                            <img src="${thumbnail}" class="card-img-top h-50" alt="${title}">
                            <div class="card-body">
                                <hr>
                                <h5 class="card-title text-center">${title}</h5>
                                <hr>
                                <p class="card-text">${description}</p>
                            </div>
                            <div class="card-footer text-center">
                                <div class="price-details">
                                    <span class="original-price">$${price}</span>
                                    <span class="discounted-price">$${discountedPrice}</span>
                                    <span class="discount-percentage">${discountPercentage}% OFF</span>
                                </div>
        
                            </div>
                        </div>
                    </div>
        `

    });
}


//! categories button Print

//? first letter upper case?
const categoriesDiv = document.getElementById('categories')


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const renderCategories = (products) => {
    const categoriesSet = new Set();

    products.forEach(element => {
        const { category } = element
        categoriesSet.add(category)
    })

    categoriesSet.forEach(category => {
        // console.log(element.category);
        const capitalizedCategory = capitalizeFirstLetter(category);

        categoriesDiv.innerHTML += `
        <button type="button" class="btn btn-secondary filter-btn" id="${category}">
            ${capitalizedCategory}
        </button>
        `;
    });
};

//! Filter items with categories button click

const filterItems = (products) => {
    const categoriesDiv = document.getElementById('categories');
    const btnH1 = document.querySelector('.btnH1');

    categoriesDiv.addEventListener('click', (e) => {
        const cat = e.target.id;
        const btnText = e.target.textContent.toUpperCase()
        if (e.target.matches('.filter-btn')) {
            if (cat === 'all') {
                renderProducts(products)
                btnH1.innerHTML = '<u> All Products </u>'

            } else {
                const temp = products.filter((element) => element.category === cat);
                renderProducts(temp); // Filtrelenmiş ürünleri render et
                btnH1.innerHTML = `<u>${btnText}</u>`
            }

        }
    });
}



//! Wait for window load
window.addEventListener("load", () => {
    getProduct()
})



