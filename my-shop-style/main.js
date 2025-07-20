

// Product list
const products = [
  { id: 1, name: "Stylish T-shirts", price: 899, image: "../image/shopp.jpg" },
  { id: 2, name: "Cool Shirts", price: 889, image: "../image/shopping1.jpg" },
  { id: 3, name: "nykaa shirts", price: 678, image: "../image/shopping2.jpg" },
  { id: 4, name: " myn Cool T-shirts", price: 139, image: "../image/shopping3.jpg" },
];

// Load cart from localStorage or start with empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartSection = document.getElementById("cartSection");
  const totalAmount = document.getElementById("totalAmount");

  let total = 0;
  cartSection.innerHTML =""; // clear old items
   cart.forEach(section => {
    const p = document.createElement("p");
    p.textContent = `${section.name} - <img src="../image/rupees.png ${section.price}" `;
    cartSection.appendChild(p);
    total += section.price;
   });

   totalAmount.textContent = `Total: <img src="../image/rupees.png ${total}"`;
  }
  //document.getElementById("cartSection").innerHTMl = cart.map(item =>{
   // total += item.price;
    //return `<p>${section.name} - <img src="../image/rupees.png ${section.price}" <p> `;
  ////}).join("");

  //document.getElementById("totalAmount").textContent = `Total: ${total}`
//}

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
  else{
    cancel
  }
  console.log();
}


function addToCartFromSearch() {
  const searchValue = document.getElementById('search-input').value.trim();
  const product = products.find(p => p.name.toLowerCase() === searchValue.toLowerCase());

  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    renderCart();
  } else {
    alert("Product not found.");
  }
}
// enter key in the search input
 document.getElementById('searchForm').addEventListener('keypress' , function(e){
   if (e.key === 'Enter'){
    e.preventDefault();
    addToCartFromSearch();
   }
 });


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

