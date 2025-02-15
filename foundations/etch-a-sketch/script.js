const container = document.querySelector('.container');
const resetButton = document.querySelector('#reset-grid');

function createGrid(rows, cols) {
    container.innerHTML = '';
    const squareSize = container.clientWidth / cols;
    for (let i = 0; i < rows * cols; i ++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`
        square.style.height = `${squareSize}px`
        square.addEventListener('mouseover', () => {
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            square.style.backgroundColor = randomColor
        });
        container.appendChild(square);

    }
}

createGrid(16, 16);

resetButton.addEventListener('click', () => {
    let newSize = prompt('Enter new grid size (1-100):', 16);

    if (newSize === null) return;
    newSize = +newSize;
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a number between 1 and 100.');
        return;
    }

    createGrid(newSize, newSize);
});