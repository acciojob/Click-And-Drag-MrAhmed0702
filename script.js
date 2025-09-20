const items = document.querySelector('.items');
let isDragging = false;
let startX;
let scrollLeft;

items.addEventListener('mousedown', (e) => {
  isDragging = true;
  items.classList.add('active');
  startX = e.pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
});

items.addEventListener('mouseleave', () => {
  isDragging = false;
  items.classList.remove('active');
});

items.addEventListener('mouseup', () => {
  isDragging = false;
  items.classList.remove('active');
});

items.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - items.offsetLeft;
  const walk = (x - startX) * 3;
  items.scrollLeft = scrollLeft - walk;
});