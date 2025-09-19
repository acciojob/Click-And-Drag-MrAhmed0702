// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.style.position = 'absolute';

  const index = Array.from(cubes).indexOf(cube);
  const size = 100;
  const cols = 5; 
  cube.style.left = (index % cols) * (size + 20) + 'px';
  cube.style.top = Math.floor(index / cols) * (size + 20) + 'px';

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    cube.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;
  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  newX = Math.max(0, Math.min(newX, container.clientWidth - cubeRect.width));
  newY = Math.max(0, Math.min(newY, container.clientHeight - cubeRect.height));

  selectedCube.style.left = newX + 'px';
  selectedCube.style.top = newY + 'px';
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = '';
    selectedCube = null;
  }
});
