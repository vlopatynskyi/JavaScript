const input = document.getElementById("input-todo-task");
const button = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const form = document.getElementById('add-form');

function render() {
    list.innerHTML = '';

    todo.tasks.forEach(item => {
        const li = document.createElement('li');

        li.textContent = `Task: ${item.text} Status: ${item.completed}`;
        list.appendChild(li);
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    todo.add(input.value);
    input.value = '';

    render();

});