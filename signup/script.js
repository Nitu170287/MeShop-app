let button = document.getElementById("signup-btn");

button.addEventListener("click", (event) => {
  event.preventDefault();
  let userDetail = {
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    email: document.getElementById("email-input").value,
    password: document.getElementById("password-input").value,
  };
  let confirmPassword = document.getElementById("confirm-password-input").value;

  if (
    !userDetail.fname ||
    !userDetail.lname ||
    !userDetail.email ||
    !userDetail.password ||
    !confirmPassword
  ) {
    alert("All fields are required.");
  } else {
    if (userDetail.password == confirmPassword) {
      localStorage.setItem("userInfo", JSON.stringify(userDetail));

      alert("Successfull Signedup. Please login ");

      window.location.href = "/../login";
    } else {
      alert("Passwords are not matching");
    }
  }
});
