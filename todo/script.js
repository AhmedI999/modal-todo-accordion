'use strict';

const formEl = document.querySelector('form');
const input = document.querySelector(".add-input");
const addBtn = document.querySelector('.add-label');
const clearBtn = document.querySelector('.btn-clear');
const todoList = document.querySelector('.todos-list');
const addContainer = document.querySelector('.add-container');
const LOCAL_STORAGE_ITEM_KEY = 'todos';

// storage handler
class LocalStorageHandler {
    constructor() {
        this.items = LocalStorageHandler.getLocalStorageData('todos') || [];
    }

    static getLocalStorageData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    static clearLocalStorageData(key) {
        localStorage.removeItem(key);
    }

    saveItem(itemValue) {
        const newItem = {
            id: Math.random(),
            value: itemValue
        };
        this.items.push(newItem);
        localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(this.items));
        return newItem;
    }

    getItem(id) {
        return this.items.find(item => item.id === id);
    }

    editItem(id, newValue) {
        const itemIndex = this.items.findIndex(item => item.id === Number(id));
        if (itemIndex !== -1) {
            this.items[itemIndex].value = newValue;
            localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(this.items));
        }
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== Number(id));
        localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(this.items));
    }
}

// On page load
document.addEventListener('DOMContentLoaded', function () {
    // getting data from local storage
    const todosList = LocalStorageHandler.getLocalStorageData(LOCAL_STORAGE_ITEM_KEY);

    // Rendering data on DOM
    todosList.forEach(item => {
        const markUp = `
            <li class="todos-item">
                <h6 class="hidden">${item.id}</h6>
                <p>${item.value}</p>
                <div class="icons">
                    <i class="edit fa-solid fa-pen-to-square"></i>
                    <i class="trash fa-solid fa-trash-can"></i>
                </div>
            </li>
        `;
        todoList.insertAdjacentHTML('beforeend', markUp);
    });
});

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
// adding and editing items
const addItem = function () {
    const newItem = input.value.trim();

    if (newItem === '') {
        showError('Invalid Input. Please try again');
        return;
    }

    const localStorageHandler = new LocalStorageHandler();
    let items = localStorageHandler.items;

    for (const item of items) {
        if (item.value === newItem) {
            showError('Item Already Exists');
            return;
        }
    }

    const newItemData = localStorageHandler.saveItem(newItem);

    const markUp = `
        <li class="todos-item">
            <h6 class="hidden">${newItemData.id}</h6>
            <p>${newItem}</p>
            <div class="icons">
                <i class="edit fa-solid fa-pen-to-square"></i>
                <i class="trash fa-solid fa-trash-can"></i>
            </div>
        </li>
    `;
    todoList.insertAdjacentHTML('afterbegin', markUp);
    input.value = '';
};

const resetFormState = function () {
    const label = formEl.querySelector('label');
    label.classList.remove('edit-label');
    label.textContent = 'Add';
    input.value = '';
    currentEditId = null;
};

const updateLabelEdit = function () {
    const label = formEl.querySelector('label');
    label.classList.add('edit-label');
    label.textContent = 'Edit';
};

const editItem = function (id, newValue) {
    // Handle save in localStorage
    const localStorageHandler = new LocalStorageHandler();
    localStorageHandler.editItem(id, newValue);

    // UPDATE UI
    const domTodoItems = document.querySelectorAll('.todos-item');
    domTodoItems.forEach(domItem => {
        const h6Element = domItem.querySelector('h6');
        if (h6Element) {
            const itemId = h6Element.textContent;
            if (itemId === id) domItem.querySelector('p').textContent = newValue;
        }
    });

    resetFormState();
};

// ADD
addBtn.addEventListener('click', function () {
    const newValue = input.value.trim();

    // Check if the button is in "edit" mode
    if (addBtn.classList.contains('edit-label')) {
        if (!currentEditId) return;
        editItem(currentEditId, newValue);
    } else {
        addItem();
    }
});

// EDIT
let currentEditId = null;
todoList.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit')) {
        const todoItem = e.target.closest('.todos-item');
        const todoItemValue = todoItem.querySelector('p').textContent;
        if (!todoItemValue) return;

        currentEditId = todoItem.querySelector('h6').textContent;

        input.value = todoItemValue;

        updateLabelEdit();
    }
});

// REMOVE
todoList.addEventListener('click', function (event) {
    if (event.target.classList.contains('trash')) {
        const todoItem = event.target.closest('.todos-item');
        const itemId = todoItem.querySelector('h6').textContent;

        const localStorageHandler = new LocalStorageHandler();
        localStorageHandler.removeItem(itemId);

        if (todoItem) todoItem.remove();
    }
});

// Clear list
clearBtn.addEventListener('click', function () {
    // Clearing local storage
    LocalStorageHandler.clearLocalStorageData(LOCAL_STORAGE_ITEM_KEY);
    // clearing Dom
    todoList.innerHTML = '';
})