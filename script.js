const cubes = document.querySelectorAll('.cube');
let activeCube = null;

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        activeCube = cube;
        offsetX = e.clientX - cube.getBoundingClientRect().left;
        offsetY = e.clientY - cube.getBoundingClientRect().top;
    });
});

document.addEventListener('mousemove', (e) => {
    if (activeCube) {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();

        // Calculate new position
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;

        // Boundary checks
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + activeCube.offsetWidth > containerRect.width) {
            newX = containerRect.width - activeCube.offsetWidth;
        }
        if (newY + activeCube.offsetHeight > containerRect.height) {
            newY = containerRect.height - activeCube.offsetHeight;
        }

        // Update position
        activeCube.style.left = newX + 'px';
        activeCube.style.top = newY + 'px';
    }
});

document.addEventListener('mouseup', () => {
    activeCube = null; // Release the cube
});