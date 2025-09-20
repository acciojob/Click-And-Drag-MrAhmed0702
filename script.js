const items = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

items.addEventListener('mousedown', (e) => {
  isDown = true;
  items.classList.add('active');
  startX = e.pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
});

// Listen for mousemove and mouseup on the window
window.addEventListener('mouseup', () => {
  isDown = false;
  items.classList.remove('active');
});

window.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - items.offsetLeft;
  const walk = (x - startX); 
  items.scrollLeft = scrollLeft - walk;
});

// The mouseleave listener on items is no longer strictly necessary with the window listeners, but can be kept for robustness.
items.addEventListener('mouseleave', () => {
    // This is optional and helps if the user drags quickly out of the element and releases the mouse
    if (isDown) {
        // You could also stop the drag here if needed, or just let the window mouseup handle it
    }
});