const $starRatings = document.querySelectorAll('.rating');
const readOnly = document.currentScript.dataset.readOnly;
const userId = document.currentScript.dataset.userId;

$starRatings.forEach(($rating) => {
  const rank = Number($rating.dataset.rank);
  if (rank) $rating.querySelector(`[value="${rank}"]`).checked = 'true';
  if (readOnly === 'true') $rating.disabled = true;
});

if (readOnly !== 'true') {
  const $changeBtn = document.querySelector('#change-skills');
  $changeBtn.classList.toggle('is-hidden');
  $changeBtn.addEventListener('click', async () => {
    const data = {};
    document.querySelectorAll('tr[data-skill-id]').forEach(($row) => {
      const skillId = $row.dataset.skillId;
      const $ranking = $row.querySelector('input[type="radio"]:checked');
      data[skillId] = $ranking.value;
    });
    const path = $changeBtn.dataset.type.toLowerCase();
    const response = await fetch(`/api/v1/skillset/${path}/${userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    if (!response.ok) return console.error(resData.message);
    location.assign(`/user/profile/${userId}`);
  });
  const $ratingRows = document.querySelectorAll('.rating-row');
  $ratingRows.forEach(($row) => {
    $row.querySelector('.delete-button').classList.toggle('is-hidden');
    const $delete = $row.querySelector('button');
    $delete.addEventListener('click', () => {
      const skillId = $delete.dataset.skillId;
      document.querySelector(`tr[data-skill-id="${skillId}"`).remove();
    });
  });
}
window.addEventListener('DOMContentLoaded', async () => {
  const $newSkill = document.querySelector('#new-skill');
  if ($newSkill) {
    const response = await fetch('/api/v1/skillset/unused-skills');
    const resData = await response.json();
    if (!response.ok) return console.error(resData.message);
    resData.forEach((skill) => {
      const $option = document.createElement('option');
      $option.value = skill.id;
      $option.textContent = skill.name;
      $newSkill.appendChild($option);
    });
    document.querySelector('#add-skill-button').addEventListener('click', async () => {
      const $changeBtn = document.querySelector('#change-skills');
      const path = $changeBtn.dataset.type.toLowerCase();
      const $rating = document.querySelector('#new-rating');
      const rank = $rating.querySelector('input[type="radio"]:checked').value;
      if ($newSkill.value === 'DEFAULT') return;
      const response = await fetch(`/api/v1/skillset/${path}/${userId}/add`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({[$newSkill.value]: rank}),
      });
      const resData = await response.json();
      if (!response.ok) return console.error(resData.message);
      window.location.reload();
    });
  }
});
