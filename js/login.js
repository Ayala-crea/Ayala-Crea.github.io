import { endpointLogin } from "../js/url.js";

document.getElementById("signInButton").addEventListener("click", function (event) {
  event.preventDefault();

  const usernameEmail = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Prepare the data object based on the new request body structure
  const data = {
    usernameEmail: usernameEmail,
    password: password
  };

  fetch(endpointLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response) => {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Password salah. Silakan coba lagi.");
      } else {
        throw new Error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      }
    }
    return response.json();
  })
  .then((data) => {
    if (data.token && data.dataUser) {
      // Make sure the user object has the expected properties
      localStorage.setItem("userName", data.dataUser.nickname || '');
      localStorage.setItem("userEmail", data.dataUser.email || '');
      localStorage.setItem("LOGIN", data.token);
      document.cookie = `LOGIN=${data.token};path=/;max-age=3600`;

      return Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Selamat, Anda berhasil login!',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Use the correct role property
          if (data.dataUser.role_id === 1) {
            window.location.href = "dashboard-admin.html";
          } else if (data.dataUser.role_id === 2) {
            window.location.href = "dashboard-user.html";
          }
        }
      });
    } else {
      throw new Error("Token tidak diterima atau data user tidak valid");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Error Login",
      text: error.message,
    });
  });
});
