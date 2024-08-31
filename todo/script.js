'use strict';

const input = document.querySelector(".add-input");
const addBtn = document.querySelector('.add-label');
const todoList = document.querySelector('.todos-list');


//////////////////////
addBtn.addEventListener('click', function () {
    if (input.value.trim() === '') {
        alert('Please input an item')
        return;
    }
    const markUp = `
    <li class="todos-item">
      <p>${input.value.trim()}</p>
      <i class="trash fa-solid fa-trash-can"></i>
    </li>
    `;
    todoList.insertAdjacentHTML('afterbegin', markUp);
});


////////////////////
todoList.addEventListener('click', function (event) {
    if (event.target.classList.contains('trash')) {
        const todoItem = event.target.closest('.todos-item');
        if (todoItem) todoItem.remove();
    }
});
