function getAllProducts() {
    fetch('https://dummyjson.com/products')
        .then((response) => response.json())
        .then((products) => {

        console.log(products);
    });
}
getAllProducts()

// Sidebar Categories
function getAllCategories() {

    fetch('https://dummyjson.com/products/categories')
        .then((response) => response.json())
        .then((categories) => {

            const category_list = document.getElementById('category-list');

            console.log(categories);

            categories
                .sort((a,b) => a.localeCompare(b))
                .forEach((category) => {

                    /*
                    <li class="list-group-item">
                        <div class="btn-group dropend w-100">
                            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="false">
                                Dropend
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                            </ul>
                        </div>
                    </li>
                    */

                    const category_li = document.createElement('li');
                    category_li.className = 'list-group-item';

                    const category_dropend = document.createElement('div');
                    category_dropend.className = 'btn-group dropend w-100';
                    category_li.appendChild(category_dropend);

                    const category_dropend_button = document.createElement('a');
                    category_dropend_button.className = 'btn dropdown-toggle';
                    category_dropend_button.setAttribute('data-bs-toggle', 'dropdown');
                    category_dropend_button.innerText = category;
                    category_dropend.appendChild(category_dropend_button);

                    const category_dropend_list = document.createElement('ul');
                    category_dropend_list.className = 'dropdown-menu';
                    category_dropend.appendChild(category_dropend_list);

                    category_list.appendChild(category_li);

                    fetch('https://dummyjson.com/products/category/' + category)
                        .then((response) => response.json())
                        .then((result_x) => {
                            const brands = [];
                            result_x.products.forEach((product) => {
                                if (!brands.includes(product.brand)) {
                                    brands.push(product.brand);
                                }
                            });
                            console.log(category, result_x)
                            brands
                                .sort((a, b) => a.localeCompare(b))
                                .forEach((brand) => {
                                    const li = document.createElement('li');

                                    const brand_link = document.createElement('button');
                                    brand_link.className = 'dropdown-item';
                                    brand_link.setAttribute('data-category', category);
                                    brand_link.setAttribute('data-brand', brand);
                                    brand_link.innerText = brand;
                                    brand_link.addEventListener('click', (event) => {
                                        getBrandProducts(
                                            event.target.dataset.category,
                                            event.target.dataset.brand
                                        );
                                    });

                                    li.appendChild(brand_link);

                                    category_dropend_list.appendChild(li);
                                });

                        });

                });

        })

}

// Table Products
function getBrandProducts(category, brand) {
    fetch('https://dummyjson.com/products/category/' + category)
        .then((response) => response.json())
        .then((result) => {
            const filtered = result.products.filter((product) => product.brand === brand);

            const product_list = document.getElementById('product-list');
            product_list.innerHTML = null;

            filtered.forEach((product) => {
                const tr = document.createElement('tr');

                const img = document.createElement('td');
                const img_element = document.createElement('img');
                img_element.src = product.thumbnail;
                img_element.style.width = '100px';
                img.appendChild(img_element);
                tr.appendChild(img);

                const brand = document.createElement('td');
                brand.innerText = product.brand;
                tr.appendChild(brand);

                const title = document.createElement('td');
                title.innerText = product.title;
                tr.appendChild(title);

                const price = document.createElement('td');
                price.innerText = '$' + product.price;
                tr.appendChild(price);

                const discountPercentage = document.createElement('td');
                discountPercentage.innerText = product.discountPercentage + '%';
                tr.appendChild(discountPercentage);

                const salePrice = document.createElement('td');
                salePrice.innerText = '$' + (+product.price * (100 - +product.discountPercentage) / 100).toFixed(2);
                tr.appendChild(salePrice);

                const stock = document.createElement('td');
                stock.innerText = product.stock;
                tr.appendChild(stock);

                const processes = document.createElement('td');

                const detail_element = document.createElement('button');
                detail_element.className = 'btn btn-primary w-100';
                detail_element.innerText = 'Detail';
                detail_element.addEventListener('click', () => {
                    alert(product.description);
                })
                processes.appendChild(detail_element);

                const delete_element = document.createElement('button');
                delete_element.className = 'btn btn-danger w-100';
                delete_element.innerText = 'Delete';
                delete_element.addEventListener('click', (event) => {
                    deleteProduct(product.id);
                    tr.remove();
                });
                processes.appendChild(delete_element);

                tr.appendChild(processes);

                product_list.appendChild(tr);

            });

        });
}

function deleteProduct(id) {
    fetch(
        'https://dummyjson.com/products/' + id,
        {
            method: 'DELETE'
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            alert('DELETED SUCCESFULL');
            console.log(result);
        })
}

getAllCategories();