export const handleSubmit = (e, setErrorMsg, setRedirectUrl) => {
  console.log("Evento:", e);
  console.log("Tipo di evento:", e.type);
  e.preventDefault();
  const form = e.target;
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  const privacy = form.privacy.checked;

  const user = { username, email, password, privacy };

  fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMsg) {
        setErrorMsg(data.errorMsg);
      } else {
        setRedirectUrl(data.redirectUrl);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleLogin = (e, setIsLogged, setErrorMsg, setRedirectUrl) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  const user = { email, password };

  fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMsg) {
        setErrorMsg(data.errorMsg);
      } else {
        setIsLogged(true);
        setRedirectUrl(data.redirectUrl);
      }
    })
    .catch((err) => console.log(err));
};
