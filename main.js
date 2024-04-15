import './style.css'


const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

const saveTodo = (text) => {

    const todo = document.createElement('div')
    todo.classList.add('todo')

    todo.innerHTML = `
        <div class="flex justify-around items-center p-4 border-b border-[#ddd]  todo">
        <h3 class="flex-[1] text-[0.9rem] font-bold">${text}</h3>
        <button class="finish-todo bg-bg text-102f5e border-2 py-[0.3rem] px-[0.6rem] text-base cursor-pointer flex justify-center items-center rounded-md transition-colors duration-[0.4s] hover:bg-102f5e ml-[.4rem]">
        <i class="fa solid fa-check hover:text-bg "></i>
        </button>
        <button class="edit-todo bg-bg text-102f5e border-2 py-[0.3rem] px-[0.6rem] text-base cursor-pointer flex justify-center items-center rounded-md transition-colors duration-[0.4s] hover:bg-102f5e ml-[.4rem]">
        <i class="fa solid fa-pen hover:text-bg "></i>
        </button>
        <button class="remove-todo bg-bg text-102f5e border-2 py-[0.3rem] px-[0.6rem] text-base cursor-pointer flex justify-center items-center rounded-md transition-colors duration-[0.4s] hover:bg-102f5e ml-[.4rem]">
        <i class="fa solid fa-xmark hover:text-bg "></i>
        </button>
    `
    todoList.appendChild(todo)

    todoInput.value = ''
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault() // não enviar o formulario quando pressionar o botão

    const inputValue = todoInput.value

    if(inputValue) {
        saveTodo(inputValue)
    }
})

document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest('div')
    let todoTitle

    if(parentEl && parentEl.querySelector('h3')) {
       todoTitle = parentEl.querySelector('h3').innerText 
    }

    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle("done")
    }

    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})