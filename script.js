const container = document.querySelector('.items');
const items = container.querySelectorAll('.item');

let activeItem = null;
let isDraggingItem = false;

let isDraggingContainer = false;
let startX;
let scrollLeft;

const itemSize = 100;
const gap = 10;
const cols = Math.floor(container.clientWidth / (itemSize + gap));

container.style.width = '800px'; // fixed visible container width
container.style.overflowX = 'auto';

// Set container scrollable width to fit all items in a row
const contentWidth = (itemSize + gap) * items.length;
container.style.minWidth = contentWidth + 'px';

items.forEach((item, i) => {
  let col = i;
  let row = 0;
  item.style.position = 'absolute';
  item.style.width = itemSize + 'px';
  item.style.height = itemSize + 'px';
  item.style.left = `${col * (itemSize + gap)}px`;
  item.style.top = `${row * (itemSize + gap)}px`;

  item.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    activeItem = item;
    isDraggingItem = true;
    offsetX = e.clientX - item.getBoundingClientRect().left;
    offsetY = e.clientY - item.getBoundingClientRect().top;
    item.classList.add('dragging');
  });
});

container.addEventListener('mousedown', (e) => {
  if (!e.target.classList.contains('item')) {
    isDraggingContainer = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.classList.add('dragging');
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingItem && activeItem) {
    const containerRect = container.getBoundingClientRect();

    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;

    const maxX = container.clientWidth - activeItem.clientWidth;
    const maxY = container.clientHeight - activeItem.clientHeight;

    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    activeItem.style.left = newX + 'px';
    activeItem.style.top = newY + 'px';
  } else if (isDraggingContainer) {
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (startX - x);
    container.scrollLeft = scrollLeft + walk;
  }
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.classList.remove('dragging');
  }
  activeItem = null;
  isDraggingItem = false;

  if (isDraggingContainer) {
    container.classList.remove('dragging');
  }
  isDraggingContainer = false;
});
