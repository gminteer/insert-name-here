document.addEventListener('DOMContentLoaded', () => {
  const $burgers = Array.from(document.querySelectorAll('.navbar-burger'));
  $burgers.forEach(($el) => {
    $el.addEventListener('click', () => {
      const $target = document.getElementById($el.dataset.target);
      $el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});
