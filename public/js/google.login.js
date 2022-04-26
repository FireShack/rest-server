const logOutButton = document.querySelector("#google-logout");
function handleCredentialResponse(response) {
  const body = { id_token: response.credential };
  fetch("http://localhost:5000/api/auth/login/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem("email", res.googleUser.mail);
    });
}

const googleLogOut = () => {
  console.log("Logging out");
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};

logOutButton.addEventListener("click", googleLogOut);
