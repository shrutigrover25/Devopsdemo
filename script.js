
// SELECT ELEMENTS

const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

let cart = [];


// 1. FILTER FOOD ITEMS

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        foodCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


// 2. ADD ITEMS TO CART

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
        showToast();

    });

});


// 3. UPDATE CART

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">Your cart is empty!</p>
        `;

    }

    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>
                    ₹${item.price} × ${item.quantity}
                </p>
            </div>

            <button class="remove-btn" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalItems;

    cartTotal.textContent = `₹${totalPrice}`;

    // Attach remove events
    document.querySelectorAll(".remove-btn").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart[index].quantity--;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

            updateCart();

        });

    });

}


// 4. OPEN CART

document.querySelector(".cart-btn").addEventListener("click", () => {

    cartModal.classList.add("active");

});


// 5. CLOSE CART

document.getElementById("closeCart").addEventListener("click", () => {

    cartModal.classList.remove("active");

});


// Close cart when clicking outside

cartModal.addEventListener("click", (event) => {

    if (event.target === cartModal) {
        cartModal.classList.remove("active");
    }

});


// 6. TOAST NOTIFICATION

let toastTimeout;

function showToast() {

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


// 7. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }

});


// Close mobile navigation after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.replace("fa-xmark", "fa-bars");

    });

});


// 8. CHECKOUT

document.getElementById("checkoutBtn").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty! Please add some delicious food.");

        return;

    }

    alert("Thank you for choosing Savoria! Your order has been placed successfully.");

    cart = [];

    updateCart();

    cartModal.classList.remove("active");

});


// 9. DYNAMIC COPYRIGHT YEAR

document.getElementById("year").textContent = new Date().getFullYear();


// INITIALIZE CART

updateCart();
