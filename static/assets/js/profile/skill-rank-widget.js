const $starRatings = document.querySelectorAll('.rating');

$starRatings.forEach(($rating) => {
  const rank = Number($rating.dataset.rank);
  if (rank) $rating.querySelector(`[value="${rank}"]`).checked = 'true';
  $rating.disabled = true;
});
