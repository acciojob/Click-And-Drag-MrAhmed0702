const itemsContainer = document.querySelector('.items');
  const items = document.querySelectorAll('.item');

  let activeItem = null;
  let offsetX = 0;
  let offsetY = 0;

  items.forEach(item => {
    // Make each item absolutely positioned within the scroll container
    item.style.position = 'absolute';

    // Optional: randomly distribute them initially
    item.style.left = Math.random() * (itemsContainer.scrollWidth - item.offsetWidth) + 'px';
    item.style.top = '100px'; // or however you want

    item.addEventListener('mousedown', (e) => {
      activeItem = item;
      offsetX = e.clientX - item.getBoundingClientRect().left;
      offsetY = e.clientY - item.getBoundingClientRect().top;
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (activeItem) {
      const containerRect = itemsContainer.getBoundingClientRect();

      // Calculate new position relative to container
      let newX = e.clientX - containerRect.left - offsetX + itemsContainer.scrollLeft;
      let newY = e.clientY - containerRect.top - offsetY;

      // Optional: boundary checks
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + activeItem.offsetWidth > itemsContainer.scrollWidth) {
        newX = itemsContainer.scrollWidth - activeItem.offsetWidth;
      }
      if (newY + activeItem.offsetHeight > itemsContainer.offsetHeight) {
        newY = itemsContainer.offsetHeight - activeItem.offsetHeight;
      }

      // Apply position
      activeItem.style.left = newX + 'px';
      activeItem.style.top = newY + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    activeItem = null;
  });