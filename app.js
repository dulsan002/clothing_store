const menuBtn = document.getElementById("menu-btn");
const navLinks =  document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");


menuBtn.addEventListener ("click", (e)=>{
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class" , isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e)=>{
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class" , "ri-menu-line");
});

const scrollRevealOption = {
  origin:"botto",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header-image img",{
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".header-content h1",{
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header-content p",{
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header-btns",{
  ...scrollRevealOption,
  delay: 1500,
});

const banner = document.querySelector(".banner-container");

const bannerContent = Array.from(banner.children);

bannerContent.forEach((item)=>{
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true)
  banner.appendChild(duplicateNode);
})

ScrollReveal().reveal(".arrival-card",{
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".sale-image img",{
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".sale-content h2",{
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".sale-content p",{
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale-content h4",{
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale-btn",{
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".favourite-card",{
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".contact-container",{
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".contact-container .contact-form",{
  ...scrollRevealOption,
  interval: 1500,
});


// for image slider in item card

document.querySelectorAll(".item-card").forEach(card => {
  const images = card.querySelectorAll(".item-image img");
  let index = 0;
  let interval;

  if (images.length > 0) {
    images[0].classList.add("active");
  }

  card.addEventListener("mouseenter", () => {
    index = 0;
    interval = setInterval(() => {
      images.forEach(img => img.classList.remove("active"));
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 3000);
  });

  card.addEventListener("mouseleave", () => {
    clearInterval(interval);
    index = 0;
    images.forEach((img, i) => {
      img.classList.toggle("active", i === 0);
    });
  });
});


const categories = document.querySelectorAll(".nav-bar li");
const cards = document.querySelectorAll(".item-card");

categories.forEach(catItem => {
  catItem.addEventListener('click', () => {
    const filter = catItem.textContent.toLowerCase().trim(); // normalize
    console.log("Filter:", filter);

    cards.forEach(card => {
      const cardCategory = card.getAttribute("data-category").toLowerCase();
      console.log(" card ",cardCategory);

      if (filter === "all" || cardCategory === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

ScrollReveal().reveal(".item-card",{
  ...scrollRevealOption,
  interval: 300,
});


const cartIcon = document.querySelector("#shopping-cart");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click" , ()=>{
  cart.classList.add("active")
});
cartClose.addEventListener("click" , ()=>{
  cart.classList.remove("active")
});

const addCartButtons = document.querySelectorAll("#add-cart");

addCartButtons.forEach(button =>{
  button.addEventListener("click" , event =>{
    const itemBox = event.target.closest(".item-card");
    addToCart(itemBox);
  });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = itemBox => {
  const itemImage = itemBox.querySelector("img").src;
  const itemTitle = itemBox.querySelector(".item-title").textContent;
  const itemPrice = itemBox.querySelector(".price").textContent;

  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.textContent === itemTitle){
      alert("This item is already in cart.");
      return;
    }
  }

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
     <img src="${itemImage}">
        <div class="cart-detail">
          <h2 class="cart-product-title">${itemTitle}</h2>
          <span class="cart-price">${itemPrice} </span>
          <div class="cart-quantity">
            <button id="decrement">-</button>
            <span class="number">1</span>
            <button id="increment">+</button>
          </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
        `;

        cartContent.appendChild(cartBox);

        cartBox.querySelector(".cart-remove").addEventListener("click" , () => {
          cartBox.remove();
          updateCartCount(-1);

          updateTotalPrice();
        });

        cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
          const numberElement = cartBox.querySelector(".number");
          const decrementButton = cartBox.querySelector("#decrement");
          let quantity = numberElement.textContent;

          if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity == 1){
              decrementButton.style.color = "var(--gray)";
            }
          } else if(event.target.id === "increment"){
            quantity ++;
            decrementButton.style.color = "#333";
          }
          numberElement.textContent = quantity;

          updateTotalPrice();
        });

        updateCartCount(1);

        updateTotalPrice();
};


const updateTotalPrice =() => {
  const totalPriceElement  = document.querySelector(".total-price");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");
    const price = priceElement.textContent.replace("$" , "");
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPriceElement.textContent = `$${total}`;
};


let cartItemCount = 0;
const updateCartCount = change => {
  const cartItemCountElement = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if(cartItemCount > 0) {
    cartItemCountElement.style.visibility = "visible";
    cartItemCountElement.textContent = cartItemCount;
  } else {
    cartItemCountElement.style.visibility = "hidden";
    cartItemCountElement.textContent = " ";
  }
  console.log(change);
};

const buyButton = document.querySelector(".btn-buy");
buyButton.addEventListener('click' , () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    alert("Your cart is empty. Please add items to your cart before buying.")
    return;
  }

  cartBoxes.forEach(cartBox => {
    cartBox.remove();
  });

  cartItemCount = 0;
  updateCartCount(0);

  updateTotalPrice();
  alert("Thank you for your purchase!");
})


