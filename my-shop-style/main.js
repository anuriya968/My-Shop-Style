// Product list
const products = [
  { id: 1, name: "Stylish T-shirts", price: 899, image: "../image/shopp.jpg" },
  { id: 2, name: "Cool Shirts", price: 889, image: "../image/shopping1.jpg" },
  { id: 3, name: "Cool Shirts", price: 678, image: "../image/shopping2.jpg" },
  { id: 4, name: "Cool Shirts", price: 139, image: "../image/shopping3.jpg" },
];

// Load cart from localStorage or start with empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Show all products dynamically
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add product to cart by id
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    renderCart();
  }
}


function addToCartFromSearch() {
  const searchValue = document.getElementById('searchInput').value.trim();
  const product = products.find(p => p.name.toLowerCase() === searchValue.toLowerCase());

  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    renderCart();
  } else {
    alert('Product not found.');
  }
}


// Remove product from cart by index
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Show cart items
function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      cartDiv.innerHTML += `
        <p>${item.name} - ₹${item.price} 
          <button onclick="removeFromCart(${index})">Remove</button>
        </p>
      `;
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total').innerText = total;
}

// Show either home or cart section
function showSection(section) {
  document.getElementById('home-section').style.display = section === 'home' ? 'block' : 'none';
  document.getElementById('cart-section').style.display = section === 'cart' ? 'block' : 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initial rendering on page load
renderProducts();
renderCart();
showSection('home');

