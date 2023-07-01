let button = document.getElementById("login-btn");

button.addEventListener("click", (event) => {
  event.preventDefault();

  let userDetail = JSON.parse(localStorage.getItem("userInfo"));
  let email = document.getElementById("email-input").value;
  let password = document.getElementById("password-input").value;
  if (userDetail.email == email && userDetail.password == password) {
    sessionStorage.setItem("email", email);
    window.location.href = "../shop";
  } else {
    alert("invalid credential");
  }
});

function onLoad() {
  if (sessionStorage.getItem("email")) {
    window.location.href = "../shop";
  }
}
