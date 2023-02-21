// CRUD İşlemleri

// C - CREATE - (Genellikle POST Method)
// R - READ - (Genellikle GET Method)
// U - UPDATE - (Genellikle PUT Method)
// D - DELETE - (Genellikle DELETE Method)

// CRUD - fetch()

function getAllProducts() {

    fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json();
        })
        .then((result) => {

            const ol = document.createElement('ol');

            result.products.forEach((product) => {
                const li = document.createElement('li');

                const label = document.createElement('label');
                label.innerHTML = product.brand + ' / ' + product.title;

                const button = document.createElement('button');
                button.innerHTML = 'DELETE';
                button.addEventListener('click', () => {
                    deleteProduct(product.id);
                    li.remove();
                });

                li.appendChild(label);
                li.appendChild(button);

                ol.appendChild(li);
            });

            const products = document.getElementById('products');
            products.appendChild(ol);

            console.log(result.products);
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

getAllProducts()