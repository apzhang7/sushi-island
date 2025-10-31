document.querySelector(".hamburger").onclick = () => {
  document.querySelector(".nav-links").classList.toggle("show");
};


/* ===== SLIDER ===== */
let currentSlide = 0;
function showSlide(index) {
  const slides = document.querySelector('.slides');
  const total = document.querySelectorAll('.slide').length;
  if (index >= total) currentSlide = 0;
  else if (index < 0) currentSlide = total - 1;
  else currentSlide = index;
  slides.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
}
function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

/* ===== CART ===== */
let cart = [];

function toggleCart() {
  const cartEl = document.getElementById('cart');
  cartEl.classList.toggle('open');
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });
  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
      <div class="cart-item-buttons">
        <button class="minus-btn" onclick="decreaseQuantity('${item.name}')">−</button>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">X</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = 'Total: $' + total.toFixed(2);
}

function decreaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.name !== name);
    }
    updateCart();
  }
}

// ====== CART TOGGLE BUTTON ======
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-toggle-btn");
  const cart = document.getElementById("cart");

  if (cartBtn && cart) {
    cartBtn.addEventListener("click", () => {
      cart.classList.toggle("open");

      // Move the button with the cart
      if (cart.classList.contains("open")) {
        cartBtn.style.right = "320px";
      } else {
        cartBtn.style.right = "20px";
      }
    });
  }

  // Also hook up clear cart button
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
