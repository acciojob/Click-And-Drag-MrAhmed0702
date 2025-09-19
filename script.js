const container = document.getElementById('container');
    const items = container.querySelectorAll('.item');

    let activeItem = null;
    let offsetX = 0;
    let offsetY = 0;

    // Position cubes in a grid layout
    const itemSize = 100; // same as width/height in CSS
    const gap = 10;
    let cols = Math.floor((container.clientWidth) / (itemSize + gap));

    items.forEach((item, i) => {
      let col = i % cols;
      let row = Math.floor(i / cols);
      item.style.left = `${col * (itemSize + gap)}px`;
      item.style.top = `${row * (itemSize + gap)}px`;

      item.addEventListener('mousedown', (e) => {
        activeItem = item;
        offsetX = e.clientX - item.getBoundingClientRect().left;
        offsetY = e.clientY - item.getBoundingClientRect().top;
        item.classList.add('dragging');
      });
    });

    document.addEventListener('mousemove', (e) => {
      if (!activeItem) return;

      const containerRect = container.getBoundingClientRect();

      let newX = e.clientX - containerRect.left - offsetX;
      let newY = e.clientY - containerRect.top - offsetY;

      // Boundary checks
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;

      const maxX = container.clientWidth - activeItem.clientWidth;
      const maxY = container.clientHeight - activeItem.clientHeight;

      if (newX > maxX) newX = maxX;
      if (newY > maxY) newY = maxY;

      activeItem.style.left = newX + 'px';
      activeItem.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (activeItem) {
        activeItem.classList.remove('dragging');
        activeItem = null;
      }
    });