//const Razorpay = require("razorpay");

let cart = [];
let totalPrice = 0;
var options;
function onLoad() {
  let localStorageItem = localStorage.getItem("cart");
  cart = localStorageItem ? JSON.parse(localStorageItem) : [];
  showItems(cart);
  showCheckList(cart);
  options = {
    key: "rzp_test_9LG10OmghmEw4z", // Enter the Key ID generated from the Dashboard
    amount: totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MeShop",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
      localStorage.removeItem("cart");
      alert("items purchased");
      window.location.href = "../shop";
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9000090000",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
}

function showItems(items) {
  let itemContainer = document.getElementById("item-container");
  itemContainer.innerHTML = "";
  for (let item of items) {
    let div = document.createElement("div");
    div.className = "col";
    div.innerHTML = ` <div class="card cards">
          <img src="${item.image}" class="card-img-top" alt="shirt">
          <div class="card-body body">
          <p class="item-title">Title: ${
            item.title && item.title.length > 20
              ? item.title.substring(0, 20) + "..."
              : item.title
          }</p>
            <p class="item-price">Price: $${item.price}</p>
            <a class="btn btn-primary" onclick="removeItem(${
              item.id
            })">Remove Item</a>
          </div>
        </div>
      `;

    itemContainer.append(div);
  }
}

function showCheckList(items) {
  let checkListContainer = document.getElementById("checklist-container");
  checkListContainer.innerHTML = "";
  for (let item of items) {
    let div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<p class="item-name">${
      item.title && item.title.length > 10
        ? item.title.substring(0, 10) + "..."
        : item.title
    }</p>
    <p class="item-price">$${item.price}</p>`;
    checkListContainer.append(div);
    totalPrice += item.price;
  }
  document.getElementById("total-price").innerText =
    "$" + totalPrice.toFixed(2);
}

function removeItem(itemId) {
  cart = cart.filter((item) => item.id != itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  showItems(cart);
  showCheckList(cart);
}

// checkout button

let checkoutBtn = document.getElementById("btn-checkout");

checkoutBtn.addEventListener("click", (event) => {
  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
  event.preventDefault();
});
