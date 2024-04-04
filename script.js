function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-status">Pending</span>
            <input type="text" class="task-text" value="${taskInput.value}" readonly>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="priority-btn">Priority</button>
        `;

        li.querySelector('.edit-btn').onclick = function() {
            var taskText = li.querySelector('.task-text');
            if (taskText.readOnly) {
                taskText.removeAttribute('readonly');
                taskText.classList.add('editing');
                this.textContent = 'Save';
            } else {
                taskText.setAttribute('readonly', true);
                taskText.classList.remove('editing');
                this.textContent = 'Edit';
                saveTasks();
            }
        };

        li.querySelector('.delete-btn').onclick = function() {
            li.remove();
            saveTasks();
        };

        li.querySelector('.priority-btn').onclick = function() {
            li.classList.toggle('priority');
            saveTasks();
        };

        taskList.appendChild(li);

        taskInput.value = "";
        saveTasks();
    }
}

function saveTasks() {
    var tasks = [];
    var taskList = document.getElementById("taskList").getElementsByTagName("li");

    for (var i = 0; i < taskList.length; i++) {
        tasks.push({
            text: taskList[i].querySelector('.task-text').value,
            priority: taskList[i].classList.contains("priority"),
            completed: taskList[i].querySelector('.task-checkbox').checked
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function() {
    var savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
        var taskList = document.getElementById("taskList");

        savedTasks.forEach(function(task) {
            var li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-status">${task.completed ? 'Completed' : 'Pending'}</span>
                <input type="text" class="task-text" value="${task.text}" ${task.completed ? 'readonly' : ''}>
                <button class="edit-btn">${task.completed ? '' : 'Edit'}</button>
                <button class="delete-btn">Delete</button>
                <button class="priority-btn">Priority</button>
            `;
            if (task.priority) {
                li.classList.add('priority');
            }

            li.querySelector('.edit-btn').onclick = function() {
                var taskText = li.querySelector('.task-text');
                if (taskText.readOnly) {
                    taskText.removeAttribute('readonly');
                    taskText.classList.add('editing');
                    this.textContent = 'Save';
                } else {
                    taskText.setAttribute('readonly', true);
                    taskText.classList.remove('editing');
                    this.textContent = 'Edit';
                    saveTasks();
                }
            };

            li.querySelector('.delete-btn').onclick = function() {
                li.remove();
                saveTasks();
            };

            li.querySelector('.priority-btn').onclick = function() {
                li.classList.toggle('priority');
                saveTasks();
            };

            li.querySelector('.task-checkbox').addEventListener('change', function() {
                var taskStatus = li.querySelector('.task-status');
                if (this.checked) {
                    taskStatus.textContent = 'Completed';
                    taskStatus.classList.add('completed');
                } else {
                    taskStatus.textContent = 'pending';
                    taskStatus.classList.remove('completed');
                }
                saveTasks();
            });

            taskList.appendChild(li);
        });
    }
};
