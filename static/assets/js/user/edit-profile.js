const $form = document.querySelector('#edit-profile');

$form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const picture = document.querySelector('#picture').value.trim();
  const portfolio = document.querySelector('#portfolio').value.trim();
  const website = document.querySelector('#website').value.trim();
  const resume = document.querySelector('#resume').value.trim();
  const github = document.querySelector('#github').value.trim();
  const linkedIn = document.querySelector('#linkedin').value.trim();

  const response = await fetch(`/api/v1/user/profile/${$form.dataset.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({picture, portfolio, website, resume, github, linkedIn}),
  });
  const data = await response.json();
  if (!response.ok) {
    // TODO: better error handling
    data.forEach((err) => console.error(err.message));
    return;
  }
  console.info(data.message);
  location.assign(`/user/profile/${$form.dataset.id}`);
});
