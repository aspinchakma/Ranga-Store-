const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p style="color: #315f72">Category: ${product.category}</p>
      <p style="color:#1A9CB7">Rating :${product.rating.rate}    Total-Rating: ${product.rating.count}</p>
      <h2 style="color: #F89647;font-weight:600;">Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger single-item-button">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
    const description = product.description;
    const shortDescription = description.slice(0, 150)


    // show details 
    const showDetails = document.getElementById('show-details');
    const button = div.childNodes[0].childNodes[13];
    button.addEventListener('click', () => {
      document.getElementById('show-details').textContent = '';
      const div = document.createElement("div");
      div.style.width = '25%';
      div.style.textAlign = 'center';
      div.style.margin = 'auto';
      div.innerHTML = `
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <h4>Short Description</h4>
      <p>${shortDescription}</p>
      <p style="color: #315f72">Category: ${product.category}</p>
      <p style="color:#1A9CB7">Rating :${product.rating.rate}    Total-Rating: ${product.rating.count}</p>
      <h2 style="color: #F89647;font-weight:600;">Price: $ ${product.price}</h2>
      

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger single-item-button">Details</button>
      `;
      showDetails.appendChild(div);
    })
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal(); // change number 1 , ok

  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element); // change number 2  just int ot float change
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
loadProducts();