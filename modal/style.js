const button = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

function openModal() {
    modal.classList.remove('hidden');
    button.classList.add('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    button.classList.remove('hidden');
}


button.addEventListener('click', openModal);

modalCloseBtn.addEventListener('click', closeModal);


document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

overlay.addEventListener('click', closeModal);


