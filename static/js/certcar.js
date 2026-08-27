const track = document.querySelector('.cert-track');
const viewport = document.querySelector('.cert-viewport');
const leftArrow = document.querySelector('.cert-arrow-left');
const rightArrow = document.querySelector('.cert-arrow-right');
const cards = track.querySelectorAll('.cert-card');

let page = 0;
let cardsPerPage = 3;

function getCardsPerPage() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateCarousel() {
  cardsPerPage = getCardsPerPage();
  const maxPage = Math.ceil(cards.length / cardsPerPage) - 1;
  page = Math.min(page, maxPage); // clamp in case resize shrinks page count

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 16; // matches 1rem gap in CSS
  const offset = page * cardsPerPage * (cardWidth + gap);

  track.style.transform = `translateX(-${offset}px)`;

  leftArrow.disabled = page === 0;
  rightArrow.disabled = page === maxPage;
}

leftArrow.addEventListener('click', () => {
  page = Math.max(0, page - 1);
  updateCarousel();
});

rightArrow.addEventListener('click', () => {
  const maxPage = Math.ceil(cards.length / cardsPerPage) - 1;
  page = Math.min(maxPage, page + 1);
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel(); // run once on load