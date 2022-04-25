function handleCredentialResponse(response) {
  // Google token
  // console.log(response.credential);
  //const url = "http://localhost:5000/api/auth/login/google";
  //const res = await fetch(url);
  //const data = res.json();
  const body = { id_token: response.credential };
  fetch("http://localhost:5000/api/auth/login/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
