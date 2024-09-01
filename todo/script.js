'use strict';

const input = document.querySelector(".add-input");
const addBtn = document.querySelector('.add-label');
const todoList = document.querySelector('.todos-list');
const container = document.querySelector('.container');
const addContainer = document.querySelector('.add-container');

////////////////////
// Error handling function
const showError = function (message) {
    if (addContainer.querySelector('.error-message')) return;

    const markup = `
    <div class="error-message">
        <span>${message}</span>
    </div>
    `;
    addContainer.insertAdjacentHTML('afterbegin', markup);

    setTimeout(() => {
        const errorMessage = addContainer.querySelector('.error-message');
        errorMessage.classList.add('error-message-hidden');
        errorMessage.addEventListener('transitionend', () => {
            errorMessage.remove();
        }, { once: true });
    }, 1500);
};


//////////////////////
// adding items
const addItem = function () {
    const newItem = input.value.trim();

    // Invalid input
    if (newItem === '') {
        showError('Invalid Input. Please try again');
        return;
    }

    // Validate if the item already exists
    const items = todoList.querySelectorAll('.todos-item p');
    for (const item of items) {
        if (item.textContent === newItem) {
            showError('Item Already Exists');
            return;
        }
    }

    const markUp = `
    <li class="todos-item">
      <p>${newItem}</p>
      <i class="trash fa-solid fa-trash-can"></i>
    </li>
    `;

    todoList.insertAdjacentHTML('afterbegin', markUp);
    input.value = '';
};

addBtn.addEventListener('click', addItem);
container.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addItem();
    }
});

////////////////////
todoList.addEventListener('click', function (event) {
    if (event.target.classList.contains('trash')) {
        const todoItem = event.target.closest('.todos-item');
        if (todoItem) todoItem.remove();
    }
});

