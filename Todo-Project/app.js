const input = document.getElementById("input-todo-task");
const button = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const form = document.getElementById('add-form');
const clearBtn = document.getElementById("clear-completed-btn");
const filterForm = document.getElementById('filter-form');


function getFilter() {
    return  filtered = document.querySelector('input[name = "filter"]:checked').value;
}

function render(tasks) {
    list.innerHTML = '';

    tasks.forEach((item, index) => {
        const li = document.createElement('li');
        const liDelBtn = createDeleteBtn(index);
        const liCompBtn = createCompleteBtn(index);
        li.textContent = `Task: ${item.text} Status: ${item.completed ? '✅' : '❌'}`;
        li.appendChild(liDelBtn);
        li.appendChild(liCompBtn);

        list.appendChild(li);
    });
}

function createDeleteBtn(index) {
    let button = document.createElement('button');
    button.textContent = 'Delete';
    button.classList.add('btn');

    button.addEventListener('click', function(event) {
        event.preventDefault();

        todo.remove(index + 1);
        render( todo.filter( getFilter() ) );
    });
    return button;
}

function createCompleteBtn(index) {
    let button = document.createElement('button');
    button.textContent = 'Complete';
    button.classList.add('btn');

    button.addEventListener('click', function(event) {
        event.preventDefault();

        todo.complete(index + 1);
        render( todo.filter( getFilter() ) );
    });
    return button;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    todo.add(input.value);
    input.value = '';

    render( todo.filter(getFilter()) );

});

clearBtn.addEventListener('click', function() {

    todo.clearCompleted();
    render( todo.filter(getFilter()) );

});

filterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    render( todo.filter(getFilter()) );
    
});















