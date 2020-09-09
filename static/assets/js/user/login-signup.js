const form = document.querySelector('#login-signup');
const isLogin = form.dataset.type === 'login';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value;
  const $email = document.querySelector('#email');
  const email = $email ? $email.value : null;
  if (!isLogin && password !== document.querySelector('#confirm-password').value) {
    // TODO: let user know about typo
    return;
  }
  const endpoint = isLogin ? '/api/v1/user/login' : '/api/v1/user';
  console.log(endpoint);
  const body = email ? {username, password, email} : {username, password};
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    // TODO: better error handling
    console.error(data.message);
    return;
  }
  console.info(data.message);
  location.assign(`/user/profile/${data.user.id}`);
});
