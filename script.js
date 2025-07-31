const products = [
  { name: "T-Shirt", price: 500 },
  { name: "Sneakers", price: 1200 },
  { name: "Backpack", price: 900 },
  { name: "Watch", price: 1500 }
];

const productList = document.getElementById("product-list");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = [];

function renderProducts() {
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
      <button onclick="buyNow(${index})">Buy Now</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(index) {
  const item = products[index];
  const existing = cart.find(p => p.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}
      <button onclick="removeFromCart(${i})">❌</button>`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total;
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function removeFromCart(i) {
  cart.splice(i, 1);
  updateCart();
}

function buyNow(index) {
  const item = products[index];
  alert(`Order placed for ${item.name} - ₹${item.price}`);
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  updateCart();
  closeCart();
}

document.getElementById("cart-btn").onclick = function () {
  cartModal.classList.toggle("hidden");
};

function closeCart() {
  cartModal.classList.add("hidden");
}

renderProducts();
